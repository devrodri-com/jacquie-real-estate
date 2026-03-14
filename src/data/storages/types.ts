// src/data/storages/types.ts
export type StorageProject = {
    id: string;
    name: string;
    city: string;
    rentableSqft: number; // ft² rentables
    occupancy: number;    // 0-1
    units: number;
    lotAcres: number;
    yearBuilt: number;
    images: string[];
  };