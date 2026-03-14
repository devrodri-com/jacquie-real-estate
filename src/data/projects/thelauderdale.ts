// src/data/projects/thelauderdale.ts
import type { Project } from "../types";

export const pTheLauderdale: Project = {
  id: "the-lauderdale",
  slug: "/proyectos/the-lauderdale",
  name: "The Lauderdale",
  city: "110 NW 4th Avenue, Fort Lauderdale, FL 33312",

  // precios y costos (preliminar / sujeto a lista VIP)
  priceFromUsd: 656400,
  delivery: "Dic 2029",
  furnished: false,

  // STR policy (a confirmar por developer/HOA)
  rentalPolicyEs: "Alquiler mínimo 30 días · hasta 12 contratos por año.",
  rentalPolicyEn: "30-day minimum rentals · up to 12 leases per year.",

  // hero + galería
  image: "https://ik.imagekit.io/devrodri/The%20Lauderdale/Aerial-01-FINALkfc-1920x1080.webp",
  images: [
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/1.webp" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/33.jpg" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/4.jpg" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/5.jpg" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/7.webp" },
    { src: "https://ik.imagekit.io/devrodri/The%20Lauderdale/8.jpg" }
  ],

  // microclaims
  microClaimsEs: [
    "42 pisos · 422 residencias",
    "Opportunity Zone · Conexión peatonal directa a Brightline"
  ],
  microClaimsEn: [
    "42 floors · 422 residences",
    "Opportunity Zone · Direct pedestrian connection to Brightline"
  ],

  // destacados (amenities)
  highlights: [
    "Piscina estilo resort",
    "Spa y áreas de bienestar",
    "Fitness center",
    "Espacios sociales y lounges",
    "BBQ y áreas exteriores",
    "Café y retail en planta baja",
    "Concierge y seguridad",
    "Pet-friendly",
    "Estaciones de carga para vehículos eléctricos"
  ],
  highlightsEn: [
    "Resort-style pool",
    "Spa and wellness areas",
    "Fitness center",
    "Social spaces and lounges",
    "Outdoor BBQ areas",
    "Ground-floor café and retail",
    "Concierge and security",
    "Pet-friendly",
    "EV charging stations"
  ],

  // tipologías
  unitMixEs: ["1 a 4 dormitorios + den · penthouses hasta ≈280 m²"],
  unitMixEn: ["1 to 4 bedrooms + den · penthouses up to ~3,000+ sq.ft"],

  // acabados (resumen)
  featuresEs: [
    "Ventanales piso-techo con vidrio anti-huracán",
    "Cocinas estilo europeo con electrodomésticos premium",
    "Baños tipo spa con grifería de diseño",
    "Acceso keyless + smart home / control de visitantes",
    "Desarrollado por EB5 Development Group",
    "Proyecto aprobado para programa EB-5"
  ],
  featuresEn: [
    "Floor-to-ceiling, impact-resistant windows",
    "European-style kitchens with premium appliances",
    "Spa-style baths with designer fixtures",
    "Keyless entry + smart home / visitor management",
    "Developed by EB5 Development Group",
    "EB-5 approved project"
  ],

  // plan de pagos
  paymentPlanEs: [
    "US$5,000 al firmar la reserva",
    "Saldo hasta completar 5% dentro de los 30 días",
    "5% a los 12 meses de la firma",
    "5% a los 24 meses de la firma",
    "5% a los 36 meses de la firma",
    "80% al cierre (Dic 2029)"
  ],
  paymentPlanEn: [
    "US$5,000 due at reservation",
    "Balance to complete 5% within 30 days",
    "5% due 12 months after signing",
    "5% due 24 months after signing",
    "5% due 36 months after signing",
    "80% due at closing (Dec 2029)"
  ],

  // FAQs
  faqsEs: [
    {
      q: "¿Dirección y conectividad?",
      a: "110 NW 4th Avenue, Fort Lauderdale, FL 33312 (Flagler Village). Frente a la estación Brightline con conexión peatonal prevista."
    },
    {
      q: "¿Opción EB-5 / Opportunity Zone?",
      a: "El proyecto se comercializa con opción de inversión EB-5 (sujeto a elegibilidad) y está dentro de una Qualified Opportunity Zone."
    },
    {
      q: "¿Desde qué precio?",
      a: "Studios desde US$656,400. Valores sujetos a disponibilidad por tipología y piso."
    },
    {
      q: "¿Política de renta?",
      a: "Alquiler mínimo de 30 días, hasta 12 contratos por año, según normativa del proyecto."
    }
  ],
  faqsEn: [
    {
      q: "Address and connectivity?",
      a: "110 NW 4th Avenue, Fort Lauderdale, FL 33312 (Flagler Village). Across from Brightline with a planned pedestrian connection."
    },
    {
      q: "EB-5 / Opportunity Zone option?",
      a: "Marketed with an EB-5 investment option (subject to eligibility) and located in a Qualified Opportunity Zone."
    },
    {
      q: "Starting price?",
      a: "Studios from US$656,400. Pricing varies by unit type and floor availability."
    },
    {
      q: "Rental policy?",
      a: "30-day minimum rentals, up to 12 leases per year, per project guidelines."
    }
  ]
};

export default pTheLauderdale;