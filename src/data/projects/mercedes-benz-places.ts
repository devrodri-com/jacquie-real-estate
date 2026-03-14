// src/data/projects/mercedes-benz-places.ts
import type { Project } from "../types";

export const pMercedesBenzPlaces: Project = {
  id: "mercedes-benz-places",
  name: "Mercedes-Benz Places Miami",
  city: "Brickell",
  rentalPolicy: "Sin restricciones", // legacy fallback
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No rental restrictions",
  furnished: true,
  priceFromUsd: 685500,
  delivery: "2028",
  financingAtClosing: true,
  slug: "/proyectos/mercedes-benz-places",
  image: "https://ik.imagekit.io/devrodri/Mercedes/5Nc7cZWg.jpeg",

  microClaimsEs: [
    "Primer proyecto residencial de Mercedes-Benz en Norteamérica",
    "Arquitectura por SHoP + interiores Woods Bagot",
    "Ubicado en el corazón de Brickell"
  ],
  microClaimsEn: [
    "Mercedes-Benz first residential project in North America",
    "Architecture by SHoP + interiors Woods Bagot",
    "Located in the heart of Brickell"
  ],

  highlights: [
    "Studios a 3BR + den",
    "Amenidades Mercedes‑Benz ≈12,000 m²",
    "Piscinas rooftop y sun deck, spa y wellness de última generación",
    "Restaurantes, lounge Silver Arrow, simulador de F1 y cine privado",
    "Parque Southside de ≈0.8 hectáreas con canchas, playground y conexión al Underline"
  ],
  highlightsEn: [
    "Studios to 3BR + den",
    "130k sf of Mercedes‑Benz amenities",
    "Rooftop pools & sun deck, state-of-the-art spa & wellness",
    "Restaurants, Silver Arrow lounge, F1 simulator & screening room",
    "Southside Park (2 acres) with courts, playground & Underline connection"
  ],

  unitMixEs: ["Studios", "1 Dormitorio", "1 Dormitorio + Den", "2 Dormitorios", "2 Dormitorios + Den", "3 Dormitorios", "3 Dormitorios + Den"],
  unitMixEn: ["Studios", "1 Bedroom", "1 Bedroom + Den", "2 Bedrooms", "2 Bedrooms + Den", "3 Bedrooms", "3 Bedrooms + Den"],

  featuresEs: [
    "Residencias amuebladas y terminadas con diseño Mercedes-Benz",
    "Ventanas de piso a techo de ≈3 m y terrazas de ≈1.5 m de profundidad",
    "Cocinas personalizadas con electrodomésticos Miele",
    "Baños con piedra natural, griferías en acabado oro rosado y sanitarios Duravit",
    "Tecnología integrada en todas las residencias (smart home)",
    "Servicio de concierge 24h, valet y Mercedes-Benz house cars"
  ],
  featuresEn: [
    "Residences fully furnished with Mercedes-Benz design",
    "10’ floor-to-ceiling windows and 5’ deep terraces",
    "Custom kitchens with Miele appliances",
    "Bathrooms with natural stone, rose-gold fixtures and Duravit",
    "Integrated smart home technology",
    "24h concierge, valet and Mercedes-Benz house cars"
  ],

  paymentPlanEs: [
    "20% al contrato",
    "10% a los 180 días del contrato",
    "10% al llegar al nivel de la residencia",
    "10% al top-off",
    "50% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "20% at contract",
    "10% 180 days from contract",
    "10% at residence level",
    "10% at top-off",
    "50% at closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Dónde se ubica el proyecto?", a: "En 1133 SW 2nd Avenue, Brickell, junto al parque Southside y el Underline." },
    { q: "¿Quiénes son los diseñadores?", a: "Arquitectura por SHoP, interiores Woods Bagot, paisajismo Field Operations." },
    { q: "¿Qué amenities incluye?", a: "Piscinas rooftop, spa, restaurantes, simulador de F1, Silver Arrow lounge, cine privado, coworking y parque Southside." },
    { q: "¿Cuál es el plan de pagos?", a: "20% contrato, 10% a 180 días, 10% al nivel, 10% top-off, 50% cierre (con financiación)." },
    { q: "¿Cuál es el precio de entrada?", a: "Desde USD 685,500 (studios)." },
    { q: "¿Qué superficies manejan las residencias?", a: "Estudios ≈45-63 m²; 1 dormitorio ≈67-76 m²; 2 dormitorios ≈89-123 m²; 3 dormitorios ≈164-196 m²." },
    { q: "¿Qué es Southside Park y el Underline?", a: "Parque de ≈0.8 hectáreas con canchas, playground, dog run y conexión directa al Underline." },
    { q: "¿Qué tecnología integra el proyecto?", a: "Plataforma ReWyre para soluciones de sostenibilidad, seguridad y experiencia del residente (automación, EV charging, access control, etc.)." }
  ],
  faqsEn: [
    { q: "Where is it located?", a: "1133 SW 2nd Avenue, Brickell, next to Southside Park and the Underline." },
    { q: "Who are the designers?", a: "Architecture by SHoP, interiors by Woods Bagot, landscaping by Field Operations." },
    { q: "What amenities are included?", a: "Rooftop pools, spa, restaurants, F1 simulator, Silver Arrow lounge, screening room, co-working and Southside Park." },
    { q: "What is the payment plan?", a: "20% contract, 10% in 180 days, 10% at residence level, 10% at top-off, 50% closing (with financing)." },
    { q: "What is the starting price?", a: "From USD 685,500 (studios)." },
    { q: "What are the typical sizes?", a: "Studios 479-683 sf; 1BR 719-815 sf; 2BR 959-1,320 sf; 3BR 1,763-2,106 sf." },
    { q: "What is Southside Park / the Underline?", a: "A 2‑acre park with courts, playground and a direct connection to the Underline." },
    { q: "What technology is integrated?", a: "ReWyre platform for sustainability, security and tenant experience (automation, EV charging, access control, etc.)." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Mercedes/vu8FiAnw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/CAyVPlnf.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/gFd_dG1i.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/Mc3V8Dxw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/B1Jk_-KQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/1KRHzEWw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/RWcVo0gA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Mercedes/o21XynkQ.jpeg" }
  ]
};
