"use client";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
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

            <div className="mt-4 flex items-center gap-3">
              <a
                href="mailto:jacqueline@miamiliferealty.com"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label={isEN ? "Email Jacquie" : isFR ? "Courriel Jacquie" : "Email Jacquie"}
              >
                <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href="tel:+17864072591"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label={isEN ? "Call Jacquie" : isFR ? "Appeler Jacquie" : "Llamar a Jacquie"}
              >
                <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href="https://wa.me/17864072591"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="WhatsApp Jacquie"
              >
                <IconWhatsApp className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/jacquiezarate_realtor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="Instagram Jacquie"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.75} aria-hidden />
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