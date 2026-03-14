// src/data/projects/seven-park.ts
import type { Project } from "../types";

export const pSevenPark: Project = {
  id: "seven-park",
  slug: "/proyectos/seven-park",
  name: "Seven Park Residences",
  city: "218-220 SE 7th St, Hallandale Beach, FL 33009",

  priceFromUsd: 370000,
  delivery: "2027",
  furnished: false,

  rentalPolicyEs: "Uso flexible (short-/long-term)",
  rentalPolicyEn: "Flexible use (short-/long-term)",

  image: "https://ik.imagekit.io/devrodri/Seven%20Park/Portada.jpeg?updatedAt=1759349278151",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/01.jpeg?updatedAt=1759349277487" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/1.jpeg?updatedAt=1759349277522" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/2.jpeg?updatedAt=1759349278070" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/3.jpeg?updatedAt=1759349277989" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/4.jpeg?updatedAt=1759349278036" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/5.jpeg?updatedAt=1759349278236" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/6.jpeg?updatedAt=1759349278040" },
    { src: "https://ik.imagekit.io/devrodri/Seven%20Park/8.jpeg?updatedAt=1759349277531" }
  ],

  microClaimsEs: ["Frente a Peter Bluesten Park", "Amenidades ≈2,800 m²"],
  microClaimsEn: ["Facing Peter Bluesten Park", "~30,000 sq.ft amenities"],

  highlights: [
    "Piscina tipo resort, 2 hot tubs, cabañas y chaises",
    "BBQ's, coworking + sala de conferencias",
    "Media room / lounge / party room, content creation room",
    "Wellness: sauna, vapor, cold plunge; gimnasio ≈280 m²",
    "Estacionamiento para residentes y visitas; 24 cargadores EV",
    "Pet-friendly; depósitos privados limitados"
  ],
  highlightsEn: [
    "Resort-style pool, 2 hot tubs, cabanas and chaises",
    "Communal & private BBQs, coworking + conference room",
    "Media lounge / party room, content creation studio",
    "Wellness: sauna, steam, cold plunge; ~3,000 sq.ft gym",
    "Resident & guest parking; 24 EV chargers",
    "Pet-friendly; limited private storage"
  ],

  unitMixEs: ["Studios a 3 dormitorios · ver planos para m²"],
  unitMixEn: ["Studios to 3 bedrooms · see plans for m²/sq.ft"],

  featuresEs: [
    "Cocinas Mia Cucina + Bosch panel-ready; cuarzo waterfall; grifería brass",
    "Baños con porcelanato italiano; duchas sin marco; grifería brass",
    "Cielorrasos de ≈3 m; ventanales piso-techo; porcelanato; W/D en unidad"
  ],
  featuresEn: [
    "Mia Cucina kitchens + Bosch panel-ready; waterfall quartz; brass fixtures",
    "Italian porcelain baths; frameless showers; brass fixtures",
    "10 ft ceilings; floor-to-ceiling windows; porcelain floors; in-unit W/D"
  ],

  paymentPlanEs: [
    "10% reserva",
    "10% contrato",
    "10% groundbreaking",
    "10% losa 4º piso",
    "10% top-off",
    "50% cierre"
  ],
  paymentPlanEn: [
    "10% reservation",
    "10% at contract",
    "10% at groundbreaking",
    "10% 4th-floor slab",
    "10% at top-off",
    "50% at closing"
  ],

  faqsEs: [
    {
      q: "¿Equipo y sales gallery?",
      a: "Kadima (dev) · Fortune Development Sales · Sales Gallery: 21495 E Dixie Hwy, Aventura, FL 33180."
    },
    {
      q: "¿Se permiten alquileres de corta estancia?",
      a: "Sí, desde el día 1. El condominio no impone mínimos; se debe tramitar la licencia de Vacation Rental de Hallandale Beach."
    },
    {
      q: "¿Cuál es el plan de pagos?",
      a: "10% reserva · 10% contrato · 10% losa 4º piso · 10% top-off · 60% cierre (entrega estimada 2027)."
    },
    {
      q: "¿Prestamista preferido e incentivos?",
      a: "QKapital. Beneficios reportados: hasta US$20,000 a costos de cierre y descuento de tasa para quienes financien con el preferred lender."
    }
  ],
  faqsEn: [
    {
      q: "Team & sales gallery?",
      a: "Kadima (dev) · Fortune Development Sales · Sales Gallery: 21495 E Dixie Hwy, Aventura, FL 33180."
    },
    {
      q: "Are short-term rentals allowed?",
      a: "Yes, from day one. No condo minimums; owners must obtain the Hallandale Beach Vacation Rental license."
    },
    {
      q: "What is the payment plan?",
      a: "10% reservation · 10% contract · 10% 4th-floor slab · 10% top-off · 60% at closing (estimated delivery 2027)."
    },
    {
      q: "Preferred lender and incentives?",
      a: "QKapital. Reported benefits: up to US$20,000 toward closing costs and a rate discount for buyers using the preferred lender."
    }
  ]
};

export default pSevenPark;