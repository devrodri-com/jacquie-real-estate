import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildWhatsAppPayload,
  getAnalyticsCookieNames,
  isValidMeasurementId,
  isWhatsAppUrl,
  loadGoogleAnalytics,
  parseStoredConsent,
  resetAnalyticsLoaderForTests,
  revokeAnalytics,
  setAnalyticsConsent,
  trackWhatsAppClick,
} from "../src/lib/analytics-core.mjs";

function createRuntime(pathname = "/es", initialDataLayer = []) {
  const scripts = [];
  const cookieWrites = [];
  const runtimeWindow = {
    location: { hostname: "localhost", pathname },
    dataLayer: initialDataLayer,
  };
  const runtimeDocument = {
    cookie: "_ga=first; _ga_TEST=second; unrelated=keep",
    head: {
      appendChild: (script) => scripts.push(script),
    },
    createElement: (tagName) => ({
      tagName,
      dataset: {},
      setAttribute: () => undefined,
    }),
    querySelector: () => null,
  };

  Object.defineProperty(runtimeDocument, "cookie", {
    get() {
      return "_ga=first; _ga_TEST=second; unrelated=keep";
    },
    set(value) {
      cookieWrites.push(value);
    },
  });

  return {
    window: runtimeWindow,
    document: runtimeDocument,
    scripts,
    cookieWrites,
  };
}

function getCommands(runtime) {
  return runtime.window.dataLayer
    .filter((entry) => entry && typeof entry.length === "number")
    .map((entry) => Array.from(entry));
}

test("measurement IDs are gated and invalid IDs never load", () => {
  assert.equal(isValidMeasurementId("G-TEST123456"), true);
  assert.equal(isValidMeasurementId("TEST123456"), false);
  assert.equal(isValidMeasurementId(""), false);

  resetAnalyticsLoaderForTests();
  const runtime = createRuntime();
  assert.equal(loadGoogleAnalytics("not-a-measurement-id", runtime), false);
  assert.equal(runtime.scripts.length, 0);
  assert.equal(runtime.window.dataLayer.length, 0);
});

test("accepted analytics initializes the data layer and script exactly once", () => {
  resetAnalyticsLoaderForTests();
  setAnalyticsConsent("granted");
  const runtime = createRuntime();

  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), true);
  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), false);
  assert.equal(runtime.scripts.length, 1);
  assert.equal(runtime.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TEST123456");
  assert.equal(typeof runtime.window.gtag, "function");
  assert.equal(runtime.window.dataLayer.every((entry) => Object.prototype.toString.call(entry) === "[object Arguments]"), true);
  const commands = getCommands(runtime);
  assert.equal(commands.filter(([command]) => command === "config").length, 1);
  assert.equal(commands.filter(([command]) => command === "js").length, 1);
  assert.deepEqual(commands.find(([command]) => command === "config")[2], {
    anonymize_ip: true,
  });
  assert.deepEqual(commands.slice(0, 2).map(([command, name]) => [command, name]), [
    ["consent", "default"],
    ["consent", "update"],
  ]);
  assert.equal(commands[2][0], "js");
  assert.equal(commands[2][1] instanceof Date, true);
  assert.deepEqual(commands[3].slice(0, 2), ["config", "G-TEST123456"]);
  assert.equal(commands[0][2].analytics_storage, "denied");
  assert.equal(commands[1][2].analytics_storage, "granted");
  assert.notEqual(commands[3][2].send_page_view, false);
});

test("the analytics wrapper preserves an existing data layer and uses the official command shape", () => {
  resetAnalyticsLoaderForTests();
  setAnalyticsConsent("granted");
  const existingEntry = { existing: true };
  const runtime = createRuntime("/es", [existingEntry]);

  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), true);
  assert.strictEqual(runtime.window.dataLayer[0], existingEntry);
  assert.equal(Object.prototype.toString.call(runtime.window.dataLayer[1]), "[object Arguments]");
  assert.equal(runtime.window.dataLayer[1].length, 3);
});

test("the loader does not redefine an existing gtag function", () => {
  resetAnalyticsLoaderForTests();
  setAnalyticsConsent("granted");
  const runtime = createRuntime();
  const existingGtag = () => undefined;
  runtime.window.gtag = existingGtag;

  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), true);
  assert.strictEqual(runtime.window.gtag, existingGtag);
});

