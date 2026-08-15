import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import middleware from "../middleware";
import { routing } from "../src/i18n/routing";

const ORIGIN = "https://jacquiezarate.com";

type ProbeOptions = {
  acceptLanguage?: string;
  cookie?: string;
  /**
   * Set to the route the request was issued from to simulate a client-router
   * request (a prefetch or a soft navigation), which is how Next.js marks them.
   */
  fromRoute?: string;
};

/**
 * Runs the real middleware against a synthetic request. No network access.
 */
function probe(pathname: string, options: ProbeOptions = {}) {
  const headers = new Headers();
  if (options.acceptLanguage !== undefined) {
    headers.set("accept-language", options.acceptLanguage);
  }
  if (options.cookie !== undefined) {
    headers.set("cookie", `NEXT_LOCALE=${options.cookie}`);
  }
  if (options.fromRoute !== undefined) {
    headers.set("next-url", options.fromRoute);
  }

  const response = middleware(new NextRequest(`${ORIGIN}${pathname}`, { headers }));
  const location = response.headers.get("location");

  return {
    status: response.status,
    /** Target locale prefix when the middleware redirects, otherwise null. */
    redirectedTo: location ? new URL(location, ORIGIN).pathname : null,
    setCookie: response.headers.get("set-cookie"),
  };
}

test("negotiates Accept-Language when no preference is stored", () => {
  const cases: Array<[string, string]> = [
    ["es-AR,es;q=0.9,en;q=0.8", "/es"],
    ["es-ES,es;q=0.9", "/es"],
    ["en-US,en;q=0.9", "/en"],
    ["en-GB,en;q=0.9,es;q=0.8", "/en"],
    ["fr-CA,fr;q=0.9,en;q=0.8", "/fr"],
    ["fr-FR,fr;q=0.9", "/fr"],
  ];

  for (const [acceptLanguage, expected] of cases) {
    assert.equal(
      probe("/", { acceptLanguage }).redirectedTo,
      expected,
      `Accept-Language "${acceptLanguage}" should resolve to ${expected}`,
    );
  }
});

test("falls back to Spanish for unsupported or missing Accept-Language", () => {
  assert.equal(probe("/", { acceptLanguage: "de-DE,de;q=0.9" }).redirectedTo, "/es");
  assert.equal(probe("/", { acceptLanguage: "pt-BR,pt;q=0.9" }).redirectedTo, "/es");
  assert.equal(probe("/", { acceptLanguage: "" }).redirectedTo, "/es");
  assert.equal(probe("/").redirectedTo, "/es");
});

test("a stored preference wins over the browser language", () => {
  assert.equal(probe("/", { cookie: "fr", acceptLanguage: "en-US,en;q=0.9" }).redirectedTo, "/fr");
  assert.equal(probe("/", { cookie: "en", acceptLanguage: "es-AR,es;q=0.9" }).redirectedTo, "/en");
  assert.equal(probe("/", { cookie: "es", acceptLanguage: "fr-CA,fr;q=0.9" }).redirectedTo, "/es");
});

test("ignores an unsupported, empty or malformed preference cookie", () => {
  // Unsupported locale -> negotiate the browser language instead.
  assert.equal(probe("/", { cookie: "de", acceptLanguage: "en-US,en;q=0.9" }).redirectedTo, "/en");
  assert.equal(probe("/", { cookie: "", acceptLanguage: "fr-CA,fr;q=0.9" }).redirectedTo, "/fr");
  assert.equal(probe("/", { cookie: "es-AR", acceptLanguage: "en-US,en;q=0.9" }).redirectedTo, "/en");

  // Unsupported cookie AND unsupported browser language -> Spanish fallback.
  assert.equal(probe("/", { cookie: "de", acceptLanguage: "de-DE,de;q=0.9" }).redirectedTo, "/es");
  assert.equal(probe("/", { cookie: "xx" }).redirectedTo, "/es");
});

test("an explicit localized URL is never redirected", () => {
  const paths = ["/es", "/en", "/fr", "/fr/contacto", "/en/sobre-mi", "/es/lets-go-miami"];
  const conflicts: Array<ProbeOptions> = [
    { cookie: "fr", acceptLanguage: "en-US,en;q=0.9" },
    { cookie: "en", acceptLanguage: "es-AR,es;q=0.9" },
    { cookie: "de", acceptLanguage: "de-DE,de;q=0.9" },
    { acceptLanguage: "fr-CA,fr;q=0.9" },
  ];

  for (const pathname of paths) {
    for (const options of conflicts) {
      const result = probe(pathname, options);
      assert.equal(
        result.redirectedTo,
        null,
        `${pathname} must not redirect (cookie=${options.cookie ?? "none"})`,
      );
      assert.equal(result.status, 200, `${pathname} must be served directly`);
    }
  }
});

test("the root redirect resolves in a single hop", () => {
  for (const acceptLanguage of ["es-AR,es;q=0.9", "en-US,en;q=0.9", "fr-CA,fr;q=0.9"]) {
    const first = probe("/", { acceptLanguage });
    assert.equal(first.status, 307);
    assert.ok(first.redirectedTo);

    // Following the redirect must terminate immediately.
    const second = probe(first.redirectedTo, { acceptLanguage });
    assert.equal(second.redirectedTo, null, "the redirect target must not redirect again");
  }
});

