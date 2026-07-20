import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import {
  buildLetsGoMiamiEmailHref,
  buildLetsGoMiamiWhatsAppHref,
  LETS_GO_MIAMI_COPY,
  LETS_GO_MIAMI_EMAIL,
  LETS_GO_MIAMI_PHONE_DISPLAY,
  LETS_GO_MIAMI_PHONE_HREF,
  type LetsGoMiamiLocale,
} from "@/lib/letsGoMiami";

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type LetsGoMiamiFooterProps = {
  locale: LetsGoMiamiLocale;
};

export default function LetsGoMiamiFooter({ locale }: LetsGoMiamiFooterProps) {
  const copy = LETS_GO_MIAMI_COPY[locale].footer;
  const emailHref = buildLetsGoMiamiEmailHref(locale);
  const whatsappHref = buildLetsGoMiamiWhatsAppHref(locale);

  return (
    <footer
      className="bg-[var(--lgm-ink)] text-white"
      data-section="footer"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-white sm:h-[72px] sm:w-[72px]">
                <Image
                  src="/images/lets-go-miami/logo.png"
                  alt={copy.logoAlt}
                  fill
                  sizes="(min-width: 640px) 72px, 64px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em]">Let’s Go Miami</p>
                <p className="mt-1 text-sm text-white/72">by Jacna Services LLC</p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/58">
                  Vacation Condo Management
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-7 text-white/76">
              {copy.tagline}
            </p>
            <Link
              href={`/${locale}`}
              className="mt-3 inline-flex min-h-11 items-center border-b border-white/35 text-sm font-medium text-white/82 no-underline transition-colors hover:border-white hover:text-white motion-reduce:transition-none"
            >
              {copy.mainSiteLink}
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
              {copy.contactTitle}
            </h2>
            <div className="mt-4 divide-y divide-white/14 border-y border-white/14">
              <a
                href={emailHref}
                aria-label={`${copy.emailLabel}: ${LETS_GO_MIAMI_EMAIL}`}
                className="flex min-h-12 items-center gap-3 py-2 text-sm text-white/84 no-underline transition-colors hover:text-white motion-reduce:transition-none"
              >
                <Mail aria-hidden className="h-5 w-5 shrink-0" strokeWidth={1.6} />
                <span className="break-all">{LETS_GO_MIAMI_EMAIL}</span>
              </a>
              <a
                href={LETS_GO_MIAMI_PHONE_HREF}
                aria-label={`${copy.phoneLabel}: ${LETS_GO_MIAMI_PHONE_DISPLAY}`}
                className="flex min-h-12 items-center gap-3 py-2 text-sm text-white/84 no-underline transition-colors hover:text-white motion-reduce:transition-none"
              >
                <Phone aria-hidden className="h-5 w-5 shrink-0" strokeWidth={1.6} />
                <span>{LETS_GO_MIAMI_PHONE_DISPLAY}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.whatsappLabel}
                className="flex min-h-12 items-center gap-3 py-2 text-sm text-white/84 no-underline transition-colors hover:text-white motion-reduce:transition-none"
              >
                <IconWhatsApp className="h-5 w-5 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/14">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-4 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Let’s Go Miami by Jacna Services LLC. {copy.rights}</p>
          <a
            href="https://www.devrodri.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-6 w-fit items-center text-white/58 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white motion-reduce:transition-none"
          >
            {copy.madeBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
