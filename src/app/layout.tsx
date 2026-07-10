// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { getGaMeasurementId, SITE_URL } from "@/lib/seo";

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

export const metadata: Metadata = {
  title: "Jacquie Zarate Realtor | Miami Real Estate",
  description:
    "Personalized guidance for buying and investing in Miami real estate with Jacquie Zarate Realtor.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId = getGaMeasurementId();

  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var l=location.pathname.split("/")[1];document.documentElement.lang=l==="fr"?"fr-CA":l==="en"?"en":"es"}();`,
          }}
        />
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
      </head>
      <body className="min-h-dvh bg-paper text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
