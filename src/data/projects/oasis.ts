// src/data/projects/oasis.ts
// Proyecto cargado con tipado Project. Datos verificados desde brochures y sitio oficial.
// Amenidades y features: ver web oficial (amenities list) y brochure en español. (Citas en mensaje)
import type { Project } from "../types";

export const pOasis: Project = {
  id: "oasis-hallandale",
  name: "Oasis Hallandale",
  city: "Hallandale Beach",
  rentalPolicyEs: "1 alquiler/año · 6 meses mínimo",
  rentalPolicyEn: "1 lease per year · 6‑month minimum",
  furnished: undefined,
  priceFromUsd: 700000,
  delivery: "2025-2027",
  slug: "/proyectos/oasis-hallandale",
  image: "https://ik.imagekit.io/devrodri/Oasis/UpDctSXg.jpeg",

  microClaimsEs: [
    "Desarrollo mixto de ≈4 hectáreas",
    "2 torres residenciales de 25 pisos",
    "Retail, oficinas y restaurantes (≈8.800 m²)"
  ],
  microClaimsEn: [
    "10‑acre mixed‑use development",
    "Two 25‑story residential towers",
    "Retail, offices and restaurants (~95,000 sq ft)"
  ],

  highlights: [
    "Valet y lobby 24 h; salas de negocios y conferencias",
    "2 piscinas con cabañas, hot‑tub + cold plunge y cines",
    "Fitness & wellness center, yoga lawn, mini‑cancha de fútbol indoor",
    "Simulador de golf, lounge bar con mesas de billar, salón de banquetes",
    "Parque para mascotas y paw‑wash; cargadores para autos eléctricos; storage"
  ],
  highlightsEn: [
    "Valet and 24/7 lobby; business & conference rooms",
    "2 pools with cabanas, hot‑tub + cold plunge, indoor & outdoor cinema",
    "Fitness & wellness center, yoga lawn, indoor mini soccer field",
    "Golf simulator, lounge bar with pool tables, banquet hall",
    "Pet park & paw‑wash; EV charging; storage"
  ],

  unitMixEs: [
    "1-3 dormitorios",
    "Balcones con barandas de vidrio",
    "Ventanales piso‑techo"
  ],
  unitMixEn: [
    "1-3 bedrooms",
    "Glass‑railing balconies",
    "Floor‑to‑ceiling windows"
  ],

  featuresEs: [
    "Cocina italiana con tope monolítico e isla",
    "Electrodomésticos de acero inoxidable",
    "Porcelanatos italianos en cocina y baños",
    "Doble bacha y duchas sin marco en baños principales",
    "Clósets tipo walk‑in; toilette en unidades selectas"
  ],
  featuresEn: [
    "Italian cabinetry with seamless monolithic countertop & island",
    "Stainless‑steel appliances",
    "Imported Italian porcelain in kitchens and bathrooms",
    "Double vanity & frameless glass showers in primary baths",
    "Walk‑in closets; powder room in select residences"
  ],

  paymentPlanEs: [
    "US$10.000 reserva",
    "15% al contrato",
    "10% al iniciar obra (groundbreaking)",
    "15% a los 180 días",
    "60% al cierre (financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "US$10,000 reservation",
    "15% at contract",
    "10% at groundbreaking",
    "15% at 180 days",
    "60% at closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Precio desde?", a: "Desde ~USD 700.000 (1 dormitorio; referencias 2024-2025)." },
    { q: "¿Política de alquiler?", a: "1 alquiler por año; contrato mínimo 6 meses. No se permite renta corta (Airbnb)." },
    { q: "¿Plan de depósitos?", a: "Esquema referencial: reserva US$10.000; 15% contrato; 10% inicio de obra; 15% a 180 días; 60% cierre (varía por torre/etapa)." },
    { q: "¿Amoblamiento?", a: "Unidades ‘fully finished’, sin muebles. Consultar paquetes externos si se desea." },
    { q: "¿Entrega?", a: "Cronograma escalonado: West ~Q4 2025/Q1 2026; East ~2027." }
  ],
  faqsEn: [
    { q: "Starting price?", a: "From ~USD 700,000 (1‑bed; 2024-2025 references)." },
    { q: "Rental policy?", a: "1 lease per year; 6‑month minimum. No short‑term rentals (Airbnb)." },
    { q: "Deposit structure?", a: "Reference: US$10,000 reservation; 15% at contract; 10% at groundbreaking; 15% at 180 days; 60% at closing (varies by tower/stage)." },
    { q: "Furnishing?", a: "Delivered fully finished; furniture not included. Third‑party packages available." },
    { q: "Delivery timeline?", a: "Staggered: West ~Q4 2025/Q1 2026; East ~2027." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Oasis/9Ew6UaXQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/2YIKVQpA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/TNvGov_Q.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/D2WVuUzw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/exUc6KXw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/aKzfLilw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/fGgzBYxQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Oasis/BHMTHL7g.jpeg" }
  ]
};

export default pOasis;