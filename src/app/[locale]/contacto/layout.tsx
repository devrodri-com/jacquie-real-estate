import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const CONTACT_META = {
  es: {
    title: "Contacto | Jacquie Zárate",
    description:
      "Conversa con Jacquie Zárate sobre comprar, invertir, financiar una compra o consultar por una propiedad en Miami, por WhatsApp o email.",
  },
  en: {
    title: "Contact | Jacquie Zárate",
    description:
      "Talk with Jacquie Zárate about buying, investing, financing a purchase, or a specific Miami property on WhatsApp or by email.",
  },
  fr: {
    title: "Contact | Jacquie Zárate",
    description:
      "Discutez avec Jacquie Zárate d’un achat, d’un investissement, du financement d’un achat ou d’une propriété à Miami, par WhatsApp ou par courriel.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);
  const meta = CONTACT_META[locale];
  return createPageMetadata({ locale, path: "contacto", ...meta });
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
