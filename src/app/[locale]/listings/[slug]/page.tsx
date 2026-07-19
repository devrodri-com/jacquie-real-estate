import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LISTINGS } from "@/data/listings";
import { getListingFrOverlay } from "@/data/listingsFrOverlay";
import { buildJacquieWhatsAppHref } from "@/lib/whatsapp";
import {
  createPageMetadata,
  localizedUrl,
  normalizeLocale,
  type SiteLocale,
} from "@/lib/seo";
import { ListingGallery } from "./ListingDetailTopClient";
import { getListingDetailCopy } from "./content";

type RouteParams = { locale: string; slug: string };

type VerifiedOpeningIdentity = {
  building: string;
  unit: string;
};

const VERIFIED_OPENING_IDENTITIES: Readonly<
  Record<string, VerifiedOpeningIdentity | undefined>
> = {
  "tides-hollywood-2c": { building: "The Tides", unit: "#2C" },
  "le-frontenac-505": { building: "Le Frontenac", unit: "#505" },
};

type ListingMetaItem = {
  city: string;
  beds: number;
  baths: number;
  size: number;
  type: string;
  mls: string;
  title: string;
  addressFull?: string;
};

function listingMetaDescriptionFr(item: ListingMetaItem): string {
  const lieu = item.addressFull ?? item.title;
  const sizeFr = item.size.toLocaleString("fr-CA");
  return `Propriété à ${item.city} (${lieu}). ${item.beds} chambres, ${item.baths} salles de bain, ${sizeFr} pi². Type : ${item.type}. Réf. MLS ${item.mls}. Visites et coordonnées avec Jacquie Zarate Realtor, Miami.`;
}

function translateType(value: string | undefined, locale: SiteLocale) {
  if (!value || locale === "en") return value;

  const mapES: Record<string, string> = {
    Condominium: "Condominio",
    "Condo/Hotel": "Condo hotel",
    "Single Family Residence": "Casa unifamiliar",
    Townhouse: "Townhouse",
    Apartment: "Apartamento",
  };
  const mapFR: Record<string, string> = {
    Condominium: "Condominium",
    "Condo/Hotel": "Condo-hôtel",
    "Single Family Residence": "Maison unifamiliale",
    Townhouse: "Maison de ville",
    Apartment: "Appartement",
  };

  return locale === "fr" ? (mapFR[value] ?? value) : (mapES[value] ?? value);
}

function translateView(value: string | undefined, locale: SiteLocale) {
  if (!value || locale === "en") return value;

  const mapES: Record<string, string> = {
    "Partial ocean / Oceanfront": "Vista parcial al océano / Frente al mar",
    "Ocean / Oceanfront": "Vista al océano / Frente al mar",
    Bay: "Bahía",
    Canal: "Canal",
    Garden: "Jardín",
    City: "Ciudad",
    Intracoastal: "Intracostero",
    "Bay view": "Vista a la bahía",
  };
  const mapFR: Record<string, string> = {
    "Partial ocean / Oceanfront": "Vue partielle sur l'océan / Bord de mer",
    "Ocean / Oceanfront": "Vue sur l'océan / Bord de mer",
    Bay: "Baie",
    Canal: "Canal",
    Garden: "Jardin",
    City: "Ville",
    Intracoastal: "Intracôtier",
    "Bay view": "Vue sur la baie",
  };

  return locale === "fr" ? (mapFR[value] ?? value) : (mapES[value] ?? value);
}

function translateRentals(value: string | undefined, locale: SiteLocale) {
  if (!value || locale === "en") return value;

  const mapES: Record<string, string> = {
    "Daily rentals allowed": "Se permiten alquileres diarios",
    "Monthly rentals allowed": "Se permiten alquileres mensuales",
    "No short-term rentals": "No se permiten alquileres a corto plazo",
    "No restrictions / OK to lease": "Sin restricciones / Apto para alquilar",
  };
  const mapFR: Record<string, string> = {
    "Daily rentals allowed": "Locations quotidiennes autorisées",
    "Monthly rentals allowed": "Locations mensuelles autorisées",
    "No short-term rentals": "Locations de courte durée non autorisées",
    "No restrictions / OK to lease": "Aucune restriction / Location autorisée",
  };

  return locale === "fr" ? (mapFR[value] ?? value) : (mapES[value] ?? value);
}

