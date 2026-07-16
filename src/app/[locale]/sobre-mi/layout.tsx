import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const ABOUT_META = {
  es: {
    title: "Sobre Jacquie Zárate | Realtor en Miami",
    description:
      "Conoce a Jacquie Zárate, Realtor en Miami con más de 15 años de experiencia en Finanzas y una mirada aplicada a decisiones inmobiliarias.",
  },
  en: {
    title: "About Jacquie Zárate | Miami Realtor",
    description:
      "Meet Jacquie Zárate, a Miami Realtor. She has more than 15 years of experience in Finance and now works in real estate in Miami.",
  },
  fr: {
    title: "À propos de Jacquie Zárate | Courtière immobilière à Miami",
    description:
      "Découvrez Jacquie Zárate, courtière immobilière à Miami. Elle compte plus de 15 ans d’expérience en finances et travaille aujourd’hui en immobilier à Miami.",
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
