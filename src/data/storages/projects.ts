// src/data/storages/projects.ts
import type { StorageProject } from "./types";
import { callaway } from "./callaway";

// Agregá acá los que quieras mostrar en la grilla
export const storages: (StorageProject & { status: string })[] = [
  { ...callaway, status: "available" },
];