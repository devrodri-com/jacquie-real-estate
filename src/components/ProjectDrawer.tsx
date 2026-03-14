// src/components/ProjectDrawer.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import type { Project } from "@/data/types";
import imageKitLoader from "@/utils/imageKitLoader";
import { ALL_PROJECTS } from "@/data/projects";

export type ProjectDrawerProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDrawer({ open, project, onClose }: ProjectDrawerProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const isEN = locale === "en";

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const t = useMemo(
    () => ({
      title: isEN ? "Project details" : "Ficha del proyecto",
      close: isEN ? "Close" : "Cerrar",
      summary: isEN ? "Summary" : "Resumen",
      payments: isEN ? "Payment plan" : "Plan de pagos",
      faqs: isEN ? "FAQs" : "Preguntas frecuentes",
      location: isEN ? "Location" : "Ubicación",
      rental: isEN ? "Rental policy" : "Política de renta",
      priceFrom: isEN ? "From" : "Desde",
      perSf: isEN ? "~/sf" : "~/sf",
      ctas: {
        schedule: isEN ? "Schedule" : "Agendar reunión",
        whatsapp: isEN ? "WhatsApp" : "WhatsApp",
        email: isEN ? "Email Esteban" : "Email a Esteban",
      },
    }),
    [isEN]
  );

  if (!open || !project) return null;

  // Build gallery: prefer `project.images` (ImageKit) → fallback to hero/local image
  const gallery: { src: string; alt: string }[] = [];
  if (Array.isArray(project.images) && project.images.length) {
    for (const img of project.images.slice(0, 6)) {
      if (!img?.src) continue;
      gallery.push({ src: img.src, alt: img.alt ?? project.name });
    }
  } else if (project.image) {
    gallery.push({ src: project.image, alt: project.name });
  }

  const bookingUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ21yM5KOsoq2niX4QY7FXyUrFiLuQpLxw9IIzheIYWY1ruSBHG5DUrSzUmGst3Ew4nb8ZKw6ptP";

  const waNumber = "17542673931";
  const waText = isEN
    ? `Hi Esteban, I'm interested in ${project.name}. Could you please send me more information?`
    : `Hola Esteban, estoy interesado/a en ${project.name}. ¿Podés enviarme más información?`;
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  const numberLocale = isEN ? "en-US" : "es-ES";
  const fmt = (n?: number) => (typeof n === "number" ? n.toLocaleString(numberLocale) : "");

  // Helper to decide if a src should use ImageKit loader (relative path intended for IK or absolute IK URL)
  const shouldUseIKLoader = (src: string) => !src.startsWith("/") || !!process.env.NEXT_PUBLIC_IMAGEKIT_BASE_URL;

  const rentalDisplay = isEN
    ? project.rentalPolicyEn ?? project.rentalPolicy
    : project.rentalPolicyEs ?? project.rentalPolicy;

  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        onClick={onClose}
        aria-label={t.close}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[540px] md:w-[640px] bg-white shadow-2xl border-l border-black/10 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-4 border-b border-black/10">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#0A2540]">
              <a
                href={`/${locale}/proyectos/${(project.slug ?? "").toString().split("/").pop()}`}
                className="hover:opacity-90"
              >
                {project.name}
              </a>
            </h2>
            <p className="mt-0.5 text-[12px] text-[#0A2540]/70">
              {project.city}
              {project.delivery ? ` · ${project.delivery}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t.close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-[#0A2540] hover:bg-[#F9FAFB]"
          >
            ✕
          </button>
        </div>

        {/* Content scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="-mx-4 px-4">
              <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {gallery.map((g, i) => (
                  <div key={i} className="relative snap-center shrink-0 w-[70%] sm:w-[55%] md:w-[48%] aspect-[4/3] overflow-hidden rounded-lg border border-black/10">
                    <Image
                      loader={shouldUseIKLoader(g.src) ? imageKitLoader : undefined}
                      src={g.src}
                      alt={g.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 50vw, 70vw"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key facts */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-[13px] text-[#0A2540]">
            <div>
              <div className="text-[11px] uppercase tracking-wide opacity-60">{t.location}</div>
              <div className="mt-0.5 font-medium">{project.city}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide opacity-60">{t.rental}</div>
              <div className="mt-0.5 font-medium">{rentalDisplay || (isEN ? "—" : "—")}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide opacity-60">{t.priceFrom}</div>
              <div className="mt-0.5 font-medium">
                {typeof project.priceFromUsd === "number"
                  ? (isEN ? `USD ${fmt(project.priceFromUsd)}` : `USD ${fmt(project.priceFromUsd)}`)
                  : (isEN ? "Inquire" : "Consultar")}
                {typeof project.pricePerSfApprox === "number" ? (
                  <span className="ml-1 opacity-60"> · ~${project.pricePerSfApprox}{t.perSf}</span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Highlights */}
          {(() => {
            const caps = isEN ? project.highlightsEn ?? project.highlights : project.highlights;
            return caps && caps.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0A2540]">{t.summary}</h3>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[13px] text-[#0A2540]">
                  {caps.slice(0, 8).map((h: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#0A2540]/30">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null;
          })()}

          {/* Payment plan */}
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-[#0A2540]">{t.payments}</h3>
            {(() => {
              const steps = isEN ? project.paymentPlanEn : project.paymentPlanEs;
              if (Array.isArray(steps) && steps.length) {
                return (
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-[13px] text-[#0A2540]/80">
                    {steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p className="mt-2 text-[13px] text-[#0A2540]/80">
                  {isEN
                    ? "Staged deposits typically 20-40% before closing. Exact schedule varies by developer."
                    : "Entradas por hitos, típicamente 20-40% antes del cierre. El cronograma exacto varía según el developer."}
                </p>
              );
            })()}
          </div>

          {/* FAQs */}
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-[#0A2540]">{t.faqs}</h3>
            {(() => {
              let faqs = (isEN ? project.faqsEn : project.faqsEs) ?? [];
              if (!faqs.length) {
                const slugFromProject = (project.slug ?? "").toString().split("/").pop();
                const slugFromParams = (params?.slug as string) || "";
                const slugToUse = (slugFromProject || slugFromParams) as string;
                const full = ALL_PROJECTS.find(p => (p.slug ?? "").toString().endsWith(slugToUse));
                faqs = (isEN ? full?.faqsEn : full?.faqsEs) ?? [];
              }
              return faqs.length ? (
                <ul className="mt-2 space-y-2">
                  {faqs.map((f, i) => (
                    <li key={i}>
                      <p className="text-[13px] font-medium text-[#0A2540]">{f.q}</p>
                      <p className="text-[13px] text-[#0A2540]/80">{f.a}</p>
                    </li>
                  ))}
                </ul>
              ) : null;
            })()}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 pb-[env(safe-area-inset-bottom)] border-t border-black/10">
          {/* Mobile layout: schedule full width, then two side-by-side */}
          <div className="flex flex-col gap-2 sm:hidden max-h-[40vh] overflow-y-auto">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-medium text-white hover:opacity-95"
            >
              {t.ctas.schedule}
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[#0A2540]/20 px-3 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]"
              >
                {t.ctas.whatsapp}
              </a>
              <a
                href={`mailto:esteban@miamiliferealty.com`}
                className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[#0A2540]/20 px-3 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]"
              >
                {t.ctas.email}
              </a>
            </div>
            <a
              href={`/${locale}/proyectos/${(project.slug ?? "").toString().split("/").pop()}`}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-medium text-white hover:opacity-95"
            >
              {isEN ? "View project" : "Ver proyecto"}
            </a>
          </div>

          {/* Desktop layout: three inline */}
          <div className="hidden sm:flex gap-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-medium text-white hover:opacity-95"
            >
              {t.ctas.schedule}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]"
            >
              {t.ctas.whatsapp}
            </a>
            <a
              href={`mailto:esteban@miamiliferealty.com`}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]"
            >
              {t.ctas.email}
            </a>
            <a
              href={`/${locale}/proyectos/${(project.slug ?? "").toString().split("/").pop()}`}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]"
            >
              {isEN ? "View project" : "Ver proyecto"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}