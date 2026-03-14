// src/data/projects/one-hollywood-residences.ts
import type { Project } from "../types";

export const pOneHollywoodResidences: Project = {
  id: "one-hollywood-residences",
  slug: "/proyectos/one-hollywood-residences",
  name: "One Hollywood Residences",
  city: "1817 Taylor St, Hollywood, FL 33020",

  // Pricing & basics (brochure: "starting from the $400s")
  priceFromUsd: 420000,
  pricePerSfApprox: 800,
  hoa: "$0.85/sf",
  delivery: "Q4 2027",
  furnished: false, // residencias fully finished; no indica amuebladas

  // Política de rentas: no se publica explícitamente un esquema STR -> dejamos sin afirmar
  rentalPolicyEs: "Renta corta permitida tipo Airbnb (estancia mínima 30 días). Requiere licencia de alquiler vacacional de la Ciudad de Hollywood e impuestos turísticos.",
  rentalPolicyEn: "Short‑term rentals (Airbnb) allowed (30‑day minimum stay). City of Hollywood vacation rental license and lodging taxes required.",

  image: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/1.jpg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/2.webp" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/3.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/7.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/5.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/4.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/Kitchen-scaled.jpg" },
    { src: "https://ik.imagekit.io/devrodri/One%20Hollywood%20Residences/Bathroom.jpg" }
  ],

  // Micro‑claims
  microClaimsEs: [
    "23 pisos · 248 residencias",
    "Alquiler mensual flexible (mín. 30 días)"
  ],
  microClaimsEn: [
    "23‑story tower · 248 residences",
    "Flexible monthly rentals (30‑day min)"
  ],

  // Highlights (amenities principales)
  highlights: [
    "Porte‑cochère de llegada y gran lobby con recepción",
    "Piscina y spa estilo resort con cabañas + BBQ al aire libre",
    "Fitness center con estudio de yoga; sauna, spa y salas de tratamiento",
    "Clubroom multiuso con cocina para eventos y business center",
    "Kids club y playground; Wi‑Fi en áreas comunes; cargadores para EV",
    "Rooftop lounge con bar, área de TV, fogoneros y vistas 360°",
    "Valet para invitados; lockers inteligentes de paquetería"
  ],
  highlightsEn: [
    "Porte‑cochère arrival and grand lobby with reception",
    "Resort‑style pool & spa with cabanas + outdoor BBQ",
    "Fitness center with yoga studio; sauna, spa and treatment rooms",
    "Multi‑purpose clubroom with dedicated kitchen and business center",
    "Kids club & playground; Wi‑Fi in commons; EV chargers",
    "Rooftop lounge with bar, outdoor TV, fire pits and 360° views",
    "Guest valet; smart package locker room"
  ],

  // Unit mix & sizes (brochure - floorplans)
  unitMixEs: [
    "Studios · 48 m² (517 ft²)",
    "1 dormitorio · 73-88 m² (781-945 ft²)",
    "2 dormitorios · 113-115 m² (1,212-1,235 ft²)",
    "3 dormitorios · 130-162 m² (1,400-1,745 ft²)"
  ],
  unitMixEn: [
    "Studios · 517 sq ft",
    "1‑bedroom · 781-945 sq ft",
    "2‑bedroom · 1,212-1,235 sq ft",
    "3‑bedroom · 1,400-1,745 sq ft"
  ],

  // Features (residencias)
  featuresEs: [
    "Residencias fully finished; selección de pisos",
    "Acceso smart key · pre‑cableado para smart‑home",
    "Ventanales de piso a techo con cortinas",
    "Balcón con barandas de vidrio",
    "Cocinas europeas equipadas · encimeras de cuarzo",
    "Baños con porcelanato importado, doble bacha y duchas texturadas",
    "Lavadora y secadora de alta eficiencia"
  ],
  featuresEn: [
    "Fully finished residences; flooring options",
    "Smart key access · prewired smart‑home tech",
    "Floor‑to‑ceiling windows with treatments",
    "Glass‑railing balconies",
    "European‑style kitchens · quartz countertops",
    "Bathrooms with imported porcelain, dual vanities and textured showers",
    "High‑efficiency washer & dryer"
  ],

  // Deposit schedule (brochure - purchaser guide)
  paymentPlanEs: [
    "Reserva: US$30k (studios/1BR) o US$50k (2-3BR)",
    "Completar 20% al contrato",
    "10% al groundbreaking",
    "10% al top‑off",
    "60% al cierre"
  ],
  paymentPlanEn: [
    "Reservation: US$30k (studios/1BR) or US$50k (2-3BR)",
    "Complete 20% at contract",
    "10% at groundbreaking",
    "10% at top‑off",
    "60% at closing"
  ],

  // FAQs
  faqsEs: [
    { q: "¿Desde cuánto?", a: "Desde ~US$420,000 (estudios; sujeto a inventario y cambios)." },
    { q: "¿HOA estimada?", a: "Aprox. US$0.85/ft² por mes (incluye mantenimiento de áreas comunes, amenities y servicios del edificio)." },
    { q: "¿Entrega?", a: "Fines de 2027 (Completion: late 2027)." },
    { q: "¿Mix y tamaños?", a: "Studios, 1, 2 y 3 dormitorios · 48-132 m² aprox. (517-1,425 ft²)." },
    { q: "¿Plan de depósitos?", a: "US$30k/US$50k reserva · 20% contrato · 10% groundbreaking · 10% top‑off · 60% cierre." },
    { q: "¿Amoblamiento?", a: "Se entregan fully finished; el brochure no indica amoblamiento incluido." },
    { q: "¿Amenidades clave?", a: "Piscina estilo resort, rooftop lounge 360°, spa/sauna, fitness + yoga, clubroom y cowork, kids club, EV chargers, valet." }
  ],
  faqsEn: [
    { q: "Starting from?", a: "From ~US$420,000 (studios; subject to inventory and change)." },
    { q: "HOA estimate?", a: "Approx. US$0.85/sq ft per month (covers building services, amenities and common areas)." },
    { q: "Completion?", a: "Late 2027 (estimated)." },
    { q: "Unit mix & sizes?", a: "Studios, 1, 2 & 3 BR · ~517-1,425 sq ft." },
    { q: "Deposit schedule?", a: "US$30k/US$50k reservation · 20% contract · 10% groundbreaking · 10% top‑off · 60% closing." },
    { q: "Furnished?", a: "Delivered fully finished; brochure does not state furniture included." },
    { q: "Key amenities?", a: "Resort‑style pool, 360° rooftop lounge, spa/sauna, fitness+ yoga, clubroom & co‑working, kids club, EV chargers, valet." }
  ]
};

export default pOneHollywoodResidences;