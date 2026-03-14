// src/data/projects/faena.ts
// Datos verificados en brochures y fichas técnicas provistas por el usuario.
// Precios desde (1 BR) y plan de pagos según documentos FRM. Ver citas en el mensaje.
import type { Project } from "../types";

export const pFaena: Project = {
  id: "faena-residences-miami",
  name: "Faena Residences Miami",
  city: "Miami River",
  rentalPolicy: undefined,
  furnished: undefined,
  priceFromUsd: 1300000, // 1BR starting from $1.3M
  pricePerSfApprox: undefined,
  delivery: "2028",
  slug: "/proyectos/faena",
  image: "https://ik.imagekit.io/devrodri/Faena/dT-Dx4lg.jpeg",

  microClaimsEs: [
    "Dos torres frente al río conectadas por Sky Bridge",
    "Faena Beach en el piso 64",
    "Cultura + wellness + comunidad",
    "≈100 m de frente al Miami River",
    "Distrito de ≈6 hectáreas",
  ],
  microClaimsEn: [
    "Two riverfront towers linked by a Sky Bridge",
    "Faena Beach on the 64th floor",
    "Culture + wellness + community",
    "327 ft of Miami River frontage",
    "14‑acre district",
  ],

  highlights: [
    "Sky Bridge 61-64: club y lounges",
    "Faena Beach: piscina infinity, cabañas y bar",
    "Foro cultural The Pistil, Library Lounge y programación artística",
    "Wellness de alto desempeño: fitness, spa, salas de creación y estudio",
    "Acceso a muelle y concierge náutico; porte‑cochère y lobbies privados",
    "Teatro para 40 personas y suites de huéspedes en el Sky Bridge",
    "Clínica de longevidad, hammam y cold plunge; juice & coffee bar",
    "Cancha de pádel, kids club y pet wellness",
  ],
  highlightsEn: [
    "Sky Bridge on levels 61/62/64 with social club, dining and lounges",
    "Faena Beach infinity pool, cabanas and full‑service bar",
    "The Pistil cultural forum, Library Lounge and curated program",
    "High‑performance wellness: fitness, spa, content studios",
    "Private marina access and nautical concierge; porte‑cochère and private lobbies",
    "40‑seat theater and guest suites within the Sky Bridge",
    "Longevity clinic, hammam and cold plunge; juice & coffee bar",
    "Padel court, kids club and pet wellness",
  ],

  unitMixEs: [
    "1-4 dormitorios; River Lofts; Sky Lofts; Penthouses",
    "Residencias con terrazas de ≈3 m y ventanales piso‑techo"
  ],
  unitMixEn: [
    "1-4 bedrooms; River Lofts; Sky Lofts; Penthouses",
    "Residences with 10‑ft terraces and floor‑to‑ceiling glass"
  ],

  featuresEs: [
    "Unidades totalmente terminadas; pisos de travertino en áreas sociales",
    "Puertas de vidrio resistentes a impacto; preinstalación smart‑home",
    "Cocina italiana en piedra natural y electrodomésticos Gaggenau",
    "Baños principales con tocadores de piedra hechos a mano y grifería THG"
  ],
  featuresEn: [
    "Residences delivered fully finished; travertine floors in social areas",
    "Impact‑resistant floor‑to‑ceiling glass; smart‑home pre‑wiring",
    "Italian kitchens in natural stone with Gaggenau appliances",
    "Primary baths with handcrafted stone vanities and THG fixtures"
  ],

  paymentPlanEs: [
    "5% al Contrato",
    "5% a los 45 días de la firma",
    "10% a los 120 días de la firma",
    "10% al inicio de obra (groundbreaking)",
    "10% a los 12 meses del inicio de obra",
    "10% al colado de la losa de la unidad residencial más alta",
    "50% al Cierre (financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "5% at Contract",
    "5% 45 days after Signing",
    "10% 120 days from Signing",
    "10% at Groundbreaking",
    "10% 12 Months after Groundbreaking",
    "10% at Pouring of Highest Residential Unit",
    "50% at Closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Dónde está el proyecto?", a: "A orillas del Miami River, con ≈100 m de frente de río." },
    { q: "¿Las residencias vienen amuebladas?", a: "Se entregan terminadas (acabados de lujo); amoblamiento no especificado en los materiales." },
    { q: "¿Precio desde?", a: "1 dormitorio desde USD 1.3M (según lista vigente)." },
    { q: "¿Cómo es el plan de depósitos?", a: "5% contrato; 5% a 45 días; 10% a 120 días; 10% al inicio de obra; 10% a 12 meses; 10% al colado de la losa más alta; 50% al cierre." },
    { q: "¿Qué incluye el Sky Bridge?", a: "Club social y cultural con The Pistil, Library Lounge, teatro, suites de huéspedes, wellness y piscina Faena Beach." },
    { q: "¿Hay acceso náutico?", a: "Sí, acceso a muelle y concierge náutico." },
    { q: "¿Hay canchas y espacios deportivos?", a: "Sí, pádel y simulador de golf, además de fitness de alto desempeño." },
    { q: "¿Política de alquiler?", a: "A confirmar con la asociación del condominio." },
  ],
  faqsEn: [
    { q: "Where is the project located?", a: "Along the Miami River, with 327 linear feet of riverfront." },
    { q: "Are the residences furnished?", a: "Delivered fully finished with luxury finishes; furnishing not specified in the materials." },
    { q: "Starting price?", a: "1‑bed from USD 1.3M (current price sheet)." },
    { q: "How are deposits structured?", a: "5% at contract; 5% in 45 days; 10% in 120 days; 10% at groundbreaking; 10% 12 months after; 10% at highest pour; 50% at closing." },
    { q: "What does the Sky Bridge include?", a: "Cultural & social club featuring The Pistil, Library Lounge, theater, guest suites, wellness and the Faena Beach pool." },
    { q: "Nautical access?", a: "Yes, private dock access and nautical concierge." },
    { q: "Sports & recreation?", a: "Yes, padel court and golf simulator plus high‑performance fitness." },
    { q: "Rental policy?", a: "To be confirmed with the condo association." },
  ],

  images: [
    { src: "https://ik.imagekit.io/devrodri/Faena/-oBqAd-w.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/3_ypp2Dg.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/SJGaLFeQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/pQnVS2uQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/rXcPduug.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/mSEtdNnw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/LlSqs7nA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Faena/abbIlMwQ.jpeg" }
  ]
};

export default pFaena;