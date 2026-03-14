// src/data/projects/domus-brickell-park.ts
import type { Project } from "../types";

export const pDomusBrickellPark: Project = {
  id: "domus-brickell-park",
  name: "Domus Brickell Park",
  city: "Brickell",
  delivery: "2026",
  priceFromUsd: 629000,
  // STR: el brochure y la propuesta Domus FLATS enfocan alquiler temporal con portal propio (Airbnb, VRBO, Booking, etc.) — ver PDF adjunto.
  rentalPolicyEs: "Alquiler diario permitido (1 día a 6 meses + 1 día)",
  rentalPolicyEn: "Daily rentals allowed (1 day to 6 months + 1 day)",
  furnished: true,
  slug: "/proyectos/domus-brickell-park",
  image: "/images/projects/domus-brickell-park.webp",

  microClaimsEs: ["STR‑friendly", "The Peacock Room", "En el corazón de Brickell"],
  microClaimsEn: ["STR‑friendly", "The Peacock Room", "In the heart of Brickell"],

  highlights: [
    "Concepto Domus FLATS: departamentos con servicios y lujos de hotel",
    "Portal Domus con exposición a +85 plataformas",
    "Lobby con cafetería/panadería, wine & beer bar y mercado artesanal",
    "Roof con piscina, cabañas, jacuzzi y áreas sociales",
    "Amplio co‑working y gimnasio de última generación",
    "Ubicación privilegiada: a minutos de BCC, Mary Brickell Village y Metrorail"
  ],
  highlightsEn: [
    "Domus FLATS concept: serviced apartments with hotel‑level amenities",
    "Domus portal with exposure to 85+ platforms",
    "Lobby with café/bakery, wine & beer bar and artisanal market",
    "Rooftop with pool, cabanas, jacuzzi and social areas",
    "Large co‑working lounge and state‑of‑the‑art fitness center",
    "Prime location: minutes to BCC, Mary Brickell Village and Metrorail"
  ],

  unitMixEs: [
    { label: "Estudios, 1 y 2 dorms · 30-90 m² totales", iconKey: "bed" },
    { label: "Ejemplo 1BR · 59-75 m² totales (interior 54 m² + exterior 5 m²)", iconKey: "bed" },
    { label: "Ejemplo 2BR · 78-80 m² totales (interior 74 m² + exterior 4-6 m²)", iconKey: "bed" }
  ],
  unitMixEn: [
    { label: "Studios, 1 & 2 beds · 323-969 sf total", iconKey: "bed" },
    { label: "Sample 1BR · 633-799 sf total (576 sf int + 38-57 sf ext)", iconKey: "bed" },
    { label: "Sample 2BR · 837-853 sf total (799-802 sf int + 38-51 sf ext)", iconKey: "bed" }
  ],

  featuresEs: [
    { label: "Piscina y cabañas en rooftop", iconKey: "pool" },
    { label: "Jacuzzi y terraza ajardinada", iconKey: "spa" },
    { label: "Gimnasio de última generación + sala de vapor", iconKey: "yoga" },
    { label: "Amplio co‑working y Peacock Room social", iconKey: "work" },
    { label: "Cafetería/panadería con barista y wine & beer bar", iconKey: "store" },
    { label: "Mercado artesanal gourmet en lobby", iconKey: "store" },
    { label: "Ventanas resistentes al impacto · techos ~2.7 m · balcones privados", iconKey: "height" },
    { label: "Sistema de cerradura inteligente, lavadora/secadora y TV + audio premium", iconKey: "dot" },
    { label: "Pet‑friendly y exposiciones de arte local", iconKey: "dot" }
  ],
  featuresEn: [
    { label: "Rooftop pool and cabanas", iconKey: "pool" },
    { label: "Jacuzzi and lush garden terrace", iconKey: "spa" },
    { label: "State‑of‑the‑art gym + steam room", iconKey: "yoga" },
    { label: "Large co‑working lounge and Peacock Room", iconKey: "work" },
    { label: "Café/bakery with barista and wine & beer bar", iconKey: "store" },
    { label: "Artisanal gourmet market in the lobby", iconKey: "store" },
    { label: "Impact‑resistant windows · ~9 ft ceilings · private balconies", iconKey: "height" },
    { label: "Smart lock system, in‑unit W/D, premium TV & audio", iconKey: "dot" },
    { label: "Pet‑friendly with local art exhibitions", iconKey: "dot" }
  ],


  paymentPlanEs: [
    "20% al contrato",
    "10% a los 6 meses del contrato",
    "70% al cierre (financiación disponible para extranjeros)",
  ],
  paymentPlanEn: [
    "20% at Contract",
    "10% six months after contract",
    "70% at Closing (financing available for foreigners)",
  ],

  faqsEs: [
    { q: "¿Se permiten rentas cortas?", a: "Sí. Domus FLATS habilita alquiler temporal con conectividad a +85 plataformas." },
    { q: "¿Qué incluye el lobby?", a: "Cafetería/panadería, wine & beer bar, mercado artesanal y Peacock Room." },
    { q: "¿Qué amenidades hay en rooftop?", a: "Piscina, cabañas, jacuzzi y áreas sociales con vistas." },
    { q: "¿Cuál es el plan de pagos?", a: "20% al contrato, 10% a los 6 meses, 70% al cierre (financiación disponible para extranjeros)." },
    { q: "¿Hay opciones amuebladas?", a: "Sí, todas las unidades incluyen paquetes de amueblamiento completos." },
    { q: "¿Cuándo está prevista la entrega?", a: "Estimada para 2026." }
  ],
  faqsEn: [
    { q: "Are short‑term rentals allowed?", a: "Yes. Domus FLATS enables STR with exposure to 85+ booking platforms." },
    { q: "What’s in the lobby?", a: "Café/bakery, wine & beer bar, artisanal market and the Peacock Room." },
    { q: "What’s on the rooftop?", a: "Pool, cabanas, jacuzzi and social areas with views." },
    { q: "What’s the payment plan?", a: "20% at contract, 10% six months later, 70% at closing (financing available for foreigners)." },
    { q: "Are furnished options available?", a: "Yes, all residences include complete furnishing packages." },
    { q: "When is delivery scheduled?", a: "Expected for 2026." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Domus/gallery-6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/Domus_02_rev05_Final.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/Domus_Pool01_rev05_2000-px.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/Domus_Pool02_rev01-1_2000-px.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/Domus_Gym_rev05_2000-px.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/Domus_WineBar_02_Unbranded_2000px.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/DomusBrickellPark_The-Peacock-Room_2000-px.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Domus/gallery-5.jpg" }
  ],
};