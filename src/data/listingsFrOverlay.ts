/**
 * Textos FR temporales para listings sin description_fr / amenities_fr en datos.
 * Clave = slug del listing en LISTINGS.
 */
export const LISTINGS_FR_OVERLAY: Record<
  string,
  { descriptionShort: string; descriptionLong: string; amenities: string[] }
> = {
  "tides-hollywood-2c": {
    descriptionShort:
      "Unité en bord d'océan partielle à The Tides, Hollywood Beach. L'immeuble autorise les locations à la journée, idéal pour un revenu de location courte durée.",
    descriptionLong:
      "Unité en bord d'océan partielle à The Tides sur Hollywood Beach. L'immeuble autorise les locations à la journée et convient parfaitement à la location de courte durée, avec un excellent potentiel de revenus locatifs d'année en année. Les équipements de type resort comprennent un gym entièrement équipé, une piscine chauffante, un centre d'affaires et une sécurité 24 h/24.",
    amenities: [
      "Piscine chauffante",
      "Gym entièrement équipé",
      "Centre d'affaires",
      "Sécurité 24 h/24",
      "Câble, Internet et eau chaude inclus",
    ],
  },
  "le-frontenac-505": {
    descriptionShort:
      "Condo 2 chambres entièrement rénové à Sunny Isles Beach, avec vue sur la baie et finitions modernes. Proposé meublé.",
    descriptionLong:
      "Condo entièrement rénové de 2 chambres et 2 salles de bain au Frontenac, Sunny Isles Beach. Plan split lumineux, finitions modernes, balcon privé avec vue partielle sur la baie, offert entièrement meublé. Une option solide pour usage personnel ou stratégie locative dans un emplacement privilégié.",
    amenities: [
      "Entrée sécurisée",
      "Piscine",
      "Spa / bain tourbillon",
      "Ascenseur",
      "Entièrement meublé",
    ],
  },
};

export function getListingFrOverlay(slug: string) {
  return LISTINGS_FR_OVERLAY[slug] ?? null;
}
