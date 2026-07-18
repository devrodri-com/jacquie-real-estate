import type { SiteLocale } from "@/lib/seo";

export type ListingGalleryLabels = {
  dialog: string;
  viewAll: string;
  photo: string;
  openPhoto: string;
  of: string;
  close: string;
  previous: string;
  next: string;
};

type ListingDetailCopy = {
  breadcrumb: string;
  residenceLabel: (propertyType: string, city: string) => string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  mls: string;
  whatsapp: string;
  contact: string;
  whatsappMessage: (address: string) => string;
  gallery: {
    eyebrow: string;
    title: string;
    count: (count: number) => string;
    labels: (name: string, count: number) => ListingGalleryLabels;
  };
  overview: {
    eyebrow: string;
    title: string;
  };
  amenities: {
    eyebrow: string;
    title: string;
  };
  details: {
    eyebrow: string;
    title: string;
    type: string;
    yearBuilt: string;
    hoaMonthly: string;
    view: string;
    rentals: string;
    pets: string;
    parking: string;
    waterfront: string;
    furnished: string;
    yes: string;
  };
  advisor: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly string[];
  };
  location: {
    eyebrow: string;
    title: string;
    mapPrompt: string;
  };
  close: {
    eyebrow: string;
    title: (propertyTitle: string) => string;
    body: string;
  };
};

