export type AboutLocale = "es" | "en" | "fr";

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    portraitAlt: string;
    imageCaption: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    originLabel: string;
    originText: string;
    financeLabel: string;
    financeText: string;
    miamiLabel: string;
    miamiText: string;
    bridge: string;
  };
  lens: {
    eyebrow: string;
    title: string;
    quote: string;
    body: string;
  };
  relationship: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string;
    ownerNoteLabel: string;
    ownerNote: string;
  };
  close: {
    eyebrow: string;
    title: string;
    text: string;
    role: string;
    credentialLabel: string;
    credential: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export const ABOUT_CONTENT: Record<AboutLocale, AboutContent> = {
  es: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · REALTOR EN MIAMI",
      title: "Experiencia financiera aplicada a decisiones inmobiliarias en Miami.",
      intro:
        "Soy Jacquie Zárate. Mi recorrido entre Buenos Aires, las Finanzas y Miami forma la mirada personal que aporto a mi trabajo en Real Estate.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Leer mi recorrido",
      portraitAlt: "Retrato de Jacquie Zárate, Realtor en Miami",
      imageCaption: "Buenos Aires · Finanzas · Miami",
    },
    journey: {
      eyebrow: "MI RECORRIDO",
      title: "Buenos Aires, Finanzas, Miami.",
      originLabel: "BUENOS AIRES",
      originText: "Nací en Buenos Aires, Argentina. Allí comienza mi historia.",
      financeLabel: "MÁS DE 15 AÑOS EN FINANZAS",
      financeText:
        "Mi recorrido incluye más de 15 años de experiencia en Finanzas trabajando en empresas S&P 500.",
      miamiLabel: "MIAMI · DESDE 2023",
      miamiText:
        "Desde 2023 trabajo en Miami con compradores, inversores y propietarios en Real Estate.",
      bridge:
        "Buenos Aires es el origen; las Finanzas, la experiencia; Miami, el presente.",
    },
    lens: {
      eyebrow: "UNA PERSPECTIVA FINANCIERA",
      title: "Mirar más allá de la propiedad.",
      quote:
        "La experiencia financiera me enseñó a entender el contexto, ordenar la información y abordar cada decisión con responsabilidad.",
      body:
        "Esa perspectiva ayuda a distinguir lo que está claro, lo que falta confirmar y las preguntas que requieren más atención.",
    },
    relationship: {
      eyebrow: "UNA RELACIÓN PERSONAL",
      title: "Una relación directa.",
      intro:
        "La comunicación y el seguimiento son directamente conmigo.",
      body:
        "Trabajo con compradores, inversores y propietarios, explicando con claridad y coordinando personalmente los próximos pasos.",
      ownerNoteLabel: "PARA PROPIETARIOS",
      ownerNote:
        "También trabajo con propietarios en el área de Property Management.",
    },
    close: {
      eyebrow: "JACQUIE ZÁRATE",
      title: "Podemos empezar con una conversación.",
      text:
        "Si quieres conversar sobre una propiedad en Miami, puedes escribirme directamente.",
      role: "Realtor en Miami",
      credentialLabel: "RESPALDO PROFESIONAL",
      credential: "Miami Life Realty",
      primaryCta: "Escribirme por WhatsApp",
      secondaryCta: "Enviar una consulta",
    },
  },
  en: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · MIAMI REALTOR",
      title: "Financial experience applied to real estate decisions in Miami.",
      intro:
        "I’m Jacquie Zárate. My path from Buenos Aires through Finance to Miami shapes the personal perspective I bring to my work in real estate.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Read my story",
      portraitAlt: "Portrait of Jacquie Zárate, Miami Realtor",
      imageCaption: "Buenos Aires · Finance · Miami",
    },
    journey: {
      eyebrow: "MY BACKGROUND",
      title: "Buenos Aires, Finance, Miami.",
      originLabel: "BUENOS AIRES",
      originText: "I was born in Buenos Aires, Argentina. My story begins there.",
      financeLabel: "MORE THAN 15 YEARS IN FINANCE",
      financeText:
        "My background includes more than 15 years of experience in Finance, working at S&P 500 companies.",
      miamiLabel: "MIAMI · SINCE 2023",
      miamiText:
        "Since 2023, I have worked in Miami with buyers, investors, and property owners in real estate.",
      bridge:
        "Buenos Aires is the beginning; Finance, the experience; Miami, the present.",
    },
    lens: {
      eyebrow: "A FINANCIAL PERSPECTIVE",
      title: "Looking beyond the property.",
      quote:
        "My experience in Finance taught me to understand the context, organize the information, and approach each decision responsibly.",
      body:
        "That perspective helps clarify what is known, what still needs to be confirmed, and which questions deserve closer attention.",
    },
    relationship: {
      eyebrow: "A PERSONAL RELATIONSHIP",
      title: "A direct relationship.",
      intro:
        "Communication and personal follow-through are directly with me.",
      body:
        "I work with buyers, investors, and property owners, providing clear explanations and personally coordinating the next steps.",
      ownerNoteLabel: "FOR PROPERTY OWNERS",
      ownerNote:
        "I also work with property owners in Property Management.",
    },
    close: {
      eyebrow: "JACQUIE ZÁRATE",
      title: "We can start with a conversation.",
      text:
        "If you would like to discuss a property in Miami, you can contact me directly.",
      role: "Miami Realtor",
      credentialLabel: "PROFESSIONAL BACKING",
      credential: "Miami Life Realty",
      primaryCta: "Message me on WhatsApp",
      secondaryCta: "Send an inquiry",
    },
  },
  fr: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · COURTIÈRE IMMOBILIÈRE À MIAMI",
      title:
        "Une expérience financière appliquée aux décisions immobilières à Miami.",
      intro:
        "Je suis Jacquie Zárate. Mon parcours, de Buenos Aires aux finances puis à Miami, façonne la perspective personnelle que j’apporte à mon travail en immobilier.",
      primaryCta: "Écrire sur WhatsApp",
      secondaryCta: "Découvrir mon parcours",
      portraitAlt:
        "Portrait de Jacquie Zárate, courtière immobilière à Miami",
      imageCaption: "Buenos Aires · Finances · Miami",
    },
    journey: {
      eyebrow: "MON PARCOURS",
      title: "Buenos Aires, Finances, Miami.",
      originLabel: "BUENOS AIRES",
      originText:
        "Je suis née à Buenos Aires, en Argentine. Mon histoire commence là.",
      financeLabel: "PLUS DE 15 ANS EN FINANCES",
      financeText:
        "Mon parcours comprend plus de 15 ans d’expérience en finances, acquise au sein d’entreprises du S&P 500.",
      miamiLabel: "MIAMI · DEPUIS 2023",
      miamiText:
        "Depuis 2023, je travaille à Miami avec des acheteurs, des investisseurs et des propriétaires dans le domaine de l’immobilier.",
      bridge:
        "Buenos Aires est le point de départ; les finances, l’expérience; Miami, le présent.",
    },
    lens: {
      eyebrow: "UNE PERSPECTIVE FINANCIÈRE",
      title: "Regarder au-delà de la propriété.",
      quote:
        "Mon expérience en finances m’a appris à comprendre le contexte, à organiser l’information et à aborder chaque décision avec responsabilité.",
      body:
        "Cette perspective aide à distinguer ce qui est clair, ce qui reste à confirmer et les questions qui méritent une attention particulière.",
    },
    relationship: {
      eyebrow: "UNE RELATION PERSONNELLE",
      title: "Une relation directe.",
      intro:
        "La communication et le suivi personnalisé se font directement avec moi.",
      body:
        "J’accompagne les acheteurs, les investisseurs et les propriétaires avec des explications claires et une coordination personnelle des prochaines étapes.",
      ownerNoteLabel: "POUR LES PROPRIÉTAIRES",
      ownerNote:
        "Je travaille aussi avec des propriétaires dans le domaine de la gestion immobilière.",
    },
    close: {
      eyebrow: "JACQUIE ZÁRATE",
      title: "Tout peut commencer par une conversation.",
      text:
        "Si vous souhaitez discuter d’une propriété à Miami, vous pouvez communiquer directement avec moi.",
      role: "Courtière immobilière à Miami",
      credentialLabel: "APPUI PROFESSIONNEL",
      credential: "Miami Life Realty",
      primaryCta: "M’écrire sur WhatsApp",
      secondaryCta: "Envoyer une demande",
    },
  },
};
