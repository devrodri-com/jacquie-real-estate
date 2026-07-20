import {
  buildJacquieWhatsAppHref,
  normalizeSiteLocale,
  type SiteLocale,
} from "@/lib/whatsapp";

export type LetsGoMiamiLocale = SiteLocale;

export type LetsGoMiamiGalleryLabels = {
  viewAll: string;
  openImage: string;
  dialog: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
};

export type LetsGoMiamiImage = {
  src: string;
  alt: Record<LetsGoMiamiLocale, string>;
};

export const LETS_GO_MIAMI_EMAIL = "jacnaservices@gmail.com";
export const LETS_GO_MIAMI_PHONE_DISPLAY = "+1 786 407 2591";
export const LETS_GO_MIAMI_PHONE_HREF = "tel:+17864072591";

export const LETS_GO_MIAMI_IMAGES: LetsGoMiamiImage[] = [
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-hero.jpg",
    alt: {
      es: "Vista al agua desde un condo de renta corta en Sunny Isles.",
      en: "Waterfront view from a short-stay condo in Sunny Isles.",
      fr: "Vue sur l’eau depuis un condo de courte durée à Sunny Isles.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-01.jpg",
    alt: {
      es: "Living moderno de un condo para estadías en Miami.",
      en: "Modern living room in a Miami short-stay condo.",
      fr: "Salon moderne dans un condo pour séjour à Miami.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-02.jpg",
    alt: {
      es: "Dormitorio luminoso en un condo de renta corta.",
      en: "Bright bedroom in a short-stay condo.",
      fr: "Chambre lumineuse dans un condo de courte durée.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-03.jpg",
    alt: {
      es: "Cocina equipada en un condo para estadías en Miami.",
      en: "Equipped kitchen in a Miami short-stay condo.",
      fr: "Cuisine équipée dans un condo pour séjour à Miami.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-04.jpg",
    alt: {
      es: "Living con vista en un condo de renta corta.",
      en: "Living area with a view in a short-stay condo.",
      fr: "Salon avec vue dans un condo de courte durée.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-05.jpg",
    alt: {
      es: "Balcón privado con vista al agua en Sunny Isles.",
      en: "Private balcony with water view in Sunny Isles.",
      fr: "Balcon privé avec vue sur l’eau à Sunny Isles.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-06.jpg",
    alt: {
      es: "Baño moderno en un condo para estadías.",
      en: "Modern bathroom in a short-stay condo.",
      fr: "Salle de bain moderne dans un condo de courte durée.",
    },
  },
  {
    src: "https://ik.imagekit.io/devrodri/Estadias_ImageKit_Final/sunny-isles-stay-07.jpg",
    alt: {
      es: "Dormitorio adicional en un condo para estadías en Miami.",
      en: "Additional bedroom in a Miami short-stay condo.",
      fr: "Chambre additionnelle dans un condo pour séjour à Miami.",
    },
  },
];

export const LETS_GO_MIAMI_COPY = {
  es: {
    metaTitle: "Let’s Go Miami | Estadías de renta corta en Sunny Isles",
    metaDescription:
      "Estadías de renta corta en Sunny Isles, con un mínimo de seis noches. Tarifas y disponibilidad según fechas, temporada y cantidad de huéspedes.",
    header: {
      mainSite: "Sitio de Jacquie Zárate",
      mainSiteMobile: "Volver al sitio de Jacquie",
      cta: "Consultar disponibilidad",
      logoAria: "Let’s Go Miami, by Jacna Services LLC",
      navAria: "Navegación de Let’s Go Miami",
      languages: "Idiomas",
      skipLink: "Ir al contenido de Let’s Go Miami",
    },
    hero: {
      eyebrow: "Vacation Condo Management",
      title: "Estadías de renta corta en Sunny Isles",
      body:
        "Disfruta Sunny Isles con la comodidad y la privacidad de una estadía residencial. Comparte tus fechas y cuántas personas viajan; te orientamos de forma directa y personal.",
      stayNote: "Estadía mínima de seis noches",
      primaryCta: "Consultar disponibilidad",
      secondaryCta: "Escribir por email",
    },
    gallery: {
      eyebrow: "La experiencia",
      title: "Espacios para sentirte a gusto",
      text: "Espacios luminosos, ambientes cómodos y el ritmo relajado de Sunny Isles.",
      labels: {
        viewAll: "Ver todas las fotos",
        openImage: "Abrir foto",
        dialog: "Galería de fotos de Let’s Go Miami",
        close: "Cerrar galería",
        previous: "Foto anterior",
        next: "Foto siguiente",
        counter: "Foto {current} de {total}",
      },
    },
    practical: {
      eyebrow: "Información práctica",
      title: "Lo esencial para tu estadía",
      amenitiesTitle: "Comodidades habituales",
      amenitiesIntro: "Según la opción confirmada, las comodidades pueden incluir:",
      amenities: ["Piscina", "Spa", "Gimnasio", "Patio techado"],
      stayTitle: "Estadía",
      stayLabel: "Mínimo",
      stayValue: "6 noches",
    },
    inquiry: {
      eyebrow: "Consulta personalizada",
      title: "Consulta según tus fechas",
      body: "Para orientarte mejor, comparte estos datos por WhatsApp o email:",
      items: [
        { label: "Fechas", text: "Llegada y salida estimadas." },
        { label: "Huéspedes", text: "Cantidad de personas que viajan." },
        { label: "Duración", text: "Cantidad de noches." },
        { label: "Necesidades", text: "Cualquier preferencia, necesidad o duda relevante." },
      ],
    },
    disclaimer: {
      label: "A tener en cuenta",
      text:
        "Las fotografías son reales y representan el tipo de condos que puede ofrecer Let’s Go Miami; no corresponden a una unidad específica publicada en esta página. Las opciones, tarifas y disponibilidad varían según las fechas, la temporada y la cantidad de huéspedes. No se publican la dirección exacta, el número de unidad ni un precio fijo por noche.",
    },
    closing: {
      eyebrow: "Contacto directo",
      title: "Cuéntanos tus fechas",
      body:
        "Incluye la cantidad de huéspedes, la duración estimada y cualquier duda. Te responderemos personalmente.",
      primaryCta: "Consultar disponibilidad",
      secondaryCta: "Escribir por email",
    },
    contact: {
      whatsappMessage:
        "Hola, quiero consultar una estadía con Let’s Go Miami. Fechas: ____. Huéspedes: ____. Duración: ____. Necesidades o dudas: ____.",
      emailSubject: "Consulta de estadía | Let’s Go Miami",
      emailBody:
        "Hola,\n\nQuiero consultar una estadía con Let’s Go Miami.\nFechas:\nHuéspedes:\nDuración:\nNecesidades o dudas:\n\nGracias.",
    },
    footer: {
      tagline: "Estadías de renta corta en Sunny Isles.",
      contactTitle: "Contacto",
      emailLabel: "Escribir a Let’s Go Miami por email",
      phoneLabel: "Llamar a Let’s Go Miami",
      whatsappLabel: "Consultar por WhatsApp con Let’s Go Miami",
      mainSiteLink: "Visitar el sitio inmobiliario de Jacquie Zárate",
      rights: "Todos los derechos reservados.",
      madeBy: "Diseño y desarrollo por Rodrigo Opalo",
      logoAlt: "Logo de Let’s Go Miami",
    },
  },
  en: {
    metaTitle: "Let’s Go Miami | Short stays in Sunny Isles",
    metaDescription:
      "Short stays in Sunny Isles with a six-night minimum. Rates and availability vary by dates, season, and number of guests.",
    header: {
      mainSite: "Jacquie Zárate’s site",
      mainSiteMobile: "Back to Jacquie’s site",
      cta: "Check availability",
      logoAria: "Let’s Go Miami, by Jacna Services LLC",
      navAria: "Let’s Go Miami navigation",
      languages: "Languages",
      skipLink: "Skip to Let’s Go Miami content",
    },
    hero: {
      eyebrow: "Vacation Condo Management",
      title: "Short stays in Sunny Isles",
      body:
        "Enjoy Sunny Isles with the comfort and privacy of a residential stay. Share your dates and group size, and we’ll guide you personally from there.",
      stayNote: "Six-night minimum stay",
      primaryCta: "Check availability",
      secondaryCta: "Send an email",
    },
    gallery: {
      eyebrow: "The experience",
      title: "Spaces that feel like home",
      text: "Light-filled spaces, comfortable surroundings, and the relaxed pace of Sunny Isles.",
      labels: {
        viewAll: "View all photos",
        openImage: "Open photo",
        dialog: "Let’s Go Miami photo gallery",
        close: "Close gallery",
        previous: "Previous photo",
        next: "Next photo",
        counter: "Photo {current} of {total}",
      },
    },
    practical: {
      eyebrow: "Good to know",
      title: "What to know for your stay",
      amenitiesTitle: "Common amenities",
      amenitiesIntro: "Depending on the option confirmed for your stay, amenities may include:",
      amenities: ["Pool", "Spa", "Gym", "Covered patio"],
      stayTitle: "Stay",
      stayLabel: "Minimum",
      stayValue: "6 nights",
    },
    inquiry: {
      eyebrow: "Personal guidance",
      title: "Start with your dates",
      body: "To help us guide your inquiry, share these details by WhatsApp or email:",
      items: [
        { label: "Dates", text: "Estimated arrival and departure." },
        { label: "Guests", text: "Number of people traveling." },
        { label: "Length of stay", text: "Number of nights." },
        { label: "Needs", text: "Any preference, need, or question that matters to your stay." },
      ],
    },
    disclaimer: {
      label: "Good to know",
      text:
        "The photographs are real and represent the type of condos Let’s Go Miami may offer; this page does not advertise a specific unit. Options, rates, and availability vary by dates, season, and number of guests. Exact addresses, unit numbers, and fixed nightly rates are not published.",
    },
    closing: {
      eyebrow: "Direct contact",
      title: "Tell us your dates",
      body:
        "Include your group size, estimated length of stay, and any questions. We’ll get back to you personally.",
      primaryCta: "Check availability",
      secondaryCta: "Send an email",
    },
    contact: {
      whatsappMessage:
        "Hi, I’d like to inquire about a stay with Let’s Go Miami. Dates: ____. Guests: ____. Length of stay: ____. Needs or questions: ____.",
      emailSubject: "Stay inquiry | Let’s Go Miami",
      emailBody:
        "Hi,\n\nI’d like to inquire about a stay with Let’s Go Miami.\nDates:\nGuests:\nLength of stay:\nNeeds or questions:\n\nThank you.",
    },
    footer: {
      tagline: "Short stays in Sunny Isles.",
      contactTitle: "Contact",
      emailLabel: "Email Let’s Go Miami",
      phoneLabel: "Call Let’s Go Miami",
      whatsappLabel: "Contact Let’s Go Miami on WhatsApp",
      mainSiteLink: "Visit Jacquie Zárate’s real estate site",
      rights: "All rights reserved.",
      madeBy: "Designed and developed by Rodrigo Opalo",
      logoAlt: "Let’s Go Miami logo",
    },
  },
  fr: {
    metaTitle: "Let’s Go Miami | Séjours de courte durée à Sunny Isles",
    metaDescription:
      "Séjours de courte durée à Sunny Isles, pour un minimum de six nuits. Tarifs et disponibilités selon les dates, la saison et le nombre de voyageurs.",
    header: {
      mainSite: "Site de Jacquie Zárate",
      mainSiteMobile: "Retour au site de Jacquie",
      cta: "Vérifier la disponibilité",
      logoAria: "Let’s Go Miami, par Jacna Services LLC",
      navAria: "Navigation de Let’s Go Miami",
      languages: "Langues",
      skipLink: "Aller au contenu de Let’s Go Miami",
    },
    hero: {
      eyebrow: "Vacation Condo Management",
      title: "Séjours de courte durée à Sunny Isles",
      body:
        "Profitez de Sunny Isles dans le confort et l’intimité d’un séjour en condo. Indiquez-nous vos dates et le nombre de voyageurs. Nous vous guiderons personnellement pour la suite.",
      stayNote: "Séjour minimum de six nuits",
      primaryCta: "Vérifier la disponibilité",
      secondaryCta: "Écrire par courriel",
    },
    gallery: {
      eyebrow: "L’expérience",
      title: "Des espaces où vous sentir chez vous",
      text: "Des espaces lumineux, un cadre confortable et le rythme détendu de Sunny Isles.",
      labels: {
        viewAll: "Voir toutes les photos",
        openImage: "Ouvrir la photo",
        dialog: "Galerie de photos de Let’s Go Miami",
        close: "Fermer la galerie",
        previous: "Photo précédente",
        next: "Photo suivante",
        counter: "Photo {current} sur {total}",
      },
    },
    practical: {
      eyebrow: "Renseignements pratiques",
      title: "L’essentiel pour votre séjour",
      amenitiesTitle: "Commodités habituelles",
      amenitiesIntro:
        "Selon l’option confirmée pour votre séjour, les commodités peuvent comprendre :",
      amenities: ["Piscine", "Spa", "Salle d’entraînement", "Patio couvert"],
      stayTitle: "Séjour",
      stayLabel: "Minimum",
      stayValue: "6 nuits",
    },
    inquiry: {
      eyebrow: "Accompagnement personnalisé",
      title: "Commencez par vos dates",
      body:
        "Pour nous aider à bien vous orienter, transmettez-nous ces renseignements par WhatsApp ou par courriel :",
      items: [
        { label: "Dates", text: "Dates prévues d’arrivée et de départ." },
        { label: "Voyageurs", text: "Nombre de personnes." },
        { label: "Durée", text: "Nombre de nuits." },
        { label: "Besoins", text: "Toute préférence, tout besoin ou toute question à prendre en compte." },
      ],
    },
    disclaimer: {
      label: "À savoir",
      text:
        "Les photos sont réelles et représentent le type de condos que Let’s Go Miami peut proposer. Cette page ne présente aucune unité en particulier. Les options, les tarifs et les disponibilités varient selon les dates, la saison et le nombre de voyageurs. L’adresse exacte, le numéro d’unité et un tarif fixe par nuit ne sont pas publiés.",
    },
    closing: {
      eyebrow: "Contact direct",
      title: "Indiquez-nous vos dates",
      body:
        "Ajoutez le nombre de voyageurs, la durée prévue et toute question. Nous vous répondrons personnellement.",
      primaryCta: "Vérifier la disponibilité",
      secondaryCta: "Écrire par courriel",
    },
    contact: {
      whatsappMessage:
        "Bonjour, j’aimerais me renseigner sur un séjour avec Let’s Go Miami. Dates : ____. Nombre de voyageurs : ____. Durée : ____. Besoins ou questions : ____.",
      emailSubject: "Demande de séjour | Let’s Go Miami",
      emailBody:
        "Bonjour,\n\nJ’aimerais me renseigner sur un séjour avec Let’s Go Miami.\nDates :\nNombre de voyageurs :\nDurée :\nBesoins ou questions :\n\nMerci.",
    },
    footer: {
      tagline: "Séjours de courte durée à Sunny Isles.",
      contactTitle: "Contact",
      emailLabel: "Écrire à Let’s Go Miami par courriel",
      phoneLabel: "Appeler Let’s Go Miami",
      whatsappLabel: "Communiquer avec Let’s Go Miami sur WhatsApp",
      mainSiteLink: "Visiter le site immobilier de Jacquie Zárate",
      rights: "Tous droits réservés.",
      madeBy: "Conception et développement par Rodrigo Opalo",
      logoAlt: "Logo de Let’s Go Miami",
    },
  },
} as const satisfies Record<SiteLocale, object>;

export function normalizeLetsGoMiamiLocale(raw: string): LetsGoMiamiLocale {
  return normalizeSiteLocale(raw);
}

export function buildLetsGoMiamiWhatsAppHref(locale: LetsGoMiamiLocale): string {
  return buildJacquieWhatsAppHref(locale, LETS_GO_MIAMI_COPY[locale].contact.whatsappMessage);
}

export function buildLetsGoMiamiEmailHref(locale: LetsGoMiamiLocale): string {
  const contact = LETS_GO_MIAMI_COPY[locale].contact;
  return `mailto:${LETS_GO_MIAMI_EMAIL}?subject=${encodeURIComponent(contact.emailSubject)}&body=${encodeURIComponent(contact.emailBody)}`;
}
