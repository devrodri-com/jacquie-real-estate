// src/data/projects/millenia-park.ts
import type { Project } from "../types";

export const pMilleniaPark: Project = {
  id: "millenia-park-orlando",
  name: "Millenia Park",
  city: "Orlando, Florida",
  rentalPolicyEs: "Mínimo 31 días, hasta 4 alquileres/año",
  rentalPolicyEn: "Minimum 31 days, up to 4 leases per year",
  furnished: false,
  priceFromUsd: 289900, // 1BR + den desde ~US$289,900
  delivery: "2024-2026", // Fase 1 ~2024; siguientes 2025-2026
  slug: "/proyectos/millenia-park",
  image: "https://ik.imagekit.io/devrodri/Millenia%20Park/chvfJiMA.jpeg",

  images: [
    { src: "https://ik.imagekit.io/devrodri/Millenia%20Park/fzQRPVlg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Millenia%20Park/jy_6GXzg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Millenia%20Park/Uxvpfdmg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Millenia%20Park/fKoXigmg.jpeg" }
  ],

  microClaimsEs: [
    "VISA de Inversionista (EB‑5)",
    "960 residencias · ≈2.300 m² de retail",
    "A 2 millas de Epic Universe (Universal)"
  ],
  microClaimsEn: [
    "EB‑5 investor visa eligible",
    "960 homes · 25,000 sq ft retail",
    "2 miles to Epic Universe (Universal)"
  ],

  highlights: [
    "VISA EB‑5: ruta a la Green Card (vía Centro Regional)",
    "Piscina estilo resort y elegantes club houses",
    "Centro de fitness con vista a la piscina",
    "Cancha de tenis y parque sobre el lago con pista de running",
    "Parque infantil, dog park y comunidad pet‑friendly",
    "Sistema de seguridad y CCTV de última generación"
  ],
  highlightsEn: [
    "EB‑5 Investor Visa: path to Green Card (via Regional Center)",
    "Resort‑style pool and elegant club houses",
    "Fitness center overlooking the pool",
    "Tennis court and lakeside park with running trail",
    "Kids playground, dog park and pet‑friendly community",
    "Advanced CCTV and security system"
  ],

  unitMixEs: [
    "1 dormitorio + estudio / 1 baño · ≈70 m² - desde ~US$289,900",
    "2 dormitorios + estudio / 2 baños · ≈95 m² - desde ~US$364,900",
    "3 dormitorios / 2 baños · ≈101–113 m² - desde ~US$419,900"
  ],
  unitMixEn: [
    "1 BR + den / 1 bath · 750 sq ft - from ~US$289,900",
    "2 BR + den / 2 baths · 1,023 sq ft - from ~US$364,900",
    "3 BR / 2 baths · 1,087–1,215 sq ft - from ~US$419,900"
  ],

  featuresEs: [
    "Cocinas estilo europeo con electrodomésticos de acero inoxidable y granito",
    "Baños contemporáneos con mesadas de cuarzo",
    "Amplios vestidores (walk‑in) en la mayoría de las unidades",
    "Plantillas abiertas con techos de ≈2.7 m",
    "Lavadora/secadora en unidad"
  ],
  featuresEn: [
    "European‑style kitchens with stainless appliances and granite",
    "Contemporary baths with quartz vanities",
    "Large walk‑in closets in most units",
    "Open layouts with ~9 ft ceilings",
    "In‑unit washer/dryer"
  ],

  // Planes según fase (resumen)
  paymentPlanEs: [
    "Fase 1: 30% contrato · 70% cierre",
    "Fases 2/3: 30% contrato · 20% inicio de obra · 20% top‑off · 30% cierre"
  ],
  paymentPlanEn: [
    "Phase 1: 30% at contract · 70% at closing",
    "Phases 2/3: 30% at contract · 20% at groundbreaking · 20% at top‑off · 30% at closing"
  ],

  faqsEs: [
    { q: "¿Precio desde?", a: "1 BR + estudio desde ~US$289.900; 2 BR desde ~US$364.900; 3 BR desde ~US$419.900." },
    { q: "¿Política de alquiler?", a: "Mínimo 31 días, hasta 4 alquileres al año (flexible para mensualidades)." },
    { q: "¿Incluye muebles?", a: "No. Se entregan terminadas con acabados/electrodomésticos; mobiliario no incluido." },
    { q: "¿Financiación para extranjeros?", a: "Disponible - brokers reportan hipotecas hasta ~50% del valor (sujeto a calificación)." },
    { q: "¿EB‑5?", a: "Sí, proyecto elegible a través de Centro Regional (visa de inversionista)." },
    { q: "¿Entregas?", a: "Fase 1 ~2024; fases siguientes ~2025-2026." }
  ],
  faqsEn: [
    { q: "Starting prices?", a: "1 BR + den from ~US$289,900; 2 BR from ~US$364,900; 3 BR from ~US$419,900." },
    { q: "Rental policy?", a: "Minimum 31 days; up to 4 leases per year (flexible for monthly rentals)." },
    { q: "Furnishing?", a: "No. Delivered finished with appliances; furniture not included." },
    { q: "Foreign financing?", a: "Available - brokers indicate mortgages up to ~50% LTV (subject to approval)." },
    { q: "EB‑5?", a: "Yes, eligible via Regional Center (investor visa)." },
    { q: "Deliveries?", a: "Phase 1 ~2024; subsequent phases ~2025-2026." }
  ]
};

export default pMilleniaPark;
