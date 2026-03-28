// src/app/[locale]/proyectos/page.tsx
import type { Metadata } from "next";
import ProyectosPageClient from "./ProyectosPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jacquiezaraterealtor.com";

const proyectosMeta: Record<
  "es" | "en" | "fr",
  { title: string; description: string }
> = {
  es: {
    title: "Proyectos en Miami | Jacquie Zarate Realtor",
    description:
      "Explorá proyectos de preconstrucción y oportunidades inmobiliarias en Miami con acompañamiento personalizado.",
  },
  en: {
    title: "Miami Projects | Jacquie Zarate Realtor",
    description:
      "Explore pre-construction projects and real estate opportunities in Miami with personalized guidance.",
  },
  fr: {
    title: "Projets à Miami | Jacquie Zarate Realtor",
    description:
      "Découvrez des projets de préconstruction et des opportunités immobilières à Miami avec un accompagnement personnalisé.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw === "en" ? "en" : raw === "fr" ? "fr" : "es";
  const m = proyectosMeta[locale];
  const url = `${SITE_URL}/${locale}/proyectos`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/proyectos`,
        en: `${SITE_URL}/en/proyectos`,
        fr: `${SITE_URL}/fr/proyectos`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

export default function ProyectosPage() {
  return <ProyectosPageClient />;
}