function translatePets(value: string | undefined, locale: SiteLocale) {
  if (!value || locale === "en") return value;

  const mapES: Record<string, string> = {
    "Conditional, Yes": "Condicional, sí",
    No: "No",
    Yes: "Sí",
  };
  const mapFR: Record<string, string> = {
    "Conditional, Yes": "Conditionnel, oui",
    No: "Non",
    Yes: "Oui",
  };

  return locale === "fr" ? (mapFR[value] ?? value) : (mapES[value] ?? value);
}

function translateParking(value: string | undefined, locale: SiteLocale) {
  if (!value || locale === "en") return value;

  const mapES: Record<string, string> = {
    "One Space, Valet": "Un espacio, valet",
    "One Space": "Un espacio",
    "Two Spaces": "Dos espacios",
    Valet: "Valet",
    Assigned: "Asignado",
    Covered: "Cubierto",
    "Guest, One Space": "Visitantes, un espacio",
  };
  const mapFR: Record<string, string> = {
    "One Space, Valet": "Une place, valet",
    "One Space": "Une place",
    "Two Spaces": "Deux places",
    Valet: "Valet",
    Assigned: "Assigné",
    Covered: "Couvert",
    "Guest, One Space": "Visiteurs, une place",
  };

  return locale === "fr" ? (mapFR[value] ?? value) : (mapES[value] ?? value);
}

function DetailItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 border-t border-primary/15 py-3 sm:py-5">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.13em] text-foreground/70">
        {label}
      </dt>
      <dd className="mt-2 break-words text-[14px] font-medium leading-[1.45] text-primary sm:text-[16px]">
        {children}
      </dd>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw);
  const item = LISTINGS.find((listing) => listing.slug === slug);
  if (!item) {
    return {
      title:
        locale === "en"
          ? "Property not found"
          : locale === "fr"
            ? "Propriété introuvable"
            : "Propiedad no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const addressFull = (item as { addressFull?: string }).addressFull;
  const description =
    locale === "en"
      ? ((item as { descriptionLong_en?: string; description_en: string })
          .descriptionLong_en ?? item.description_en)
      : locale === "fr"
        ? listingMetaDescriptionFr(item as ListingMetaItem)
        : ((item as { descriptionLong_es?: string; description_es: string })
            .descriptionLong_es ?? item.description_es);
  const image = item.images[0];
  const pageTitle = addressFull
    ? `${addressFull} | Jacquie Zarate Realtor`
    : undefined;

  return createPageMetadata({
    locale,
    path: `listings/${slug}`,
    title: pageTitle ?? `${item.title} | Jacquie Zarate Realtor`,
    description,
    image,
  });
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale: raw, slug } = await params;
  const locale = normalizeLocale(raw);
  const item = LISTINGS.find((listing) => listing.slug === slug);
  if (!item) notFound();

  const isEN = locale === "en";
  const isFR = locale === "fr";
  const copy = getListingDetailCopy(locale);
  const frOverlay = isFR ? getListingFrOverlay(item.slug) : null;
  const addressDisplay =
    (item as { addressFull?: string; title: string }).addressFull ?? item.title;
  const verifiedOpeningIdentity = VERIFIED_OPENING_IDENTITIES[item.slug];
  const descriptionText = isEN
    ? ((item as { descriptionLong_en?: string; description_en: string })
        .descriptionLong_en ?? item.description_en)
    : isFR
      ? (frOverlay?.descriptionLong ?? "")
      : ((item as { descriptionLong_es?: string; description_es: string })
          .descriptionLong_es ?? item.description_es);
  const amenitiesList = isEN
    ? ((item as { amenities_en?: string[] }).amenities_en ?? [])
    : isFR
      ? (frOverlay?.amenities ?? [])
      : ((item as { amenities_es?: string[] }).amenities_es ?? []);
  const propertyType = translateType(item.type, locale) ?? item.type;
  const whatsappHref = buildJacquieWhatsAppHref(
    locale,
    copy.whatsappMessage(addressDisplay),
  );
  const areaDisplay = isEN
    ? `${item.size.toLocaleString("en-US")} sq ft`
    : isFR
      ? `${item.size.toLocaleString("fr-CA")} pi²`
      : `${item.size.toLocaleString("en-US")} ft²`;

  const schemaObject = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: addressDisplay,
    description: descriptionText,
    image: item.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: addressDisplay,
      addressLocality: item.city,
      addressRegion: "FL",
      addressCountry: "US",
    },
    ...("latitude" in item &&
    "longitude" in item &&
    item.latitude != null &&
    item.longitude != null
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: item.latitude,
            longitude: item.longitude,
          },
        }
      : {}),
    ...(item.size
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: item.size,
            unitCode: "FTK",
          },
        }
      : {}),
    numberOfRooms: item.beds,
    numberOfBathroomsTotal: item.baths,
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "USD",
      url: localizedUrl(locale, `listings/${item.slug}`),
    },
  };

  return (
    <article
      className="mx-auto w-full pb-4 pt-8 text-foreground sm:pt-12 lg:pt-14"
      aria-labelledby="listing-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
      />

      <nav aria-label={copy.breadcrumb}>
        <Link
          href={`/${locale}/listings`}
          className="inline-flex min-h-11 items-center text-[13px] font-medium text-foreground/72 no-underline transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none"
        >
          <span aria-hidden>←</span>
          <span className="ml-2">{copy.breadcrumb}</span>
        </Link>
      </nav>

      <header
        className="mt-6 border-b border-primary/15 pb-10 sm:mt-9 sm:pb-12 lg:pb-14"
        data-listing-section="opening"
      >
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
              {copy.residenceLabel(propertyType, item.city)}
            </p>
            <h1
              id="listing-title"
              className="mt-4 max-w-[19ch] font-display text-[clamp(2.65rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-primary"
            >
              {verifiedOpeningIdentity ? (
                <>
                  {verifiedOpeningIdentity.building}{" "}
                  <span className="whitespace-nowrap">
                    {verifiedOpeningIdentity.unit}
                  </span>
                </>
              ) : (
                addressDisplay
              )}
            </h1>
            {verifiedOpeningIdentity && (
              <address className="mt-4 max-w-[58ch] break-words text-[14px] leading-[1.65] text-foreground/72 not-italic sm:mt-5 sm:text-[16px]">
                {addressDisplay}
              </address>
            )}
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">
              {copy.price}
            </p>
            <p className="mt-2 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-medium leading-none tracking-[-0.035em] text-primary">
              ${item.price.toLocaleString("en-US")}
            </p>

            <dl
              className="mt-6 grid grid-cols-3 border-y border-primary/15 py-4"
              data-listing-section="facts"
            >
              <div className="pr-3">
                <dt className="text-[10px] uppercase tracking-[0.11em] text-foreground/70">
                  {copy.bedrooms}
                </dt>
                <dd className="mt-1 font-display text-2xl leading-none text-primary">
                  {item.beds}
                </dd>
              </div>
              <div className="border-l border-primary/15 px-3">
                <dt className="text-[10px] uppercase tracking-[0.11em] text-foreground/70">
                  {copy.bathrooms}
                </dt>
                <dd className="mt-1 font-display text-2xl leading-none text-primary">
                  {item.baths}
                </dd>
              </div>
              <div className="border-l border-primary/15 pl-3">
                <dt className="text-[10px] uppercase tracking-[0.11em] text-foreground/70">
                  {copy.area}
                </dt>
                <dd className="mt-1 text-[14px] font-semibold leading-[1.2] text-primary sm:text-[15px]">
                  {areaDisplay}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-[12px] tracking-[0.04em] text-foreground/70">
              {copy.mls} {item.mls}
            </p>

            <div className="mt-6 grid gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-[6px] bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground no-underline transition hover:bg-primary/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none"
              >
                {copy.whatsapp}
              </a>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-primary/25 px-5 py-3 text-center text-sm font-semibold text-primary no-underline transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none"
              >
                {copy.contact}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section
        className="mt-10 sm:mt-16 lg:mt-20"
        aria-labelledby="listing-gallery-title"
        data-listing-section="gallery"
      >
        <div className="mb-5 flex items-end justify-between gap-5 sm:mb-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
              {copy.gallery.eyebrow}
            </p>
            <h2
              id="listing-gallery-title"
              className="mt-2 font-display text-[clamp(1.75rem,2.5vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.02em] text-primary"
            >
              {copy.gallery.title}
            </h2>
          </div>
          <p className="shrink-0 pb-1 text-[12px] font-medium text-foreground/70">
            {copy.gallery.count(item.images.length)}
          </p>
        </div>

        <ListingGallery
          images={item.images}
          name={addressDisplay}
          labels={copy.gallery.labels(addressDisplay, item.images.length)}
        />
      </section>

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <div className="grid gap-12 border-t border-primary/15 pt-7 sm:pt-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
          <section
            className="min-w-0"
            aria-labelledby="listing-overview-title"
            data-listing-section="description"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
              {copy.overview.eyebrow}
            </p>
            <h2
              id="listing-overview-title"
              className="mt-2 font-display text-[clamp(1.6rem,2.1vw,2.05rem)] font-medium leading-[1.08] tracking-[-0.018em] text-primary"
            >
              {copy.overview.title}
            </h2>
            <p className="mt-5 max-w-[66ch] text-[16px] leading-[1.8] text-foreground/78 sm:text-[17px]">
              {descriptionText}
            </p>
          </section>

          {amenitiesList.length > 0 && (
            <section
              className="min-w-0"
              aria-labelledby="listing-amenities-title"
              data-listing-section="features"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
                {copy.amenities.eyebrow}
              </p>
              <h2
                id="listing-amenities-title"
                className="mt-2 font-display text-[clamp(1.6rem,2.1vw,2.05rem)] font-medium leading-[1.08] tracking-[-0.018em] text-primary"
              >
                {copy.amenities.title}
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2" role="list">
                {amenitiesList.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex min-w-0 items-start border-t border-primary/12 py-3 text-[14px] leading-[1.5] text-foreground/76 first:border-t-0 sm:py-4 sm:text-[15px] sm:first:border-t"
                  >
                    <span className="mr-3 mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside
          className="mt-8 max-w-[980px] border-l-2 border-accent/70 pl-5 sm:mt-10 sm:pl-6 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12"
          aria-labelledby="listing-advisor-title"
          data-listing-section="advisor"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
              {copy.advisor.eyebrow}
            </p>
            <h2
              id="listing-advisor-title"
              className="mt-2 max-w-[24ch] font-display text-[clamp(1.45rem,1.8vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.015em] text-primary"
            >
              {copy.advisor.title}
            </h2>
          </div>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.65] text-foreground/74 sm:text-[15px] lg:mt-0">
            {copy.advisor.intro}
          </p>
        </aside>
      </div>

      <section
        className="mt-10 border-t border-primary/15 pt-7 sm:mt-12 sm:pt-9 lg:mt-14"
        aria-labelledby="listing-details-title"
        data-listing-section="details"
      >
        <div className="max-w-[720px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
            {copy.details.eyebrow}
          </p>
          <h2
            id="listing-details-title"
            className="mt-2 font-display text-[clamp(1.75rem,2.5vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.02em] text-primary"
          >
            {copy.details.title}
          </h2>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-5 sm:mt-7 sm:gap-x-8 lg:mt-9 lg:grid-cols-3">
          <DetailItem label={copy.details.type}>{propertyType}</DetailItem>
          {"yearBuilt" in item && item.yearBuilt != null && (
            <DetailItem label={copy.details.yearBuilt}>{item.yearBuilt}</DetailItem>
          )}
          {"hoaMonthly" in item && item.hoaMonthly != null && (
            <DetailItem label={copy.details.hoaMonthly}>
              ${item.hoaMonthly.toLocaleString("en-US")}
            </DetailItem>
          )}
          {"view" in item && item.view && (
            <DetailItem label={copy.details.view}>
              {translateView(item.view, locale)}
            </DetailItem>
          )}
          {"allowsRentals" in item && item.allowsRentals && (
            <DetailItem label={copy.details.rentals}>
              {translateRentals(item.allowsRentals, locale)}
            </DetailItem>
          )}
          {"pets" in item && item.pets != null && item.pets !== "" && (
            <DetailItem label={copy.details.pets}>
              {translatePets(item.pets, locale)}
            </DetailItem>
          )}
          {"parking" in item && item.parking && (
            <DetailItem label={copy.details.parking}>
              {translateParking(item.parking, locale)}
            </DetailItem>
          )}
          {"waterfront" in item && item.waterfront === true && (
            <DetailItem label={copy.details.waterfront}>{copy.details.yes}</DetailItem>
          )}
          {"furnished" in item && item.furnished === true && (
            <DetailItem label={copy.details.furnished}>{copy.details.yes}</DetailItem>
          )}
        </dl>
      </section>

      {"latitude" in item &&
        "longitude" in item &&
        item.latitude != null &&
        item.longitude != null && (
          <section
            className="mt-12 overflow-hidden border-y border-primary/15 bg-surface sm:mt-16 lg:mt-20 lg:grid lg:grid-cols-[0.7fr_1.3fr]"
            aria-labelledby="listing-location-title"
            data-listing-section="location"
          >
            <div className="flex min-w-0 flex-col justify-center px-5 py-8 sm:px-9 sm:py-12 lg:px-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
                {copy.location.eyebrow}
              </p>
              <h2
                id="listing-location-title"
                className="mt-2 max-w-[13ch] font-display text-[clamp(1.75rem,2.5vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.02em] text-primary"
              >
                {copy.location.title}
              </h2>
              <p className="mt-4 text-[14px] leading-[1.65] text-foreground/72 sm:mt-5">
                {copy.location.mapPrompt}
              </p>
              <address className="mt-3 max-w-[34ch] text-[15px] font-medium leading-[1.6] text-primary not-italic">
                {addressDisplay}
              </address>
            </div>
            <div className="relative h-[300px] min-w-0 w-full bg-placeholder sm:h-[360px] lg:h-[420px]">
              <iframe
                src={`https://www.google.com/maps?q=${item.latitude},${item.longitude}&z=15&output=embed`}
                title={
                  isEN
                    ? `Location of ${item.title}`
                    : isFR
                      ? `Emplacement de ${item.title}`
                      : `Ubicación de ${item.title}`
                }
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        )}

      <section
        className="mt-12 grid gap-6 border-t border-primary/15 pb-4 pt-8 sm:mt-14 sm:gap-8 sm:pb-6 sm:pt-10 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 lg:pb-8 lg:pt-12"
        aria-labelledby="listing-close-title"
        data-listing-section="closing"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/75">
            {copy.close.eyebrow}
          </p>
          <h2
            id="listing-close-title"
            className="mt-2 max-w-[20ch] font-display text-[clamp(1.85rem,2.6vw,2.55rem)] font-medium leading-[1.06] tracking-[-0.022em] text-primary"
          >
            {copy.close.title}
          </h2>
        </div>
        <div className="grid content-start gap-4">
          <p className="max-w-[56ch] text-[15px] leading-[1.75] text-foreground/70 sm:text-[16px]">
            {copy.close.body}
          </p>
          <div className="grid max-w-[420px] gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-[6px] bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground no-underline transition hover:bg-primary/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none"
            >
              {copy.whatsapp}
            </a>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-primary/25 px-5 py-3 text-center text-sm font-semibold text-primary no-underline transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none"
            >
              {copy.contact}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
