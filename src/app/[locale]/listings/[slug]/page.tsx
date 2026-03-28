// src/app/[locale]/listings/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LISTINGS } from "@/data/listings";
import { getListingFrOverlay } from "@/data/listingsFrOverlay";
import { ListingDetailTopClient } from "./ListingDetailTopClient";

const BASE_URL = "https://www.jacquiezaraterealtor.com";

type RouteParams = { locale: string; slug: string };

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

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw === "en" ? "en" : raw === "fr" ? "fr" : "es";
  const item = LISTINGS.find((l) => l.slug === slug);
  const addressFull = (item as { addressFull?: string } | undefined)?.addressFull;
  const description = item
    ? locale === "en"
      ? ((item as { descriptionLong_en?: string; description_en: string }).descriptionLong_en ??
          item.description_en)
      : locale === "fr"
        ? listingMetaDescriptionFr(item as ListingMetaItem)
        : ((item as { descriptionLong_es?: string; description_es: string }).descriptionLong_es ??
            item.description_es)
    : undefined;
  const image = item?.images?.[0];
  const pageTitle = addressFull ? `${addressFull} | Jacquie Zarate Realtor` : undefined;

  return {
    title: pageTitle,
    description: description ?? undefined,
    alternates: {
      canonical: `${BASE_URL}/${locale}/listings/${slug}`,
      languages: {
        es: `${BASE_URL}/es/listings/${slug}`,
        en: `${BASE_URL}/en/listings/${slug}`,
        fr: `${BASE_URL}/fr/listings/${slug}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: description ?? undefined,
      url: `${BASE_URL}/${locale}/listings/${slug}`,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description ?? undefined,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw === "en" ? "en" : raw === "fr" ? "fr" : "es";
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const item = LISTINGS.find((l) => l.slug === slug);
  if (!item) notFound();

  const frOverlay = isFR ? getListingFrOverlay(item.slug) : null;

  const addressDisplay = (item as { addressFull?: string; title: string }).addressFull ?? (item as { title: string }).title;
  const descriptionText = isEN
    ? ((item as { descriptionLong_en?: string; description_en: string }).descriptionLong_en ?? item.description_en)
    : isFR
      ? (frOverlay?.descriptionLong ?? "")
      : ((item as { descriptionLong_es?: string; description_es: string }).descriptionLong_es ?? item.description_es);
  const amenitiesList = isEN
    ? ((item as { amenities_en?: string[] }).amenities_en ?? [])
    : isFR
      ? (frOverlay?.amenities ?? [])
      : ((item as { amenities_es?: string[] }).amenities_es ?? []);

  const translateType = (value?: string) => {
    if (!value) return value;

    if (isEN) return value;

    const mapES: Record<string, string> = {
      "Condominium": "Condominio",
      "Condo/Hotel": "Condo hotel",
      "Single Family Residence": "Casa unifamiliar",
      "Townhouse": "Townhouse",
      "Apartment": "Apartamento",
    };

    const mapFR: Record<string, string> = {
      "Condominium": "Condominium",
      "Condo/Hotel": "Condo-hôtel",
      "Single Family Residence": "Maison unifamiliale",
      "Townhouse": "Maison de ville",
      "Apartment": "Appartement",
    };

    return isFR ? (mapFR[value] ?? value) : (mapES[value] ?? value);
  };

  const translateView = (value?: string) => {
    if (!value) return value;

    if (isEN) return value;

    const mapES: Record<string, string> = {
      "Partial ocean / Oceanfront": "Vista parcial al océano / Frente al mar",
      "Ocean / Oceanfront": "Vista al océano / Frente al mar",
      "Bay": "Bahía",
      "Canal": "Canal",
      "Garden": "Jardín",
      "City": "Ciudad",
      "Intracoastal": "Intracostero",
      "Bay view": "Vista a la bahía",
    };

    const mapFR: Record<string, string> = {
      "Partial ocean / Oceanfront": "Vue partielle sur l'océan / Bord de mer",
      "Ocean / Oceanfront": "Vue sur l'océan / Bord de mer",
      "Bay": "Baie",
      "Canal": "Canal",
      "Garden": "Jardin",
      "City": "Ville",
      "Intracoastal": "Intracôtier",
      "Bay view": "Vue sur la baie",
    };

    return isFR ? (mapFR[value] ?? value) : (mapES[value] ?? value);
  };

  const translateRentals = (value?: string) => {
    if (!value) return value;

    if (isEN) return value;

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

    return isFR ? (mapFR[value] ?? value) : (mapES[value] ?? value);
  };

  const translatePets = (value?: string) => {
    if (!value) return value;

    if (isEN) return value;

    const mapES: Record<string, string> = {
      "Conditional, Yes": "Condicional, sí",
      "No": "No",
      "Yes": "Sí",
    };

    const mapFR: Record<string, string> = {
      "Conditional, Yes": "Conditionnel, oui",
      "No": "Non",
      "Yes": "Oui",
    };

    return isFR ? (mapFR[value] ?? value) : (mapES[value] ?? value);
  };

  const translateParking = (value?: string) => {
    if (!value) return value;

    if (isEN) return value;

    const mapES: Record<string, string> = {
      "One Space, Valet": "Un espacio, valet",
      "One Space": "Un espacio",
      "Two Spaces": "Dos espacios",
      "Valet": "Valet",
      "Assigned": "Asignado",
      "Covered": "Cubierto",
      "Guest, One Space": "Visitantes, un espacio",
    };

    const mapFR: Record<string, string> = {
      "One Space, Valet": "Une place, valet",
      "One Space": "Une place",
      "Two Spaces": "Deux places",
      "Valet": "Valet",
      "Assigned": "Assigné",
      "Covered": "Couvert",
      "Guest, One Space": "Visiteurs, une place",
    };

    return isFR ? (mapFR[value] ?? value) : (mapES[value] ?? value);
  };

  const schemaObject = {
    "@context": "https://schema.org",
    "@type": "Residence",
    "name": addressDisplay,
    "description": descriptionText,
    "image": item.images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": addressDisplay,
      "addressLocality": item.city,
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    ...("latitude" in item && "longitude" in item && item.latitude != null && item.longitude != null
      ? { geo: { "@type": "GeoCoordinates", "latitude": item.latitude, "longitude": item.longitude } }
      : {}),
    ...(item.size ? { floorSize: { "@type": "QuantitativeValue", "value": item.size, "unitCode": "FTK" } } : {}),
    "numberOfRooms": item.beds,
    "numberOfBathroomsTotal": item.baths,
    "offers": {
      "@type": "Offer",
      "price": item.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `${BASE_URL}/${locale}/listings/${item.slug}`
    }
  };

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-12 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
      />
      {/* Breadcrumb / back */}
      <div className="mb-6">
        <Link
          href={`/${locale}/listings`}
          className="text-[14px] text-foreground/70 no-underline hover:underline"
        >
          {isEN ? "← Active listings" : isFR ? "← Annonces actives" : "← Propiedades activas"}
        </Link>
      </div>

      <ListingDetailTopClient
        key={item.slug}
        addressDisplay={addressDisplay}
        city={item.city}
        item={{
          images: item.images,
          title: item.title,
          city: item.city,
          price: item.price,
          beds: item.beds,
          baths: item.baths,
          size: item.size,
          type: item.type,
          mls: item.mls,
        }}
        locale={locale}
        isEN={isEN}
        isFR={isFR}
      />

      {/* Description */}
      <section className="mb-8 rounded-[12px] ring-1 ring-black/10 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-primary mb-3">
          {isEN ? "Description" : isFR ? "Description" : "Descripción"}
        </h2>
        <p className="text-[15px] leading-[1.7] text-foreground/90">
          {descriptionText}
        </p>
      </section>

      {/* Amenities */}
      {amenitiesList.length > 0 && (
        <section className="mb-8 rounded-[12px] ring-1 ring-black/10 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-primary mb-3">
            {isEN ? "Amenities and details" : isFR ? "Commodités et détails" : "Comodidades y detalles"}
          </h2>
          <ul className="list-disc list-inside text-[15px] leading-[1.7] text-foreground/90 space-y-1">
            {amenitiesList.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Specs: beds, baths, sqft, type, MLS + optional year, HOA, view, rentals, pets, parking, waterfront, furnished */}
      <section className="mb-8 rounded-[12px] ring-1 ring-black/10 bg-white p-5 sm:p-6">
        <dl className="grid gap-2 sm:grid-cols-2 text-[15px]">
          <div>
            <dt className="text-foreground/70">{isEN ? "Bedrooms" : isFR ? "Chambres" : "Dormitorios"}</dt>
            <dd className="font-medium text-primary">{item.beds}</dd>
          </div>
          <div>
            <dt className="text-foreground/70">{isEN ? "Bathrooms" : isFR ? "Salles de bain" : "Baños"}</dt>
            <dd className="font-medium text-primary">{item.baths}</dd>
          </div>
          <div>
            <dt className="text-foreground/70">{isFR ? "Pi²" : "Sqft"}</dt>
            <dd className="font-medium text-primary">{item.size.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-foreground/70">{isEN ? "Type" : isFR ? "Type" : "Tipo"}</dt>
            <dd className="font-medium text-primary">{translateType(item.type)}</dd>
          </div>
          <div>
            <dt className="text-foreground/70">MLS</dt>
            <dd className="font-medium text-primary">{item.mls}</dd>
          </div>
          {"yearBuilt" in item && item.yearBuilt != null && (
            <div>
              <dt className="text-foreground/70">{isEN ? "Year built" : isFR ? "Année de construction" : "Año"}</dt>
              <dd className="font-medium text-primary">{item.yearBuilt}</dd>
            </div>
          )}
          {"hoaMonthly" in item && item.hoaMonthly != null && (
            <div>
              <dt className="text-foreground/70">{isEN ? "HOA / month" : isFR ? "HOA / mois" : "HOA / mes"}</dt>
              <dd className="font-medium text-primary">${item.hoaMonthly.toLocaleString("en-US")}</dd>
            </div>
          )}
          {"view" in item && item.view && (
            <div>
              <dt className="text-foreground/70">{isEN ? "View" : isFR ? "Vue" : "Vista"}</dt>
              <dd className="font-medium text-primary">{translateView(item.view)}</dd>
            </div>
          )}
          {"allowsRentals" in item && item.allowsRentals && (
            <div>
              <dt className="text-foreground/70">{isEN ? "Rentals" : isFR ? "Location" : "Alquileres"}</dt>
              <dd className="font-medium text-primary">{translateRentals(item.allowsRentals)}</dd>
            </div>
          )}
          {"pets" in item && item.pets != null && item.pets !== "" && (
            <div>
              <dt className="text-foreground/70">{isEN ? "Pets" : isFR ? "Animaux" : "Mascotas"}</dt>
              <dd className="font-medium text-primary">{translatePets(item.pets)}</dd>
            </div>
          )}
          {"parking" in item && item.parking && (
            <div>
              <dt className="text-foreground/70">Parking</dt>
              <dd className="font-medium text-primary">{translateParking(item.parking)}</dd>
            </div>
          )}
          {"waterfront" in item && item.waterfront === true && (
            <div>
              <dt className="text-foreground/70">{isEN ? "Waterfront" : isFR ? "En bord de l'eau" : "Frente al agua"}</dt>
              <dd className="font-medium text-primary">{isEN ? "Yes" : isFR ? "Oui" : "Sí"}</dd>
            </div>
          )}
          {"furnished" in item && item.furnished === true && (
            <div>
              <dt className="text-foreground/70">{isEN ? "Furnished" : isFR ? "Meublé" : "Amueblado"}</dt>
              <dd className="font-medium text-primary">{isEN ? "Yes" : isFR ? "Oui" : "Sí"}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Location */}
      {"latitude" in item && "longitude" in item && item.latitude != null && item.longitude != null && (
        <section className="mb-8 rounded-[12px] ring-1 ring-black/10 bg-white overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-black/10">
            <h2 className="text-lg font-semibold tracking-tight text-primary">
              {isEN ? "Location" : isFR ? "Emplacement" : "Ubicación"}
            </h2>
            {addressDisplay && (
              <p className="mt-1 text-[15px] text-foreground/90">{addressDisplay}</p>
            )}
          </div>
          <div className="relative w-full aspect-[16/10]">
            <iframe
              src={`https://www.google.com/maps?q=${item.latitude},${item.longitude}&z=15&output=embed`}
              title={isEN ? "Location map" : isFR ? "Carte de l'emplacement" : "Mapa de ubicación"}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}

      {/* CTAs */}
      <section className="flex flex-wrap gap-3">
        <Link
          href={`/${locale}/contacto`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "Contact" : isFR ? "Contact" : "Contactar"}
        </Link>
        <a
          href={`https://wa.me/17864072591?text=${encodeURIComponent(
            isEN
              ? `Hi Jacquie, I'm interested in ${item.title}.`
              : isFR
                ? `Bonjour Jacquie, je suis intéressé par ${item.title}.`
                : `Hola Jacquie, me interesa ${item.title}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          WhatsApp
        </a>
      </section>
    </main>
  );
}
