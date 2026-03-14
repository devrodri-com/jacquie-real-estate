// src/data/projects/ella-miami.ts
import type { Project } from "../types";

export const pEllaMiami: Project = {
  id: "ella-miami",
  name: "ELLA Miami Beach",
  city: "Miami Beach",
  delivery: "2026",
  priceFromUsd: 477000,
  // STR-friendly (short-term allowed). Usamos "No Restrictions" para consistencia con filtros.
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No restrictions",
  furnished: true,
  slug: "/proyectos/ella-miami",
  image: "/images/projects/ella.webp",

  // Micro‑claims (chips)
  microClaimsEs: ["Renta corta aprobada", "Rooftop con piscina", "North Beach"],
  microClaimsEn: ["STR friendly", "Rooftop pool", "North Beach"],

  // Highlights (bullets de venta)
  highlights: [
    "Residencias inspiradas en el Art Deco de Miami Beach",
    "Estudios, 1 y 2 dormitorios con amplias terrazas",
    "Rentas de corto plazo permitidas (STR friendly)",
    "A ~5 minutos a pie de la playa",
    "Cocinas ItalKraft y paquete de electrodomésticos panel‑ready",
    "Paquetes de amueblado disponibles por Interiors by Steven G",
  ],
  highlightsEn: [
    "Art‑Deco inspired collection in Miami Beach",
    "Studios, 1 & 2‑bedroom residences with large terraces",
    "Short‑term rentals allowed (STR friendly)",
    "≈5‑minute walk to the beach",
    "ItalKraft kitchens with panel‑ready appliance package",
    "Optional furnishing packages by Interiors by Steven G",
  ],

  // Unit mix (rangos del brochure)
  unitMixEs: [
    "Estudios · ~32 m² interiores · 8 m² terraza · total ~40 m²",
    "1 dormitorio · ~51-73 m² interiores · 17-48 m² terraza · total ~72-121 m²",
    "2 dormitorios · ~95-101 m² interiores · 46-68 m² terraza · total ~142-163 m²",
  ],
  unitMixEn: [
    "Studios · ~342 sf interiors · 87-90 sf exterior · total ~429-432 sf",
    "1 bed · ~615-618 sf interiors · 183-384 sf exterior · total ~798-1,002 sf",
    "2 bed · ~1,019-1,089 sf interiors · 499-737 sf exterior · total ~1,526-1,756 sf",
  ],

  // Features / amenities resumidas
  featuresEs: [
    "Piscina en rooftop con vistas a bahía y Downtown",
    "Cold plunge y sauna",
    "Fitness center + plataforma de yoga y meditación al aire libre",
    "Cancha de paddle y pickleball",
    "Cocina de verano y comedor exterior cubierto",
    "Sala de trabajo y administración de propiedades",
    "Garaje en edificio, storage de bicicletas y sala de paquetes",
  ],
  featuresEn: [
    "Rooftop pool with bay & skyline views",
    "Cold plunge and sauna",
    "Fitness center + outdoor yoga & meditation deck",
    "Paddle & pickleball court",
    "Summer kitchen and covered outdoor dining",
    "Work lounge and on‑site property management",
    "On‑site garage, bike storage and package room",
  ],

  // Payment plan (editorial estándar; se ajusta si recibimos el oficial)
  paymentPlanEs: [
    "20% al contrato",
    "15% a los 90 días",
    "15% al completar estructura (top off)",
    "50% al cierre (financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "20% at Contract",
    "15% 90 days after contract",
    "15% at Top Off",
    "50% at Closing (financing available for foreigners)"
  ],

  // FAQs orientativas
  faqsEs: [
    { q: "¿Se permiten rentas cortas?", a: "Sí. El proyecto es STR‑friendly (rentas de corto plazo permitidas)." },
    { q: "¿Está cerca de la playa?", a: "Sí. Aproximadamente a 5 minutos caminando." },
    { q: "¿Hay opciones amuebladas?", a: "Sí. Paquetes completos por Interiors by Steven G." },
  ],
  faqsEn: [
    { q: "Are short‑term rentals allowed?", a: "Yes. STR‑friendly (short‑term rentals allowed)." },
    { q: "How close is the beach?", a: "Roughly a 5‑minute walk." },
    { q: "Are furnishing packages available?", a: "Yes, by Interiors by Steven G." },
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/ella-miami-beach-03.jpg?updatedAt=1757212992581" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/ella-miami-beach-07.jpg?updatedAt=1757212992507" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/Gtd1LINg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/1X7YlYjw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/ella-miami-beach-08.jpg?updatedAt=1757212992563" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/ella-miami-beach-01.jpg?updatedAt=1757212991986" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/G4m3fvVQ.jpeg?updatedAt=1757212991597" },
    { src: "https://ik.imagekit.io/devrodri/ELLA-Miami/hh6lcwuQ.jpeg?updatedAt=1757212991625" },
  ],
};