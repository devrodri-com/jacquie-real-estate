// src/components/SectionListingsHome.tsx
import Link from "next/link";
import { LISTINGS } from "@/data/listings";

type Props = { locale: "es" | "en" | "fr" };

export default function SectionListingsHome({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const eyebrow = isEN ? "ACTIVE PROPERTIES" : isFR ? "PROPRIÉTÉS ACTIVES" : "PROPIEDADES ACTIVAS";
  const title = isEN ? "Available Properties" : isFR ? "Propriétés disponibles" : "Propiedades disponibles";
  const intro = isEN
    ? "Explore active properties already available in Miami and South Florida, ideal for buyers looking for a move-in-ready unit, rental potential, or an investment opportunity."
    : isFR
      ? "Explorez des propriétés actives déjà disponibles à Miami et dans le sud de la Floride, idéales pour les acheteurs qui recherchent une unité prête à utiliser, un potentiel locatif ou une occasion d’investissement."
      : "Explorá propiedades activas ya disponibles en Miami y South Florida, ideales para quienes buscan comprar una unidad lista para usar, alquilar o evaluar como inversión.";

  const listings = LISTINGS.slice(0, 2);

  return (
    <section aria-labelledby="listings-home-title" className="max-w-[1100px] mx-auto px-4 pt-4 md:pt-6">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary/62">
        {eyebrow}
      </p>
      <h2 id="listings-home-title" className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.7] text-foreground/85">
        {intro}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {listings.map((item) => {
          const addressDisplay = (item as { addressFull?: string }).addressFull ?? item.title;
          const listingHref = `/${locale}/listings/${item.slug}`;
          const specsText = isEN
            ? `${item.beds} beds • ${item.baths} baths • ${item.size.toLocaleString("en-US")} sq ft`
            : isFR
              ? `${item.beds} ch. • ${item.baths} sdb • ${item.size.toLocaleString("en-US")} pi²`
              : `${item.beds} hab • ${item.baths} baños • Superficie ${item.size.toLocaleString("en-US")} ft²`;
          return (
            <div
              key={item.id}
              className="flex flex-col h-full rounded-[12px] ring-1 ring-black/10 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)] hover:shadow-md transition-shadow"
            >
              <Link
                href={listingHref}
                className="block aspect-[16/9] rounded-t-[12px] overflow-hidden bg-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shrink-0"
              >
                <img
                  src={item.images[0]}
                  alt={addressDisplay}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </Link>
              <div className="flex flex-col flex-1 min-h-0 p-5 bg-primary text-primary-foreground">
                <h3 className="font-display text-[21px] font-medium leading-[1.08] tracking-normal text-primary-foreground">
                  <Link
                    href={listingHref}
                    className="no-underline hover:underline underline-offset-4 decoration-primary-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 text-primary-foreground"
                  >
                    {addressDisplay}
                  </Link>
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-primary-foreground/70">
                  <span>{item.city}</span>
                  <span className="inline-flex items-center rounded-full bg-primary-foreground/10 px-2 py-0.5 text-[11px] font-medium tracking-[0.04em] text-primary-foreground ring-1 ring-primary-foreground/20">
                    MLS {item.mls}
                  </span>
                </div>
                <p className="mt-2 text-[15px] font-medium text-primary-foreground">
                  ${item.price.toLocaleString("en-US")}
                </p>
                <p className="mt-1 text-[13px] text-primary-foreground/70">{specsText}</p>
                <p className="mt-2 flex-1 min-h-0 text-[14px] leading-[1.5] text-primary-foreground/80">
                  {isEN
                    ? item.description_en
                    : isFR
                      ? ((item as { description_fr?: string }).description_fr ?? item.description_es)
                      : item.description_es}
                </p>
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  <Link
                    href={listingHref}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary-foreground px-4 text-sm font-medium text-primary no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {isEN ? "See property" : isFR ? "Voir la propriété" : "Ver propiedad"}
                  </Link>
                  <Link
                    href={`/${locale}/contacto`}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-primary-foreground/30 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    {isEN ? "Contact" : isFR ? "Contact" : "Contactar"}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
        <Link
          href={`/${locale}/listings`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "View available properties" : isFR ? "Voir les propriétés disponibles" : "Ver propiedades disponibles"}
        </Link>
        <Link
          href={`/${locale}/contacto`}
          className="inline-flex h-10 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "Ask about available opportunities" : isFR ? "Consulter les opportunités disponibles" : "Consultar por oportunidades disponibles"}
        </Link>
      </div>
    </section>
  );
}
