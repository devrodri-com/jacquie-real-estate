import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const ABOUT_META = {
  es: {
    title: "Sobre Jacquie Zarate | Realtor en Miami",
    description:
      "Conocé a Jacquie Zarate, realtor en Miami con más de 15 años de experiencia en Finanzas y acompañamiento personalizado para compradores e inversores.",
  },
  en: {
    title: "About Jacquie Zarate | Miami Realtor",
    description:
      "Meet Jacquie Zarate, a Miami Realtor with more than 15 years of Finance experience and personalized guidance for buyers and investors.",
  },
  fr: {
    title: "À propos de Jacquie Zarate | Realtor à Miami",
    description:
      "Découvrez Jacquie Zarate, realtor à Miami avec plus de 15 ans d’expérience en finances et un accompagnement personnalisé pour les acheteurs et investisseurs.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const meta = ABOUT_META[locale];
  return createPageMetadata({ locale, path: "sobre-mi", ...meta });
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
