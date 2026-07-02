// src/app/[locale]/lets-go-miami/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import LetsGoMiamiFooter from "@/components/LetsGoMiamiFooter";
import LetsGoMiamiGallery, { type LetsGoMiamiGalleryLabels } from "@/components/LetsGoMiamiGallery";

type Locale = "es" | "en" | "fr";

type RepresentativeStayImage = {
  src: string;
  alt: Record<Locale, string>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jacquiezaraterealtor.com";

const COPY: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    ctaWhatsapp: string;
	    ctaEmail: string;
	    amenitiesTitle: string;
	    amenities: string[];
	    amenitiesMobileItems: string[];
	    availabilityTitle: string;
    availabilityText: string;
    representativeNote: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryText: string;
    galleryNote: string;
    galleryCta: string;
    galleryLabels: LetsGoMiamiGalleryLabels;
    mainSite: string;
    whatsappMessage: string;
    emailSubject: string;
  }
> = {
  es: {
    metaTitle: "Let’s Go Miami | Estadías y renta corta en Miami",
    metaDescription:
      "Estadías seleccionadas y renta corta en Miami por Let’s Go Miami, by Jacna Services LLC. Sunny Isles y zonas seleccionadas.",
    eyebrow: "Let’s Go Miami · by Jacna Services LLC",
    title: "Estadías seleccionadas en Miami",
    subtitle:
      "Let’s Go Miami trabaja con condos y departamentos en zonas como Sunny Isles, pensados para quienes buscan una estadía cómoda, privada y bien ubicada.",
    note:
      "Vacation Condo Management para estadías de renta corta, con consultas personalizadas según fechas, temporada y cantidad de huéspedes.",
    ctaWhatsapp: "Consultar disponibilidad",
	    ctaEmail: "Escribir por email",
	    amenitiesTitle: "Comodidades habituales",
	    amenities: ["Piscina", "Spa", "Gimnasio", "Patio techado", "Desde 6 noches"],
	    amenitiesMobileItems: ["Piscina", "Spa", "Gimnasio", "Patio techado", "Estadías desde 6 noches"],
	    availabilityTitle: "Consulta según tus fechas",
    availabilityText:
      "La disponibilidad, tarifa y detalles específicos se confirman según fechas, temporada y cantidad de huéspedes.",
    representativeNote:
      "Las fotos y referencias visuales muestran ejemplos del tipo de propiedades disponibles. Esta página no publica una unidad específica, número de unidad, dirección exacta ni precio por noche.",
    galleryEyebrow: "ESTADÍAS EN MIAMI",
    galleryTitle: "Ejemplos de estadías en Sunny Isles",
    galleryText:
      "Las fotos muestran ejemplos del tipo de condos disponibles para renta corta. Las opciones finales, tarifas y disponibilidad se confirman según fechas, temporada y cantidad de huéspedes.",
    galleryNote: "Fotos representativas. No se publica una unidad específica.",
    galleryCta: "Consultar disponibilidad",
    galleryLabels: {
      viewAll: "Ver todas las fotos",
      close: "Cerrar galería",
      previous: "Foto anterior",
      next: "Foto siguiente",
    },
    mainSite: "← Volver al sitio de Jacquie Zarate Realtor",
    whatsappMessage: "Hola Jacquie, quiero consultar disponibilidad para una estadía con Let’s Go Miami.",
    emailSubject: "Consulta de estadía Let’s Go Miami",
  },
  en: {
    metaTitle: "Let’s Go Miami | Short-term stays in Miami",
    metaDescription:
      "Selected short-term stays in Miami by Let’s Go Miami, by Jacna Services LLC. Sunny Isles and selected areas.",
    eyebrow: "Let’s Go Miami · by Jacna Services LLC",
    title: "Selected stays in Miami",
    subtitle:
      "Let’s Go Miami works with condos and apartments in areas like Sunny Isles, designed for guests looking for a comfortable, private, and well-located stay.",
    note:
      "Vacation Condo Management for short-term stays, with personalized inquiries based on dates, season, and number of guests.",
    ctaWhatsapp: "Check availability",
	    ctaEmail: "Write by email",
	    amenitiesTitle: "Common amenities",
	    amenities: ["Pool", "Spa", "Gym", "Covered patio", "From 6 nights"],
	    amenitiesMobileItems: ["Pool", "Spa", "Gym", "Covered patio", "Stays from 6 nights"],
	    availabilityTitle: "Ask based on your dates",
    availabilityText:
      "Availability, rates, and specific details are confirmed based on dates, season, and number of guests.",
    representativeNote:
      "Photos and visual references show examples of the type of properties available. This page does not publish a specific unit, unit number, exact address, or nightly price.",
    galleryEyebrow: "MIAMI STAYS",
    galleryTitle: "Examples of stays in Sunny Isles",
    galleryText:
      "The photos show examples of the type of condos available for short stays. Final options, rates, and availability are confirmed based on dates, season, and number of guests.",
    galleryNote: "Representative photos. No specific unit is publicly listed.",
    galleryCta: "Check availability",
    galleryLabels: {
      viewAll: "View all photos",
      close: "Close gallery",
      previous: "Previous photo",
      next: "Next photo",
    },
    mainSite: "← Back to Jacquie Zarate Realtor",
    whatsappMessage: "Hi Jacquie, I’d like to ask about availability for a Let’s Go Miami stay.",
    emailSubject: "Let’s Go Miami stay inquiry",
  },
  fr: {
    metaTitle: "Let’s Go Miami | Séjours de courte durée à Miami",
    metaDescription:
      "Séjours sélectionnés et location de courte durée à Miami par Let’s Go Miami, by Jacna Services LLC. Sunny Isles et secteurs sélectionnés.",
    eyebrow: "Let’s Go Miami · by Jacna Services LLC",
    title: "Séjours sélectionnés à Miami",
    subtitle:
      "Let’s Go Miami travaille avec des condos et appartements dans des secteurs comme Sunny Isles, pensés pour les personnes qui recherchent un séjour confortable, privé et bien situé.",
    note:
      "Vacation Condo Management pour des séjours de courte durée, avec des demandes personnalisées selon les dates, la saison et le nombre de voyageurs.",
    ctaWhatsapp: "Vérifier la disponibilité",
	    ctaEmail: "Écrire par courriel",
	    amenitiesTitle: "Commodités habituelles",
	    amenities: ["Piscine", "Spa", "Gym", "Patio couvert", "À partir de 6 nuits"],
	    amenitiesMobileItems: ["Piscine", "Spa", "Salle d’entraînement", "Patio couvert", "Séjours à partir de 6 nuits"],
	    availabilityTitle: "Demande selon vos dates",
    availabilityText:
      "La disponibilité, les tarifs et les détails précis sont confirmés selon les dates, la saison et le nombre de voyageurs.",
    representativeNote:
      "Les photos et références visuelles montrent des exemples du type de propriétés disponibles. Cette page ne publie pas d’unité précise, de numéro d’unité, d’adresse exacte ou de prix par nuit.",
    galleryEyebrow: "SÉJOURS À MIAMI",
    galleryTitle: "Exemples de séjours à Sunny Isles",
    galleryText:
      "Les photos montrent des exemples du type de condos disponibles pour des séjours de courte durée. Les options finales, les tarifs et la disponibilité sont confirmés selon les dates, la saison et le nombre de voyageurs.",
    galleryNote: "Photos représentatives. Aucune unité précise n’est publiée.",
    galleryCta: "Vérifier la disponibilité",
    galleryLabels: {
      viewAll: "Voir toutes les photos",
      close: "Fermer la galerie",
      previous: "Photo précédente",
      next: "Photo suivante",
    },
    mainSite: "← Retour au site de Jacquie Zarate Realtor",
    whatsappMessage: "Bonjour Jacquie, j’aimerais vérifier la disponibilité pour un séjour avec Let’s Go Miami.",
    emailSubject: "Demande de séjour Let’s Go Miami",
  },
};

