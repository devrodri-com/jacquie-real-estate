import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";
import { buildJacquieWhatsAppHref } from "@/lib/whatsapp";

type Locale = "es" | "en" | "fr";

type FinancingCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroThesis: string;
  heroText: string;
  credential: string;
  primaryCta: string;
  secondaryCta: string;
  ctaHelper: string;
  newTabLabel: string;
  structureLabel: string;
  structureTitle: string;
  structureText: string;
  variableItems: { title: string; text: string }[];
  experienceLabel: string;
  experienceTitle: string;
  experienceText: string;
  preparationLabel: string;
  preparationTitle: string;
  realtorRoleLabel: string;
  realtorRoleText: string;
  institutionRoleLabel: string;
  institutionRoleText: string;
  referenceLabel: string;
  referenceTitle: string;
  referenceDisclaimer: string;
  roleDisclaimerLabel: string;
  roleDisclaimer: string;
  closingLabel: string;
  closingTitle: string;
  closingText: string;
  whatsAppMessage: string;
};

const COPY: Record<Locale, FinancingCopy> = {
  es: {
    metaTitle: "Financiación para comprar en Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financiación para compradores e inversores que consideran una compra en Miami, con una mirada prudente sobre el contexto, las variables y los próximos pasos.",
    eyebrow: "Financiación inmobiliaria",
    heroTitle: "Financiación para comprar en Miami",
    heroThesis: "Una mirada más completa sobre la estructura de la compra.",
    heroText:
      "Puedo ayudarte a reunir la información relevante y ubicar la financiación dentro de la decisión inmobiliaria antes de avanzar.",
    credential: "Realtor en Miami",
    primaryCta: "Hablar por WhatsApp",
    secondaryCta: "Contacto",
    ctaHelper: "No hace falta tener todo definido para empezar.",
    newTabLabel: "Se abre en una pestaña nueva.",
    structureLabel: "La compra en contexto",
    structureTitle: "La financiación forma parte de la estructura de la compra",
    structureText:
      "Puede influir en el presupuesto, la documentación y el tipo de propiedad que conviene considerar. Estos factores varían según el caso y no constituyen requisitos universales ni una lista de documentos obligatorios. Tampoco determinan por sí solos que haya financiación disponible.",
    variableItems: [
      {
        title: "Objetivo y contexto de compra",
        text: "El uso previsto y el momento de la decisión ayudan a definir las prioridades de la compra.",
      },
      {
        title: "Presupuesto y capital disponible",
        text: "El presupuesto estimado y el capital disponible ofrecen referencias iniciales para considerar distintos escenarios.",
      },
      {
        title: "Perfil y documentación",
        text: "La entidad puede solicitar información distinta según las características de cada caso.",
      },
      {
        title: "Tipo de propiedad y entidad",
        text: "El tipo de propiedad, las condiciones vigentes y la entidad financiera pueden influir en la planificación de la compra.",
      },
    ],
    experienceLabel: "Experiencia aplicada",
    experienceTitle: "Experiencia financiera aplicada al proceso inmobiliario",
    experienceText:
      "Cuento con más de 15 años de experiencia en Finanzas trabajando en empresas del S&P 500. Esa trayectoria me permite aportar claridad a la información disponible, considerar escenarios de compra y formular preguntas más precisas dentro del proceso inmobiliario.",
    preparationLabel: "Antes de avanzar",
    preparationTitle: "Preparar la información antes de avanzar",
    realtorRoleLabel: "Jacquie puede ayudar a",
    realtorRoleText:
      "Relacionar las variables relevantes, preparar preguntas y coordinar próximos pasos inmobiliarios.",
    institutionRoleLabel: "La entidad financiera determina",
    institutionRoleText:
      "Evaluar el perfil, la documentación y la propiedad; definir las condiciones y tomar la decisión final.",
    referenceLabel: "Referencia posible",
    referenceTitle: "En algunos casos, un pago inicial del 25% puede servir como referencia.",
    referenceDisclaimer:
      "Esta referencia no es una regla universal ni garantiza un préstamo o resultado alguno. La disponibilidad, el porcentaje aplicable y las demás condiciones dependen de la evaluación de la entidad financiera, la documentación, el perfil del comprador, el tipo de propiedad, las condiciones vigentes de la entidad y la aprobación final.",
    roleDisclaimerLabel: "Alcance de la información",
    roleDisclaimer:
      "Información general. Jacquie Zarate actúa como Realtor y brinda acompañamiento inmobiliario; no actúa como prestamista, corredora hipotecaria, asesora de crédito ni asesora financiera, fiscal o legal. La entidad financiera correspondiente determina la disponibilidad, las condiciones y la decisión final. No se garantiza financiación, aprobación ni resultado alguno.",
    closingLabel: "Próximo paso",
    closingTitle: "Conversemos sobre la estructura de tu compra",
    closingText:
      "Cuéntame tu objetivo y las preguntas de financiación relacionadas con tu compra. Puedo ayudarte a coordinar los próximos pasos inmobiliarios.",
    whatsAppMessage:
      "Hola Jacquie, quisiera conversar sobre la financiación para una compra que estoy considerando en Miami.",
  },
  en: {
    metaTitle: "Financing for a Miami purchase | Jacquie Zarate Realtor",
    metaDescription:
      "Financing for buyers and investors considering a Miami purchase, with a careful look at context, relevant factors, and next steps.",
    eyebrow: "Real estate financing",
    heroTitle: "Financing a Miami property purchase",
    heroThesis: "A broader view of how the purchase can be structured.",
    heroText:
      "I can help you gather the relevant information, identify the factors worth clarifying, and understand how financing fits into the broader real estate decision before moving forward.",
    credential: "Miami Realtor",
    primaryCta: "Message Jacquie on WhatsApp",
    secondaryCta: "Contact",
    ctaHelper: "You do not need to have everything figured out to begin.",
    newTabLabel: "Opens in a new tab.",
    structureLabel: "The purchase in context",
    structureTitle: "Financing is part of the purchase structure",
    structureText:
      "It may affect the budget, documentation, and property type worth considering. These factors vary by case and are neither universal requirements nor a mandatory document checklist. On their own, they do not establish that financing is available.",
    variableItems: [
      {
        title: "Purchase goal and context",
        text: "The intended use and timing of the decision help define the purchase priorities.",
      },
      {
        title: "Budget and available capital",
        text: "The estimated budget and available capital provide useful starting points for considering different scenarios.",
      },
      {
        title: "Buyer profile and documentation",
        text: "The institution may request different information depending on the circumstances.",
      },
      {
        title: "Property type and financial institution",
        text: "Property type, current terms, and the financial institution involved may all influence the purchase plan.",
      },
    ],
    experienceLabel: "Experience in practice",
    experienceTitle: "Financial experience applied to the real estate process",
    experienceText:
      "I bring more than 15 years of experience in finance at S&P 500 companies. That background helps me bring clarity to the available information, consider purchase scenarios, and frame more precise questions within the real estate process.",
    preparationLabel: "Before moving forward",
    preparationTitle: "Preparing the information before moving forward",
    realtorRoleLabel: "Jacquie can help",
    realtorRoleText:
      "Clarify relevant factors, prepare questions, and coordinate real estate next steps.",
    institutionRoleLabel: "The financial institution determines",
    institutionRoleText:
      "Review the buyer profile, documentation, and property; set the terms and make the final decision.",
    referenceLabel: "Possible reference",
    referenceTitle: "In some cases, a 25% down payment may serve as an initial reference.",
    referenceDisclaimer:
      "This reference is not a universal standard and does not guarantee a loan or any outcome. Availability, the applicable down payment, and all other terms depend on the financial institution’s review, documentation, buyer profile, property type, the institution’s current terms, and final approval.",
    roleDisclaimerLabel: "Scope of this information",
    roleDisclaimer:
      "This is general information. Jacquie Zarate acts as a Realtor and provides real estate support; she does not act as a lender, mortgage broker, credit adviser, or financial, tax, or legal adviser. The relevant financial institution determines availability, terms, and the final decision. No financing, approval, or outcome is guaranteed.",
    closingLabel: "Next step",
    closingTitle: "Let’s talk about the structure of your purchase",
    closingText:
      "Tell me about your goal and the financing questions related to your purchase. I can help coordinate the next real estate steps.",
    whatsAppMessage:
      "Hi Jacquie, I’d like to discuss financing for a purchase I’m considering in Miami.",
  },
  fr: {
    metaTitle: "Financement d’un achat à Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financement pour les acheteurs et investisseurs qui envisagent un achat à Miami, avec une approche rigoureuse du contexte, des facteurs à considérer et des prochaines étapes.",
    eyebrow: "Financement immobilier",
    heroTitle: "Financer l’achat d’une propriété à Miami",
    heroThesis: "Une vision plus complète de la structure de l’achat.",
    heroText:
      "Je peux vous aider à rassembler les renseignements pertinents et à situer le financement dans l’ensemble de la décision immobilière avant d’aller plus loin.",
    credential: "Realtor à Miami",
    primaryCta: "Écrire à Jacquie sur WhatsApp",
    secondaryCta: "Contact",
    ctaHelper: "Il n’est pas nécessaire que tout soit défini pour commencer.",
    newTabLabel: "S’ouvre dans un nouvel onglet.",
    structureLabel: "Le projet d’achat en contexte",
    structureTitle: "Le financement fait partie de la structure de l’achat",
    structureText:
      "Il peut influer sur le budget, les documents et le type de propriété à considérer. Ces facteurs varient selon la situation et ne constituent ni des exigences universelles ni une liste de documents obligatoires. À eux seuls, ils ne signifient pas qu’un financement est offert.",
    variableItems: [
      {
        title: "Objectif et contexte de l’achat",
        text: "L’usage prévu et le moment de la décision aident à définir les priorités de l’achat.",
      },
      {
        title: "Budget et capitaux disponibles",
        text: "Le budget estimé et les capitaux disponibles offrent des points de repère pour examiner différents scénarios.",
      },
      {
        title: "Profil de l’acheteur et documents",
        text: "L’institution peut demander des renseignements différents selon les particularités de chaque situation.",
      },
      {
        title: "Type de propriété et institution financière",
        text: "Le type de propriété, les conditions en vigueur et l’institution financière peuvent influer sur la planification de l’achat.",
      },
    ],
    experienceLabel: "L’expérience en pratique",
    experienceTitle: "Une expérience financière appliquée au processus immobilier",
    experienceText:
      "Je compte plus de 15 ans d’expérience en finance au sein d’entreprises du S&P 500. Cette expérience m’aide à clarifier les renseignements disponibles, à examiner différents scénarios d’achat et à formuler des questions plus précises dans le cadre du processus immobilier.",
    preparationLabel: "Avant d’aller plus loin",
    preparationTitle: "Préparer les renseignements avant d’aller plus loin",
    realtorRoleLabel: "Jacquie peut aider à",
    realtorRoleText:
      "Clarifier les facteurs pertinents, préparer les questions et coordonner les prochaines étapes immobilières.",
    institutionRoleLabel: "L’institution financière détermine",
    institutionRoleText:
      "Analyser le profil de l’acheteur, les documents et la propriété; établir les conditions et prendre la décision finale.",
    referenceLabel: "Point de repère possible",
    referenceTitle:
      "Dans certains cas, une mise de fonds de 25 % peut servir de point de repère initial.",
    referenceDisclaimer:
      "Ce point de repère n’est pas une règle universelle et ne garantit ni l’obtention d’un prêt ni quelque résultat que ce soit. La disponibilité, le pourcentage de mise de fonds applicable et toute autre condition dépendent de l’analyse de l’institution financière, des documents, du profil de l’acheteur, du type de propriété, des conditions alors en vigueur et de l’approbation finale.",
    roleDisclaimerLabel: "Portée de ces renseignements",
    roleDisclaimer:
      "Ces renseignements sont de nature générale. Jacquie Zarate agit comme Realtor et offre un accompagnement immobilier; elle n’agit pas comme prêteuse, courtière hypothécaire, conseillère en crédit ni conseillère financière, fiscale ou juridique. L’institution financière concernée détermine la disponibilité, les conditions et la décision finale. Aucun financement, aucune approbation et aucun résultat ne sont garantis.",
    closingLabel: "Prochaine étape",
    closingTitle: "Parlons de la structure de votre achat",
    closingText:
      "Parlez-moi de votre objectif et des questions de financement liées à votre achat. Je peux vous aider à coordonner les prochaines étapes immobilières.",
    whatsAppMessage:
      "Bonjour Jacquie, j’aimerais discuter du financement pour un achat que j’envisage à Miami.",
  },
};

