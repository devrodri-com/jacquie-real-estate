import type { Metadata } from "next";
import {
  createPageMetadata,
  normalizeLocale,
  type SiteLocale,
} from "@/lib/seo";

type PrivacyCopy = {
  title: string;
  description: string;
  intro: string;
  sections: Array<{ title: string; paragraphs: string[]; items?: string[] }>;
  googlePrivacy: string;
  updates: string;
};

const PRIVACY_COPY: Record<SiteLocale, PrivacyCopy> = {
  es: {
    title: "Política de privacidad y analítica | Jacquie Zárate",
    description:
      "Información factual sobre el uso de Google Analytics, el consentimiento y los canales de contacto de jacquiezarate.com.",
    intro:
      "Esta página explica de forma clara qué herramientas utiliza jacquiezarate.com en relación con Analytics y cómo podés decidir sobre ese uso. No constituye asesoramiento legal ni una declaración de cumplimiento normativo total.",
    sections: [
      {
        title: "Responsable y contacto",
        paragraphs: [
          "El sitio es responsabilidad de Jacquie Zárate y corresponde al dominio jacquiezarate.com.",
          "Para consultas, podés comunicarte por WhatsApp o por email directo a jacqueline@miamiliferealty.com. El formulario productivo se encuentra deshabilitado.",
        ],
      },
      {
        title: "Google Analytics",
        paragraphs: [
          "Google Analytics 4 (GA4) se carga únicamente después de que aceptás Analytics desde el aviso de privacidad. Si continuás sin Analytics, no se carga el script de Analytics ni se envían eventos de Analytics.",
          "La configuración mide páginas vistas, cambios de navegación, scrolls, descargas y clics en WhatsApp. Los cambios de ruta se miden mediante la función de medición mejorada de GA4; el sitio no envía pageviews manuales desde React.",
        ],
        items: [
          "Retención configurada en GA4: 14 meses.",
          "Google Signals: desactivado.",
          "Personalización de anuncios: desactivada.",
          "Datos proporcionados por el usuario: desactivados.",
          "Interacciones con formularios: desactivadas.",
          "No se envían a Analytics tu nombre, email, teléfono ni el contenido de tus mensajes.",
        ],
      },
      {
        title: "Consentimiento y almacenamiento",
        paragraphs: [
          "Podés aceptar Analytics o continuar sin Analytics. La decisión puede cambiarse posteriormente desde el enlace Configuración de privacidad del footer.",
          "La elección se guarda localmente en tu navegador con una clave de consentimiento versionada. Las cookies de Analytics solo se crean después de aceptar. Si el almacenamiento local no está disponible, el sitio conserva una decisión válida durante la sesión y no activa Analytics por defecto.",
        ],
      },
      {
        title: "Tercero involucrado",
        paragraphs: [
          "Cuando aceptás Analytics, la herramienta es proporcionada por Google Analytics / Google LLC. Podés consultar la información de privacidad de Google en el sitio oficial.",
        ],
      },
    ],
    googlePrivacy: "Documentación de privacidad de Google",
    updates:
      "Este texto puede actualizarse si cambian las herramientas, la configuración de Analytics o los canales disponibles. La fecha de publicación no se presenta como una certificación legal.",
  },
  en: {
    title: "Privacy and analytics policy | Jacquie Zárate",
    description:
      "Factual information about Google Analytics, consent, and the contact channels used by jacquiezarate.com.",
    intro:
      "This page explains in plain language which Analytics-related tools jacquiezarate.com uses and how you can decide about them. It is not legal advice and does not claim complete regulatory compliance.",
    sections: [
      {
        title: "Controller and contact",
        paragraphs: [
          "The site is operated by Jacquie Zárate and belongs to the jacquiezarate.com domain.",
          "You can get in touch through WhatsApp or direct email at jacqueline@miamiliferealty.com. The production contact form is disabled.",
        ],
      },
      {
        title: "Google Analytics",
        paragraphs: [
          "Google Analytics 4 (GA4) loads only after you accept Analytics through the privacy notice. If you continue without Analytics, the Analytics script is not loaded and Analytics events are not sent.",
          "The configuration measures page views, navigation changes, scrolls, downloads, and WhatsApp clicks. Route changes are measured through GA4 Enhanced Measurement; the site does not send manual pageviews from React.",
        ],
        items: [
          "GA4 retention setting: 14 months.",
          "Google Signals: off.",
          "Ads personalization: off.",
          "User-provided data: off.",
          "Form interactions: off.",
          "Your name, email, phone number, and message content are not sent to Analytics.",
        ],
      },
      {
        title: "Consent and storage",
        paragraphs: [
          "You can accept Analytics or continue without Analytics. You can change your decision later through the Privacy settings link in the footer.",
          "Your choice is stored locally in your browser using a versioned consent key. Analytics cookies are created only after you accept. If local storage is unavailable, the site keeps a valid decision for the session and does not enable Analytics by default.",
        ],
      },
      {
        title: "Third party",
        paragraphs: [
          "When you accept Analytics, the tool is provided by Google Analytics / Google LLC. You can review Google’s privacy information through its official documentation.",
        ],
      },
    ],
    googlePrivacy: "Google privacy documentation",
    updates:
      "This text may be updated if the tools, Analytics configuration, or available contact channels change. Its publication is not presented as a legal certification.",
  },
  fr: {
    title: "Politique de confidentialité et analytique | Jacquie Zárate",
    description:
      "Renseignements factuels sur Google Analytics, le consentement et les moyens de contact de jacquiezarate.com.",
    intro:
      "Cette page explique clairement les outils liés à l’analytique utilisés par jacquiezarate.com et la façon dont vous pouvez choisir de les autoriser. Elle ne constitue pas un avis juridique et ne prétend pas démontrer une conformité réglementaire complète.",
    sections: [
      {
        title: "Responsable et contact",
        paragraphs: [
          "Le site est exploité par Jacquie Zárate et correspond au domaine jacquiezarate.com.",
          "Vous pouvez communiquer par WhatsApp ou par courriel direct à jacqueline@miamiliferealty.com. Le formulaire de contact en production est désactivé.",
        ],
      },
      {
        title: "Google Analytics",
        paragraphs: [
          "Google Analytics 4 (GA4) se charge uniquement après votre acceptation d’Analytics dans l’avis de confidentialité. Si vous continuez sans Analytics, le script Analytics ne se charge pas et aucun événement Analytics n’est envoyé.",
          "La configuration mesure les pages vues, les changements de navigation, les défilements, les téléchargements et les clics vers WhatsApp. Les changements de route sont mesurés par la mesure améliorée de GA4; le site n’envoie pas de pages vues manuelles depuis React.",
        ],
        items: [
          "Rétention configurée dans GA4 : 14 mois.",
          "Google Signals : désactivé.",
          "Personnalisation des annonces : désactivée.",
          "Données fournies par l’utilisateur : désactivées.",
          "Interactions avec les formulaires : désactivées.",
          "Votre nom, votre courriel, votre numéro de téléphone et le contenu de vos messages ne sont pas envoyés à Analytics.",
        ],
      },
      {
        title: "Consentement et stockage",
        paragraphs: [
          "Vous pouvez accepter Analytics ou continuer sans Analytics. Vous pouvez modifier votre décision plus tard avec le lien Paramètres de confidentialité du pied de page.",
          "Votre choix est enregistré localement dans votre navigateur au moyen d’une clé de consentement versionnée. Les témoins Analytics ne sont créés qu’après votre acceptation. Si le stockage local n’est pas disponible, le site conserve une décision valide pendant la session et n’active pas Analytics par défaut.",
        ],
      },
      {
        title: "Tiers",
        paragraphs: [
          "Lorsque vous acceptez Analytics, l’outil est fourni par Google Analytics / Google LLC. Vous pouvez consulter les renseignements de confidentialité de Google dans sa documentation officielle.",
        ],
      },
    ],
    googlePrivacy: "Documentation de confidentialité de Google",
    updates:
      "Ce texte peut être mis à jour si les outils, la configuration d’Analytics ou les moyens de contact disponibles changent. Sa publication n’est pas présentée comme une certification juridique.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = PRIVACY_COPY[locale];

  return createPageMetadata({
    locale,
    path: "privacidad",
    title: copy.title,
    description: copy.description,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = PRIVACY_COPY[locale];

  return (
    <article className="w-full py-10 sm:py-14 lg:py-20">
      <header className="max-w-[820px] border-t border-border-brand pt-7 sm:pt-9">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {locale === "en"
            ? "Privacy"
            : locale === "fr"
              ? "Confidentialité"
              : "Privacidad"}
        </p>
        <h1 className="mt-3 max-w-[17ch] font-display text-[clamp(2.45rem,6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.035em] text-primary">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-[70ch] text-[16px] leading-[1.75] text-foreground/78 sm:text-[18px]">
          {copy.intro}
        </p>
      </header>

      <div className="mt-12 max-w-[900px] border-t border-primary/14 sm:mt-16">
        {copy.sections.map((section) => (
          <section
            key={section.title}
            className="border-b border-primary/14 py-7 sm:py-9"
          >
            <h2 className="font-display text-[28px] font-medium leading-tight text-primary sm:text-[34px]">
              {section.title}
            </h2>
            <div className="mt-4 max-w-[74ch] space-y-4 text-[15px] leading-[1.75] text-foreground/76 sm:text-[16px]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.items ? (
              <ul className="mt-5 max-w-[74ch] list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-foreground/76 sm:text-[16px]">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.title === "Tercero involucrado" ||
            section.title === "Third party" ||
            section.title === "Tiers" ? (
              <a
                href={`https://policies.google.com/privacy?hl=${
                  locale === "fr" ? "fr" : locale
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                {copy.googlePrivacy}
              </a>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-8 max-w-[74ch] text-sm leading-6 text-foreground/64">
        {copy.updates}
      </p>
    </article>
  );
}
