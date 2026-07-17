import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LISTINGS } from "@/data/listings";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";
import { HOME_CONTENT, type HomeLocale } from "./home-content";

const FULL_BLEED = "relative left-1/2 w-[100dvw] -translate-x-1/2";
const CONTAINER = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const EYEBROW = "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-xs";
const EYEBROW_LIGHT = "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/65 sm:text-xs";
const H2 = "font-display text-[clamp(2.25rem,4.6vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-primary";
const BODY = "text-[16px] leading-[1.75] text-foreground/78 sm:text-[17px]";
const PRIMARY_CTA =
  "inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground no-underline transition hover:-translate-y-0.5 hover:bg-primary/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none";
const SECONDARY_CTA =
  "inline-flex min-h-11 items-center justify-center rounded-[6px] border border-primary px-6 py-3 text-sm font-semibold text-primary no-underline transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none";
const CREDIBILITY_ICON_IDS = ["finance", "companies", "miami", "affiliation"] as const;
const CREDIBILITY_STYLES =
  ".home-cred-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.home-cred-item{display:flex;min-height:96px;align-items:center;gap:.75rem;padding:1rem .75rem;border-color:#3b274a26;color:#3b274ad1;font-size:14px;font-weight:500;line-height:1.45}.home-cred-item:nth-child(even){border-left:1px solid #3b274a26}.home-cred-item:nth-child(n+3){border-top:1px solid #3b274a26}.home-cred-item svg{width:17px;height:17px;flex:none}.home-cred-item span{max-width:24ch}@media(min-width:640px){.home-cred-item{min-height:100px;padding-right:1.25rem;padding-left:1.25rem}}@media(min-width:1024px){.home-cred-list{grid-template-columns:repeat(4,minmax(0,1fr))}.home-cred-item{min-height:108px;padding:1.25rem 1.75rem;border-left:1px solid #3b274a26}.home-cred-item:nth-child(n+3){border-top-width:0}.home-cred-item:first-child{border-left-width:0}}";

function HeroBackgroundImage() {
  const common = {
    alt: "",
    fill: true,
    sizes: "100vw",
    quality: 75,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const { props: desktopImage } = getImageProps({
    ...common,
    src: "/images/hero-fallback.jpg",
  });
  const { props: mobileImage } = getImageProps({
    ...common,
    src: "/images/hero-fallback-mobile.jpg",
  });

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={mobileImage.src}
        imageSrcSet={mobileImage.srcSet}
        imageSizes="100vw"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={desktopImage.src}
        imageSrcSet={desktopImage.srcSet}
        imageSizes="100vw"
        media="(min-width: 640px)"
        fetchPriority="high"
      />
      <picture>
        <source media="(max-width: 639px)" srcSet={mobileImage.srcSet} sizes="100vw" />
        <source media="(min-width: 640px)" srcSet={desktopImage.srcSet} sizes="100vw" />
        <img {...desktopImage} alt="" className="h-full w-full object-cover object-center" />
      </picture>
    </>
  );
}

