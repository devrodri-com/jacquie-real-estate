// src/data/projects/viceroy-brickell-residences.ts
//
// TODO: Confirmar HOA (no incluir en data hasta tener documento oficial).
// TODO: Si se quiere publicar floor plans en la web, el modelo Project no soporta PDFs; requerir cambio de modelo/UI o usar el flujo actual de mailto.

import type { Project } from "../types";

// Dirección del edificio confirmada (parcel / permit address).
export const pViceroyBrickellResidences: Project = {
  id: "viceroy-brickell-residences",
  slug: "/proyectos/viceroy-brickell-residences",
  name: "Viceroy Brickell - The Residences",
  city: "77 SE 5th Street, Miami, FL 33131",
  delivery: "2026 Q1",

  priceFromUsd: 609900,

  rentalPolicyEs:
    "Alquiler mínimo de 30 días.",
  rentalPolicyEn:
    "Minimum lease term of 30 days.",

  paymentPlanEs: [
    "20% al firmar el contrato.",
    "10% a los 90 días.",
    "70% al cierre.",
  ],
  paymentPlanEn: [
    "20% at contract.",
    "10% at 90 days.",
    "70% at closing.",
  ],

  microClaimsEs: ["Desde US$609,900", "Ubicación One Brickell (Brickell)"],
  microClaimsEn: ["From $609,900", "Prime One Brickell location"],

  unitMixEs: ["Estudios", "1 dormitorio", "2 dormitorios", "Penthouses (selectos)"],
  unitMixEn: ["Studios", "1-bedroom", "2-bedroom", "Select penthouses"],

  highlights: [
    "Lobby vidriado con personal 24/7",
    "Fitness + wellness con saunas y salas de tratamiento",
    "Simulador multi-deporte (golf, soccer, basketball, F1)",
    "Sala de cine / screening room",
    "Deck estilo resort con piscina climatizada, spa exterior y cabanas",
    "Summer kitchen + dining exterior cubierto",
    "Cancha de bocce",
    "Membresía de beach club (Grand Bay Club, Key Biscayne) (según material)",
  ],
  highlightsEn: [
    "Glass-enclosed lobby with 24/7 staff",
    "Fitness + wellness center with saunas and treatment rooms",
    "Multi-sport simulator (golf, soccer, basketball, F1)",
    "Movie theater / screening room",
    "Resort-style deck with heated pool, outdoor spa and cabanas",
    "Summer kitchen + covered outdoor dining",
    "Bocce court",
    "Beach club membership (Grand Bay Club, Key Biscayne) (per material)",
  ],

  faqsEs: [
    {
      q: "¿Desde qué precio?",
      a: "City Flats (estudios) desde US$609,900 según el price list más reciente disponible. Los precios están sujetos a cambios.",
    },
    {
      q: "¿Plan de pagos?",
      a: "20% al firmar el contrato, 10% a los 90 días, 70% al cierre.",
    },
    {
      q: "¿Dónde está ubicado el proyecto?",
      a: "77 SE 5th Street, Miami, FL 33131.",
    },
    {
      q: "¿Cuál es la política de alquiler?",
      a: "El alquiler mínimo es de 30 días. Se permite alquilar hasta 12 veces por año. No se permiten alquileres de corto plazo (diarios o semanales). El proyecto es 100% residencial y no opera como condo-hotel.",
    },
    {
      q: "¿Puedo recibir floor plans?",
      a: "Sí. Solicitarlos por email o WhatsApp y te los compartimos. (El sitio no maneja PDFs; se envían por contacto.)",
    },
    {
      q: "¿Quién desarrolla el proyecto?",
      a: "Viceroy Brickell - The Residences es desarrollado por Related Group y GTIS Partners. Arquitectonica (arquitectura), Meyer Davis (interiores).",
    },
  ],
  faqsEn: [
    {
      q: "Starting price?",
      a: "City Flats (studios) from $609,900 per current price list. Prices are subject to change.",
    },
    {
      q: "Payment plan?",
      a: "20% at contract, 10% at 90 days, 70% at closing.",
    },
    {
      q: "Where is the project located?",
      a: "77 SE 5th Street, Miami, FL 33131.",
    },
    {
      q: "What is the rental policy?",
      a: "The minimum lease term is 30 days, with up to 12 leases per year. Short-term rentals (daily or weekly) are not permitted. The building is fully residential and does not operate as a condo-hotel.",
    },
    {
      q: "Can I receive floor plans?",
      a: "Yes. Request them via email or WhatsApp and we will share them. (The site does not host PDFs; they are sent upon contact.)",
    },
    {
      q: "Who develops the project?",
      a: "Viceroy Brickell - The Residences is developed by Related Group and GTIS Partners. Arquitectonica (architecture), Meyer Davis (interiors).",
    },
  ],

  image: "https://ik.imagekit.io/devrodri/Viceroy/1.jpg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Viceroy/2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/3.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/4.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/1.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/7.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/8.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Viceroy/9.jpg" },
  ],
};

export default pViceroyBrickellResidences;
