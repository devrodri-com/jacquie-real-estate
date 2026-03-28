"use client";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  const pathname = usePathname();
  const locale = (pathname?.split("/")[1] || "es") as "es" | "en" | "fr";
  const isEN = locale === "en";
  const isFR = locale === "fr";

  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + tagline */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Jacquie Zarate Realtor
            </h3>
            <p className="mt-2 text-[16px] font-medium text-primary-foreground/95">
              {isEN
                ? "Your trusted contact in Miami."
                : isFR
                  ? "Votre personne de confiance à Miami."
                  : "Tu persona de confianza en Miami."}
            </p>

            <p className="mt-2 text-sm opacity-90 max-w-[38ch]">
              {isEN
                ? "I guide you through the entire process so investing in Miami is clear, simple, and well managed — even if you're not here."
                : isFR
                  ? "Je vous accompagne tout au long du processus pour que votre investissement à Miami soit clair, simple et bien géré, même à distance."
                  : "Te acompaño en todo el proceso para que invertir en Miami sea claro, simple y bien gestionado, incluso si no estás acá."}
            </p>
          </div>

          {/* Contacto */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-accent">
                {/* Foto realtor: public/images/jacquie-zarate.jpg */}
                <Image
                  src="/images/jacquie-zarate.jpg"
                  alt={
                    isEN
                      ? "Photo of Jacquie Zarate Realtor"
                      : isFR
                        ? "Photo de Jacquie Zarate Realtor"
                        : "Foto de Jacquie Zarate Realtor"
                  }
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Jacquie Zarate Realtor</p>
                <p className="text-xs opacity-90">REALTOR® Associate</p>
              </div>
            </div>

            <div className="mt-2 ml-[60px] flex items-center gap-2">
              <a
                href="mailto:jacqueline@miamiliferealty.com"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-primary-foreground transition hover:bg-paper/10 focus-visible:bg-paper/10"
                aria-label={isEN ? "Email" : isFR ? "Courriel" : "Email"}
              >
                <Mail className="h-4.5 w-4.5" aria-hidden />
              </a>

              <a
                href="tel:+17864072591"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-primary-foreground transition hover:bg-paper/10 focus-visible:bg-paper/10"
                aria-label={isEN ? "Call" : isFR ? "Appeler" : "Llamar"}
              >
                <Phone className="h-4.5 w-4.5" aria-hidden />
              </a>

              <a
                href="https://wa.me/17864072591"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-primary-foreground transition hover:bg-paper/10 focus-visible:bg-paper/10"
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
            <p className="mt-2 text-sm">
              <a
                href="https://www.instagram.com/jacquiezarate_realtor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/90 underline-offset-2 hover:underline hover:opacity-95"
              >
                Instagram
              </a>
            </p>
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
              {isEN ? "Links" : isFR ? "Liens" : "Enlaces"}
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link href={`/${locale}/proyectos`} className="text-primary-foreground hover:opacity-90">
                  {isEN ? "Projects" : isFR ? "Projets" : "Proyectos"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/listings`} className="text-primary-foreground hover:opacity-90">
                  {isEN ? "Listings" : isFR ? "Annonces" : "Listings"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/property-management`} className="text-primary-foreground hover:opacity-90">
                  {isEN ? "Property Management" : isFR ? "Gestion de propriétés" : "Gestión de propiedades"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sobre-mi`} className="text-primary-foreground hover:opacity-90">
                  {isEN ? "About" : isFR ? "À propos" : "Sobre mí"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacto`} className="text-primary-foreground hover:opacity-90">
                  {isEN ? "Contact" : isFR ? "Contact" : "Contacto"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="w-full flex justify-center">
            {/* Desktop: una sola línea */}
            <p className="opacity-90 hidden sm:block text-center">
              {isEN
                ? <>© {year} Jacquie Zarate Realtor. All rights reserved. · Made with <span aria-hidden>Next.js</span> by{" "}</>
                : isFR
                  ? <>© {year} Jacquie Zarate Realtor. Tous droits réservés. · Fait avec <span aria-hidden>Next.js</span> par{" "}</>
                  : <>© {year} Jacquie Zarate Realtor. Todos los derechos reservados. · Hecho con <span aria-hidden>Next.js</span> por{" "}</>
              }
              <a
                href="https://www.devrodri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:opacity-90"
              >
                Rodrigo Opalo
              </a>
            </p>
            {/* Mobile: dos líneas centradas */}
            <div className="sm:hidden text-center leading-relaxed">
              <p className="opacity-90">
                {isEN
                  ? `© ${year} Jacquie Zarate Realtor. All rights reserved.`
                  : isFR
                    ? `© ${year} Jacquie Zarate Realtor. Tous droits réservés.`
                    : `© ${year} Jacquie Zarate Realtor. Todos los derechos reservados.`}
              </p>
              <p className="opacity-90">
                {isEN ? "Made with Next.js by " : isFR ? "Fait avec Next.js par " : "Hecho con Next.js por "}
                <a
                  href="https://www.devrodri.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:opacity-90"
                >
                  Rodrigo Opalo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sutil acento inferior */}
      <div className="h-[3px] bg-accent" />
    </footer>
  );
}