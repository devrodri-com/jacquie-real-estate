import type { HomeLocale } from "../home-content";

type JourneyItem = {
  place: string;
  title: string;
  text: string;
};

type QuestionItem = {
  question: string;
  answer: string;
};

type MethodItem = {
  title: string;
  text: string;
};

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
    items: JourneyItem[];
  };
  lens: {
    eyebrow: string;
    title: string;
    intro: string;
    items: QuestionItem[];
    cta: string;
  };
  method: {
    eyebrow: string;
    title: string;
    intro: string;
    items: MethodItem[];
    ownerNoteLabel: string;
    ownerNote: string;
  };
  close: {
    eyebrow: string;
    title: string;
    text: string;
    credentialLabel: string;
    credential: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export const ABOUT_CONTENT: Record<HomeLocale, AboutContent> = {
  es: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · REALTOR EN MIAMI",
      title: "Experiencia financiera aplicada a decisiones inmobiliarias en Miami.",
      intro:
        "Trabajo con compradores, inversores y propietarios para comprar, invertir o gestionar una propiedad en Miami.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Conocer mi forma de trabajar",
      portraitAlt: "Retrato de Jacquie Zárate, realtor en Miami",
      imageCaption: "Buenos Aires · Finanzas · Miami",
    },
    journey: {
      eyebrow: "MI RECORRIDO",
      title: "Buenos Aires, Finanzas, Miami.",
      items: [
        {
          place: "ORIGEN",
          title: "Buenos Aires",
          text: "Nací en Buenos Aires, Argentina.",
        },
        {
          place: "FINANZAS",
          title: "Más de 15 años en Finanzas",
          text: "Experiencia en empresas S&P 500, con foco en análisis, procesos y toma de decisiones.",
        },
        {
          place: "REAL ESTATE",
          title: "Miami desde 2023",
          text: "Trabajo con compradores, inversores y propietarios en Real Estate y Property Management.",
        },
      ],
    },
    lens: {
      eyebrow: "UNA MIRADA MÁS COMPLETA",
      title: "Las finanzas cambian las preguntas.",
      intro:
        "Entender qué debe cumplir la propiedad, cómo encaja en tu presupuesto y qué condiciones revisar antes de avanzar.",
      items: [
        { question: "¿Qué debe lograr esta compra?", answer: "Uso personal, inversión, renta o una combinación de necesidades." },
        { question: "¿Cómo encajan presupuesto y financiación?", answer: "Presupuesto, capital disponible y financiación se evalúan juntos antes de elegir." },
        { question: "¿Qué condiciones cambian la decisión?", answer: "Ubicación, edificio, tipo de propiedad, tiempos y forma de uso." },
      ],
      cta: "Conocer opciones de financiación",
    },
    method: {
      eyebrow: "CÓMO TRABAJO",
      title: "Atención personal en cada etapa.",
      intro: "Entiendo tu contexto, ordeno las opciones y mantengo una comunicación directa durante el proceso.",
      items: [
        { title: "Entender el contexto", text: "Objetivo, tiempos, presupuesto y condiciones importantes." },
        { title: "Ordenar las opciones", text: "La información necesaria para decidir qué vale la pena explorar." },
        { title: "Mantener el proceso en movimiento", text: "Seguimiento de cada etapa y coordinación de los próximos pasos." },
      ],
      ownerNoteLabel: "PARA PROPIETARIOS",
      ownerNote: "También apoyo a propietarios en la gestión de su propiedad.",
    },
    close: {
      eyebrow: "RESPALDO PROFESIONAL",
      title: "Tu próximo paso en Miami.",
      text: "Trabajo como realtor asociada a Miami Life Realty. La comunicación y el seguimiento del proceso son directamente conmigo.",
      credentialLabel: "BROKERAGE",
      credential: "Miami Life Realty",
      primaryCta: "Hablar con Jacquie por WhatsApp",
      secondaryCta: "Enviar una consulta",
    },
  },
  en: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · MIAMI REALTOR",
      title: "Financial experience applied to real estate decisions in Miami.",
      intro:
        "I work with buyers, investors, and property owners buying, investing in, or managing a property in Miami.",
      primaryCta: "Chat on WhatsApp",
      secondaryCta: "See how I work",
      portraitAlt: "Portrait of Jacquie Zárate, Miami Realtor",
      imageCaption: "Buenos Aires · Finance · Miami",
    },
    journey: {
      eyebrow: "MY BACKGROUND",
      title: "Buenos Aires, Finance, Miami.",
      items: [
        {
          place: "ORIGIN",
          title: "Buenos Aires",
          text: "I was born in Buenos Aires, Argentina.",
        },
        {
          place: "FINANCE",
          title: "More than 15 years in Finance",
          text: "Experience with S&P 500 companies, focusing on analysis, processes, and decision-making.",
        },
        {
          place: "REAL ESTATE",
          title: "Miami since 2023",
          text: "I work with buyers, investors, and property owners in Real Estate and Property Management.",
        },
      ],
    },
    lens: {
      eyebrow: "A MORE COMPLETE VIEW",
      title: "Finance changes the questions I ask.",
      intro:
        "Understand what the property needs to accomplish, how it fits the budget, and which conditions to review before moving forward.",
      items: [
        { question: "What should this purchase accomplish?", answer: "Personal use, investment, rental, or a combination of needs." },
        { question: "How do budget and financing fit together?", answer: "Budget, available capital, and financing are considered together before choosing." },
        { question: "Which conditions change the decision?", answer: "Location, building, property type, timing, and intended use." },
      ],
      cta: "Explore financing options",
    },
    method: {
      eyebrow: "HOW I WORK",
      title: "Personal attention at every stage.",
      intro: "I understand your context, organize the options, and maintain direct communication throughout the process.",
      items: [
        { title: "Understand the context", text: "Your goal, timing, budget, and key conditions." },
        { title: "Organize the options", text: "The information needed to decide what is worth exploring." },
        { title: "Keep the process moving", text: "Follow-through at every stage and coordination of the next steps." },
      ],
      ownerNoteLabel: "FOR PROPERTY OWNERS",
      ownerNote: "I also support property owners with the management of their property.",
    },
    close: {
      eyebrow: "PROFESSIONAL BACKING",
      title: "Your next step in Miami.",
      text: "I work as a Realtor affiliated with Miami Life Realty. Communication and follow-through throughout the process are directly with me.",
      credentialLabel: "BROKERAGE",
      credential: "Miami Life Realty",
      primaryCta: "Chat with Jacquie on WhatsApp",
      secondaryCta: "Send an inquiry",
    },
  },
  fr: {
    hero: {
      eyebrow: "JACQUIE ZÁRATE · REALTOR À MIAMI",
      title: "Une expérience financière appliquée aux décisions immobilières à Miami.",
      intro:
        "Je travaille avec des acheteurs, des investisseurs et des propriétaires pour acheter, investir ou gérer une propriété à Miami.",
      primaryCta: "Écrire sur WhatsApp",
      secondaryCta: "Découvrir ma façon de travailler",
      portraitAlt: "Portrait de Jacquie Zárate, realtor à Miami",
      imageCaption: "Buenos Aires · Finances · Miami",
    },
    journey: {
      eyebrow: "MON PARCOURS",
      title: "Buenos Aires, Finances, Miami.",
      items: [
        {
          place: "ORIGINE",
          title: "Buenos Aires",
          text: "Je suis née à Buenos Aires, en Argentine.",
        },
        {
          place: "FINANCES",
          title: "Plus de 15 ans en finances",
          text: "Expérience au sein d’entreprises du S&P 500, axée sur l’analyse, les processus et la prise de décision.",
        },
        {
          place: "IMMOBILIER",
          title: "Miami depuis 2023",
          text: "Je travaille avec des acheteurs, des investisseurs et des propriétaires en immobilier et en gestion de propriétés.",
        },
      ],
    },
    lens: {
      eyebrow: "UNE VUE PLUS COMPLÈTE",
      title: "Les finances changent les questions que je pose.",
      intro:
        "Comprendre ce que la propriété doit accomplir, comment elle s’intègre au budget et quelles conditions examiner avant d’avancer.",
      items: [
        { question: "Que doit accomplir cet achat?", answer: "Usage personnel, investissement, location ou combinaison de besoins." },
        { question: "Comment le budget et le financement s’articulent-ils?", answer: "Le budget, le capital disponible et le financement sont considérés ensemble avant de choisir." },
        { question: "Quelles conditions changent la décision?", answer: "Emplacement, immeuble, type de propriété, échéancier et usage prévu." },
      ],
      cta: "Explorer les options de financement",
    },
    method: {
      eyebrow: "MA FAÇON DE TRAVAILLER",
      title: "Un service personnalisé à chaque étape.",
      intro: "Je comprends votre contexte, j’organise les options et je maintiens une communication directe pendant le processus.",
      items: [
        { title: "Comprendre le contexte", text: "Votre objectif, votre échéancier, votre budget et les conditions importantes." },
        { title: "Organiser les options", text: "L’information nécessaire pour décider lesquelles méritent d’être explorées." },
        { title: "Faire avancer le processus", text: "Le suivi de chaque étape et la coordination des prochaines avec vous." },
      ],
      ownerNoteLabel: "POUR LES PROPRIÉTAIRES",
      ownerNote: "J’aide aussi les propriétaires dans la gestion de leur propriété.",
    },
    close: {
      eyebrow: "APPUI PROFESSIONNEL",
      title: "Votre prochaine étape à Miami.",
      text: "Je travaille comme realtor affiliée à Miami Life Realty. La communication et le suivi du processus se font directement avec moi.",
      credentialLabel: "AGENCE IMMOBILIÈRE",
      credential: "Miami Life Realty",
      primaryCta: "Écrire à Jacquie sur WhatsApp",
      secondaryCta: "Envoyer une demande",
    },
  },
};
