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
  };
  location: {
    eyebrow: string;
    title: string;
    mapPrompt: string;
  };
  close: {
    eyebrow: string;
    title: string;
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
      `Hola Jacquie, quiero conocer más sobre la propiedad en ${address}. ¿Podemos conversar sobre ella y los próximos pasos?`,
    gallery: {
      eyebrow: "Recorrido visual",
      title: "Conoce los espacios",
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
      eyebrow: "Descripción",
      title: "La propiedad",
    },
    amenities: {
      eyebrow: "Características",
      title: "Comodidades",
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
      eyebrow: "Acompañamiento de Jacquie",
      title: "Conoce mejor esta propiedad",
      intro:
        "Jacquie puede ayudarte a resolver dudas y coordinar los próximos pasos según lo que estás buscando.",
    },
    location: {
      eyebrow: "Ubicación",
      title: "Dónde está la propiedad",
      mapPrompt: "Ubica la dirección en el mapa.",
    },
    close: {
      eyebrow: "Próximo paso",
      title: "Conversemos sobre esta propiedad",
      body:
        "Puedes preguntarle a Jacquie por esta propiedad, coordinar una visita o contarle qué estás buscando.",
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
      `Hi Jacquie, I’d like to learn more about the property at ${address}. Could we discuss it and the next steps?`,
    gallery: {
      eyebrow: "Visual tour",
      title: "Explore the spaces",
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
      eyebrow: "Overview",
      title: "The property",
    },
    amenities: {
      eyebrow: "Features",
      title: "Amenities",
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
      eyebrow: "Guidance from Jacquie",
      title: "Get to know this property better",
      intro:
        "Jacquie can help answer your questions and coordinate the next steps based on what you’re looking for.",
    },
    location: {
      eyebrow: "Location",
      title: "Where the property is located",
      mapPrompt: "Locate the address on the map.",
    },
    close: {
      eyebrow: "Next step",
      title: "Let’s talk about this property",
      body:
        "You can ask Jacquie about this property, schedule a visit, or tell her what you’re looking for.",
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
      `Bonjour Jacquie, j’aimerais en savoir plus sur la propriété située à l’adresse suivante : ${address}. Pourrions-nous en discuter et voir les prochaines étapes?`,
    gallery: {
      eyebrow: "Visite en images",
      title: "Découvrez les espaces",
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
      eyebrow: "Description",
      title: "La propriété",
    },
    amenities: {
      eyebrow: "Caractéristiques",
      title: "Commodités",
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
      eyebrow: "L’accompagnement de Jacquie",
      title: "Mieux connaître cette propriété",
      intro:
        "Jacquie peut répondre à vos questions et coordonner les prochaines étapes en fonction de ce que vous recherchez.",
    },
    location: {
      eyebrow: "Emplacement",
      title: "Où se trouve la propriété",
      mapPrompt: "Repérez l’adresse sur la carte.",
    },
    close: {
      eyebrow: "Prochaine étape",
      title: "Parlons de cette propriété",
      body:
        "Vous pouvez demander à Jacquie des renseignements sur cette propriété, planifier une visite ou lui expliquer ce que vous recherchez.",
    },
  },
};

export function getListingDetailCopy(locale: SiteLocale) {
  return COPY[locale];
}
