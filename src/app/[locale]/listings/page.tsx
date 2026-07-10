// src/app/[locale]/listings/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { LISTINGS } from "@/data/listings";
import { getListingFrOverlay } from "@/data/listingsFrOverlay";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

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
      ? "Active properties available for purchase in Miami and South Florida, based on location, budget, and investment goals."
      : locale === "fr"
        ? "Propriétés actives disponibles à l’achat à Miami et dans le sud de la Floride, selon l’emplacement, le budget et l’objectif d’investissement."
        : "Propiedades activas disponibles para compra en Miami y South Florida, según ubicación, presupuesto y objetivo de inversión.";

  return createPageMetadata({ locale, path: "listings", title, description });
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
    <main className="px-4 py-10 text-foreground sm:py-14">
      {/* Hero */}
      <header className="mb-8 max-w-none">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary/62">
          {isEN ? "MIAMI PROPERTIES" : isFR ? "PROPRIÉTÉS À MIAMI" : "PROPIEDADES EN MIAMI"}
        </p>
        <h1 className="mt-2 font-display text-[42px] font-medium leading-[0.98] tracking-normal text-primary sm:text-[56px]">
          {isEN ? "Available Properties" : isFR ? "Propriétés disponibles" : "Propiedades disponibles"}
        </h1>
        <p className="mt-4 max-w-[72ch] text-[16px] leading-[1.75] text-foreground/80">
          {isEN
            ? "Explore active properties available for purchase in Miami and South Florida, based on location, budget, and investment goals."
            : isFR
              ? "Explorez des propriétés actives disponibles à l’achat à Miami et dans le sud de la Floride, selon l’emplacement, le budget et l’objectif d’investissement."
              : "Explorá propiedades activas disponibles para compra en Miami y South Florida, según ubicación, presupuesto y objetivo de inversión."}
        </p>
      </header>

      {/* Intro */}
      <section className="mb-8">
        <p className="max-w-[65ch] text-[15px] leading-[1.7] text-foreground/72">
          {isEN
            ? "This is an initial selection. If you are comparing areas, buildings, rental rules, or financing scenarios, we can narrow the search together."
            : isFR
              ? "Il s’agit d’une première sélection. Si vous comparez des secteurs, immeubles, règles locatives ou scénarios de financement, nous pouvons affiner la recherche ensemble."
              : "Esta es una selección inicial. Si estás comparando zonas, edificios, reglas de renta o escenarios de financiación, podemos afinar la búsqueda juntos."}
        </p>
      </section>

      {/* Listings grid */}
      <section
        className="mb-12"
        aria-label={isEN ? "Available properties in Miami" : isFR ? "Propriétés disponibles à Miami" : "Propiedades disponibles en Miami"}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {LISTINGS.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[14px] bg-paper ring-1 ring-primary/10 shadow-sm transition hover:-translate-y-[2px] hover:shadow-[0_14px_34px_rgba(43,37,48,0.10)]"
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
              <div className="h-52 w-full overflow-hidden bg-placeholder">
                <img
                  src={item.images[0]}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="relative z-20 p-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-primary/55">{item.city}</p>
                <h2 className="mt-2 font-display text-[25px] font-medium leading-[1.08] tracking-normal text-primary">
                  <Link
                    href={`/${locale}/listings/${item.slug}`}
                    className="text-primary no-underline hover:underline underline-offset-4 decoration-primary/25"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[15px] font-semibold text-primary">
                  ${item.price.toLocaleString("en-US")}
                </p>
                <p className="mt-1 text-[13px] text-primary/65">
                  {item.beds} {isEN ? "beds" : isFR ? "ch." : "hab"} · {item.baths}{" "}
                  {isEN ? "baths" : isFR ? "sdb" : "baños"} ·{" "}
                  {isEN
                    ? `${item.size.toLocaleString("en-US")} sq ft`
                    : isFR
                      ? `${item.size.toLocaleString("fr-CA")} pi²`
                      : `Superficie ${item.size.toLocaleString("en-US")} ft²`}
                </p>
                <p className="mt-3 text-[14px] leading-[1.55] text-foreground/78">
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
            ? "Want to evaluate properties according to your goal?"
            : isFR
              ? "Souhaitez-vous évaluer des propriétés selon votre objectif ?"
              : "¿Querés evaluar propiedades según tu objetivo?"}
        </h3>
        <p className="mt-2 text-center text-[14px] text-primary-foreground/80">
          {isEN
            ? "Tell me what you are looking for and I will help you compare the right options."
            : isFR
              ? "Dites-moi ce que vous recherchez et je vous aide à comparer les bonnes options."
              : "Contame qué estás buscando y te ayudo a comparar opciones alineadas con tu objetivo."}
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary-foreground/10 px-5 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {isEN ? "Send my search" : isFR ? "Envoyer ma recherche" : "Enviar mi búsqueda"}
          </Link>
        </div>
      </section>
    </main>
  );
}
