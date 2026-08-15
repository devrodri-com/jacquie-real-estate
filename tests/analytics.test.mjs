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

function createRuntime(pathname = "/es") {
  const commands = [];
  const scripts = [];
  const cookieWrites = [];
  const runtimeWindow = {
    location: { hostname: "localhost", pathname },
    dataLayer: [],
    gtag: (...args) => commands.push(args),
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
    commands,
    scripts,
    cookieWrites,
  };
}

test("measurement IDs are gated and invalid IDs never load", () => {
  assert.equal(isValidMeasurementId("G-TEST123456"), true);
  assert.equal(isValidMeasurementId("TEST123456"), false);
  assert.equal(isValidMeasurementId(""), false);

  resetAnalyticsLoaderForTests();
  const runtime = createRuntime();
  assert.equal(loadGoogleAnalytics("not-a-measurement-id", runtime), false);
  assert.equal(runtime.scripts.length, 0);
  assert.equal(runtime.commands.length, 0);
});

test("accepted analytics initializes the data layer and script exactly once", () => {
  resetAnalyticsLoaderForTests();
  setAnalyticsConsent("granted");
  const runtime = createRuntime();

  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), true);
  assert.equal(loadGoogleAnalytics("G-TEST123456", runtime), false);
  assert.equal(runtime.scripts.length, 1);
  assert.equal(runtime.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TEST123456");
  assert.equal(runtime.commands.filter(([command]) => command === "config").length, 1);
  assert.equal(runtime.commands.filter(([command]) => command === "js").length, 1);
  assert.deepEqual(runtime.commands.find(([command]) => command === "config")[2], {
    anonymize_ip: true,
  });
  assert.equal(runtime.commands[0][0], "consent");
  assert.equal(runtime.commands[0][2].analytics_storage, "denied");
  assert.equal(runtime.commands[1][0], "consent");
  assert.equal(runtime.commands[1][2].analytics_storage, "granted");
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
  const event = runtime.commands.find(([command, name]) => command === "event" && name === "click_whatsapp");
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
