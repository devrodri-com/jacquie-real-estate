import assert from "node:assert/strict";
import test from "node:test";
import {
  isSupportedLocale,
  rememberLocaleChoice,
  serializeLocaleCookie,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
} from "../src/lib/localePreference";

test("accepts exactly the three supported locales", () => {
  for (const locale of ["es", "en", "fr"]) {
    assert.equal(isSupportedLocale(locale), true, `${locale} must be supported`);
  }
  for (const locale of ["de", "pt", "es-AR", "EN", "", " es", "fr;", "es fr"]) {
    assert.equal(isSupportedLocale(locale), false, `${locale} must be rejected`);
  }
});

test("serializes the cookie with the approved attributes", () => {
  const cookie = serializeLocaleCookie("fr", { secure: true });
  assert.equal(cookie, `${LOCALE_COOKIE_NAME}=fr; Path=/; Max-Age=31536000; SameSite=Lax; Secure`);
  assert.equal(LOCALE_COOKIE_MAX_AGE, 31536000);
});

test("omits Secure on insecure origins so http://localhost keeps working", () => {
  const cookie = serializeLocaleCookie("en", { secure: false });
  assert.equal(cookie, `${LOCALE_COOKIE_NAME}=en; Path=/; Max-Age=31536000; SameSite=Lax`);
  assert.doesNotMatch(cookie ?? "", /Secure/);
});

test("refuses to serialize an unsupported or injected locale", () => {
  const hostile = [
    "de",
    "",
    "es-AR",
    // Attribute injection attempts must never produce a cookie string.
    "es; Domain=evil.test",
    "es; Path=/admin",
    "en\nSet-Cookie: session=leaked",
  ];

  for (const value of hostile) {
    assert.equal(serializeLocaleCookie(value, { secure: true }), null, `${value} must yield null`);
  }
});

test("a click stores the choice before navigation, on http and https", () => {
  for (const locale of ["es", "en", "fr"] as const) {
    const doc = { cookie: "" };
    assert.equal(rememberLocaleChoice(locale, doc, { protocol: "https:" }), true);
    assert.match(doc.cookie, new RegExp(`^NEXT_LOCALE=${locale};`));
    assert.match(doc.cookie, /Secure/);
  }

  const local = { cookie: "" };
  rememberLocaleChoice("fr", local, { protocol: "http:" });
  assert.match(local.cookie, /^NEXT_LOCALE=fr;/);
  assert.doesNotMatch(local.cookie, /Secure/);
});

test("an unsupported locale leaves any stored preference untouched", () => {
  const doc = { cookie: "NEXT_LOCALE=en" };
  assert.equal(rememberLocaleChoice("de", doc, { protocol: "https:" }), false);
  assert.equal(doc.cookie, "NEXT_LOCALE=en", "the previous choice must survive");
});

test("switching back to an already-stored locale rewrites it verbatim", () => {
  // The destination may answer 304 with no Set-Cookie, so the click is the only
  // thing that keeps the preference correct.
  const doc = { cookie: "NEXT_LOCALE=fr; Path=/; Max-Age=31536000; SameSite=Lax" };
  assert.equal(rememberLocaleChoice("es", doc, { protocol: "https:" }), true);
  assert.match(doc.cookie, /^NEXT_LOCALE=es;/);
});

test("the serialized cookie carries only a locale code", () => {
  for (const locale of ["es", "en", "fr"] as const) {
    const cookie = serializeLocaleCookie(locale, { secure: true }) ?? "";
    assert.match(cookie, /^NEXT_LOCALE=(es|en|fr);/);
    // Exactly one `=` per attribute pair, so no payload can be smuggled in.
    assert.equal(cookie.split("; ")[0], `NEXT_LOCALE=${locale}`);
    assert.doesNotMatch(cookie, /@|Domain=|HttpOnly/i);
  }
});
