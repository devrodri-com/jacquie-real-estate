// src/data/projects/twenty-six-and-2nd.ts

import type { Project } from "../types";

export const pTwentySixAndSecond: Project = {
  id: "twenty-six-and-2nd",
  name: "Twenty Six & 2nd (Wynwood)",
  city: "Wynwood",
  rentalPolicy: "Sin restricciones", // legacy fallback
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No rental restrictions",
  furnished: true,
  priceFromUsd: 500000,
  delivery: "2028 Q1",
  financingAtClosing: true,
  slug: "/proyectos/26-and-2nd",
  image: "/images/projects/26-and-2nd.webp",

  microClaimsEs: [
    "Deeded office + hosting 365d",
    "Wellness y rooftop pool",
    "Wynwood creative hub"
  ],
  microClaimsEn: [
    "Deeded office + 365d hosting",
    "Wellness & rooftop pool",
    "Wynwood creative hub"
  ],

  highlights: [
    "Residencia + oficina (host 365d)",
    "Cowork en Studios/Jr",
    "Boutique 8 pisos, 233 unidades",
    "Rooftop pool con cabañas y bar",
    "Glass‑house para yoga/meditación y circuito termal"
  ],
  highlightsEn: [
    "Residence + office (host 365d)",
    "Cowork for Studios/Jr",
    "8‑story boutique, 233 residences",
    "Rooftop pool with cabanas and bar",
    "Glass‑house for yoga/meditation and thermal circuit"
  ],
  unitMixEs: ["Studio", "Junior Suite", "Junior Suite + Den", "1 Dormitorio", "1 Dormitorio + Den"],
  unitMixEn: ["Studio", "Junior Suite", "Junior Suite + Den", "1 Bedroom", "1 Bedroom + Den"],
  featuresEs: [
    "Residencias completamente terminadas y amuebladas",
    "Cocinas con paquete de electrodomésticos de alta gama (microondas, lavavajillas, horno empotrado y refrigerador)",
    "Mobiliario italiano de baño por Italkraft y griferías WaterWorks",
    "Lavadora y secadora en cada residencia",
    "Paquete de iluminación contemporáneo en todas las unidades"
  ],
  featuresEn: [
    "Fully finished and furnished residences",
    "Kitchens with top‑of‑the‑line appliance package (microwave, dishwasher, built‑in oven and refrigerator)",
    "Italian bathroom cabinetry by Italkraft and WaterWorks fixtures",
    "Washer and dryer in every residence",
    "Contemporary lighting package throughout"
  ],

  // No payment plan yet — awaiting official schedule from developer
  paymentPlanEs: [
    "10% a la firma de la reserva y contrato",
    "10% a los 90 días (completa 20%)",
    "10% en groundbreaking (estimado 2026, completa 30%)",
    "10% en etapa avanzada de obra (estimado 2027, completa 40%)",
    "60% al cierre (con financiación disponible para extranjeros, entrega estimada 2028)"
  ],
  paymentPlanEn: [
    "10% at reservation and contract signing",
    "10% in 90 days (to complete 20%)",
    "10% at groundbreaking (estimated 2026, to complete 30%)",
    "10% at advanced construction stage (estimated 2027, to complete 40%)",
    "60% at Closing (financing available for foreign buyers, estimated 2028 delivery)"
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/4n5uBSXg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/igHD_Nog.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/2g77yOBg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/x4N4sTUg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/ZGPMqCzw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/Twenty-six-kitchen.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/mF57DqjQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Twenty%20Six%20and%20Second/MkY7dPhg.jpeg" }
  ]
};