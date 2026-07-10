// src/app/[locale]/proyectos/ProyectosPageClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useCallback } from "react";
import { ALL_PROJECTS } from "@/data/projects/index";
import type { Project } from "@/data/types";
import ProjectsFilters, { type Filters } from "@/components/ProjectsFilters";
import { getRentalPolicyForFilter } from "@/utils/rentalPolicyForFilter";
import { useParams } from "next/navigation";
import { getProjectFrOverlay } from "@/data/projectsFrOverlay";

export default function ProyectosPageClient() {
  const { locale } = useParams() as { locale: string };
  const isEn = locale === "en";
  const isFr = locale === "fr";
  const numberLocale = isEn ? "en-US" : isFr ? "fr-CA" : "es-ES";
  const filterLocale = isEn ? "en" : isFr ? "fr" : "es";
  const fmt = (n?: number) =>
    typeof n === "number"
      ? new Intl.NumberFormat(numberLocale, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(n)
      : undefined;

  const priceSfSuffix = isFr ? "/pi²" : isEn ? "/sf" : "/ft²";

  const [filters, setFilters] = useState<Filters>({ q: "", rental: "all", min: undefined, max: undefined, sort: 'alpha-asc' });

  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return ALL_PROJECTS.filter((p) => {
      const textOk = q
        ? (p.name?.toLowerCase().includes(q) || p.city?.toLowerCase().includes(q))
        : true;

      const projectRental = getRentalPolicyForFilter(p);
      const rentalOk = filters.rental === "all" ? true : projectRental === filters.rental;

      const pf = typeof p.priceFromUsd === "number" ? p.priceFromUsd : undefined;
      const minOk = typeof filters.min === "number" ? (typeof pf === "number" && pf >= filters.min) : true;
      const maxOk = typeof filters.max === "number" ? (typeof pf === "number" && pf <= filters.max) : true;

      return textOk && rentalOk && minOk && maxOk;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const arr = filtered.slice();
    const byTitleAsc = (a: Project, b: Project) => (a.name || '').localeCompare(b.name || '');
    const byTitleDesc = (a: Project, b: Project) => (b.name || '').localeCompare(a.name || '');
    const byPriceAsc = (a: Project, b: Project) => {
      const ap = typeof a.priceFromUsd === 'number' ? a.priceFromUsd : Number.POSITIVE_INFINITY;
      const bp = typeof b.priceFromUsd === 'number' ? b.priceFromUsd : Number.POSITIVE_INFINITY;
      return ap - bp;
    };
    const byPriceDesc = (a: Project, b: Project) => {
      const ap = typeof a.priceFromUsd === 'number' ? a.priceFromUsd : Number.NEGATIVE_INFINITY;
      const bp = typeof b.priceFromUsd === 'number' ? b.priceFromUsd : Number.NEGATIVE_INFINITY;
      return bp - ap;
    };

    switch (filters.sort) {
      case 'alpha-desc':
        return arr.sort(byTitleDesc);
      case 'price-asc':
        return arr.sort(byPriceAsc);
      case 'price-desc':
        return arr.sort(byPriceDesc);
      case 'alpha-asc':
      default:
        return arr.sort(byTitleAsc);
    }
  }, [filtered, filters.sort]);

  return (
    <div className="px-4 py-10 text-foreground sm:py-14">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-none">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary/70">
              {isEn ? "PRECONSTRUCTION" : isFr ? "PRÉCONSTRUCTION" : "PRECONSTRUCCIÓN"}
            </p>
            <h1 className="mt-2 font-display text-[42px] font-medium leading-[0.98] tracking-normal text-primary sm:text-[56px] lg:whitespace-nowrap">
              {isEn
                ? "Preconstruction projects"
                : isFr
                  ? "Projets en préconstruction"
                  : "Proyectos de preconstrucción"}
            </h1>
            <p className="mt-4 max-w-[72ch] text-[16px] leading-[1.75] text-foreground/78">
              {isEn
                ? "Compare selected projects in Miami, Orlando, and other Florida markets, with a focus on location, delivery timing, rental flexibility, and investment criteria."
                : isFr
                  ? "Comparez des projets sélectionnés à Miami, Orlando et dans d’autres secteurs de la Floride, selon l’emplacement, la livraison, la flexibilité locative et les critères d’investissement."
                  : "Compará proyectos seleccionados en Miami, Orlando y distintas zonas de Florida, con foco en ubicación, entrega, flexibilidad de renta y criterio de inversión."}
            </p>
          </div>
          <button
            type="button"
            onClick={openDrawer}
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary/15 bg-white px-3 text-sm font-medium text-primary hover:bg-surface sm:hidden"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="filters-drawer"
          >
            {isEn ? "Filters" : isFr ? "Filtres" : "Filtros"}
          </button>
        </div>

        <div className="hidden sm:block">
          <ProjectsFilters
            locale={filterLocale}
            value={filters}
            onChange={setFilters}
            onReset={() => setFilters({ q: "", rental: "all", min: undefined, max: undefined, sort: 'alpha-asc' })}
          />
        </div>
      </div>

      {open && (
        <div
          id="filters-drawer"
          role="dialog"
          aria-modal="true"
          className="sm:hidden fixed inset-0 z-50"
        >
          <button
            aria-label={isEn ? "Close filters" : isFr ? "Fermer les filtres" : "Cerrar filtros"}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-xl border-l border-black/10 p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">
                {isEn ? "Filters" : isFr ? "Filtres" : "Filtros"}
              </h2>
              <button
                onClick={closeDrawer}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-primary hover:bg-muted"
                aria-label={isEn ? "Close" : isFr ? "Fermer" : "Cerrar"}
              >
                ✕
              </button>
            </div>
            <div className="mt-3 overflow-y-auto">
              <ProjectsFilters
                locale={filterLocale}
                value={filters}
                onChange={(next) => setFilters(next)}
                onReset={() => setFilters({ q: "", rental: "all", min: undefined, max: undefined, sort: 'alpha-asc' })}
              />
            </div>
            <div className="pt-3">
              <button
                onClick={closeDrawer}
                className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-95"
              >
                {isEn ? "Apply" : isFr ? "Appliquer" : "Aplicar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {sorted.map((p, index) => {
          const frOverlay = isFr ? getProjectFrOverlay(p.slug) : undefined;

          const legacyRental = p.rentalPolicy != null ? String(p.rentalPolicy) : "";
          const rentalDisplay =
            locale === "en"
              ? (p.rentalPolicyEn ?? legacyRental)
              : locale === "fr"
                ? (frOverlay?.rentalPolicyFr ??
                    p.rentalPolicyEn ??
                    p.rentalPolicyEs ??
                    legacyRental)
                : (p.rentalPolicyEs ?? legacyRental);

          const caps =
            locale === "en"
              ? p.highlightsEn ?? p.highlights
              : locale === "fr"
                ? frOverlay?.highlightsFr?.length
                  ? frOverlay.highlightsFr
                  : (p.highlightsEn ?? p.highlights)
                : p.highlights;

          const deliveryLabel =
            locale === "fr" ? (frOverlay?.deliveryFr ?? p.delivery) : p.delivery;
          const cityLabel = locale === "fr" ? (frOverlay?.cityFr ?? p.city) : p.city;

          return (
            <article
              key={p.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-paper text-foreground ring-1 ring-primary/10 shadow-sm transition hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(43,37,48,0.10)]"
            >
            <Link href={`/${locale}${p.slug}`} className="block no-underline">
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                  sizes="(min-width: 1024px) 350px, (min-width: 768px) 50vw, calc(100vw - 2rem)"
                  quality={index === 0 ? 75 : 65}
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                {deliveryLabel && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/10 backdrop-blur-sm">
                    {deliveryLabel}
                  </span>
                )}
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="min-h-[52px] font-display text-[24px] font-medium leading-[1.08] tracking-normal text-primary line-clamp-2">
                <Link href={`/${locale}${p.slug}`} className="text-primary no-underline hover:underline underline-offset-4 decoration-primary/25">
                  {p.name}
                </Link>
              </h2>
              <p className="mt-2 h-[18px] truncate text-[12px] font-medium uppercase tracking-[0.12em] text-primary/70">
                {cityLabel} · {rentalDisplay}
              </p>
              <div className="mt-3 h-[22px] truncate text-[15px] font-semibold text-primary">
                {typeof p.priceFromUsd === "number"
                  ? (locale === "en"
                      ? `From ${fmt(p.priceFromUsd)}`
                      : locale === "fr"
                        ? `À partir de ${fmt(p.priceFromUsd)}`
                        : `Desde ${fmt(p.priceFromUsd)}`)
                  : locale === "en"
                    ? "Inquire"
                    : locale === "fr"
                      ? "Consulter"
                      : "Consultar"}
                {typeof p.pricePerSfApprox === "number" ? (
                  <span className="ml-1 text-[12px] font-normal text-foreground/70"> · ~${p.pricePerSfApprox}{priceSfSuffix}</span>
                ) : null}
              </div>
              <div className="mt-4 grid h-[58px] grid-rows-2 content-start gap-2 overflow-hidden">
                {caps?.slice(0, 2).map((h: string, i: number) => (
                    <span
                      key={i}
                      title={h}
                      className="block max-w-full truncate whitespace-nowrap rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/10"
                    >
                      {h}
                    </span>
                ))}
              </div>

              <div className="flex-1" />
              <Link
                href={`/${locale}${p.slug}`}
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md border border-primary bg-primary px-3 text-sm font-medium text-primary-foreground no-underline shadow-[0_8px_18px_rgba(59,39,74,0.14)] transition hover:bg-primary/90 hover:shadow-[0_10px_22px_rgba(59,39,74,0.18)] focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
              >
                {locale === "en"
                  ? "View details"
                  : locale === "fr"
                    ? "Voir plus de détails"
                    : "Ver más detalles"}
              </Link>
            </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