const COPY: Record<SiteLocale, ListingDetailCopy> = {
  es: {
    breadcrumb: "Volver a Propiedades",
    residenceLabel: (propertyType, city) => `${propertyType} en ${city}`,
    price: "Precio",
    bedrooms: "Dormitorios",
    bathrooms: "Baños",
    area: "Superficie",
    mls: "Referencia MLS",
    whatsapp: "Consultar por WhatsApp",
    contact: "Enviar una consulta",
    whatsappMessage: (address) =>
      `Hola Jacquie, quiero consultar por la propiedad en ${address}. Me gustaría confirmar sus condiciones y próximos pasos.`,
    gallery: {
      eyebrow: "Recorrido visual",
      title: "Galería de la propiedad",
      count: (count) => `${count} fotos`,
      labels: (name, count) => ({
        dialog: `Galería de fotos de ${name}`,
        viewAll: `Ver las ${count} fotos`,
        photo: "foto",
        openPhoto: "Abrir la foto",
        of: "de",
        close: "Cerrar galería",
        previous: "Foto anterior",
        next: "Foto siguiente",
      }),
    },
    overview: {
      eyebrow: "La residencia",
      title: "Una mirada a la propiedad",
    },
    amenities: {
      eyebrow: "Comodidades",
      title: "Servicios y detalles incluidos",
    },
    details: {
      eyebrow: "Ficha residencial",
      title: "Detalles para evaluar",
      type: "Tipo",
      yearBuilt: "Año",
      hoaMonthly: "HOA / mes",
      view: "Vista",
      rentals: "Alquileres",
      pets: "Mascotas",
      parking: "Estacionamiento",
      waterfront: "Frente al agua",
      furnished: "Amueblado",
      yes: "Sí",
    },
    advisor: {
      eyebrow: "Antes de decidir",
      title: "Qué conviene confirmar antes de avanzar",
      intro:
        "Jacquie puede ayudarte a ordenar la conversación y las preguntas relevantes para esta propiedad.",
      items: [
        "Documentación y condiciones del edificio que conviene confirmar.",
        "Reglas de renta y costos aplicables que deben revisarse.",
        "Financiación, uso previsto y próximos pasos según tu situación.",
      ],
    },
    location: {
      eyebrow: "Ubicación",
      title: "Dónde está la propiedad",
      mapPrompt: "Ubica la dirección en el mapa.",
    },
    close: {
      eyebrow: "Próximo paso",
      title: (propertyTitle) => `Conversemos sobre ${propertyTitle}`,
      body:
        "Pregunta por las condiciones de esta propiedad o cuéntale a Jacquie qué tipo de alternativa estás evaluando.",
    },
  },
  en: {
    breadcrumb: "Back to Properties",
    residenceLabel: (propertyType, city) => `${propertyType} in ${city}`,
    price: "Price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area",
    mls: "MLS reference",
    whatsapp: "Ask on WhatsApp",
    contact: "Send an inquiry",
    whatsappMessage: (address) =>
      `Hi Jacquie, I’d like to ask about the property at ${address}. I’d like to confirm its terms and next steps.`,
    gallery: {
      eyebrow: "Visual tour",
      title: "Property gallery",
      count: (count) => `${count} photos`,
      labels: (name, count) => ({
        dialog: `Photo gallery for ${name}`,
        viewAll: `View all ${count} photos`,
        photo: "photo",
        openPhoto: "Open photo",
        of: "of",
        close: "Close gallery",
        previous: "Previous photo",
        next: "Next photo",
      }),
    },
    overview: {
      eyebrow: "The residence",
      title: "A closer look at the property",
    },
    amenities: {
      eyebrow: "Amenities",
      title: "Included services and details",
    },
    details: {
      eyebrow: "Residential profile",
      title: "Details to evaluate",
      type: "Type",
      yearBuilt: "Year built",
      hoaMonthly: "HOA / month",
      view: "View",
      rentals: "Rentals",
      pets: "Pets",
      parking: "Parking",
      waterfront: "Waterfront",
      furnished: "Furnished",
      yes: "Yes",
    },
    advisor: {
      eyebrow: "Before you decide",
      title: "What to confirm before moving forward",
      intro:
        "Jacquie can help structure the conversation and the questions that matter for this property.",
      items: [
        "Building documentation and conditions that should be confirmed.",
        "Rental rules and applicable costs that need to be reviewed.",
        "Financing, intended use, and next steps for your situation.",
      ],
    },
    location: {
      eyebrow: "Location",
      title: "Where the property is located",
      mapPrompt: "Locate the address on the map.",
    },
    close: {
      eyebrow: "Next step",
      title: (propertyTitle) => `Let’s discuss ${propertyTitle}`,
      body:
        "Ask about this property’s terms, or tell Jacquie what kind of alternative you are considering.",
    },
  },
  fr: {
    breadcrumb: "Retour aux propriétés",
    residenceLabel: (propertyType, city) => `${propertyType} à ${city}`,
    price: "Prix",
    bedrooms: "Chambres",
    bathrooms: "Salles de bain",
    area: "Superficie",
    mls: "Référence MLS",
    whatsapp: "Poser une question sur WhatsApp",
    contact: "Envoyer une demande",
    whatsappMessage: (address) =>
      `Bonjour Jacquie, j’aimerais me renseigner sur la propriété située à l’adresse suivante : ${address}. Je souhaite confirmer ses conditions et les prochaines étapes.`,
    gallery: {
      eyebrow: "Visite en images",
      title: "Galerie de la propriété",
      count: (count) => `${count} photos`,
      labels: (name, count) => ({
        dialog: `Galerie de photos de ${name}`,
        viewAll: `Voir les ${count} photos`,
        photo: "photo",
        openPhoto: "Ouvrir la photo",
        of: "sur",
        close: "Fermer la galerie",
        previous: "Photo précédente",
        next: "Photo suivante",
      }),
    },
    overview: {
      eyebrow: "La résidence",
      title: "Un aperçu de la propriété",
    },
    amenities: {
      eyebrow: "Commodités",
      title: "Services et détails inclus",
    },
    details: {
      eyebrow: "Profil résidentiel",
      title: "Détails à évaluer",
      type: "Type",
      yearBuilt: "Année de construction",
      hoaMonthly: "HOA / mois",
      view: "Vue",
      rentals: "Location",
      pets: "Animaux",
      parking: "Stationnement",
      waterfront: "En bord de l’eau",
      furnished: "Meublé",
      yes: "Oui",
    },
    advisor: {
      eyebrow: "Avant de décider",
      title: "Ce qu’il convient de confirmer avant d’aller de l’avant",
      intro:
        "Jacquie peut vous aider à structurer la conversation et les questions pertinentes pour cette propriété.",
      items: [
        "La documentation et les conditions de l’immeuble à confirmer.",
        "Les règles de location et les coûts applicables à examiner.",
        "Le financement, l’usage prévu et les prochaines étapes selon votre situation.",
      ],
    },
    location: {
      eyebrow: "Emplacement",
      title: "Où se trouve la propriété",
      mapPrompt: "Repérez l’adresse sur la carte.",
    },
    close: {
      eyebrow: "Prochaine étape",
      title: (propertyTitle) => `Parlons de ${propertyTitle}`,
      body:
        "Posez vos questions sur les conditions de cette propriété ou indiquez à Jacquie le type d’alternative que vous envisagez.",
    },
  },
};

export function getListingDetailCopy(locale: SiteLocale) {
  return COPY[locale];
}
