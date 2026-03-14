// src/data/projects/cipriani.ts
import type { Project } from "../types";

export const pCipriani: Project = {
  id: "cipriani",
  name: "Cipriani Residences",
  city: "Brickell",
  delivery: "2026",
  priceFromUsd: 1500000,
  rentalPolicyEs: "30 días mínimo, hasta 2 veces por año",
  rentalPolicyEn: "30-day minimum, up to twice per year",
  furnished: false,
  slug: "/proyectos/cipriani",
  image: "/images/projects/cipriani.webp",

  microClaimsEs: [
    "80 pisos con curvas icónicas",
    "Diseño de Arquitectonica + 1508 London",
    "Servicio Cipriani exclusivo"
  ],
  microClaimsEn: [
    "80-story iconic curved tower",
    "Design by Arquitectonica + 1508 London",
    "Exclusive Cipriani service"
  ],

  highlights: [
    "Torre de 80 pisos diseñada por Arquitectonica",
    "Residencias de 1-4 dormitorios + penthouses",
    "Interiores sofisticados de 1508 London",
    "Deck elevado con 2 piscinas y spa",
    "Restaurante privado Cipriani exclusivo",
    "Acceso directo a Brickell y Biscayne Bay"
  ],
  highlightsEn: [
    "80-story tower by Arquitectonica",
    "1-4 bedroom residences + penthouses",
    "Elegant interiors by 1508 London",
    "Elevated resort deck with 2 pools and spa",
    "Private Cipriani restaurant exclusive to residents",
    "Direct access to Brickell and Biscayne Bay"
  ],

  unitMixEs: [
    "1-4 dormitorios y penthouses",
    "Penthouses con terrazas privadas y piscinas"
  ],
  unitMixEn: [
    "1-4 bedroom residences and penthouses",
    "Penthouses with private terraces and pools"
  ],

  featuresEs: [
    "Lobby dramático con concierge Cipriani",
    "Restaurante privado y catering 24h",
    "Piscinas estilo Riviera italiana con cabañas",
    "Centro fitness + golf simulator + pickleball",
    "Spa holístico con sauna y salas de tratamiento",
    "Lounge social, biblioteca y sala de cine privada",
    "Salón privado para belleza y wellness",
    "Club infantil interior y exterior"
  ],
  featuresEn: [
    "Dramatic lobby with Cipriani concierge",
    "Private restaurant + 24h in-home catering",
    "Italian Riviera-inspired pools with cabanas",
    "Fitness center + golf simulator + pickleball",
    "Holistic spa with sauna and treatment rooms",
    "Residents’ social lounge, library, screening room",
    "Private salon for beauty and wellness",
    "Children’s playroom indoor + outdoor"
  ],

  paymentPlanEs: [
    "20% al contrato",
    "10% a los 90 días",
    "10% al completar estructura",
    "60% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "20% at Contract",
    "10% in 90 days",
    "10% at Rooftop",
    "60% at Closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿El restaurante Cipriani es exclusivo?", a: "Sí, acceso solo para residentes y sus invitados." },
    { q: "¿Qué amenidades destacan?", a: "Dos piscinas, spa holístico, lounge, cine, biblioteca, canchas y restaurante privado Cipriani." },
    { q: "¿Hay servicio de catering 24h?", a: "Sí, catering y dining 24 horas por Cipriani." },
    { q: "¿Qué vistas ofrecen las residencias?", a: "Vistas panorámicas a Biscayne Bay, Brickell skyline y Simpson Park." },
    { q: "¿Los penthouses incluyen piscina privada?", a: "Sí, algunos penthouses cuentan con terrazas y piscinas privadas." },
    { q: "¿Hay estacionamiento y valet?", a: "Sí, garaje cubierto con valet 24h y acceso controlado." },
    { q: "¿Se permite tener mascotas?", a: "Sí, comunidad pet-friendly con grooming y paseo disponibles." }
  ],
  faqsEn: [
    { q: "Is the Cipriani restaurant exclusive?", a: "Yes, access is reserved for residents and their guests." },
    { q: "What amenities stand out?", a: "Two pools, holistic spa, lounge, screening room, library, courts and private Cipriani restaurant." },
    { q: "Is 24h catering service available?", a: "Yes, 24-hour catering and dining by Cipriani." },
    { q: "What views do the residences offer?", a: "Panoramic views of Biscayne Bay, Brickell skyline and Simpson Park." },
    { q: "Do penthouses include private pools?", a: "Yes, some penthouses feature private terraces with pools." },
    { q: "Is parking and valet available?", a: "Yes, covered garage with 24h valet and controlled access." },
    { q: "Are pets allowed?", a: "Yes, pet-friendly community with grooming and walking services available." }
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-7.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-3.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-8.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-9.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-4.jpg" },
    { src: "https://ik.imagekit.io/devrodri/CIpriani/1-5.jpg" }
  ]
};
