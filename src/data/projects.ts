// src/data/projects.ts
export type RentalPolicy = "No restr." | "30 días" | "60 días" | "90 días" | "6 meses";
export interface Project {
  id: string;
  name: string;
  city: string;              // "Miami Beach", "Brickell", etc.
  locationLabel?: string;    // libre (ej. "Oceanfront")
  rentalPolicy: RentalPolicy;
  furnished?: boolean;
  priceFromUsd?: number;     // 570000
  priceToUsd?: number;       // opcional
  pricePerSfApprox?: number; // no usar más
  delivery?: string;         // "Q4 2026"
  financingAtClosing?: boolean;
  image: string;             // /images/projects/7200-collins.webp
  images?: { src: string; alt?: string }[];
  slug: string;              // /proyectos/7200-collins
  highlights?: string[];     // ["Beach club","Airbnb OK"]
  highlightsEn?: string[];   // i18n for EN badges when needed
  paymentPlanEs?: string[];
  paymentPlanEn?: string[];
  faqsEs?: { q: string; a: string }[];
  faqsEn?: { q: string; a: string }[];
}
export const FEATURED_PROJECTS: Project[] = [
  {
    id: "72park",
    name: "72 Park",
    city: "Miami Beach",
    locationLabel: "NoBe",
    rentalPolicy: "No restr.",
    furnished: true,
    priceFromUsd: 720000,
    delivery: "2025",
    financingAtClosing: true,
    image: "/images/projects/72-park.webp",
    images: [
      { src: "https://ik.imagekit.io/devrodri/72%20Park/byron-bar.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/bedroom.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/lobby.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/lounge.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/rooftop.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/pool.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/beach.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/gym.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/bathroom.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/ezios-steakhouse.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/view.webp" },
      { src: "https://ik.imagekit.io/devrodri/72%20Park/kitchen.webp" }
    ],
    slug: "/proyectos/72-park",
    highlights: [
      "Acceso a playa",
      "Piscina y deck",
      "Renta flexible (sin restr.)",
      "Gimnasio y cowork",
    ],
    paymentPlanEs: [
      "20% al contrato",
      "10% a los 90 días",
      "10% al completar rooftop/estructura",
      "60% al cierre",
    ],
    paymentPlanEn: [
      "20% at contract",
      "10% in 90 days",
      "10% at rooftop / structure completion",
      "60% at closing",
    ],
    faqsEs: [
      { q: "¿Se permiten rentas cortas?", a: "Sí. Edificio aprobado para alquileres de corto plazo con programa de gestión en sitio." },
      { q: "¿El edificio ofrece club de playa?", a: "Sí. Club de playa privado con servicio de sillas y toallas a 5 minutos a pie." },
      { q: "¿Las residencias se entregan amuebladas?", a: "Opcional. Hay paquetes de amueblado disponibles." }
    ],
    faqsEn: [
      { q: "Are short‑term rentals allowed?", a: "Yes. Building approved for short‑term rentals with on‑site management program." },
      { q: "Is there a beach club?", a: "Yes. Private beach club with chair and towel service, 5 minutes away on foot." },
      { q: "Are units delivered furnished?", a: "Optional. Furnishing packages are available." }
    ],
  },  
  {
    id: "7200-collins",
    name: "7200 Collins",
    city: "North Beach",
    locationLabel: "Oceanfront",
    rentalPolicy: "No restr.",
    furnished: true,
    priceFromUsd: 570000,
    delivery: "2028",
    financingAtClosing: true,
    image: "/images/projects/7200-collins.webp",
    slug: "/proyectos/7200-collins",
    highlights: ["Beach club", "Servicio de playa"],
  },
  {
    id: "domus-brickell-park",
    name: "Domus Brickell Park",
    city: "Brickell",
    rentalPolicy: "30 días",
    furnished: false,
    priceFromUsd: 629000,
    delivery: "2026",
    financingAtClosing: true,
    image: "/images/projects/domus-brickell-park.webp",
    slug: "/proyectos/domus-brickell-park",
    highlights: ["Inversión flexible", "Operación 30d"],
  },
  {
    id: "baccarat",
    name: "Baccarat Residences",
    city: "Brickell",
    locationLabel: "Waterfront",
    rentalPolicy: "30 días",
    furnished: false,
    priceFromUsd: 1200000,
    delivery: "2028",
    financingAtClosing: true,
    image: "/images/projects/baccarat.webp",
    slug: "/proyectos/baccarat-residences",
    highlights: ["Marina", "Luxury brand"],
  },
  {
    id: "cipriani",
    name: "Cipriani Residences",
    city: "Brickell",
    rentalPolicy: "30 días",
    furnished: false,
    priceFromUsd: 1500000,
    delivery: "2026",
    financingAtClosing: true,
    image: "/images/projects/cipriani.webp",
    slug: "/proyectos/cipriani-brickell",
    highlights: [
      "Servicio 5★",
      "Vistas ciudad",
      "Restaurante privado Cipriani",
      "Amenidades resort",
      "Spa & Wellness",
      "Biblioteca y lounge"
    ],
  },
  {
    id: "twenty-six-and-2nd",
    name: "Twenty Six & 2nd (Wynwood)",
    city: "Wynwood",
    rentalPolicy: "No restr.",
    furnished: false,
    priceFromUsd: 500000,
    delivery: "2028 Q1",
    financingAtClosing: true,
    image: "/images/projects/26-and-2nd.webp",
    slug: "/proyectos/26-and-2nd",
    highlights: ["Airbnb", "Distrito Arte"],
  },
  {
    id: "flow-house",
    name: "Flow House",
    city: "Downtown Miami",
    rentalPolicy: "30 días",
    furnished: false,
    priceFromUsd: 492000,
    delivery: "2025",
    financingAtClosing: true,
    image: "/images/projects/flow-house.webp",
    slug: "/proyectos/flow-house",
    highlights: ["Operación 30d", "Amenidades full"],
  },
  {
    id: "nexo",
    name: "Nexo Residences",
    city: "North Miami Beach",
    rentalPolicy: "No restr.",
    furnished: true,
    priceFromUsd: 626000,
    delivery: "2025",
    financingAtClosing: true,
    image: "/images/projects/nexo.webp",
    slug: "/proyectos/nexo",
    highlights: ["Short‑term", "Largo plazo"],
  },
  {
    id: "one-park-tower",
    name: "One Park Tower by Turnberry",
    city: "North Miami",
    rentalPolicy: "30 días",
    furnished: false,
    priceFromUsd: 1200000,
    delivery: "2025",
    financingAtClosing: true,
    image: "/images/projects/one-park-tower.webp",
    slug: "/proyectos/one-park-tower",
    highlights: ["Lagoon", "Turnberry"],
  },
  {
    id: "2200-brickell",
    name: "2200 Brickell",
    city: "Brickell",
    rentalPolicy: "90 días",
    furnished: false,
    priceFromUsd: 830000,
    delivery: "2026",
    financingAtClosing: false,
    image: "/images/projects/2200-brickell.webp",
    slug: "/proyectos/2200-brickell",
    highlights: ["Low HOA", "Family"],
  },
];

