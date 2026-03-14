// src/data/projects/nickelodeon.ts
import type { Project } from "../types";

export const pNickelodeon: Project = {
  id: "nickelodeon-orlando",
  slug: "/proyectos/nickelodeon-orlando",
  name: "Nickelodeon™ Hotels & Resorts Orlando (Condo-Residences)",
  city: "8298 W. Irlo Bronson Memorial Hwy, Kissimmee, FL 34747",

  // media
  image: "https://ik.imagekit.io/devrodri/Nickelodeon/1-2-2.jpg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/1.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/3.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/4.png" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/5.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/7.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nickelodeon/8.png" }
  ],

  // pricing & timing (per developer pricing sheets / brochure)
  priceFromUsd: 415300, // studios from US$415,300
  delivery: "Q2 2026", // estimated possession per brochure

  // STR policy / use
  rentalPolicyEs: "Condo-hotel con uso vacacional; No se permite ocupación permanente.",
  rentalPolicyEn: "Condo-hotel for vacation use; permanent occupancy prohibited.",

  // microclaims
  microClaimsEs: [
    "A ~10 min de Disney®",
    "Entrega estimada Q2 2026",
    "Residencias amuebladas listas para rentar"
  ],
  microClaimsEn: [
    "~10 min to Disney®",
    "Estimated Q2 2026 completion",
    "Turn‑key furnished residences"
  ],

  // highlights
  highlights: [
    "423 suites hoteleras con temáticas Nickelodeon",
    "4 restaurantes · Le Spatula · Mikey's · Aqua Bite · Express"
  ],
  highlightsEn: [
    "423 hotel suites with 3 Nickelodeon Signature themes",
    "4 restaurants · Le Spatula · Mikey's · Aqua Bite · Express"
  ],

  // unit mix (condo-residences)
  unitMixEs: [
    "Studio · 1 baño · ≈46 m² + ≈8 m² balcón",
    "1 Hab + Kids Den · 2 baños · ≈93 m² + ≈17 m² balcón",
    "2 Hab Lockoff · 3 baños · ≈149 m² + ≈25 m² balcón"
  ],
  unitMixEn: [
    "Studio · 1 bath · ~500 sq.ft + 90 sq.ft balcony",
    "1 Bed + Kids Den · 2 baths · ~1,000 sq.ft + 180 sq.ft balcony",
    "2 Bed Lockoff · 3 baths · ~1,600 sq.ft + 270 sq.ft balcony"
  ],

  // features
  featuresEs: [
    "Residencias entregadas amuebladas (programa de renta disponible)",
    "Cocina equipada / kitchenette, lavadora-secadora (según tipología)",
    "Acceso completo al resort: Aqua Nick, gym 24h, club infantil, cabanas VIP"
  ],
  featuresEn: [
    "Delivered furnished residences (rental program available)",
    "Equipped kitchen/kitchenette, washer-dryer (per type)",
    "Full resort access: Aqua Nick, 24h gym, kids club, VIP cabanas"
  ],

  // payment plan (ambos esquemas)
  paymentPlanEs: [
    "Financiado: 10% contrato · +10% a 45 días · +10% a 90 días · 70% cierre",
    "Contado: 20% contrato · +10% a 90 días · +10% a 180 días · 60% cierre"
  ],
  paymentPlanEn: [
    "Financed: 10% at contract · +10% at 45 days · +10% at 90 days · 70% at closing",
    "Cash: 20% at contract · +10% at 90 days · +10% at 180 days · 60% at closing"
  ],

  // FAQs
  faqsEs: [
    { q: "¿Dónde está?", a: "Dentro de Everest Place, Orlando, FL (a minutos de Disney)." },
    { q: "¿Dirección exacta?", a: "8298 W. Irlo Bronson Memorial Hwy, Kissimmee, FL 34747." },
    { q: "¿Ocupación permanente?", a: "No está permitida, solo uso vacacional/condo-hotel." },
    { q: "¿Programa de rentas?", a: "Operación hotelera on‑site por Karisma/Lion Star; gestionan reservas y limpieza. Uso personal cuando no esté alquilada." },
    { q: "¿Desde qué precio?", a: "Studios desde ~US$415,300; 1 Hab + Kids Den desde ~US$706,250; 2 Hab Lockoff desde ~US$897,300 (según vista y nivel)." },
    { q: "¿Amenidades clave?", a: "Aqua Nick, Lazy River, Club Nick, Snick Lounge, Character Dining, Nick Shop." },
    { q: "¿Entrega estimada?", a: "Posesión estimada Q2 2026, sujeta a obra y permisos." }
  ],
  faqsEn: [
    { q: "Where is it?", a: "Inside Everest Place, Orlando, FL (minutes to Disney)." },
    { q: "Exact address?", a: "8298 W. Irlo Bronson Memorial Hwy, Kissimmee, FL 34747." },
    { q: "Permanent occupancy?", a: "Prohibited by Osceola County; vacation/condo-hotel use only." },
    { q: "Rental program?", a: "On‑site hotel operation by Karisma/Lion Star; they manage bookings and housekeeping. Personal use when not rented." },
    { q: "Starting prices?", a: "Studios from ~US$415,300; 1 Bed + Kids Den from ~US$706,250; 2 Bed Lockoff from ~US$897,300 (by view/floor)." },
    { q: "Key amenities?", a: "Aqua Nick, Lazy River, Club Nick, Snick Lounge, Character Dining, Nick Shop." },
    { q: "Estimated completion?", a: "Estimated possession Q2 2026, subject to construction and approvals." }
  ]
};

export default pNickelodeon;