const HOME_META: Record<HomeLocale, { title: string; description: string }> = {
  es: {
    title: "Jacquie Zárate | Inversión inmobiliaria en Miami",
    description:
      "Asesoría personalizada para comprar o invertir en propiedades y proyectos de preconstrucción en Miami, con opciones de financiación sujetas a evaluación.",
  },
  en: {
    title: "Jacquie Zárate | Miami Real Estate & Investment",
    description:
      "Personal guidance for buying or investing in Miami properties and pre-construction projects, with financing options subject to review.",
  },
  fr: {
    title: "Jacquie Zárate | Immobilier et investissement à Miami",
    description:
      "Accompagnement personnalisé pour acheter ou investir dans des propriétés et des projets en préconstruction à Miami, avec des options de financement sous réserve d’évaluation.",
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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: HomeLocale = rawLocale === "en" ? "en" : rawLocale === "fr" ? "fr" : "es";
  const content = HOME_CONTENT[locale];

  const whatsappMessage =
    locale === "en"
      ? "Hi Jacquie, I’d like to talk with you about a real estate opportunity in Miami."
      : locale === "fr"
        ? "Bonjour Jacquie, j’aimerais vous parler d’un projet immobilier à Miami."
        : "Hola Jacquie, quiero hablar contigo sobre una oportunidad inmobiliaria en Miami.";
  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(whatsappMessage)}`;
  const contactHref = `/${locale}/contacto`;
  const projectsHref = `/${locale}/proyectos`;
  const listingsHref = `/${locale}/listings`;
  const financingHref = `/${locale}/financiacion`;
  const aboutHref = `/${locale}/sobre-mi`;
  const letsGoHref = `/${locale}/lets-go-miami`;
  const listingImage = LISTINGS[0].images[0];

  return (
    <div className="-mb-24 pb-0">
      <section
        aria-labelledby="home-hero-title"
        aria-describedby="home-hero-intro"
        className={`${FULL_BLEED} isolate overflow-hidden bg-background`}
      >
        <div aria-hidden className="absolute inset-0 z-0">
          <HeroBackgroundImage />
        </div>
        <div aria-hidden className="absolute inset-0 z-10 bg-paper/72 lg:bg-gradient-to-r lg:from-paper lg:via-paper/88 lg:to-paper/20" />

        <div className={`${CONTAINER} relative z-20 grid items-center gap-8 py-10 sm:py-14 lg:min-h-[700px] lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-16 lg:py-20`}>
          <div className="max-w-[720px]">
            <p className={EYEBROW}>{content.hero.eyebrow}</p>
            <h1
              id="home-hero-title"
              className="mt-5 max-w-[15ch] font-display text-[clamp(2.8rem,6.2vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-primary sm:leading-none"
            >
              {content.hero.title}
            </h1>
            <p id="home-hero-intro" className="mt-6 max-w-[62ch] text-[17px] leading-[1.72] text-foreground/82 sm:text-[19px]">
              {content.hero.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className={PRIMARY_CTA}>
                {content.hero.primaryCta}
              </a>
              <a href="#formas-de-comprar" className={SECONDARY_CTA}>
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>

          <figure className="relative ml-auto w-full max-w-[220px] justify-self-end sm:max-w-[320px] lg:max-w-[410px]">
            <span aria-hidden className="absolute -left-5 top-10 h-[55%] w-px bg-accent lg:-left-8" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-surface">
              <Image
                src="/images/jacquie-zarate.jpg"
                alt={content.hero.portraitAlt}
                fill
                sizes="(min-width: 1024px) 410px, (min-width: 640px) 320px, 220px"
                quality={85}
                loading="lazy"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/72">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {content.hero.portraitCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        aria-label={content.credibility.label}
        className={`${FULL_BLEED} border-y border-primary/15 bg-paper`}
        data-home-credibility
      >
        <style href="home-credibility" precedence="low">
          {CREDIBILITY_STYLES}
        </style>
        <div className={CONTAINER}>
          <ul className="home-cred-list">
            {content.credibility.items.map((item, index) => (
              <li key={item} className="home-cred-item">
                <svg aria-hidden viewBox="0 0 24 24">
                  <use href={`/icons/home-credibility.svg#${CREDIBILITY_ICON_IDS[index]}`} />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="decision-title" className={`${FULL_BLEED} relative bg-paper pt-14 pb-0 sm:pt-16 lg:pt-20`}>
        <div className={`${CONTAINER} relative`}>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className={EYEBROW}>{content.decision.eyebrow}</p>
              <h2 id="decision-title" className={`${H2} mt-4 max-w-[14ch]`}>
                {content.decision.title}
              </h2>
            </div>
            <div className="lg:pt-6">
              <p className={`${BODY} max-w-[60ch]`}>{content.decision.intro}</p>
              <p className="mt-7 max-w-[33ch] font-display text-[clamp(1.55rem,2.3vw,2rem)] leading-[1.15] text-primary/88">
                {content.decision.close}
              </p>
            </div>
          </div>

          <div className="mt-10 grid border-y border-primary/15 md:grid-cols-3 md:divide-x md:divide-primary/15 lg:mt-14">
            {content.decision.items.map((item, index) => (
              <article key={item.label} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b border-primary/15 py-6 last:border-b-0 md:block md:border-b-0 md:px-7 lg:py-8 first:pl-0 last:pr-0">
                <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
                  <span className="text-xs font-semibold tracking-[0.18em] text-primary/75">0{index + 1}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/75">{item.label}</span>
                </div>
                <p className="max-w-[24ch] font-display text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.12] text-primary md:mt-5 lg:mt-8">
                  {item.question}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="formas-de-comprar" aria-labelledby="buying-title" className={`${FULL_BLEED} bg-background pt-14 pb-16 sm:py-20 lg:pt-20 lg:pb-24`}>
        <div className={CONTAINER}>
          <div className="grid gap-5 md:grid-cols-2 md:items-start md:gap-x-12 md:gap-y-0">
            <div>
              <p className={EYEBROW}>{content.buying.eyebrow}</p>
              <h2 id="buying-title" className={`${H2} mt-4 max-w-[14.25ch]`}>
                {content.buying.title}
              </h2>
            </div>
            <p className={`${BODY} max-w-[40ch] md:mt-8`}>{content.buying.intro}</p>
          </div>

          <div className="mt-8 grid gap-12 md:mt-10 md:grid-cols-2 md:items-stretch lg:mt-12 lg:gap-x-12">
            <article className="flex h-full flex-col">
              <div className="relative aspect-[2/1] overflow-hidden rounded-[4px] bg-paper sm:aspect-[16/10]">
                <Image
                  src="/images/precon-hero.jpg"
                  alt={content.buying.preconstruction.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 566px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <p className={`${EYEBROW} mt-5 lg:mt-7`}>{content.buying.preconstruction.eyebrow}</p>
              <h3 className="mt-3 max-w-[17ch] font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.02em] text-primary">
                {content.buying.preconstruction.title}
              </h3>
              <p className={`${BODY} mt-4 max-w-[58ch] flex-1`}>{content.buying.preconstruction.text}</p>
              <Link href={projectsHref} className="mt-6 inline-flex items-center gap-3 border-b border-primary/30 pb-1 text-sm font-semibold text-primary no-underline transition hover:border-accent hover:text-primary/80">
                {content.buying.preconstruction.cta}
                <span aria-hidden>↗</span>
              </Link>
            </article>

            <article className="flex h-full flex-col">
              <div className="relative aspect-[2/1] overflow-hidden rounded-[4px] bg-paper sm:aspect-[16/10]">
                <Image
                  src={listingImage}
                  alt={content.buying.properties.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 566px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <p className={`${EYEBROW} mt-5 lg:mt-7`}>{content.buying.properties.eyebrow}</p>
              <h3 className="mt-3 max-w-[17ch] font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.02em] text-primary">
                {content.buying.properties.title}
              </h3>
              <p className={`${BODY} mt-4 max-w-[58ch] flex-1`}>{content.buying.properties.text}</p>
              <Link href={listingsHref} className="mt-6 inline-flex items-center gap-3 border-b border-primary/30 pb-1 text-sm font-semibold text-primary no-underline transition hover:border-accent hover:text-primary/80">
                {content.buying.properties.cta}
                <span aria-hidden>↗</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="financing-home-title" className={`${FULL_BLEED} bg-primary py-14 text-primary-foreground sm:py-20 lg:py-24`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-16`}>
          <div>
            <p className={EYEBROW_LIGHT}>{content.financing.eyebrow}</p>
            <h2 id="financing-home-title" className="mt-4 max-w-[16ch] font-display text-[clamp(2.15rem,4.8vw,3.9rem)] font-medium leading-[0.98] tracking-[-0.025em]">
              {content.financing.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.68] text-primary-foreground/78 sm:mt-6 sm:text-[17px]">
              {content.financing.text}
            </p>
            <Link href={financingHref} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[6px] bg-paper px-6 py-3 text-sm font-semibold text-primary no-underline transition hover:-translate-y-0.5 hover:bg-paper/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-foreground motion-reduce:transform-none motion-reduce:transition-none sm:mt-8">
              {content.financing.cta}
            </Link>
          </div>

          <div className="border-y border-primary-foreground/18 py-6 lg:border-y-0 lg:border-l lg:py-2 lg:pl-12">
            <p className="font-display text-[clamp(3.1rem,7vw,5.75rem)] leading-[0.82] tracking-[-0.05em] text-primary-foreground">25%</p>
            <p className="mt-3 max-w-[26ch] text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground/68 sm:text-xs">
              {content.financing.reference}
            </p>
            <p className="mt-5 max-w-[44ch] border-t border-primary-foreground/14 pt-5 text-[12px] leading-[1.6] text-primary-foreground/62 sm:text-[13px]">{content.financing.note}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="method-title" className={`${FULL_BLEED} bg-paper py-10 sm:py-20 lg:py-24`}>
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{content.method.eyebrow}</p>
              <h2 id="method-title" className={`${H2} mt-4 max-w-[13ch]`}>
                {content.method.title}
              </h2>
              <p className={`${BODY} mt-4 max-w-[45ch] sm:mt-6`}>{content.method.intro}</p>
              <Link href={aboutHref} className="mt-7 inline-flex items-center gap-3 border-b border-primary/30 pb-1 text-sm font-semibold text-primary no-underline transition hover:border-accent">
                {content.method.cta}
                <span aria-hidden>↗</span>
              </Link>
            </div>

            <ol className="border-t border-primary/15">
              {content.method.items.map((item, index) => (
                <li key={item.title} className="grid gap-3 border-b border-primary/15 py-4 sm:grid-cols-[64px_0.8fr_1.2fr] sm:items-start sm:gap-6 lg:py-7">
                  <span className="text-xs font-semibold tracking-[0.18em] text-primary/75">0{index + 1}</span>
                  <h3 className="font-display text-[1.55rem] leading-[1.1] text-primary">{item.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-foreground/72">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>

      <section aria-labelledby="lets-go-title" className={`${FULL_BLEED} bg-background pt-10 pb-12 sm:pt-20 sm:pb-12`}>
        <div className={CONTAINER}>
          <div className="grid items-center gap-6 md:grid-cols-[180px_1fr_auto] md:gap-10">
            <Link href={letsGoHref} className="relative block aspect-square w-[72px] no-underline sm:w-[160px]" aria-label={content.stays.title}>
              <Image src="/images/lets-go-miami/logo.png" alt={content.stays.logoAlt} fill sizes="160px" className="object-contain" />
            </Link>
            <div>
              <p className={EYEBROW}>{content.stays.eyebrow}</p>
              <h2 id="lets-go-title" className="mt-2 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-primary">{content.stays.title}</h2>
              <p className={`${BODY} mt-4 max-w-[58ch]`}>{content.stays.text}</p>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/75">{content.stays.signature}</p>
            </div>
            <Link href={letsGoHref} className={`${SECONDARY_CTA} md:justify-self-end`}>
              {content.stays.cta}
            </Link>
          </div>

          <div className="mt-10 grid gap-7 border-t border-primary/15 pt-10 sm:mt-12 sm:pt-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW}>{content.close.eyebrow}</p>
              <h2 className={`${H2} mt-4 max-w-[15ch]`}>{content.close.title}</h2>
              <p className={`${BODY} mt-5 max-w-[62ch]`}>{content.close.text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className={PRIMARY_CTA}>
                {content.close.primaryCta}
              </a>
              <Link href={contactHref} className={SECONDARY_CTA}>
                {content.close.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
