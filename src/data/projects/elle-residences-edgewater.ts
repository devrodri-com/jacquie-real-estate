// src/data/projects/elle-residences-edgewater.ts
import type { Project } from "../types";

export const pElleResidences: Project = {
  id: "elle-residences",
  slug: "/proyectos/elle-residences",
  name: "ELLE Residences Miami",
  city: "3618 NE 5th Ave, Miami, FL 33137, EE. UU.",
  priceFromUsd: 590000,
  delivery: "2028",

  furnished: true,

  // STR policy
  rentalPolicyEs: "Renta flexible: opción de usar plataformas o un programa de renta totalmente administrado.",
  rentalPolicyEn: "Flexible rentals: option to use platforms or a fully managed rental program.",

  // hero + galería
  image: "https://ik.imagekit.io/devrodri/Elle%20Residences/Elle%20Residences%20Miami%2008.jpg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/1.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/2.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/3.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/4.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/5.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/6.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/7.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Elle%20Residences/8.jpeg" }
  ],

  // microclaims
  microClaimsEs: [
    "25 pisos · 180 residencias",
    "2 piscinas (deck + rooftop)",
    "1–2 dormitorios · ≈42–79 m²"
  ],
  microClaimsEn: [
    "25 floors · 180 residences",
    "2 pools (deck + rooftop)",
    "1–2 bedrooms · 450–845 sq ft"
  ],

  // destacados (amenities)
  highlights: [
    "Lobby doble altura · valet · concierge 24/7",
    "Café & restaurant · boutique retail · Wi-Fi",
    "Deck estilo resort (inspirado en la Riviera Francesa) con pool, cabanas y lounge",
    "Outdoor movie theater · shuffleboard & bocce",
    "Gym + fitness programming · yoga & meditation garden",
    "Spa: sauna, steam, experience shower, salt wall · soaking spa & cold plunge",
    "Rooftop Sky Pool con vistas (norte/este/oeste)",
    "Maison Club: library, listening room, lounge con bar"
  ],
  highlightsEn: [
    "Double-height lobby · valet · 24/7 concierge",
    "Café & restaurant · boutique retail · high-speed Wi-Fi",
    "French Riviera-inspired resort deck with pool, cabanas & lounge",
    "Outdoor movie theater · shuffleboard & bocce",
    "Gym + branded fitness programming · yoga & meditation garden",
    "Spa: sauna, steam, experience shower, salt wall · soaking spa & cold plunge",
    "Rooftop Sky Pool with views (north/east/west)",
    "Maison Club: library, listening room, lounge with bar"
  ],

  // tipologías
  unitMixEs: [
    "1–2 dormitorios · ≈42–79 m² (equivalente a 450–845 sq ft)"
  ],
  unitMixEn: [
    "1–2 bedrooms · 450–845 sq ft"
  ],

  // acabados (residencias)
  featuresEs: [
    "Ventanales piso-techo con vidrio de impacto",
    "Techos altos · Grande Suites con techos de 11 ft (≈3.4 m)",
    "Cocinas con suite de electrodomésticos Miele",
    "Carpintería italiana Italkraft",
    "Mesadas de cuarzo",
    "Piso de madera patrón chevron (inspiración francesa)",
    "Herrajes/terminaciones en brass · smart climate control",
    "Lavadora/secadora de alta eficiencia · closets built-in"
  ],
  featuresEn: [
    "Floor-to-ceiling impact windows & doors",
    "High ceilings · top-floor Grande Suites with 11-foot ceilings",
    "Miele appliance suite",
    "Imported Italian cabinetry & woodwork by Italkraft",
    "Quartz countertops",
    "French-inspired chevron pattern wood flooring",
    "Modern brass fixtures · smart climate control",
    "High-efficiency washer/dryer · built-in closets"
  ],

  // plan de pagos
  paymentPlanEs: [
    "20% al contrato",
    "10% al inicio de obra (groundbreaking)",
    "10% 90 días después o al nivel de amenidades (lo que ocurra primero)",
    "10% al top-off",
    "Balance al cierre"
  ],
  paymentPlanEn: [
    "20% at contract",
    "10% at groundbreaking",
    "10% 90 days later or at amenity level (whichever comes first)",
    "10% at top-off",
    "Balance at closing"
  ],

  // FAQs
  faqsEs: [
    {
      q: "¿Dirección y sales gallery?",
      a: "600 NE 36th St, Suite C1, Miami, FL 33137 (Edgewater)."
    },
    {
      q: "¿Tipologías y tamaños?",
      a: "Residencias de 1 a 2 dormitorios, 450–845 sq ft (≈42–79 m²)."
    },
    {
      q: "¿Depósito de reserva?",
      a: "1 dormitorio: US$35,000 · 2 dormitorios: US$50,000."
    },
    {
      q: "¿Plan de pagos?",
      a: "20% contrato · 10% groundbreaking · 10% 90 días después o nivel amenidades · 10% top-off · balance al cierre."
    },
    {
      q: "¿Rentas?",
      a: "Renta flexible: opción de usar plataformas o un programa de renta totalmente administrado."
    }
  ],
  faqsEn: [
    {
      q: "Address & sales gallery?",
      a: "600 NE 36th St, Suite C1, Miami, FL 33137 (Edgewater)."
    },
    {
      q: "Unit types & sizes?",
      a: "1–2 bedroom residences, 450–845 sq ft."
    },
    {
      q: "Reservation deposit?",
      a: "1 bedroom: US$35,000 · 2 bedroom: US$50,000."
    },
    {
      q: "Deposit schedule?",
      a: "20% at contract · 10% at groundbreaking · 10% 90 days later or at amenity level · 10% at top-off · balance at closing."
    },
    {
      q: "Rentals?",
      a: "Flexible rentals: option to use platforms or a fully managed rental program."
    }
  ]
};

export default pElleResidences;
