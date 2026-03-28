// src/app/layout.tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jacquiezaraterealtor.com"),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const lang = h.get("x-locale") ?? "es";

  return (
    <html lang={lang} suppressHydrationWarning>
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
