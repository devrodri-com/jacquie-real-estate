// src/data/projects/cassia.ts
import type { Project } from "../types";

export const pCassia: Project = {
  id: "cassia-miami",
  slug: "/proyectos/cassia",
  name: "Cassia - The Residences at Coral Gables",
  city: "Coral Gables · Merrick Park",

  // Pricing & basics (Fact Sheet / Price Ranges)
  priceFromUsd: 773000, // 1BR desde ~US$823k (act. 04-01-2025)
  delivery: "Q1 2027",
  furnished: true, // completamente amuebladas por RH

  // STR / flexible ownership (brochure)
  rentalPolicyEs:
    "Renta corta permitida (Airbnb); estadía mínima ~3 noches.",
  rentalPolicyEn:
    "Short‑term rentals permitted (Airbnb); ~3‑night minimum.",

  image: "https://ik.imagekit.io/devrodri/Cassia/1.jpeg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Cassia/2.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/3.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/4.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/5.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/7.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/8.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Cassia/9.jpeg" }
  ],

  // Micro‑claims
  microClaimsEs: [
    "Residencias llave en mano amuebladas por RH",
    "Airbnb/estancias cortas (mín. ~3 noches)"
  ],
  microClaimsEn: [
    "Turn‑key residences furnished by RH",
    "Airbnb‑friendly (min. ~3 nights)"
  ],

  // Highlights (amenities principales)
  highlights: [
    "Piscina rooftop tipo resort, cabañas y áreas de comedor",
    "Wellness spa (piscina interior, sauna, vapor, masajes)",
    "Gimnasio de última generación + estudio de yoga/barre",
    "Gran lobby de doble altura y centro de negocios/co‑working",
    ">≈4,000 m² de amenidades interiores/exteriores"
  ],
  highlightsEn: [
    "Resort‑style rooftop pool with cabanas & dining areas",
    "Wellness spa (indoor pool, sauna, steam, massage rooms)",
    "State‑of‑the‑art fitness center + yoga/barre studio",
    "Grand double‑height lobby & business/co‑working center",
    ">1 acre of indoor/outdoor amenities"
  ],

  // Unit mix & scale
  unitMixEs: [
    "Edificio de 12 pisos · 174 residencias",
    "1-3 dormitorios · 62-135 m²"
  ],
  unitMixEn: [
    "12‑story building · 174 residences",
    "1-3 BR · 662-1,461 sq ft"
  ],

  // Features (residencias)
  featuresEs: [
    "Cocinas italianas; encimeras y salpicaderos elegantes",
    "Electrodomésticos Bosch · lavadora/secadora en unidad",
    "Pisos importados de gran formato y persianas blackout",
    "Armario del propietario con cerradura; terrazas tranquilas"
  ],
  featuresEn: [
    "Italian kitchens; elegant counters & backsplashes",
    "Bosch appliance suite · in‑unit washer/dryer",
    "Imported large‑format floors & blackout shades",
    "Lockable owner’s closet; tranquil terraces"
  ],

  // Deposit schedule (Buyer Deposit)
  paymentPlanEs: [
    "30% al contrato",
    "10% a ~6 meses",
    "60% al cierre"
  ],
  paymentPlanEn: [
    "30% at contract",
    "10% ~6 months after contract",
    "60% at closing"
  ],

  // FAQs ES/EN
  faqsEs: [
    { q: "¿Precios desde?", a: "1D desde ~US$823.000; 1D+den ~US$924.000; 2D/1B ~US$988.000; 2D/2B ~US$1.194.000; 3D ~US$1.790.000 (act. 04‑01‑2025)." },
    { q: "¿Política de renta?", a: "Propiedad flexible con posibilidad de alquiler de corta/larga estadía; sujeta a normativa local y permisos." },
    { q: "¿Ubicación?", a: "4011 Salzedo St., Coral Gables (a pasos de The Shops at Merrick Park)." },
    { q: "¿Edificio y mix?", a: "12 pisos · 174 residencias · 1-3 dormitorios (62-135 m²)." },
    { q: "¿Amoblamiento?", a: "Sí, completamente amuebladas por RH (turn‑key)." },
    { q: "¿Plan de depósitos?", a: "30% contrato · 10% a ~6 meses · 60% cierre." }
  ],
  faqsEn: [
    { q: "Starting prices?", a: "1BR from ~$823,000; 1BR+den ~$924,000; 2BR/1B ~$988,000; 2BR/2B ~$1,194,000; 3BR ~$1,790,000 (as of 04‑01‑2025)." },
    { q: "Rental policy?", a: "Flexible ownership allowing short/long‑term rentals; subject to local rules and permits." },
    { q: "Location?", a: "4011 Salzedo St., Coral Gables (steps from The Shops at Merrick Park)." },
    { q: "Building & mix?", a: "12 stories · 174 residences · 1-3 BR (662-1,461 sq ft)." },
    { q: "Furnishing?", a: "Yes, fully furnished by RH (turn‑key)." },
    { q: "Deposit schedule?", a: "30% contract · 10% ~6 months later · 60% closing." }
  ]
};

export default pCassia;