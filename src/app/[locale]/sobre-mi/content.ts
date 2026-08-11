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
      eyebrow: "JACQUIE ZÁRATE · REALTOR EN LA FLORIDA",
      title: "Invertir en Florida es más simple cuando tenés a la persona indicada a tu lado.",
      intro:
        "Mi trabajo va más allá de encontrar una propiedad. Ayudo a mis clientes a tomar decisiones inmobiliarias inteligentes, respaldadas por criterio financiero, conocimiento del mercado y una atención cercana de principio a fin. Ya sea para vivir, invertir o generar ingresos con una propiedad, mi compromiso es acompañarte con transparencia, estrategia y confianza.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Leer mi recorrido",
      portraitAlt: "Retrato de Jacquie Zárate, Realtor en la Florida",
      imageCaption: "Buenos Aires · Finanzas · Miami",
    },
    journey: {
      eyebrow: "MI RECORRIDO",
      title: "Buenos Aires, Finanzas, Miami.",
      originLabel: "BUENOS AIRES",
      originText:
        "Nací en Buenos Aires, Argentina. Allí comenzó mi pasión por los números, la estrategia y la toma de decisiones. Esa base financiera es la que hoy aplico para ayudar a mis clientes a invertir con confianza en el mercado inmobiliario de Florida.",
      financeLabel: "MÁS DE 15 AÑOS EN FINANZAS",
      financeText:
        "Durante más de 15 años desarrollé mi carrera en el área financiera, trabajando en compañías multinacionales y adquiriendo una visión analítica que hoy me permite evaluar cada operación inmobiliaria desde una perspectiva estratégica y orientada al largo plazo.",
      miamiLabel: "MIAMI · DESDE 2023",
      miamiText:
        "Desde 2023 acompaño a compradores, vendedores e inversores en el sur de Florida. Mi objetivo no es solo encontrar una propiedad, sino brindar un acompañamiento integral para que cada cliente tome una decisión bien fundamentada y alineada con sus objetivos.",
      bridge: "",
    },
    lens: {
      eyebrow: "UNA PERSPECTIVA FINANCIERA",
      title: "Mirar más allá de la propiedad.",
      quote:
        "Buenos Aires me dio mis raíces. Las finanzas, el criterio. Miami, el lugar donde hoy ayudo a mis clientes a construir su patrimonio.",
      body:
        "Esa perspectiva ayuda a distinguir lo que está claro, lo que falta confirmar y las preguntas que requieren más atención.",
    },
    relationship: {
      eyebrow: "UNA RELACIÓN PERSONAL",
      title: "Una relación directa.",
      intro:
        "La comunicación y el seguimiento son directamente conmigo.",
      body:
        "Trabajo con compradores, vendedores, inversores y propietarios, explicando con claridad y coordinando personalmente los próximos pasos.",
      ownerNoteLabel: "PARA PROPIETARIOS",
      ownerNote:
        "También trabajo con propietarios en el área de Property Management.",
    },
    close: {
      eyebrow: "JACQUIE ZÁRATE",
      title: "Podemos empezar con una conversación.",
      text:
        "Si querés saber más sobre comprar, vender o invertir en Miami, escribime y te cuento.",
      role: "Realtor en la Florida",
      credentialLabel: "RESPALDO PROFESIONAL",
      credential: "Miami Life Realty",
      primaryCta: "Escribime por WhatsApp",
      secondaryCta: "Enviar una consulta",
    },
  },
  en: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · MIAMI REALTOR",
      title: "Investing in Florida is simpler when you have the right person by your side.",
      intro:
        "My work goes beyond finding a property. I help clients make smart real estate decisions grounded in financial perspective, market knowledge, and close support from beginning to end. Whether they want to live in a property, invest, or generate income from it, my commitment is to guide them with transparency, strategy, and confidence.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "Read my story",
      portraitAlt: "Portrait of Jacquie Zárate, Miami Realtor",
      imageCaption: "Buenos Aires · Finance · Miami",
    },
    journey: {
      eyebrow: "MY BACKGROUND",
      title: "Buenos Aires, Finance, Miami.",
      originLabel: "BUENOS AIRES",
      originText:
        "I was born in Buenos Aires, Argentina. That is where my passion for numbers, strategy, and decision-making began. I now apply that financial foundation to help my clients invest with confidence in Florida’s real estate market.",
      financeLabel: "MORE THAN 15 YEARS IN FINANCE",
      financeText:
        "For more than 15 years, I built my career in Finance, working at multinational companies and developing an analytical perspective that now helps me evaluate each real estate transaction strategically and with a long-term view.",
      miamiLabel: "MIAMI · SINCE 2023",
      miamiText:
        "Since 2023, I have supported buyers, sellers, and investors across South Florida. My goal is not only to find a property, but to provide comprehensive guidance so each client can make a well-grounded decision aligned with their objectives.",
      bridge: "",
    },
    lens: {
      eyebrow: "A FINANCIAL PERSPECTIVE",
      title: "Looking beyond the property.",
      quote:
        "Buenos Aires gave me my roots. Finance gave me perspective. Miami is where I now help my clients build their wealth.",
      body:
        "That perspective helps clarify what is known, what still needs to be confirmed, and which questions deserve closer attention.",
    },
    relationship: {
      eyebrow: "A PERSONAL RELATIONSHIP",
      title: "A direct relationship.",
      intro:
        "Communication and personal follow-through are directly with me.",
      body:
        "I work with buyers, sellers, investors, and property owners, providing clear explanations and personally coordinating the next steps.",
      ownerNoteLabel: "FOR PROPERTY OWNERS",
      ownerNote:
        "I also work with property owners in Property Management.",
    },
    close: {
      eyebrow: "JACQUIE ZÁRATE",
      title: "We can start with a conversation.",
      text:
        "If you’d like to learn more about buying, selling, or investing in Miami, send me a message and I’ll tell you more.",
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
        "Investir en Floride est plus simple quand on a la bonne personne à ses côtés.",
      intro:
        "Mon travail va au-delà de la recherche d’une propriété. J’aide mes clients à prendre des décisions immobilières éclairées, appuyées par une perspective financière, une bonne connaissance du marché et un accompagnement attentif du début à la fin. Qu’il s’agisse d’y vivre, d’investir ou de générer des revenus avec une propriété, je m’engage à les accompagner avec transparence, stratégie et confiance.",
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
        "Je suis née à Buenos Aires, en Argentine. C’est là qu’est née ma passion pour les chiffres, la stratégie et la prise de décision. J’applique aujourd’hui cette base financière pour aider mes clients à investir avec confiance sur le marché immobilier de la Floride.",
      financeLabel: "PLUS DE 15 ANS EN FINANCES",
      financeText:
        "Pendant plus de 15 ans, j’ai fait carrière dans le secteur financier au sein d’entreprises multinationales. J’y ai développé une perspective analytique qui m’aide aujourd’hui à évaluer chaque transaction immobilière de façon stratégique et dans une vision à long terme.",
      miamiLabel: "MIAMI · DEPUIS 2023",
      miamiText:
        "Depuis 2023, j’accompagne des acheteurs, des vendeurs et des investisseurs dans le sud de la Floride. Mon objectif n’est pas seulement de trouver une propriété, mais d’offrir un accompagnement complet afin que chaque client prenne une décision bien fondée et alignée sur ses objectifs.",
      bridge: "",
    },
    lens: {
      eyebrow: "UNE PERSPECTIVE FINANCIÈRE",
      title: "Regarder au-delà de la propriété.",
      quote:
        "Buenos Aires m’a donné mes racines. Les finances m’ont donné le discernement. Miami est l’endroit où j’aide aujourd’hui mes clients à bâtir leur patrimoine.",
      body:
        "Cette perspective aide à distinguer ce qui est clair, ce qui reste à confirmer et les questions qui méritent une attention particulière.",
    },
    relationship: {
      eyebrow: "UNE RELATION PERSONNELLE",
      title: "Une relation directe.",
      intro:
        "La communication et le suivi personnalisé se font directement avec moi.",
      body:
        "J’accompagne les acheteurs, les vendeurs, les investisseurs et les propriétaires avec des explications claires et une coordination personnelle des prochaines étapes.",
      ownerNoteLabel: "POUR LES PROPRIÉTAIRES",
      ownerNote:
        "Je travaille aussi avec des propriétaires dans le domaine de la gestion immobilière.",
    },
    close: {
      eyebrow: "JACQUIE ZÁRATE",
      title: "Tout peut commencer par une conversation.",
      text:
        "Si vous souhaitez en savoir plus sur l’achat, la vente ou l’investissement à Miami, écrivez-moi et je vous en dirai davantage.",
      role: "Courtière immobilière à Miami",
      credentialLabel: "APPUI PROFESSIONNEL",
      credential: "Miami Life Realty",
      primaryCta: "M’écrire sur WhatsApp",
      secondaryCta: "Envoyer une demande",
    },
  },
};
