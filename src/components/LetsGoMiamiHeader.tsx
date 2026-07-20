import Image from "next/image";
import Link from "next/link";
import {
  buildLetsGoMiamiWhatsAppHref,
  LETS_GO_MIAMI_COPY,
  type LetsGoMiamiLocale,
} from "@/lib/letsGoMiami";
import styles from "@/components/LetsGoMiami.module.css";

type LetsGoMiamiHeaderProps = {
  locale: LetsGoMiamiLocale;
  pathWithoutLocale: string;
};

const LOCALES: { code: LetsGoMiamiLocale; label: string; aria: string }[] = [
  { code: "es", label: "ES", aria: "Cambiar a español" },
  { code: "en", label: "EN", aria: "Switch to English" },
  { code: "fr", label: "FR", aria: "Passer au français (Canada)" },
];

export default function LetsGoMiamiHeader({
  locale,
  pathWithoutLocale,
}: LetsGoMiamiHeaderProps) {
  const copy = LETS_GO_MIAMI_COPY[locale].header;
  const whatsappHref = buildLetsGoMiamiWhatsAppHref(locale);

  return (
    <header
      className={`${styles.theme} border-b border-[var(--lgm-line)] bg-[var(--lgm-paper)] text-[var(--lgm-ink)]`}
      data-lets-go-header
    >
      <a
        href="#lets-go-miami-main"
        className="sr-only z-[140] bg-[var(--lgm-paper)] px-4 py-3 font-semibold text-[var(--lgm-ink)] focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        {copy.skipLink}
      </a>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex min-h-[68px] items-center justify-between gap-2 lg:min-h-20 lg:gap-6">
          <Link
            href={`/${locale}/lets-go-miami`}
            className="flex min-w-0 items-center gap-2.5 text-[var(--lgm-ink)] no-underline sm:gap-3"
          >
            <span className="relative h-11 w-11 shrink-0 sm:h-14 sm:w-14">
              <Image
                src="/images/lets-go-miami/logo.png"
                alt=""
                fill
                sizes="(min-width: 640px) 56px, 44px"
                className="object-contain"
              />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em] sm:text-[15px]">
                Let’s Go Miami
              </span>
              <span className="mt-1.5 block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--lgm-muted)] sm:text-[10px]">
                by Jacna Services LLC
              </span>
            </span>
          </Link>

          <nav
            aria-label={copy.navAria}
            className="hidden items-center justify-end gap-4 text-sm font-medium lg:flex"
          >
            <Link
              href={`/${locale}`}
              className="px-1 py-3 text-[var(--lgm-muted)] no-underline transition-colors hover:text-[var(--lgm-ink)] motion-reduce:transition-none"
            >
              {copy.mainSite}
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="lets-go-header:whatsapp"
              className="inline-flex min-h-11 items-center justify-center rounded-[3px] bg-[var(--lgm-action)] px-4 text-sm font-semibold text-white no-underline transition-colors hover:bg-[var(--lgm-action-hover)] motion-reduce:transition-none"
            >
              {copy.cta}
            </a>
            <span
              role="group"
              aria-label={copy.languages}
              className="flex items-center border-l border-[var(--lgm-line)] pl-2"
            >
              {LOCALES.map(({ code, label, aria }) =>
                code === locale ? (
                  <span
                    key={code}
                    aria-current="page"
                    lang={code === "fr" ? "fr-CA" : code}
                    className="inline-flex h-11 min-w-11 items-center justify-center border-b-2 border-[var(--lgm-action)] text-xs font-semibold text-[var(--lgm-ink)]"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    key={code}
                    href={`/${code}${pathWithoutLocale}`}
                    aria-label={aria}
                    hrefLang={code === "fr" ? "fr-CA" : code}
                    lang={code === "fr" ? "fr-CA" : code}
                    className="inline-flex h-11 min-w-11 items-center justify-center text-xs font-semibold text-[var(--lgm-muted)] no-underline hover:text-[var(--lgm-ink)]"
                  >
                    {label}
                  </Link>
                ),
              )}
            </span>
          </nav>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="lets-go-header:whatsapp"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[3px] bg-[var(--lgm-action)] px-3 text-[11px] font-semibold text-white no-underline transition-colors hover:bg-[var(--lgm-action-hover)] motion-reduce:transition-none lg:hidden"
          >
            {copy.cta}
          </a>
        </div>

        <nav
          aria-label={copy.navAria}
          className="flex min-h-12 items-center justify-between gap-3 border-t border-[var(--lgm-line)] lg:hidden"
        >
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-11 items-center text-xs font-medium text-[var(--lgm-muted)] no-underline"
          >
            {copy.mainSiteMobile}
          </Link>
          <span role="group" aria-label={copy.languages} className="flex items-center">
            {LOCALES.map(({ code, label, aria }) =>
              code === locale ? (
                <span
                  key={code}
                  aria-current="page"
                  lang={code === "fr" ? "fr-CA" : code}
                  className="inline-flex h-11 min-w-11 items-center justify-center border-b-2 border-[var(--lgm-action)] text-xs font-semibold"
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={code}
                  href={`/${code}${pathWithoutLocale}`}
                  aria-label={aria}
                  hrefLang={code === "fr" ? "fr-CA" : code}
                  lang={code === "fr" ? "fr-CA" : code}
                  className="inline-flex h-11 min-w-11 items-center justify-center text-xs font-semibold text-[var(--lgm-muted)] no-underline"
                >
                  {label}
                </Link>
              ),
            )}
          </span>
        </nav>
      </div>
    </header>
  );
}