const FULL_BLEED = "relative left-1/2 w-[100dvw] -translate-x-1/2";
const CONTAINER = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.19em] text-primary/70 sm:text-xs";
const H2 =
  "text-balance font-display text-[clamp(2rem,4.2vw,3.35rem)] font-medium leading-[1.02] tracking-[-0.025em] text-primary";
const PRIMARY_CTA =
  "inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground no-underline transition hover:-translate-y-0.5 hover:bg-primary/92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none";
const SECONDARY_CTA =
  "inline-flex min-h-11 items-center justify-center rounded-[6px] border border-primary px-6 py-3 text-center text-sm font-semibold text-primary no-underline transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transition-none";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
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
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = COPY[locale];
  const whatsAppHref = buildJacquieWhatsAppHref(locale, copy.whatsAppMessage);
  const contactHref = "/" + locale + "/contacto";

  return (
    <div className="-mb-[72px] text-foreground sm:-mb-16">
      <section
        aria-labelledby="financing-hero-title"
        className={FULL_BLEED + " bg-paper pt-7 pb-8 sm:py-10 lg:py-14"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <p className={EYEBROW}>{copy.eyebrow}</p>
              <h1
                id="financing-hero-title"
                className="mt-4 max-w-[13ch] text-balance font-display text-[clamp(2.6rem,6vw,4.375rem)] font-medium leading-[0.99] tracking-[-0.035em] text-primary"
              >
                {copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-[30ch] font-display text-[clamp(1.35rem,2.4vw,1.8rem)] leading-[1.16] tracking-[-0.012em] text-primary/82">
                {copy.heroThesis}
              </p>
            </div>

            <div className="border-l-2 border-accent pl-5 sm:pl-7">
              <p className="max-w-[48ch] text-[16px] leading-[1.7] text-foreground/80 sm:text-[18px]">
                {copy.heroText}
              </p>
              <p className="mt-4 max-w-[46ch] text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.14em] text-primary/72 sm:text-xs">
                {copy.credential}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_CTA}
                >
                  {copy.primaryCta}
                  <span className="sr-only"> {copy.newTabLabel}</span>
                </a>
                <Link href={contactHref} className={SECONDARY_CTA}>
                  {copy.secondaryCta}
                </Link>
              </div>
              <p className="mt-3 max-w-[48ch] text-[13px] leading-[1.6] text-foreground/68">
                {copy.ctaHelper}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financing-structure-title"
        className={FULL_BLEED + " bg-background py-8 sm:py-12 lg:py-14"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className={EYEBROW}>{copy.structureLabel}</p>
              <h2 id="financing-structure-title" className={H2 + " mt-4 max-w-[15ch]"}>
                {copy.structureTitle}
              </h2>
              <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.72] text-foreground/74 sm:text-[16px]">
                {copy.structureText}
              </p>
            </div>

            <dl aria-labelledby="financing-structure-title" className="border-t border-primary/16">
              {copy.variableItems.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-1.5 border-b border-primary/16 py-3.5 sm:py-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-7"
                >
                  <dt className="font-display text-[1.3rem] leading-[1.12] text-primary sm:text-[1.4rem]">
                    {item.title}
                  </dt>
                  <dd className="text-[14px] leading-[1.62] text-foreground/72">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financing-experience-title"
        className={FULL_BLEED + " bg-paper py-8 sm:py-12 lg:py-14"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className={EYEBROW}>{copy.experienceLabel}</p>
              <h2
                id="financing-experience-title"
                className={H2 + " mt-4 max-w-none"}
              >
                {copy.experienceTitle}
              </h2>
            </div>
            <div className="lg:pt-6">
              <p className="max-w-[65ch] text-[16px] leading-[1.72] text-foreground/78 sm:text-[17px]">
                {copy.experienceText}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-primary/16 pt-8 sm:mt-10 sm:pt-10">
            <div className="grid gap-8 lg:grid-cols-[1.32fr_0.68fr] lg:items-start lg:gap-14">
              <div>
                <p className={EYEBROW}>{copy.preparationLabel}</p>
                <h2
                  id="financing-preparation-title"
                  className={H2 + " mt-4 max-w-[15ch]"}
                >
                  {copy.preparationTitle}
                </h2>

                <dl className="mt-6 grid gap-5 border-t border-primary/16 pt-5 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.17em] text-primary/72">
                      {copy.realtorRoleLabel}
                    </dt>
                    <dd className="mt-2.5 text-[14px] leading-[1.62] text-foreground/72 sm:text-[15px]">
                      {copy.realtorRoleText}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.17em] text-primary/72">
                      {copy.institutionRoleLabel}
                    </dt>
                    <dd className="mt-2.5 text-[14px] leading-[1.62] text-foreground/72 sm:text-[15px]">
                      {copy.institutionRoleText}
                    </dd>
                  </div>
                </dl>
              </div>

              <aside
                aria-labelledby="financing-reference-title"
                className="rounded-[4px] bg-primary px-5 py-5 text-primary-foreground sm:px-6 sm:py-6 lg:max-w-[360px] lg:justify-self-end"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/72 sm:text-[11px]">
                  {copy.referenceLabel}
                </p>
                <h3
                  id="financing-reference-title"
                  className="mt-3 text-balance font-display text-[clamp(1.35rem,2.3vw,1.85rem)] leading-[1.1] tracking-[-0.015em]"
                >
                  {copy.referenceTitle}
                </h3>
                <p className="mt-4 border-t border-primary-foreground/18 pt-4 text-[13px] leading-[1.62] text-primary-foreground/84 sm:text-[14px]">
                  {copy.referenceDisclaimer}
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financing-close-title"
        className={FULL_BLEED + " bg-background py-6 sm:py-8 lg:py-10"}
      >
        <div className={CONTAINER}>
          <div className="border-y border-primary/16 py-6 sm:py-8">
            <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
              <div>
                <p className={EYEBROW}>{copy.closingLabel}</p>
                <h2 id="financing-close-title" className={H2 + " mt-4 max-w-[15ch]"}>
                  {copy.closingTitle}
                </h2>
              </div>
              <div>
                <p className="max-w-[58ch] text-[15px] leading-[1.68] text-foreground/76 sm:text-[16px]">
                  {copy.closingText}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={PRIMARY_CTA}
                  >
                    {copy.primaryCta}
                    <span className="sr-only"> {copy.newTabLabel}</span>
                  </a>
                  <Link href={contactHref} className={SECONDARY_CTA}>
                    {copy.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>

            <aside
              aria-label={copy.roleDisclaimerLabel}
              className="mt-6 border-t border-primary/16 pt-4 sm:mt-7 sm:pt-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-primary/72 sm:text-[11px]">
                {copy.roleDisclaimerLabel}
              </p>
              <p className="mt-2.5 max-w-[105ch] text-[13px] leading-[1.62] text-foreground/70 sm:text-[14px]">
                {copy.roleDisclaimer}
              </p>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
