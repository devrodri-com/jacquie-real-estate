// src/data/projects/index.ts
import { p72Park } from "./72-park";
import { pEllaMiami } from "./ella-miami";
import { pElleResidences } from "./elle-residences-edgewater";
import { p7200Collins } from "./7200-collins";
import { pDomusBrickellPark } from "./domus-brickell-park";
import { pBaccarat } from "./baccarat";
import { ALL_PROJECTS as BASE_ALL, FEATURED_PROJECTS as BASE_FEAT } from "../projects";
import { pCipriani } from "./cipriani";
import { pTwentySixAndSecond } from "./twenty-six-and-2nd";
import { pFlowHouse } from "./flow-house";
import { pNexo } from "./nexo";
import { pOneParkTower } from "./one-park-tower";
import { p2200Brickell } from "./2200-brickell";
import { pEdgeHouse } from "./edge-house";
import { pDomusBrickellCenter } from "./domus-brickell-center";
import { pMercedesBenzPlaces } from "./mercedes-benz-places";
import { pOkanTower } from "./okan-tower";
import { pAveMaria } from "./ave-maria";
import { pFaena } from "./faena";
import pOasis from "./oasis";
import { pRider } from "./rider";
import { pParkside } from "./parkside";
import { pPalma } from "./palma";
import { pMilleniaPark } from "./millenia-park";
import { pMillux } from "./millux";
import { pJeanGeorges } from "./jean-georges";
import { pCassia } from "./cassia";
import { pNomad } from "./nomad";
import { pSevenPark } from "./seven-park";
import type { Project } from "../types";
import { pTheWilliam } from "./the-william";
import { pTheLauderdale } from "./thelauderdale";
import { pGaiaResidences } from "./gaia";

import { pMidtownPark } from "./midtown-park";
import { pNickelodeon } from "./nickelodeon";
import { pAmbarOrlando } from "./ambar-orlando";
import { pFridaKahlo } from "./frida-kahlo";
import { pViceroyBrickellResidences } from "./viceroy-brickell-residences";
import { pTheStandardBrickell } from "./the-standard-brickell";

// helper: upsert por id (o alias) preservando el orden base
function upsertMany(base: Project[], items: Project[]): Project[] {
  const map = new Map(base.map((p) => [p.id, p]));
  for (const it of items) {
    // soporta alias históricos
    const key = it.id;
    map.set(key, { ...(map.get(key) ?? {}), ...it });
  }
  // Reconstruimos en el mismo orden del base, anteponiendo los nuevos si no existían
  const known = base.map((p) => map.get(p.id)!);
  const extras = items.filter((it) => !base.find((p) => p.id === it.id));
  return [...extras, ...known];
}

const INCOMING: Project[] = [p72Park, pEllaMiami, pElleResidences, p7200Collins, pDomusBrickellPark, pBaccarat, pCipriani, pTwentySixAndSecond, pFlowHouse, pNexo, pOneParkTower, p2200Brickell, pEdgeHouse, pDomusBrickellCenter, pMercedesBenzPlaces, pOkanTower, pAveMaria, pOasis, pFaena, pRider, pParkside, pPalma, pMilleniaPark, pMillux, pJeanGeorges, pCassia, pNomad, pSevenPark, pTheWilliam, pTheLauderdale, pGaiaResidences, pMidtownPark, pNickelodeon, pAmbarOrlando, pFridaKahlo, pViceroyBrickellResidences, pTheStandardBrickell];
export const FEATURED_PROJECTS: Project[] = upsertMany(BASE_FEAT, INCOMING);
export const ALL_PROJECTS: Project[] = upsertMany(BASE_ALL, INCOMING);