/**
 * Full catalog destined for /proyectos page.
 * We'll populate this from the Preconstruction Master spreadsheet.
 * Keep FEATURED_PROJECTS for the landing carousel subset.
 */
export const ALL_PROJECTS: Project[] = [
  ...FEATURED_PROJECTS,
  
  {
    id: "domus-brickell-center",
    name: "Domus Brickell Center",
    city: "Brickell",
    rentalPolicy: "No restr.",
    delivery: "2027",
    priceFromUsd: 470000,
    image: "/images/projects/domus-brickell-center.webp",
    slug: "/proyectos/domus-brickell-center",
    highlights: ["Daily up to 6m", "Investor‑ready"],
  },
  {
    id: "mercedes-benz-places",
    name: "Mercedes‑Benz Places",
    city: "Brickell",
    rentalPolicy: "30 días",
    delivery: "2028",
    priceFromUsd: 850000,
    image: "/images/projects/mercedes-benz-places.webp",
    slug: "/proyectos/mercedes-benz-places",
    highlights: ["Mobility focus", "Design brand"],
  },
  {
    id: "edge-house",
    name: "Edge House",
    city: "Edgewater",
    rentalPolicy: "30 días",
    delivery: "2028",
    priceFromUsd: 500000,
    image: "/images/projects/edge-house.webp",
    slug: "/proyectos/edge-house",
    highlights: ["Edgewater hub", "30 days policy"],
  },
  {
    id: "okan-tower",
    name: "Okan Tower",
    city: "Downtown Miami",
    rentalPolicy: "30 días",
    delivery: "2027",
    priceFromUsd: 705000,
    image: "/images/projects/okan-tower.webp",
    slug: "/proyectos/okan-tower",
    highlights: ["Condo‑hotel", "Sky residences"],
  },
];