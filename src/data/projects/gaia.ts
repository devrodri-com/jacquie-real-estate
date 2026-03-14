// src/data/projects/gaia.ts
import type { Project } from "../types";

export const pGaiaResidences: Project = {
  id: "gaia-residences",
  slug: "/proyectos/gaia-residences",
  name: "Gaia Residences",
  city: "401 N Federal Hwy, Hollywood, FL 33020",

  // hero + galería
  image: "https://ik.imagekit.io/devrodri/Gaia%20Residences/ymdwzF9g.jpeg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/JdYl62qQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/RLZT2qMQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/nmK_B4Sw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/6kzJnggQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/yAkYTngw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/Ba1678xw.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/EjjF2_cA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Gaia%20Residences/5R4NzwtQ.jpeg" }
  ],

  priceFromUsd: 480000,
  delivery: "2028",
  rentalPolicyEs: "Alquiler flexible: se permiten estadías cortas, incluso diarias.",
  rentalPolicyEn: "Flexible rentals: short stays allowed, including daily.",

  paymentPlanEs: [
    "5% al hacer la reserva (reservation).",
    "5% a los 45 días de la reserva.",
    "10% al firmar el contrato.",
    "10% al inicio de obra (groundbreaking).",
    "10% al top-off (estructura).",
    "60% saldo al cierre."
  ],
  paymentPlanEn: [
    "5% at reservation.",
    "5% 45 days after reservation.",
    "10% at contract.",
    "10% at groundbreaking.",
    "10% at top-off.",
    "60% balance due at closing."
  ],

  // microclaims
  microClaimsEs: [
    "18 pisos · 238 residencias",
    "Amenidades ≈6,700 m²",
    "Membresía: beach space + Hollywood Beach Golf Club"
  ],
  microClaimsEn: [
    "18 stories · 238 residences",
    "~72,000 sq.ft of amenities",
    "Memberships: private beach space + Hollywood Beach Golf Club"
  ],

  // destacados (ES) + EN
  highlights: [
    "Amenidades ≈6,700 m² (indoor + outdoor)",
    "Rooftop: piscina climatizada con vistas + jacuzzi",
    "Water garden + zonas de relax (daybeds y cabanas)",
    "Pavilion con summer kitchen + BBQ stations",
    "Hammock garden + terrazas de outdoor dining",
    "Sky lounge con wet bar + pool spa",
    "Health club + outdoor fitness lawn",
    "Yoga / barre / pilates studio",
    "Aura Wellness Spa: steam room, sauna y plunge pools",
    "Co-working lounge + salas privadas + zoom pods",
    "Concierge 24/7 · package room · bike/storage rooms",
    "Membresía: beach space + Hollywood Beach Golf Club"
  ],
  highlightsEn: [
    "~72,000 sq.ft indoor + outdoor amenity program",
    "Rooftop: heated ocean-view pool + jacuzzi",
    "Water garden + relaxation zones (daybeds and cabanas)",
    "Pavilion with summer kitchen + private BBQ stations",
    "Hammock garden + outdoor dining terraces",
    "Sky lounge with wet bar + pool spa",
    "Health Club + outdoor fitness lawn",
    "Yoga / barre / pilates studio",
    "Aura Wellness Spa: steam room, dry sauna, plunge pools",
    "Co-working lounge + private meeting rooms + zoom pods",
    "24/7 concierge · package room · bike/storage rooms",
    "Memberships: private beach space + Hollywood Beach Golf Club"
  ],

  // mix tipológico
  unitMixEs: ["Studios a 3 dormitorios · ver planos para m²"],
  unitMixEn: ["Studios to 3 bedrooms · see plans for m²/sq.ft"],

  // acabados
  featuresEs: [
    "Cocinas italianas modernas; Bosch integrado; gabinetes europeos",
    "Porcelanato importado de gran formato",
    "Cuarzo continuo (countersplash + baños)",
    "Ventanales piso-techo con vistas a golf, ciudad u océano",
    "Altura de techos aprox. 3-4 m",
    "Terrazas privadas amplían el living al exterior",
    "Smart thermostats · lavadora/secadora front-load",
    "Closets built-out en dormitorio principal · espejo backlit en baños",
    "Paquetes de muebles a medida disponibles (opcional)"
  ],
  featuresEn: [
    "Modern Italian kitchens; integrated Bosch appliances; European cabinetry",
    "Imported large-format porcelain tile flooring",
    "Seamless quartz countersplash and bath countertops",
    "Floor-to-ceiling windows with golf, city or ocean views",
    "Airy living spaces with ~9-14 ft ceiling heights",
    "Private terraces extend living space outdoors",
    "Smart thermostats · front-loading washer/dryer",
    "Built-out primary closets · backlit bathroom mirrors",
    "Bespoke custom furniture packages available (optional)"
  ],

  // FAQs
  faqsEs: [
    { q: "¿Dirección del proyecto?", a: "401 N Federal Hwy, Hollywood, FL 33020." },
    { q: "¿Sales Gallery?", a: "1811 North Young Circle, Hollywood, FL 33020." },
    { q: "¿Desde qué precios?", a: "Studios desde US$480,000. Valores sujetos a disponibilidad por tipología y piso." },
    { q: "¿Por qué Gaia?", a: "Membresías incluidas (beach space + Hollywood Beach Golf Club) y un programa de amenidades ~72,000 ft² (≈6,700 m²) orientado a wellness y vida social." },
    { q: "¿Amenidades principales?", a: "Rooftop pool + jacuzzi, Health Club, Aura Spa (steam/sauna/plunge), sky lounge, co-working con zoom pods, terrazas exteriores y BBQ stations." },
    { q: "¿Qué incluye la membresía?", a: "Espacio de playa privado con sombrillas y lounge seating + membresía al Hollywood Beach Golf Club." },
    { q: "¿Qué tan cerca está de lo más importante?", a: "Hollywood Beach Golf Club ~1 km · Arts Park at Young Circle ~0.8 km · Hollywood Marina ~2.7 km · Aventura Mall ~7 km." },
    { q: "¿Quiénes están detrás del proyecto?", a: "Desarrollador: Alta Developers · Arquitectura: CFE Architects · Interiores: ID & Design International · Sales & Marketing: Fortune International Group." },
    { q: "¿Fecha de entrega?", a: "Entrega estimada 2028 (sujeto a permisos y cronograma de obra)." },
    { q: "¿Política de alquileres?", a: "Alquiler flexible: se permiten estadías cortas, incluso diarias." },
    { q: "¿Se puede comprar amueblado?", a: "Hay paquetes de mobiliario a medida disponibles (opcional)." }
  ],
  faqsEn: [
    { q: "Project address?", a: "401 N Federal Hwy, Hollywood, FL 33020." },
    { q: "Sales Gallery?", a: "1811 North Young Circle, Hollywood, FL 33020." },
    { q: "Starting prices?", a: "Studios from US$480,000. Pricing varies by unit type and floor." },
    { q: "Why Gaia?", a: "Included memberships (private beach space + Hollywood Beach Golf Club) plus a ~72,000 sq.ft wellness + social amenity program." },
    { q: "Top amenities?", a: "Rooftop pool + jacuzzi, Health Club, Aura Spa (steam/sauna/plunge), sky lounge, co-working with zoom pods, outdoor terraces and BBQ stations." },
    { q: "What’s included in the memberships?", a: "Private beach space with umbrellas and lounge seating + membership at the Hollywood Beach Golf Club." },
    { q: "How close is everything?", a: "Hollywood Beach Golf Club ~0.6 mi · Arts Park at Young Circle ~0.5 mi · Hollywood Marina ~1.7 mi · Aventura Mall ~4.5 mi." },
    { q: "Who’s behind the project?", a: "Developer: Alta Developers · Architecture: CFE Architects · Interiors: ID & Design International · Sales & Marketing: Fortune International Group." },
    { q: "Completion date?", a: "Estimated completion 2028 (subject to permits and construction timeline)." },
    { q: "Rental policy?", a: "Flexible rentals: short stays allowed, including daily." },
    { q: "Can units be purchased furnished?", a: "Bespoke custom furniture packages are available (optional)." }
  ]
};

export default pGaiaResidences;