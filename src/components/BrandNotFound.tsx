"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  buildJacquieWhatsAppHref,
  normalizeSiteLocale,
  type SiteLocale,
} from "@/lib/whatsapp";

const COPY: Record<
  SiteLocale,
  { title: string; text: string; home: string; whatsapp: string }
> = {
  es: {
    title: "Esta página no está disponible",
    text: "Puede que el enlace haya cambiado o que la página ya no exista.",
    home: "Volver al inicio",
    whatsapp: "Hablar por WhatsApp",
  },
  en: {
    title: "This page isn’t available",
    text: "The link may have changed, or the page may no longer exist.",
    home: "Back to home",
    whatsapp: "Chat on WhatsApp",
  },
  fr: {
    title: "Cette page n’est pas disponible",
    text: "Le lien a peut-être changé ou la page n’existe plus.",
    home: "Retour à l’accueil",
    whatsapp: "Écrire sur WhatsApp",
  },
};

export default function BrandNotFound({
  documentClassName,
}: {
  documentClassName: string;
}) {
  const pathname = usePathname();
  const locale = normalizeSiteLocale(pathname.split("/")[1]);
  const copy = COPY[locale];
  const lang = locale === "fr" ? "fr-CA" : locale;

  return (
    <html lang={lang} className={documentClassName}>
      <body>
        <main className="min-h-dvh bg-paper text-ink font-sans antialiased">
          <section className="mx-auto flex min-h-[60dvh] w-full max-w-[760px] flex-col justify-center px-4 py-16 text-center sm:py-24">
            <Link
              href={`/${locale}`}
              className="mx-auto font-display text-lg font-medium text-primary no-underline hover:opacity-80"
            >
              Jacquie Zárate
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              404
            </p>
            <h1 className="mt-3 font-display text-[42px] font-medium leading-[0.98] text-primary sm:text-[58px]">
              {copy.title}
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-[1.7] text-foreground/80">
              {copy.text}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/${locale}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
              >
                {copy.home}
              </Link>
              <a
                href={buildJacquieWhatsAppHref(locale)}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="404:whatsapp"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/20 bg-white px-5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface"
              >
                {copy.whatsapp}
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
