import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { connection } from "next/server";
import BrandNotFound from "@/components/BrandNotFound";
import "./globals.css";

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
  title: "404 | Jacquie Zárate",
  robots: { index: false, follow: false },
};

export default async function RootNotFound() {
  await connection();

  return (
    <BrandNotFound
      documentClassName={`${inter.variable} ${newsreader.variable}`}
    />
  );
}
