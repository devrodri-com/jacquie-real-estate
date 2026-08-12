"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  buildJacquieWhatsAppHref,
  normalizeSiteLocale,
} from "@/lib/whatsapp";
import {
  CONTACT_SUCCESS_STORAGE_KEY,
  parseContactSuccessRecord,
} from "@/lib/contactSession";

type ConfirmationState = "checking" | "confirmed" | "direct";

export default function GraciasPage() {
  const t = useTranslations("thankYou");
  const { locale: rawLocale } = useParams<{ locale: string }>();
  const locale = normalizeSiteLocale(rawLocale);
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>("checking");

  useEffect(() => {
    let record = null;

    try {
      record = parseContactSuccessRecord(
        sessionStorage.getItem(CONTACT_SUCCESS_STORAGE_KEY),
        locale
      );
    } catch {
      record = null;
    }

    if (!record) {
      setConfirmationState("direct");
      return;
    }

    setConfirmationState("confirmed");
  }, [locale]);

  const confirmed = confirmationState === "confirmed";
  const eyebrow = confirmed
    ? t("confirmedEyebrow")
    : t("directEyebrow");
  const title = confirmed ? t("confirmedTitle") : t("directTitle");
  const body = confirmed ? t("confirmedBody") : t("directBody");
  const whatsappHref = buildJacquieWhatsAppHref(
    locale,
    confirmed
      ? t("confirmedWhatsappMessage")
      : t("directWhatsappMessage")
  );

  if (confirmationState === "checking") {
    return (
      <div className="w-full py-12 sm:py-16 lg:py-20">
        <section
          aria-busy="true"
          className="mx-auto min-h-40 max-w-[780px] border-t border-border-brand pt-7 sm:pt-9"
        >
          <h1 aria-live="polite" className="text-sm font-normal text-primary">
            {t("checkingStatus")}
          </h1>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20">
      <section
        className="mx-auto max-w-[780px]"
      >
        <p className="sr-only" role="status" aria-live="polite">
          {title}
        </p>
        <div className="border-t border-border-brand pt-7 sm:pt-9">
          <div className="flex items-center gap-3 text-primary">
            {confirmed ? (
              <Check
                aria-hidden="true"
                className="h-5 w-5 text-brand"
                strokeWidth={1.9}
              />
            ) : (
              <MessageCircle
                aria-hidden="true"
                className="h-5 w-5 text-brand"
                strokeWidth={1.8}
              />
            )}
            <p className="text-xs font-semibold uppercase tracking-[0.17em]">
              {eyebrow}
            </p>
          </div>

          <h1 className="mt-4 max-w-[15ch] font-display text-[36px] font-medium leading-[1.03] text-primary sm:text-[48px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-[1.75] text-foreground/74">
            {body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="thankyou:whatsapp"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white no-underline transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {t("whatsappCta")}
            </a>
            <Link
              href={
                confirmed
                  ? "/" + locale + "/proyectos"
                  : "/" + locale + "/contacto"
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary/55 bg-white px-5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {confirmed ? t("projectsCta") : t("contactCta")}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <Link
            href={"/" + locale}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            {t("homeCta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
