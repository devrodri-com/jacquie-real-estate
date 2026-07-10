// src/app/[locale]/proyectos/page.tsx
import type { Metadata } from "next";
import ProyectosPageClient from "./ProyectosPageClient";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const proyectosMeta: Record<
  "es" | "en" | "fr",
  { title: string; description: string }
> = {
  es: {
    title: "Proyectos de preconstrucción | Jacquie Zarate Realtor",
    description:
      "Explorá proyectos de preconstrucción en Miami, Orlando y distintas zonas de Florida con foco en ubicación, entrega, renta permitida y criterio de inversión.",
  },
  en: {
    title: "Preconstruction projects | Jacquie Zarate Realtor",
    description:
      "Explore selected preconstruction projects in Miami, Orlando, and other Florida markets with guidance on location, delivery timing, rental flexibility, and investment criteria.",
  },
  fr: {
    title: "Projets en préconstruction | Jacquie Zarate Realtor",
    description:
      "Découvrez des projets en préconstruction à Miami, Orlando et dans d’autres secteurs de la Floride, avec un accompagnement sur l’emplacement, la livraison, la flexibilité locative et les critères d’investissement.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const m = proyectosMeta[locale];

  return createPageMetadata({
    locale,
    path: "proyectos",
    title: m.title,
    description: m.description,
  });
}

export default function ProyectosPage() {
  return <ProyectosPageClient />;
}
