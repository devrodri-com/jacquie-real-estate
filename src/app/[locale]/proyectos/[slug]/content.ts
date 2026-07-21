import type { SiteLocale } from "@/lib/seo";

export type ProjectGalleryLabels = Readonly<{
  dialogTitle: string;
  viewAll: string;
  viewImage: string;
  openImage: string;
  counter: string;
  close: string;
  previous: string;
  next: string;
  loading: string;
  loadError: string;
  imageAlt: string;
}>;

type ProjectDetailCopy = {
  utility: {
    back: string;
    share: string;
  };
  opening: {
    eyebrow: string;
    startingPrice: string;
    priceFallback: string;
    delivery: string;
    deliveryFallback: string;
    rental: string;
    rentalFallback: string;
    location: string;
    pricePerArea: string;
    hoa: string;
    furnishing: string;
    furnished: string;
    unfurnished: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappMessage: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    labels: ProjectGalleryLabels;
  };
  overview: {
    eyebrow: string;
    title: string;
    attributes: string;
  };
  typologies: {
    eyebrow: string;
    withSurfaces: {
      title: string;
      intro: string;
    };
    withoutSurfaces: {
      title: string;
      intro: string;
    };
    note: string;
  };
  features: {
    eyebrow: string;
    title: string;
  };
  payment: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  advisor: {
    eyebrow: string;
    title: string;
    text: string;
  };
  location: {
    eyebrow: string;
    title: string;
    mapTitle: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    open: string;
    close: string;
  };
  close: {
    eyebrow: string;
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
  legal: {
    disclaimer: string;
  };
};

export const PROJECT_DETAIL_COPY: Record<SiteLocale, ProjectDetailCopy> = {
  es: {
    utility: {
      back: "Volver a Proyectos",
      share: "Compartir",
    },
    opening: {
      eyebrow: "PROYECTO EN PRECONSTRUCCIÓN",
      startingPrice: "Precio inicial",
      priceFallback: "Precio a consultar",
      delivery: "Entrega estimada",
      deliveryFallback: "A confirmar",
      rental: "Política de renta",
      rentalFallback: "A confirmar",
      location: "Ubicación",
      pricePerArea: "Referencia por ft²",
      hoa: "HOA",
      furnishing: "Amueblamiento",
      furnished: "Amueblado",
      unfurnished: "Sin amueblar",
      primaryCta: "Consultar por WhatsApp",
      secondaryCta: "Enviar una consulta",
      whatsappMessage:
        "Hola Jacquie, quiero conocer más sobre {name}: entrega estimada, plan de pagos, tipologías y condiciones actuales.",
    },
    gallery: {
      eyebrow: "RECORRIDO VISUAL",
      title: "Conoce el proyecto",
      intro:
        "Explora las imágenes publicadas y abre la galería completa para verlas en orden.",
      labels: {
        dialogTitle: "Galería de {name}",
        viewAll: "Ver todas las imágenes ({total})",
        viewImage: "Ver imagen",
        openImage: "Abrir imagen {current} de {total}",
        counter: "{current} de {total}",
        close: "Cerrar galería",
        previous: "Imagen anterior",
        next: "Imagen siguiente",
        loading: "Cargando imagen",
        loadError: "No se pudo cargar la imagen seleccionada.",
        imageAlt: "{name} — imagen {current} de {total}",
      },
    },
    overview: {
      eyebrow: "EL PROYECTO",
      title: "Sobre el proyecto",
      attributes: "Atributos destacados",
    },
    typologies: {
      eyebrow: "CONFIGURACIONES",
      withSurfaces: {
        title: "Tipologías y superficies",
        intro: "Consulta las configuraciones y superficies publicadas.",
      },
      withoutSurfaces: {
        title: "Tipologías del proyecto",
        intro: "Consulta las configuraciones publicadas.",
      },
      note:
        "La disponibilidad de cada tipología se verifica al momento de la consulta.",
    },
    features: {
      eyebrow: "CARACTERÍSTICAS",
      title: "Residencias y amenidades",
    },
    payment: {
      eyebrow: "ESTRUCTURA DE COMPRA",
      title: "Plan de pagos",
      intro:
        "Consulta la secuencia publicada en el orden previsto para el proyecto.",
    },
    advisor: {
      eyebrow: "ACOMPAÑAMIENTO DE JACQUIE",
      title: "Conoce mejor este proyecto",
      text:
        "Jacquie puede ayudarte a entender la ubicación, la entrega estimada, el plan de pagos, las tipologías y las condiciones actuales según lo que estás buscando.",
    },
    location: {
      eyebrow: "UBICACIÓN",
      title: "Ubicación del proyecto",
      mapTitle: "Ubicación de {name}",
    },
    faq: {
      eyebrow: "PREGUNTAS FRECUENTES",
      title: "Información sobre el proyecto",
      open: "Abrir respuesta",
      close: "Cerrar respuesta",
    },
    close: {
      eyebrow: "PRÓXIMO PASO",
      title: "Conversemos sobre este proyecto",
      text:
        "Puedes preguntarle a Jacquie por la entrega, el plan de pagos, las tipologías o las condiciones actuales, y comparar el proyecto con lo que estás buscando.",
      primaryCta: "Consultar por WhatsApp",
      secondaryCta: "Enviar una consulta",
    },
    legal: {
      disclaimer:
        "Los precios, la disponibilidad, las fechas de entrega, las políticas de renta, la financiación y los planes de pago pueden cambiar. Confirma la información, la documentación y las condiciones vigentes antes de tomar una decisión. Este contenido es informativo: no constituye una oferta ni asesoramiento financiero, legal, fiscal o migratorio.",
    },
  },
  en: {
    utility: {
      back: "Back to Projects",
      share: "Share",
    },
    opening: {
      eyebrow: "PRECONSTRUCTION PROJECT",
      startingPrice: "Starting price",
      priceFallback: "Price upon request",
      delivery: "Estimated completion",
      deliveryFallback: "To be confirmed",
      rental: "Rental policy",
      rentalFallback: "To be confirmed",
      location: "Location",
      pricePerArea: "Approximate price per sq ft",
      hoa: "HOA",
      furnishing: "Furnishing",
      furnished: "Furnished",
      unfurnished: "Unfurnished",
      primaryCta: "Ask Jacquie on WhatsApp",
      secondaryCta: "Send an inquiry",
      whatsappMessage:
        "Hi Jacquie, I'd like to learn more about {name}, including its estimated completion, payment schedule, residence types, and current terms.",
    },
    gallery: {
      eyebrow: "VISUAL TOUR",
      title: "Explore the project",
      intro:
        "Explore the published images and open the full gallery to view them in order.",
      labels: {
        dialogTitle: "{name} gallery",
        viewAll: "View all images ({total})",
        viewImage: "View image",
        openImage: "Open image {current} of {total}",
        counter: "{current} of {total}",
        close: "Close gallery",
        previous: "Previous image",
        next: "Next image",
        loading: "Loading image",
        loadError: "The selected image could not be loaded.",
        imageAlt: "{name} — image {current} of {total}",
      },
    },
    overview: {
      eyebrow: "THE PROJECT",
      title: "About the project",
      attributes: "Key attributes",
    },
    typologies: {
      eyebrow: "CONFIGURATIONS",
      withSurfaces: {
        title: "Unit types and sizes",
        intro: "Explore the published unit configurations and sizes.",
      },
      withoutSurfaces: {
        title: "Project unit types",
        intro: "Explore the published unit configurations.",
      },
      note: "Availability for each residence type is verified when you inquire.",
    },
    features: {
      eyebrow: "FEATURES",
      title: "Residences and amenities",
    },
    payment: {
      eyebrow: "PURCHASE STRUCTURE",
      title: "Payment schedule",
      intro:
        "Review the published sequence in the order provided for the project.",
    },
    advisor: {
      eyebrow: "GUIDANCE FROM JACQUIE",
      title: "Get to know this project",
      text:
        "Jacquie can help you understand the location, estimated completion, payment schedule, residence types, and current terms in light of what you're looking for.",
    },
    location: {
      eyebrow: "LOCATION",
      title: "Project location",
      mapTitle: "Location of {name}",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Project information",
      open: "Open answer",
      close: "Close answer",
    },
    close: {
      eyebrow: "NEXT STEP",
      title: "Let's talk about this project",
      text:
        "Ask Jacquie about the estimated completion, payment schedule, residence types, or current terms, and compare the project with what you're looking for.",
      primaryCta: "Ask Jacquie on WhatsApp",
      secondaryCta: "Send an inquiry",
    },
    legal: {
      disclaimer:
        "Prices, availability, delivery timelines, rental policies, financing, and payment schedules may change. Confirm the latest information, applicable documents, and current terms before making a decision. This content is for informational purposes only and does not constitute an offer or financial, legal, tax, or immigration advice.",
    },
  },
  fr: {
    utility: {
      back: "Retour aux projets",
      share: "Partager",
    },
    opening: {
      eyebrow: "PROJET EN PRÉCONSTRUCTION",
      startingPrice: "Prix de départ",
      priceFallback: "Prix sur demande",
      delivery: "Livraison prévue",
      deliveryFallback: "À confirmer",
      rental: "Politique de location",
      rentalFallback: "À confirmer",
      location: "Emplacement",
      pricePerArea: "Prix approximatif par pi²",
      hoa: "Frais de copropriété",
      furnishing: "Ameublement",
      furnished: "Meublé",
      unfurnished: "Non meublé",
      primaryCta: "Écrire à Jacquie sur WhatsApp",
      secondaryCta: "Envoyer une demande",
      whatsappMessage:
        "Bonjour Jacquie, j’aimerais en savoir plus sur {name}, notamment sur la livraison prévue, l’échéancier des dépôts, les types de résidences et les conditions actuelles.",
    },
    gallery: {
      eyebrow: "VISITE EN IMAGES",
      title: "Découvrez le projet",
      intro:
        "Explorez les images publiées et ouvrez la galerie complète pour les parcourir dans l’ordre.",
      labels: {
        dialogTitle: "Galerie de {name}",
        viewAll: "Voir toutes les images ({total})",
        viewImage: "Voir l’image",
        openImage: "Ouvrir l’image {current} sur {total}",
        counter: "{current} sur {total}",
        close: "Fermer la galerie",
        previous: "Image précédente",
        next: "Image suivante",
        loading: "Chargement de l’image",
        loadError: "L’image sélectionnée n’a pas pu être chargée.",
        imageAlt: "{name} — image {current} sur {total}",
      },
    },
    overview: {
      eyebrow: "LE PROJET",
      title: "À propos du projet",
      attributes: "Caractéristiques distinctives",
    },
    typologies: {
      eyebrow: "CONFIGURATIONS",
      withSurfaces: {
        title: "Types de résidences et superficies",
        intro: "Consultez les configurations et les superficies publiées.",
      },
      withoutSurfaces: {
        title: "Types de résidences du projet",
        intro: "Consultez les configurations publiées.",
      },
      note:
        "La disponibilité de chaque type de résidence est vérifiée au moment de la demande.",
    },
    features: {
      eyebrow: "CARACTÉRISTIQUES",
      title: "Résidences et commodités",
    },
    payment: {
      eyebrow: "STRUCTURE D’ACHAT",
      title: "Échéancier des dépôts",
      intro:
        "Consultez la séquence publiée dans l’ordre prévu pour le projet.",
    },
    advisor: {
      eyebrow: "L’ACCOMPAGNEMENT DE JACQUIE",
      title: "Mieux comprendre ce projet",
      text:
        "Jacquie peut vous aider à comprendre l’emplacement, la livraison prévue, l’échéancier des dépôts, les types de résidences et les conditions actuelles selon ce que vous recherchez.",
    },
    location: {
      eyebrow: "EMPLACEMENT",
      title: "Emplacement du projet",
      mapTitle: "Emplacement de {name}",
    },
    faq: {
      eyebrow: "QUESTIONS FRÉQUENTES",
      title: "Renseignements sur le projet",
      open: "Ouvrir la réponse",
      close: "Fermer la réponse",
    },
    close: {
      eyebrow: "PROCHAINE ÉTAPE",
      title: "Parlons de ce projet",
      text:
        "Vous pouvez poser vos questions à Jacquie sur la livraison, l’échéancier des dépôts, les types de résidences ou les conditions actuelles, puis comparer le projet à ce que vous recherchez.",
      primaryCta: "Écrire à Jacquie sur WhatsApp",
      secondaryCta: "Envoyer une demande",
    },
    legal: {
      disclaimer:
        "Les prix, la disponibilité, les dates de livraison, les politiques de location, le financement et les échéanciers de dépôts peuvent changer. Confirmez les renseignements à jour, les documents applicables et les conditions en vigueur avant de prendre une décision. Ce contenu est fourni à titre informatif seulement; il ne constitue ni une offre ni des conseils financiers, juridiques, fiscaux ou en immigration.",
    },
  },
};
