import Image from "next/image";
import type { Metadata } from "next";
import LetsGoMiamiFooter from "@/components/LetsGoMiamiFooter";
import LetsGoMiamiGallery from "@/components/LetsGoMiamiGallery";
import styles from "@/components/LetsGoMiami.module.css";
import {
  buildLetsGoMiamiEmailHref,
  buildLetsGoMiamiWhatsAppHref,
  LETS_GO_MIAMI_COPY,
  LETS_GO_MIAMI_IMAGES,
  normalizeLetsGoMiamiLocale,
} from "@/lib/letsGoMiami";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLetsGoMiamiLocale(raw);
  const copy = LETS_GO_MIAMI_COPY[locale];

  return {
    ...createPageMetadata({
      locale,
      path: "lets-go-miami",
      title: copy.metaTitle,
      description: copy.metaDescription,
      image: LETS_GO_MIAMI_IMAGES[0]?.src,
      siteName: "Let’s Go Miami",
    }),
    manifest: null,
    icons: {
      icon: "/images/lets-go-miami/logo.png",
      shortcut: "/images/lets-go-miami/logo.png",
      apple: "/images/lets-go-miami/logo.png",
    },
  };
}

export default async function LetsGoMiamiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = normalizeLetsGoMiamiLocale(raw);
  const copy = LETS_GO_MIAMI_COPY[locale];
  const whatsappHref = buildLetsGoMiamiWhatsAppHref(locale);
  const emailHref = buildLetsGoMiamiEmailHref(locale);
  const heroImage = LETS_GO_MIAMI_IMAGES[0];
  const galleryImages = LETS_GO_MIAMI_IMAGES.map((image) => ({
    src: image.src,
    alt: image.alt[locale],
  }));

  return (
    <div
      id="lets-go-miami-main"
      tabIndex={-1}
      className={`${styles.theme} ${styles.fullBleed} overflow-hidden bg-[var(--lgm-paper)] text-[var(--lgm-ink)]`}
      data-lets-go-miami-page
    >
      <section
        className="border-b border-[var(--lgm-line)]"
        aria-labelledby="lets-go-miami-title"
        data-section="hero"
      >
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 pb-14 pt-4 sm:px-8 sm:pb-16 sm:pt-8 lg:min-h-[680px] lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-8 lg:py-16 xl:grid-cols-[0.8fr_1.2fr] xl:gap-14">
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:py-8">
            <p className="order-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lgm-water)] sm:text-xs">
              {copy.hero.eyebrow} · Sunny Isles
            </p>
            <h1
              id="lets-go-miami-title"
              className="order-2 mt-3 max-w-[13ch] text-[clamp(2.25rem,9vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[var(--lgm-ink)] lg:text-[3.25rem] xl:text-[4.6rem]"
            >
              {copy.hero.title}
            </h1>
            <p className="order-4 mt-5 max-w-[52ch] text-[15px] leading-7 text-[var(--lgm-muted)] sm:text-[17px] sm:leading-8 lg:order-3">
              {copy.hero.body}
            </p>
            <div className="order-3 mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5 lg:order-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="lets-go-hero:whatsapp"
                className="inline-flex min-h-11 items-center justify-center rounded-[3px] bg-[var(--lgm-action)] px-5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[var(--lgm-action-hover)] motion-reduce:transition-none"
              >
                {copy.hero.primaryCta}
              </a>
              <a
                href={emailHref}
                className="inline-flex min-h-11 items-center border-b border-[var(--lgm-ink)] px-0.5 text-sm font-semibold text-[var(--lgm-ink)] no-underline transition-colors hover:border-[var(--lgm-action)] hover:text-[var(--lgm-action)] motion-reduce:transition-none"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>
            <p className="order-5 mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lgm-muted)]">
              {copy.hero.stayNote}
            </p>
          </div>

          {heroImage ? (
            <figure className="order-1 lg:order-2 lg:min-h-[552px]" data-hero-image>
              <div className="relative aspect-[16/9] min-h-[190px] overflow-hidden bg-[var(--lgm-sea-glass)] sm:aspect-[16/10] lg:h-full lg:min-h-[552px] lg:aspect-auto">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt[locale]}
                  fill
                  priority
                  fetchPriority="high"
                  quality={75}
                  sizes="(min-width: 640px) and (min-resolution: 2.5dppx) 640px, (min-width: 1240px) 720px, (min-width: 1024px) 58vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
                  className="object-cover object-center"
                />
              </div>
            </figure>
          ) : null}
        </div>
      </section>

      <section
        className="bg-white py-12 sm:py-16"
        aria-labelledby="lets-go-gallery-title"
        data-section="gallery"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lgm-water)] sm:text-xs">
                {copy.gallery.eyebrow}
              </p>
              <h2
                id="lets-go-gallery-title"
                className="mt-3 max-w-[15ch] text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              >
                {copy.gallery.title}
              </h2>
            </div>
            <p className="max-w-[55ch] text-[15px] leading-7 text-[var(--lgm-muted)] sm:text-base">
              {copy.gallery.text}
            </p>
          </div>

          <LetsGoMiamiGallery images={galleryImages} labels={copy.gallery.labels} />

          <aside
            className="mt-8 grid gap-2 border-t border-[var(--lgm-line)] pt-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6"
            aria-label={copy.disclaimer.label}
            data-section="disclaimer"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lgm-water)]">
              {copy.disclaimer.label}
            </p>
            <p className="max-w-[84ch] text-[13px] leading-[1.7] text-[var(--lgm-muted)]">
              {copy.disclaimer.text}
            </p>
          </aside>
        </div>
      </section>

      <section
        className="bg-[var(--lgm-sand)] py-12 sm:py-16"
        aria-labelledby="lets-go-practical-title"
        data-section="practical"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lgm-water)] sm:text-xs">
                {copy.practical.eyebrow}
              </p>
              <h2
                id="lets-go-practical-title"
                className="mt-3 max-w-[12ch] text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              >
                {copy.practical.title}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {copy.practical.amenitiesTitle}
                </h3>
                <p className="mt-2 max-w-[44ch] text-sm leading-6 text-[var(--lgm-muted)]">
                  {copy.practical.amenitiesIntro}
                </p>
                <ul className="mt-4 divide-y divide-[var(--lgm-line)] border-y border-[var(--lgm-line)]">
                  {copy.practical.amenities.map((amenity, index) => (
                    <li
                      key={amenity}
                      className="flex min-h-12 items-center justify-between gap-6 py-2.5"
                    >
                      <span className="text-[11px] font-semibold tabular-nums text-[var(--lgm-water)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-right text-[15px] font-medium">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-end justify-between gap-6 border-y border-[var(--lgm-line)] py-4 md:block md:border-y-0 md:py-0">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {copy.practical.stayTitle}
                </h3>
                <dl className="md:mt-4 md:border-y md:border-[var(--lgm-line)]">
                  <div className="grid gap-0.5 md:py-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--lgm-water)]">
                      {copy.practical.stayLabel}
                    </dt>
                    <dd className="text-2xl font-medium tracking-[-0.03em]">
                      {copy.practical.stayValue}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <section
            className="mt-10 grid gap-8 border-t border-[var(--lgm-line)] pt-10 sm:mt-12 sm:pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"
            aria-labelledby="lets-go-inquiry-title"
            data-section="inquiry"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lgm-water)] sm:text-xs">
                {copy.inquiry.eyebrow}
              </p>
              <h2
                id="lets-go-inquiry-title"
                className="mt-3 max-w-[13ch] text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              >
                {copy.inquiry.title}
              </h2>
              <p className="mt-4 max-w-[42ch] text-sm leading-6 text-[var(--lgm-muted)] sm:text-[15px] sm:leading-7">
                {copy.inquiry.body}
              </p>
            </div>

            <ol className="divide-y divide-[var(--lgm-line)] border-y border-[var(--lgm-line)]">
              {copy.inquiry.items.map((item, index) => (
                <li
                  key={item.label}
                  className="grid grid-cols-[1.5rem_5.5rem_minmax(0,1fr)] items-baseline gap-3 py-3 sm:grid-cols-[0.2fr_0.55fr_1.25fr] sm:gap-5"
                >
                  <span className="text-[11px] font-semibold tabular-nums text-[var(--lgm-water)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-semibold sm:text-sm">{item.label}</span>
                  <span className="text-[13px] leading-5 text-[var(--lgm-muted)] sm:text-sm sm:leading-6">
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      <section
        className="border-b border-white/14 bg-[var(--lgm-ink)] py-16 text-white sm:py-20"
        aria-labelledby="lets-go-closing-title"
        data-section="closing"
      >
        <div className="mx-auto grid max-w-[1240px] gap-8 px-4 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
              {copy.closing.eyebrow}
            </p>
            <h2
              id="lets-go-closing-title"
              className="mt-3 max-w-[13ch] text-[clamp(2.25rem,6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
            >
              {copy.closing.title}
            </h2>
            <p className="mt-5 max-w-[55ch] text-[15px] leading-7 text-white/68 sm:text-base">
              {copy.closing.body}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="lets-go-closing:whatsapp"
              className="inline-flex min-h-11 items-center justify-center rounded-[3px] bg-white px-5 text-sm font-semibold text-[var(--lgm-action)] no-underline transition-colors hover:bg-[var(--lgm-sand)] motion-reduce:transition-none"
            >
              {copy.closing.primaryCta}
            </a>
            <a
              href={emailHref}
              className="inline-flex min-h-11 items-center border-b border-white/60 px-0.5 text-sm font-semibold text-white no-underline transition-colors hover:border-white motion-reduce:transition-none"
            >
              {copy.closing.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <LetsGoMiamiFooter locale={locale} />
    </div>
  );
}
