// src/data/projects/the-standard-brickell.ts
import type { Project } from "../types";

export const pTheStandardBrickell: Project = {
  id: "the-standard-brickell",
  slug: "/proyectos/the-standard-brickell",
  name: "The Standard Residences, Brickell Miami",
  city: "690 SW 1st Avenue, Miami, FL 33130",
  delivery: "2027",
  priceFromUsd: 640000,
  furnished: false,

  rentalPolicyEs:
    "Mínimo 30 días",
  rentalPolicyEn:
    "30-day minimum",

  paymentPlanEs: [
    "20% al firmar el contrato.",
    "15% a los 90 días desde la firma del contrato.",
    "65% al cierre.",
  ],
  paymentPlanEn: [
    "20% at contract.",
    "15% 90 days from contract.",
    "65% at closing.",
  ],

  unitMixEs: ["Studios", "1 dormitorio", "2 dormitorios", "3 dormitorios"],
  unitMixEn: ["Studios", "1-bedroom", "2-bedroom", "3-bedroom"],

  microClaimsEs: ["Desde US$640K", "Entrega 2027", "Renta mínima 30 días"],
  microClaimsEn: ["From $640K", "Completion date 2027", "30-day minimum rentals"],

  highlights: [
    "Piscina rooftop",
    "Co-working lounge",
    "Bowling alley privada + lounge",
    "Screening lounge / media room",
    "Spa (hammam, sauna, steam room, cold plunge, salt therapy)",
    "Fitness center",
    "Speakeasy",
    "Social lounge + game room",
    "Outdoor kitchen / área social exterior",
  ],
  highlightsEn: [
    "Rooftop pool",
    "Co-working lounge",
    "Private bowling alley + lounge",
    "Screening lounge / media room",
    "Spa (hammam, sauna, steam room, cold plunge, salt therapy)",
    "Fitness center",
    "Speakeasy",
    "Social lounge + game room",
    "Outdoor kitchen / outdoor social area",
  ],

  featuresEs: [
    "Residencias con terraza/balcón (según tipología)",
    "Entrega sin amueblar (opción de paquete de mobiliario/upgrade)",
    "Diseño contemporáneo con terminaciones modernas (según especificaciones del prospectus)",
  ],
  featuresEn: [
    "Residences with terrace/balcony (by residence type)",
    "Delivered unfurnished (optional furniture upgrade package)",
    "Contemporary design with modern finishes (per prospectus specifications)",
  ],

  faqsEs: [
    {
      q: "¿Cuál es la dirección del edificio?",
      a: "690 SW 1st Avenue, Miami, FL 33130.",
    },
    {
      q: "¿Cuándo es la entrega estimada?",
      a: "Entrega estimada 2027 (sujeto a cronograma y permisos).",
    },
    {
      q: "¿Cuál es la política de renta?",
      a: "Mínimo 30 días, hasta 12 veces por año.",
    },
    {
      q: "¿Cuál es el plan de pagos?",
      a: "20% al contrato, 15% a los 90 días del contrato y 65% al cierre.",
    },
    {
      q: "¿Se entregan amuebladas?",
      a: "No. Se entregan sin amueblar, salvo que se adquiera un paquete de mobiliario/upgrade.",
    },
  ],
  faqsEn: [
    {
      q: "What is the building address?",
      a: "690 SW 1st Avenue, Miami, FL 33130.",
    },
    {
      q: "What is the estimated completion?",
      a: "Estimated delivery 2027 (subject to permits and construction timeline).",
    },
    {
      q: "What is the rental policy?",
      a: "30-day minimum.",
    },
    {
      q: "What is the deposit schedule?",
      a: "20% at contract, 15% 90 days from contract, and 65% at closing.",
    },
    {
      q: "Are residences delivered furnished?",
      a: "No. Residences are delivered unfurnished unless an optional furniture upgrade package is purchased.",
    },
  ],

  image: "https://ik.imagekit.io/devrodri/Standard%20Brickell/exterior.jpeg?updatedAt=1770565331852",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/piscina.jpeg?updatedAt=1770565331923" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/coworking.jpeg?updatedAt=1770565331922" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/Boowling.jpeg?updatedAt=1770565331826" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/Media%20Room.jpeg?updatedAt=1770565331917" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/SPA.jpeg?updatedAt=1770565331889" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/Balcon.jpeg?updatedAt=1770565331918" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/living.jpeg?updatedAt=1770565331886" },
    { src: "https://ik.imagekit.io/devrodri/Standard%20Brickell/bedroom.jpeg?updatedAt=1770565331917" },
  ],
};

export default pTheStandardBrickell;
