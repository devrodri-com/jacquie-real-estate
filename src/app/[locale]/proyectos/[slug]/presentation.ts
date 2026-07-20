import type { SiteLocale } from "@/lib/seo";

type LabelItem = string | { label: string; iconKey?: string };
type FaqItem = { q: string; a: string };

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
