// src/data/projects/palma.ts
import type { Project } from "../types";

export const pPalma: Project = {
  id: "palma-miami-beach",
  name: "Palma Miami Beach",
  city: "North Beach, Miami Beach",
  rentalPolicyEs: "Sin restricción de alquiler mínimo; STR permitidos",
  rentalPolicyEn: "No minimum rental restrictions; STR allowed",
  furnished: true,
  priceFromUsd: 600000,
  delivery: "2026",
  slug: "/proyectos/palma-miami-beach",
  image: "https://ik.imagekit.io/devrodri/Palma/Ekinbtkg.jpeg",

  images: [
    { src: "https://ik.imagekit.io/devrodri/Palma/YGLGGn8Q.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Palma/Km2ZFxbA.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Palma/1-3oE67g.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Palma/y-dH-evQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Palma/_gOt7jMQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Palma/Bh6nExSw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Palma/eC1S5jbQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Sk7mItag.jpg" }
  ],

  microClaimsEs: [
    "Residencias terminadas y amuebladas",
    "Sin restricción de alquiler mínimo (STR)",
    "Boutique a pasos de la playa"
  ],
  microClaimsEn: [
    "Fully finished & furnished residences",
    "No minimum rental restrictions (STR)",
    "Boutique, steps from the beach"
  ],

  highlights: [
    "Piscina estilo resort con cabañas",
    "Cocina de verano al aire libre con bar y área de eventos",
    "Salón para residentes junto a la piscina (interior/exterior)",
    "Gimnasio rooftop totalmente equipado (Technogym)",
    "Jacuzzi y piscinas de inmersión fría",
    "Edificio inteligente con fibra óptica y Wi‑Fi en áreas comunes",
    "Acceso seguro 24/7 a edificio, amenidades y áreas privadas"
  ],
  highlightsEn: [
    "Resort‑style pool with cabanas",
    "Outdoor summer kitchen with bar and event area",
    "Resident lounge by the pool (indoor/outdoor)",
    "Rooftop fitness center fully equipped (Technogym)",
    "Wellness jacuzzi and cold plunge pools",
    "Smart building with fiber and Wi‑Fi in common areas",
    "Secure 24/7 access to building, amenities and private areas"
  ],

  unitMixEs: [
    "1 dormitorio: 38–53 m²",
    "2 dormitorios: 58–83 m²",
    "Penthouses: 38–125 m²",
    "126 residencias · 14 pisos"
  ],
  unitMixEn: [
    "1 BR: 405–573 sq ft",
    "2 BR: 620–889 sq ft",
    "Penthouses: 414–1,342 sq ft",
    "126 residences · 14 stories"
  ],

  featuresEs: [
    "Puertas corredizas de piso a techo con vidrio resistente a impactos",
    "Balcones privados",
    "Techos de ≈2.7–3 m",
    "Pre‑cableado para internet de alta velocidad y Wi‑Fi",
    "A/C y calefacción central de alta eficiencia",
    "Lavadora y secadora en cada unidad",
    "Cocinas con gabinetes europeos y paquete Bosch",
    "Encimeras y salpicaderos de piedra premium",
    "Baños con porcelanato, duchas sin marco y herrajes europeos"
  ],
  featuresEn: [
    "Floor‑to‑ceiling impact‑resistant sliding glass doors",
    "Private balconies",
    "9-10 ft ceiling heights",
    "Pre‑wired for high‑speed internet and Wi‑Fi",
    "Energy‑efficient central A/C and heating",
    "In‑unit washer & dryer",
    "European cabinetry and Bosch appliance package",
    "Premium stone countertops and backsplashes",
    "Porcelain baths with frameless glass and European fixtures"
  ],

  paymentPlanEs: [
    "10% a la reserva",
    "10% al contrato",
    "10% al inicio de obra",
    "10% al nivel de piscina",
    "10% al top‑off",
    "50% al cierre (financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "10% at reservation",
    "10% at contract",
    "10% at groundbreaking",
    "10% at pool deck level",
    "10% at top‑off",
    "50% at closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Renta mínima?", a: "Sin restricción de alquiler mínimo; STR permitidos (según normativa local de Certificado de Uso)." },
    { q: "¿Amoblamiento?", a: "Sí, residencias completamente terminadas y amuebladas." },
    { q: "¿Cantidad de unidades y pisos?", a: "126 residencias en 14 pisos." },
    { q: "¿Entrega?", a: "2026 (estimada)." },
    { q: "¿Plan de depósitos?", a: "10% reserva · 10% contrato · 10% inicio de obra · 10% nivel de piscina · 10% top‑off · 50% cierre (financiación disponible para extranjeros)." }
  ],
  faqsEn: [
    { q: "Minimum rental?", a: "No minimum rental restrictions; STR allowed (subject to city Certificate of Use)." },
    { q: "Furnishing?", a: "Yes, residences delivered fully finished and furnished." },
    { q: "How many units and stories?", a: "126 residences across 14 stories." },
    { q: "Delivery?", a: "2026 (estimated)." },
    { q: "Deposit structure?", a: "10% reservation · 10% contract · 10% groundbreaking · 10% pool deck · 10% top‑off · 50% closing (financing available for foreign buyers)." }
  ]
};

export default pPalma;
