// src/data/projects/baccarat.ts
import type { Project } from "../types";

export const pBaccarat: Project = {
  id: "baccarat",
  name: "Baccarat Residences",
  city: "Brickell",
  delivery: "2028",
  priceFromUsd: 1200000,
  // Fuente interna indica 30 días mínimo, hasta 3 veces por año
  rentalPolicyEs: "30 días mínimo, hasta 3 veces/año",
  rentalPolicyEn: "30-day minimum, up to 3 times per year",
  furnished: true,
  slug: "/proyectos/baccarat",
  image:
    "https://ik.imagekit.io/devrodri/Baccarat/Related-OneBrickell-03-Extrior_Grua-01.jpg",

  microClaimsEs: [
    "Frente al río y bahía",
    "Grand Salon",
    "Beach Club en 1 Hotel"
  ],
  microClaimsEn: [
    "River & bay views",
    "Grand Salon",
    "1 Hotel Beach Club"
  ],

  // Convertimos a objetos para mostrar iconografía consistente
  highlights: [
    "75 pisos en la ribera del Miami River, Biscayne Bay",
    "316 residencias, 8 penthouses y 28 flats frente al río",
    "Interiores por Meyer Davis Studio; acabados de cocina/baño/pisos personalizados",
    "Piscina resort en nivel 14 con spa, cabañas y terraza con vistas a la bahía",
    "Gimnasio curado por Anatomy con salas de yoga y meditación",
    "Hammam spa, salas de tratamiento y sala de cine privada",
    "Marina privada con taxi acuático y muelle para residentes",
    "Membresía Beach Club en 1 Hotel South Beach"
  ],
  highlightsEn: [
    "75‑story tower on the Miami River where it meets Biscayne Bay",
    "316 residences, 8 penthouses and 28 flats on the river",
    "Interiors by Meyer Davis Studio; bespoke kitchen/bath/flooring options",
    "14th‑level resort deck with pool, spa, cabanas and bay‑view terrace",
    "Fitness curated by Anatomy with yoga & meditation rooms",
    "Hammam spa, treatment rooms and private screening room",
    "Private marina with resident water taxi",
    "Beach Club membership at 1 Hotel South Beach"
  ],

  unitMixEs: [
    { label: "1-4 dormitorios y penthouses", iconKey: "bed" },
    { label: "316 residencias flow‑through + 8 penthouses", iconKey: "balcony" }
  ],
  unitMixEn: [
    { label: "1-4 bedroom residences and penthouses", iconKey: "bed" },
    { label: "316 flow‑through residences + 8 penthouses", iconKey: "balcony" }
  ],

  featuresEs: [
    { label: "Lobby de doble altura con chandeliers Baccarat", iconKey: "work" },
    { label: "Grand Salon para reuniones y celebraciones", iconKey: "work" },
    { label: "Piscina estilo resort con borde cero y café restaurante", iconKey: "pool" },
    { label: "Gimnasio Anatomy + salas de yoga y meditación", iconKey: "yoga" },
    { label: "Hammam spa con steam/sauna y salas de tratamiento", iconKey: "spa" },
    { label: "Sala de cine privada y salón de juegos", iconKey: "work" },
    { label: "Wine cellar & tasting, market gourmet y club room", iconKey: "store" },
    { label: "Marina privada y muelle sobre el Miami River", iconKey: "dock" },
    { label: "Acceso al Beach Club de 1 Hotel South Beach", iconKey: "beach" }
  ],
  featuresEn: [
    { label: "Double‑height lobby with Baccarat chandeliers", iconKey: "work" },
    { label: "Grand Salon for gatherings and celebrations", iconKey: "work" },
    { label: "Resort pool with zero‑entry edge and café restaurant", iconKey: "pool" },
    { label: "Anatomy fitness + yoga & meditation rooms", iconKey: "yoga" },
    { label: "Hammam spa with steam/sauna and treatment rooms", iconKey: "spa" },
    { label: "Private screening room and game room", iconKey: "work" },
    { label: "Wine cellar & tasting, gourmet market and club room", iconKey: "store" },
    { label: "Private marina and dock on the Miami River", iconKey: "dock" },
    { label: "Access to 1 Hotel South Beach Beach Club", iconKey: "beach" }
  ],

  paymentPlanEs: [
    "10% al contrato",
    "10% a los 60 días (completa 20%)",
    "10% en groundbreaking (completa 30%)",
    "10% en top‑off (completa 40%)",
    "60% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "10% at Contract",
    "10% sixty days after Contract (to complete 20%)",
    "10% at Groundbreaking (to complete 30%)",
    "10% at Top‑off (to complete 40%)",
    "60% at Closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Incluye acceso a club de playa?", a: "Sí. Membresía y privilegios en el Beach Club de 1 Hotel South Beach." },
    { q: "¿Hay marina privada?", a: "Sí. Muelle privado con taxi acuático y más de ≈90 m lineales de atraque." },
    { q: "¿Qué vistas tienen las residencias?", a: "Vistas panorámicas a Biscayne Bay, Miami River y skyline de Miami." }
  ],
  faqsEn: [
    { q: "Is there beach club access?", a: "Yes. Membership & privileges at 1 Hotel South Beach Beach Club." },
    { q: "Is there a private marina?", a: "Yes. Private dock with resident water taxi and over 300 linear feet of dockage." },
    { q: "What are the views like?", a: "Panoramic views to Biscayne Bay, the Miami River and Miami skyline." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_3-Porte-Cochere.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_17-Pool-Red-Umbrellas_HD-Copy.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_16-Orangerie.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_28-Master-Bedroom.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_9-Grand-Salon_HD-copy.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_27-Unit-Kitchen.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/BACCARAT_8-Harmonie-Room.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Baccarat/Fitness-by-Anatomy.jpg" }
  ]
};