test("denied consent blocks WhatsApp events and deletes only GA cookies", () => {
  resetAnalyticsLoaderForTests();
  setAnalyticsConsent("denied");
  const runtime = createRuntime("/es/contacto?utm_source=private");

  assert.equal(trackWhatsAppClick("contact:whatsapp", runtime), false);
  assert.deepEqual(getAnalyticsCookieNames(runtime.document.cookie), ["_ga", "_ga_TEST"]);
  assert.deepEqual(revokeAnalytics("G-TEST123456", runtime), ["_ga", "_ga_TEST"]);
  assert.equal(runtime.window["ga-disable-G-TEST123456"], true);
  assert.equal(runtime.cookieWrites.every((value) => value.includes("Max-Age=0")), true);
  assert.equal(runtime.cookieWrites.every((value) => !value.startsWith("unrelated")), true);
});

test("WhatsApp payload contains only the approved non-personal fields", () => {
  resetAnalyticsLoaderForTests();
  setAnalyticsConsent("granted");
  const runtime = createRuntime("/fr/lets-go-miami?utm_source=private");
  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), true);

  assert.equal(trackWhatsAppClick("lets-go-hero:whatsapp", runtime), true);
  assert.deepEqual(buildWhatsAppPayload({
    locale: "fr",
    pagePath: "/fr/lets-go-miami?utm_source=private",
    placement: "lets-go-hero:whatsapp",
    brand: "lets_go_miami",
  }), {
    locale: "fr",
    page_path: "/fr/lets-go-miami",
    placement: "lets-go-hero:whatsapp",
    brand: "lets_go_miami",
  });
  const event = getCommands(runtime).find(([command, name]) => command === "event" && name === "click_whatsapp");
  assert.ok(event);
  assert.deepEqual(Object.keys(event[2]).sort(), ["brand", "locale", "page_path", "placement"]);
  assert.deepEqual(event[2], {
    locale: "fr",
    page_path: "/fr/lets-go-miami",
    placement: "lets-go-hero:whatsapp",
    brand: "lets_go_miami",
  });
  assert.equal(JSON.stringify(event).includes("utm_source"), false);
  assert.equal(JSON.stringify(event).includes("wa.me"), false);
});

test("unknown and denied consent do not emit WhatsApp events", () => {
  resetAnalyticsLoaderForTests();
  const unknownRuntime = createRuntime();
  assert.equal(trackWhatsAppClick("nav:whatsapp", unknownRuntime), false);
  assert.equal(unknownRuntime.window.dataLayer.length, 0);

  setAnalyticsConsent("denied");
  const deniedRuntime = createRuntime();
  assert.equal(trackWhatsAppClick("nav:whatsapp", deniedRuntime), false);
  assert.equal(deniedRuntime.window.dataLayer.length, 0);
});

test("stored consent accepts only the two persisted decisions", () => {
  assert.equal(parseStoredConsent("granted"), "granted");
  assert.equal(parseStoredConsent("denied"), "denied");
  assert.equal(parseStoredConsent("unknown"), null);
  assert.equal(parseStoredConsent(null), null);
});

test("WhatsApp URL detection never treats arbitrary links as tracking targets", () => {
  assert.equal(isWhatsAppUrl("https://wa.me/17864072591?text=hello"), true);
  assert.equal(isWhatsAppUrl("https://api.whatsapp.com/send?text=hello"), true);
  assert.equal(isWhatsAppUrl("https://example.com/wa.me"), false);
  assert.equal(isWhatsAppUrl("mailto:jacqueline@example.com"), false);
});

test("closed form and thank-you route do not emit lead events", async () => {
  const [form, thankYou, layout] = await Promise.all([
    readFile(new URL("../src/app/[locale]/contacto/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/[locale]/gracias/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/[locale]/layout.tsx", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(form, /generate_lead/);
  assert.doesNotMatch(thankYou, /lead_thankyou/);
  assert.doesNotMatch(layout, /googletagmanager\.com/);
  assert.doesNotMatch(layout, /page_view/);
});

test("privacy, localized settings, and Let’s Go Miami surfaces are present", async () => {
  const [privacy, provider, settings, footer, letsGoFooter] = await Promise.all([
    readFile(new URL("../src/app/[locale]/privacidad/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/AnalyticsConsentProvider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/PrivacySettingsButton.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/Footer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/LetsGoMiamiFooter.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(privacy, /jacquiezarate\.com/);
  assert.match(privacy, /jacqueline@miamiliferealty\.com/);
  assert.match(privacy, /14 meses/);
  assert.match(privacy, /14 months/);
  assert.match(privacy, /14 mois/);
  assert.match(provider, /Privacidad y analítica/);
  assert.match(provider, /Privacy and analytics/);
  assert.match(provider, /Confidentialité et analytique/);
  assert.match(settings, /Configuración de privacidad/);
  assert.match(settings, /Privacy settings/);
  assert.match(settings, /Paramètres de confidentialité/);
  assert.match(footer, /privacidad/);
  assert.match(letsGoFooter, /privacy/);
  assert.match(letsGoFooter, /LetsGoMiamiFooter/);
});
