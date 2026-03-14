// src/data/projects/rider.ts
import type { Project } from "../types";

export const pRider: Project = {
  id: "the-rider-wynwood",
  name: "The Rider Wynwood",
  city: "Wynwood, Miami",
  rentalPolicyEs: "Política de renta Uso flexible (short-/long-term)",
  rentalPolicyEn: "Short‑ and long‑term rentals allowed.",
  furnished: true,
  priceFromUsd: 500000, // Desde ~US$500k (material público reciente)
  delivery: "2027",
  slug: "/proyectos/the-rider-wynwood",
  image: "https://ik.imagekit.io/devrodri/Rider/Db459XMg.jpeg",

  images: [
    { src: "https://ik.imagekit.io/devrodri/Rider/939Bwf8g.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/0Rdn2cTA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/e3-o0eOw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/ph0RAPdg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/gojj7BvA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/NObbIiIw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/xjfhvlsA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Rider/JgjJVkTQ.jpeg" }
  ],

  microClaimsEs: [
    "Residencias terminadas y amuebladas",
    "Renta corta permitida con gestión interna",
    "Wynwood · Midtown · Design District"
  ],
  microClaimsEn: [
    "Fully finished & furnished residences",
    "Short‑term rental friendly with in‑house management",
    "Wynwood · Midtown · Design District"
  ],

  highlights: [
    "Rooftop: piscina resort, lounge & bar entre jardines",
    "Fitness + saunas infrarrojas + sala de masajes",
    "VINYL: lounge con mesa de billar, pantalla de cine y tocadiscos Brionvega",
    "Ready Set Café para tomas on‑the‑go",
    "Port‑cochère ‘X Marks the Spot’ y lobby de arte",
    "Ride‑share de motocicletas y e‑bikes",
    "‘BTS’ corners para creación de contenido con pro‑lighting",
    "Wi‑Fi en todo el edificio, seguridad con smart FOB"
  ],
  highlightsEn: [
    "Rooftop resort pool, lounge & bar set in lush gardens",
    "RESET: fitness + cold plunge garden + infrared saunas + massage room",
    "VINYL: resident lounge with billiards, theater screen & Brionvega DJ turntable",
    "Ready Set Café for on‑the‑go life",
    "‘X Marks the Spot’ porte‑cochère and art‑adorned epic lobby",
    "Motorcycle & e‑bike ride share",
    "‘BTS’ social media creation corners with pro lighting",
    "Property‑wide Wi‑Fi, smart FOB security"
  ],

  unitMixEs: [
    "Studios, 1, 2 y 3 dormitorios (algunos con den y opción lock‑off)",
    "146 unidades en 12 pisos"
  ],
  unitMixEn: [
    "Studios, 1, 2 and 3 bedrooms (some with den and lock‑off option)",
    "146 residences across 12 stories"
  ],

  featuresEs: [
    "Cocinas con electrodomésticos Bertazzoni",
    "Encimeras Dekton en cocinas y baños",
    "Griferías Porcelanosa",
    "Cerradura inteligente (smart lock) y sistemas smart‑home"
  ],
  featuresEn: [
    "Bertazzoni appliance package",
    "Dekton countertops in kitchens and baths",
    "Porcelanosa plumbing fixtures",
    "Smart lock entry and smart‑home features"
  ],

  paymentPlanEs: [
    "10% a la reserva",
    "10% al contrato",
    "10% al groundbreaking",
    "10% al colado de fundación o a los 6 meses del groundbreaking (lo que ocurra más tarde)",
    "60% al cierre (financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "10% at reservation",
    "10% at contract",
    "10% at groundbreaking",
    "10% at foundation pour or six months after groundbreaking (whichever is later)",
    "60% at closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Precio desde?", a: "Desde ~US$500.000 (según material público reciente)." },
    { q: "¿Política de alquiler?", a: "Permite renta corta y larga; exige Certificado de Uso (\"Certificate of Use\") de la ciudad." },
    { q: "¿Las residencias vienen amuebladas?", a: "Sí, ‘fully furnished and finished’." },
    { q: "¿Entrega estimada?", a: "2027." }
  ],
  faqsEn: [
    { q: "Starting price?", a: "From ~US$500,000 (recent public materials)." },
    { q: "Rental policy?", a: "Short‑ and long‑term allowed; STR subject to the city Certificate of Use." },
    { q: "Furnishing?", a: "Yes—fully furnished and finished." },
    { q: "Estimated delivery?", a: "2027." }
  ]
};

export default pRider;