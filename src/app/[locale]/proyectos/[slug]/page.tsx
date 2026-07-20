import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import { ALL_PROJECTS } from "@/data/projects/index";
import { getProjectFrOverlay } from "@/data/projectsFrOverlay";
import type { Project } from "@/data/types";
import {
  createPageMetadata,
  localizedUrl,
  normalizeLocale,
  type SiteLocale,
} from "@/lib/seo";
import { buildJacquieWhatsAppHref } from "@/lib/whatsapp";
import { PROJECT_DETAIL_COPY } from "./content";
import ProjectFaq from "./ProjectFaq";
import ProjectGallery from "./ProjectGallery";
import {
  safePresentationFaqs,
  safePresentationLines,
  safePresentationPaymentLines,
} from "./presentation";

type Params = { params: Promise<{ locale: string; slug: string }> };
type LabelLine = string | { label: string; iconKey?: string };
type TemplateValues = Record<string, string | number>;

const FULL_BLEED = "relative left-1/2 w-[100dvw] -translate-x-1/2";
const CONTAINER = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const CONTENT_CONTAINER = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const EYEBROW =
  "text-[10px] font-semibold uppercase tracking-[0.19em] text-primary/70 sm:text-[11px]";
const EYEBROW_LIGHT =
  "text-[10px] font-semibold uppercase tracking-[0.19em] text-primary-foreground/64 sm:text-[11px]";
const SECTION_TITLE =
  "font-display text-[clamp(2.25rem,4.8vw,3.8rem)] font-medium leading-[1.01] tracking-[-0.025em] text-primary";
const PRIMARY_CTA =
  "inline-flex min-h-11 w-full items-center justify-center border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90 motion-reduce:transition-none sm:w-auto";
const SECONDARY_CTA =
  "inline-flex min-h-11 w-full items-center justify-center border border-primary px-6 py-3 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/5 motion-reduce:transition-none sm:w-auto";

function fillTemplate(template: string, values: TemplateValues): string {
  return Object.entries(values).reduce(
    (result, [key, value]) =>
      result.replaceAll(`{${key}}`, String(value)),
    template
  );
}

function pickBySlug(slug: string): Project | null {
  const normalizedSlug = `/proyectos/${slug}`;
  return ALL_PROJECTS.find((project) => project.slug === normalizedSlug) ?? null;
}

