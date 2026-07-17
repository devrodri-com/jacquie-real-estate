import Image from "next/image";
import Link from "next/link";
import { ABOUT_CONTENT } from "./content";
import type { AboutLocale } from "./content";

const FULL_BLEED = "relative left-1/2 w-[100dvw] -translate-x-1/2";
const PROFILE_CONTAINER = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.19em] text-primary/70 sm:text-xs";
const EYEBROW_LIGHT =
  "text-[11px] font-semibold uppercase tracking-[0.19em] text-primary-foreground/65 sm:text-xs";
const H2 =
  "font-display text-[clamp(2.25rem,4.6vw,3.65rem)] font-medium leading-[1.02] tracking-[-0.025em] text-primary";
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
  const locale: AboutLocale =
    rawLocale === "en" ? "en" : rawLocale === "fr" ? "fr" : "es";
  const content = ABOUT_CONTENT[locale];
  const contactHref = "/" + locale + "/contacto";
  const whatsappMessage =
    locale === "en"
      ? "Hi Jacquie, I’d like to talk with you about my next step in Miami."
      : locale === "fr"
        ? "Bonjour Jacquie, j’aimerais vous parler de ma prochaine étape à Miami."
        : "Hola Jacquie, quiero hablar contigo sobre mi próximo paso en Miami.";
  const whatsAppHref =
    "https://wa.me/17864072591?text=" + encodeURIComponent(whatsappMessage);

  return (
    <div className="pb-0">
      <section
        aria-labelledby="about-hero-title"
        className={
          FULL_BLEED +
          " overflow-hidden bg-paper pt-8 pb-10 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-16"
        }
      >
        <div
          className={
            PROFILE_CONTAINER +
            " grid items-start gap-5 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 xl:gap-20"
          }
        >
          <div className="order-2 lg:pt-6 xl:pt-8">
            <p className={EYEBROW}>{content.hero.eyebrow}</p>
            <h1
              id="about-hero-title"
              className="mt-4 max-w-[18ch] font-display text-[clamp(2.55rem,5.2vw,4.7rem)] font-medium leading-[0.99] tracking-[-0.035em] text-primary"
            >
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-[55ch] text-[16px] leading-[1.65] text-foreground/80 sm:mt-7 sm:text-[19px]">
              {content.hero.intro}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className={PRIMARY_CTA}
              >
                {content.hero.primaryCta}
              </a>
              <a
                href="#recorrido"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-2 py-3 text-sm font-semibold text-primary underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none sm:justify-start"
              >
                {content.hero.secondaryCta}
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <figure className="relative order-1 w-full max-w-[240px] sm:max-w-[380px] lg:max-w-[430px]">
            <div
              aria-hidden
              className="absolute -right-5 -top-5 h-32 w-32 border-r border-t border-accent/70 sm:-right-8 sm:-top-8 sm:h-36 sm:w-36"
            />
            <div className="relative aspect-square overflow-hidden rounded-[3px] bg-primary sm:aspect-[4/5]">
              <Image
                src="/images/jacquie-zarate1.jpg"
                alt={content.hero.portraitAlt}
                fill
                sizes="(min-width: 1024px) 430px, (min-width: 640px) 380px, 240px"
                quality={85}
                loading="eager"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/75 sm:text-[11px]">
              <span aria-hidden className="h-px w-8 bg-accent sm:w-10" />
              {content.hero.imageCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="recorrido"
        aria-labelledby="journey-title"
        className={FULL_BLEED + " bg-paper"}
      >
        <div
          className={
            PROFILE_CONTAINER +
            " border-t border-primary/15 py-10 sm:py-16 lg:py-20"
          }
        >
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{content.journey.eyebrow}</p>
              <h2
                id="journey-title"
                className={H2 + " mt-4 max-w-[12ch]"}
              >
                {content.journey.title}
              </h2>
            </div>

            <div>
              <div className="max-w-[650px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                  {content.journey.originLabel}
                </p>
                <p className="mt-3 font-display text-[clamp(1.45rem,2.8vw,2.25rem)] leading-[1.12] tracking-[-0.015em] text-primary">
                  {content.journey.originText}
                </p>
              </div>

              <div className="mt-6 grid gap-6 border-t border-primary/15 pt-6 sm:grid-cols-[1.08fr_0.92fr] sm:gap-10 lg:mt-10 lg:gap-14">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                    {content.journey.financeLabel}
                  </p>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.7] text-foreground/76 sm:text-[17px]">
                    {content.journey.financeText}
                  </p>
                </div>
                <div className="sm:border-l sm:border-primary/15 sm:pl-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                    {content.journey.miamiLabel}
                  </p>
                  <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.7] text-foreground/76 sm:text-[17px]">
                    {content.journey.miamiText}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-[34ch] border-l-2 border-accent pl-5 font-display text-[clamp(1.25rem,2.4vw,1.9rem)] leading-[1.18] text-primary/88 lg:mt-10">
                {content.journey.bridge}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financial-lens-title"
        className={
          FULL_BLEED +
          " bg-primary py-10 text-primary-foreground sm:py-16 lg:py-20"
        }
      >
        <div className={PROFILE_CONTAINER}>
          <div className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <p className={EYEBROW_LIGHT}>{content.lens.eyebrow}</p>
              <h2
                id="financial-lens-title"
                className="mt-4 max-w-[11ch] font-display text-[clamp(2.05rem,4.2vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em]"
              >
                {content.lens.title}
              </h2>
            </div>

            <blockquote className="max-w-[27ch] font-display text-[clamp(1.75rem,3.8vw,3.2rem)] leading-[1.07] tracking-[-0.022em] text-primary-foreground">
              “{content.lens.quote}”
            </blockquote>
          </div>

          <div className="mt-7 border-t border-primary-foreground/20 pt-5 sm:mt-10 sm:pt-7">
            <p className="max-w-[62ch] text-[15px] leading-[1.7] text-primary-foreground/72 sm:ml-auto sm:text-[17px]">
              {content.lens.body}
            </p>
          </div>
        </div>
      </section>

      <section
        id="metodo"
        aria-labelledby="about-method-title"
        className={FULL_BLEED + " bg-paper py-10 sm:py-16 lg:py-20"}
      >
        <div className={PROFILE_CONTAINER}>
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{content.relationship.eyebrow}</p>
              <h2
                id="about-method-title"
                className={H2 + " mt-4 max-w-[12ch]"}
              >
                {content.relationship.title}
              </h2>
            </div>

            <div className="lg:pt-7">
              <p className="max-w-[29ch] border-l-2 border-accent pl-5 font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.12] tracking-[-0.015em] text-primary">
                {content.relationship.intro}
              </p>
              <p className="mt-6 max-w-[58ch] text-[15px] leading-[1.72] text-foreground/76 sm:text-[17px]">
                {content.relationship.body}
              </p>
            </div>
          </div>

          <aside
            className="mt-8 grid gap-3 border-t border-primary/15 pt-5 sm:mt-12 sm:grid-cols-[180px_1fr] sm:items-start sm:gap-8 sm:pt-6 lg:ml-[32%]"
            aria-label={content.relationship.ownerNoteLabel}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">
              {content.relationship.ownerNoteLabel}
            </p>
            <p className="max-w-[58ch] text-[14px] leading-[1.65] text-foreground/70 sm:text-[15px]">
              {content.relationship.ownerNote}
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="about-close-title"
        className={FULL_BLEED + " bg-paper pb-10 sm:pb-16 lg:pb-20"}
      >
        <div className={PROFILE_CONTAINER}>
          <div className="border-t border-primary/15 pt-10 sm:pt-14">
            <div className="max-w-[940px] lg:ml-[18%]">
              <p className={EYEBROW}>{content.close.eyebrow}</p>
              <h2
                id="about-close-title"
                className={H2 + " mt-4 max-w-[15ch]"}
              >
                {content.close.title}
              </h2>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-foreground/76 sm:mt-5 sm:text-[17px]">
                {content.close.text}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_CTA + " w-full sm:w-auto"}
                >
                  {content.close.primaryCta}
                </a>
                <Link
                  href={contactHref}
                  className={SECONDARY_CTA + " w-full sm:w-auto"}
                >
                  {content.close.secondaryCta}
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-primary/15 pt-4 text-[12px] leading-[1.5] text-foreground/68">
                <span className="font-semibold text-primary">
                  {content.close.role}
                </span>
                <span
                  aria-hidden
                  className="h-px w-6 bg-accent"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/75">
                  {content.close.credentialLabel}
                </span>
                <span className="font-display text-base text-primary/85">
                  {content.close.credential}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
