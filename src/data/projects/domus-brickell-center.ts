// src/data/projects/domus-brickell-center.ts
import type { Project } from "../types";

export const pDomusBrickellCenter: Project = {
  id: "domus-brickell-center",
  name: "Domus Brickell Center",
  city: "Brickell",
  rentalPolicy: "Sin restricciones", // legacy fallback
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No rental restrictions",
  furnished: true,
  priceFromUsd: 470000,
  delivery: "2027",
  financingAtClosing: true,
  slug: "/proyectos/domus-brickell-center",
  image: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/c_nOVrUw.jpeg",

  microClaimsEs: [
    "Modelo flexible de renta (Airbnb/Booking/Hyatt/Marriott)",
    "579 FLATS amueblados (Estudio, 1 y 2BR)",
    "35 pisos · ≈1,900 m² de amenities"
  ],
  microClaimsEn: [
    "Flexible rental model (Airbnb/Booking/Hyatt/Marriott)",
    "579 furnished FLATS (Studio, 1 & 2BR)",
    "35 stories · 20,000 sq ft of amenities"
  ],

  highlights: [
    "Ubicación: 1034 SW 2nd Ave, junto a Brickell City Centre",
    "Wellness Deck: yoga, spa y gimnasio indoor/outdoor",
    "Piscina rooftop con vistas + lounge/bar y restaurante en lobby",
    "Sistema Domus Management con pricing dinámico y 100+ canales (Hyatt/Marriott)"
  ],
  highlightsEn: [
    "Prime address: 1034 SW 2nd Ave, next to Brickell City Centre",
    "Wellness Deck with yoga, spa and indoor/outdoor gym",
    "Rooftop pool with views + sky lounge/bar and lobby restaurant",
    "Domus Management: dynamic pricing & 100+ channels (Hyatt/Marriott)"
  ],

  unitMixEs: ["Studios", "1 Dormitorio", "2 Dormitorios"],
  unitMixEn: ["Studios", "1 Bedroom", "2 Bedrooms"],

  featuresEs: [
    "FLATS terminados y amueblados (hard flooring en toda la unidad)",
    "Balcón privado en todas las unidades",
    "Cerradura inteligente sin llave (smart lock)",
    "Cocina con paquete de electrodomésticos premium",
    "Encimeras de piedra y grifería moderna",
    "Agua filtrada UV en el edificio y aire filtrado en áreas comunes",
    "Bike sharing, business lounge y owner portal con analítica"
  ],
  featuresEn: [
    "Turnkey furnished FLATS (hard flooring throughout)",
    "Private balcony in every unit",
    "Keyless smart lock entry",
    "Kitchen with premium appliance package",
    "Stone countertops & modern fixtures",
    "Building‑wide UV water filtration and filtered air in common areas",
    "Bike sharing, business lounge and owner portal with analytics"
  ],

  paymentPlanEs: [
    "10% al contrato",
    "10% a los 30 días (completa 20%)",
    "10% a los 60 días (completa 30%)",
    "70% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "10% at contract",
    "10% in 30 days (to complete 20%)",
    "10% in 60 days (to complete 30%)",
    "70% at Closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Se permiten alquileres de corto plazo?", a: "Sí. Modelo flexible con integración a Airbnb, Booking y alianzas con Hyatt/Marriott." },
    { q: "¿Las unidades se entregan amuebladas?", a: "Sí. FLATS terminados y amueblados listos para rentar/usar." },
    { q: "¿Dónde está ubicado?", a: "1034 SW 2nd Ave, en el corazón de Brickell, a metros de Metrorail/Metromover y Brickell City Centre." },
    { q: "¿Cuál es el precio de entrada?", a: "Desde USD 470,000 (estudios)." },
    { q: "¿Qué amenities principales incluye?", a: "Rooftop con piscina y lounge, wellness deck (yoga, spa, gimnasio), restaurante en lobby y business lounge." },
    { q: "¿Cuál es el plan de pagos?", a: "10% al contrato, 10% a 30 días, 10% a 60 días y 70% al cierre (con financiación para extranjeros)." }
  ],
  faqsEn: [
    { q: "Are short‑term rentals allowed?", a: "Yes. Flexible model integrated with Airbnb/Booking and Hyatt/Marriott partnerships." },
    { q: "Are the residences furnished?", a: "Yes. Turnkey FLATS delivered fully finished and furnished." },
    { q: "Where is it located?", a: "1034 SW 2nd Ave, in the heart of Brickell, steps to Metrorail/Metromover and Brickell City Centre." },
    { q: "What is the starting price?", a: "From USD 470,000 (studios)." },
    { q: "What are the main amenities?", a: "Rooftop pool & lounge, wellness deck (yoga, spa, gym), lobby restaurant and business lounge." },
    { q: "What is the payment plan?", a: "10% at contract, 10% in 30 days, 10% in 60 days and 70% at closing (financing for foreign buyers)." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/osYxguqg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/uUMtGHZw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/sw7vVp0w.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/Cjir9QRQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/KvH4wVCA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/SEtJgUoQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/4mj3v7Kw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus%20Brickell%20Center/PP8zSn4w.jpeg" }
  ]
};