export type HomeLocale = "es" | "en" | "fr";

type DecisionItem = {
  label: string;
  question: string;
};

type BuyingPath = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  imageAlt: string;
};

type MethodItem = {
  title: string;
  text: string;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    portraitAlt: string;
    portraitCaption: string;
  };
  decision: {
    eyebrow: string;
    title: string;
    intro: string;
    items: DecisionItem[];
    close: string;
  };
  buying: {
    eyebrow: string;
    title: string;
    intro: string;
    preconstruction: BuyingPath;
    properties: BuyingPath;
  };
  financing: {
    eyebrow: string;
    title: string;
    text: string;
    reference: string;
    note: string;
    cta: string;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    items: MethodItem[];
    proof: string[];
    cta: string;
  };
  stays: {
    eyebrow: string;
    title: string;
    text: string;
    signature: string;
    cta: string;
    logoAlt: string;
  };
  close: {
    eyebrow: string;
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export const HOME_CONTENT: Record<HomeLocale, HomeContent> = {
  es: {
    hero: {
      eyebrow: "REAL ESTATE EN MIAMI · COMPRA E INVERSIÓN",
      title: "Compra o invierte en Miami con criterio financiero y guía local.",
      intro:
        "Soy Jacquie Zárate, Realtor en Miami. Te ayudo a comparar propiedades, proyectos de preconstrucción y opciones de financiación según tu objetivo, tu presupuesto y la forma en que quieres usar la propiedad.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Explorar opciones",
      portraitAlt: "Jacquie Zárate, Realtor en Miami",
      portraitCaption: "Jacquie Zárate · Realtor en Miami",
    },
    decision: {
      eyebrow: "CRITERIO ANTES DE DECIDIR",
      title: "Objetivo, números y propiedad: una sola decisión.",
      intro: "Antes de avanzar, ordenamos las variables que realmente pueden cambiar una compra.",
      items: [
        { label: "Objetivo", question: "¿La buscas para vivir, invertir, alquilar o combinar usos?" },
        { label: "Estructura", question: "¿Qué presupuesto, capital disponible y financiación forman un escenario razonable?" },
        { label: "Propiedad", question: "¿Qué ubicación, edificio y condiciones responden mejor a ese objetivo?" },
      ],
      close: "Comparar mejor, no mirar más.",
    },
    buying: {
      eyebrow: "FORMAS DE COMPRAR",
      title: "Dos caminos. Preguntas distintas.",
      intro: "Puedes evaluar un proyecto en desarrollo o una propiedad ya disponible. Cada camino requiere su propio criterio.",
      preconstruction: {
        eyebrow: "01 · PRECONSTRUCCIÓN",
        title: "Evaluar un proyecto antes de su entrega.",
        text: "Compara ubicación, fecha de entrega, esquema de pagos, flexibilidad de renta y condiciones del proyecto antes de reservar.",
        cta: "Ver proyectos",
        imageAlt: "Proyecto residencial de preconstrucción en Miami",
      },
      properties: {
        eyebrow: "02 · PROPIEDADES DISPONIBLES",
        title: "Evaluar una propiedad ya construida.",
        text: "Explora las propiedades publicadas y revisa precio, edificio, condiciones y potencial de uso antes de avanzar.",
        cta: "Ver propiedades",
        imageAlt: "Interior de una propiedad disponible en South Florida",
      },
    },
    financing: {
      eyebrow: "FINANCIACIÓN",
      title: "La financiación también forma parte de la decisión.",
      text: "En algunos casos, las alternativas pueden comenzar desde un 25% de pago inicial. Te ayudo a ordenar la información y las preguntas necesarias para entender qué opciones de financiación podrían evaluarse según tu situación.",
      reference: "de pago inicial como referencia",
      note: "El 25% es una referencia inicial, no una garantía. Toda financiación está sujeta a evaluación, documentación, tipo de propiedad y aprobación de la entidad financiera.",
      cta: "Conocer opciones de financiación",
    },
    method: {
      eyebrow: "CÓMO TRABAJO",
      title: "Criterio personal en cada etapa.",
      intro: "Mi experiencia en finanzas y mi trabajo inmobiliario en Miami ayudan a organizar la conversación desde el objetivo hasta el siguiente paso.",
      items: [
        { title: "Definimos el objetivo", text: "Entiendo qué quieres comprar, para qué y qué condiciones son importantes para ti." },
        { title: "Comparamos escenarios", text: "Ordenamos propiedad, presupuesto, financiación y tiempos para ver qué alternativa encaja mejor." },
        { title: "Coordinamos el siguiente paso", text: "Si decides avanzar, te acompaño en la búsqueda, la oferta y la coordinación del proceso." },
      ],
      proof: ["Más de 15 años en Finanzas", "Empresas S&P 500", "Real Estate en Miami desde 2023"],
      cta: "Conocer a Jacquie",
    },
    stays: {
      eyebrow: "ESTADÍAS EN MIAMI",
      title: "Let’s Go Miami",
      text: "Estadías de renta corta en Sunny Isles, con atención directa. Las opciones varían según las fechas, la temporada y la cantidad de huéspedes.",
      signature: "by Jacna Services LLC · Vacation Condo Management",
      cta: "Conocer Let’s Go Miami",
      logoAlt: "Let’s Go Miami by Jacna Services LLC",
    },
    close: {
      eyebrow: "SIGUIENTE PASO",
      title: "Cuéntame qué quieres resolver en Miami.",
      text: "Si estás comparando una compra, un proyecto o una opción de financiación, comparte tu objetivo y el punto en el que estás.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Enviar una consulta",
    },
  },
  en: {
    hero: {
      eyebrow: "MIAMI REAL ESTATE · BUYING & INVESTING",
      title: "Buy or invest in Miami with a financial perspective and local guidance.",
      intro:
        "I’m Jacquie Zárate, a Miami Realtor. I help you compare properties, pre-construction projects, and financing options based on your goals, budget, and intended use.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Explore your options",
      portraitAlt: "Jacquie Zárate, Miami Realtor",
      portraitCaption: "Jacquie Zárate · Miami Realtor",
    },
    decision: {
      eyebrow: "CRITERIA BEFORE A DECISION",
      title: "Goals, numbers, and property: one decision.",
      intro: "Before moving forward, we organize the variables that can materially shape a purchase.",
      items: [
        { label: "Goal", question: "Is it for personal use, investment, rental income, or a combination?" },
        { label: "Structure", question: "What budget, available capital, and financing create a reasonable scenario?" },
        { label: "Property", question: "Which location, building, and conditions best support that goal?" },
      ],
      close: "Compare better, rather than reviewing more.",
    },
    buying: {
      eyebrow: "WAYS TO BUY",
      title: "Two paths. Different questions.",
      intro: "You can consider a project in development or a property that is already available. Each path requires a different analysis.",
      preconstruction: {
        eyebrow: "01 · PRE-CONSTRUCTION",
        title: "Evaluate a project before delivery.",
        text: "Compare location, delivery timing, payment structure, rental flexibility, and project conditions before reserving.",
        cta: "View projects",
        imageAlt: "Pre-construction residential project in Miami",
      },
      properties: {
        eyebrow: "02 · AVAILABLE PROPERTIES",
        title: "Evaluate a property you can already visit.",
        text: "Explore listed properties and review price, building, conditions, and intended use before moving forward.",
        cta: "View properties",
        imageAlt: "Interior of an available property in South Florida",
      },
    },
    financing: {
      eyebrow: "FINANCING",
      title: "Financing is also part of the purchase decision.",
      text: "In some cases, options may start with a 25% down payment. I help you organize the information and questions needed to understand which financing options could be considered based on your situation.",
      reference: "down payment as an initial reference",
      note: "The 25% figure is an initial reference, not a guarantee. All financing is subject to review, documentation, property type, and lender approval.",
      cta: "Explore financing options",
    },
    method: {
      eyebrow: "HOW I WORK",
      title: "A personal approach at every stage.",
      intro: "My background in Finance and my real estate work in Miami help me organize the conversation from your goal to the next step.",
      items: [
        { title: "Define the goal", text: "I learn what you want to buy, why, and which conditions matter to you." },
        { title: "Compare scenarios", text: "We organize property, budget, financing, and timing to see which option fits best." },
        { title: "Coordinate the next step", text: "If you decide to move forward, I help coordinate the search, offer, and next stages of the process." },
      ],
      proof: ["15+ years in Finance", "S&P 500 companies", "Miami real estate since 2023"],
      cta: "Meet Jacquie",
    },
    stays: {
      eyebrow: "MIAMI STAYS",
      title: "Let’s Go Miami",
      text: "Short stays in Sunny Isles with direct assistance. Options vary by dates, season, and guest count.",
      signature: "by Jacna Services LLC · Vacation Condo Management",
      cta: "Discover Let’s Go Miami",
      logoAlt: "Let’s Go Miami by Jacna Services LLC",
    },
    close: {
      eyebrow: "NEXT STEP",
      title: "Tell me what you want to accomplish in Miami.",
      text: "If you are comparing a property purchase, a project, or financing options, tell me your goal and where you are in the process.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Send an inquiry",
    },
  },
  fr: {
    hero: {
      eyebrow: "IMMOBILIER À MIAMI · ACHAT ET INVESTISSEMENT",
      title: "Achetez ou investissez à Miami avec une perspective financière et un accompagnement local.",
      intro:
        "Je suis Jacquie Zárate, courtière immobilière à Miami. Je vous aide à comparer des propriétés, des projets en préconstruction et des options de financement selon vos objectifs, votre budget et l’usage prévu de la propriété.",
      primaryCta: "Écrire sur WhatsApp",
      secondaryCta: "Explorer les options",
      portraitAlt: "Jacquie Zárate, courtière immobilière à Miami",
      portraitCaption: "Jacquie Zárate · courtière immobilière à Miami",
    },
    decision: {
      eyebrow: "DES CRITÈRES AVANT DE DÉCIDER",
      title: "Objectif, situation financière et propriété : une seule décision.",
      intro: "Avant d’avancer, nous organisons les variables qui peuvent réellement influencer l’achat.",
      items: [
        { label: "Objectif", question: "Est-ce pour y habiter, investir, louer ou combiner plusieurs usages?" },
        { label: "Structure", question: "Quel budget, quel capital disponible et quel financement forment un scénario raisonnable?" },
        { label: "Propriété", question: "Quel emplacement, quel immeuble et quelles conditions répondent le mieux à cet objectif?" },
      ],
      close: "Mieux comparer, plutôt que multiplier les options.",
    },
    buying: {
      eyebrow: "FAÇONS D’ACHETER",
      title: "Deux parcours pour trouver la propriété qui vous convient.",
      intro: "Vous pouvez évaluer un projet en développement ou une propriété déjà disponible. Chaque parcours exige une analyse différente.",
      preconstruction: {
        eyebrow: "01 · PRÉCONSTRUCTION",
        title: "Évaluer un projet avant sa livraison.",
        text: "Comparez l’emplacement, la date de livraison, le plan de paiement, la flexibilité locative et les conditions du projet avant de réserver.",
        cta: "Voir les projets",
        imageAlt: "Projet résidentiel en préconstruction à Miami",
      },
      properties: {
        eyebrow: "02 · PROPRIÉTÉS DISPONIBLES",
        title: "Évaluer une propriété que vous pouvez déjà visiter.",
        text: "Découvrez les propriétés présentées et examinez le prix, l’immeuble, les conditions et l’usage prévu avant d’avancer.",
        cta: "Voir les propriétés",
        imageAlt: "Intérieur d’une propriété disponible dans le sud de la Floride",
      },
    },
    financing: {
      eyebrow: "FINANCEMENT",
      title: "Le financement fait aussi partie de la décision d’achat.",
      text: "Dans certains cas, des options de financement peuvent prévoir une mise de fonds à partir de 25 %. Je vous aide à organiser l’information et les questions nécessaires pour comprendre quelles options de financement pourraient être envisagées selon votre situation.",
      reference: "de mise de fonds comme référence initiale",
      note: "La mise de fonds de 25 % est une référence initiale, pas une garantie. Tout financement est assujetti à l’évaluation, aux documents, au type de propriété et à l’approbation de l’institution financière.",
      cta: "Explorer les options de financement",
    },
    method: {
      eyebrow: "MA FAÇON DE TRAVAILLER",
      title: "Une approche personnalisée à chaque étape.",
      intro: "Mon expérience en finances et mon travail en immobilier à Miami aident à structurer la conversation, de votre objectif jusqu’à la prochaine étape.",
      items: [
        { title: "Définir l’objectif", text: "Je cherche à comprendre ce que vous souhaitez acheter, pourquoi et quelles conditions comptent pour vous." },
        { title: "Comparer les scénarios", text: "Nous organisons la propriété, le budget, le financement et l’échéancier afin de déterminer quelle option convient le mieux." },
        { title: "Coordonner la prochaine étape", text: "Si vous avancez, je vous accompagne dans la recherche, l’offre et la coordination du processus." },
      ],
      proof: ["Plus de 15 ans en finances", "Entreprises du S&P 500", "Immobilier à Miami depuis 2023"],
      cta: "Découvrir Jacquie",
    },
    stays: {
      eyebrow: "SÉJOURS À MIAMI",
      title: "Let’s Go Miami",
      text: "Des séjours de courte durée à Sunny Isles, avec un contact direct. Les options varient selon les dates, la saison et le nombre de voyageurs.",
      signature: "by Jacna Services LLC · Vacation Condo Management",
      cta: "Découvrir Let’s Go Miami",
      logoAlt: "Let’s Go Miami by Jacna Services LLC",
    },
    close: {
      eyebrow: "PROCHAINE ÉTAPE",
      title: "Parlez-moi de votre projet à Miami.",
      text: "Si vous comparez un achat, un projet ou une option de financement, expliquez-moi votre objectif et où vous en êtes.",
      primaryCta: "Écrire sur WhatsApp",
      secondaryCta: "Envoyer une demande",
    },
  },
};
