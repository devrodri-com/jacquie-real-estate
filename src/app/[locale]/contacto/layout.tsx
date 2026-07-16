import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const CONTACT_META = {
  es: {
    title: "Contacto | Jacquie Zarate Realtor",
    description:
      "Contame qué estás buscando en Miami y recibí una orientación clara para avanzar con tu inversión, compra o estadía.",
  },
  en: {
    title: "Contact | Jacquie Zarate Realtor",
    description:
      "Tell me what you are looking for in Miami and receive clear guidance for your investment, purchase, or stay.",
  },
  fr: {
    title: "Contact | Jacquie Zarate Realtor",
    description:
      "Dites-moi ce que vous recherchez à Miami et recevez un accompagnement clair pour votre investissement, votre achat ou votre séjour.",
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
