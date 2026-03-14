// src/data/projects/ambar-orlando.ts
import type { Project } from "../types";

export const pAmbarOrlando: Project = {
  id: "ambar-orlando",
  slug: "/proyectos/ambar-orlando",
  name: "Ambar Residences Orlando",
  city: "3251 Secret Lake Dr, Kissimmee, FL 34747",
  priceFromUsd: 363900,

  furnished: true,

  // STR policy
  rentalPolicyEs: "Uso temporal",
  rentalPolicyEn: "Temporary use",

  // hero + galería
  image: "https://ik.imagekit.io/devrodri/Ambar/portada.jpg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Ambar/docs_f8f2126f-fb5b-4d7a-9daa-d7625169d2fb_riviera_images_1.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/docs_0031cc80-6976-483a-9708-8b17d5cf6f6e_riviera_images_1.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/Captura%20de%20pantalla%202026-01-17%20a%20la(s)%204.08.44%E2%80%AFp.m..jpg" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/Captura%20de%20pantalla%202026-01-17%20a%20la(s)%204.13.12%E2%80%AFp.m..jpg" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/Captura%20de%20pantalla%202026-01-17%20a%20la(s)%204.11.02%E2%80%AFp.m..png?updatedAt=1768684347893" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/Captura%20de%20pantalla%202026-01-17%20a%20la(s)%204.20.36%E2%80%AFp.m..jpg" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/Captura%20de%20pantalla%202026-01-17%20a%20la(s)%204.23.26%E2%80%AFp.m..jpg" },
    { src: "https://ik.imagekit.io/devrodri/Ambar/Captura%20de%20pantalla%202026-01-17%20a%20la(s)%204.24.34%E2%80%AFp.m..jpg" }
  ],

  // microclaims
  microClaimsEs: [
    "3 torres · 322 residencias",
    "Terreno de 11 acres · estilo resort",
    "Studios a 3 dormitorios · 49–110 m²"
  ],
  microClaimsEn: [
    "3 towers · 322 residences",
    "11-acre resort-style property",
    "Studios to 3 bedrooms · 527–1,184 sq ft"
  ],

  // destacados (amenities)
  highlights: [
    "Residencias totalmente amuebladas, listas para habitar",
    "Piscina estilo resort con solárium y cabañas",
    "Restaurante y bar en el lugar",
    "Grab & go market + café",
    "Fitness center de última generación",
    "Spa, sauna y áreas de bienestar",
    "Recepción y servicios hoteleros",
    "Administración profesional por Coury Hospitality",
    "Acceso directo a US-192 e Interstate 4"
  ],
  highlightsEn: [
    "Fully furnished residences, move-in ready",
    "Resort-style pool with sundeck and cabanas",
    "On-site restaurant and bar",
    "Grab & go market + café",
    "State-of-the-art fitness center",
    "Spa, sauna and wellness areas",
    "Front desk and hotel-style services",
    "Professionally managed by Coury Hospitality",
    "Direct access to US-192 and Interstate 4"
  ],

  // tipologías
  unitMixEs: [
    "Studio · 49 m²",
    "1 dormitorio · 60–61 m²",
    "1 dormitorio + den · 70–71 m²",
    "2 dormitorios · 96 m²",
    "2 dormitorios + den · 101 m²",
    "3 dormitorios · 110 m²"
  ],
  unitMixEn: [
    "Studio · ~527 sq ft",
    "1 bedroom · ~646–657 sq ft",
    "1 bedroom + den · ~753–764 sq ft",
    "2 bedrooms · ~1,033 sq ft",
    "2 bedrooms + den · ~1,087 sq ft",
    "3 bedrooms · ~1,184 sq ft"
  ],

  // acabados (residencias)
  featuresEs: [
    "Interiores contemporáneos con diseño hotelero",
    "Cocinas totalmente equipadas",
    "Baños modernos y funcionales",
    "Distribuciones optimizadas para renta",
    "Entregadas completamente amuebladas"
  ],
  featuresEn: [
    "Contemporary hotel-inspired interiors",
    "Fully equipped kitchens",
    "Modern functional bathrooms",
    "Layouts optimized for rentals",
    "Delivered fully furnished"
  ],

  // plan de pagos
  paymentPlanEs: [
    "5% al firmar el contrato",
    "10% 30 días después",
    "5% 120 días después",
    "10% 180 días después",
    "70% al cierre"
  ],
  paymentPlanEn: [
    "5% at contract",
    "10% 30 days after contract",
    "5% 120 days after contract",
    "10% 180 days after contract",
    "70% at closing"
  ],

  // FAQs
  faqsEs: [
    {
      q: "¿Dónde está ubicado?",
      a: "3251 Secret Lake Dr, Kissimmee, FL 34747."
    },
    {
      q: "¿Desde qué precio?",
      a: "Studios desde USD 363,900 según lista de precios vigente."
    },
    {
      q: "¿Se puede vivir tiempo completo?",
      a: "No. El uso está limitado a ocupación temporal, máximo 30 días en un período de 12 meses."
    },
    {
      q: "¿Cómo se administra la propiedad?",
      a: "Administración hotelera profesional por Coury Hospitality."
    }
  ],
  faqsEn: [
    {
      q: "Where is it located?",
      a: "3251 Secret Lake Dr, Kissimmee, FL 34747."
    },
    {
      q: "Starting price?",
      a: "Studios from USD 363,900 per current price list."
    },
    {
      q: "Can I live full-time?",
      a: "No. Use is limited to temporary occupancy, up to 30 days in any 12-month period."
    },
    {
      q: "Who manages the property?",
      a: "Professionally managed by Coury Hospitality."
    }
  ]
};

export default pAmbarOrlando;
