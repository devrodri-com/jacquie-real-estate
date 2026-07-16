import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const CONTACT_META = {
  es: {
    title: "Contacto | Jacquie Zárate",
    description:
      "Cuéntame qué estás buscando en Miami y recibe una orientación clara para avanzar con tu inversión, compra o propiedad.",
  },
  en: {
    title: "Contact | Jacquie Zárate",
    description:
      "Tell me what you are looking for in Miami and receive clear guidance for your investment, purchase, or property.",
  },
  fr: {
    title: "Contact | Jacquie Zárate",
    description:
      "Parlez-moi de votre projet à Miami et recevez des conseils clairs pour votre investissement, votre achat ou votre propriété.",
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
