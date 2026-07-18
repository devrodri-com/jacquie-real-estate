import type { SiteLocale } from "@/lib/whatsapp";

export type ListingsCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  availabilityNote: string;
  inventoryTitle: string;
  inventoryCount: (count: number) => string;
  emptyTitle: string;
  emptyBody: string;
  emptyLink: string;
  card: {
    bedroom: [singular: string, plural: string];
    bathroom: [singular: string, plural: string];
    area: string;
    mls: string;
    cta: string;
    ariaLabel: (title: string) => string;
  };
  search: {
    eyebrow: string;
    title: string;
    body: string;
    criteriaLabel: string;
    criteria: readonly string[];
    primaryCta: string;
    secondaryCta: string;
    whatsAppMessage: string;
  };
};

const COPY: Record<SiteLocale, ListingsCopy> = {
  es: {
    eyebrow: "Propiedades en Miami",
    title: "Explora propiedades disponibles",
    intro:
      "Revisa el precio, la ubicación y las características principales de las propiedades publicadas. Si buscas algo diferente, Jacquie puede ayudarte a orientar la búsqueda según tu objetivo.",
    availabilityNote:
      "La disponibilidad, el precio y las condiciones pueden cambiar. Confirma los detalles antes de avanzar.",
    inventoryTitle: "Propiedades publicadas",
    inventoryCount: (count) =>
      count === 1 ? "1 propiedad disponible" : `${count} propiedades disponibles`,
    emptyTitle: "No hay propiedades publicadas en este momento",
    emptyBody:
      "La disponibilidad puede cambiar. Puedes contarle a Jacquie qué estás buscando para conversar sobre tu objetivo y tus prioridades.",
    emptyLink: "Ir a búsqueda personalizada",
    card: {
      bedroom: ["habitación", "habitaciones"],
      bathroom: ["baño", "baños"],
      area: "ft²",
      mls: "MLS",
      cta: "Ver propiedad",
      ariaLabel: (title) => `Ver propiedad: ${title}`,
    },
    search: {
      eyebrow: "Búsqueda personalizada",
      title: "Cuéntame qué propiedad estás buscando",
      body:
        "Las propiedades visibles son las publicadas actualmente. Si ninguna se ajusta a tu objetivo, podemos conversar sobre cómo orientar una búsqueda según tus necesidades.",
      criteriaLabel: "Para orientar la conversación",
      criteria: [
        "Zona",
        "Presupuesto",
        "Tipo de propiedad",
        "Uso personal o inversión",
        "Necesidades específicas",
      ],
      primaryCta: "Hablar sobre mi búsqueda",
      secondaryCta: "Ir a Contacto",
      whatsAppMessage:
        "Hola Jacquie, estoy buscando una propiedad en Miami. Quiero contarte la zona, mi presupuesto, el tipo de propiedad y si es para uso personal o inversión.",
    },
  },
  en: {
    eyebrow: "Miami properties",
    title: "Explore available properties",
    intro:
      "Review the price, location, and key features of each published property. If you are looking for something different, Jacquie can help focus the search around your goal.",
    availabilityNote:
      "Availability, price, and terms may change. Confirm the details before moving forward.",
    inventoryTitle: "Published properties",
    inventoryCount: (count) =>
      count === 1 ? "1 property available" : `${count} properties available`,
    emptyTitle: "There are no properties published right now",
    emptyBody:
      "Availability may change. Tell Jacquie what you are looking for so you can discuss your goal and priorities together.",
    emptyLink: "Go to personalized search",
    card: {
      bedroom: ["bedroom", "bedrooms"],
      bathroom: ["bathroom", "bathrooms"],
      area: "sq ft",
      mls: "MLS",
      cta: "View property",
      ariaLabel: (title) => `View property: ${title}`,
    },
    search: {
      eyebrow: "Personalized search",
      title: "Tell me what kind of property you’re looking for",
      body:
        "The properties shown are those currently published. If none aligns with your goal, we can discuss how to focus a search around your needs.",
      criteriaLabel: "To focus the conversation",
      criteria: [
        "Area",
        "Budget",
        "Property type",
        "Personal use or investment",
        "Specific needs",
      ],
      primaryCta: "Talk about my search",
      secondaryCta: "Go to Contact",
      whatsAppMessage:
        "Hi Jacquie, I’m looking for a property in Miami. I’d like to share the area, my budget, the property type, and whether it is for personal use or investment.",
    },
  },
  fr: {
    eyebrow: "Propriétés à Miami",
    title: "Découvrez les propriétés disponibles",
    intro:
      "Consultez le prix, l’emplacement et les caractéristiques principales de chaque propriété publiée. Si vous cherchez autre chose, Jacquie peut vous aider à orienter la recherche selon votre objectif.",
    availabilityNote:
      "La disponibilité, le prix et les conditions peuvent changer. Confirmez les détails avant d’aller de l’avant.",
    inventoryTitle: "Propriétés publiées",
    inventoryCount: (count) =>
      count === 1 ? "1 propriété disponible" : `${count} propriétés disponibles`,
    emptyTitle: "Aucune propriété n’est publiée en ce moment",
    emptyBody:
      "La disponibilité peut changer. Parlez à Jacquie de ce que vous recherchez afin de discuter de votre objectif et de vos priorités.",
    emptyLink: "Aller à la recherche personnalisée",
    card: {
      bedroom: ["chambre", "chambres"],
      bathroom: ["salle de bain", "salles de bain"],
      area: "pi²",
      mls: "MLS",
      cta: "Voir la propriété",
      ariaLabel: (title) => `Voir la propriété : ${title}`,
    },
    search: {
      eyebrow: "Recherche personnalisée",
      title: "Parlez-moi de la propriété que vous recherchez",
      body:
        "Les propriétés présentées sont celles qui sont publiées actuellement. Si aucune ne correspond à votre objectif, nous pouvons discuter de la façon d’orienter une recherche selon vos besoins.",
      criteriaLabel: "Pour orienter la conversation",
      criteria: [
        "Secteur",
        "Budget",
        "Type de propriété",
        "Usage personnel ou investissement",
        "Besoins particuliers",
      ],
      primaryCta: "Parler de ma recherche",
      secondaryCta: "Aller à la page Contact",
      whatsAppMessage:
        "Bonjour Jacquie, je cherche une propriété à Miami. J’aimerais vous préciser le secteur, mon budget, le type de propriété et s’il s’agit d’un usage personnel ou d’un investissement.",
    },
  },
};

export function getListingsCopy(locale: SiteLocale) {
  return COPY[locale];
}
