"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  buildJacquieWhatsAppHref,
  normalizeSiteLocale,
  type SiteLocale,
} from "@/lib/whatsapp";

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const FOOTER_COPY: Record<
  SiteLocale,
  {
    role: string;
    contactHeading: string;
    whatsapp: string;
    email: string;
    phone: string;
    contact: string;
    links: string;
    projects: string;
    properties: string;
    financing: string;
    about: string;
    stays: string;
    staysLabel: string;
    brokerage: string;
    rights: string;
    madeBy: string;
    photoAlt: string;
    instagram: string;
  }
> = {
  es: {
    role: "Realtor en Miami para compradores e inversores que buscan claridad, criterio y seguimiento personal.",
    contactHeading: "Hablemos",
    whatsapp: "Hablar por WhatsApp",
    email: "Escribir por email",
    phone: "Llamar a Jacquie",
    contact: "Ir a Contacto",
    links: "Explorar",
    projects: "Proyectos",
    properties: "Propiedades",
    financing: "Financiación",
    about: "Sobre Jacquie",
    stays: "Conocer Let’s Go Miami",
    staysLabel: "Estadías en Miami",
    brokerage: "Brokerage y credencial inmobiliaria",
    rights: "Todos los derechos reservados.",
    madeBy: "Diseño y desarrollo por",
    photoAlt: "Retrato de Jacquie Zárate",
    instagram: "Instagram de Jacquie",
  },
  en: {
    role: "Miami Realtor for buyers and investors seeking clarity, sound criteria, and personal follow-through.",
    contactHeading: "Let’s talk",
    whatsapp: "Chat on WhatsApp",
    email: "Email Jacquie",
    phone: "Call Jacquie",
    contact: "Go to Contact",
    links: "Explore",
    projects: "Projects",
    properties: "Properties",
    financing: "Financing",
    about: "About Jacquie",
    stays: "Explore Let’s Go Miami",
    staysLabel: "Miami stays",
    brokerage: "Real estate brokerage and credentials",
    rights: "All rights reserved.",
    madeBy: "Designed and developed by",
    photoAlt: "Portrait of Jacquie Zárate",
    instagram: "Jacquie’s Instagram",
  },
  fr: {
    role: "Courtière immobilière à Miami auprès d’acheteurs et d’investisseurs qui recherchent clarté, rigueur et suivi personnalisé.",
    contactHeading: "Parlons de votre projet",
    whatsapp: "Écrire sur WhatsApp",
    email: "Écrire par courriel",
    phone: "Appeler Jacquie",
    contact: "Aller à la page Contact",
    links: "Explorer",
    projects: "Projets",
    properties: "Propriétés",
    financing: "Financement",
    about: "À propos de Jacquie",
    stays: "Découvrir Let’s Go Miami",
    staysLabel: "Séjours à Miami",
    brokerage: "Agence et accréditation immobilières",
    rights: "Tous droits réservés.",
    madeBy: "Conception et développement par",
    photoAlt: "Portrait de Jacquie Zárate",
    instagram: "Instagram de Jacquie",
  },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = normalizeSiteLocale(pathname?.split("/")[1] ?? "es");
  const copy = FOOTER_COPY[locale];
  const isLetsGoMiami = /^\/(es|en|fr)\/lets-go-miami(?:\/|$)/.test(pathname ?? "");

  if (isLetsGoMiami) return null;

  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="grid gap-9 md:grid-cols-[1.2fr_1fr_0.85fr] md:gap-10">
          <div>
            <Link
              href={`/${locale}`}
              className="font-display text-[28px] font-medium text-primary-foreground no-underline hover:opacity-90"
            >
              Jacquie Zárate
            </Link>
            <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.7] text-primary-foreground/82">
              {copy.role}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-accent/80">
                <Image
                  src="/images/jacquie-zarate.jpg"
                  alt={copy.photoAlt}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">Jacquie Zárate</p>
                <p className="mt-0.5 text-xs text-primary-foreground/70">REALTOR® Associate</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
              {copy.contactHeading}
            </h2>
            <a
              href={buildJacquieWhatsAppHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="footer:whatsapp"
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-paper px-4 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface"
            >
              <IconWhatsApp className="h-4 w-4" />
              {copy.whatsapp}
            </a>
            <div className="mt-4 space-y-2.5 text-sm">
              <a
                href="mailto:jacqueline@miamiliferealty.com"
                className="flex items-center gap-2 text-primary-foreground/84 no-underline hover:text-primary-foreground"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {copy.email}
              </a>
              <a
                href="tel:+17864072591"
                className="flex items-center gap-2 text-primary-foreground/84 no-underline hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {copy.phone}
              </a>
              <a
                href="https://www.instagram.com/jacquiezarate_realtor/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.instagram}
                className="flex items-center gap-2 text-primary-foreground/84 no-underline hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {copy.instagram}
              </a>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex text-primary-foreground/84 underline decoration-primary-foreground/30 underline-offset-4 hover:text-primary-foreground"
              >
                {copy.contact}
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
              {copy.links}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={`/${locale}/proyectos`} className="text-primary-foreground/84 hover:text-primary-foreground">
                  {copy.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/listings`} className="text-primary-foreground/84 hover:text-primary-foreground">
                  {copy.properties}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/financiacion`} className="text-primary-foreground/84 hover:text-primary-foreground">
                  {copy.financing}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/sobre-mi`} className="text-primary-foreground/84 hover:text-primary-foreground">
                  {copy.about}
                </Link>
              </li>
            </ul>
            <div className="mt-5 border-t border-paper/15 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
                {copy.staysLabel}
              </p>
              <Link
                href={`/${locale}/lets-go-miami`}
                className="mt-2 inline-flex text-sm text-primary-foreground/82 underline decoration-primary-foreground/25 underline-offset-4 hover:text-primary-foreground"
              >
                {copy.stays}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-paper/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/58">
              {copy.brokerage}
            </p>
            <p className="mt-1 text-xs leading-5 text-primary-foreground/68">
              Miami Life Realty · 2320 Hollywood Blvd, Hollywood, FL 33020
            </p>
          </div>
          <Image
            src="/images/miamiliferealty_logo.png"
            alt="Miami Life Realty"
            width={140}
            height={36}
            className="h-6 w-auto object-contain opacity-75"
            sizes="140px"
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-paper/10 pt-4 text-center text-xs text-primary-foreground/68 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {year} Jacquie Zárate. {copy.rights}
          </p>
          <p>
            {copy.madeBy}{" "}
            <a
              href="https://www.devrodri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/82 underline decoration-primary-foreground/45 underline-offset-2 hover:text-primary-foreground"
            >
              Rodrigo Opalo
            </a>
          </p>
        </div>
      </div>
      <div className="h-[3px] bg-accent" />
    </footer>
  );
}
