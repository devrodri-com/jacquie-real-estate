// src/data/projects/nexo.ts
import type { Project } from "../types";

export const pNexo: Project = {
  id: "nexo",
  name: "Nexo Residences",
  city: "North Miami Beach",
  rentalPolicy: "Sin restricciones", // legacy fallback
  rentalPolicyEs: "Sin restricciones",
  rentalPolicyEn: "No rental restrictions",
  furnished: true,
  priceFromUsd: 626000,
  delivery: "2026",
  financingAtClosing: true,
  slug: "/proyectos/nexo",
  image: "https://ik.imagekit.io/devrodri/1-2-2.jpg",

  microClaimsEs: [
    "VISA de Inversionista (EB‑5)",
    "Alquiler flexible (sin restricciones)",
    "Residencias amuebladas",
    "Sobre Biscayne Blvd"
  ],
  microClaimsEn: [
    "EB‑5 investor visa eligible",
    "Flexible rental (no restrictions)",
    "Furnished residences",
    "On Biscayne Blvd"
  ],

  highlights: [
    "VISA EB‑5: ruta a la Green Card (vía Centro Regional)",
    "254 residencias en 17 pisos",
    "Sin restricciones: apto Airbnb y más",
    "Tech Center de dos niveles con coworking, salas y café",
    "Piscina estilo resort, cine al aire libre, fire pits y summer kitchens",
    "Rooftop observatory con vistas 360° y BBQ",
    "Residencias terminadas y amuebladas; ventanas piso‑techo y balcones",
  ],
  highlightsEn: [
    "EB‑5 Investor Visa: path to Green Card (via Regional Center)",
    "254 residences in 17 stories",
    "No restrictions: Airbnb & more",
    "Two‑story Tech Center with coworking, meeting rooms and café",
    "Resort‑style pool, outdoor movie lawn, fire pits and summer kitchens",
    "Rooftop observatory with 360° views and BBQ",
    "Finished and furnished residences; floor‑to‑ceiling windows and balconies",
  ],

  unitMixEs: ["Studio", "1 Dormitorio", "1 Dormitorio + Den", "2 Dormitorios", "2 Dormitorios + Den", "3 Dormitorios", "3 Dormitorios + Den", "Townhomes 3‑4 Dormitorios"],
  unitMixEn: ["Studio", "1 Bedroom", "1 Bedroom + Den", "2 Bedrooms", "2 Bedrooms + Den", "3 Bedrooms", "3 Bedrooms + Den", "3‑4BR Townhomes"],

  featuresEs: [
    "Residencias completamente terminadas y amuebladas",
    "Cocinas europeas, encimeras de cuarzo y electrodomésticos premium",
    "Baños con losas texturizadas y accesorios negro mate",
    "Lavadora y secadora en cada unidad",
    "Ventanas piso a techo y balcones amplios con barandas de vidrio",
    "Coworking y salas de conferencia de última generación",
    "Piscina resort, bar exterior, hamacas, fogatas y cine al aire libre",
    "Rooftop con cocina de verano y mesa de chef",
    "Lockers inteligentes, carga EV, bike storage y kids playground",
    "Edificio pet‑friendly",
  ],
  featuresEn: [
    "Fully finished and furnished residences",
    "European kitchens, quartz countertops and premium appliances",
    "Bathrooms with textured slabs and matte‑black fixtures",
    "Washer and dryer in every unit",
    "Floor‑to‑ceiling windows and generous glass‑railing balconies",
    "State‑of‑the‑art coworking and conference rooms",
    "Resort pool, outdoor bar, hammock lounge, fire pits and movie lawn",
    "Rooftop with summer kitchen and chef's table",
    "Smart lockers, EV charging, bike storage and kids playground",
    "Pet‑friendly building",
  ],

  paymentPlanEs: [
    "20% al contrato",
    "10% al inicio de la construcción",
    "10% 90 días después del inicio de la construcción",
    "10% al llegar al último piso",
    "50% al cierre (con financiación disponible para extranjeros)"
  ],
  paymentPlanEn: [
    "20% at contract",
    "10% at groundbreaking",
    "10% 90 days after groundbreaking",
    "10% at top‑off",
    "50% at Closing (financing available for foreign buyers)"
  ],

  faqsEs: [
    { q: "¿Visa EB‑5?", a: "Sí. Elegible vía Centro Regional; inversión mínima US$800.000 y tarifa administrativa ~US$70.000; camino a la Green Card sujeto a aprobación de USCIS." },
    { q: "¿Se permiten alquileres de corto plazo?", a: "Sí. Nexo no tiene restricciones y permite listar en Airbnb, Vrbo, Booking y otras plataformas." },
    { q: "¿Las residencias se entregan amuebladas?", a: "Sí. Todas se entregan completamente terminadas y amuebladas." },
    { q: "¿Dónde está ubicado?", a: "13899 Biscayne Blvd, North Miami Beach; cerca de Oleta River Park, Bal Harbour Shops y Aventura Mall." },
    { q: "¿Cuáles son las amenidades principales?", a: "Tech Center de dos pisos, coworking, piscina resort, rooftop 360°, cine al aire libre, gimnasio, lounge y más." }
  ],
  faqsEn: [
    { q: "EB‑5 Visa?", a: "Yes. Eligible via Regional Center; minimum investment US$800,000 and ~US$70,000 admin fee; path to a Green Card subject to USCIS approval." },
    { q: "Are short‑term rentals allowed?", a: "Yes. No rental restrictions-Airbnb, Vrbo, Booking and other platforms allowed." },
    { q: "Are units furnished?", a: "Yes. All residences are delivered fully finished and furnished." },
    { q: "Where is it located?", a: "13899 Biscayne Blvd, North Miami Beach; near Oleta River Park, Bal Harbour Shops and Aventura Mall." },
    { q: "What are the key amenities?", a: "Two‑story Tech Center, coworking, resort pool, 360° rooftop, outdoor movie lawn, gym, lounges and more." }
  ],
 
  images: [
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-2.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-3.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-4.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-5.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-6.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-7.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-8.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Nexo/1-9.jpg" }
  ]
};