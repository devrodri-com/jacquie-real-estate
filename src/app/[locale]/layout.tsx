// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Inter, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getGaMeasurementId, SITE_URL } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
});

const LOCALES = ["es", "en", "fr"] as const;
type Locale = typeof LOCALES[number];
function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

export const dynamic = "force-static";
export function generateStaticParams() {
  return (LOCALES as readonly string[]).map((l) => ({ locale: l }));
}

export const metadata: Metadata = {
  title: "Jacquie Zárate | Miami Real Estate",
  description:
    "Personalized guidance for buying and investing in Miami real estate with Jacquie Zárate.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(SITE_URL),
};

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
  const gaMeasurementId = getGaMeasurementId();
  const htmlLang = locale === "fr" ? "fr-CA" : locale;

  return (
    <html lang={htmlLang} className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh bg-paper text-ink font-sans antialiased">
        {gaMeasurementId ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NavBar />
          <main className="mx-auto max-w-6xl px-4 pt-0 pb-8">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
