"use client";

import { useCallback, useMemo, useState } from "react";
import ProjectsFilters, { type Filters } from "@/components/ProjectsFilters";
import { CatalogSelect } from "./CatalogSelect";
import { ProjectCatalogCard } from "./ProjectCatalogCard";
import {
  PROJECTS_CATALOG_COPY,
  type CatalogProjectItem,
  type ProjectSortValue,
  type ProjectsCatalogLocale,
} from "./content";

const PAGE_SIZE = 6;

const INITIAL_FILTERS: Filters = {
  q: "",
  rental: "all",
  min: undefined,
  max: undefined,
  sort: "alpha-asc",
};

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

type ProyectosPageClientProps = {
  locale: ProjectsCatalogLocale;
  projects: CatalogProjectItem[];
};

export default function ProyectosPageClient({
  locale,
  projects,
}: ProyectosPageClientProps) {
  const copy = PROJECTS_CATALOG_COPY[locale];
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const collator = useMemo(
    () =>
      new Intl.Collator(locale === "fr" ? "fr-CA" : locale, {
        sensitivity: "base",
      }),
    [locale]
  );

  const invalidRange =
    typeof filters.min === "number" &&
    typeof filters.max === "number" &&
    filters.min > filters.max;

  const filtered = useMemo(() => {
    if (invalidRange) return [];
    const query = normalizeSearch(filters.q);

    return projects.filter((project) => {
      const searchable = normalizeSearch(`${project.name} ${project.city}`);
      const searchMatches = query ? searchable.includes(query) : true;
      const rentalMatches =
        filters.rental === "all"
          ? true
          : project.rentalCategory === filters.rental;
      const minMatches =
        typeof filters.min === "number"
          ? typeof project.priceFromUsd === "number" &&
            project.priceFromUsd >= filters.min
          : true;
      const maxMatches =
        typeof filters.max === "number"
          ? typeof project.priceFromUsd === "number" &&
            project.priceFromUsd <= filters.max
          : true;

      return searchMatches && rentalMatches && minMatches && maxMatches;
    });
  }, [filters, invalidRange, projects]);

  const sorted = useMemo(() => {
    const result = [...filtered];

    switch (filters.sort) {
      case "alpha-desc":
        return result.sort((a, b) => collator.compare(b.name, a.name));
      case "price-asc":
        return result.sort((a, b) => {
          const aPrice = a.priceFromUsd ?? Number.POSITIVE_INFINITY;
          const bPrice = b.priceFromUsd ?? Number.POSITIVE_INFINITY;
          return aPrice - bPrice;
        });
      case "price-desc":
        return result.sort((a, b) => {
          const aPrice = a.priceFromUsd ?? Number.NEGATIVE_INFINITY;
          const bPrice = b.priceFromUsd ?? Number.NEGATIVE_INFINITY;
          return bPrice - aPrice;
        });
      case "alpha-asc":
      default:
        return result.sort((a, b) => collator.compare(a.name, b.name));
    }
  }, [collator, filtered, filters.sort]);

  const updateFilters = useCallback((next: Filters) => {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setVisibleCount(PAGE_SIZE);
    requestAnimationFrame(() => {
      document.getElementById("catalog-controls-title")?.focus();
    });
  }, []);

  const total = sorted.length;
  const visibleTotal = Math.min(visibleCount, total);
  const hasActiveFilters =
    filters.q.trim().length > 0 ||
    filters.rental !== "all" ||
    typeof filters.min === "number" ||
    typeof filters.max === "number";
  const isDirty = hasActiveFilters || filters.sort !== "alpha-asc";
  const canShowMore = visibleTotal < total;
  const sortOptions = useMemo(
    () =>
      (Object.keys(copy.filters.sortOptions) as ProjectSortValue[]).map(
        (option) => ({
          value: option,
          label: copy.filters.sortOptions[option],
        })
      ),
    [copy]
  );

  const showMore = () => {
    const firstNewProject = sorted[visibleCount];
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, total));

    if (firstNewProject) {
      requestAnimationFrame(() => {
        const card = Array.from(
          document.querySelectorAll<HTMLElement>("[data-project-card]")
        ).find(
          (element) => element.dataset.projectSlug === firstNewProject.slug
        );
        card?.querySelector<HTMLElement>("[data-project-link]")?.focus();
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12 lg:py-14">
      <ProjectsFilters
        locale={locale}
        value={filters}
        onChange={updateFilters}
        onReset={resetFilters}
        isDirty={isDirty}
        invalidRange={invalidRange}
      />

      <section
        aria-labelledby="catalog-results-title"
        className="pt-9 sm:pt-11"
      >
        <div className="grid gap-5 border-b border-primary/12 pb-5 sm:grid-cols-[minmax(0,1fr)_230px] sm:items-end">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/72">
              {copy.results.label}
            </p>
            <h2
              id="catalog-results-title"
              data-results-count
              className="mt-1 font-display text-[34px] font-medium leading-none text-primary sm:text-[40px]"
            >
              {copy.results.count(total)}
            </h2>
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-2 text-[13px] text-foreground/68"
            >
              {invalidRange
                ? copy.filters.rangeError
                : copy.results.showing(visibleTotal, total)}
            </p>
          </div>
          <CatalogSelect
            label={copy.filters.sortLabel}
            value={filters.sort}
            options={sortOptions}
            onChange={(sort) => updateFilters({ ...filters, sort })}
          />
        </div>

        {invalidRange ? null : total === 0 ? (
          <div
            data-empty-state
            className="border-b border-primary/12 py-16 text-center sm:py-20"
          >
            <h3 className="font-display text-[32px] font-medium leading-tight text-primary">
              {copy.results.emptyTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-[54ch] text-[15px] leading-7 text-foreground/72">
              {copy.results.emptyBody}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center justify-center border border-primary px-5 text-sm font-semibold text-primary outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {copy.filters.reset}
            </button>
          </div>
        ) : (
          <>
            <ul
              role="list"
              data-project-grid
              className="mt-9 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-8"
            >
              {sorted.map((project, index) => {
                const visible = index < visibleCount;

                return (
                  <li
                    key={project.slug}
                    hidden={!visible}
                    data-project-card
                    data-project-slug={project.slug}
                    className="h-full min-w-0"
                  >
                    <ProjectCatalogCard
                      project={project}
                      locale={locale}
                      visible={visible}
                      priority={visible && index === 0}
                    />
                  </li>
                );
              })}
            </ul>

            {canShowMore ? (
              <div className="flex flex-col items-center border-b border-primary/12 py-10 sm:py-12">
                <p className="mb-4 text-[13px] text-foreground/68">
                  {copy.results.showing(visibleTotal, total)}
                </p>
                <button
                  type="button"
                  data-load-more
                  onClick={showMore}
                  className="inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {copy.results.showMore}
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
