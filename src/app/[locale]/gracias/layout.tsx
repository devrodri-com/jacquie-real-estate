import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const THANK_YOU_META = {
  es: {
    title: "Gracias | Jacquie Zárate",
    description:
      "Continúa una conversación inmobiliaria con Jacquie Zárate por WhatsApp o desde la página de Contacto.",
  },
  en: {
    title: "Thank you | Jacquie Zárate",
    description:
      "Continue a real estate conversation with Jacquie Zárate on WhatsApp or from the Contact page.",
  },
  fr: {
    title: "Merci | Jacquie Zárate",
    description:
      "Poursuivez une conversation immobilière avec Jacquie Zárate sur WhatsApp ou depuis la page Contact.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const meta = THANK_YOU_META[locale];
  return createPageMetadata({
    locale,
    path: "gracias",
    ...meta,
    robots: { index: false, follow: false },
  });
}

export default function ThankYouLayout({ children }: { children: ReactNode }) {
  return children;
}
