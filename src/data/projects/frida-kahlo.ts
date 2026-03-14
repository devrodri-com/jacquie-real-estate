// src/data/projects/frida-kahlo.ts
import type { Project } from "../types";

export const pFridaKahlo: Project = {
  id: "frida-kahlo",
  slug: "/proyectos/frida-kahlo",
  name: "Frida Kahlo Wynwood Residences",
  city: "119 NW 29th St, Miami, FL 33127",
  delivery: "2029",
  priceFromUsd: 500000,
  furnished: true,

  rentalPolicyEs:
    "Flexibilidad para alquileres a corto plazo.",
  rentalPolicyEn:
    "Short-term rental flexibility.",

  // Developer: PMG + LNDMRK Development. Payment plan sujeto a cambios según avance de obra y decisiones del desarrollador.
  paymentPlanEs: [
    "10% al firmar el contrato de compraventa (no hay depósito de reserva separado).",
    "10% a los 150 días desde la firma del contrato.",
    "10% al inicio de la obra (groundbreaking, estimado Q3/Q4).",
    "10% a los 12 meses del inicio de obra (aprox. top-off de la estructura).",
    "60% al cierre de la unidad (estimado Q3 2028).",
  ],
  paymentPlanEn: [
    "10% at contract signing (no separate reservation deposit required).",
    "10% 150 days after contract execution.",
    "10% at groundbreaking (estimated Q3/Q4).",
    "10% 12 months after groundbreaking (approximately at top-off).",
    "60% balance at closing (estimated Q3 2028).",
  ],

  microClaimsEs: ["Desde US$500K", "Residencias amuebladas + oficina privada"],
  microClaimsEn: ["Starting in the $500Ks", "Furnished residences + deeded office suite"],

  highlights: [
    "Piscina estilo resort",
    "Áreas de relax sombreadas con paisajismo",
    "Gimnasio con equipamiento de última generación",
    "Circuito termal / wellness center",
    "Bar al aire libre y social lounge",
    "Speakeasy bar en lobby",
    "Colección curada de instalaciones de arte",
    "Tecnología de edificio inteligente",
    "Membresía de atención médica concierge en Baker Health (incluida para propietarios)",
    "Flexibilidad para alquileres a corto plazo",
  ],
  highlightsEn: [
    "Resort-style pool",
    "Shaded lounge areas with lush landscaping",
    "State-of-the-art fitness studio",
    "Wellness center with thermal circuit",
    "Outdoor bar and social lounge",
    "Speakeasy-inspired lobby bar",
    "Curated collection of custom art installations",
    "Latest smart building technology",
    "Baker Health concierge medical care membership (included for owners)",
    "Short-term rental flexibility",
  ],

  featuresEs: [
    "Residencias completamente terminadas y amuebladas (estudios a 3 dormitorios, incluyendo penthouses)",
    "Oficina privada con título independiente (selectas)",
    "Balcones privados (selectas)",
    "Closets empotrados en suite principal con estantes y cajones",
    "Paquete de electrodomésticos de alta gama",
    "Cocinas integradas con encimeras personalizadas",
    "Accesorios de baño modernos + gabinetes personalizados",
    "Lavadora y secadora integradas",
    "Paquete de iluminación contemporáneo",
  ],
  featuresEn: [
    "Fully-finished and furnished residences (studios to 3 bedrooms, including penthouses)",
    "Deeded office suite (select residences)",
    "Private balconies (select residences)",
    "Built-in closets in primary bedrooms with shelving and drawers",
    "High-end appliance package",
    "Integrated kitchens with custom countertops",
    "Modern bath fixtures + custom vanities",
    "Integrated washer and dryer",
    "Contemporary lighting package",
  ],

  unitMixEs: ["Estudios", "1 dormitorio", "2 dormitorios", "3 dormitorios", "Penthouses (selectos)"],
  unitMixEn: ["Studios", "1-bedroom", "2-bedroom", "3-bedroom", "Select penthouses"],

  faqsEs: [
    {
      q: "¿Se permiten alquileres a corto plazo?",
      a: "El proyecto comunica flexibilidad para alquileres a corto plazo. Las condiciones finales dependen de los documentos del condominio y regulaciones vigentes.",
    },
    {
      q: "¿Las residencias se entregan amuebladas?",
      a: "Sí, se promocionan como residencias completamente terminadas y amuebladas.",
    },
    {
      q: "¿Cuál es la fecha estimada de entrega?",
      a: "La entrega se comunica para 2029 (sujeto a cambios).",
    },
    {
      q: "¿Dónde está ubicado el proyecto?",
      a: "119 NW 29th St, Miami, FL 33127.",
    },
  ],
  faqsEn: [
    {
      q: "Are short-term rentals allowed?",
      a: "The project promotes short-term rental flexibility. Final terms depend on the condominium documents and applicable regulations.",
    },
    {
      q: "Are the residences delivered furnished?",
      a: "Yes. Residences are marketed as fully-finished and furnished.",
    },
    {
      q: "What is the estimated completion?",
      a: "Completion is reported for 2029 (subject to change).",
    },
    {
      q: "Where is the project located?",
      a: "119 NW 29th St, Miami, FL 33127.",
    },
  ],

  image: "https://ik.imagekit.io/devrodri/Frida%20Khalo/1(1).jpg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/Untitled%20design%20(16).jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/2ds.jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/3(1).jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/4(1).jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/5(1).jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/6(1).jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/7(1).jpg" },
    { src: "https://ik.imagekit.io/devrodri/Frida%20Khalo/8(1).jpg" },
  ],

  // Omitted: pricePerSfApprox (TODO: falta dato oficial), hoa (TODO: falta dato oficial),
  // financingAtClosing (TODO: no confirmado), lat/lng (TODO: opcional si se obtienen coords)
};

export default pFridaKahlo;
