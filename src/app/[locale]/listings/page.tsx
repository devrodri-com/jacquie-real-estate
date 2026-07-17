import type { Metadata } from "next";
import { LISTINGS } from "@/data/listings";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";
import { normalizeSiteLocale } from "@/lib/whatsapp";
import { ListingsCatalog } from "./ListingsCatalog";
import { getListingsCopy } from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const title =
    locale === "en"
      ? "Available Properties | Jacquie Zarate Realtor"
      : locale === "fr"
        ? "Propriétés disponibles | Jacquie Zarate Realtor"
        : "Propiedades disponibles | Jacquie Zarate Realtor";
  const description =
    locale === "en"
      ? "Explore properties currently published in Miami and South Florida, with personalized guidance based on location, budget, and your real estate goals."
      : locale === "fr"
        ? "Explorez les propriétés actuellement publiées à Miami et dans le sud de la Floride, avec un accompagnement personnalisé selon l’emplacement, le budget et vos objectifs immobiliers."
        : "Explora propiedades publicadas actualmente en Miami y South Florida, con acompañamiento personalizado según ubicación, presupuesto y objetivo inmobiliario.";

  return createPageMetadata({ locale, path: "listings", title, description });
}

export default async function ListingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = normalizeSiteLocale(raw);
  const copy = getListingsCopy(locale);

  return <ListingsCatalog items={LISTINGS} locale={locale} copy={copy} />;
}
