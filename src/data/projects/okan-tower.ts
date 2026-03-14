// src/data/projects/okan-tower.ts
import type { Project } from "../types";

export const pOkanTower: Project = {
  id: "okan-tower",
  name: "Okan Tower Miami",
  city: "Downtown Miami",
  rentalPolicy: "Sin restricciones", // legacy fallback
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No rental restrictions",
  furnished: true,
  priceFromUsd: 800000,
  delivery: "2027",
  financingAtClosing: true,
  slug: "/proyectos/okan-tower",
  image: "https://ik.imagekit.io/devrodri/Okan%20Tower/EL5TgTFw.jpeg",

  microClaimsEs: [
    "70 pisos con diseño inspirado en un tulipán",
    "Operado por Hilton Hotels & Resorts",
    "Residencias Sky y Short-Term"
  ],
  microClaimsEn: [
    "70 floors inspired by a tulip",
    "Operated by Hilton Hotels & Resorts",
    "Sky & Short-Term Residences"
  ],

  highlights: [
    "555 N Miami Ave, frente a Worldcenter",
    "163 Sky Residences (1-3BR) desde piso 51",
    "236 Condo-Hotel Residences by Hilton desde el piso 36",
    "Hilton Hotel & Resort de 5 estrellas integrado",
    "Amenidades: piscina rooftop, spa turco, gimnasio, cine, lounges y wine cellar"
  ],
  highlightsEn: [
    "555 N Miami Ave, next to Worldcenter",
    "163 Sky Residences (1-3BR) from 51st",
    "236 Hilton Condo-Hotel Residences from floor 36",
    "Integrated 5-star Hilton Hotel & Resort",
    "Amenities: rooftop pool, Turkish spa, gym, cinema, lounges & wine cellar"
  ],

  unitMixEs: ["Studios", "1 Dormitorio", "1 Dormitorio + Den", "2 Dormitorios", "2 Dormitorios + Den", "3 Dormitorios", "3 Dormitorios + Den", "Penthouses"],
  unitMixEn: ["Studios", "1 Bedroom", "1 Bedroom + Den", "2 Bedrooms", "2 Bedrooms + Den", "3 Bedrooms", "3 Bedrooms + Den", "Penthouses"],

  featuresEs: [
    "Residencias terminadas y amuebladas",
    "Ventanas de piso a techo de 3m y terrazas privadas",
    "Cocinas con ebanistería italiana y electrodomésticos premium",
    "Baños con acabados de lujo y mármol turco",
    "Servicios Hilton: concierge, room service, housekeeping"
  ],
  featuresEn: [
    "Turnkey furnished residences",
    "~10 ft floor-to-ceiling windows and private terraces",
    "Italian kitchens with premium appliances",
    "Luxury bathrooms with Turkish marble finishes",
    "Hilton services: concierge, room service, housekeeping"
  ],

  paymentPlanEs: [
    "30% al contrato",
    "10% al nivel de amenidades (piso 12)",
    "10% al top-off",
    "50% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "30% at contract",
    "10% at amenity level (12th floor)",
    "10% at top-off",
    "50% at closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Qué tipo de residencias hay?", a: "Sky Residences de lujo en pisos 51-68 y Short-Term Residences by Hilton en pisos 36-50." },
    { q: "¿Desde cuánto parten los precios?", a: "Studios desde USD 800,000." },
    { q: "¿Qué amenities destacan?", a: "Piscina rooftop, spa turco, gimnasio con Peloton/Mirror, cine, wine cellar, lounges y salones de eventos." },
    { q: "¿Qué servicios incluye Hilton?", a: "Concierge, housekeeping, room service, catering y reservas prioritarias." }
  ],
  faqsEn: [
    { q: "What types of residences are offered?", a: "Luxury Sky Residences (floors 51-68) and Hilton Short-Term Residences (floors 36-50)." },
    { q: "What is the starting price?", a: "Studios from USD 800,000." },
    { q: "What are the key amenities?", a: "Rooftop pool, Turkish spa, gym with Peloton/Mirror, cinema, wine cellar, lounges & event rooms." },
    { q: "What Hilton services are included?", a: "Concierge, housekeeping, room service, catering and priority reservations." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/6Y0s1YAQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/L85y24PA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/_w8RMS5g.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/uXLiABbA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/7fko9BDg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/djjw9JWA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/kX2RaQuA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Okan%20Tower/zn3bqFdA.jpeg" }
  ]
};