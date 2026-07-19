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
  heroText: string;
  credential: string;
  primaryCta: string;
  secondaryCta: string;
  ctaHelper: string;
  newTabLabel: string;
  thesisLabel: string;
  thesisTitle: string;
  thesisText: string;
  thesisContext: string;
  variablesLabel: string;
  variablesTitle: string;
  variablesIntro: string;
  variableItems: { title: string; text: string }[];
  experienceLabel: string;
  experienceTitle: string;
  experienceText: string;
  experienceStatement: string;
  preparationLabel: string;
  preparationTitle: string;
  preparationText: string;
  realtorRoleLabel: string;
  realtorRoleText: string;
  institutionRoleLabel: string;
  institutionRoleText: string;
  referenceLabel: string;
  referenceTitle: string;
  referenceStat: string;
  referenceStatLabel: string;
  referenceDisclaimer: string;
  roleDisclaimerLabel: string;
  roleDisclaimer: string;
  closingLabel: string;
  closingTitle: string;
  closingText: string;
  finalCta: string;
  whatsAppMessage: string;
};

const COPY: Record<Locale, FinancingCopy> = {
  es: {
    metaTitle: "Financiación para comprar en Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financiación para compradores e inversores que consideran una compra en Miami, con una mirada prudente sobre el contexto, las variables y los próximos pasos.",
    eyebrow: "Financiación inmobiliaria",
    heroTitle: "Financiación para comprar en Miami con una mirada más completa",
    heroText:
      "Cada compra reúne decisiones inmobiliarias y financieras. Puedo ayudarte a ordenar la información, identificar preguntas relevantes y preparar una conversación clara antes de avanzar.",
    credential: "Realtor en Miami · Más de 15 años de experiencia en Finanzas",
    primaryCta: "Hablar por WhatsApp",
    secondaryCta: "Contacto",
    ctaHelper: "Comparte el contexto que ya tengas. No hace falta tener todo definido.",
    newTabLabel: "Se abre en una pestaña nueva.",
    thesisLabel: "La compra en contexto",
    thesisTitle: "La financiación no es un dato aislado",
    thesisText:
      "Forma parte de la estructura de la compra y puede influir en cómo se organiza, qué información conviene reunir y qué preguntas deben aclararse. No existe una fórmula única: cada escenario parte de su propio contexto.",
    thesisContext:
      "El contexto puede ser distinto para una compra de uso personal, una compra como inversión o el caso de un comprador internacional. Ninguno de esos escenarios determina por sí solo que exista financiación disponible.",
    variablesLabel: "Variables y preparación",
    variablesTitle: "Factores que pueden orientar la conversación",
    variablesIntro:
      "Según cada situación, algunos de estos elementos pueden ser relevantes. No son requisitos universales ni una lista de documentos obligatorios.",
    variableItems: [
      {
        title: "Objetivo y contexto de compra",
        text: "El uso previsto y el momento de la decisión ayudan a enmarcar la conversación.",
      },
      {
        title: "Presupuesto y capital disponible",
        text: "Estas referencias pueden ayudar a enmarcar la conversación inicial sin determinar por sí solas un resultado.",
      },
      {
        title: "Perfil y documentación",
        text: "Pueden influir según lo que cada entidad decida solicitar y evaluar en ese caso.",
      },
      {
        title: "Tipo de propiedad y entidad",
        text: "El tipo de propiedad puede influir; las condiciones vigentes y la aprobación final corresponden a la entidad financiera.",
      },
    ],
    experienceLabel: "Experiencia aplicada",
    experienceTitle: "Experiencia financiera para ordenar la conversación inmobiliaria",
    experienceText:
      "Soy Realtor en Miami y trabajo en Real Estate y Property Management en la ciudad desde 2023. También cuento con más de 15 años de experiencia en Finanzas en empresas del S&P 500. Esa trayectoria me ayuda a acompañar el proceso con orden y a formular preguntas más precisas, siempre dentro de mi trabajo inmobiliario.",
    experienceStatement:
      "Más claridad para preparar la conversación, sin sustituir la evaluación de una entidad financiera.",
    preparationLabel: "Antes de avanzar",
    preparationTitle: "Llegar con más contexto, no con todas las respuestas",
    preparationText:
      "Puede ser útil reunir la información ya disponible sobre la compra y anotar las preguntas que se quieren aclarar. Puedo ayudarte a ordenar ese contexto y a coordinar los próximos pasos dentro del proceso inmobiliario.",
    realtorRoleLabel: "Lo que puedo aportar",
    realtorRoleText:
      "Conectar las variables con la compra, ordenar preguntas relevantes y coordinar los próximos pasos inmobiliarios.",
    institutionRoleLabel: "Lo que decide la entidad",
    institutionRoleText:
      "Evaluar el perfil, la documentación y la propiedad, definir sus condiciones y tomar la decisión final.",
    referenceLabel: "Solo como referencia",
    referenceTitle:
      "Un pago inicial del 25% puede servir como referencia en algunos casos",
    referenceStat: "25%",
    referenceStatLabel: "pago inicial",
    referenceDisclaimer:
      "El 25% es solo una referencia posible en algunos casos: no es una regla universal ni garantiza un préstamo ni un resultado. Toda financiación depende de la evaluación, la documentación, el perfil del comprador, el tipo de propiedad, las condiciones de la entidad financiera y su aprobación final.",
    roleDisclaimerLabel: "Alcance de la información",
    roleDisclaimer:
      "Esta página ofrece información general. Como Realtor, brindo acompañamiento inmobiliario; no actúo como prestamista, corredora hipotecaria ni asesora de crédito, financiera, fiscal o legal. La disponibilidad, el pago inicial y las demás condiciones dependen de la entidad financiera, la documentación, el perfil del comprador, el tipo de propiedad, las condiciones vigentes y la aprobación final. No se garantiza financiación, aprobación ni resultado alguno.",
    closingLabel: "Próximo paso",
    closingTitle: "Una conversación clara antes de avanzar",
    closingText:
      "Si estás considerando una compra en Miami, puedo ayudarte a ordenar las preguntas sobre financiación dentro de la decisión inmobiliaria y a coordinar los próximos pasos.",
    finalCta: "Hablar por WhatsApp",
    whatsAppMessage:
      "Hola Jacquie, quisiera conversar sobre la financiación para una compra que estoy considerando en Miami.",
  },
  en: {
    metaTitle: "Financing for a Miami purchase | Jacquie Zarate Realtor",
    metaDescription:
      "Financing for buyers and investors considering a Miami purchase, with a careful look at context, relevant factors, and next steps.",
    eyebrow: "Real estate financing",
    heroTitle: "A broader view of financing for a Miami purchase",
    heroText:
      "Every purchase brings together real estate and financial decisions. I can help you organize the information, identify the questions that matter, and prepare for a clear conversation before moving forward.",
    credential: "Miami Realtor · More than 15 years of experience in finance",
    primaryCta: "Message Jacquie on WhatsApp",
    secondaryCta: "Contact",
    ctaHelper: "Share the context you already have. You do not need to have everything figured out.",
    newTabLabel: "Opens in a new tab.",
    thesisLabel: "The purchase in context",
    thesisTitle: "Financing is not a stand-alone number",
    thesisText:
      "It is part of how the purchase comes together and can shape how it is organized, which information is useful to gather, and which questions should be addressed. There is no one-size-fits-all formula; each scenario begins with its own context.",
    thesisContext:
      "The context may differ for a personal-use purchase, an investment purchase, or a purchase by an international buyer. None of those scenarios, on its own, establishes that financing is available.",
    variablesLabel: "Factors and preparation",
    variablesTitle: "Factors that may shape the conversation",
    variablesIntro:
      "Depending on the purchase, some of these factors may be relevant. They are not universal requirements or a mandatory document checklist.",
    variableItems: [
      {
        title: "Purchase goal and context",
        text: "The intended use and timing of the decision help frame the conversation.",
      },
      {
        title: "Budget and available capital",
        text: "These reference points can help frame the initial conversation without determining an outcome on their own.",
      },
      {
        title: "Buyer profile and documentation",
        text: "They may matter depending on what each institution chooses to request and review.",
      },
      {
        title: "Property type and financial institution",
        text: "Property type may be relevant; current terms and final approval are determined by the financial institution.",
      },
    ],
    experienceLabel: "Experience in practice",
    experienceTitle: "Financial experience that brings structure to the real estate conversation",
    experienceText:
      "I’m a Miami Realtor and have worked in real estate and property management in the city since 2023. I also bring more than 15 years of experience in finance at S&P 500 companies. That background helps me bring structure to the process and frame more focused questions, always within the scope of my real estate work.",
    experienceStatement:
      "More clarity for the conversation, without replacing a financial institution’s review.",
    preparationLabel: "Before moving forward",
    preparationTitle: "Bring context, not every answer",
    preparationText:
      "It may help to gather the information already available about the purchase and note the questions you want to clarify. I can help organize that context and coordinate next steps within the real estate process.",
    realtorRoleLabel: "What I can help with",
    realtorRoleText:
      "Connecting the relevant factors to the purchase, organizing useful questions, and coordinating real estate next steps.",
    institutionRoleLabel: "What the institution decides",
    institutionRoleText:
      "Reviewing the profile, documentation, and property, setting its terms, and making the final decision.",
    referenceLabel: "For reference only",
    referenceTitle:
      "A 25% down payment may serve as a reference point in some cases",
    referenceStat: "25%",
    referenceStatLabel: "down payment",
    referenceDisclaimer:
      "The 25% figure is only a possible reference in some cases; it is not a universal standard and does not guarantee a loan or any particular outcome. Any financing depends on review of the specific case, documentation, the buyer’s profile, property type, the financial institution’s current terms, and its final approval.",
    roleDisclaimerLabel: "Scope of this information",
    roleDisclaimer:
      "This page provides general information. As a Realtor, I offer real estate support; I am not acting as a lender, mortgage broker, credit adviser, or financial, tax, or legal adviser. Availability, the down payment, and all other terms depend on the financial institution, documentation, buyer profile, property type, current terms, and final approval. No financing, approval, or outcome is guaranteed.",
    closingLabel: "Next step",
    closingTitle: "A clear conversation before moving forward",
    closingText:
      "If you are considering a Miami purchase, I can help organize financing questions as part of the purchase decision and coordinate the next steps.",
    finalCta: "Message Jacquie on WhatsApp",
    whatsAppMessage:
      "Hi Jacquie, I’d like to discuss financing for a purchase I’m considering in Miami.",
  },
  fr: {
    metaTitle: "Financement d’un achat à Miami | Jacquie Zarate Realtor",
    metaDescription:
      "Financement pour les acheteurs et investisseurs qui envisagent un achat à Miami, avec une approche rigoureuse du contexte, des facteurs à considérer et des prochaines étapes.",
    eyebrow: "Financement immobilier",
    heroTitle: "Une vue d’ensemble du financement d’un achat à Miami",
    heroText:
      "Chaque achat réunit des décisions immobilières et financières. Je peux vous aider à organiser les renseignements, à cibler les questions pertinentes et à préparer une conversation claire avant d’aller plus loin.",
    credential: "Realtor à Miami · Plus de 15 ans d’expérience en finance",
    primaryCta: "Écrire à Jacquie sur WhatsApp",
    secondaryCta: "Contact",
    ctaHelper: "Partagez les renseignements dont vous disposez déjà. Il n’est pas nécessaire que tout soit défini.",
    newTabLabel: "S’ouvre dans un nouvel onglet.",
    thesisLabel: "Le projet d’achat en contexte",
    thesisTitle: "Le financement ne se résume pas à un chiffre isolé",
    thesisText:
      "Il fait partie de la structure globale de l’achat et peut influencer la façon de l’organiser, les renseignements qu’il peut être utile de rassembler et les questions à clarifier. Il n’existe pas de formule universelle : chaque scénario part de son propre contexte.",
    thesisContext:
      "Le contexte peut varier selon qu’il s’agit d’un achat à usage personnel, d’un achat comme investissement ou du projet d’un acheteur international. Aucun de ces scénarios ne signifie à lui seul qu’un financement est offert.",
    variablesLabel: "Facteurs et préparation",
    variablesTitle: "Facteurs qui peuvent orienter la conversation",
    variablesIntro:
      "Selon le projet, certains de ces éléments peuvent être pertinents. Il ne s’agit ni d’exigences universelles ni d’une liste de documents obligatoires.",
    variableItems: [
      {
        title: "Objectif et contexte de l’achat",
        text: "L’usage prévu et le moment de la décision aident à encadrer la conversation.",
      },
      {
        title: "Budget et capitaux disponibles",
        text: "Ces points de repère peuvent aider à encadrer la conversation initiale sans déterminer à eux seuls un résultat.",
      },
      {
        title: "Profil de l’acheteur et documents",
        text: "Ils peuvent entrer en jeu selon ce que chaque institution choisit de demander et d’analyser.",
      },
      {
        title: "Type de propriété et institution financière",
        text: "Le type de propriété peut entrer en jeu; les conditions en vigueur et l’approbation finale relèvent de l’institution financière.",
      },
    ],
    experienceLabel: "L’expérience en pratique",
    experienceTitle: "Une expérience financière pour mieux structurer la conversation immobilière",
    experienceText:
      "Je suis Realtor à Miami et je travaille dans l’immobilier et la gestion immobilière dans la ville depuis 2023. Je compte aussi plus de 15 ans d’expérience en finance au sein d’entreprises du S&P 500. Cette expérience m’aide à structurer le processus et à formuler des questions plus précises, toujours dans le cadre de mon accompagnement immobilier.",
    experienceStatement:
      "Plus de clarté pour préparer la conversation, sans remplacer l’analyse de l’institution financière.",
    preparationLabel: "Avant d’aller plus loin",
    preparationTitle: "Arriver avec plus de contexte, pas avec toutes les réponses",
    preparationText:
      "Il peut être utile de rassembler les renseignements déjà disponibles sur l’achat et de noter les questions à clarifier. Je peux vous aider à organiser ce contexte et à coordonner les prochaines étapes du processus immobilier.",
    realtorRoleLabel: "Ce que je peux apporter",
    realtorRoleText:
      "Relier les facteurs pertinents à l’achat, organiser les questions utiles et coordonner les prochaines étapes immobilières.",
    institutionRoleLabel: "Ce qui relève de l’institution",
    institutionRoleText:
      "Analyser le profil, les documents et la propriété, établir ses conditions et prendre la décision finale.",
    referenceLabel: "À titre indicatif seulement",
    referenceTitle:
      "Une mise de fonds de 25 % peut servir de point de repère dans certains cas",
    referenceStat: "25 %",
    referenceStatLabel: "mise de fonds",
    referenceDisclaimer:
      "La mise de fonds de 25 % n’est qu’un point de repère possible dans certains cas; ce n’est pas une règle universelle et cela ne garantit ni l’obtention d’un prêt ni un résultat particulier. Tout financement dépend de l’évaluation de la situation, des documents fournis, du profil de l’acheteur, du type de propriété, des conditions de l’institution financière et de son approbation finale.",
    roleDisclaimerLabel: "Portée de ces renseignements",
    roleDisclaimer:
      "Cette page présente des renseignements généraux. En tant que Realtor, j’offre un accompagnement immobilier; je n’agis pas comme prêteuse, courtière hypothécaire, conseillère en crédit ni conseillère financière, fiscale ou juridique. La disponibilité, la mise de fonds et les autres conditions dépendent de l’institution financière, des documents, du profil de l’acheteur, du type de propriété, des conditions en vigueur et de l’approbation finale. Aucun financement, aucune approbation et aucun résultat ne sont garantis.",
    closingLabel: "Prochaine étape",
    closingTitle: "Une conversation claire avant d’aller plus loin",
    closingText:
      "Si vous envisagez un achat à Miami, je peux vous aider à replacer les questions de financement dans le contexte de l’achat et à coordonner les prochaines étapes.",
    finalCta: "Écrire à Jacquie sur WhatsApp",
    whatsAppMessage:
      "Bonjour Jacquie, j’aimerais discuter du financement pour un achat que j’envisage à Miami.",
  },
};

