import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata, normalizeLocale } from "@/lib/seo";

const THANK_YOU_META = {
  es: {
    title: "Gracias por tu mensaje | Jacquie Zarate Realtor",
    description: "Recibimos tu consulta y te contactaremos a la brevedad.",
  },
  en: {
    title: "Thanks for your message | Jacquie Zarate Realtor",
    description: "We received your request and will get back to you shortly.",
  },
  fr: {
    title: "Merci pour votre message | Jacquie Zarate Realtor",
    description: "Nous avons bien reçu votre demande et nous vous recontacterons sous peu.",
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
