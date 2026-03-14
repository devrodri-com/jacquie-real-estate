// src/utils/rentalPolicyForFilter.ts
import type { Project } from "@/data/types";

export type RentalFilter = "all" | "No restr." | "30 días" | "60 días" | "90 días" | "6 meses";

const RENTAL_VALUES: Exclude<RentalFilter, "all">[] = [
  "No restr.",
  "30 días",
  "60 días",
  "90 días",
  "6 meses",
];

/**
 * Derives the rental policy category for filter matching.
 * Supports legacy `rentalPolicy` and derivation from `rentalPolicyEs`/`rentalPolicyEn`.
 */
export function getRentalPolicyForFilter(
  p: Project
): Exclude<RentalFilter, "all"> | null {
  // A) Legacy: exact match on rentalPolicy
  if (
    p.rentalPolicy &&
    RENTAL_VALUES.includes(p.rentalPolicy as Exclude<RentalFilter, "all">)
  ) {
    return p.rentalPolicy as Exclude<RentalFilter, "all">;
  }

  // B) Derive from rentalPolicyEs + rentalPolicyEn
  const text = `${p.rentalPolicyEs ?? ""} ${p.rentalPolicyEn ?? ""}`.toLowerCase();

  // Check in order: most restrictive first, then "No restr."
  if (
    /\b6\s*meses\b|\bseis\s*meses\b|6-?month|6\s*months/i.test(text)
  ) {
    return "6 meses";
  }
  if (
    /\b90\s*d[ií]as\b|90-?day|90\s*days|\b90\s*d\b/i.test(text)
  ) {
    return "90 días";
  }
  if (
    /\b60\s*d[ií]as\b|60-?day|60\s*days|\b60\s*d\b/i.test(text)
  ) {
    return "60 días";
  }
  if (
    /\b30\s*d[ií]as\b|30-?day|30\s*days|\b31\s*days\b|m[ií]nimo\s*30|minimum\s*30|30\s*day\s*min/i.test(text)
  ) {
    return "30 días";
  }

  // No restr. / short-term allowed
  const noRestrPatterns = [
    /sin\s*restr/i,
    /sin\s*restricciones/i,
    /no\s*restrictions/i,
    /no\s*rental\s*restrictions/i,
    /alquiler\s*flexible/i,
    /flexible\s*rentals?/i,
    /flexible\s*use/i,
    /estad[ií]as\s*cortas/i,
    /short\s*stays?/i,
    /short[- ]?term/i,
    /diarias?|daily\s*rentals?|daily\s*airbnb/i,
    /airbnb/i,
    /no\s*minimum\s*rental/i,
    /no\s*m[ií]nimo/i,
    /uso\s*flexible/i,
    /renta\s*flexible/i,
    /permite\s*corta\s*y\s*larga/i,
    /short[- ]?\s*and\s*long[- ]?term/i,
    /lodging.*nightly|nightly.*lodging/i,
    /renta\s*corta\s*permitida/i,
    /short[- ]?term\s*rentals?\s*(permitted|allowed)/i,
  ];
  if (noRestrPatterns.some((re) => re.test(text))) {
    return "No restr.";
  }

  return null;
}
