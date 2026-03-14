// src/data/projects/midtown-park.ts
import type { Project } from "../types";

export const pMidtownPark: Project = {
  id: "midtown-park",
  slug: "/proyectos/midtown-park",
  name: "Midtown Park",
  city: "3055 N Miami Ave, Miami, FL 33127",

  // media
  image: "https://ik.imagekit.io/devrodri/Midtown%20Park/ca7LMYAw.jpeg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/vdFMgVgA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/75OtJzHQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/NfINBDkA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/wWNfYD-A.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/e4T70bAA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/WQ2gvs1w.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/DO-mYfRg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Midtown%20Park/DKO5KMKQ.jpeg" }
  ],

  // pricing & timing
  priceFromUsd: 700000,
  delivery: "2028",
  rentalPolicyEs: "Mínimo 30 días, hasta 4 veces al año.",
  rentalPolicyEn: "30-day minimum, up to 4 times per year.",

  // microclaims
  microClaimsEs: [
    "Dirección: 3055 N Miami Ave",
    "Finalización estimada 2028"
  ],
  microClaimsEn: [
    "Address: 3055 N Miami Ave",
    "Estimated completion 2028"
  ],

  // highlights
  highlights: [
    "Arquitectura por Arquitectonica",
    "Diseño por Meyer Davis Studio",
    "Mix de 1 a 3 dormitorios con dens y terrazas"
  ],
  highlightsEn: [
    "Architecture by Arquitectonica",
    "Design by Meyer Davis Studio",
    "Mix of 1-3 bedrooms with dens and terraces"
  ],

  // unit mix (from key plan)
  unitMixEs: [
    "JR Suite · 1 baño · 56 m²",
    "1 Dormitorio · 1 baño · 62 m²",
    "1 Dormitorio + Den · 2 baños · 73-98 m²",
    "2 Dormitorios + Den · 2-3 baños · 109-119 m²",
    "2 Dormitorios · 2.5 baños · 115 m²",
    "3 Dormitorios · 3.5 baños · 150-161 m²"
  ],
  unitMixEn: [
    "JR Suite · 1 bath · 588 sq ft",
    "1 Bed · 1 bath · 670 sq ft",
    "1 Bed + Den · 2 baths · 782-1,060 sq ft",
    "2 Bed + Den · 2-3 baths · 1,168-1,276 sq ft",
    "2 Bed · 2.5 baths · 1,239 sq ft",
    "3 Bed · 3.5 baths · 1,616-1,730 sq ft"
  ],

  // features
  featuresEs: [
    "Terrazas amplias en todas las residencias",
    "Ventanales piso a techo",
    "Cocinas y baños de diseño contemporáneo"
  ],
  featuresEn: [
    "Generous terraces in all residences",
    "Floor-to-ceiling windows",
    "Contemporary kitchens and baths"
  ],

  // payment plan — per deposit structure
  paymentPlanEs: [
    "Reserva: $50k (1BR) · $75k (2BR) · $100k (3BR)",
    "20% contrato (est. nov 2025)",
    "10% inicio de obra (est. jun 2026)",
    "10% a los 6 meses de inicio (est. dic 2026)",
    "10% top-off (est. dic 2027)",
    "50% cierre (est. Q1 2028)"
  ],
  paymentPlanEn: [
    "Reservation: $50k (1BR) · $75k (2BR) · $100k (3BR)",
    "Balance to 20% at contract (est. Nov 2025)",
    "10% at groundbreaking (est. Jun 2026)",
    "10% six months after groundbreaking (est. Dec 2026)",
    "10% at top-off (est. Dec 2027)",
    "50% at closing (est. Q1 2028)"
  ],

  // FAQs
  faqsEs: [
    { q: "¿Arquitectura y diseño?", a: "Arquitectonica · Meyer Davis Studio." },
    { q: "¿Política de alquileres?", a: "Mínimo 30 días, hasta 4 veces al año." },
    { q: "¿Fecha estimada de finalización?", a: "2028, según cronograma de obra." }
  ],
  faqsEn: [
    { q: "Architecture & design?", a: "Arquitectonica · Meyer Davis Studio." },
    { q: "Rental policy?", a: "30-day minimum, up to 4 times per year." },
    { q: "Estimated completion?", a: "2028 per construction timeline." }
  ]
};

export default pMidtownPark;