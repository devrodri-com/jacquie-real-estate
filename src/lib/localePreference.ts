// src/lib/localePreference.ts
import { type SiteLocale } from "@/lib/whatsapp";

/** Must match `localeCookie.name` in src/i18n/routing.ts. */
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

/** Must match `localeCookie.maxAge` in src/i18n/routing.ts (one year). */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const SUPPORTED_LOCALES: readonly SiteLocale[] = ["es", "en", "fr"];

export function isSupportedLocale(value: string): value is SiteLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Builds the `document.cookie` string that stores an explicit locale choice.
 *
 * The middleware also writes this cookie, but only on a full 200 response. A
 * revalidated page answers 304 with no `Set-Cookie`, so picking a locale whose
 * page is already in the HTTP cache would silently keep the previous
 * preference. Writing it from the click makes the choice independent of
 * caching, bfcache and history.
 *
 * Returns `null` for unsupported locales so a bad value can never be stored.
 */
export function serializeLocaleCookie(
  locale: string,
  { secure }: { secure: boolean },
): string | null {
  if (!isSupportedLocale(locale)) return null;

  const parts = [
    `${LOCALE_COOKIE_NAME}=${locale}`,
    "Path=/",
    `Max-Age=${LOCALE_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");

  return parts.join("; ");
}

/** The slice of `document` and `location` this needs, so it stays testable. */
type CookieTarget = { cookie: string };
type ProtocolSource = { protocol: string };

/**
 * Stores an explicit locale choice. Called from the click handler so the write
 * completes before the browser starts navigating.
 *
 * Returns whether a preference was stored.
 */
export function rememberLocaleChoice(
  locale: string,
  target: CookieTarget,
  location: ProtocolSource,
): boolean {
  const cookie = serializeLocaleCookie(locale, { secure: location.protocol === "https:" });
  if (!cookie) return false;

  target.cookie = cookie;
  return true;
}
