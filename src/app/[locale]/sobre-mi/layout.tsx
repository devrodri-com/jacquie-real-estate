import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const ABOUT_META = {
  es: {
    title: "Sobre Jacquie Zárate | Realtor en Miami",
    description:
      "Conoce a Jacquie Zárate, realtor en Miami con más de 15 años de experiencia en Finanzas y una mirada aplicada a decisiones inmobiliarias.",
  },
  en: {
    title: "About Jacquie Zárate | Miami Realtor",
    description:
      "Meet Jacquie Zárate, a Miami Realtor with more than 15 years of Finance experience applied to real estate decisions.",
  },
  fr: {
    title: "À propos de Jacquie Zárate | Realtor à Miami",
    description:
      "Découvrez Jacquie Zárate, realtor à Miami avec plus de 15 ans d’expérience en finances appliquée aux décisions immobilières.",
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
