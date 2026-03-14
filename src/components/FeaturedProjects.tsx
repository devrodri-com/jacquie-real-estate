// src/components/FeaturedProjects.tsx
"use client";
import { FEATURED_PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useRef } from "react";
import { useParams } from "next/navigation";

export default function FeaturedProjects() {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const isEN = locale === "en";

  return (
    <section aria-labelledby="featured-projects">
      <div className="mb-6">
        <h2 id="featured-projects" className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-[#0A2540]">
          {isEN ? "Featured projects" : "Proyectos destacados"}
        </h2>
        <p className="mt-1 text-[14px] text-neutral-600">
          {isEN
            ? "Explore the full catalog and filter by delivery, rental policy or price."
            : "Explorá el catálogo completo y filtrá por entrega, política de renta o precio."}
        </p>
      </div>

      {/* Premium CTA band instead of old cards */}
      <div className="rounded-[10px] bg-[#0A2540] p-6 sm:p-7 ring-1 ring-white/10 text-white relative overflow-hidden max-w-[1100px] mx-auto">
        <div
          className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full"
          style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))' }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[15px] text-white/90">
            {isEN
              ? "Hand‑picked inventory, updated weekly."
              : "Inventario seleccionado, actualizado semanalmente."}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={`/${locale}/proyectos`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-white/10 px-4 text-sm font-medium text-white no-underline hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            >
              {isEN ? "See all projects" : "Ver todos los proyectos"}
            </a>
            {/* Quick filters (desktop) */}
            <div className="hidden sm:flex flex-wrap gap-2">
              <a
                href={`/${locale}/proyectos?entrega=2025`}
                className="inline-flex items-center rounded-md border border-white/25 bg-transparent px-4 py-2 text-[14px] font-medium text-white/90 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
              >
                {isEN ? "Completion 2025" : "Entrega 2025"}
              </a>
              <a
                href={`/${locale}/proyectos?renta=sin-restricciones`}
                className="inline-flex items-center rounded-md border border-white/25 bg-transparent px-4 py-2 text-[14px] font-medium text-white/90 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
              >
                {isEN ? "No restrictions" : "Sin restricciones"}
              </a>
              <a
                href={`/${locale}/proyectos?minStay=30`}
                className="inline-flex items-center rounded-md border border-white/25 bg-transparent px-4 py-2 text-[14px] font-medium text-white/90 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
              >
                {isEN ? "30‑day minimum" : "Mínimo 30 días"}
              </a>
            </div>
            {/* Compact quick filter (mobile) */}
            <a
              href={`/${locale}/proyectos`}
              className="sm:hidden inline-flex h-10 w-full items-center justify-center rounded-md border border-white/25 bg-transparent px-4 text-[14px] font-medium text-white/90 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            >
              {isEN
                ? "Delivery · Restrictions · Minimum stay"
                : "Entrega · Restricciones · Estancia mínima"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}