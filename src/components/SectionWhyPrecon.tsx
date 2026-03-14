// src/components/SectionWhyPrecon.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";


type SectionWhyPreconProps = {
  heroImageSrc?: string;
  heroImageAlt?: string;
};

type Locale = "es" | "en";

export function SectionWhyPrecon({ heroImageSrc, heroImageAlt }: SectionWhyPreconProps) {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "es";
  const isEN = locale === "en";

  const title = isEN ? "Why Pre‑construction?" : "¿Por qué Preconstrucción?";
  const copy = isEN
    ? "Deposits 20-40%. Proven 15-30% appreciation. Seamless closing."
    : "Entradas desde 20-40%. Plusvalía comprobada 15-30%. Cierre sin fricciones.";

  const points: { kpi: string; label: string }[] = isEN
    ? [
        { kpi: "20-40%", label: "Staged deposits" },
        { kpi: "15-30%", label: "Appreciation during works" },
        { kpi: "Prime", label: "Amenities & rental demand" },
        { kpi: "Developer", label: "+ escrow protection" },
        { kpi: "Lower", label: "carrying until delivery" },
        { kpi: "Financing", label: "at closing (foreigners)" },
      ]
    : [
        { kpi: "20-40%", label: "Entradas por hitos" },
        { kpi: "15-30%", label: "Plusvalía en obra" },
        { kpi: "Prime", label: "Amenities y demanda" },
        { kpi: "Desarrollador", label: "+ cuenta escrow" },
        { kpi: "Menor", label: "carga hasta entrega" },
        { kpi: "Financiación", label: "al cierre (extranjeros)" },
      ];

  const ctaLabel = isEN ? "Pre‑construction insight" : "Análisis de Preconstrucción";
  const ctaSecondary = isEN ? "Eligible projects" : "Proyectos elegibles";
  const preconHref = `/${locale}/precon`;

  return (
    <section aria-labelledby="why-precon" className="mt-12">
      {heroImageSrc ? (
        <figure className="mb-3">
          <div className="relative w-full h-[96px] sm:h-[112px] md:h-[120px] lg:h-[128px] overflow-hidden rounded-lg border border-black/10 bg-white">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt ?? (isEN ? "Pre-construction in Miami" : "Preconstrucción en Miami")}
              fill
              sizes="(min-width: 1024px) 992px, 100vw"
              className="object-cover contrast-110 saturate-95 brightness-95"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[#0A2540]/[0.05] pointer-events-none" />
          </div>
        </figure>
      ) : null}
      <div className="max-w-3xl">
        <h2 id="why-precon" className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0A2540]">{title}</h2>
        <p className="mt-2 text-sm text-[#0D1521] max-w-2xl">{copy}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {isEN ? (
            <>
              <span className="inline-flex items-center rounded-md bg-[#0A2540]/5 px-2.5 py-1 text-[12px] font-medium text-[#0A2540] ring-1 ring-[#0A2540]/10">20/10/10/60</span>
              <span className="inline-flex items-center rounded-md bg-[#0A2540]/5 px-2.5 py-1 text-[12px] font-medium text-[#0A2540] ring-1 ring-[#0A2540]/10">15-30% appreciation</span>
              <span className="inline-flex items-center rounded-md bg-[#0A2540]/5 px-2.5 py-1 text-[12px] font-medium text-[#0A2540] ring-1 ring-[#0A2540]/10">~70-75% LTV</span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center rounded-md bg-[#0A2540]/5 px-2.5 py-1 text-[12px] font-medium text-[#0A2540] ring-1 ring-[#0A2540]/10">20/10/10/60</span>
              <span className="inline-flex items-center rounded-md bg-[#0A2540]/5 px-2.5 py-1 text-[12px] font-medium text-[#0A2540] ring-1 ring-[#0A2540]/10">15-30% plusvalía</span>
              <span className="inline-flex items-center rounded-md bg-[#0A2540]/5 px-2.5 py-1 text-[12px] font-medium text-[#0A2540] ring-1 ring-[#0A2540]/10">~70-75% LTV</span>
            </>
          )}
        </div>
      </div>

      <ul className="mt-3 grid gap-3 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {points.map((p, i) => (
          <li
            key={i}
            className="relative flex items-start gap-3 rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
          >
            <div className="h-10 w-[3px] rounded-full" style={{background:'linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))'}} />
            <p className="text-white/95 leading-tight">
              <span className="block text-[15px] md:text-[16px] font-semibold tracking-tight whitespace-nowrap md:whitespace-normal text-white">{p.kpi}</span>
              <span className="block text-[12px] md:text-[13px] leading-snug text-white/80">{p.label}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <Link
          href={preconHref}
          className="inline-flex h-11 sm:h-10 w-full sm:w-auto text-center items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-medium text-white transition
             hover:opacity-95 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(10,37,64,.10)]
             focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:ring-offset-2"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </Link>
        <Link
          href={`/${locale}/proyectos`}
          className="inline-flex h-11 sm:h-10 w-full sm:w-auto items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] transition hover:bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:ring-offset-2"
        >
          {ctaSecondary}
        </Link>
      </div>
    </section>
  );
}

export default SectionWhyPrecon;