const FULL_BLEED = "relative left-1/2 w-[100dvw] -translate-x-1/2";
const CONTAINER = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.19em] text-primary/70 sm:text-xs";
const H2 =
  "font-display text-[clamp(2.2rem,4.7vw,3.8rem)] font-medium leading-[1.01] tracking-[-0.025em] text-primary";
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
    <div className="-mb-8 text-foreground">
      <section
        aria-labelledby="financing-hero-title"
        className={FULL_BLEED + " bg-paper pt-8 pb-10 sm:py-14 lg:py-20"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-9 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:gap-20">
            <div>
              <p className={EYEBROW}>{copy.eyebrow}</p>
              <h1
                id="financing-hero-title"
                className="mt-4 text-balance font-display text-[clamp(2.65rem,7vw,5rem)] font-medium leading-[1.01] tracking-[-0.035em] text-primary sm:max-w-[15ch] lg:leading-[0.96]"
              >
                {copy.heroTitle}
              </h1>
            </div>

            <div className="border-l-2 border-accent pl-5 sm:pl-7 lg:mb-1">
              <p className="max-w-[48ch] text-[16px] leading-[1.7] text-foreground/80 sm:text-[18px]">
                {copy.heroText}
              </p>
              <p className="mt-5 max-w-[46ch] text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.14em] text-primary/72 sm:text-xs">
                {copy.credential}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              <p className="mt-4 max-w-[48ch] text-[13px] leading-[1.6] text-foreground/68">
                {copy.ctaHelper}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financing-decision-title"
        className={FULL_BLEED + " bg-background py-8 sm:py-16 lg:py-20"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{copy.thesisLabel}</p>
              <h2 id="financing-decision-title" className={H2 + " mt-4 max-w-[13ch]"}>
                {copy.thesisTitle}
              </h2>
            </div>
            <div className="lg:pt-7">
              <p className="max-w-[36ch] font-display text-[clamp(1.35rem,2.9vw,2.45rem)] leading-[1.13] tracking-[-0.015em] text-primary">
                {copy.thesisText}
              </p>
              <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.75] text-foreground/74 sm:text-[17px]">
                {copy.thesisContext}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-primary/16 pt-8 sm:mt-14 sm:pt-10">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <p className={EYEBROW}>{copy.variablesLabel}</p>
                <h3
                  id="financing-variables-title"
                  className="mt-4 max-w-[14ch] font-display text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.04] tracking-[-0.02em] text-primary"
                >
                  {copy.variablesTitle}
                </h3>
                <p className="mt-4 max-w-[47ch] text-[14px] leading-[1.7] text-foreground/70 sm:text-[15px]">
                  {copy.variablesIntro}
                </p>
              </div>

              <dl aria-labelledby="financing-variables-title" className="border-t border-primary/16">
                {copy.variableItems.map((item) => (
                  <div
                    key={item.title}
                    className="grid gap-2 border-b border-primary/16 py-4 sm:py-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8"
                  >
                    <dt className="font-display text-[1.45rem] leading-[1.12] text-primary">
                      {item.title}
                    </dt>
                    <dd className="text-[14px] leading-[1.7] text-foreground/72 sm:text-[15px]">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financing-experience-title"
        className={FULL_BLEED + " bg-paper py-8 sm:py-16 lg:py-20"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <p className={EYEBROW}>{copy.experienceLabel}</p>
              <h2
                id="financing-experience-title"
                className={H2 + " mt-4 max-w-[14ch]"}
              >
                {copy.experienceTitle}
              </h2>
            </div>
            <div className="lg:pt-7">
              <p className="max-w-[64ch] text-[16px] leading-[1.78] text-foreground/78 sm:text-[18px]">
                {copy.experienceText}
              </p>
              <p className="mt-6 max-w-[31ch] border-l-2 border-accent pl-5 font-display text-[clamp(1.5rem,3.1vw,2.6rem)] leading-[1.12] tracking-[-0.015em] text-primary sm:mt-8 sm:pl-7">
                {copy.experienceStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="financing-preparation-title"
        className={FULL_BLEED + " bg-background py-10 sm:py-16 lg:py-20"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1.28fr_0.72fr] lg:items-start lg:gap-16">
            <div>
              <p className={EYEBROW}>{copy.preparationLabel}</p>
              <h2
                id="financing-preparation-title"
                className={H2 + " mt-4 max-w-[14ch]"}
              >
                {copy.preparationTitle}
              </h2>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.75] text-foreground/76 sm:text-[17px]">
                {copy.preparationText}
              </p>

              <dl className="mt-7 grid gap-7 border-t border-primary/16 pt-5 sm:mt-9 sm:pt-7 lg:grid-cols-2 lg:gap-10">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.17em] text-primary/72">
                    {copy.realtorRoleLabel}
                  </dt>
                  <dd className="mt-3 text-[14px] leading-[1.7] text-foreground/72 sm:text-[15px]">
                    {copy.realtorRoleText}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.17em] text-primary/72">
                    {copy.institutionRoleLabel}
                  </dt>
                  <dd className="mt-3 text-[14px] leading-[1.7] text-foreground/72 sm:text-[15px]">
                    {copy.institutionRoleText}
                  </dd>
                </div>
              </dl>
            </div>

            <aside
              aria-labelledby="financing-reference-title"
              className="rounded-[4px] bg-primary p-6 text-primary-foreground sm:p-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/72 sm:text-xs">
                {copy.referenceLabel}
              </p>
              <h3
                id="financing-reference-title"
                className="mt-4 font-display text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.08] tracking-[-0.018em]"
              >
                {copy.referenceTitle}
              </h3>
              <div aria-hidden="true" className="mt-6 border-y border-primary-foreground/18 py-4 sm:mt-7 sm:py-5">
                <p className="font-display text-[clamp(3.1rem,5vw,3.75rem)] leading-[0.9] tracking-[-0.035em]">
                  {copy.referenceStat}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
                  {copy.referenceStatLabel}
                </p>
              </div>
              <p className="mt-5 text-[14px] leading-[1.68] text-primary-foreground/84 sm:mt-6 sm:text-[15px]">
                {copy.referenceDisclaimer}
              </p>
            </aside>
          </div>

          <aside
            aria-label={copy.roleDisclaimerLabel}
            className="mt-8 border-t border-primary/18 pt-5 sm:mt-12 sm:pt-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-primary/72">
              {copy.roleDisclaimerLabel}
            </p>
            <p className="mt-3 max-w-[92ch] text-[14px] leading-[1.68] text-foreground/72">
              {copy.roleDisclaimer}
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="financing-close-title"
        className={FULL_BLEED + " bg-paper py-8 sm:py-12 lg:py-14"}
      >
        <div className={CONTAINER}>
          <div className="grid gap-6 border-y border-primary/16 py-8 sm:py-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16 lg:py-12">
            <div>
              <p className={EYEBROW}>{copy.closingLabel}</p>
              <h2 id="financing-close-title" className={H2 + " mt-4 max-w-[15ch]"}>
                {copy.closingTitle}
              </h2>
            </div>
            <div>
              <p className="max-w-[54ch] text-[15px] leading-[1.75] text-foreground/76 sm:text-[17px]">
                {copy.closingText}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_CTA}
                >
                  {copy.finalCta}
                  <span className="sr-only"> {copy.newTabLabel}</span>
                </a>
                <Link href={contactHref} className={SECONDARY_CTA}>
                  {copy.secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
