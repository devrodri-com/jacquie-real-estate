// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

/**
 * Single declarative source of truth for locale routing.
 *
 * Resolution order applied by the next-intl middleware:
 *   1. locale prefix in the pathname (`/es`, `/en`, `/fr`) — always wins
 *   2. `NEXT_LOCALE` cookie, but only when its value is a supported locale
 *   3. `Accept-Language` negotiation
 *   4. `defaultLocale`
 */
export const routing = defineRouting({
  locales: ["es", "en", "fr"],
  defaultLocale: "es",
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    // Must be `/` so a preference stored on `/fr/contacto` is still sent on `/`.
    path: "/",
    sameSite: "lax",
    maxAge: ONE_YEAR_IN_SECONDS,
    secure: process.env.NODE_ENV === "production",
  },
});
