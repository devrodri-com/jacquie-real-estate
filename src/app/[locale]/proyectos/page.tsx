// src/app/[locale]/proyectos/page.tsx
import type { Metadata } from "next";
import ProyectosPageClient from "./ProyectosPageClient";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";
import { buildJacquieWhatsAppHref } from "@/lib/whatsapp";
import { ALL_PROJECTS } from "@/data/projects/index";
import type { Project } from "@/data/types";
import { getProjectFrOverlay } from "@/data/projectsFrOverlay";
import { getRentalPolicyForFilter } from "@/utils/rentalPolicyForFilter";
import {
  PROJECTS_CATALOG_COPY,
  type CatalogProjectItem,
  type ProjectsCatalogLocale,
} from "./content";

const proyectosMeta: Record<
  "es" | "en" | "fr",
  { title: string; description: string }
> = {
  es: {
    title: "Proyectos de preconstrucción | Jacquie Zarate Realtor",
    description:
      "Explora y compara proyectos de preconstrucción en Miami, Orlando y otras zonas de Florida según ubicación, precio inicial, fecha de entrega, condiciones de renta y tipologías.",
  },
  en: {
    title: "Preconstruction projects | Jacquie Zarate Realtor",
    description:
      "Explore and compare preconstruction projects in Miami, Orlando, and other areas of Florida by location, starting price, delivery timing, rental policy, and residence types.",
  },
  fr: {
    title: "Projets en préconstruction | Jacquie Zarate Realtor",
    description:
      "Explorez et comparez des projets de préconstruction à Miami, à Orlando et ailleurs en Floride selon l’emplacement, le prix de départ, la date de livraison, les conditions de location et les types de résidences.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const m = proyectosMeta[locale];

  return createPageMetadata({
    locale,
    path: "proyectos",
    title: m.title,
    description: m.description,
  });
}

function localizedUnitTypes(
  project: Project,
  locale: ProjectsCatalogLocale
): string[] {
  const frOverlay = locale === "fr" ? getProjectFrOverlay(project.slug) : undefined;
  const source =
    locale === "fr"
      ? frOverlay?.unitMixFr ?? project.unitMixFr ?? project.unitMixEn ?? project.unitMixEs
      : locale === "en"
        ? project.unitMixEn ?? project.unitMixEs
        : project.unitMixEs ?? project.unitMixEn;

  return (source ?? [])
    .map((item) => (typeof item === "string" ? item : item.label))
    .map((item) => item.trim())
    .filter(Boolean);
}

const EN_DELIVERY_OVERRIDES: Record<string, string> = {
  "/proyectos/ave-maria": "8–12 months",
  "/proyectos/the-lauderdale": "Dec 2029",
};

const EN_RENTAL_OVERRIDES: Record<string, string> = {
  "/proyectos/ave-maria": "Traditional rentals (long-term).",
};

function toCatalogItem(
  project: Project,
  locale: ProjectsCatalogLocale
): CatalogProjectItem {
  const copy = PROJECTS_CATALOG_COPY[locale];
  const frOverlay = locale === "fr" ? getProjectFrOverlay(project.slug) : undefined;
  const rentalCategory = getRentalPolicyForFilter(project);
  const legacyRental = project.rentalPolicy?.trim();
  const rentalPolicy =
    locale === "fr"
      ? frOverlay?.rentalPolicyFr || project.rentalPolicyFr || project.rentalPolicyEn || project.rentalPolicyEs || legacyRental
      : locale === "en"
        ? project.rentalPolicyEn || EN_RENTAL_OVERRIDES[project.slug] ||
          (rentalCategory ? copy.filters.rentalOptions[rentalCategory] : legacyRental)
        : project.rentalPolicyEs || legacyRental;

  return {
    id: project.id,
    name: project.name,
    city:
      locale === "fr" ? frOverlay?.cityFr || project.city : project.city,
    delivery:
      locale === "fr"
        ? frOverlay?.deliveryFr || project.deliveryFr || project.delivery
        : locale === "en"
          ? EN_DELIVERY_OVERRIDES[project.slug] || project.delivery
          : project.delivery,
    priceFromUsd: project.priceFromUsd,
    rentalPolicy: rentalPolicy || undefined,
    rentalCategory,
    unitTypes: localizedUnitTypes(project, locale),
    image: project.image,
    slug: project.slug,
  };
}

export default async function ProyectosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const copy = PROJECTS_CATALOG_COPY[locale];
  const projects = ALL_PROJECTS.map((project) =>
    toCatalogItem(project, locale)
  );
  const whatsappHref = buildJacquieWhatsAppHref(
    locale,
    copy.close.whatsappMessage
  );

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <section
        aria-labelledby="projects-catalog-title"
        className="border-b border-primary/12 bg-surface"
      >
        <div className="mx-auto grid w-full max-w-[1280px] px-5 py-6 sm:px-8 sm:py-12 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10 lg:py-14">
          <div className="order-1 min-w-0 lg:order-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/72 lg:hidden">
              {copy.header.eyebrow}
            </p>
            <h1
              id="projects-catalog-title"
              className="mt-2 max-w-[14ch] font-display text-[40px] font-medium leading-[0.98] tracking-[-0.02em] text-primary sm:mt-3 sm:text-[52px] lg:mt-0 lg:text-[64px]"
            >
              {copy.header.title}
            </h1>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-foreground/76 sm:mt-5 sm:text-[17px] sm:leading-[1.75]">
              {copy.header.intro}
            </p>

            <dl className="mt-4 grid gap-3 border-t border-primary/15 pt-3 sm:mt-6 sm:grid-cols-2 sm:gap-7 sm:pt-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/72">
                  {copy.header.scopeLabel}
                </dt>
                <dd className="mt-2 max-w-[38ch] text-[13px] leading-5 text-foreground/72">
                  {copy.header.scopeValue}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/72">
                  {copy.header.compareLabel}
                </dt>
                <dd className="mt-2 max-w-[48ch] text-[13px] leading-5 text-foreground/72">
                  {copy.header.compareValue}
                </dd>
              </div>
            </dl>
          </div>

          <aside className="order-2 mt-4 border-t border-primary/15 pt-3 sm:mt-6 sm:pt-4 lg:order-1 lg:mt-0 lg:border-r lg:border-t-0 lg:pr-8 lg:pt-0">
            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/72 lg:block">
              {copy.header.eyebrow}
            </p>
            <p className="mt-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/72 lg:mt-5">
              {copy.header.availabilityLabel}
            </p>
            <p className="mt-2 max-w-[28ch] text-[13px] leading-[1.7] text-foreground/74 sm:leading-6">
              {copy.header.availabilityValue}
            </p>
          </aside>
        </div>
      </section>

      <ProyectosPageClient locale={locale} projects={projects} />

      <section
        aria-labelledby="projects-help-title"
        className="border-t border-primary/15 bg-surface"
      >
        <div className="mx-auto grid w-full max-w-[1180px] gap-7 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[minmax(0,.9fr)_minmax(320px,1.1fr)] md:items-start md:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/72">
              {copy.close.eyebrow}
            </p>
            <h2
              id="projects-help-title"
              className="mt-3 max-w-[16ch] font-display text-[38px] font-medium leading-[1.02] text-primary sm:text-[46px]"
            >
              {copy.close.title}
            </h2>
          </div>
          <div className="max-w-[58ch]">
            <p className="text-[16px] leading-[1.75] text-foreground/76">
              {copy.close.text}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center border border-primary bg-primary px-5 text-sm font-semibold text-primary-foreground no-underline outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
            >
              {copy.close.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
