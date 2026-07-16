export type SiteLocale = "es" | "en" | "fr";

export const JACQUIE_WHATSAPP_NUMBER = "17864072591";

const REAL_ESTATE_MESSAGES: Record<SiteLocale, string> = {
  es: "Hola Jacquie, quiero conversar sobre una decisión inmobiliaria en Miami.",
  en: "Hi Jacquie, I'd like to discuss a real estate decision in Miami.",
  fr: "Bonjour Jacquie, j'aimerais discuter d'une décision immobilière à Miami.",
};

export function normalizeSiteLocale(value: string | null | undefined): SiteLocale {
  return value === "en" || value === "fr" ? value : "es";
}

export function buildJacquieWhatsAppHref(
  locale: SiteLocale,
  message = REAL_ESTATE_MESSAGES[locale]
) {
  return `https://wa.me/${JACQUIE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
