// src/data/projects/the-william.ts
import type { Project } from "../types";

export const pTheWilliam: Project = {
  id: "the-william",
  slug: "/proyectos/the-william",
  name: "The William Residences",
  city: "2040 NE 163rd St, North Miami Beach, FL 33162",

  // precios y costos
  priceFromUsd: 380880, // studio ST2 desde $380,880 (availability 9/25/25)
  delivery: "2029",
  furnished: false,

  // STR policy multilenguaje
  rentalPolicyEs: "Alquiler mínimo 90 días.",
  rentalPolicyEn: "Minimum stay 90 days.",

  // hero + galería
  image: "https://ik.imagekit.io/devrodri/The%20William%20residences/1.jpg.webp",
  images: [
    { src: "https://ik.imagekit.io/devrodri/The%20William%20residences/2.jpg.webp" },
    { src: "https://ik.imagekit.io/devrodri/The%20William%20residences/3.jpg.webp" },
    { src: "https://ik.imagekit.io/devrodri/The%20William%20residences/4.jpg.webp" },
    { src: "https://ik.imagekit.io/devrodri/The%20William%20residences/5.jpg.webp" }
  ],

  // microclaims
  microClaimsEs: [
    "26 pisos · 374 residencias",
    "Amenidades ≈3,760 m² en dos niveles"
  ],
  microClaimsEn: [
    "26 stories · 374 residences",
    "~40,459 sq.ft amenities across two floors"
  ],

  // destacados
  highlights: [
    "Piscina tipo resort y solárium",
    "BBQ exterior + bar con firepits",
    "Coworking lounge, biblioteca y café",
    "Gimnasio + yoga + zona outdoor training",
    "Pickleball en rooftop · valet y concierge 24/7",
    "Pet-friendly con estaciones y EV chargers"
  ],
  highlightsEn: [
    "Resort-style pool and sun deck",
    "Outdoor BBQ station + bar with firepits",
    "Coworking lounge, library and café",
    "Fitness + yoga + outdoor training zone",
    "Rooftop pickleball · 24/7 valet & concierge",
    "Pet-friendly with stations and EV chargers"
  ],

  // tipologías
  unitMixEs: ["Studios a 3 dormitorios · ver planos para m²"],
  unitMixEn: ["Studios to 3 bedrooms · see plans for m²/sq.ft"],

  // acabados
  featuresEs: [
    "Ventanales piso-techo; porcelanato importado",
    "Cocinas Italkraft + Bosch; cuarzo continuo; Hansgrohe negro",
    "Baños estilo spa; lavadora/secadora en todas las unidades"
  ],
  featuresEn: [
    "Floor-to-ceiling windows; imported porcelain flooring",
    "Italkraft kitchens + Bosch; seamless quartz; Hansgrohe black",
    "Spa-style baths; washer/dryer in every residence"
  ],

  // plan de pagos (típico precon)
  paymentPlanEs: [
    "10% reserva",
    "10% contrato",
    "10% inicio de obra",
    "10% top-off",
    "60% cierre"
  ],
  paymentPlanEn: [
    "10% reservation",
    "10% at contract",
    "10% groundbreaking",
    "10% top-off",
    "60% at closing"
  ],

  // FAQs
  faqsEs: [
    { q: "¿Dirección y sales gallery?", a: "Proyecto: 2040 NE 163rd St, North Miami Beach. Sales Gallery: 16251 W Dixie Hwy, NMB 33160." },
    { q: "¿Rentas de corta estancia?", a: "No se permiten. Mínimo 90 días por contrato." },
    { q: "¿Desde qué precio?", a: "Studios desde ~US$380,880 según disponibilidad del desarrollador (9/25/2025)." }
  ],
  faqsEn: [
    { q: "Address and sales gallery?", a: "Project: 2040 NE 163rd St, North Miami Beach. Sales Gallery: 16251 W Dixie Hwy, NMB 33160." },
    { q: "Short-term rentals?", a: "Not allowed. 90-day minimum leases." },
    { q: "Starting price?", a: "Studios from ~US$380,880 per developer availability (9/25/2025)." }
  ]
};

export default pTheWilliam;