function fmtUSD(value: number, locale: SiteLocale): string {
  const numberLocale =
    locale === "en" ? "en-US" : locale === "fr" ? "fr-CA" : "es-ES";
  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function withoutTerminalPunctuation(value: string): string {
  return value.trim().replace(/[.!?]+$/, "");
}

function pickFrArrays<T>(
  overlay: T[] | undefined
): T[] {
  return overlay ?? [];
}

function localizedRentalPolicy(
  value: string | undefined,
  locale: SiteLocale
): string | undefined {
  const rental = value?.trim();
  if (!rental) return undefined;

  if (locale === "es") {
    if (/^no restr\.?$/i.test(rental)) return "Sin restricciones";
    const withoutPrefix = rental.replace(/^política de renta\s+/i, "");
    if (/^uso flexible \(short-?\/long-term\)$/i.test(withoutPrefix)) {
      return "Uso flexible (rentas de corta y larga duración)";
    }
    if (/^1 noche-6 meses\. \(<6 meses\)$/i.test(withoutPrefix)) {
      return "Hospedaje: de 1 noche a menos de 6 meses";
    }
    return withoutPrefix;
  }

  if (locale === "en") {
    const normalized = rental.toLowerCase().replace(/\.$/, "");
    const translations: Record<string, string> = {
      "no restr": "No rental restrictions",
      "sin restricciones": "No rental restrictions",
      "30 días": "30-day minimum",
      "60 días": "60-day minimum",
      "90 días": "90-day minimum",
      "6 meses": "6-month minimum",
      tradicional: "Traditional long-term rentals",
      "flexible use (short-/long-term)":
        "Flexible use (short- and long-term rentals)",
      "lodging: nightly-6 months. (<6 months)":
        "Lodging: stays from 1 night to under 6 months",
    };
    return translations[normalized] ?? rental;
  }

  if (/^(?:minimum|séjour minimum) 90 jours\.?$/i.test(rental)) {
    return "Durée minimale de location : 90 jours";
  }
  return rental;
}

function localizedDelivery(
  value: string | undefined,
  locale: SiteLocale
): string | undefined {
  if (!value) return undefined;
  const delivery = value.trim();

  if (locale === "es") {
    return delivery
      .replace(/^(\d{4})\s+Q([1-4])$/i, "T$2 $1")
      .replace(/^Q([1-4])\s+(\d{4})$/i, "T$1 $2")
      .replace(/^Nov-Dec\s+(\d{4})$/i, "nov.–dic. de $1")
      .replace(/^Dic\s+(\d{4})$/i, "dic. de $1")
      .replace(/^(\d+)-(\d+)\s+meses$/i, "$1 a $2 meses")
      .replace(/(\d{4})-(\d{4})/g, "$1–$2");
  }

  if (locale === "en") {
    return delivery
      .replace(/^(\d{4})\s+Q([1-4])$/i, "Q$2 $1")
      .replace(/^Nov-Dec\s+(\d{4})$/i, "Nov–Dec $1")
      .replace(/^Dic\s+(\d{4})$/i, "Dec $1")
      .replace(/^(\d+)-(\d+)\s+meses$/i, "$1–$2 months")
      .replace(/(\d{4})-(\d{4})/g, "$1–$2");
  }

  return delivery;
}

function lineLabel(line: LabelLine): string {
  return typeof line === "string" ? line : line.label;
}

function Fact({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 py-5 sm:py-6 ${className}`}>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/70">
        {label}
      </dt>
      <dd className="mt-2 break-words font-display text-[clamp(1.35rem,2.5vw,2rem)] leading-[1.12] text-primary">
        {children}
      </dd>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const isEN = locale === "en";
  const isFR = locale === "fr";
  const project = pickBySlug(slug);

  if (!project) {
    return {
      title: isEN
        ? "Project not found"
        : isFR
          ? "Projet introuvable"
          : "Proyecto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const frOverlay = isFR ? getProjectFrOverlay(project.slug) : undefined;
  const city = isFR ? (frOverlay?.cityFr ?? project.city) : project.city;
  const title = `${project.name} — ${city} | Jacquie Zarate Realtor`;
  const delivery = isFR
    ? (frOverlay?.deliveryFr ?? project.delivery)
    : localizedDelivery(project.delivery, locale);
  const metadataDelivery = project.delivery ? delivery : undefined;
  const rentalPolicySource = isEN
    ? (project.rentalPolicyEn ?? project.rentalPolicy)
    : isFR
      ? frOverlay?.rentalPolicyFr
      : (project.rentalPolicyEs ?? project.rentalPolicy);
  const rentalPolicy = localizedRentalPolicy(rentalPolicySource, locale);

  const description = isEN
    ? [
        `${project.name} in ${city}.`,
        typeof project.priceFromUsd === "number"
          ? `From ${fmtUSD(project.priceFromUsd, "en")}.`
          : null,
        metadataDelivery
          ? `Estimated completion: ${metadataDelivery}.`
          : null,
        rentalPolicy
          ? `Rental policy: ${withoutTerminalPunctuation(String(rentalPolicy))}.`
          : null,
        "Request floor plans and availability with Jacquie Zarate Realtor.",
      ]
        .filter(Boolean)
        .join(" ")
    : isFR
      ? (() => {
          const parts: string[] = [`${project.name} — ${city}.`];
          if (typeof project.priceFromUsd === "number") {
            parts.push(`À partir de ${fmtUSD(project.priceFromUsd, "fr")}.`);
          }
          if (typeof project.pricePerSfApprox === "number") {
            parts.push(`Environ $${project.pricePerSfApprox}/pi².`);
          }
          if (metadataDelivery) {
            parts.push(`Livraison prévue : ${metadataDelivery}.`);
          }
          if (rentalPolicy) {
            parts.push(
              `Politique de location : ${withoutTerminalPunctuation(
                String(rentalPolicy)
              )}.`
            );
          }
          parts.push(
            "Plans, disponibilité et accompagnement personnalisé avec Jacquie Zarate Realtor."
          );
          return parts.join(" ");
        })()
      : [
          `${project.name} en ${city}.`,
          typeof project.priceFromUsd === "number"
            ? `Desde ${fmtUSD(project.priceFromUsd, "es")}.`
            : null,
          metadataDelivery
            ? `Entrega estimada: ${metadataDelivery}.`
            : null,
          rentalPolicy
            ? `Política de renta: ${withoutTerminalPunctuation(
                String(rentalPolicy)
              )}.`
            : null,
          "Solicita los planos y confirma la disponibilidad actual con Jacquie Zarate Realtor.",
        ]
          .filter(Boolean)
          .join(" ");

  return createPageMetadata({
    locale,
    path: `proyectos/${slug}`,
    title,
    description,
    image: project.image || "/og-image.jpg",
    robots: { index: true, follow: true },
  });
}

export default async function Proyecto({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const isEN = locale === "en";
  const isFR = locale === "fr";
  const project = pickBySlug(slug);
  if (!project) notFound();

  const frOverlay = isFR ? getProjectFrOverlay(project.slug) : undefined;
  const copy = PROJECT_DETAIL_COPY[locale];
  const city = isFR ? (frOverlay?.cityFr ?? project.city) : project.city;
  const delivery = isFR
    ? (frOverlay?.deliveryFr ?? project.delivery)
    : localizedDelivery(project.delivery, locale);
  const rentalPolicySource = isEN
    ? (project.rentalPolicyEn ?? project.rentalPolicy)
    : isFR
      ? frOverlay?.rentalPolicyFr
      : (project.rentalPolicyEs ?? project.rentalPolicy);
  const rentalPolicy = localizedRentalPolicy(rentalPolicySource, locale);

  const rawPayment = isEN
    ? (project.paymentPlanEn ?? [])
    : isFR
      ? pickFrArrays(frOverlay?.paymentPlanFr)
      : (project.paymentPlanEs ?? []);
  const payment = safePresentationPaymentLines(rawPayment, locale);

  const rawFaqs = isEN
    ? (project.faqsEn ?? [])
    : isFR
      ? pickFrArrays(frOverlay?.faqsFr)
      : (project.faqsEs ?? []);
  const faqs = safePresentationFaqs(rawFaqs, locale);

  const rawUnitMix = isEN
    ? (project.unitMixEn ?? [])
    : isFR
      ? pickFrArrays(frOverlay?.unitMixFr)
      : (project.unitMixEs ?? []);
  const unitMix = safePresentationLines(rawUnitMix);

  const rawFeatures = isEN
    ? (project.featuresEn ?? [])
    : isFR
      ? pickFrArrays(frOverlay?.featuresFr)
      : (project.featuresEs ?? []);
  const features = safePresentationLines(rawFeatures);

  const rawHighlights = isEN
    ? (project.highlightsEn ?? project.highlights ?? [])
    : isFR
      ? (frOverlay?.highlightsFr ?? project.highlightsFr ?? [])
      : (project.highlights ?? []);
  const highlights = safePresentationLines(rawHighlights);

  const rawMicroClaims = isEN
    ? (project.microClaimsEn ?? [])
    : isFR
      ? pickFrArrays(frOverlay?.microClaimsFr)
      : (project.microClaimsEs ?? []);
  const microClaims = safePresentationLines(rawMicroClaims);

  const projectImages = project.images ?? [];
  const contactHref = `/${locale}/contacto`;
  const whatsappMessage = fillTemplate(copy.opening.whatsappMessage, {
    name: project.name,
  });
  const whatsappHref = buildJacquieWhatsAppHref(locale, whatsappMessage);
  const shareUrl = localizedUrl(locale, `proyectos/${slug}`);
  const pricePerAreaSuffix =
    locale === "fr" ? "/pi²" : locale === "en" ? "/sq ft" : "/ft²";
  const supportingFacts: Array<{ label: string; value: ReactNode }> = [];

  if (typeof project.pricePerSfApprox === "number") {
    supportingFacts.push({
      label: copy.opening.pricePerArea,
      value: `~${fmtUSD(project.pricePerSfApprox, locale)}${pricePerAreaSuffix}`,
    });
  }
  if (project.hoa) {
    supportingFacts.push({ label: copy.opening.hoa, value: project.hoa });
  }
  if (typeof project.furnished === "boolean") {
    supportingFacts.push({
      label: copy.opening.furnishing,
      value: project.furnished
        ? copy.opening.furnished
        : copy.opening.unfurnished,
    });
  }

  const supportingFactsGrid =
    supportingFacts.length === 3
      ? "sm:grid-cols-3"
      : supportingFacts.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-1";

  const hasCoordinates =
    typeof project.lat === "number" && typeof project.lng === "number";
  const addressQuery =
    project.city && /\d/.test(project.city)
      ? project.city
      : `${project.name} ${project.city}`;
  const mapLanguage = isEN ? "en" : isFR ? "fr" : "es";
  const mapSrc = hasCoordinates
    ? `https://www.google.com/maps?q=${project.lat},${project.lng}&hl=${mapLanguage}&z=15&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        addressQuery
      )}&hl=${mapLanguage}&z=15&output=embed`;
  const mapTitle = fillTemplate(copy.location.mapTitle, {
    name: project.name,
  });

  return (
    <div className={`${FULL_BLEED} pb-0`}>
      <section
        aria-labelledby="project-detail-title"
        className="border-b border-primary/15 bg-paper"
      >
        <div className={`${CONTAINER} py-6 sm:py-10 lg:py-14`}>
          <div className="flex items-center justify-between gap-5 border-b border-primary/12 pb-4">
            <Link
              href={`/${locale}/proyectos`}
              className="inline-flex min-h-11 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.13em] text-primary no-underline"
            >
              <span aria-hidden>←</span>
              {copy.utility.back}
            </Link>
            <ShareButtons
              url={shareUrl}
              text={project.name}
              locale={locale}
              label={copy.utility.share}
              variant="light"
              showSystemShare
              buttonClassName="h-11 min-h-11 w-auto border-0 px-0 text-primary shadow-none hover:bg-transparent"
            />
          </div>

          <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            <div className="min-w-0">
              <p className={EYEBROW}>{copy.opening.eyebrow}</p>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary/72">
                {city}
              </p>
              <h1
                id="project-detail-title"
                className="mt-3 max-w-[15ch] break-words font-display text-[clamp(2.7rem,7vw,5.45rem)] font-medium leading-[0.94] tracking-[-0.035em] text-primary"
              >
                {project.name}
              </h1>
            </div>

            <div className="border-t border-primary/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/70">
                {copy.opening.startingPrice}
              </p>
              <p className="mt-3 break-words font-display text-[clamp(2rem,4vw,3.1rem)] leading-none text-primary">
                {typeof project.priceFromUsd === "number"
                  ? fmtUSD(project.priceFromUsd, locale)
                  : copy.opening.priceFallback}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_CTA}
                >
                  {copy.opening.primaryCta}
                </a>
                <Link href={contactHref} className={SECONDARY_CTA}>
                  {copy.opening.secondaryCta}
                </Link>
              </div>
            </div>
          </div>

          <dl className="mt-10 grid border-y border-primary/15 sm:grid-cols-2 lg:mt-14">
            <Fact
              label={copy.opening.location}
              className="border-b border-primary/12 sm:border-r"
            >
              {city}
            </Fact>
            <Fact
              label={copy.opening.delivery}
              className="border-b border-primary/12 sm:pl-8"
            >
              {delivery || copy.opening.deliveryFallback}
            </Fact>
            <Fact
              label={copy.opening.rental}
              className="sm:col-span-2"
            >
              {rentalPolicy || copy.opening.rentalFallback}
            </Fact>
          </dl>

          {supportingFacts.length > 0 ? (
            <dl
              className={`grid border-b border-primary/15 ${supportingFactsGrid}`}
            >
              {supportingFacts.map((fact, index) => {
                const hasNext = index < supportingFacts.length - 1;
                const divider = hasNext
                  ? "border-b border-primary/12 sm:border-b-0 sm:border-r sm:pr-8"
                  : "";
                const inset = index > 0 ? "sm:pl-8" : "";

                return (
                  <Fact
                    key={fact.label}
                    label={fact.label}
                    className={`${divider} ${inset}`}
                  >
                    {fact.value}
                  </Fact>
                );
              })}
            </dl>
          ) : null}

          <p className="mt-5 max-w-[92ch] text-[12px] leading-[1.65] text-foreground/70 sm:text-[13px]">
            {copy.opening.disclaimer}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="project-gallery-title"
        className="bg-paper py-12 sm:py-16 lg:py-20"
      >
        <div className={CONTAINER}>
          <div className="mb-7 grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW}>{copy.gallery.eyebrow}</p>
              <h2
                id="project-gallery-title"
                className={`${SECTION_TITLE} mt-3 max-w-[12ch]`}
              >
                {copy.gallery.title}
              </h2>
            </div>
            <p className="max-w-[58ch] text-[15px] leading-[1.75] text-foreground/72 sm:text-[17px] lg:pb-1">
              {copy.gallery.intro}
            </p>
          </div>
          <ProjectGallery
            projectName={project.name}
            cover={{ src: project.image }}
            images={projectImages}
            labels={copy.gallery.labels}
          />
        </div>
      </section>

      <section
        aria-labelledby="project-overview-title"
        className="border-y border-primary/12 bg-surface py-12 sm:py-16 lg:py-20"
      >
        <div className={CONTENT_CONTAINER}>
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{copy.overview.eyebrow}</p>
              <h2
                id="project-overview-title"
                className={`${SECTION_TITLE} mt-3 max-w-[11ch]`}
              >
                {copy.overview.title}
              </h2>
            </div>
            <p className="max-w-[60ch] text-[15px] leading-[1.75] text-foreground/74 sm:text-[17px] lg:pt-7">
              {copy.overview.intro}
            </p>
          </div>

          <div className="mt-9 grid gap-8 border-t border-primary/15 pt-7 lg:grid-cols-2 lg:gap-16">
            {microClaims.length > 0 ? (
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/70">
                  {copy.overview.references}
                </h3>
                <ul className="mt-4 border-b border-primary/15" role="list">
                  {microClaims.map((claim, index) => (
                    <li
                      key={`${index}-${claim}`}
                      className="border-t border-primary/15 py-4 font-display text-[20px] leading-[1.22] text-primary sm:text-[23px]"
                    >
                      {claim}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {highlights.length > 0 ? (
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/70">
                  {copy.overview.highlights}
                </h3>
                <ul className="mt-4 border-b border-primary/15" role="list">
                  {highlights.map((highlight, index) => (
                    <li
                      key={`${index}-${highlight}`}
                      className="flex gap-4 border-t border-primary/15 py-4 text-[15px] leading-[1.65] text-foreground/78"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.67em] h-px w-7 shrink-0 bg-accent"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {unitMix.length > 0 ? (
        <section
          id="tipologias"
          aria-labelledby="project-typologies-title"
          className="bg-paper py-12 sm:py-16 lg:py-20"
        >
          <div className={CONTENT_CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className={EYEBROW}>{copy.typologies.eyebrow}</p>
                <h2
                  id="project-typologies-title"
                  className={`${SECTION_TITLE} mt-3 max-w-[12ch]`}
                >
                  {copy.typologies.title}
                </h2>
                <p className="mt-5 max-w-[40ch] text-[14px] leading-[1.7] text-foreground/68 sm:text-[15px]">
                  {copy.typologies.intro}
                </p>
              </div>
              <div>
                <ol className="border-b border-primary/15">
                  {unitMix.map((item, index) => {
                    const label = lineLabel(item);
                    return (
                      <li
                        key={`${index}-${label}`}
                        className="grid gap-2 border-t border-primary/15 py-5 sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-5 sm:py-6"
                      >
                        <span className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-primary/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="break-words font-display text-[clamp(1.25rem,2.4vw,1.8rem)] leading-[1.18] text-primary">
                          {label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-4 max-w-[58ch] text-[12px] leading-[1.65] text-foreground/70 sm:text-[13px]">
                  {copy.typologies.note}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {features.length > 0 ? (
        <section
          aria-labelledby="project-features-title"
          className="border-t border-primary/12 bg-paper pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20"
        >
          <div className={CONTENT_CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className={EYEBROW}>{copy.features.eyebrow}</p>
                <h2
                  id="project-features-title"
                  className={`${SECTION_TITLE} mt-3 max-w-[12ch]`}
                >
                  {copy.features.title}
                </h2>
              </div>
              <ul
                className="grid border-b border-primary/15 lg:grid-cols-2"
                role="list"
              >
                {features.map((item, index) => {
                  const label = lineLabel(item);
                  return (
                    <li
                      key={`${index}-${label}`}
                      className="flex gap-4 border-t border-primary/15 py-5 text-[15px] leading-[1.7] text-foreground/78 lg:odd:pr-7 lg:even:border-l lg:even:pl-7"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="break-words">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {payment.length > 0 ? (
        <section
          id="pagos"
          aria-labelledby="project-payment-title"
          className="bg-primary py-12 text-primary-foreground sm:py-16 lg:py-20"
        >
          <div
            className={`${CONTENT_CONTAINER} grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20`}
          >
            <div>
              <p className={EYEBROW_LIGHT}>{copy.payment.eyebrow}</p>
              <h2
                id="project-payment-title"
                className="mt-3 max-w-[11ch] font-display text-[clamp(2.3rem,4.8vw,3.8rem)] font-medium leading-[1.01] tracking-[-0.025em]"
              >
                {copy.payment.title}
              </h2>
              <p className="mt-5 max-w-[42ch] text-[14px] leading-[1.72] text-primary-foreground/70 sm:text-[15px]">
                {copy.payment.intro}
              </p>
              <p className="mt-5 max-w-[46ch] border-l border-accent/70 pl-4 text-[12px] leading-[1.65] text-primary-foreground/60 sm:text-[13px]">
                {copy.payment.disclaimer}
              </p>
            </div>
            <ol className="border-b border-primary-foreground/20">
              {payment.map((step, index) => (
                <li
                  key={`${index}-${step}`}
                  className="grid gap-3 border-t border-primary-foreground/20 py-5 sm:grid-cols-[62px_minmax(0,1fr)] sm:gap-5 sm:py-6"
                >
                  <span className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-primary-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="break-words font-display text-[clamp(1.25rem,2.4vw,1.8rem)] leading-[1.18] text-primary-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="project-advisor-title"
        className="border-b border-primary/12 bg-surface py-12 sm:py-16 lg:py-20"
      >
        <div
          className={`${CONTENT_CONTAINER} grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20`}
        >
          <div>
            <p className={EYEBROW}>{copy.advisor.eyebrow}</p>
            <h2
              id="project-advisor-title"
              className={`${SECTION_TITLE} mt-3 max-w-[12ch]`}
            >
              {copy.advisor.title}
            </h2>
          </div>
          <p className="max-w-[64ch] border-l-2 border-accent pl-5 text-[16px] leading-[1.78] text-foreground/76 sm:text-[18px] lg:mt-8">
            {copy.advisor.text}
          </p>
        </div>
      </section>

      <section
        id="ubicacion"
        aria-labelledby="project-location-title"
        className="bg-paper py-12 sm:py-16 lg:py-20"
      >
        <div className={CONTENT_CONTAINER}>
          <div className="grid gap-7 lg:grid-cols-[0.6fr_1.4fr] lg:items-end lg:gap-20">
            <div>
              <p className={EYEBROW}>{copy.location.eyebrow}</p>
              <h2
                id="project-location-title"
                className={`${SECTION_TITLE} mt-3 max-w-[11ch]`}
              >
                {copy.location.title}
              </h2>
            </div>
            <p className="break-words font-display text-[clamp(1.5rem,3vw,2.35rem)] leading-[1.12] text-primary lg:pb-1">
              {city}
            </p>
          </div>
          <div className="mt-8 overflow-hidden border border-primary/15 bg-surface sm:mt-10">
            <iframe
              src={mapSrc}
              title={mapTitle}
              width="100%"
              height="500"
              className="block h-[300px] w-full sm:h-[400px] lg:h-[500px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section
          id="preguntas"
          aria-labelledby="project-faq-title"
          className="border-t border-primary/12 bg-paper py-12 sm:py-16 lg:py-20"
        >
          <div className={CONTENT_CONTAINER}>
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className={EYEBROW}>{copy.faq.eyebrow}</p>
                <h2
                  id="project-faq-title"
                  className={`${SECTION_TITLE} mt-3 max-w-[12ch]`}
                >
                  {copy.faq.title}
                </h2>
              </div>
              <div>
                <ProjectFaq
                  items={faqs}
                  labels={{ open: copy.faq.open, close: copy.faq.close }}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="project-close-title"
        className="border-t border-primary/15 bg-surface py-12 sm:py-16 lg:py-20"
      >
        <div
          className={`${CONTENT_CONTAINER} grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20`}
        >
          <div>
            <p className={EYEBROW}>{copy.close.eyebrow}</p>
            <h2
              id="project-close-title"
              className={`${SECTION_TITLE} mt-3 max-w-[13ch]`}
            >
              {copy.close.title}
            </h2>
          </div>
          <div className="lg:pt-7">
            <p className="max-w-[62ch] text-[16px] leading-[1.78] text-foreground/76 sm:text-[18px]">
              {fillTemplate(copy.close.text, { name: project.name })}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={PRIMARY_CTA}
              >
                {copy.close.primaryCta}
              </a>
              <Link href={contactHref} className={SECONDARY_CTA}>
                {copy.close.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