test("selecting a locale persists it for later visits to /", () => {
  for (const locale of ["es", "en", "fr"] as const) {
    // A different browser language guarantees the selection is worth storing.
    const foreign = locale === "es" ? "en-US,en;q=0.9" : "es-AR,es;q=0.9";
    const selection = probe(`/${locale}/contacto`, { acceptLanguage: foreign });

    assert.ok(
      selection.setCookie?.includes(`NEXT_LOCALE=${locale}`),
      `selecting ${locale} must store NEXT_LOCALE=${locale}`,
    );

    // The stored preference then drives the next visit to the root.
    assert.equal(probe("/", { cookie: locale, acceptLanguage: foreign }).redirectedTo, `/${locale}`);
  }
});

test("the preference cookie is scoped to / and survives the session", () => {
  const setCookie = probe("/fr/contacto", { acceptLanguage: "es-AR,es;q=0.9" }).setCookie ?? "";

  assert.match(setCookie, /(^|;\s*)Path=\/(;|$)/i, "must be readable at the site root");
  assert.match(setCookie, /(^|;\s*)SameSite=lax(;|$)/i, "must be SameSite=Lax");
  assert.match(setCookie, /(^|;\s*)Max-Age=31536000(;|$)/i, "must persist for one year");
  assert.doesNotMatch(setCookie, /HttpOnly/i, "must stay readable by the app");

  // No personal data: the cookie carries a locale code and nothing else.
  assert.match(setCookie, /^NEXT_LOCALE=(es|en|fr);/);
});

test("re-requesting a page that already matches the preference writes no duplicate cookie", () => {
  for (const locale of ["es", "en", "fr"] as const) {
    assert.equal(
      probe(`/${locale}/contacto`, { cookie: locale, acceptLanguage: "es-AR,es;q=0.9" }).setCookie,
      null,
      `${locale} is already stored, so no cookie should be rewritten`,
    );
  }
});

test("a prefetch of another locale never overwrites the stored preference", () => {
  // Sitting on /fr, Next prefetches the switcher's /es and /en links.
  for (const prefetched of ["/es", "/en"]) {
    assert.equal(
      probe(prefetched, { cookie: "fr", acceptLanguage: "fr-CA,fr;q=0.9", fromRoute: "/fr" })
        .setCookie,
      null,
      `prefetching ${prefetched} from /fr must not touch the cookie`,
    );
  }

  // Same with no preference yet: a prefetch must not invent one.
  assert.equal(
    probe("/en", { acceptLanguage: "fr-CA,fr;q=0.9", fromRoute: "/fr" }).setCookie,
    null,
    "a prefetch must not store a preference the visitor never made",
  );
});

test("a soft navigation does not persist a locale, a real one does", () => {
  // Client-router request: speculative or router-driven, never a deliberate act.
  assert.equal(
    probe("/en", { cookie: "fr", acceptLanguage: "es-AR,es;q=0.9", fromRoute: "/fr" }).setCookie,
    null,
  );

  // Top-level navigation: this is the visitor actually landing on the locale.
  assert.ok(
    probe("/en", { cookie: "fr", acceptLanguage: "es-AR,es;q=0.9" }).setCookie?.includes(
      "NEXT_LOCALE=en",
    ),
    "a top-level navigation must persist the locale",
  );
});

test("prefetching does not change where / sends the visitor", () => {
  // The visitor chose FR; prefetches of /es and /en happen in the background.
  for (const prefetched of ["/es", "/en"]) {
    probe(prefetched, { cookie: "fr", acceptLanguage: "en-US,en;q=0.9", fromRoute: "/fr" });
  }

  assert.equal(
    probe("/", { cookie: "fr", acceptLanguage: "en-US,en;q=0.9" }).redirectedTo,
    "/fr",
    "the root must still honour the chosen locale",
  );
});

test("locale detection still applies to client-router requests to /", () => {
  // Only persistence is suppressed; resolution itself must not change.
  assert.equal(probe("/", { cookie: "fr", fromRoute: "/fr" }).redirectedTo, "/fr");
  assert.equal(
    probe("/", { acceptLanguage: "en-US,en;q=0.9", fromRoute: "/es" }).redirectedTo,
    "/en",
  );
});

test("routing config declares the approved locale rule", () => {
  assert.deepEqual([...routing.locales], ["es", "en", "fr"]);
  assert.equal(routing.defaultLocale, "es");
  assert.equal(routing.localeDetection, true);

  const cookie = routing.localeCookie;
  assert.ok(typeof cookie === "object", "the locale cookie must be configured explicitly");
  assert.equal(cookie.name, "NEXT_LOCALE");
  assert.equal(cookie.path, "/");
  assert.equal(cookie.sameSite, "lax");
  assert.equal(cookie.maxAge, 31536000);
  // Secure is enabled for production builds only, so http://localhost keeps working.
  assert.equal(cookie.secure, process.env.NODE_ENV === "production");
});
