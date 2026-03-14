// src/data/projects/ave-maria.ts
import type { Project } from "../types";

export const pAveMaria: Project = {
  id: "ave-maria",
  name: "Ave Maria - Maple Ridge",
  city: "Naples, Florida",
  rentalPolicy: "Tradicional",
  furnished: false,
  priceFromUsd: 340000,
  delivery: "8-12 meses",
  financingAtClosing: true,
  slug: "/proyectos/ave-maria",
  image: "https://ik.imagekit.io/devrodri/Ave%20Maria/TheClub_MapleRidge28of38-1600x1198.jpg",

  microClaimsEs: [
    "Casas unifamiliares de 2 a 6 dormitorios",
    "Precios desde USD 340,000",
    "Comunidad planificada y autosuficiente"
  ],
  microClaimsEn: [
    "Single-family homes (2-6 bedrooms)",
    "Prices from USD 340,000",
    "Master-planned, self-sustaining community"
  ],

  highlights: [
    "Maple Ridge: el vecindario #1 en ventas en Ave Maria",
    "Ubicado en una Comunidad Certificada Blue Zones®",
    "Clubhouse privado de ≈930 m² con piscina, gimnasio y parque para perros",
    "Town Center con más de 50 tiendas, restaurantes y servicios"
  ],
  highlightsEn: [
    "Maple Ridge: #1 selling neighborhood in Ave Maria",
    "Located in a Certified Blue Zones® Community",
    "10,000 sf private clubhouse with pool, gym & dog park",
    "Town Center with 50+ shops, restaurants & services"
  ],

  unitMixEs: ["2 Dormitorios", "3 Dormitorios", "4 Dormitorios", "5 Dormitorios", "6 Dormitorios"],
  unitMixEn: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms", "6 Bedrooms"],

  featuresEs: [
    "18 diseños de casas de 1 y 2 pisos",
    "Materiales y acabados de alta calidad",
    "Cocinas modernas con electrodomésticos premium",
    "Tecnología inteligente integrada",
    "Clubhouse con piscina estilo resort, spa, café, salón de masajes y juegos"
  ],
  featuresEn: [
    "18 distinctive 1- and 2-story home designs",
    "High-quality materials and finishes",
    "Modern kitchens with premium appliances",
    "Integrated smart home technology",
    "Clubhouse with resort-style pool, spa, café, massage & game rooms"
  ],

  paymentPlanEs: [
    "Entrega en 8-12 meses (dependiendo del modelo)",
    "Financiamiento disponible"
  ],
  paymentPlanEn: [
    "Delivery in 8-12 months (depending on model)",
    "Financing available"
  ],

  faqsEs: [
    { q: "¿Cuál es el precio de entrada?", a: "Desde USD 340,000 (2 dormitorios)." },
    { q: "¿Se permiten alquileres temporales?", a: "No. Airbnb no está permitido." },
    { q: "¿Qué amenidades incluye?", a: "Clubhouse de ≈930 m² con piscina, gimnasio, spa, café, parque para perros y área de niños." },
    { q: "¿Dónde está ubicado?", a: "En Naples, Florida, dentro de la comunidad Ave Maria." }
  ],
  faqsEn: [
    { q: "What is the starting price?", a: "From USD 340,000 (2 bedrooms)." },
    { q: "Are short-term rentals allowed?", a: "No. Airbnb is not permitted." },
    { q: "What amenities are included?", a: "10,000 sf clubhouse with pool, gym, spa, café, dog park and kids’ area." },
    { q: "Where is it located?", a: "In Naples, Florida, within the Ave Maria community." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Ave%20Maria/Inlet-Coastal-Photo.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Ave%20Maria/Harbour_KLD_0008-2-1-1600x1067.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Ave%20Maria/Fairawy_LR_0019-1600x1067.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Ave%20Maria/Greenview_Kitchen_-1600x1066.jpg" }
  ]
};
