// src/utils/projectsImport.ts
// Helper to transform rows coming from CSV/Sheets into the Project shape.
// Use this if we later automate import; for now it documents the mapping.

import type { Project, RentalPolicy } from "@/data/projects";

/**
 * Raw row as it would come from your Preconstruction Master spreadsheet (or a CSV export).
 * Adjust keys only if the sheet headers change.
 */
export type RawRow = {
  Name: string;
  City: string;               // e.g. "Brickell", "Miami Beach", "Wynwood"
  RentalPolicy: string;       // e.g. "No restr.", "30 días"
  Furnished?: string;         // "Si" | "No"
  PriceFromUSD?: string;      // e.g. "720000"
  PricePerSf?: string;        // e.g. "1500"
  Delivery?: string;          // e.g. "2026" | "Q4 2026"
  Image?: string;             // relative or absolute URL
  Slug?: string;              // optional; will be derived if absent
  Highlights?: string;        // pipe/semicolon separated ES labels
  HighlightsEn?: string;      // optional EN labels
};

const toBool = (s?: string) => /si|sí|yes|true/i.test(s ?? "");
const toNum = (s?: string) => {
  if (!s) return undefined;
  const n = Number(String(s).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

/**
 * Convert a sheet/CSV row into our Project object.
 * id should be unique (suggestion: a slugified name or the sheet row id).
 */
export function rowToProject(id: string, r: RawRow): Project {
  const rental = (r.RentalPolicy?.trim() as RentalPolicy) || ("30 días" as RentalPolicy);
  const name = r.Name?.trim() || id;
  const slug = r.Slug?.trim() || `/proyectos/${name.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$|--+/g, "-")}`;

  return {
    id,
    name,
    city: r.City?.trim() || "Miami",
    rentalPolicy: rental,
    furnished: r.Furnished ? toBool(r.Furnished) : undefined,
    priceFromUsd: toNum(r.PriceFromUSD),
    pricePerSfApprox: toNum(r.PricePerSf),
    delivery: r.Delivery?.trim(),
    financingAtClosing: true,
    image: r.Image?.trim() || "/images/projects/placeholder.webp",
    slug,
    highlights: r.Highlights ? r.Highlights.split(/;|\|/).map(s => s.trim()).filter(Boolean) : undefined,
    highlightsEn: r.HighlightsEn ? r.HighlightsEn.split(/;|\|/).map(s => s.trim()).filter(Boolean) : undefined,
  };
}