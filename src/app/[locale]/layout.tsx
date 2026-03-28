// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "../globals.css";

const LOCALES = ["es", "en", "fr"] as const;
type Locale = typeof LOCALES[number];
function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jacquiezaraterealtor.com";

const defaultLocaleMeta: Record<
  Locale,
  { title: string; description: string; openGraphTitle: string }
> = {
  es: {
    title: "Jacquie Zarate Realtor | Inversión inmobiliaria en Miami",
    description:
      "Asesoría personalizada para comprar, invertir y gestionar propiedades en Miami. Acompañamiento completo, incluso si no estás en Estados Unidos.",
    openGraphTitle: "Jacquie Zarate Realtor | Inversión inmobiliaria en Miami",
  },
  en: {
    title: "Jacquie Zarate Realtor | Miami Real Estate & Investment",
    description:
      "Personalized guidance to buy, invest, and manage properties in Miami. Full support, even if you're not based in the U.S.",
    openGraphTitle: "Jacquie Zarate Realtor | Miami Real Estate & Investment",
  },
  fr: {
    title: "Jacquie Zarate Realtor | Immobilier et investissement à Miami",
    description:
      "Accompagnement personnalisé pour acheter, investir et gérer des propriétés à Miami, même à distance.",
    openGraphTitle: "Jacquie Zarate Realtor | Immobilier et investissement à Miami",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const m = defaultLocaleMeta[locale];
  const ogLocale = locale === "es" ? "es_ES" : locale === "fr" ? "fr_CA" : "en_US";

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Jacquie Zarate Realtor · Miami",
      title: m.openGraphTitle,
      description: m.description,
      url: `${SITE_URL}/${locale}`,
      locale: ogLocale,
      images: [{ url: "/og-image.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.openGraphTitle,
      description: m.description,
      images: ["/og-image.jpg"],
    },
  };
}

export const dynamic = "force-static";
export function generateStaticParams() {
  return (LOCALES as readonly string[]).map((l) => ({ locale: l }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : null;
  if (!locale) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pt-0 pb-8">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}