// Add approved ImageKit URLs here once available. These must remain representative stay visuals, not a unit listing.
const REPRESENTATIVE_STAY_IMAGES: RepresentativeStayImage[] = [
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-hero.jpg",
    alt: {
      es: "Vista al agua desde un condo de renta corta en Sunny Isles.",
      en: "Waterfront view from a short-stay condo in Sunny Isles.",
      fr: "Vue sur l’eau depuis un condo de courte durée à Sunny Isles.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-01.jpg",
    alt: {
      es: "Living moderno de un condo para estadías en Miami.",
      en: "Modern living room in a Miami short-stay condo.",
      fr: "Salon moderne dans un condo pour séjour à Miami.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-02.jpg",
    alt: {
      es: "Dormitorio luminoso en un condo de renta corta.",
      en: "Bright bedroom in a short-stay condo.",
      fr: "Chambre lumineuse dans un condo de courte durée.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-03.jpg",
    alt: {
      es: "Cocina equipada en un condo para estadías en Miami.",
      en: "Equipped kitchen in a Miami short-stay condo.",
      fr: "Cuisine équipée dans un condo pour séjour à Miami.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-04.jpg",
    alt: {
      es: "Living con vista en un condo de renta corta.",
      en: "Living area with a view in a short-stay condo.",
      fr: "Salon avec vue dans un condo de courte durée.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-05.jpg",
    alt: {
      es: "Balcón privado con vista al agua en Sunny Isles.",
      en: "Private balcony with water view in Sunny Isles.",
      fr: "Balcon privé avec vue sur l’eau à Sunny Isles.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-06.jpg",
    alt: {
      es: "Baño moderno en un condo para estadías.",
      en: "Modern bathroom in a short-stay condo.",
      fr: "Salle de bain moderne dans un condo de courte durée.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-07.jpg",
    alt: {
      es: "Dormitorio adicional en un condo para estadías en Miami.",
      en: "Additional bedroom in a Miami short-stay condo.",
      fr: "Chambre additionnelle dans un condo pour séjour à Miami.",
    },
  },
];

function normalizeLocale(raw: string): Locale {
  if (raw === "en" || raw === "fr") return raw;
  return "es";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const copy = COPY[locale];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/lets-go-miami`,
      languages: {
        es: `${BASE_URL}/es/lets-go-miami`,
        en: `${BASE_URL}/en/lets-go-miami`,
        fr: `${BASE_URL}/fr/lets-go-miami`,
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${BASE_URL}/${locale}/lets-go-miami`,
    },
    twitter: {
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default async function LetsGoMiamiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const copy = COPY[locale];
  const whatsappHref = `https://wa.me/17864072591?text=${encodeURIComponent(copy.whatsappMessage)}`;
  const emailHref = `mailto:jacnaservices@gmail.com?subject=${encodeURIComponent(copy.emailSubject)}`;

  return (
    <>
      <div className="mx-auto max-w-[1100px] px-4 pb-0 pt-12 text-foreground sm:pt-16">
        <section className="rounded-[18px] bg-surface p-6 ring-1 ring-primary/10 sm:p-8 md:p-10">
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="rounded-[16px] bg-paper p-5 ring-1 ring-primary/10 shadow-sm">
              <div className="relative mx-auto aspect-square w-full max-w-[340px]">
                <Image
                  src="/images/lets-go-miami/logo.png"
                  alt="Let’s Go Miami by Jacna Services LLC"
                  fill
                  priority
                  sizes="(min-width: 768px) 340px, 80vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/62">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[12ch] font-display text-[44px] font-medium leading-[0.96] tracking-normal text-primary sm:text-[58px] lg:text-[66px]">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-foreground/82">
                {copy.subtitle}
              </p>
              <p className="mt-4 max-w-[58ch] text-[14px] leading-[1.7] text-foreground/68">
                {copy.note}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {copy.ctaWhatsapp}
                </a>
                <a
                  href={emailHref}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {copy.ctaEmail}
                </a>
              </div>
            </div>
          </div>
        </section>

        {REPRESENTATIVE_STAY_IMAGES.length > 0 && (
          <section className="mt-12 rounded-[16px] bg-paper p-6 ring-1 ring-primary/10 sm:p-8" aria-labelledby="lets-go-gallery-title">
            <div className="max-w-[900px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/62">
                {copy.galleryEyebrow}
              </p>
              <h2 id="lets-go-gallery-title" className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
                {copy.galleryTitle}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-foreground/76">
                {copy.galleryText}
              </p>
              <p className="mt-3 text-[13px] leading-[1.6] text-foreground/58">
                {copy.galleryNote}
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {copy.galleryCta}
              </a>
            </div>

            <LetsGoMiamiGallery
              images={REPRESENTATIVE_STAY_IMAGES.map((image) => ({
                src: image.src,
                alt: image.alt[locale],
              }))}
              labels={copy.galleryLabels}
            />
          </section>
        )}

        <section className="mt-10 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[14px] bg-paper p-6 ring-1 ring-primary/10 shadow-sm">
            <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary">
              {copy.availabilityTitle}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-foreground/78">
              {copy.availabilityText}
            </p>
          </div>
	          <div className="rounded-[14px] bg-surface p-6 ring-1 ring-primary/10">
	            <h2 className="text-sm font-semibold text-primary">{copy.amenitiesTitle}</h2>
			            <ul className="mt-3 grid gap-1.5 text-[15px] leading-snug text-foreground/76 md:hidden">
			              {copy.amenitiesMobileItems.map((amenity) => (
			                <li
			                  key={amenity}
			                  className="flex items-center gap-2"
			                >
			                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
			                  <span>{amenity}</span>
			                </li>
			              ))}
		            </ul>
	            <ul className="mt-4 hidden flex-wrap gap-2 md:flex">
	              {copy.amenities.map((amenity) => (
	                <li
	                  key={amenity}
	                  className="rounded-full bg-paper px-3 py-1.5 text-[13px] font-medium leading-none text-primary ring-1 ring-primary/10"
	                >
                  {amenity}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] leading-[1.75] text-foreground/72">
              {copy.representativeNote}
            </p>
          </div>
        </section>

        <div className="mt-10 flex justify-center border-t border-primary/10 pt-6">
          <Link
            href={`/${locale}`}
            className="text-[13px] font-normal text-primary/70 no-underline transition hover:text-primary hover:underline sm:text-sm"
          >
            {copy.mainSite}
          </Link>
        </div>
      </div>

      <LetsGoMiamiFooter locale={locale} logoSrc="/images/lets-go-miami/logo.png" />
    </>
  );
}
