// src/data/projects/parkside.ts
import type { Project } from "../types";

// Nota: Datos básicos cargados con imágenes provistas por el usuario.
// Falta completar precios, plan de pagos, amenidades y política de renta
// con la documentación del Dropbox compartido para PARKSIDE.

export const pParkside: Project = {
  id: "parkside-brickell",
  name: "Parkside Brickell",
  city: "Brickell, Miami",
  rentalPolicyEs: "Sin restricciones de alquiler; aprobado para renta corta (gestión hotelera en el edificio)",
  rentalPolicyEn: "No rental restrictions; approved for short-term rental (hotel management in the building)",
  furnished: true,
  priceFromUsd: 500000,
  delivery: "2027",
  slug: "/proyectos/parkside-brickell",
  image: "https://ik.imagekit.io/devrodri/Parkside/y6-PI7-A.jpeg",

  images: [
    { src: "https://ik.imagekit.io/devrodri/Parkside/nQ34Z0IA.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/SB5S8L6Q.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/B_lecjew.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/cZ9cx3ag.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/AajnMI9w.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/VoaLqmDQ.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/6Hnxx74A.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Parkside/kJTt50zg.jpeg" }
  ],

  microClaimsEs: [
    "VISA de Inversionista (EB‑5)",
    "Residencias terminadas y amuebladas",
    "STR sin restricciones con gestión in‑house",
    "Boutique en el corazón de Brickell"
  ],
  microClaimsEn: [
    "EB‑5 investor visa eligible",
    "Delivered fully finished and furnished",
    "No rental restrictions; STR with in‑house management",
    "Boutique residence in the heart of Brickell"
  ],

  highlights: [
    "VISA EB‑5: ruta a la Green Card (vía Centro Regional)",
    "Piscina en terraza panorámica y cabañas",
    "Cocina al aire libre con bar y restaurante en PB",
    "Gimnasio en la terraza",
    "Estaciones de carga para vehículos eléctricos",
    "Zona segura para paquetería",
    "Shuttle a Brickell City Centre y la playa"
  ],
  highlightsEn: [
    "EB‑5 Investor Visa: path to Green Card (via Regional Center)",
    "Rooftop pool with cabanas",
    "Outdoor kitchen with bar and ground‑floor restaurant",
    "Rooftop gym",
    "EV charging stations",
    "Secure package room",
    "Shuttle to Brickell City Centre and the beach"
  ],

  unitMixEs: [
    "Estudios, 1 y 2 dormitorios",
    "187 residencias · 8 niveles"
  ],
  unitMixEn: [
    "Studios, 1 and 2 bedrooms",
    "187 residences · 8 levels"
  ],

  featuresEs: [
    "Ventanales piso‑techo resistentes al impacto",
    "Unidades completamente amuebladas",
    "Encimeras de mármol y electrodomésticos de acero inoxidable",
    "Gabinetes italianos y diseño de iluminación personalizado",
    "Baños con duchas de vidrio sin marco",
    "Balcones con barandas de vidrio",
    "Lavadora y secadora en cada unidad",
    "Climatización central de alta eficiencia"
  ],
  featuresEn: [
    "Floor‑to‑ceiling impact‑resistant glazing",
    "Residences fully furnished",
    "Marble countertops and stainless appliances",
    "Italian cabinetry and custom lighting design",
    "Frameless glass showers",
    "Glass‑railing balconies",
    "In‑unit washer & dryer",
    "High‑efficiency central HVAC"
  ],

  paymentPlanEs: [
    "US$10.000 a la reserva",
    "20% al firmar el contrato",
    "10% al inicio de la construcción",
    "10% al completar la estructura",
    "60% al cierre"
  ],
  paymentPlanEn: [
    "US$10,000 at reservation",
    "20% at contract",
    "10% at groundbreaking",
    "10% at top‑off",
    "60% at closing"
  ],

  faqsEs: [
    { q: "¿Visa EB‑5?", a: "Sí. Parkside Brickell ofrece opción de Visa EB‑5 vía Centro Regional, con ruta a la Green Card sujeta a aprobación de USCIS." },
    { q: "¿Monto y costos EB‑5?", a: "Inversión mínima US$1.050.000 (área no‑TEA), más admin fee (~US$70.000), honorarios legales (~US$20-25k) y tasa USCIS I‑526E (~US$12.160)." },
    { q: "¿Proceso y tiempos EB‑5?", a: "Petición I‑526E (~24-36 meses), Green Card condicional 2 años, luego I‑829 para remover condiciones. Plazo total estimado: ~4-6 años." },
    { q: "¿Precio desde?", a: "Estudios desde ~US$500.000; 1BR desde ~US$700.000; 2BR desde ~US$900.000." },
    { q: "¿Hay leaseback?", a: "Sí, programa de leaseback con retorno del 10%." },
    { q: "¿Política de alquiler?", a: "Sin restricciones; STR permitidos con gestión hotelera en el edificio." },
    { q: "¿Amoblamiento?", a: "Residencias entregadas completamente terminadas y amuebladas." }
  ],
  faqsEn: [
    { q: "EB‑5 visa?", a: "Yes. Parkside Brickell offers an EB‑5 option via a Regional Center, with a path to the Green Card subject to USCIS approval." },
    { q: "EB‑5 amount & costs?", a: "Minimum US$1,050,000 (non‑TEA), plus admin fee (~US$70,000), legal fees (~US$20-25k) and USCIS I‑526E fee (~US$12,160)." },
    { q: "EB‑5 process & timing?", a: "I‑526E (~24-36 months), 2‑year conditional Green Card, then I‑829 to remove conditions. Total ~4-6 years (est.)." },
    { q: "Starting price?", a: "Studios from ~US$500k; 1BR ~US$700k; 2BR ~US$900k." },
    { q: "Leaseback?", a: "Yes, developer leaseback program at 10%." },
    { q: "Rental policy?", a: "No restrictions; short‑term rentals allowed with in‑house management." },
    { q: "Furnishing?", a: "Residences delivered fully finished and furnished." }
  ]
};

export default pParkside;