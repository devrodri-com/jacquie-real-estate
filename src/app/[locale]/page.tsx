// src/app/[locale]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import SectionAboutJacquieHome from '@/components/SectionAboutJacquieHome';
import SectionListingsHome from '@/components/SectionListingsHome';
import SectionWhyPrecon from '@/components/SectionWhyPrecon';
import { createPageMetadata, normalizeLocale } from '@/lib/seo';

type HomeLocale = "es" | "en" | "fr";

const HOME_META: Record<HomeLocale, { title: string; description: string }> = {
  es: {
    title: "Jacquie Zarate Realtor | Inversión inmobiliaria en Miami",
    description:
      "Asesoría personalizada para comprar, invertir y gestionar propiedades en Miami. Acompañamiento completo, incluso si no estás en Estados Unidos.",
  },
  en: {
    title: "Jacquie Zarate Realtor | Miami Real Estate & Investment",
    description:
      "Personalized guidance to buy, invest, and manage properties in Miami. Full support, even if you're not based in the U.S.",
  },
  fr: {
    title: "Jacquie Zarate Realtor | Immobilier et investissement à Miami",
    description:
      "Accompagnement personnalisé pour acheter, investir et gérer des propriétés à Miami, même à distance.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const meta = HOME_META[locale];
  return createPageMetadata({ locale, title: meta.title, description: meta.description });
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const { locale: rawLocale } = await params;
  const locale: HomeLocale = rawLocale === "en" ? "en" : rawLocale === "fr" ? "fr" : "es";
  const whatsappMessage =
    locale === "en"
      ? "Hi Jacquie, I’d like to talk with you about an opportunity in Miami."
      : locale === "fr"
        ? "Bonjour Jacquie, j’aimerais vous parler d’une opportunité à Miami."
        : "Hola Jacquie, quiero hablar con vos sobre una oportunidad en Miami.";
  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(whatsappMessage)}`;
  const contactHref = `/${locale}/contacto`;
  const projectsHref = `/${locale}/proyectos`;
  const listingsHref = `/${locale}/listings`;
  const financingHref = `/${locale}/financiacion`;
  const letsGoHref = `/${locale}/lets-go-miami`;

  const letsGoMessage =
    locale === "en"
      ? "Hi Jacquie, I’d like to ask about availability for a Let’s Go Miami stay."
      : locale === "fr"
        ? "Bonjour Jacquie, j’aimerais vérifier la disponibilité pour un séjour avec Let’s Go Miami."
        : "Hola Jacquie, quiero consultar disponibilidad para una estadía con Let’s Go Miami.";
  const letsGoWhatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(letsGoMessage)}`;
  const letsGoEmailSubject =
    locale === "en"
      ? "Let’s Go Miami stay inquiry"
      : locale === "fr"
        ? "Demande de séjour Let’s Go Miami"
        : "Consulta de estadía Let’s Go Miami";
  const letsGoEmailHref = `mailto:jacnaservices@gmail.com?subject=${encodeURIComponent(letsGoEmailSubject)}`;
  const letsGoAmenities =
    locale === "en"
      ? ["Pool", "Spa", "Gym", "Covered patio", "From 6 nights"]
      : locale === "fr"
        ? ["Piscine", "Spa", "Salle d’entraînement", "Patio couvert", "À partir de 6 nuits"]
        : ["Piscina", "Spa", "Gimnasio", "Patio techado", "Desde 6 noches"];

  const opportunityCards = [
    {
      title: locale === "en" ? "Pre-construction projects" : locale === "fr" ? "Projets en préconstruction" : "Proyectos de preconstrucción",
      text: locale === "en"
        ? "Evaluate selected projects with staged payments, delivery timelines, rental potential, and long-term appreciation in mind."
        : locale === "fr"
          ? "Évaluez des projets sélectionnés selon les paiements échelonnés, les délais de livraison, le potentiel locatif et la valorisation."
          : "Evaluá proyectos seleccionados por plan de pagos, entrega, potencial de renta y valorización a largo plazo.",
      href: projectsHref,
      label: locale === "en" ? "See projects" : locale === "fr" ? "Voir les projets" : "Ver proyectos",
    },
    {
      title: locale === "en" ? "Available Properties" : locale === "fr" ? "Propriétés disponibles" : "Propiedades disponibles",
      text: locale === "en"
        ? "Compare active properties available for purchase in Miami and South Florida with practical guidance before scheduling a visit or making an offer."
        : locale === "fr"
          ? "Comparez des propriétés actives disponibles à l’achat à Miami et dans le sud de la Floride avec un accompagnement clair avant d’avancer."
          : "Compará propiedades activas disponibles para compra en Miami y South Florida con guía práctica antes de visitar o avanzar con una oferta.",
      href: listingsHref,
      label: locale === "en" ? "See properties" : locale === "fr" ? "Voir les propriétés" : "Ver propiedades",
    },
  ];

  return (
    <div className="space-y-20 pt-0 pb-12">
      {/* HERO */}
      <section
        role="region"
        aria-labelledby="hero-title"
        aria-describedby="hero-desc"
        className="relative left-1/2 -translate-x-1/2 overflow-hidden bg-background flex flex-col min-h-[600px] w-[100dvw] max-w-[100dvw]"
      >
        <div className="relative flex min-h-[600px] items-start justify-center px-4 pt-[88px] pb-28 sm:px-0 md:pt-[104px] md:pb-28">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="hidden sm:block absolute inset-0">
              <Image
                src="/images/hero-fallback.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="sm:hidden absolute inset-0">
              <Image src="/images/hero-fallback-mobile.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-background/58 md:bg-gradient-to-r md:from-background/82 md:via-background/62 md:to-background/18" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-14">
              <div className="max-w-[44rem] text-left">
                <div className="mb-5 flex justify-center md:justify-start">
                  <div className="inline-flex items-center gap-3 rounded-full bg-background/92 px-3 py-2 ring-1 ring-accent/20 backdrop-blur-sm">
                    <Image
                      src="/images/jacquie-zarate.jpg"
                      alt="Jacquie Zarate Realtor"
                      width={96}
                      height={96}
                      sizes="96px"
                      quality={90}
                      priority
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-white/80"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                        JACQUIE ZARATE · REALTOR®
                      </p>
                      <p className="text-[13px] leading-5 text-foreground/72">
                        {locale === "en"
                          ? "Your trusted contact in Miami"
                          : locale === "fr"
                            ? "Votre personne de confiance à Miami"
                            : "Tu persona de confianza en Miami"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 text-[12px] uppercase tracking-[0.12em] text-primary/70 text-center md:text-left">
                  <div className="md:hidden leading-[1.5]">
                    {locale === "en" ? (
                      <>
                        <div>MIAMI · REAL ESTATE INVESTMENT</div>
                        <div>PERSONAL GUIDANCE</div>
                      </>
                    ) : locale === "fr" ? (
                      <>
                        <div>MIAMI · INVESTISSEMENT IMMOBILIER</div>
                        <div>ACCOMPAGNEMENT PERSONNALISÉ</div>
                      </>
                    ) : (
                      <>
                        <div>MIAMI · COMPRA E INVERSIÓN</div>
                        <div>ACOMPAÑAMIENTO PERSONAL</div>
                      </>
                    )}
                  </div>

                  <p className="hidden md:block">
                    {locale === "en"
                      ? "MIAMI · REAL ESTATE INVESTMENT · PERSONAL GUIDANCE"
                      : locale === "fr"
                        ? "MIAMI · INVESTISSEMENT IMMOBILIER · ACCOMPAGNEMENT PERSONNALISÉ"
                        : "MIAMI · COMPRA E INVERSIÓN · ACOMPAÑAMIENTO PERSONAL"}
                  </p>
                </div>

                <h1
                  id="hero-title"
                  className="font-display max-w-[15ch] text-[44px] font-medium leading-[0.96] tracking-normal text-primary sm:text-[56px] md:text-[64px] lg:text-[70px]"
                >
                  {locale === "en"
                    ? "Invest in Miami with clear guidance from a trusted local advisor."
                    : locale === "fr"
                      ? "Investir à Miami avec clarté et une personne de confiance sur place."
                      : "Invierte en Miami con claridad, estrategia y una persona de confianza en el proceso."}
                </h1>

                <p className="mt-5 max-w-[68ch] text-[18px] font-medium leading-8 text-foreground/80">
                  {locale === "en"
                    ? "I help you evaluate purchases, pre-construction projects, and active properties with practical criteria, real follow-up, and a focus on confident decisions, even if you are not in Miami."
                    : locale === "fr"
                      ? "Je vous aide à évaluer des achats, des projets en préconstruction et des propriétés actives avec des critères concrets, un vrai suivi et des décisions plus sereines, même à distance."
                      : "Te ayudo a evaluar compras, proyectos de preconstrucción y propiedades activas con criterio, seguimiento real y foco en que tomes decisiones seguras, incluso si no estás en Miami."}
                </p>

                <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-11 min-w-[176px] w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:-translate-y-[1px] hover:opacity-95 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-accent/40 sm:w-auto"
                  >
                    {locale === "en" ? "Chat on WhatsApp" : locale === "fr" ? "Écrire sur WhatsApp" : "Hablar por WhatsApp"}
                  </a>
                  <a
                    href="#oportunidades"
                    className="inline-flex h-11 min-w-[176px] w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-accent/30 sm:w-auto md:min-w-0"
                  >
                    {locale === "en" ? "View opportunities" : locale === "fr" ? "Voir les opportunités" : "Ver oportunidades"}
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center text-primary/58 md:justify-start md:text-left">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs" aria-label="Miami Life Realty" title="Miami Life Realty">
                    MIAMI LIFE REALTY
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs" aria-label="NAR · REALTOR®" title="NAR · REALTOR®">
                    NAR · REALTOR®
                  </span>
                </div>

                <div id="hero-desc" className="flex items-center justify-center md:justify-start pt-4 pb-10 md:pb-0 text-xs text-foreground/70 text-center md:text-left">
                  <span className="mr-1 hidden text-foreground/60 sm:inline">
                    {locale === "en" ? "Questions?" : locale === "fr" ? "Des questions?" : "¿Dudas?"}
                  </span>
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={locale === "en" ? "Open Jacquie's WhatsApp with a prefilled message" : locale === "fr" ? "Ouvrir WhatsApp avec un message prérempli" : "Abrir WhatsApp de Jacquie con mensaje prellenado"}
                    className="block underline decoration-accent/50 underline-offset-2 hover:decoration-accent sm:ml-2 sm:inline"
                    data-analytics="hero:whatsapp"
                  >
                    {locale === "en" ? "Chat on WhatsApp" : locale === "fr" ? "Écrire sur WhatsApp" : "Hablemos por WhatsApp"}
                  </a>
                </div>
              </div>

              <div className="relative hidden md:flex justify-end">
                <div className="relative w-full max-w-[420px]">
                  <div className="absolute -inset-4 rounded-[32px] bg-background/70 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/75 bg-background/90 p-3 ring-1 ring-accent/20 shadow-lg backdrop-blur-sm">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                      <Image
                        src="/images/jacquie-zarate.jpg"
                        alt="Jacquie Zarate Realtor"
                        fill
                        sizes="(min-width: 768px) 420px, 0px"
                        quality={92}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="px-2 pb-1 pt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/60">
                        {locale === "en"
                          ? "Direct guidance in Miami"
                          : locale === "fr"
                            ? "Accompagnement direct à Miami"
                            : "Acompañamiento directo en Miami"}
                      </p>
                      <p className="mt-2 font-display text-[24px] font-medium leading-[1.08] tracking-normal text-primary">
                        {locale === "en"
                          ? "From search to financing questions and closing decisions."
                          : locale === "fr"
                            ? "De la recherche aux questions de financement et aux décisions d’achat."
                            : "Desde la búsqueda hasta financiación y decisiones de compra."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full bg-primary text-primary-foreground py-5 px-4" role="region" aria-label={locale === "en" ? "What we offer" : locale === "fr" ? "Ce que nous offrons" : "Qué ofrecemos"}>
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-center gap-3 text-center text-sm font-medium sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            <span className="text-primary-foreground/95">
              {locale === "en" ? "Buy with clarity" : locale === "fr" ? "Acheter avec clarté" : "Comprar con claridad"}
            </span>
            <span className="hidden sm:inline text-primary-foreground/35" aria-hidden>·</span>
            <span className="text-primary-foreground/95">
              {locale === "en" ? "Invest with local guidance" : locale === "fr" ? "Investir avec un accompagnement local" : "Invertir con guía local"}
            </span>
            <span className="hidden sm:inline text-primary-foreground/35" aria-hidden>·</span>
            <span className="text-primary-foreground/95">
              {locale === "en" ? "Financing from 25% down payment" : locale === "fr" ? "Financement dès 25% de mise de fonds" : "Financiación desde 25% de down payment"}
            </span>
          </div>
        </div>
      </section>

      <section id="oportunidades" aria-labelledby="opportunities-title" className="max-w-[1100px] mx-auto px-4">
        <div>
          <h2 id="opportunities-title" className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
            {locale === "en" ? "Opportunities to buy or invest in Miami" : locale === "fr" ? "Opportunités pour acheter ou investir à Miami" : "Oportunidades para comprar o invertir en Miami"}
          </h2>
          <p className="mt-3 max-w-[64ch] text-[16px] leading-[1.75] text-foreground/80">
            {locale === "en"
              ? "Start by comparing the two paths buyers usually evaluate: available properties and pre-construction projects."
              : locale === "fr"
                ? "Commencez par comparer les deux chemins que les acheteurs évaluent souvent : les propriétés disponibles et les projets en préconstruction."
                : "Empezá comparando los dos caminos que suelen evaluar compradores e inversores: propiedades disponibles y proyectos de preconstrucción."}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {opportunityCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex h-full flex-col rounded-[14px] bg-primary p-6 text-primary-foreground ring-1 ring-primary-foreground/10 no-underline shadow-sm transition hover:-translate-y-[2px] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div className="h-[3px] w-20 rounded-full bg-accent/80" aria-hidden />
              <h3 className="mt-5 font-display text-[24px] font-medium leading-[1.08] tracking-normal">{card.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.65] text-primary-foreground/82">{card.text}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-primary-foreground">
                {card.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="financing-home-title" className="max-w-[1100px] mx-auto px-4">
        <div className="rounded-[14px] bg-paper p-6 sm:p-8 ring-1 ring-primary/10 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary/62">
                {locale === "en" ? "Financing" : locale === "fr" ? "Financement" : "Financiación"}
              </p>
              <h2 id="financing-home-title" className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
                {locale === "en" ? "Financing can shape the right purchase strategy." : locale === "fr" ? "Le financement peut orienter la bonne stratégie d’achat." : "La financiación puede ordenar la estrategia de compra."}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-foreground/82">
                {locale === "en"
                  ? "We can review options from 25% down payment, subject to approval, buyer profile, documentation, and property type. The goal is to understand your range before moving forward."
                  : locale === "fr"
                    ? "Nous pouvons examiner des options à partir de 25% de mise de fonds, sous réserve d’approbation, du profil acheteur, des documents et du type de propriété."
                    : "Podemos revisar alternativas desde 25% de down payment, sujeto a aprobación, perfil del comprador, documentación y tipo de propiedad. La idea es entender tu rango antes de avanzar."}
              </p>
            </div>
            <div className="rounded-[12px] bg-primary p-5 text-primary-foreground ring-1 ring-primary-foreground/10">
              <div className="text-[42px] font-semibold leading-none tracking-tight">25%</div>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/70">
                {locale === "en" ? "Starting point" : locale === "fr" ? "Point de départ" : "Punto de partida"}
              </p>
              <p className="mt-3 text-[14px] leading-[1.65] text-primary-foreground/82">
                {locale === "en"
                  ? "Not a guarantee of approval. Final terms depend on financial institution review and the specific property."
                  : locale === "fr"
                    ? "Ce n’est pas une garantie d’approbation. Les conditions finales dépendent de l’analyse de l’institution financière et de la propriété."
                    : "No es una garantía de aprobación. Las condiciones finales dependen de la entidad financiera y de la propiedad específica."}
              </p>
              <Link
                href={financingHref}
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary-foreground/10 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {locale === "en" ? "View financing" : locale === "fr" ? "Voir le financement" : "Ver financiación"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionWhyPrecon
        heroImageSrc="/images/precon-hero.jpg"
        heroImageAlt={
          locale === "en"
            ? "Miami preconstruction residential project"
            : locale === "fr"
              ? "Projet résidentiel en préconstruction à Miami"
              : "Proyecto residencial de preconstrucción en Miami"
        }
      />

      <SectionListingsHome locale={locale} />

      <section aria-labelledby="lets-go-miami-title" className="max-w-[1100px] mx-auto px-4">
        <div className="grid gap-6 rounded-[14px] bg-paper p-6 sm:p-8 ring-1 ring-accent/25 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="rounded-[12px] bg-white/70 p-5 text-center ring-1 ring-accent/15 shadow-sm sm:p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/55">
              {locale === "en" ? "STAYS IN MIAMI" : locale === "fr" ? "SÉJOURS À MIAMI" : "ESTADÍAS EN MIAMI"}
            </p>
            <Link
              href={letsGoHref}
              aria-label="Let’s Go Miami"
              className="relative mx-auto mt-4 block aspect-square w-full max-w-[220px] rounded-[10px] no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src="/images/lets-go-miami/logo.png"
                alt="Let’s Go Miami by Jacna Services LLC"
                fill
                sizes="220px"
                className="object-contain"
              />
            </Link>
            <h2 id="lets-go-miami-title" className="sr-only">
              Let’s Go Miami
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              {locale === "en"
                ? "Short-term rentals and selected Miami stays."
                : locale === "fr"
                  ? "Location de courte durée et séjours sélectionnés à Miami."
                  : "Renta corta y estadías seleccionadas en Miami."}
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/50">
              Jacna Services LLC · Vacation Condo Management
            </p>
          </div>
          <div>
            <h3 className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
              <Link
                href={letsGoHref}
                className="text-primary no-underline transition-colors hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {locale === "en"
                  ? "Short stays and vacation rentals in Miami"
                  : locale === "fr"
                    ? "Séjours de courte durée à Miami"
                    : "Renta corta y estadías en Miami"}
              </Link>
            </h3>
            <p className="mt-3 text-[15px] leading-[1.75] text-foreground/82">
              {locale === "en"
                  ? "Let’s Go Miami brings together short-stay options in areas like Sunny Isles, designed for guests looking for a comfortable, private, and well-located stay."
                : locale === "fr"
                  ? "Let’s Go Miami regroupe des options de location de courte durée dans des secteurs comme Sunny Isles, pensées pour les personnes qui recherchent un séjour confortable, privé et bien situé."
                  : "Let’s Go Miami reúne opciones de renta corta en zonas como Sunny Isles, pensadas para quienes buscan una estadía cómoda, privada y bien ubicada."}
            </p>
            <p className="mt-3 text-[14px] leading-[1.65] text-foreground/70">
              {locale === "en"
                ? "Photos are used as a reference for the type of properties available. Rates, availability, and details are confirmed based on dates, season, and number of guests."
                : locale === "fr"
                  ? "Les photos servent de référence pour le type de propriétés disponibles. Les tarifs, la disponibilité et les détails sont confirmés selon les dates, la saison et le nombre de voyageurs."
                  : "Las fotos funcionan como referencia del tipo de propiedades disponibles. Tarifas, disponibilidad y detalles se confirman según fechas, temporada y cantidad de huéspedes."}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={locale === "en" ? "Amenities" : locale === "fr" ? "Commodités" : "Amenities"}>
              {letsGoAmenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full bg-surface px-3 py-1.5 text-[13px] font-medium text-primary ring-1 ring-primary/10"
                >
                  {amenity}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={letsGoWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {locale === "en" ? "Check availability" : locale === "fr" ? "Vérifier la disponibilité" : "Consultar disponibilidad"}
              </a>
              <Link
                href={letsGoHref}
                className="inline-flex h-10 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {locale === "en" ? "View stays" : locale === "fr" ? "Voir les séjours" : "Ver estadías"}
              </Link>
              <a
                href={letsGoEmailHref}
                className="inline-flex h-10 items-center justify-center px-2 text-sm font-medium text-primary/70 underline decoration-accent/50 underline-offset-4 hover:text-primary hover:decoration-accent focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {locale === "en" ? "Email us" : locale === "fr" ? "Écrire par courriel" : "Escribir por email"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-surface">
        <SectionAboutJacquieHome locale={locale} />
      </div>

      <section className="mt-6 rounded-[10px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground text-center relative overflow-hidden max-w-[1100px] mx-auto">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        <div className="mx-auto mb-3 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <h3 className="font-display text-2xl font-medium leading-[1.08] tracking-normal text-primary-foreground sm:text-3xl">
          {locale === "en" ? "Tell me what you want to do in Miami" : locale === "fr" ? "Dites-moi ce que vous souhaitez faire à Miami" : "Contame qué querés hacer en Miami"}
        </h3>
        <p className="mt-2 text-[14px] text-primary-foreground/80">
          {locale === "en"
            ? "Buying, investing, comparing financing, or evaluating a specific property: send me the context and we review the next step."
            : locale === "fr"
              ? "Acheter, investir, comparer un financement ou évaluer une propriété précise : envoyez-moi le contexte et nous voyons la prochaine étape."
              : "Comprar, invertir, comparar financiación o evaluar una propiedad puntual: mandame el contexto y vemos el próximo paso."}
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/10 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            WhatsApp
          </a>
          <Link
            href={contactHref}
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/25 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {locale === "en" ? "Contact" : locale === "fr" ? "Contact" : "Contacto"}
          </Link>
        </div>
      </section>
    </div>
  );
}
