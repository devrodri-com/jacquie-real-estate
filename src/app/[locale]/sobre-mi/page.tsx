import Image from "next/image";
import Link from "next/link";
import { ABOUT_CONTENT } from "./content";
import type { HomeLocale } from "../home-content";

const FULL_BLEED = "relative left-1/2 w-[100dvw] -translate-x-1/2";
const CONTAINER = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const EYEBROW = "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-xs";
const EYEBROW_LIGHT = "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/65 sm:text-xs";
const H2 = "font-display text-[clamp(2rem,4.7vw,3.7rem)] font-medium leading-[0.98] tracking-[-0.025em] text-primary";
const PRIMARY_CTA =
  "inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground no-underline transition hover:-translate-y-0.5 hover:bg-primary/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none";
const SECONDARY_CTA =
  "inline-flex min-h-11 items-center justify-center rounded-[6px] border border-primary px-6 py-3 text-sm font-semibold text-primary no-underline transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none";

export default async function SobreMi({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: HomeLocale = rawLocale === "en" ? "en" : rawLocale === "fr" ? "fr" : "es";
  const content = ABOUT_CONTENT[locale];
  const contactHref = `/${locale}/contacto`;
  const financingHref = `/${locale}/financiacion`;
  const whatsappMessage =
    locale === "en"
      ? "Hi Jacquie, I’d like to talk with you about my next step in Miami."
      : locale === "fr"
        ? "Bonjour Jacquie, j’aimerais vous parler de ma prochaine étape à Miami."
        : "Hola Jacquie, quiero hablar contigo sobre mi próximo paso en Miami.";
  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pb-0">
      <section aria-labelledby="about-hero-title" className={`${FULL_BLEED} overflow-hidden bg-paper py-10 sm:py-16 lg:py-24`}>
        <div className={`${CONTAINER} grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20`}>
          <div className="lg:order-2">
            <p className={EYEBROW}>{content.hero.eyebrow}</p>
            <h1
              id="about-hero-title"
              className="mt-5 max-w-[14ch] font-display text-[clamp(2.8rem,6vw,4.9rem)] font-medium leading-[0.94] tracking-[-0.035em] text-primary"
            >
              {content.hero.title}
            </h1>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.62] text-foreground/80 sm:mt-7 sm:text-[19px]">{content.hero.intro}</p>
            <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
              <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className={PRIMARY_CTA}>
                {content.hero.primaryCta}
              </a>
              <a href="#metodo" className="inline-flex min-h-11 items-center justify-center gap-2 px-2 py-3 text-sm font-semibold text-primary underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none sm:justify-start">
                {content.hero.secondaryCta}
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <figure className="relative w-full max-w-[220px] sm:max-w-[420px] lg:order-1 lg:max-w-[520px]">
            <div aria-hidden className="absolute -right-5 -top-5 h-36 w-36 border-r border-t border-accent/70 sm:-right-8 sm:-top-8" />
            <div className="relative aspect-square overflow-hidden rounded-[3px] bg-primary lg:aspect-[4/5]">
              <Image
                src="/images/jacquie-zarate1.jpg"
                alt={content.hero.portraitAlt}
                fill
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 220px"
                quality={85}
                loading="eager"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/62">
              <span aria-hidden className="h-px w-10 bg-accent" />
              {content.hero.imageCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="journey-title" className={`${FULL_BLEED} bg-background py-10 sm:py-20 lg:py-28`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20`}>
          <div>
            <p className={EYEBROW}>{content.journey.eyebrow}</p>
            <h2 id="journey-title" className={`${H2} mt-4 max-w-[13ch]`}>{content.journey.title}</h2>
          </div>

          <ol className="border-t border-primary/15">
            {content.journey.items.map((item, index) => (
              <li key={item.place} className="grid gap-2 border-b border-primary/15 py-4 sm:grid-cols-[72px_1fr] sm:gap-x-7 lg:py-8">
                <span className="row-span-3 text-xs font-semibold tracking-[0.18em] text-accent">0{index + 1}</span>
                <p className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/58 sm:block">{item.place}</p>
                <h3 className="font-display text-[clamp(1.35rem,2.8vw,2.25rem)] leading-[1.05] text-primary">{item.title}</h3>
                <p className="max-w-[58ch] text-[14px] leading-[1.58] text-foreground/72 sm:text-[16px]">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="financial-lens-title" className={`${FULL_BLEED} bg-primary py-10 text-primary-foreground sm:py-20 lg:py-28`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20`}>
          <div>
            <p className={EYEBROW_LIGHT}>{content.lens.eyebrow}</p>
            <h2 id="financial-lens-title" className="mt-4 max-w-[14ch] font-display text-[clamp(2.35rem,4.8vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.025em]">
              {content.lens.title}
            </h2>
            <p className="mt-3 max-w-[48ch] text-[14px] leading-[1.58] text-primary-foreground/72 sm:mt-6 sm:text-[16px]">{content.lens.intro}</p>
            <Link href={financingHref} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[6px] border border-primary-foreground px-6 py-3 text-sm font-semibold text-primary-foreground no-underline transition hover:bg-primary-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-foreground motion-reduce:transition-none sm:mt-8">
              {content.lens.cta}
            </Link>
          </div>

          <ol className="border-t border-primary-foreground/20">
            {content.lens.items.map((item, index) => (
              <li key={item.question} className="border-b border-primary-foreground/20 py-4 lg:py-8">
                <div className="grid gap-5 sm:grid-cols-[54px_1fr]">
                  <span className="text-xs font-semibold tracking-[0.18em] text-accent">0{index + 1}</span>
                  <div>
                    <h3 className="max-w-[25ch] font-display text-[clamp(1.35rem,3.4vw,2.7rem)] leading-[1.04] tracking-[-0.015em]">{item.question}</h3>
                    <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.55] text-primary-foreground/68 sm:mt-4 sm:text-[15px]">{item.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="metodo" aria-labelledby="about-method-title" className={`${FULL_BLEED} bg-paper py-10 sm:py-20 lg:py-28`}>
        <div className={CONTAINER}>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{content.method.eyebrow}</p>
              <h2 id="about-method-title" className={`${H2} mt-4 max-w-[14ch]`}>{content.method.title}</h2>
            </div>
            <p className="max-w-[62ch] text-[14px] leading-[1.6] text-foreground/74 sm:text-[17px] sm:leading-[1.75] lg:pt-7">{content.method.intro}</p>
          </div>

          <ol className="mt-9 grid border-t border-primary/15 md:grid-cols-3 md:divide-x md:divide-primary/15 lg:mt-20">
            {content.method.items.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 border-b border-primary/15 py-4 md:block md:border-b-0 md:px-8 lg:py-8 first:pl-0 last:pr-0">
                <span className="row-span-2 text-xs font-semibold tracking-[0.18em] text-accent md:row-auto">0{index + 1}</span>
                <h3 className="max-w-[15ch] font-display text-[clamp(1.35rem,2.6vw,2.15rem)] leading-[1.05] text-primary md:mt-4 lg:mt-8">{item.title}</h3>
                <p className="col-start-2 mt-2 text-[14px] leading-[1.52] text-foreground/72 sm:text-[15px] md:col-auto md:mt-3">{item.text}</p>
              </li>
            ))}
          </ol>

          <aside className="mt-8 grid gap-3 border-t border-primary/15 pt-5 sm:mt-12 sm:grid-cols-[190px_1fr] sm:items-start sm:gap-8 sm:pt-7" aria-label={content.method.ownerNoteLabel}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/58">{content.method.ownerNoteLabel}</p>
            <p className="max-w-[62ch] font-display text-[clamp(1.1rem,2.4vw,1.8rem)] leading-[1.2] text-primary/88">{content.method.ownerNote}</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="about-close-title" className={`${FULL_BLEED} bg-background py-10 sm:py-20 lg:py-24`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20`}>
          <div>
            <p className={EYEBROW}>{content.close.eyebrow}</p>
            <h2 id="about-close-title" className={`${H2} mt-4 max-w-[15ch]`}>{content.close.title}</h2>
            <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.6] text-foreground/74 sm:mt-6 sm:text-[17px] sm:leading-[1.75]">{content.close.text}</p>
          </div>

          <div className="border-t border-primary/15 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/55">{content.close.credentialLabel}</p>
            <p className="mt-2 font-display text-2xl text-primary">{content.close.credential}</p>
            <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:gap-3">
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
