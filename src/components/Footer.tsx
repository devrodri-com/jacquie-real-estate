"use client";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  // Brand palette (estándar del proyecto)
  const NAVY = "#0B1F3A";
  const GOLD = "#D4AF37";
  const SAND = "#F6F5F0";

  const pathname = usePathname();
  const locale = (pathname?.split("/")[1] || "es") as "es" | "en";
  const isEN = locale === "en";

  return (
    <footer className="mt-16" style={{ backgroundColor: NAVY, color: SAND }}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + tagline */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Esteban Firpo · <span className="font-normal">Miami Real Estate</span>
            </h3>
            <p className="text-sm opacity-90">
              {isEN
                ? "Professional advisory in pre‑construction and select projects in Miami."
                : "Asesoría profesional en preventa y proyectos selectos en Miami."}
            </p>
          </div>

          {/* Contacto */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2" style={{ borderColor: GOLD }}>
                {/* Coloca tu foto en public/images/esteban.jpg (300×300 aprox). Si no existe, mostramos un fallback. */}
                <Image
                  src="/images/Esteban.jpg"
                  alt="Foto de Esteban Firpo"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Esteban Firpo</p>
                <p className="text-xs opacity-90">REALTOR® Associate</p>
              </div>
            </div>

            <div className="mt-2 ml-[60px] flex items-center gap-2">
              <a
                href="mailto:esteban@miamiliferealty.com"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition hover:bg-white/10 focus-visible:bg-white/10"
                style={{ color: SAND }}
                aria-label={isEN ? "Email" : "Email"}
              >
                <Mail className="h-4.5 w-4.5" aria-hidden />
              </a>

              <a
                href="tel:+17542673931"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition hover:bg-white/10 focus-visible:bg-white/10"
                style={{ color: SAND }}
                aria-label={isEN ? "Call" : "Llamar"}
              >
                <Phone className="h-4.5 w-4.5" aria-hidden />
              </a>

              <a
                href="https://wa.me/17542673931"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition hover:bg-white/10 focus-visible:bg-white/10"
                style={{ color: SAND }}
                aria-label="WhatsApp"
              >
                <Image
                  src="/icons/whatsapp.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="brightness-0 invert opacity-90"
                  aria-hidden
                />
              </a>
            </div>
            <p className="mt-2 text-sm opacity-90">
              Miami Life Realty · 2320 Hollywood Blvd, Hollywood, FL 33020
            </p>

            {/* Logo broker */}
            <div className="pt-3">
              <Image
                src="/images/miamiliferealty_logo.png"
                alt="Miami Life Realty"
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
                sizes="160px"
              />
            </div>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {isEN ? "Links" : "Enlaces"}
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link href={`/${locale}/proyectos`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "Projects" : "Proyectos"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/miami`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "Why Miami" : "Por qué Miami"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/precon`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "Why Pre‑construction" : "Por qué Preconstrucción"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/storages`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "Storages" : "Storages"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/financiacion`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "Financing" : "Financiación"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sobre-mi`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "About" : "Sobre mí"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacto`} className="hover:opacity-90" style={{ color: SAND }}>
                  {isEN ? "Contact" : "Contacto"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="w-full flex justify-center">
            {/* Desktop: una sola línea */}
            <p className="opacity-90 hidden sm:block text-center">
              {isEN
                ? <>© {year} Esteban Firpo. All rights reserved. · Made with <span aria-hidden>Next.js</span> by{" "}</>
                : <>© {year} Esteban Firpo. Todos los derechos reservados. · Hecho con <span aria-hidden>Next.js</span> por{" "}</>
              }
              <a
                href="https://www.devrodri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90"
                style={{ color: SAND }}
              >
                Rodrigo Opalo
              </a>
            </p>
            {/* Mobile: dos líneas centradas */}
            <div className="sm:hidden text-center leading-relaxed">
              <p className="opacity-90">
                {isEN
                  ? `© ${year} Esteban Firpo. All rights reserved.`
                  : `© ${year} Esteban Firpo. Todos los derechos reservados.`}
              </p>
              <p className="opacity-90">
                {isEN ? "Made with Next.js by " : "Hecho con Next.js por "}
                <a
                  href="https://www.devrodri.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90"
                  style={{ color: SAND }}
                >
                  Rodrigo Opalo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sutil acento dorado inferior */}
      <div style={{ height: 3, backgroundColor: GOLD }} />
    </footer>
  );
}