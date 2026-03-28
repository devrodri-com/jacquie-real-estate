// src/components/SectionWhyPrecon.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";


type SectionWhyPreconProps = {
  heroImageSrc?: string;
  heroImageAlt?: string;
};

type Locale = "es" | "en" | "fr";

export function SectionWhyPrecon({ heroImageSrc, heroImageAlt }: SectionWhyPreconProps) {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "es";
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN ? "Pre-construction projects" : isFR ? "Projets en préconstruction" : "Proyectos de preconstrucción";
  const copy = isEN
    ? "If you want to evaluate pre-construction projects in Miami, I can help you identify selected opportunities from the brokerage with strong appreciation potential."
    : isFR
      ? "Si vous souhaitez évaluer des projets en préconstruction à Miami, je peux vous aider à identifier des opportunités sélectionnées du brokerage avec un bon potentiel de valorisation."
      : "Si querés evaluar proyectos de preconstrucción en Miami, puedo ayudarte a identificar opciones seleccionadas del brokerage con buen potencial de valorización.";

  const points: { kpi: string; label: string }[] = isEN
    ? [
        { kpi: "Staged entry", label: "Payments spread over the construction period." },
        { kpi: "Appreciation potential", label: "Buying early can generate value before delivery." },
        { kpi: "Selected projects", label: "Access to brokerage projects with strong rental demand." },
      ]
    : isFR
      ? [
          { kpi: "Entrée échelonnée", label: "Paiements répartis pendant la construction." },
          { kpi: "Potentiel de valorisation", label: "Acheter tôt peut générer une plus-value avant la livraison." },
          { kpi: "Projets sélectionnés", label: "Accès à des projets du brokerage avec une bonne demande locative." },
        ]
      : [
          { kpi: "Entrada escalonada", label: "Pagos distribuidos durante la construcción." },
          { kpi: "Potencial de valorización", label: "Comprar temprano puede generar plusvalía antes de la entrega." },
          { kpi: "Proyectos seleccionados", label: "Acceso a proyectos del brokerage con buena demanda de renta." },
        ];

  const ctaLabel = isEN ? "See pre-construction projects" : isFR ? "Voir les projets en préconstruction" : "Ver proyectos de preconstrucción";
  const ctaSecondary = isEN ? "Eligible projects" : isFR ? "Projets admissibles" : "Proyectos elegibles";
  const preconHref = `/${locale}/proyectos`;

  return (
    <section aria-labelledby="why-precon" className="mt-12">
      {heroImageSrc ? (
        <figure className="mb-3">
          <div className="relative w-full h-[96px] sm:h-[112px] md:h-[120px] lg:h-[128px] overflow-hidden rounded-lg border border-black/10 bg-white">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt ?? (isEN ? "Pre-construction in Miami" : isFR ? "Préconstruction à Miami" : "Preconstrucción en Miami")}
              fill
              sizes="(min-width: 1024px) 992px, 100vw"
              className="object-cover contrast-110 saturate-95 brightness-95"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          </div>
        </figure>
      ) : null}
      <div className="max-w-3xl">
        <h2 id="why-precon" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">{title}</h2>
        <p className="mt-2 text-sm text-foreground max-w-2xl">{copy}</p>
      </div>

      <ul className="mt-3 grid gap-3 md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {points.map((p, i) => (
          <li
            key={i}
            className="relative flex items-start gap-3 rounded-[10px] ring-1 ring-primary/10 bg-primary/5 p-4 sm:p-5"
          >
            <div className="h-10 w-[3px] rounded-full bg-gradient-to-b from-accent/25 to-accent/5" />
            <p className="leading-tight">
              <span className="block text-[15px] md:text-[16px] font-semibold tracking-tight whitespace-nowrap md:whitespace-normal text-primary">{p.kpi}</span>
              <span className="block text-[12px] md:text-[13px] leading-snug text-foreground/80">{p.label}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <Link
          href={preconHref}
          className="inline-flex h-11 sm:h-10 w-full sm:w-auto text-center items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-95 hover:-translate-y-px hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </Link>
        <Link
          href={`/${locale}/proyectos`}
          className="inline-flex h-11 sm:h-10 w-full sm:w-auto items-center justify-center rounded-md border border-primary/20 px-4 text-sm font-medium text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {ctaSecondary}
        </Link>
      </div>
    </section>
  );
}

export default SectionWhyPrecon;