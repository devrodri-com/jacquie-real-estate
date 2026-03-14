// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "../globals.css";

const LOCALES = ["es", "en"] as const;
type Locale = typeof LOCALES[number];
function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
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