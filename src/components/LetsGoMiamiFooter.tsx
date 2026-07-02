import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type Locale = "es" | "en" | "fr";

type LetsGoMiamiFooterProps = {
  locale: Locale;
  logoSrc?: string;
};

const COPY: Record<
  Locale,
  {
    tagline: string;
    areas: string;
    inquiries: string;
    whatsapp: string;
    mainSite: string;
    mainSiteLabel: string;
    links: string;
    emailLabel: string;
    phoneLabel: string;
    rights: string;
    logoAlt: string;
  }
> = {
  es: {
    tagline: "Estadías y renta corta en Miami.",
    areas: "Sunny Isles y zonas seleccionadas.",
    inquiries: "Consultas",
    whatsapp: "WhatsApp",
    mainSite: "Sitio de Jacquie Zarate Realtor",
    mainSiteLabel: "Jacquie Zarate Realtor",
    links: "Enlaces",
    emailLabel: "Email Let’s Go Miami",
    phoneLabel: "Llamar a Let’s Go Miami",
    rights: "Todos los derechos reservados.",
    logoAlt: "Logo de Let’s Go Miami",
  },
  en: {
    tagline: "Short-term stays in Miami.",
    areas: "Sunny Isles and selected areas.",
    inquiries: "Inquiries",
    whatsapp: "WhatsApp",
    mainSite: "Jacquie Zarate Realtor site",
    mainSiteLabel: "Jacquie Zarate Realtor",
    links: "Links",
    emailLabel: "Email Let’s Go Miami",
    phoneLabel: "Call Let’s Go Miami",
    rights: "All rights reserved.",
    logoAlt: "Let’s Go Miami logo",
  },
  fr: {
    tagline: "Séjours et location de courte durée à Miami.",
    areas: "Sunny Isles et secteurs sélectionnés.",
    inquiries: "Demandes",
    whatsapp: "WhatsApp",
    mainSite: "Site de Jacquie Zarate Realtor",
    mainSiteLabel: "Jacquie Zarate Realtor",
    links: "Liens",
    emailLabel: "Courriel Let’s Go Miami",
    phoneLabel: "Appeler Let’s Go Miami",
    rights: "Tous droits réservés.",
    logoAlt: "Logo de Let’s Go Miami",
  },
};

export default function LetsGoMiamiFooter({ locale, logoSrc }: LetsGoMiamiFooterProps) {
  const copy = COPY[locale];

  return (
    <footer className="relative left-1/2 mt-16 mb-[-2rem] w-screen -translate-x-1/2 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            {logoSrc ? (
              <div className="relative h-24 w-40 overflow-hidden rounded-md bg-paper p-2">
                <Image
                  src={logoSrc}
                  alt={copy.logoAlt}
                  fill
                  sizes="192px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div>
                <p className="font-display text-3xl font-medium leading-none tracking-normal">
                  Let’s Go Miami
                </p>
                <p className="mt-2 text-sm font-medium text-white/78">
                  by Jacna Services LLC
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
                  Vacation Condo Management
                </p>
              </div>
            )}

            {logoSrc ? (
              <div className="mt-4">
                <p className="text-sm font-medium text-primary-foreground/90">by Jacna Services LLC</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
                  Vacation Condo Management
                </p>
              </div>
            ) : null}

            <p className="mt-2 max-w-[38ch] text-sm leading-[1.7] text-primary-foreground/90">
              {copy.tagline}
              <br />
              {copy.areas}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">Let’s Go Miami</p>
              <p className="text-xs opacity-90">by Jacna Services LLC</p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="mailto:jacnaservices@gmail.com"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label={copy.emailLabel}
              >
                <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href="tel:+17864072591"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label={copy.phoneLabel}
              >
                <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href="https://wa.me/17864072591"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-paper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="WhatsApp Let’s Go Miami"
              >
                <IconWhatsApp className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-2 text-sm opacity-90">jacnaservices@gmail.com</p>
            <p className="text-sm opacity-90">Vacation Condo Management</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {copy.links}
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="mailto:jacnaservices@gmail.com" className="text-primary-foreground hover:opacity-90">
                  {copy.inquiries}
                </a>
              </li>
              <li>
                <a href="https://wa.me/17864072591" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:opacity-90">
                  {copy.whatsapp}
                </a>
              </li>
              <li>
                <Link href={`/${locale}`} className="text-primary-foreground hover:opacity-90">
                  {copy.mainSiteLabel}
                </Link>
              </li>
            </ul>
            <p className="max-w-[28ch] text-xs leading-[1.6] opacity-70">
              {copy.mainSite}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="w-full flex justify-center">
            <p className="opacity-90 text-center">
              © 2026 Let’s Go Miami by Jacna Services LLC. {copy.rights}
            </p>
          </div>
        </div>
      </div>

      <div className="h-[3px] bg-accent" />
    </footer>
  );
}
