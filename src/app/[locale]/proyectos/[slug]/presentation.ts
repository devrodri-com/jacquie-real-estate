import type { SiteLocale } from "@/lib/seo";

export type LabelItem = string | { label: string; iconKey?: string };
type FaqItem = { q: string; a: string };

export type PaymentPresentationLine =
  | Readonly<{
      kind: "structured";
      raw: string;
      percentage: string;
      milestone: string;
      condition?: string;
    }>
  | Readonly<{
      kind: "fallback";
      raw: string;
    }>;

type ProjectPresentationGroups = Readonly<{
  microClaims: readonly LabelItem[];
  highlights: readonly LabelItem[];
  features: readonly LabelItem[];
  factValues: readonly string[];
  priceFromUsd?: number;
}>;

const FINANCING_ANSWER: Record<SiteLocale, string> = {
  es: "Las condiciones de financiamiento deben confirmarse con un prestamista y están sujetas a aprobación.",
  en: "Financing terms must be confirmed with a lender and are subject to approval.",
  fr: "Les conditions de financement doivent être confirmées auprès d’un prêteur et sont sous réserve d’approbation.",
};

const FINANCING_CLAUSE: Record<SiteLocale, string> = {
  es: "si se ofrece financiamiento a compradores extranjeros, estará sujeto a aprobación y a las condiciones vigentes",
  en: "if financing is offered to foreign buyers, it is subject to lender approval and current terms",
  fr: "si un financement est offert aux acheteurs étrangers, il est sous réserve de l’approbation du prêteur et des conditions en vigueur",
};

