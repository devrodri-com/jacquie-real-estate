import type { SiteLocale } from "@/lib/seo";

export type ProjectGalleryLabels = Readonly<{
  dialogTitle: string;
  viewAll: string;
  viewImage: string;
  imageCount: string;
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
    disclaimer: string;
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
    intro: string;
    references: string;
    highlights: string;
  };
  typologies: {
    eyebrow: string;
    title: string;
    intro: string;
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
    disclaimer: string;
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
};

export const PROJECT_DETAIL_COPY: Record<SiteLocale, ProjectDetailCopy> = {
  es: {
    utility: {
      back: "Volver a Proyectos",
      share: "Compartir",
    },
    opening: {
      eyebrow: "PROYECTO DE PRECONSTRUCCIÓN",
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
      primaryCta: "Conversar por WhatsApp",
      secondaryCta: "Formulario de contacto",
      whatsappMessage:
        "Hola Jacquie, quiero conversar sobre el proyecto {name}, su entrega, plan de pagos, tipologías y condiciones actuales.",
      disclaimer:
        "Precios, disponibilidad, fechas, políticas de renta, financiación y planes de pago pueden cambiar. Confirma las condiciones actuales y la documentación aplicable antes de avanzar. Esta información no constituye una oferta ni asesoramiento financiero, legal, fiscal o migratorio.",
    },
    gallery: {
      eyebrow: "RECORRIDO VISUAL",
      title: "Una mirada al proyecto",
      intro:
        "Explora las imágenes disponibles del desarrollo y abre la secuencia completa para revisarlas con mayor detalle.",
      labels: {
        dialogTitle: "Galería de {name}",
        viewAll: "Ver todas las imágenes ({total})",
        viewImage: "Ver imagen",
        imageCount: "{total} imágenes",
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
      eyebrow: "LECTURA DEL PROYECTO",
      title: "El proyecto, en breve",
      intro:
        "Estas son las referencias y características publicadas para entender el desarrollo antes de revisar sus tipologías y condiciones.",
      references: "Referencias del proyecto",
      highlights: "Aspectos destacados",
    },
    typologies: {
      eyebrow: "CONFIGURACIONES",
      title: "Tipologías del proyecto",
      intro:
        "Revisa las configuraciones publicadas y sus superficies cuando el dato está disponible.",
      note:
        "La disponibilidad de cada tipología debe confirmarse al momento de la consulta.",
    },
    features: {
      eyebrow: "CARACTERÍSTICAS",
      title: "Detalles del desarrollo y las residencias",
    },
    payment: {
      eyebrow: "ESTRUCTURA DE COMPRA",
      title: "Plan de pagos",
      intro:
        "La secuencia se presenta en el mismo orden publicado para facilitar su lectura y comparación.",
      disclaimer:
        "El plan puede cambiar. Confirma los porcentajes, hitos y condiciones vigentes antes de avanzar; esta información no constituye una oferta final.",
    },
    advisor: {
      eyebrow: "CÓMO EVALUARLO",
      title: "Evalúalo según tus objetivos",
      text:
        "Jacquie puede ayudarte a revisar la ubicación, la entrega estimada, la estructura de pagos, la política de renta y las tipologías según el uso que imaginas para la propiedad. Antes de avanzar, conviene confirmar la documentación y las condiciones actuales del proyecto.",
    },
    location: {
      eyebrow: "UBICACIÓN",
      title: "Dónde se desarrolla el proyecto",
      mapTitle: "Ubicación de {name}",
    },
    faq: {
      eyebrow: "PREGUNTAS FRECUENTES",
      title: "Información para revisar antes de avanzar",
      open: "Abrir respuesta",
      close: "Cerrar respuesta",
    },
    close: {
      eyebrow: "CONVERSACIÓN DIRECTA",
      title: "Aclara las condiciones antes de avanzar",
      text:
        "Conversa con Jacquie sobre {name}, su entrega estimada, el plan de pagos, las tipologías y las condiciones actuales, o compáralo con otras alternativas.",
      primaryCta: "Hablar con Jacquie",
      secondaryCta: "Formulario de contacto",
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
      primaryCta: "Message Jacquie on WhatsApp",
      secondaryCta: "Contact form",
      whatsappMessage:
        "Hi Jacquie, I'd like to discuss {name}, its completion timeline, payment schedule, residence types, and current terms.",
      disclaimer:
        "Prices, availability, timelines, rental policies, financing, and payment schedules may change. Confirm current terms and applicable documents before moving forward. This information does not constitute an offer, nor is it financial, legal, tax, or immigration advice.",
    },
    gallery: {
      eyebrow: "VISUAL OVERVIEW",
      title: "A closer look at the project",
      intro:
        "Explore the available development images and open the full sequence for a more detailed review.",
      labels: {
        dialogTitle: "{name} gallery",
        viewAll: "View all images ({total})",
        viewImage: "View image",
        imageCount: "{total} images",
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
      eyebrow: "PROJECT OVERVIEW",
      title: "The project, at a glance",
      intro:
        "These are the published references and features available to understand the development before reviewing residence types and terms.",
      references: "Project references",
      highlights: "Highlights",
    },
    typologies: {
      eyebrow: "CONFIGURATIONS",
      title: "Residence types in the project",
      intro:
        "Review the published configurations and sizes whenever that information is available.",
      note:
        "Availability for each residence type must be confirmed when you inquire.",
    },
    features: {
      eyebrow: "FEATURES",
      title: "Development and residence details",
    },
    payment: {
      eyebrow: "PURCHASE STRUCTURE",
      title: "Payment schedule",
      intro:
        "The sequence appears in its published order so the milestones are easier to read and compare.",
      disclaimer:
        "The schedule may change. Confirm current percentages, milestones, and terms before moving forward; this information is not a final offer.",
    },
    advisor: {
      eyebrow: "HOW TO EVALUATE IT",
      title: "Evaluate it against your goals",
      text:
        "Jacquie can help you review the location, estimated completion, payment structure, rental policy, and residence types in light of how you expect to use the property. Before moving forward, confirm the project's current documents and terms.",
    },
    location: {
      eyebrow: "LOCATION",
      title: "Project location",
      mapTitle: "Location of {name}",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Information to review before moving forward",
      open: "Open answer",
      close: "Close answer",
    },
    close: {
      eyebrow: "DIRECT CONVERSATION",
      title: "Clarify the current terms before moving forward",
      text:
        "Talk with Jacquie about {name}, its estimated completion, payment schedule, residence types, and current terms, or compare it with other alternatives.",
      primaryCta: "Talk with Jacquie",
      secondaryCta: "Contact form",
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
      primaryCta: "Discuter sur WhatsApp",
      secondaryCta: "Formulaire de contact",
      whatsappMessage:
        "Bonjour Jacquie, j’aimerais discuter du projet {name}, de sa livraison, de l’échéancier des dépôts, des types de résidences et des conditions actuelles.",
      disclaimer:
        "Les prix, la disponibilité, les échéanciers, les politiques de location, le financement et les calendriers de dépôts peuvent changer. Confirmez les conditions actuelles et les documents applicables avant d’aller plus loin. Ces renseignements ne constituent ni une offre ni des conseils financiers, juridiques, fiscaux ou en immigration.",
    },
    gallery: {
      eyebrow: "APERÇU VISUEL",
      title: "Un regard sur le projet",
      intro:
        "Explorez les images disponibles du développement et ouvrez la séquence complète pour les examiner plus en détail.",
      labels: {
        dialogTitle: "Galerie de {name}",
        viewAll: "Voir toutes les images ({total})",
        viewImage: "Voir l’image",
        imageCount: "{total} images",
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
      eyebrow: "APERÇU DU PROJET",
      title: "Le projet en bref",
      intro:
        "Voici les références et caractéristiques publiées pour comprendre le développement avant d’examiner les types de résidences et les conditions.",
      references: "Références du projet",
      highlights: "Points forts",
    },
    typologies: {
      eyebrow: "CONFIGURATIONS",
      title: "Types de résidences du projet",
      intro:
        "Examinez les configurations publiées et les superficies lorsque ces renseignements sont disponibles.",
      note:
        "La disponibilité de chaque type de résidence doit être confirmée au moment de la demande.",
    },
    features: {
      eyebrow: "CARACTÉRISTIQUES",
      title: "Détails du développement et des résidences",
    },
    payment: {
      eyebrow: "STRUCTURE D’ACHAT",
      title: "Échéancier des paiements",
      intro:
        "La séquence est présentée dans l’ordre publié afin de faciliter la lecture et la comparaison des étapes.",
      disclaimer:
        "L’échéancier peut changer. Confirmez les pourcentages, les étapes et les conditions actuelles avant d’aller plus loin; ces renseignements ne constituent pas une offre finale.",
    },
    advisor: {
      eyebrow: "COMMENT L’ÉVALUER",
      title: "Évaluez-le selon vos objectifs",
      text:
        "Jacquie peut vous aider à examiner l’emplacement, la livraison prévue, la structure de paiement, la politique de location et les types de résidences selon l’usage que vous envisagez. Avant d’aller plus loin, il convient de confirmer les documents et les conditions actuelles du projet.",
    },
    location: {
      eyebrow: "EMPLACEMENT",
      title: "Emplacement du projet",
      mapTitle: "Emplacement de {name}",
    },
    faq: {
      eyebrow: "QUESTIONS FRÉQUENTES",
      title: "Renseignements à examiner avant d’aller plus loin",
      open: "Ouvrir la réponse",
      close: "Fermer la réponse",
    },
    close: {
      eyebrow: "CONVERSATION DIRECTE",
      title: "Clarifiez les conditions actuelles avant d’aller plus loin",
      text:
        "Discutez avec Jacquie de {name}, de sa livraison prévue, de l’échéancier des dépôts, des types de résidences et des conditions actuelles, ou comparez-le à d’autres options.",
      primaryCta: "Parler avec Jacquie",
      secondaryCta: "Formulaire de contact",
    },
  },
};
