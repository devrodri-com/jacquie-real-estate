// src/app/[locale]/listings/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { LISTINGS } from "@/data/listings";
import { getListingFrOverlay } from "@/data/listingsFrOverlay";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jacquiezaraterealtor.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : raw === "fr" ? "fr" : "es";
  const title =
    locale === "en"
      ? "Active listings | Jacquie Zarate Realtor"
      : locale === "fr"
        ? "Annonces actives | Jacquie Zarate Realtor"
        : "Propiedades activas | Jacquie Zarate Realtor";
  const description =
    locale === "en"
      ? "Selected Miami properties with investment and rental potential."
      : locale === "fr"
        ? "Propriétés sélectionnées à Miami avec potentiel d'investissement et de location."
        : "Propiedades seleccionadas en Miami con potencial de inversión y renta.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/listings`,
      languages: {
        es: `${BASE_URL}/es/listings`,
        en: `${BASE_URL}/en/listings`,
        fr: `${BASE_URL}/fr/listings`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/listings`,
    },
    twitter: {
      title,
      description,
    },
  };
}

function cardDescription(
  locale: "es" | "en" | "fr",
  item: (typeof LISTINGS)[number]
) {
  if (locale === "en") return item.description_en;
  if (locale === "fr") {
    const fr = getListingFrOverlay(item.slug);
    return fr?.descriptionShort ?? "";
  }
  return item.description_es;
}

export default async function ListingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : raw === "fr" ? "fr" : "es";
  const isEN = locale === "en";
  const isFR = locale === "fr";

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-foreground">
      {/* Hero */}
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
          {isEN ? "Active Listings" : isFR ? "Annonces actives" : "Propiedades activas"}
        </h1>
        <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <p className="max-w-[60ch] text-[15px] leading-[1.75] text-foreground">
          {isEN
            ? "Selected properties with investment and rental potential in Miami."
            : isFR
              ? "Propriétés sélectionnées à fort potentiel d'investissement et de location à Miami."
              : "Propiedades seleccionadas con potencial de inversión y renta en Miami."}
        </p>
      </header>

      {/* Intro */}
      <section className="mb-8">
        <p className="text-[15px] leading-[1.7] text-foreground max-w-[65ch]">
          {isEN
            ? "Below you will find a selection of active resale properties. For more options or to schedule a visit, get in touch."
            : isFR
              ? "Vous trouverez ci-dessous une sélection de propriétés actives en revente. Pour plus d'options ou planifier une visite, contactez-moi."
              : "A continuación una selección de propiedades activas en resale. Para más opciones o agendar una visita, contactame."}
        </p>
      </section>

      {/* Listings grid */}
      <section
        className="mb-12"
        aria-label={isEN ? "Active listings" : isFR ? "Annonces actives" : "Propiedades activas"}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {LISTINGS.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[12px] ring-1 ring-black/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,.08)]"
            >
              <Link
                href={`/${locale}/listings/${item.slug}`}
                aria-label={
                  isEN
                    ? `View details for ${item.title}`
                    : isFR
                      ? `Voir les détails de ${item.title}`
                      : `Ver detalles de ${item.title}`
                }
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">
                  {isEN
                    ? `View details for ${item.title}`
                    : isFR
                      ? `Voir les détails de ${item.title}`
                      : `Ver detalles de ${item.title}`}
                </span>
              </Link>
              <div className="h-48 w-full overflow-hidden bg-placeholder">
                <img
                  src={item.images[0]}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="relative z-20 p-4 sm:p-5">
                <h2 className="text-lg font-semibold tracking-tight text-primary">
                  <Link
                    href={`/${locale}/listings/${item.slug}`}
                    className="no-underline text-primary hover:underline"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-1 text-[13px] text-primary/70">{item.city}</p>
                <p className="mt-2 text-[15px] font-medium text-primary">
                  ${item.price.toLocaleString("en-US")}
                </p>
                <p className="mt-1 text-[13px] text-primary/70">
                  {item.beds} {isEN ? "beds" : isFR ? "ch." : "hab"} · {item.baths}{" "}
                  {isEN ? "baths" : isFR ? "sdb" : "baños"} · {item.size.toLocaleString("en-US")}{" "}
                  {isFR ? "pi²" : "sqft"}
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-foreground/85">
                  {cardDescription(locale, item)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
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
                    className="inline-flex h-9 items-center justify-center rounded-md border border-primary/25 px-4 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative rounded-[10px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground overflow-hidden">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        <div className="mx-auto mb-3 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary-foreground text-center">
          {isEN
            ? "Want to receive active opportunities?"
            : isFR
              ? "Souhaitez-vous recevoir des opportunités actives ?"
              : "¿Querés recibir oportunidades activas?"}
        </h3>
        <p className="mt-2 text-center text-[14px] text-primary-foreground/80">
          {isEN
            ? "Leave your details and we'll send you new listings that match your criteria."
            : isFR
              ? "Laissez vos coordonnées et nous vous enverrons de nouvelles annonces correspondant à vos critères."
              : "Dejá tus datos y te enviamos nuevos listados que se ajusten a tu búsqueda."}
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary-foreground/10 px-5 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {isEN ? "Contact" : isFR ? "Aller au contact" : "Ir a contacto"}
          </Link>
        </div>
      </section>
    </main>
  );
}
