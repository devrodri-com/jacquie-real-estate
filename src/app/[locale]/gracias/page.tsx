// src/app/[locale]/gracias/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export default function GraciasPage() {
  const router = useRouter();
  const { locale } = useParams() as { locale: "es" | "en" | "fr" };
  const isEN = locale === "en";
  const isFR = locale === "fr";

  useEffect(() => {
    const title = isEN
      ? "Thanks for your message"
      : isFR
        ? "Merci pour votre message"
        : "¡Gracias por contactarnos!";
    document.title = `${title} · Jacquie Zarate Realtor`;
  }, [isEN, isFR]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadySent = sessionStorage.getItem("lead_thankyou_sent");
    if (alreadySent === "1") {
      return;
    }

    const utmsJson = sessionStorage.getItem("lead_utms");
    if (!utmsJson) {
      return;
    }

    try {
      const utms = JSON.parse(utmsJson) as {
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        utm_content?: string;
        utm_term?: string;
      };

      window.gtag?.("event", "lead_thankyou", {
        locale: locale,
        ...(utms.utm_source && { utm_source: utms.utm_source }),
        ...(utms.utm_medium && { utm_medium: utms.utm_medium }),
        ...(utms.utm_campaign && { utm_campaign: utms.utm_campaign }),
      });

      sessionStorage.setItem("lead_thankyou_sent", "1");
      sessionStorage.removeItem("lead_utms");
    } catch (err) {
      console.error("Error parsing UTMs from sessionStorage:", err);
    }
  }, [locale]);

  const t = {
    title: isEN
      ? "Thanks for your message"
      : isFR
        ? "Merci pour votre message"
        : "¡Gracias por contactarnos!",
    desc: isEN
      ? "We received your request and will get back to you shortly."
      : isFR
        ? "Nous avons bien reçu votre demande et nous vous recontacterons sous peu."
        : "Recibimos tu consulta y te contactaremos a la brevedad.",
    ctaPrimary: isEN
      ? "See available projects"
      : isFR
        ? "Voir les projets disponibles"
        : "Ver proyectos disponibles",
    ctaSecondary: isEN
      ? "Chat on WhatsApp"
      : isFR
        ? "Écrire sur WhatsApp"
        : "Hablemos por WhatsApp",
    backToHome: isEN
      ? "Back to home"
      : isFR
        ? "Retour à l'accueil"
        : "Volver al inicio",
  };

  const waMsg = isEN
    ? "Hi Jacquie, I just submitted the form. I'd like to talk about opportunities in Miami."
    : isFR
      ? "Bonjour Jacquie, je viens d'envoyer le formulaire. J'aimerais discuter d'opportunités à Miami."
      : "Hola Jacquie, acabo de enviar el formulario. Me gustaría hablar sobre oportunidades en Miami.";

  return (
    <main className="bg-white px-4 py-16 sm:py-20">
      <section className="mx-auto flex min-h-[58vh] w-full max-w-[1100px] items-center justify-center">
        <div className="relative w-full max-w-[720px] overflow-hidden rounded-[16px] bg-surface/80 p-7 text-center shadow-sm ring-1 ring-primary/10 sm:p-10">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />

          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary ring-1 ring-primary/15">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

          <h1 className="font-display text-[34px] font-medium leading-[1.02] tracking-normal text-primary sm:text-[46px]">
          {t.title}
        </h1>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.75] text-foreground/75">
          {t.desc}
        </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href={`https://wa.me/17864072591?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            onClick={() => {
              window?.gtag?.("event", "click_whatsapp", { event_category: "engagement", event_label: "thankyou_whatsapp" });
            }}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 opacity-90 transition-transform group-hover:scale-110" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.54 4.1 1.57 5.89L0 24l6.42-1.67a11.75 11.75 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.14-3.38-8.44ZM12.05 21.4a9.55 9.55 0 0 1-4.86-1.33l-.35-.2-3.81 1 1.02-3.71-.23-.38a9.65 9.65 0 0 1-1.49-5.2c0-5.32 4.33-9.64 9.66-9.64 2.58 0 5 1 6.82 2.82a9.6 9.6 0 0 1 2.83 6.8c0 5.32-4.33 9.64-9.59 9.64Zm5.46-7.17c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.78-1.49-1.73-1.66-2.02-.17-.3-.02-.46.13-.6.13-.12.3-.32.44-.48.15-.16.2-.27.3-.45.1-.2.05-.36-.02-.5-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.5.07-.76.36-.26.3-1 1-1 2.42s1.02 2.8 1.17 3c.15.2 2.02 3.08 4.92 4.33.69.3 1.24.48 1.66.6.7.22 1.35.19 1.86.12.57-.08 1.77-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.36Z"/></svg>
            {t.ctaSecondary}
          </a>
            <a
              href={`/${locale}/proyectos`}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/15 bg-white px-5 text-[14px] font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
            >
              {t.ctaPrimary}
            </a>
        </div>

          <div className="mt-5">
          <button
            type="button"
            onClick={() => router.push(`/${locale}`)}
              className="text-sm font-medium text-primary/65 transition-colors hover:text-primary"
          >
            {t.backToHome}
          </button>
        </div>
      </div>
      </section>
    </main>
  );
}
