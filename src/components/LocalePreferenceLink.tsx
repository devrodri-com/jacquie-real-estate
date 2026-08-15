"use client";

import type { AnchorHTMLAttributes } from "react";
import { rememberLocaleChoice } from "@/lib/localePreference";

type LocalePreferenceLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick"
> & {
  /** Locale this link switches to. Unsupported values are never stored. */
  locale: string;
  /** Extra work to run on click, e.g. closing the mobile drawer. */
  onNavigate?: () => void;
};

/**
 * A native anchor that records the visitor's explicit locale choice before the
 * browser leaves the page.
 *
 * Stays a plain `<a>` on purpose: switching locale must be a top-level
 * navigation so Next never prefetches the other locales, and so the middleware
 * guard for `next-url` requests keeps speculative traffic from touching the
 * preference. The cookie is written here rather than relying on the response,
 * because a cached destination answers 304 without `Set-Cookie`.
 */
export default function LocalePreferenceLink({
  locale,
  onNavigate,
  ...anchorProps
}: LocalePreferenceLinkProps) {
  function handleClick() {
    // Written synchronously so it lands before the navigation starts; the
    // default action is never prevented, so keyboard and modifier clicks
    // behave exactly as they would on a bare anchor.
    rememberLocaleChoice(locale, document, window.location);
    onNavigate?.();
  }

  return <a {...anchorProps} onClick={handleClick} />;
}
