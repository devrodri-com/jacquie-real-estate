// src/data/projects/edge-house.ts
import type { Project } from "../types";

export const pEdgeHouse: Project = {
  id: "edge-house",
  name: "Edge House Miami",
  city: "1837 NE 4th Ave, Miami, FL 33132",
  rentalPolicy: "Sin restricciones", // legacy fallback
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No rental restrictions",
  furnished: true,
  priceFromUsd: 500000,
  delivery: "2028",
  financingAtClosing: true,
  slug: "/proyectos/edge-house",
  image: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/ayxrpX4g.jpeg",

  microClaimsEs: [
    "Short‑term friendly (Airbnb)",
    "Totalmente amueblado por Adriana Hoyos",
    "Arquitectura Kobi Karp en Edgewater"
  ],
  microClaimsEn: [
    "Short‑term friendly (Airbnb)",
    "Fully furnished by Adriana Hoyos",
    "Kobi Karp architecture in Edgewater"
  ],

  highlights: [
    "Edgewater: minutos de Wynwood/Midtown/Downtown",
    "Sky Bar con vistas a la bahía; coworking y podcast",
    "Doble piscina resort, jacuzzis y bar de piscina",
    "Spa, gimnasio de última generación, estudio de yoga y jardín zen",
    "Cocinas de verano/BBQ, putting green y áreas para niños"
  ],
  highlightsEn: [
    "Edgewater: minutes to Wynwood/Midtown/Downtown",
    "Sky Bar with bay views; coworking & podcast",
    "Dual resort pools, jacuzzis and pool bar",
    "Spa, state‑of‑the‑art gym, yoga studio and zen garden",
    "Summer kitchens/BBQ, putting green and kids’ areas"
  ],

  unitMixEs: ["Studios", "1 Dormitorio", "2 Dormitorios", "3 Dormitorios"],
  unitMixEn: ["Studios", "1 Bedroom", "2 Bedrooms", "3 Bedrooms"],

  featuresEs: [
    "Residencias totalmente amuebladas y equipadas (curadas por Adriana Hoyos)",
    "Ventanas piso a techo, gabinetes europeos y electrodomésticos premium",
    "Concierge, valet 24h y paquetería inteligente",
    "Coworking con salas de reunión y sala de podcast",
    "Doble piscina con camastros, cabañas y plataforma húmeda",
    "Jacuzzis, spa de tratamientos, sauna y wellness lounge",
    "Gimnasio completo + estudio de yoga",
    "Cocinas de verano/BBQ y sky lounge/bar"
  ],
  featuresEn: [
    "Fully furnished and turnkey residences (curated by Adriana Hoyos)",
    "Floor‑to‑ceiling glass, European cabinetry and premium appliances",
    "Concierge, 24h valet and smart parcel system",
    "Co‑working with meeting rooms and podcast studio",
    "Twin resort pools with loungers, cabanas and sun shelf",
    "Jacuzzis, treatment spa, sauna and wellness lounge",
    "Full gym + yoga studio",
    "Summer kitchens/BBQ and sky lounge/bar"
  ],

  paymentPlanEs: [
    "5% al contrato",
    "5% a los 15 días",
    "10% a los 45 días",
    "10% a los 90 días",
    "10% al finalizar la estructura del piso 25 (top off)",
    "10% al top‑off",
    "50% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "5% at contract",
    "5% 15 days from contract",
    "10% 45 days from contract",
    "10% 90 days after contract",
    "10% at 25th floor pour",
    "10% at top off",
    "50% at closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Se permiten alquileres de corto plazo?", a: "Sí. Proyecto orientado a short‑term con máxima flexibilidad." },
    { q: "¿Las residencias están amuebladas?", a: "Sí. Entrega turnkey curada por Adriana Hoyos." },
    { q: "¿Qué amenities destacan?", a: "Sky lounge/bar, coworking y sala de podcast; doble piscina, jacuzzis, spa, gimnasio y jardín zen." }
  ],
  faqsEn: [
    { q: "Are short‑term rentals allowed?", a: "Yes. Project is designed for maximum short‑term flexibility." },
    { q: "Are units furnished?", a: "Yes. Turnkey delivery curated by Adriana Hoyos." },
    { q: "Key amenities?", a: "Sky lounge/bar, co‑working and podcast room; twin pools, jacuzzis, spa, gym and zen garden." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/TerraceView.jpg" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/10_Edge-House_Pool-Deck1.webp" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/12_Edge-House_Jacuzzi.webp" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/17_Edge-House_BBQ-Area.webp" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/SkyLounge2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/Lounge.jpg" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/21_Edge-House-Treatment-Room.webp" },
    { src: "https://ik.imagekit.io/devrodri/EDGE%20HOUSE/Residence2.jpg" }
  ]
};
