import type { ReactNode } from "react";
import Image from "next/image";
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
  dedupeProjectPresentation,
  parsePaymentPresentationLine,
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
  "font-display text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.025em] text-primary";
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
    <div className={`min-w-0 border-t border-primary/15 py-3 ${className}`}>
      <dt className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary/68 sm:text-[10px]">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-[14px] font-medium leading-[1.4] text-primary sm:text-[15px]">
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
  const payment = safePresentationPaymentLines(rawPayment, locale).map(
    parsePaymentPresentationLine
  );

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
  const safeFeatures = safePresentationLines(rawFeatures);

  const rawHighlights = isEN
    ? (project.highlightsEn ?? project.highlights ?? [])
    : isFR
      ? (frOverlay?.highlightsFr ?? project.highlightsFr ?? [])
      : (project.highlights ?? []);
  const safeHighlights = safePresentationLines(rawHighlights);

  const rawMicroClaims = isEN
    ? (project.microClaimsEn ?? [])
    : isFR
      ? pickFrArrays(frOverlay?.microClaimsFr)
      : (project.microClaimsEs ?? []);
  const safeMicroClaims = safePresentationLines(rawMicroClaims);

  const projectImages = project.images ?? [];
  const contactHref = `/${locale}/contacto`;
  const whatsappMessage = fillTemplate(copy.opening.whatsappMessage, {
    name: project.name,
  });
  const whatsappHref = buildJacquieWhatsAppHref(locale, whatsappMessage);
  const shareUrl = localizedUrl(locale, `proyectos/${slug}`);
  const pricePerAreaSuffix =
    locale === "fr" ? "/pi²" : locale === "en" ? "/sq ft" : "/ft²";
  const facts: Array<{
    label: string;
    value: ReactNode;
    wide?: boolean;
  }> = [
    {
      label: copy.opening.location,
      value: city,
      wide: city.length > 32,
    },
  ];

  if (delivery) {
    facts.push({ label: copy.opening.delivery, value: delivery });
  }
  if (rentalPolicy) {
    facts.push({
      label: copy.opening.rental,
      value: rentalPolicy,
      wide: String(rentalPolicy).length > 32,
    });
  }
  if (typeof project.furnished === "boolean") {
    facts.push({
      label: copy.opening.furnishing,
      value: project.furnished
        ? copy.opening.furnished
        : copy.opening.unfurnished,
    });
  }

  if (typeof project.pricePerSfApprox === "number") {
    facts.push({
      label: copy.opening.pricePerArea,
      value: `~${fmtUSD(project.pricePerSfApprox, locale)}${pricePerAreaSuffix}`,
    });
  }
  if (project.hoa) {
    facts.push({
      label: copy.opening.hoa,
      value: project.hoa,
      wide: project.hoa.length > 32,
    });
  }

  const factValues = [
    city,
    delivery,
    rentalPolicy,
    typeof project.furnished === "boolean"
      ? project.furnished
        ? copy.opening.furnished
        : copy.opening.unfurnished
      : undefined,
    typeof project.priceFromUsd === "number"
      ? fmtUSD(project.priceFromUsd, locale)
      : undefined,
  ].filter((value): value is string => Boolean(value));
  const {
    microClaims,
    highlights,
    features,
  } = dedupeProjectPresentation({
    microClaims: safeMicroClaims,
    highlights: safeHighlights,
    features: safeFeatures,
    factValues,
    priceFromUsd: project.priceFromUsd,
  });
  const overviewLead = highlights[0] ?? microClaims[0];
  const overviewAttributes = [...microClaims, ...highlights].filter(
    (attribute) => attribute !== overviewLead
  );

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
    <div className={`${FULL_BLEED} -mb-24 pb-0`}>
      <section
        aria-labelledby="project-detail-title"
        className="border-b border-primary/15 bg-paper"
      >
        <div className={`${CONTAINER} py-4 sm:py-5 lg:py-6`}>
          <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-primary/12 pb-3">
            <Link
              href={`/${locale}/proyectos`}
              className="inline-flex min-h-11 min-w-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary no-underline sm:text-[12px]"
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

          <div className="grid gap-6 pt-4 lg:min-h-[610px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-10 lg:pt-6">
            <div className="order-2 flex min-w-0 flex-col justify-center lg:order-1 lg:py-5 lg:pr-2">
              <p className={EYEBROW}>{copy.opening.eyebrow}</p>
              <h1
                id="project-detail-title"
                className="mt-3 max-w-[13ch] break-words font-display text-[clamp(2.65rem,11vw,4.15rem)] font-medium leading-[0.94] tracking-[-0.035em] text-primary lg:text-[clamp(3.1rem,5.5vw,5.1rem)]"
              >
                {project.name}
              </h1>
              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-primary/68 sm:text-[10px]">
                {copy.opening.startingPrice}
              </p>
              <p className="mt-1.5 break-words font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-none text-primary">
                {typeof project.priceFromUsd === "number"
                  ? fmtUSD(project.priceFromUsd, locale)
                  : copy.opening.priceFallback}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-x-5 border-b border-primary/15 lg:grid-cols-4">
                {facts.map((fact) => (
                  <Fact
                    key={fact.label}
                    label={fact.label}
                    className={fact.wide ? "col-span-2 lg:col-span-2" : ""}
                  >
                    {fact.value}
                  </Fact>
                ))}
              </dl>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
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

            <div className="relative order-1 h-[42svh] min-h-[260px] overflow-hidden bg-surface sm:h-[54svh] sm:min-h-[430px] lg:order-2 lg:h-auto lg:min-h-[560px]">
              <Image
                src={project.image}
                alt={`${project.name} — ${city}`}
                fill
                priority
                quality={85}
                sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, calc(100vw - 40px)"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-end bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-20 text-white sm:px-5 sm:pb-5">
                <p className="text-[11px] tabular-nums text-white/80">
                  01 / {String(projectImages.length + 1).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="project-gallery-title"
        className="bg-paper py-10 sm:py-12 lg:py-14"
      >
        <div className={CONTAINER}>
          <div className="mb-6 flex flex-col gap-3 border-b border-primary/12 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div>
              <p className={EYEBROW}>{copy.gallery.eyebrow}</p>
              <h2
                id="project-gallery-title"
                className="mt-2 font-display text-[clamp(1.9rem,3.3vw,2.8rem)] font-medium leading-[1.04] tracking-[-0.02em] text-primary"
              >
                {copy.gallery.title}
              </h2>
            </div>
            <p className="max-w-[48ch] text-[14px] leading-[1.65] text-foreground/70 sm:text-[15px]">
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
        className="border-y border-primary/12 bg-surface py-10 sm:py-12 lg:py-14"
      >
        <div className={CONTENT_CONTAINER}>
          <div
            className={`grid gap-8 ${
              overviewAttributes.length > 0
                ? "lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16"
                : "lg:max-w-[760px]"
            }`}
          >
            <div>
              <p className={EYEBROW}>{copy.overview.eyebrow}</p>
              <h2
                id="project-overview-title"
                className={`${SECTION_TITLE} mt-3`}
              >
                {copy.overview.title}
              </h2>
              <p className="mt-5 max-w-[43ch] text-[15px] leading-[1.7] text-foreground/72 sm:text-[16px]">
                {copy.overview.intro}
              </p>
              {overviewLead ? (
                <p className="mt-5 max-w-[34ch] border-l-2 border-accent pl-4 font-display text-[1.35rem] leading-[1.22] text-primary sm:text-[1.55rem]">
                  {lineLabel(overviewLead)}
                </p>
              ) : null}
            </div>
            {overviewAttributes.length > 0 ? (
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/70">
                  {copy.overview.attributes}
                </h3>
                <ul
                  role="list"
                  className="mt-5 list-none columns-1 [column-fill:balance] xl:columns-2 xl:gap-x-10"
                >
                  {overviewAttributes.map((attribute, index) => {
                    const label = lineLabel(attribute);
                    return (
                      <li
                        key={`${index}-${label}`}
                        className="mb-5 max-w-[38ch] break-inside-avoid break-words text-[14px] leading-[1.65] text-foreground/78 [break-inside:avoid-column] last:mb-0"
                      >
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          {payment.length === 0 ? (
            <p className="mt-8 max-w-[88ch] border-t border-primary/15 pt-4 text-[11px] leading-[1.65] text-foreground/72 sm:text-[12px]">
              {copy.legal.disclaimer}
            </p>
          ) : null}
        </div>
      </section>

      {unitMix.length > 0 ? (
        <section
          id="tipologias"
          aria-labelledby="project-typologies-title"
          className="bg-paper py-10 sm:py-12 lg:py-14"
        >
          <div className={CONTENT_CONTAINER}>
            <div>
              <div className="max-w-[560px]">
                <p className={EYEBROW}>{copy.typologies.eyebrow}</p>
                <h2
                  id="project-typologies-title"
                  className={`${SECTION_TITLE} mt-3`}
                >
                  {copy.typologies.title}
                </h2>
              </div>
              <p className="mt-5 max-w-[45ch] text-[14px] leading-[1.65] text-foreground/68 sm:text-[15px]">
                {copy.typologies.intro}
              </p>
            </div>
            <ol
              role="list"
              className="mt-8 list-none columns-1 [column-fill:balance] lg:columns-2 lg:gap-x-14 xl:gap-x-16"
            >
              {unitMix.map((item, index) => {
                const label = lineLabel(item);
                return (
                  <li
                    key={`${index}-${label}`}
                    className="mb-6 flex max-w-[48ch] break-inside-avoid gap-4 [break-inside:avoid-column] last:mb-0"
                  >
                    <span
                      aria-hidden
                      className="w-8 shrink-0 pt-0.5 text-[9px] font-semibold tabular-nums tracking-[0.15em] text-primary/75 sm:text-[10px]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 break-words text-[14px] font-medium leading-[1.55] text-primary sm:text-[15px]">
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 max-w-[68ch] text-[11px] leading-[1.6] text-foreground/65 sm:text-[12px]">
              {copy.typologies.note}
            </p>
          </div>
        </section>
      ) : null}

      {features.length > 0 ? (
        <section
          aria-labelledby="project-features-title"
          className="border-t border-primary/12 bg-paper py-10 sm:py-12 lg:py-14"
        >
          <div className={CONTENT_CONTAINER}>
            <div>
              <p className={EYEBROW}>{copy.features.eyebrow}</p>
              <h2
                id="project-features-title"
                className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.04] tracking-[-0.02em] text-primary"
              >
                {copy.features.title}
              </h2>
            </div>
            <ul
              role="list"
              className="mt-8 list-none columns-1 [column-fill:balance] lg:columns-2 lg:gap-x-14 xl:gap-x-16"
            >
              {features.map((item, index) => {
                const label = lineLabel(item);
                return (
                  <li
                    key={`${index}-${label}`}
                    className="mb-6 max-w-[48ch] break-inside-avoid break-words text-[15px] font-medium leading-[1.65] text-primary/82 [break-inside:avoid-column] last:mb-0"
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {payment.length > 0 ? (
        <section
          id="pagos"
          aria-labelledby="project-payment-title"
          className="bg-primary py-10 text-primary-foreground sm:py-12 lg:py-14"
        >
          <div className={CONTENT_CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
              <div>
                <p className={EYEBROW_LIGHT}>{copy.payment.eyebrow}</p>
                <h2
                  id="project-payment-title"
                  className="mt-3 max-w-[11ch] font-display text-[clamp(2.15rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
                >
                  {copy.payment.title}
                </h2>
                <p className="mt-4 max-w-[40ch] text-[14px] leading-[1.68] text-primary-foreground/70 sm:text-[15px]">
                  {copy.payment.intro}
                </p>
              </div>
              <ol className="border-b border-primary-foreground/20">
                {payment.map((step, index) => (
                  <li
                    key={`${index}-${step.raw}`}
                    className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-3 border-t border-primary-foreground/20 py-3.5 sm:grid-cols-[44px_110px_minmax(0,1fr)] sm:gap-x-4 sm:py-4"
                  >
                    <span
                      aria-hidden
                      className="row-span-2 pt-1 text-[9px] font-semibold tabular-nums tracking-[0.15em] text-primary-foreground/55 sm:text-[10px]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step.kind === "structured" ? (
                      <>
                        <p className="break-words font-display text-[1.45rem] leading-none text-primary-foreground sm:pt-0.5 sm:text-[1.65rem]">
                          {step.percentage}
                        </p>
                        <div className="col-start-2 mt-1 min-w-0 sm:col-start-3 sm:row-start-1 sm:mt-0">
                          <p className="break-words text-[14px] font-medium leading-[1.5] text-primary-foreground sm:text-[15px]">
                            {step.milestone}
                          </p>
                          {step.condition ? (
                            <p className="mt-1 break-words text-[11px] leading-[1.55] text-primary-foreground/62 sm:text-[12px]">
                              {step.condition}
                            </p>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <p className="col-start-2 break-words text-[14px] font-medium leading-[1.55] text-primary-foreground sm:col-span-2 sm:text-[15px]">
                        {step.raw}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-6 max-w-[92ch] border-t border-primary-foreground/20 pt-4 text-[11px] leading-[1.65] text-primary-foreground/58 sm:text-[12px]">
              {copy.legal.disclaimer}
            </p>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="project-advisor-title"
        className="border-b border-primary/12 bg-surface py-8 sm:py-9"
      >
        <div
          className={`${CONTENT_CONTAINER} grid gap-4 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12`}
        >
          <div>
            <p className={EYEBROW}>{copy.advisor.eyebrow}</p>
            <h2
              id="project-advisor-title"
              className="mt-3 font-display text-[clamp(1.75rem,3vw,2.45rem)] font-medium leading-[1.06] tracking-[-0.02em] text-primary"
            >
              {copy.advisor.title}
            </h2>
          </div>
          <p className="max-w-[64ch] border-l-2 border-accent pl-4 text-[14px] leading-[1.68] text-foreground/76 sm:text-[15px] lg:mt-7">
            {copy.advisor.text}
          </p>
        </div>
      </section>

      <section
        id="ubicacion"
        aria-labelledby="project-location-title"
        className="bg-paper py-10 sm:py-12 lg:py-14"
      >
        <div className={`${CONTENT_CONTAINER} grid gap-6 lg:grid-cols-[minmax(240px,0.36fr)_minmax(0,0.64fr)] lg:items-stretch lg:gap-10`}>
          <div className="flex flex-col justify-between border-b border-primary/15 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <div>
              <p className={EYEBROW}>{copy.location.eyebrow}</p>
              <h2
                id="project-location-title"
                className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,3.4vw,2.9rem)] font-medium leading-[1.04] tracking-[-0.02em] text-primary"
              >
                {copy.location.title}
              </h2>
            </div>
            <p className="mt-6 break-words font-display text-[clamp(1.35rem,2.5vw,2rem)] leading-[1.15] text-primary">
              {city}
            </p>
          </div>
          <div className="overflow-hidden border border-primary/15 bg-surface">
            <iframe
              src={mapSrc}
              title={mapTitle}
              width="100%"
              height="430"
              className="block h-[280px] w-full sm:h-[340px] lg:h-[430px]"
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
          className="border-t border-primary/12 bg-paper py-10 sm:py-12 lg:py-14"
        >
          <div className="mx-auto w-full max-w-[920px] px-5 sm:px-8">
            <div className="mb-6 border-b border-primary/15 pb-5">
              <p className={EYEBROW}>{copy.faq.eyebrow}</p>
              <h2
                id="project-faq-title"
                className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-medium leading-[1.04] tracking-[-0.02em] text-primary"
              >
                {copy.faq.title}
              </h2>
            </div>
            <ProjectFaq
              items={faqs}
              labels={{ open: copy.faq.open, close: copy.faq.close }}
            />
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="project-close-title"
        className="border-t border-primary-foreground/15 bg-primary py-12 text-primary-foreground sm:py-16 lg:py-[72px]"
      >
        <div
          className={`${CONTENT_CONTAINER} grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(240px,280px)] lg:items-center lg:gap-14`}
        >
          <div>
            <p className={EYEBROW_LIGHT}>{copy.close.eyebrow}</p>
            <h2
              id="project-close-title"
              className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              {copy.close.title}
            </h2>
            <p className="mt-4 max-w-[66ch] text-[14px] leading-[1.68] text-primary-foreground/70 sm:text-[16px]">
              {fillTemplate(copy.close.text, { name: project.name })}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-primary-foreground bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-foreground/90 motion-reduce:transition-none"
            >
              {copy.close.primaryCta}
            </a>
            <Link
              href={contactHref}
              className="inline-flex min-h-11 items-center justify-center border border-primary-foreground/55 px-6 py-3 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary-foreground/10 motion-reduce:transition-none"
            >
              {copy.close.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
