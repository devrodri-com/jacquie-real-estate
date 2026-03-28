/**
 * Textes FR centralisés : liste /proyectos + détail /proyectos/[slug].
 * Clés = `slug` exact (ex. "/proyectos/72-park").
 * Champs détail optionnels : sinon la page utilise EN → ES.
 */
export type ProjectFrOverlay = {
  rentalPolicyFr: string;
  highlightsFr: string[];
  deliveryFr: string;
  microClaimsFr?: string[];
  paymentPlanFr?: string[];
  faqsFr?: { q: string; a: string }[];
  unitMixFr?: (string | { label: string; iconKey?: string })[];
  featuresFr?: (string | { label: string; iconKey?: string })[];
};

export const PROJECTS_FR_OVERLAY: Record<string, ProjectFrOverlay> = {
  "/proyectos/72-park": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "2025",
    highlightsFr: [
      "Piscine style resort de 15 m avec bar et cabanes",
      "Club de plage privé avec service de serviettes",
      "Coworking 24 h/24 et salle de sport double hauteur",
      "Options entièrement meublées disponibles",
    ],
    microClaimsFr: [
      "Résidences avec gestion sur place",
      "Club de plage privé à proximité",
      "LEED Or",
    ],
    paymentPlanFr: [
      "20 % à la signature du contrat",
      "10 % à 90 jours",
      "10 % à l'achèvement de la structure",
      "60 % à la clôture (financement possible pour acheteurs étrangers)",
    ],
    unitMixFr: [
      "Jr-1, 1, 2 et 3 chambres",
      "43 à 109 m² intérieurs",
      "Balcon privé d'environ 2 m de profondeur",
      "Hauteur sous plafond 2 à 3 m ; baies vitrées",
    ],
    featuresFr: [
      "Cuisine européenne (Bosch / SMEG / Fisher & Paykel)",
      "Plans de travail et dosserets en quartz",
      "Salles de bain avec robinetterie Hansgrohe, esprit spa",
    ],
    faqsFr: [
      {
        q: "Les locations courte durée sont-elles autorisées ?",
        a: "Oui. 72 Park est approuvé pour la location courte durée et propose un programme de gestion sur place.",
      },
      {
        q: "Y a-t-il un club de plage ?",
        a: "Oui. Club privé avec service de chaises et serviettes, à 5 minutes à pied.",
      },
      {
        q: "Les résidences sont-elles meublées ?",
        a: "En option. Des forfaits d'ameublement complets sont disponibles.",
      },
      {
        q: "Où se situe 72 Park ?",
        a: "À North Beach, entre Bal Harbour et le Faena District, à deux pas de l'océan.",
      },
    ],
  },
  "/proyectos/ella-miami": {
    rentalPolicyFr: "Aucune restriction.",
    deliveryFr: "2026",
    highlightsFr: [
      "Emplacement Brickell avec vues sur la baie et l'océan",
      "Piscine sur le toit, spa et salle de sport",
      "Salon résidents, salle de jeux et salle de sport intérieure",
      "Conciergerie 24 h/24 et service de voiturier",
    ],
  },
  "/proyectos/elle-residences": {
    rentalPolicyFr:
      "Locations flexibles : plateformes ou programme entièrement géré.",
    deliveryFr: "2028",
    highlightsFr: [
      "Résidences face à l'eau à Edgewater",
      "Piscine sur le toit et cabanes",
      "Spa, salle de sport et salles de sport intérieure/extérieure",
      "Salons résidents et espaces de coworking",
    ],
  },
  "/proyectos/7200-collins": {
    rentalPolicyFr: "Aucune restriction.",
    deliveryFr: "2028",
    highlightsFr: [
      "Front de mer à North Beach",
      "Club de plage et service de plage",
      "Piscine sur le toit et terrasses paysagées",
    ],
  },
  "/proyectos/domus-brickell-park": {
    rentalPolicyFr:
      "Locations à la journée autorisées (1 jour jusqu'à 6 mois + 1 jour).",
    deliveryFr: "2026",
    highlightsFr: [
      "Emplacement Brickell avec accès rapide au centre",
      "Piscine sur le toit et espaces résidents",
      "Salles de sport et espaces de travail",
      "Options meublées et packages d'investissement",
    ],
  },
  "/proyectos/baccarat": {
    rentalPolicyFr: "Minimum 30 jours, jusqu'à 3 fois par an.",
    deliveryFr: "2028",
    highlightsFr: [
      "Marina et résidences de marque Baccarat",
      "Piscine sur le toit et spa",
      "Restaurants signatures et salons résidents",
      "Vues sur l'eau et la ville",
    ],
  },
  "/proyectos/cipriani": {
    rentalPolicyFr: "Minimum 30 jours, jusqu'à 2 fois par an.",
    deliveryFr: "2026",
    highlightsFr: [
      "Service 5 étoiles et restaurant privé Cipriani",
      "Spa, piscine et centre de remise en forme",
      "Bibliothèque, lounge et salles à manger résidents",
      "Vues panoramiques sur Brickell et la baie",
    ],
  },
  "/proyectos/26-and-2nd": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "T1 2028",
    highlightsFr: [
      "Wynwood : art, galeries et vie nocturne",
      "Adapté aux locations courte durée",
      "Piscine sur le toit et espaces résidents",
      "Studios à 3 chambres",
    ],
  },
  "/proyectos/flow-house": {
    rentalPolicyFr: "Minimum 30 jours (politique du bâtiment).",
    deliveryFr: "nov.-déc. 2025",
    highlightsFr: [
      "≈4 300 m² d'équipements (bien-être et coworking)",
      "Piscine de ≈38 m, daybeds et cabanes",
      "Coworking, bureaux privés et studio podcast",
      "Résidences livrées meublées avec lave-linge",
    ],
  },
  "/proyectos/nexo": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "2026",
    highlightsFr: [
      "VISA EB-5 : piste vers la Green Card (via centre régional)",
      "254 résidences sur 17 étages",
      "Sans restriction : Airbnb et plus",
      "Tech Center sur deux niveaux : coworking, salles et café",
    ],
  },
  "/proyectos/one-park-tower": {
    rentalPolicyFr: "Location minimale 30 jours.",
    deliveryFr: "2025",
    highlightsFr: [
      "Tour de 33 étages, 299 résidences et penthouses",
      "Vues sur la baie Biscayne, l'Atlantique et Oleta",
      "SoLé Mia : lagune Crystal Lagoon™ sur ≈3 ha",
      "ONE Beach Club avec plages de sable",
    ],
  },
  "/proyectos/2200-brickell": {
    rentalPolicyFr: "Minimum 90 jours.",
    deliveryFr: "2026",
    highlightsFr: [
      "105 résidences (1-4 chambres et Garden Villas)",
      "Toit-terrasse d'≈4 000 m² : piscine, spa, pickleball",
      "Certification WELL™ orientée santé",
      "Brickell Avenue, commerces et restaurants à proximité",
    ],
  },
  "/proyectos/edge-house": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "2028",
    highlightsFr: [
      "Edgewater : quartier central en évolution",
      "Piscine sur le toit et espaces résidents",
      "Studios à 3 chambres",
      "Finitions haut de gamme",
    ],
  },
  "/proyectos/domus-brickell-center": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "2027",
    highlightsFr: [
      "Brickell : usage quotidien jusqu'à 6 mois",
      "Adapté aux investisseurs internationaux",
      "Équipements résidents et piscine",
    ],
  },
  "/proyectos/mercedes-benz-places": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "2028",
    highlightsFr: [
      "Design signé Mercedes-Benz et équipements haut de gamme",
      "Piscine, spa et centre de remise en forme",
      "Vues sur la baie et le centre-ville",
      "Studios à plusieurs chambres",
    ],
  },
  "/proyectos/okan-tower": {
    rentalPolicyFr: "Aucune restriction de location.",
    deliveryFr: "2027",
    highlightsFr: [
      "Condo-hôtel et résidences dans le ciel au centre-ville",
      "Piscine sur le toit et espaces résidents",
      "Programme de gestion hôtelière",
    ],
  },
  "/proyectos/ave-maria": {
    rentalPolicyFr: "Location traditionnelle (longue durée).",
    deliveryFr: "8 à 12 mois",
    highlightsFr: [
      "Maple Ridge : quartier le plus vendu d'Ave Maria",
      "Communauté certifiée Blue Zones®",
      "Club-house privé avec piscine, salle de sport et parc pour chiens",
      "Town Center : plus de 50 commerces et restaurants",
    ],
  },
  "/proyectos/oasis-hallandale": {
    rentalPolicyFr: "1 bail par an · minimum 6 mois.",
    deliveryFr: "2025-2027",
    highlightsFr: [
      "Hallandale Beach : front de mer",
      "Équipements type resort et piscine",
      "Résidences avec vues sur l'océan",
    ],
  },
  "/proyectos/faena": {
    rentalPolicyFr:
      "À confirmer avec l'association de copropriété (selon documentation).",
    deliveryFr: "2028",
    highlightsFr: [
      "Sky Bridge (étages 61-64) : club, restauration et salons",
      "Faena Beach : piscine à débordement, cabanes et bar",
      "The Pistil, Library Lounge et programmation culturelle",
      "Wellness haut de gamme : fitness, spa et studios",
    ],
  },
  "/proyectos/the-rider-wynwood": {
    rentalPolicyFr: "Locations courte et longue durée autorisées.",
    deliveryFr: "2027",
    highlightsFr: [
      "Toit-terrasse : piscine resort, lounge et bar au milieu des jardins",
      "Salle de sport, saunas infrarouges et salle de massage",
      "VINYL : lounge résidents avec billard, écran ciné et platines Brionvega",
      "Ready Set Café pour les départs sur le pouce",
    ],
  },
  "/proyectos/parkside-brickell": {
    rentalPolicyFr:
      "Aucune restriction ; location courte durée approuvée (gestion hôtelière sur place).",
    deliveryFr: "2027",
    highlightsFr: [
      "Brickell : proche du centre financier",
      "Piscine sur le toit et terrasses",
      "Résidences 1 à 3 chambres",
    ],
  },
  "/proyectos/palma-miami-beach": {
    rentalPolicyFr:
      "Aucune durée minimale imposée ; location courte durée autorisée.",
    deliveryFr: "2026",
    highlightsFr: [
      "Miami Beach : emplacement recherché",
      "Piscine et espaces résidents",
      "Vues sur la ville et l'eau",
    ],
  },
  "/proyectos/millenia-park": {
    rentalPolicyFr: "Minimum 31 jours, jusqu'à 4 baux par an.",
    deliveryFr: "2024-2026",
    highlightsFr: [
      "Orlando : proche des parcs",
      "Équipements familiaux et piscines",
      "Maisons de ville et condos",
    ],
  },
  "/proyectos/millux-place-brickell": {
    rentalPolicyFr: "Hébergement : nuit à 6 mois (< 6 mois).",
    deliveryFr: "T4 2027",
    highlightsFr: [
      "Brickell : tour résidentielle",
      "Piscine sur le toit et salle de sport",
      "Studios à plusieurs chambres",
    ],
  },
  "/proyectos/jean-georges-tropic": {
    rentalPolicyFr: "Locations courte durée autorisées (type Airbnb).",
    deliveryFr: "2028",
    highlightsFr: [
      "Skydeck au 49e : piscine panoramique et Sky Bar",
      "Restaurant résidents par Jean-Georges ; abc kitchens au rez-de-chaussée",
      "Spa complet, fitness intérieur/extérieur et squash",
      "Coworking, studio podcast et jardins intérieurs",
    ],
  },
  "/proyectos/cassia": {
    rentalPolicyFr:
      "Locations courte durée autorisées (Airbnb) ; minimum ≈ 3 nuits.",
    deliveryFr: "T1 2027",
    highlightsFr: [
      "Piscine sur le toit style resort, cabanes et espaces repas",
      "Spa bien-être (piscine intérieure, sauna, hammam, massages)",
      "Salle de sport moderne + studio yoga/barre",
      "Grand lobby double hauteur et coworking",
    ],
  },
  "/proyectos/nomad": {
    rentalPolicyFr:
      "Aucune restriction ; locations type Airbnb à la journée autorisées.",
    deliveryFr: "2026",
    highlightsFr: [
      "Piscine sur le toit style resort, cabanes et NoMad Bar",
      "Casa Tua Cucina au rez-de-chaussée",
      "Bibliothèque, coworking et centre fitness & wellness",
      "Conciergerie 24 h/24, voiturier et parking intégré",
    ],
  },
  "/proyectos/seven-park": {
    rentalPolicyFr: "Usage flexible (courte ou longue durée).",
    deliveryFr: "2027",
    highlightsFr: [
      "Allapattah / proximité Health District",
      "Piscine et espaces résidents",
      "Studios à plusieurs chambres",
    ],
  },
  "/proyectos/the-william": {
    rentalPolicyFr: "Séjour minimum 90 jours.",
    deliveryFr: "2029",
    highlightsFr: [
      "Piscine style resort et solarium",
      "BBQ extérieur + bar avec braseros",
      "Coworking, bibliothèque et café",
      "Pickleball sur le toit · voiturier et conciergerie 24 h/24",
    ],
  },
  "/proyectos/the-lauderdale": {
    rentalPolicyFr:
      "Minimum 30 jours · jusqu'à 12 baux par an.",
    deliveryFr: "déc. 2029",
    highlightsFr: [
      "Fort Lauderdale : front de mer",
      "Piscine et équipements résidents",
      "Vues sur l'océan et l'Intracoastal",
    ],
  },
  "/proyectos/gaia-residences": {
    rentalPolicyFr:
      "Locations flexibles : courtes durées autorisées, y compris à la journée.",
    deliveryFr: "2028",
    highlightsFr: [
      "Coconut Grove : quartier verdoyant",
      "Piscine et espaces wellness",
      "Résidences haut de gamme",
    ],
  },
  "/proyectos/midtown-park": {
    rentalPolicyFr: "Minimum 30 jours, jusqu'à 4 fois par an.",
    deliveryFr: "2028",
    highlightsFr: [
      "Midtown Miami : art et vie de quartier",
      "Piscine sur le toit",
      "Studios à 3 chambres",
    ],
  },
  "/proyectos/nickelodeon-orlando": {
    rentalPolicyFr:
      "Condo-hôtel à usage vacances ; occupation permanente interdite.",
    deliveryFr: "T2 2026",
    highlightsFr: [
      "423 suites hôtelières aux thèmes Nickelodeon",
      "4 restaurants · Le Spatula · Mikey's · Aqua Bite · Express",
    ],
  },
  "/proyectos/ambar-orlando": {
    rentalPolicyFr: "Usage temporaire.",
    deliveryFr: "À confirmer avec le promoteur",
    highlightsFr: [
      "Résidences entièrement meublées, prêtes à emménager",
      "Piscine style resort, solarium et cabanes",
      "Restaurant et bar sur place ; market et café grab & go",
      "Centre fitness moderne ; spa, sauna et espaces bien-être",
    ],
  },
  "/proyectos/frida-kahlo": {
    rentalPolicyFr: "Flexibilité pour locations courte durée.",
    deliveryFr: "2029",
    highlightsFr: [
      "Piscine style resort",
      "Espaces détente ombragés et paysagement",
      "Salle de sport moderne",
      "Centre wellness avec parcours thermique",
    ],
  },
  "/proyectos/viceroy-brickell-residences": {
    rentalPolicyFr: "Durée minimale du bail : 30 jours.",
    deliveryFr: "T1 2026",
    highlightsFr: [
      "Lobby vitré avec personnel 24 h/24",
      "Fitness + wellness : saunas et salles de soins",
      "Simulateur multi-sports (golf, foot, basket, F1)",
      "Terrasse style resort : piscine chauffée, spa extérieur et cabanes",
    ],
  },
  "/proyectos/the-standard-brickell": {
    rentalPolicyFr: "Minimum 30 jours.",
    deliveryFr: "2027",
    highlightsFr: [
      "Piscine sur le toit",
      "Espace coworking",
      "Bowling privé + lounge",
      "Spa (hammam, sauna, steam, bassin froid, sel)",
    ],
  },
};

export function getProjectFrOverlay(slug: string): ProjectFrOverlay | undefined {
  const raw = PROJECTS_FR_OVERLAY[slug];
  if (!raw) return undefined;
  const microClaimsFr =
    raw.microClaimsFr && raw.microClaimsFr.length > 0
      ? raw.microClaimsFr
      : raw.highlightsFr.slice(0, 3);
  return { ...raw, microClaimsFr };
}
