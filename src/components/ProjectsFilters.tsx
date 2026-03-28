// src/components/ProjectsFilters.tsx
"use client";
import { useMemo, useEffect, useRef, useState, useCallback } from "react";

export type Filters = {
  q: string;
  rental: "all" | "No restr." | "30 días" | "60 días" | "90 días" | "6 meses";
  min?: number;
  max?: number;
  sort?: "alpha-asc" | "alpha-desc" | "price-asc" | "price-desc";
};

export function ProjectsFilters({
  locale = "es",
  value,
  onChange,
  onReset,
}: {
  locale?: "es" | "en" | "fr";
  value: Filters;
  onChange: (next: Filters) => void;
  onReset?: () => void;
}) {
  const t = useMemo(() => {
    const L =
      locale === "en"
        ? {
            title: "Filters",
            search: "Search projects",
            rental: "Rental policy",
            any: "Any",
            priceFrom: "Min price",
            priceTo: "Max price",
            sort: "Sort by",
            reset: "Reset",
            priceHint: "Prices in thousands (500 = 500,000 USD)",
            placeholderMin: "e.g. 500",
            placeholderMax: "e.g. 800",
            sortLabels: {
              "alpha-asc": "A→Z",
              "alpha-desc": "Z→A",
              "price-asc": "Lowest price",
              "price-desc": "Highest price",
            } as Record<NonNullable<Filters["sort"]>, string>,
            rentalLabels: {
              all: "Any",
              "No restr.": "No restrictions",
              "30 días": "30 days",
              "60 días": "60 days",
              "90 días": "90 days",
              "6 meses": "6 months",
            } as Record<Filters["rental"], string>,
          }
        : locale === "fr"
          ? {
              title: "Filtres",
              search: "Rechercher des projets",
              rental: "Politique de location",
              any: "Toutes",
              priceFrom: "Prix min.",
              priceTo: "Prix max.",
              sort: "Trier par",
              reset: "Réinitialiser",
              priceHint: "Prix en milliers (500 = 500 000 USD)",
              placeholderMin: "p. ex. 500",
              placeholderMax: "p. ex. 800",
              sortLabels: {
                "alpha-asc": "A→Z",
                "alpha-desc": "Z→A",
                "price-asc": "Prix le plus bas",
                "price-desc": "Prix le plus élevé",
              } as Record<NonNullable<Filters["sort"]>, string>,
              rentalLabels: {
                all: "Toutes",
                "No restr.": "Sans restriction",
                "30 días": "30 jours",
                "60 días": "60 jours",
                "90 días": "90 jours",
                "6 meses": "6 mois",
              } as Record<Filters["rental"], string>,
            }
          : {
              title: "Filtros",
              search: "Buscar proyectos",
              rental: "Política de renta",
              any: "Todas",
              priceFrom: "Precio mín.",
              priceTo: "Precio máx.",
              sort: "Ordenar por",
              reset: "Reiniciar",
              priceHint: "Precios en miles (500 = 500.000 USD)",
              placeholderMin: "ej. 500",
              placeholderMax: "ej. 800",
              sortLabels: {
                "alpha-asc": "A→Z",
                "alpha-desc": "Z→A",
                "price-asc": "Precio más bajo",
                "price-desc": "Precio más alto",
              } as Record<NonNullable<Filters["sort"]>, string>,
              rentalLabels: {
                all: "Todas",
                "No restr.": "No restr.",
                "30 días": "30 días",
                "60 días": "60 días",
                "90 días": "90 días",
                "6 meses": "6 meses",
              } as Record<Filters["rental"], string>,
            };

    return {
      title: L.title,
      search: L.search,
      rental: L.rental,
      any: L.any,
      priceFrom: L.priceFrom,
      priceTo: L.priceTo,
      sort: L.sort,
      reset: L.reset,
      priceHint: L.priceHint,
      placeholderMin: L.placeholderMin,
      placeholderMax: L.placeholderMax,
      sortLabel: (v?: Filters["sort"]) => L.sortLabels[v || "alpha-asc"],
      rentalLabel: (v: Filters["rental"]) => L.rentalLabels[v] ?? String(v),
    };
  }, [locale]);

  const rentalOptions: Filters["rental"][] = [
    "all",
    "No restr.",
    "30 días",
    "60 días",
    "90 días",
    "6 meses",
  ];

  const sortOptions: NonNullable<Filters["sort"]>[] = [
    "alpha-asc",
    "alpha-desc",
    "price-asc",
    "price-desc",
  ];

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close = useCallback(() => setOpen(false), []);

  const [openSort, setOpenSort] = useState(false);
  const btnSortRef = useRef<HTMLButtonElement>(null);
  const listSortRef = useRef<HTMLUListElement>(null);
  const toggleSort = useCallback(() => setOpenSort((v) => !v), []);
  const closeSort = useCallback(() => setOpenSort(false), []);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!listRef.current || !btnRef.current) return;
      if (!listRef.current.contains(e.target as Node) && !btnRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open, close]);

  // close rental dropdown when value changes
  useEffect(() => {
    setOpen(false);
  }, [value.rental]);

  useEffect(() => {
    if (!openSort) return;
    const onDoc = (e: MouseEvent) => {
      if (!listSortRef.current || !btnSortRef.current) return;
      if (!listSortRef.current.contains(e.target as Node) && !btnSortRef.current.contains(e.target as Node)) closeSort();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSort(); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [openSort, closeSort]);

  // close sort dropdown when value changes
  useEffect(() => {
    setOpenSort(false);
  }, [value.sort]);

  return (
    <aside aria-label={t.title} className="rounded-[10px] bg-primary p-4 sm:p-5 ring-1 ring-primary-foreground/10 text-primary-foreground relative max-w-[1100px] mx-auto">
      <div className="mb-2 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-primary-foreground">{t.title}</p>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-8 items-center justify-center rounded-md border border-primary-foreground/25 bg-transparent px-2 text-[12px] text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {t.reset}
          </button>
        ) : null}
      </div>
      {/* Search */}
      <label className="block text-[12px] font-medium text-primary-foreground/90">
        {t.search}
        <div className="relative mt-1">
          <input
            type="text"
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            placeholder={t.search}
            className="block w-full rounded-md border border-primary-foreground/20 bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/40 transition"
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
          </svg>
        </div>
      </label>

      {/* Rental policy */}
      <label className="mt-3 block text-[12px] font-medium text-primary-foreground/90">
        {t.rental}
        <div className="relative mt-1">
          <button
            ref={btnRef}
            type="button"
            onClick={toggle}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="flex w-full items-center justify-between rounded-md border border-primary-foreground/20 bg-white px-3 py-2 text-left text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40 transition"
          >
            <span>{t.rentalLabel(value.rental)}</span>
            <svg className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
          </button>

          {open && (
            <ul
              ref={listRef}
              role="listbox"
              className="absolute z-20 bottom-full mb-2 max-h-56 w-full overflow-auto rounded-md border border-primary/10 bg-white text-foreground py-1 text-sm shadow-lg focus:outline-none sm:bottom-auto sm:top-full sm:mt-2 sm:mb-0 hover:ring-accent/30 transition"
            >
              {rentalOptions.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={value.rental === opt}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onChange({ ...value, rental: opt }); close(); }}
                  onClick={(e) => { e.stopPropagation(); }}
                  className={`relative cursor-pointer px-3 py-2 hover:bg-muted ${value.rental === opt ? "bg-muted" : ""}`}
                >
                  {value.rental === opt && (
                    <span className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-accent/50 to-accent/10" />
                  )}
                  {t.rentalLabel(opt)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      {/* Sort by */}
      <label className="mt-3 block text-[12px] font-medium text-primary-foreground/90">
        {t.sort}
        <div className="relative mt-1">
          <button
            ref={btnSortRef}
            type="button"
            onClick={toggleSort}
            aria-haspopup="listbox"
            aria-expanded={openSort}
            className="flex w-full items-center justify-between rounded-md border border-primary-foreground/20 bg-white px-3 py-2 text-left text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40 transition"
          >
            <span>{t.sortLabel(value.sort)}</span>
            <svg className={`h-4 w-4 text-muted-foreground transition-transform ${openSort ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
          </button>

          {openSort && (
            <ul
              ref={listSortRef}
              role="listbox"
              className="absolute z-20 bottom-full mb-2 max-h-56 w-full overflow-auto rounded-md border border-primary/10 bg-white text-foreground py-1 text-sm shadow-lg focus:outline-none sm:bottom-auto sm:top-full sm:mt-2 sm:mb-0 hover:ring-accent/30 transition"
            >
              {sortOptions.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={value.sort === opt}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onChange({ ...value, sort: opt }); closeSort(); }}
                  onClick={(e) => { e.stopPropagation(); }}
                  className={`relative cursor-pointer px-3 py-2 hover:bg-muted ${value.sort === opt ? "bg-muted" : ""}`}
                >
                  {value.sort === opt && (
                    <span className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-accent/50 to-accent/10" />
                  )}
                  {t.sortLabel(opt)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      {/* Price range */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="block text-[12px] font-medium text-primary-foreground/90">
          {t.priceFrom}
          <div className="relative mt-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t.placeholderMin}
              value={typeof value.min === "number" ? String(Math.floor(value.min / 1000)) : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                onChange({ ...value, min: raw ? Number(raw) * 1000 : undefined });
              }}
              className="block w-full rounded-md border border-primary-foreground/20 bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/40 transition"
            />
          </div>
        </label>
        <label className="block text-[12px] font-medium text-primary-foreground/90">
          {t.priceTo}
          <div className="relative mt-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t.placeholderMax}
              value={typeof value.max === "number" ? String(Math.floor(value.max / 1000)) : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                onChange({ ...value, max: raw ? Number(raw) * 1000 : undefined });
              }}
              className="block w-full rounded-md border border-primary-foreground/20 bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent/40 transition"
            />
          </div>
        </label>
      </div>
      <p className="mt-2 text-[11px] text-primary-foreground/40">
        {t.priceHint}
      </p>

      {/* Reset */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...value })}
          className="hidden"
          aria-hidden
        />
      </div>
    </aside>
  );
}

export default ProjectsFilters;