// src/data/projects/one-park-tower.ts
import type { Project } from "../types";

export const pOneParkTower: Project = {
  id: "one-park-tower",
  name: "One Park Tower by Turnberry",
  city: "North Miami",
  rentalPolicy: "30 días",
  furnished: false,
  priceFromUsd: 990900,
  delivery: "2025",
  financingAtClosing: true,
  slug: "/proyectos/one-park-tower",
  image: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15431.jpg",

  microClaimsEs: [
    "SoLé Mia: laguna Crystal Lagoon™",
    "Diseño Arquitectonica + Meyer Davis",
    "Amenidades resort + Beach Club"
  ],
  microClaimsEn: [
    "SoLé Mia Crystal Lagoon™",
    "Arquitectonica + Meyer Davis",
    "Resort amenities + Beach Club"
  ],

  highlights: [
    "Torre de 33 plantas con 299 residencias y penthouses",
    "Vistas a Bahía Biscayne, Atlántico y Oleta",
    "Ubicado dentro de SoLé Mia (≈74 hectáreas) con laguna de ≈3 hectáreas",
    "Dos piscinas: planta baja y terraza social nivel 6",
    "ONE Beach Club con playas de arena y deportes acuáticos",
    "Senderos, jardines y acceso a naturaleza (≈15 hectáreas de áreas verdes)"
  ],
  highlightsEn: [
    "33‑story tower with 299 residences and penthouses",
    "Views to Biscayne Bay, Atlantic Ocean and Oleta River State Park",
    "Set within 184‑acre SoLé Mia with a 7‑acre Crystal Lagoon™",
    "Two pools: ground level and 6th‑floor social terrace",
    "ONE Beach Club with sandy beaches and water sports",
    "Trails, gardens and access to nature (37+ acres of green)"
  ],

  unitMixEs: ["1 Dormitorio", "2 Dormitorios", "3 Dormitorios", "Penthouses"],
  unitMixEn: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "Penthouses"],

  featuresEs: [
    "Interiores por Meyer Davis Studio; arquitectura de Arquitectonica",
    "Balcones envolventes con barandas de cristal y ventanales piso‑techo",
    "Cocinas italianas Italkraft con electrodomésticos Sub‑Zero & Wolf",
    "Baños con Italkraft, duchas sin marco y bañera en unidades selectas",
    "Gimnasio de última generación y spa con sauna y vapor",
    "Simulador de golf, sala club, salón ejecutivo y café",
    "Pet‑friendly con spa para mascotas",
  ],
  featuresEn: [
    "Interiors by Meyer Davis; architecture by Arquitectonica",
    "Wraparound balconies, floor‑to‑ceiling glass",
    "Italian kitchens by Italkraft with Sub‑Zero & Wolf appliances",
    "Bathrooms by Italkraft, frameless showers, soaking tub in select units",
    "State‑of‑the‑art fitness center and spa with sauna & steam",
    "Golf simulator, club room, executive lounge & café",
    "Pet‑friendly with pet spa",
  ],

  // No deposit schedule público en el brochure; se deja vacío para evitar inexactitudes.
  paymentPlanEs: [],
  paymentPlanEn: [],

  faqsEs: [
    { q: "¿Dónde queda?", a: "En SoLé Mia (2411 Laguna Circle, North Miami), entre Biscayne Blvd y la Bahía de Biscayne." },
    { q: "¿Qué distingue al proyecto?", a: "Acceso a la Crystal Lagoon™ de 7 acres con ONE Beach Club, diseño de primer nivel y amenidades resort." },
    { q: "¿Qué tipologías hay?", a: "Residencias de 1, 2 y 3 dormitorios más penthouses." },
    { q: "¿Qué amenities incluye?", a: "Dos piscinas, gimnasio y spa, golf simulator, salones sociales, senderos y jardines; deportes acuáticos en la laguna." },
    { q: "¿Cuál es el precio de entrada?", a: "Desde USD 990,900 (1 dormitorio)." },
    { q: "¿Hay financiación para extranjeros?", a: "Sí, disponible para el pago final al cierre." },
    { q: "¿Quiénes son los diseñadores?", a: "Arquitectonica (arquitectura), Meyer Davis (interiores) y DSBoca (paisajismo)." },
    { q: "¿Qué ofrece SoLé Mia además de la laguna?", a: "ONE Beach Club, 37+ acres de áreas verdes, senderos y proximidad al Parque Oleta." }
  ],
  faqsEn: [
    { q: "Where is it located?", a: "Within SoLé Mia (2411 Laguna Circle, North Miami), between Biscayne Blvd and Biscayne Bay." },
    { q: "What makes it unique?", a: "Access to the 7‑acre Crystal Lagoon™ with ONE Beach Club, top design team and resort‑style amenities." },
    { q: "What unit types are offered?", a: "1‑, 2‑ and 3‑bedroom residences plus penthouses." },
    { q: "Key amenities?", a: "Two pools, fitness & spa, golf simulator, social lounges, gardens & trails; water sports at the lagoon." },
    { q: "What is the starting price?", a: "From USD 990,900 (1-bedroom)." },
    { q: "Is financing available for foreign buyers?", a: "Yes, available for the balance at closing." },
    { q: "Who are the design teams?", a: "Arquitectonica (architecture), Meyer Davis (interiors), DSBoca (landscape)." },
    { q: "What else does SoLé Mia offer?", a: "ONE Beach Club, 37+ acres of green space and trails, next to Oleta River State Park." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15436-2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15395-2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15434.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/TU1323_One-Park-Tower_VPInt_01-scaled.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15402-2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15419.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15421-2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Park%20Tower/Group-15420.jpg" }
  ]
};