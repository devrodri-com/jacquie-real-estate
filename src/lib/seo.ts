import type { Metadata } from "next";

export const SITE_URL_FALLBACK = "https://jacquie-real-estate.vercel.app";

function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim();
  if (!candidate || candidate === "undefined" || candidate === "null") {
    return SITE_URL_FALLBACK;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return SITE_URL_FALLBACK;
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return SITE_URL_FALLBACK;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SITE_LOCALES = ["es", "en", "fr"] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

export function normalizeLocale(value: string): SiteLocale {
  return value === "en" || value === "fr" ? value : "es";
}

export function absoluteUrl(path = ""): string {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  return `${SITE_URL}${normalizedPath}`;
}

export function localizedUrl(locale: SiteLocale, path = ""): string {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  return absoluteUrl(`/${locale}${normalizedPath}`);
}

export function localizedAlternates(locale: SiteLocale, path = ""): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      es: localizedUrl("es", path),
      en: localizedUrl("en", path),
      "fr-CA": localizedUrl("fr", path),
      "x-default": localizedUrl("es", path),
    },
  };
}

export function openGraphLocale(locale: SiteLocale): "es_ES" | "en_US" | "fr_CA" {
  if (locale === "en") return "en_US";
  if (locale === "fr") return "fr_CA";
  return "es_ES";
}

function openGraphAlternateLocales(locale: SiteLocale): string[] {
  return SITE_LOCALES.filter((item) => item !== locale).map(openGraphLocale);
}

function resolveSocialImage(image: string | undefined): string {
  if (!image) return DEFAULT_SOCIAL_IMAGE;
  if (/^https?:\/\//i.test(image)) return image;
  return absoluteUrl(image);
}

type PageMetadataInput = {
  locale: SiteLocale;
  path?: string;
  title: string;
  description: string;
  image?: string;
  siteName?: string;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  siteName = "Jacquie Zarate Realtor · Miami",
  robots,
}: PageMetadataInput): Metadata {
  const canonical = localizedUrl(locale, path);
  const socialImage = resolveSocialImage(image);

  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    ...(robots ? { robots } : {}),
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonical,
      locale: openGraphLocale(locale),
      alternateLocale: openGraphAlternateLocales(locale),
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function getGaMeasurementId(): string | null {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!value || value === "undefined" || value === "null") return null;
  return /^G-[A-Z0-9]{6,}$/i.test(value) ? value : null;
}
