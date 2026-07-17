"use client";

import { useId, useMemo, useState } from "react";
import { CatalogSelect } from "@/app/[locale]/proyectos/CatalogSelect";
import {
  PROJECTS_CATALOG_COPY,
  type ProjectSortValue,
  type ProjectsCatalogLocale,
  type RentalFilterValue,
} from "@/app/[locale]/proyectos/content";

export type Filters = {
  q: string;
  rental: RentalFilterValue;
  min?: number;
  max?: number;
  sort: ProjectSortValue;
};

type ProjectsFiltersProps = {
  locale: ProjectsCatalogLocale;
  value: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  isDirty: boolean;
  invalidRange: boolean;
};

function parseBudgetInput(input: string): number | undefined {
  const digits = input.replace(/\D/g, "");
  if (!digits) return undefined;
  const value = Number(digits);
  return value >= 10_000 ? value : value * 1_000;
}

function budgetInputValue(value?: number): string {
  return typeof value === "number" ? String(Math.round(value / 1_000)) : "";
}

export function ProjectsFilters({
  locale,
  value,
  onChange,
  onReset,
  isDirty,
  invalidRange,
}: ProjectsFiltersProps) {
  const copy = PROJECTS_CATALOG_COPY[locale];
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rangeErrorId = useId();
  const numberLocale = locale === "en" ? "en-US" : locale === "fr" ? "fr-CA" : "es-ES";
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(numberLocale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [numberLocale]
  );

  const rentalOptions = useMemo(
    () =>
      (Object.keys(copy.filters.rentalOptions) as RentalFilterValue[]).map(
        (option) => ({
          value: option,
          label: copy.filters.rentalOptions[option],
        })
      ),
    [copy]
  );

  const activeFilters = [
    value.q.trim()
      ? {
          key: "q",
          label: `${copy.filters.searchLabel}: ${value.q.trim()}`,
          clear: () => onChange({ ...value, q: "" }),
        }
      : null,
    value.rental !== "all"
      ? {
          key: "rental",
          label: copy.filters.rentalOptions[value.rental],
          clear: () => onChange({ ...value, rental: "all" }),
        }
      : null,
    typeof value.min === "number"
      ? {
          key: "min",
          label: `≥ ${currency.format(value.min)}`,
          clear: () => onChange({ ...value, min: undefined }),
        }
      : null,
    typeof value.max === "number"
      ? {
          key: "max",
          label: `≤ ${currency.format(value.max)}`,
          clear: () => onChange({ ...value, max: undefined }),
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section
      aria-labelledby="catalog-controls-title"
      className="border-y border-primary/12 bg-paper"
    >
      <div className="flex min-h-16 items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/72">
            {copy.filters.activeCount(activeFilters.length)}
          </p>
          <h2
            id="catalog-controls-title"
            className="mt-1 font-display text-[24px] font-medium leading-none text-primary"
          >
            {copy.filters.title}
          </h2>
        </div>
        <button
          type="button"
          aria-controls={panelId}
          aria-expanded={open}
          aria-label={open ? copy.filters.hideAria : copy.filters.showAria}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-primary/25 px-4 text-sm font-semibold text-primary outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden"
        >
          {copy.filters.button}
          {activeFilters.length > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">
              {activeFilters.length}
            </span>
          ) : null}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        id={panelId}
        className={`${open ? "grid" : "hidden"} gap-6 border-t border-primary/10 py-6 md:grid md:grid-cols-2 xl:grid-cols-[minmax(260px,1.3fr)_minmax(190px,.8fr)_minmax(320px,1fr)] xl:items-start`}
      >
        <label className="block min-w-0">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/68">
            {copy.filters.searchLabel}
          </span>
          <span className="relative block">
            <input
              type="search"
              value={value.q}
              placeholder={copy.filters.searchPlaceholder}
              onChange={(event) => onChange({ ...value, q: event.target.value })}
              className="min-h-11 w-full border-b border-primary/25 bg-transparent py-2 pr-9 text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/68 hover:border-primary focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/55"
            >
              <path
                fillRule="evenodd"
                d="M9 3a6 6 0 1 0 3.745 10.69l3.782 3.783a.75.75 0 1 0 1.06-1.06l-3.781-3.782A6 6 0 0 0 9 3Zm-4.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>

        <CatalogSelect
          label={copy.filters.rentalLabel}
          value={value.rental}
          options={rentalOptions}
          onChange={(rental) => onChange({ ...value, rental })}
        />

        <fieldset className="min-w-0 md:col-span-2 xl:col-span-1">
          <legend className="sr-only">{copy.filters.priceHint}</legend>
          <div className="grid grid-cols-2 gap-4">
            <label className="block min-w-0">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/68">
                {copy.filters.minBudget}
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9 ]*"
                value={budgetInputValue(value.min)}
                placeholder={copy.filters.minPlaceholder}
                aria-invalid={invalidRange}
                aria-describedby={invalidRange ? rangeErrorId : undefined}
                onChange={(event) =>
                  onChange({ ...value, min: parseBudgetInput(event.target.value) })
                }
                className="min-h-11 w-full min-w-0 border-b border-primary/25 bg-transparent py-2 text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/68 hover:border-primary focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
            </label>
            <label className="block min-w-0">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/68">
                {copy.filters.maxBudget}
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9 ]*"
                value={budgetInputValue(value.max)}
                placeholder={copy.filters.maxPlaceholder}
                aria-invalid={invalidRange}
                aria-describedby={invalidRange ? rangeErrorId : undefined}
                onChange={(event) =>
                  onChange({ ...value, max: parseBudgetInput(event.target.value) })
                }
                className="min-h-11 w-full min-w-0 border-b border-primary/25 bg-transparent py-2 text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/68 hover:border-primary focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
            </label>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-foreground/72">
            {copy.filters.priceHint}
          </p>
          {invalidRange ? (
            <p id={rangeErrorId} role="alert" className="mt-1 text-[12px] font-medium text-red-700">
              {copy.filters.rangeError}
            </p>
          ) : null}
        </fieldset>
      </div>

      {activeFilters.length > 0 || isDirty ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-primary/10 py-3">
          {activeFilters.length > 0 ? (
            <p className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/72">
              {copy.filters.activeLabel}
            </p>
          ) : null}
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={filter.clear}
              aria-label={copy.filters.removeFilterAria(filter.label)}
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-primary/18 bg-surface px-3 text-left text-[12px] font-medium leading-4 text-primary outline-none transition-colors hover:border-primary/45 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="min-w-0 break-words">{filter.label}</span>
              <span aria-hidden="true" className="text-base leading-none">
                ×
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center px-2 text-[12px] font-semibold text-primary underline decoration-primary/30 underline-offset-4 outline-none hover:decoration-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {copy.filters.reset}
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default ProjectsFilters;
