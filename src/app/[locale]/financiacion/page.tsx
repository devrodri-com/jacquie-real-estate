// src/app/[locale]/financiacion/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata, normalizeLocale as normalizeSiteLocale } from "@/lib/seo";

type Locale = "es" | "en" | "fr";

const COPY: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    summaryTitle: string;
    summaryItems: string[];
    judgmentTitle: string;
    judgmentText: string;
    cards: string[];
    programsTitle: string;
    programsText: string;
    programsNote: string;
    downPaymentLabel: string;
    reviewTitle: string;
    reviewItems: string[];
    processTitle: string;
    steps: { title: string; text: string }[];
    experienceTitle: string;
    experienceText: string;
    finalTitle: string;
    finalText: string;
    finalCta: string;
    disclaimer: string;
    whatsAppMessage: string;
  }
> = {
  es: {
    metaTitle: "Financiación para comprar en Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financiación para compradores e inversores en Miami con criterio financiero, opciones desde 25% de down payment sujetas a evaluación y aprobación.",
    eyebrow: "Financiación inmobiliaria",
    heroTitle: "Financiación para comprar en Miami con una mirada más completa",
    heroSubtitle:
      "Antes de elegir una propiedad, revisamos tu objetivo, perfil y documentación para entender qué opciones de financiación podrían aplicar y cómo impactan en tu decisión de compra.",
    primaryCta: "Evaluar mi caso",
    secondaryCta: "Ver propiedades",
    summaryTitle: "Comprar con criterio financiero",
    summaryItems: [
      "Realtor en Miami",
      "Más de 15 años en Finanzas",
      "Experiencia en empresas S&P 500",
    ],
    judgmentTitle: "No se trata solo de conseguir un préstamo. Se trata de comprar con criterio.",
    judgmentText:
      "La financiación puede ayudarte a acceder a una propiedad en Miami sin usar todo tu capital disponible. Pero cada caso debe evaluarse con cuidado: tipo de propiedad, perfil del comprador, reservas, documentación, estructura de compra y objetivo de inversión.",
    cards: [
      "Compra para inversión",
      "Compra para uso personal",
      "Compradores extranjeros",
      "Compra a nombre personal o empresa",
    ],
    programsTitle: "Programas que pueden comenzar desde 25% de down payment",
    programsText:
      "En algunos casos, compradores extranjeros pueden acceder a alternativas de financiación desde 25% de down payment. La disponibilidad depende del perfil del comprador, el tipo de propiedad, la documentación presentada y la aprobación de la entidad financiera.",
    programsNote:
      "El 25% no es una garantía. Es una referencia inicial para evaluar posibilidades.",
    downPaymentLabel: "down payment",
    reviewTitle: "Qué se suele revisar antes de avanzar",
    reviewItems: [
      "Objetivo de compra: inversión, uso personal o renta.",
      "Presupuesto estimado y capital disponible.",
      "Fondos para down payment y reservas.",
      "Ingresos o respaldo financiero comprobable.",
      "Historial o referencia bancaria.",
      "Tipo de propiedad y condiciones del edificio.",
      "Compra a nombre personal o estructura corporativa.",
    ],
    processTitle: "Un proceso simple para tomar mejores decisiones",
    steps: [
      {
        title: "Entendemos tu objetivo",
        text: "Definimos si buscás invertir, comprar para uso propio o evaluar una oportunidad puntual.",
      },
      {
        title: "Revisamos el escenario financiero",
        text: "Analizamos capital disponible, documentación y posibles caminos de financiación.",
      },
      {
        title: "Conectamos con opciones adecuadas",
        text: "Según tu perfil, se revisan alternativas con profesionales o entidades financieras correspondientes.",
      },
      {
        title: "Acompañamos la compra",
        text: "Si avanzás, la financiación se coordina junto con la búsqueda, oferta, contrato y cierre.",
      },
    ],
    experienceTitle: "Experiencia inmobiliaria con criterio financiero",
    experienceText:
      "Jacquie combina su trabajo como realtor en Miami con más de 15 años de experiencia en Finanzas en empresas S&P 500. Esa mirada le permite acompañar a compradores e inversores no solo desde la propiedad, sino también desde los números, la estructura y el proceso.",
    finalTitle: "¿Querés saber si la financiación puede aplicar a tu compra?",
    finalText:
      "Contame qué tipo de propiedad estás buscando y revisamos el mejor camino para tu caso.",
    finalCta: "Consultar por WhatsApp",
    disclaimer:
      "La información es orientativa. Toda financiación está sujeta a evaluación, documentación, aprobación de la entidad financiera, tipo de propiedad y condiciones vigentes al momento de aplicar.",
    whatsAppMessage:
      "Hola Jacquie, quiero evaluar si la financiación puede aplicar a mi compra en Miami.",
  },
  en: {
    metaTitle: "Financing to buy in Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financing for Miami buyers and investors with financial judgment, including options from 25% down payment subject to review and financial institution approval.",
    eyebrow: "Real estate financing",
    heroTitle: "Financing to buy in Miami with a more complete perspective",
    heroSubtitle:
      "Before choosing a property, we review your goal, profile, and documentation to understand which financing options may apply and how they can impact your purchase decision.",
    primaryCta: "Evaluate my case",
    secondaryCta: "View properties",
    summaryTitle: "Buy with financial judgment",
    summaryItems: [
      "Miami Realtor",
      "15+ years in Finance",
      "Experience in S&P 500 companies",
    ],
    judgmentTitle: "It is not just about getting a loan. It is about buying with judgment.",
    judgmentText:
      "Financing can help you access a Miami property without using all your available capital. But every case should be reviewed carefully: property type, buyer profile, reserves, documentation, purchase structure, and investment goal.",
    cards: [
      "Investment purchase",
      "Personal use purchase",
      "Foreign buyers",
      "Personal or company purchase",
    ],
    programsTitle: "Programs that may start from 25% down payment",
    programsText:
      "In some cases, foreign buyers may access financing alternatives from 25% down payment. Availability depends on the buyer profile, property type, documentation submitted, and financial institution approval.",
    programsNote:
      "25% is not a guarantee. It is an initial reference to evaluate possibilities.",
    downPaymentLabel: "down payment",
    reviewTitle: "What is usually reviewed before moving forward",
    reviewItems: [
      "Purchase goal: investment, personal use, or rental.",
      "Estimated budget and available capital.",
      "Funds for down payment and reserves.",
      "Verifiable income or financial support.",
      "Bank history or bank reference.",
      "Property type and building conditions.",
      "Purchase under a personal name or corporate structure.",
    ],
    processTitle: "A simple process to make better decisions",
    steps: [
      {
        title: "We understand your goal",
        text: "We define whether you want to invest, buy for personal use, or evaluate a specific opportunity.",
      },
      {
        title: "We review the financial scenario",
        text: "We analyze available capital, documentation, and possible financing paths.",
      },
      {
        title: "We connect with suitable options",
        text: "Depending on your profile, alternatives are reviewed with the corresponding professionals or financial institutions.",
      },
      {
        title: "We support the purchase",
        text: "If you move forward, financing is coordinated alongside the search, offer, contract, and closing.",
      },
    ],
    experienceTitle: "Real estate experience with financial judgment",
    experienceText:
      "Jacquie combines her work as a Miami Realtor with more than 15 years of Finance experience in S&P 500 companies. That perspective allows her to support buyers and investors not only through the property itself, but also through the numbers, structure, and process.",
    finalTitle: "Want to know if financing may apply to your purchase?",
    finalText:
      "Tell me what type of property you are looking for and we can review the best path for your case.",
    finalCta: "Ask on WhatsApp",
    disclaimer:
      "This information is for guidance only. All financing is subject to review, documentation, financial institution approval, property type, and conditions in effect at the time of application.",
    whatsAppMessage:
      "Hi Jacquie, I’d like to evaluate whether financing may apply to my purchase in Miami.",
  },
  fr: {
    metaTitle: "Financement pour acheter à Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financement pour acheteurs et investisseurs à Miami avec discernement financier, incluant des options à partir de 25% de mise de fonds sous réserve d’évaluation et d’approbation.",
    eyebrow: "Financement immobilier",
    heroTitle: "Financement pour acheter à Miami avec une vision plus complète",
    heroSubtitle:
      "Avant de choisir une propriété, nous revoyons votre objectif, votre profil et vos documents afin de comprendre quelles options de financement pourraient s’appliquer et comment elles peuvent influencer votre décision d’achat.",
    primaryCta: "Évaluer mon cas",
    secondaryCta: "Voir les propriétés",
    summaryTitle: "Acheter avec discernement financier",
    summaryItems: [
      "Realtor à Miami",
      "Plus de 15 ans en Finance",
      "Expérience dans des entreprises du S&P 500",
    ],
    judgmentTitle: "Il ne s’agit pas seulement d’obtenir un prêt. Il s’agit d’acheter avec discernement.",
    judgmentText:
      "Le financement peut vous aider à accéder à une propriété à Miami sans utiliser tout votre capital disponible. Mais chaque cas doit être évalué avec soin : type de propriété, profil de l’acheteur, réserves, documents, structure d’achat et objectif d’investissement.",
    cards: [
      "Achat pour investissement",
      "Achat pour usage personnel",
      "Acheteurs étrangers",
      "Achat à titre personnel ou via une société",
    ],
    programsTitle: "Des programmes qui peuvent commencer à 25% de mise de fonds",
    programsText:
      "Dans certains cas, des acheteurs étrangers peuvent accéder à des options de financement à partir de 25% de mise de fonds. La disponibilité dépend du profil de l’acheteur, du type de propriété, des documents fournis et de l’approbation de l’institution financière.",
    programsNote:
      "Le 25% n’est pas une garantie. C’est une référence initiale pour évaluer les possibilités.",
    downPaymentLabel: "mise de fonds",
    reviewTitle: "Ce qui est habituellement revu avant d’avancer",
    reviewItems: [
      "Objectif d’achat : investissement, usage personnel ou location.",
      "Budget estimé et capital disponible.",
      "Fonds pour la mise de fonds et les réserves.",
      "Revenus ou soutien financier vérifiable.",
      "Historique ou référence bancaire.",
      "Type de propriété et conditions de l’immeuble.",
      "Achat à titre personnel ou structure corporative.",
    ],
    processTitle: "Un processus simple pour prendre de meilleures décisions",
    steps: [
      {
        title: "Nous comprenons votre objectif",
        text: "Nous définissons si vous cherchez à investir, acheter pour usage personnel ou évaluer une occasion précise.",
      },
      {
        title: "Nous revoyons le scénario financier",
        text: "Nous analysons le capital disponible, les documents et les chemins de financement possibles.",
      },
      {
        title: "Nous connectons avec les options adéquates",
        text: "Selon votre profil, les alternatives sont revues avec les professionnels ou les institutions financières appropriées.",
      },
      {
        title: "Nous accompagnons l’achat",
        text: "Si vous avancez, le financement se coordonne avec la recherche, l’offre, le contrat et la clôture.",
      },
    ],
    experienceTitle: "Expérience immobilière avec discernement financier",
    experienceText:
      "Jacquie combine son travail comme Realtor à Miami avec plus de 15 ans d’expérience en Finance dans des entreprises du S&P 500. Cette perspective lui permet d’accompagner les acheteurs et investisseurs non seulement sur la propriété, mais aussi sur les chiffres, la structure et le processus.",
    finalTitle: "Voulez-vous savoir si le financement peut s’appliquer à votre achat ?",
    finalText:
      "Dites-moi quel type de propriété vous cherchez et nous revoyons le meilleur chemin pour votre cas.",
    finalCta: "Consulter par WhatsApp",
    disclaimer:
      "L’information est fournie à titre indicatif. Tout financement est soumis à l’évaluation, aux documents, à l’approbation de l’institution financière, au type de propriété et aux conditions en vigueur au moment de la demande.",
    whatsAppMessage:
      "Bonjour Jacquie, j’aimerais évaluer si le financement peut s’appliquer à mon achat à Miami.",
  },
};

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
  const locale = normalizeSiteLocale(raw);
  const copy = COPY[locale];

  return createPageMetadata({
    locale,
    path: "financiacion",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function FinancingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const copy = COPY[locale];
  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(copy.whatsAppMessage)}`;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:py-16 text-foreground">
      <section className="grid gap-8 rounded-[18px] bg-surface p-6 ring-1 ring-primary/10 sm:p-8 md:grid-cols-[1.12fr_0.88fr] md:items-center">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary/70">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[13ch] font-display text-[44px] font-medium leading-[0.96] tracking-normal text-primary sm:text-[58px] lg:text-[68px]">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 max-w-[66ch] text-[17px] leading-[1.75] text-foreground/82">
            {copy.heroSubtitle}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {copy.primaryCta}
            </a>
            <Link
              href={`/${locale}/listings`}
              className="inline-flex h-11 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="rounded-[14px] bg-primary p-6 text-primary-foreground ring-1 ring-primary-foreground/10">
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-normal">
            {copy.summaryTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {copy.summaryItems.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.55] text-primary-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
            {copy.judgmentTitle}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-foreground/82">
            {copy.judgmentText}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {copy.cards.map((card) => (
            <div
              key={card}
              className="rounded-[12px] bg-paper p-5 ring-1 ring-primary/10 shadow-sm"
            >
              <h3 className="font-display text-[24px] font-medium leading-[1.08] tracking-normal text-primary">
                {card}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[14px] bg-primary p-6 text-primary-foreground ring-1 ring-primary-foreground/10 sm:p-8">
        <div className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div>
            <div className="font-display text-[84px] font-medium leading-none tracking-normal text-primary-foreground">
              25%
            </div>
            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/70">
              {copy.downPaymentLabel}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-normal sm:text-4xl">
              {copy.programsTitle}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-primary-foreground/84">
              {copy.programsText}
            </p>
            <p className="mt-5 rounded-[10px] bg-primary-foreground/10 p-4 text-[14px] leading-[1.6] text-primary-foreground/86">
              {copy.programsNote}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-start">
        <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
          {copy.reviewTitle}
        </h2>
        <ul className="grid gap-3">
          {copy.reviewItems.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[12px] bg-paper p-4 ring-1 ring-primary/10"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="text-[15px] leading-[1.65] text-foreground/84">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="max-w-[14ch] font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
          {copy.processTitle}
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {copy.steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[12px] bg-surface p-5 ring-1 ring-primary/10"
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </div>
              <h3 className="font-display text-[23px] font-medium leading-[1.08] tracking-normal text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-foreground/78">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[14px] bg-paper p-6 ring-1 ring-primary/10 shadow-sm sm:p-8">
        <div className="max-w-[72ch]">
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary sm:text-4xl">
            {copy.experienceTitle}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-foreground/84">
            {copy.experienceText}
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-[14px] bg-primary p-6 text-center text-primary-foreground ring-1 ring-primary-foreground/10 sm:p-8">
        <h2 className="mx-auto max-w-[18ch] font-display text-3xl font-medium leading-[1.05] tracking-normal sm:text-4xl">
          {copy.finalTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-primary-foreground/82">
          {copy.finalText}
        </p>
        <div className="mt-6">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary-foreground/10 px-5 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {copy.finalCta}
          </a>
        </div>
      </section>

      <p className="mx-auto mt-6 max-w-[90ch] text-center text-[12px] leading-[1.65] text-foreground/70">
        {copy.disclaimer}
      </p>
    </div>
  );
}
