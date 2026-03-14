// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Esteban Firpo | Real Estate Miami",
  description: "Real estate en Miami: preconstrucción, renta corta y compra para vivir o invertir. Asesoría y análisis de proyectos, con financiación para compradores internacionales.",
  icons: {
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.estebanfirpo.com"),
  openGraph: {
    type: "website",
    siteName: "Esteban Firpo | Real Estate Miami",
    title: "Esteban Firpo | Inversiones en Miami",
    description: "Real estate en Miami: preconstrucción, renta corta y compra para vivir o invertir. Asesoría y análisis de proyectos, con financiación para compradores internacionales.",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.jpg"],
    title: "Esteban Firpo | Inversiones en Miami",
    description: "Real estate en Miami: preconstrucción, renta corta y compra para vivir o invertir. Asesoría y análisis de proyectos, con financiación para compradores internacionales.",
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `}
        </Script>
      </head>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}