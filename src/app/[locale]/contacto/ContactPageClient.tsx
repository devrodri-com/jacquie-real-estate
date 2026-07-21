"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";
import {
  buildJacquieWhatsAppHref,
  type SiteLocale,
} from "@/lib/whatsapp";

const CONTACT_EMAIL = "jacqueline@miamiliferealty.com";
const CONTACT_PHONE_DISPLAY = "+1 (786) 407-2591";

type ContactPageClientProps = {
  locale: SiteLocale;
  transportConfigured: boolean;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.54 4.1 1.57 5.89L0 24l6.42-1.67a11.75 11.75 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.14-3.38-8.44ZM12.05 21.4a9.55 9.55 0 0 1-4.86-1.33l-.35-.2-3.81 1 1.02-3.71-.23-.38a9.65 9.65 0 0 1-1.49-5.2c0-5.32 4.33-9.64 9.66-9.64 2.58 0 5 1 6.82 2.82a9.6 9.6 0 0 1 2.83 6.8c0 5.32-4.33 9.64-9.59 9.64Zm5.46-7.17c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.78-1.49-1.73-1.66-2.02-.17-.3-.02-.46.13-.6.13-.12.3-.32.44-.48.15-.16.2-.27.3-.45.1-.2.05-.36-.02-.5-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.5.07-.76.36-.26.3-1 1-1 2.42s1.02 2.8 1.17 3c.15.2 2.02 3.08 4.92 4.33.69.3 1.24.48 1.66.6.7.22 1.35.19 1.86.12.57-.08 1.77-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.36Z" />
    </svg>
  );
}

export default function ContactPageClient({
  locale,
  transportConfigured,
}: ContactPageClientProps) {
  const t = useTranslations("contact");
  const whatsappHref = buildJacquieWhatsAppHref(
    locale,
    t("whatsappMessage")
  );

  const trackWhatsApp = () => {
    try {
      window.gtag?.("event", "click_whatsapp", {
        event_category: "engagement",
        event_label: "contact_whatsapp_direct_" + locale,
      });
    } catch {
      // Tracking must not block the real contact channel.
    }
  };

  return (
    <div className="w-full py-10 sm:py-14 lg:py-16">
      <section
        aria-labelledby="contact-title"
        className="grid items-start gap-9 min-[1100px]:grid-cols-[1.12fr_0.88fr] min-[1100px]:gap-14"
      >
        <header className="max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/78">
            {t("eyebrow")}
          </p>
          <h1
            id="contact-title"
            className="mt-3 max-w-[15ch] font-display text-[34px] font-medium leading-[1.02] text-primary sm:text-[46px] lg:text-[54px]"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[65ch] text-[15px] leading-[1.75] text-foreground/76 sm:text-base">
            {t("intro")}
          </p>
        </header>

        <div className="border-t border-primary/12 pt-7 min-[1100px]:border-l min-[1100px]:border-t-0 min-[1100px]:pl-10 min-[1100px]:pt-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/72">
            {t("directEyebrow")}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-primary/12">
              <Image
                src="/images/jacquie-zarate.jpg"
                alt="Jacquie Zárate"
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
            <div>
              <p className="font-display text-[26px] font-medium leading-tight text-primary">
                {t("directTitle")}
              </p>
              <p className="mt-1 text-sm font-semibold text-primary/72">
                Jacquie Zárate
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-7 text-foreground/74">
            {t("directBody")}
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsApp}
            data-analytics="contact:whatsapp"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary px-5 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto motion-reduce:transition-none"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            {t("whatsappCta")}
          </a>
          <p className="mt-3 text-xs text-foreground/72">
            <span className="sr-only">
              {t("whatsappNumberLabel") + ": "}
            </span>
            {CONTACT_PHONE_DISPLAY}
          </p>

          <div className="mt-6 border-t border-primary/10 pt-5">
            <p className="text-sm font-semibold text-primary">
              {t("emailEyebrow")}
            </p>
            <p className="mt-1 text-sm leading-6 text-foreground/68">
              {t("emailBody")}
            </p>
            <a
              href={"mailto:" + CONTACT_EMAIL}
              className="mt-3 inline-flex min-h-11 max-w-full items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Mail
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
                strokeWidth={1.8}
              />
              <span className="break-all sm:break-normal">
                {CONTACT_EMAIL}
              </span>
            </a>
          </div>
        </div>
      </section>

      {transportConfigured ? (
        <section
          aria-labelledby="contact-form-title"
          className="relative mt-14 max-w-[880px] overflow-hidden rounded-xl border border-primary/12 bg-surface/72 p-5 sm:mt-16 sm:p-7 lg:p-8"
        >
          <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/72">
            {t("formEyebrow")}
          </p>
          <h2
            id="contact-form-title"
            className="mt-2 font-display text-[30px] font-medium leading-tight text-primary sm:text-[36px]"
          >
            {t("formTitle")}
          </h2>
          <p className="mt-3 max-w-[65ch] text-[15px] leading-7 text-foreground/72">
            {t("formIntro")}
          </p>

          <ContactForm locale={locale} />
        </section>
      ) : null}

      <section
        aria-labelledby="stays-title"
        className="mt-14 flex flex-col gap-5 border-t border-primary/14 pt-7 sm:mt-16 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-[68ch]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/72">
            {t("staysEyebrow")}
          </p>
          <h2
            id="stays-title"
            className="mt-2 font-display text-[28px] font-medium leading-tight text-primary sm:text-[32px]"
          >
            {t("staysTitle")}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-foreground/72">
            {t("staysBody")}
          </p>
        </div>
        <Link
          href={"/" + locale + "/lets-go-miami"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-primary/55 bg-white px-4 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:self-auto motion-reduce:transition-none"
        >
          {t("staysCta")}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </Link>
      </section>
    </div>
  );
}