function normalizeClaim(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[‐‑‒–—―]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function labelValue(item: LabelItem): string {
  return typeof item === "string" ? item : item.label;
}

function meaningfulTokens(value: string): string[] {
  const stopWords = new Set([
    "a",
    "al",
    "and",
    "aux",
    "avec",
    "con",
    "de",
    "del",
    "des",
    "du",
    "el",
    "en",
    "et",
    "for",
    "in",
    "la",
    "las",
    "le",
    "les",
    "los",
    "of",
    "para",
    "the",
    "un",
    "une",
    "y",
  ]);

  return normalizeClaim(value)
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function furnishingSignature(value: string): string | null {
  const claim = normalizeClaim(value).replace(/[^a-z0-9]+/g, " ").trim();
  const isUnfurnished = /\b(?:sin amueblar|unfurnished|non meuble)\b/.test(
    claim
  );
  const isFurnished =
    /\b(?:amueblad\w*|furnished|meubl\w*|turnkey|cle en main)\b/.test(claim);
  if (!isUnfurnished && !isFurnished) return null;

  const allowed = new Set([
    "all",
    "and",
    "amueblada",
    "amuebladas",
    "amueblado",
    "amueblados",
    "apartments",
    "cle",
    "completamente",
    "completely",
    "delivered",
    "entierement",
    "et",
    "entrega",
    "entregadas",
    "entregados",
    "en",
    "finished",
    "finies",
    "finis",
    "fully",
    "furnished",
    "furnishing",
    "in",
    "key",
    "livrees",
    "livres",
    "main",
    "meuble",
    "meublee",
    "meublees",
    "meubles",
    "non",
    "residences",
    "residencias",
    "sin",
    "terminadas",
    "terminados",
    "turnkey",
    "unfurnished",
    "units",
    "y",
  ]);
  const tokens = claim.split(" ").filter(Boolean);
  if (tokens.some((token) => !allowed.has(token))) return null;
  return isUnfurnished ? "furnishing:unfurnished" : "furnishing:furnished";
}

function rentalSignature(value: string): string | null {
  const claim = normalizeClaim(value);
  if (
    /^(?:alquiler|renta|location|rental|rentas|locations)?\s*(?:flexible\s*)?\(?\s*(?:sin restricciones|no rental restrictions|aucune restriction(?: de location)?)\s*\)?$/.test(
      claim
    )
  ) {
    return "rental:no-restrictions";
  }

  const duration = claim.match(
    /(?:minimum|minimo|minima|duracion minimale|renta minima|location minimale)?\s*(\d+)\s*[- ]?(day|days|dia|dias|jour|jours|month|months|mes|mois)/
  );
  if (!duration) return null;
  const residual = claim
    .replace(duration[0], "")
    .replace(
      /(?:minimum|minimo|minima|duracion|renta|rental|rentals|location|locations|sejour|de|la|le|les|un|une|politica|policy|politique)/g,
      ""
    )
    .replace(/[^a-z0-9]+/g, "")
    .trim();
  if (residual) return null;
  return `rental:${duration[1]}:${duration[2].slice(0, 3)}`;
}

function deliverySignature(value: string): string | null {
  const claim = normalizeClaim(value)
    .replace(
      /(?:estimated|completion|date|delivery|entrega|estimada|estimado|livraison|prevue|prevu|achevement)/g,
      " "
    )
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  if (!claim || !/\b20\d{2}\b/.test(claim)) return null;
  if (!/^(?:(?:q|t)[1-4]\s+)?20\d{2}(?:\s+(?:q|t)[1-4])?(?:\s+20\d{2})?$/.test(claim)) {
    return null;
  }
  return `delivery:${claim}`;
}

function parsedUsdAmount(value: string): number | null {
  const claim = normalizeClaim(value);
  const match = claim.match(
    /(?:us\s*\$|usd|\$)\s*(\d+(?:[.,]\d+)*)(?:\s*([km]))?s?/
  );
  if (!match) return null;
  const suffix = match[2];
  const compact = match[1].replace(/[.,]/g, "");
  const parsed = Number(compact);
  if (!Number.isFinite(parsed)) return null;
  if (suffix === "k") return parsed * 1_000;
  if (suffix === "m") return parsed * 1_000_000;
  return parsed;
}

function priceSignature(value: string, priceFromUsd?: number): string | null {
  if (typeof priceFromUsd !== "number") return null;
  if (parsedUsdAmount(value) !== priceFromUsd) return null;

  const residual = normalizeClaim(value)
    .replace(/(?:us\s*\$|usd|\$)\s*\d+(?:[.,]\d+)*(?:\s*[km])?s?/, "")
    .replace(
      /(?:a partir de|starting in the|starting at|starting from|prices from|price from|precios desde|precio desde|desde|from|environ|approximate|aproximadamente)/g,
      ""
    )
    .replace(/[^a-z0-9]+/g, "")
    .trim();
  return residual ? null : `price:${priceFromUsd}`;
}

function semanticSignature(
  value: string,
  priceFromUsd?: number
): string | null {
  return (
    furnishingSignature(value) ??
    rentalSignature(value) ??
    deliverySignature(value) ??
    priceSignature(value, priceFromUsd)
  );
}

function isCoveredBy(
  value: string,
  candidates: readonly string[],
  signatures: ReadonlySet<string>,
  priceFromUsd?: number
): boolean {
  const normalized = normalizeClaim(value);
  if (candidates.some((candidate) => normalizeClaim(candidate) === normalized)) {
    return true;
  }

  const signature = semanticSignature(value, priceFromUsd);
  if (signature && signatures.has(signature)) return true;

  const clauses = value
    .split(/\s*[;；]\s*/)
    .map((clause) => ({ clause, tokens: meaningfulTokens(clause) }))
    .filter(({ tokens }) => tokens.length > 0);
  if (clauses.length === 0) return false;

  return clauses.every(({ clause, tokens }) => {
    const clauseSignature = semanticSignature(clause, priceFromUsd);
    if (clauseSignature && signatures.has(clauseSignature)) return true;
    if (tokens.length < 3) return false;
    return candidates.some((candidate) => {
      const candidateTokens = new Set(meaningfulTokens(candidate));
      return tokens.every((token) => candidateTokens.has(token));
    });
  });
}

function uniqueWithinGroup(items: readonly LabelItem[]): LabelItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeClaim(labelValue(item));
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Presentation-only deduplication with explicit precedence:
 * facts > features > highlights > microclaims. It removes only exact,
 * narrow semantic, or fully-covered text; source arrays remain untouched.
 */
export function dedupeProjectPresentation({
  microClaims,
  highlights,
  features,
  factValues,
  priceFromUsd,
}: ProjectPresentationGroups): {
  microClaims: LabelItem[];
  highlights: LabelItem[];
  features: LabelItem[];
} {
  const factCandidates = factValues.filter(Boolean);
  const factSignatures = new Set(
    factCandidates
      .map((value) => semanticSignature(value, priceFromUsd))
      .filter((value): value is string => Boolean(value))
  );
  if (typeof priceFromUsd === "number") {
    factSignatures.add(`price:${priceFromUsd}`);
  }

  const uniqueFeatures = uniqueWithinGroup(features).filter(
    (item) =>
      !isCoveredBy(
        labelValue(item),
        factCandidates,
        factSignatures,
        priceFromUsd
      )
  );
  const featureCandidates = uniqueFeatures.map(labelValue);
  const featureSignatures = new Set([
    ...factSignatures,
    ...featureCandidates
      .map((value) => semanticSignature(value, priceFromUsd))
      .filter((value): value is string => Boolean(value)),
  ]);

  const uniqueHighlights = uniqueWithinGroup(highlights).filter(
    (item) =>
      !isCoveredBy(
        labelValue(item),
        [...factCandidates, ...featureCandidates],
        featureSignatures,
        priceFromUsd
      )
  );
  const highlightCandidates = uniqueHighlights.map(labelValue);
  const highlightSignatures = new Set([
    ...featureSignatures,
    ...highlightCandidates
      .map((value) => semanticSignature(value, priceFromUsd))
      .filter((value): value is string => Boolean(value)),
  ]);

  const uniqueMicroClaims = uniqueWithinGroup(microClaims).filter(
    (item) =>
      !isCoveredBy(
        labelValue(item),
        [...factCandidates, ...featureCandidates, ...highlightCandidates],
        highlightSignatures,
        priceFromUsd
      )
  );

  return {
    microClaims: uniqueMicroClaims,
    highlights: uniqueHighlights,
    features: uniqueFeatures,
  };
}

export function parsePaymentPresentationLine(
  text: string
): PaymentPresentationLine {
  const raw = text.trim();
  const percentageMatch = raw.match(/^[+\-−]?\d+(?:[.,]\d+)?[ \u00A0]*%/);
  if (!percentageMatch) return { kind: "fallback", raw };

  const percentage = percentageMatch[0];
  const remainder = raw.slice(percentage.length).trim();
  if (!remainder) return { kind: "fallback", raw };

  const conditionMatch = remainder.match(/^(.*?)\s*(\([^()]*\))([.!?]?)$/);
  const milestone = (conditionMatch?.[1] ?? remainder).trim();
  const condition = conditionMatch
    ? `${conditionMatch[2]}${conditionMatch[3]}`
    : undefined;

  if (!milestone || /[·•].*\d+(?:[.,]\d+)?[ \u00A0]*%/.test(milestone)) {
    return { kind: "fallback", raw };
  }
  if (/\d+(?:[.,]\d+)?[ \u00A0]*%/.test(milestone)) {
    return { kind: "fallback", raw };
  }

  return {
    kind: "structured",
    raw,
    percentage,
    milestone,
    ...(condition ? { condition } : {}),
  };
}

/**
 * Presentation-only guardrail. Source arrays remain untouched and auditable.
 * Explicit return guarantees and immigration eligibility claims require
 * commercial/legal approval before they can appear on the public page.
 */
export function isUnsafeCommercialClaim(value: string): boolean {
  const claim = normalizeClaim(value);

  const mentionsEb5 = /\beb[\s-]?5\b/.test(claim);
  const eligibilityLanguage =
    /(?:\bvisa\b|visado|eligible|eligibilidad|admissible|admissibilite|approved|aprobado|approuv|approbation|programa?|programme|green card|regional center|centro regional|centre regional|investment option|opcion de inversion|option d.investissement|path|ruta|voie)/.test(
      claim
    );
  if (mentionsEb5 && eligibilityLanguage) return true;

  const guarantee =
    /(?:garantiz\w*|guarantee\w*|guaranteed|garanti\w*)/.test(claim);
  const returnLanguage =
    /(?:renta|rent|location|leaseback|retorno|return|rendement|yield)/.test(
      claim
    );
  if (guarantee && returnLanguage) return true;

  const percentage = /\d+(?:[.,]\d+)?\s*%/.test(claim);
  const explicitReturn =
    /(?:leaseback|retorno|return|rendement|yield)/.test(claim);

  return percentage && explicitReturn;
}

function hasFinancingLanguage(value: string): boolean {
  return /(?:financ|pr[eé]stam|mortgage|hipoteca|lender|prestamista)/.test(
    normalizeClaim(value)
  );
}

function alreadyConditionsFinancing(value: string): boolean {
  return /(?:sujeto|subject to|sous reserve|approval|aprobacion|approbation|calificacion|qualification|entidad financiera|financial institution|institution financiere)/.test(
    normalizeClaim(value)
  );
}

function softenFinancingLanguage(
  value: string,
  locale: SiteLocale
): string {
  const clause = FINANCING_CLAUSE[locale];

  if (locale === "es") {
    if (/^financiamiento disponible\.?$/i.test(value.trim())) {
      return "Financiamiento sujeto a aprobación y a las condiciones vigentes";
    }

    return value
      .replace(
        /(?:con\s+)?financiaci[oó]n\s+(?:disponible\s+)?para\s+(?:compradores\s+)?extranjeros/gi,
        clause
      )
      .replace(
        /^financiado\s*:/i,
        "Con financiamiento (sujeto a aprobación y a las condiciones vigentes):"
      );
  }

  if (locale === "en") {
    if (/^financing available\.?$/i.test(value.trim())) {
      return "Financing is subject to lender approval and current terms";
    }

    return value
      .replace(
        /financing\s+(?:available\s+)?for\s+(?:foreign buyers|foreigners)/gi,
        clause
      )
      .replace(
        /^financed\s*:/i,
        "With financing (subject to lender approval and current terms):"
      );
  }

  if (/^financement offert\.?$/i.test(value.trim())) {
    return "Tout financement est sous réserve de l’approbation du prêteur et des conditions en vigueur";
  }

  return value
    .replace(
      /financement\s+(?:possible|offert)?\s*pour\s+(?:les\s+)?acheteurs\s+[eé]trangers/gi,
      clause
    )
    .replace(
      /^avec financement\s*:/i,
      "Avec financement (sous réserve de l’approbation du prêteur et des conditions en vigueur) :"
    );
}

export function safePresentationLines<T extends LabelItem>(
  items: readonly T[]
): T[] {
  return items.filter((item) => {
    const label = typeof item === "string" ? item : item.label;
    return !isUnsafeCommercialClaim(label);
  });
}

export function safePresentationPaymentLines(
  items: readonly string[],
  locale: SiteLocale
): string[] {
  return items.map((item) => softenFinancingLanguage(item, locale));
}

export function safePresentationFaqs(
  items: readonly FaqItem[],
  locale: SiteLocale
): FaqItem[] {
  return items
    .filter((item) => !isUnsafeCommercialClaim(`${item.q} ${item.a}`))
    .map((item) => {
      if (hasFinancingLanguage(item.q)) {
        return { ...item, a: FINANCING_ANSWER[locale] };
      }
      if (!hasFinancingLanguage(item.a)) return item;
      if (alreadyConditionsFinancing(item.a)) return item;

      const softenedAnswer = softenFinancingLanguage(item.a, locale);
      return {
        ...item,
        a:
          softenedAnswer === item.a
            ? FINANCING_ANSWER[locale]
            : softenedAnswer,
      };
    });
}
