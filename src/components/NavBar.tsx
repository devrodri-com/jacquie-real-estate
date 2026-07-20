"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import LetsGoMiamiHeader from "@/components/LetsGoMiamiHeader";
import {
  buildJacquieWhatsAppHref,
  normalizeSiteLocale,
  type SiteLocale,
} from "@/lib/whatsapp";

const NAV_COPY: Record<
  SiteLocale,
  {
    projects: string;
    properties: string;
    financing: string;
    about: string;
    contact: string;
    staysGroup: string;
    whatsapp: string;
    open: string;
    close: string;
    nav: string;
  }
> = {
  es: {
    projects: "Proyectos",
    properties: "Propiedades",
    financing: "Financiación",
    about: "Sobre Jacquie",
    contact: "Contacto",
    staysGroup: "Estadías",
    whatsapp: "Hablar por WhatsApp",
    open: "Abrir menú",
    close: "Cerrar menú",
    nav: "Navegación principal",
  },
  en: {
    projects: "Projects",
    properties: "Properties",
    financing: "Financing",
    about: "About Jacquie",
    contact: "Contact",
    staysGroup: "Stays",
    whatsapp: "Chat on WhatsApp",
    open: "Open menu",
    close: "Close menu",
    nav: "Main navigation",
  },
  fr: {
    projects: "Projets",
    properties: "Propriétés",
    financing: "Financement",
    about: "À propos de Jacquie",
    contact: "Contact",
    staysGroup: "Séjours",
    whatsapp: "Écrire sur WhatsApp",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    nav: "Navigation principale",
  },
};

const LOCALES: {
  code: SiteLocale;
  label: string;
  aria: string;
  title: string;
}[] = [
  { code: "es", label: "ES", aria: "Cambiar a español", title: "Español" },
  { code: "en", label: "EN", aria: "Switch to English", title: "English" },
  {
    code: "fr",
    label: "FR",
    aria: "Passer au français (Canada)",
    title: "Français (Canada)",
  },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const pathname = usePathname() || "/es";
  const locale = normalizeSiteLocale(useLocale());
  const copy = NAV_COPY[locale];
  const base = `/${locale}`;
  const pathWithoutLocale = pathname.replace(/^\/(es|en|fr)/, "") || "";
  const isLetsGoMiami = /^\/(es|en|fr)\/lets-go-miami(?:\/|$)/.test(pathname);

  const coreItems = [
    { href: `${base}/proyectos`, label: copy.projects },
    { href: `${base}/listings`, label: copy.properties },
    { href: `${base}/financiacion`, label: copy.financing },
    { href: `${base}/sobre-mi`, label: copy.about },
  ];
  const mobileItems = [
    ...coreItems,
    { href: `${base}/contacto`, label: copy.contact },
  ];
  const letsGoHref = `${base}/lets-go-miami`;
  const whatsappHref = buildJacquieWhatsAppHref(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuCloseButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
        return;
      }
      if (event.key !== "Tab") return;

      const controls = Array.from(
        mobileNavRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.offsetParent !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const trackWhatsApp = (placement: "desktop" | "mobile") => {
    window.gtag?.("event", "click_whatsapp", {
      event_category: "engagement",
      event_label: `navigation_whatsapp_${placement}_${locale}`,
    });
  };

  if (isLetsGoMiami) {
    return <LetsGoMiamiHeader locale={locale} pathWithoutLocale={pathWithoutLocale} />;
  }

  return (
    <header
      className={`w-full bg-primary text-primary-foreground transition-shadow ${
        scrolled
          ? "border-b border-paper/10 shadow-[0_1px_8px_rgba(0,0,0,.08)]"
          : "border-b border-paper/5"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5 px-4">
        <Link
          href={base}
          aria-current={pathname === base ? "page" : undefined}
          className="shrink-0 font-display text-[20px] font-medium leading-none text-primary-foreground no-underline hover:opacity-90"
        >
          Jacquie Zárate
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? copy.close : copy.open}
          aria-expanded={open}
          aria-controls="mobile-main-navigation"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 min-[1180px]:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav
          className="hidden min-[1180px]:flex min-[1180px]:items-center min-[1180px]:gap-4"
          aria-label={copy.nav}
        >
          <div className="flex items-center gap-5 text-sm font-medium">
            {coreItems.map((item) => (
              <NavLink key={item.href} {...item} active={isActive(item.href)} />
            ))}
          </div>
          <Link
            href={letsGoHref}
            aria-current={isActive(letsGoHref) ? "page" : undefined}
            className="border-l border-paper/20 pl-4 text-sm font-medium text-primary-foreground/78 no-underline transition-colors hover:text-primary-foreground"
          >
            Let’s Go Miami
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("desktop")}
            data-analytics="navigation:whatsapp"
            className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full bg-paper px-4 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface"
          >
            {copy.whatsapp}
          </a>
          <LocaleSwitcher
            locale={locale}
            pathWithoutLocale={pathWithoutLocale}
            variant="dark-desktop"
          />
        </nav>
      </div>

      {open ? (
        <nav
          ref={mobileNavRef}
          id="mobile-main-navigation"
          className="fixed inset-0 z-50 bg-primary/98 text-primary-foreground backdrop-blur-sm min-[1180px]:hidden"
          aria-label={copy.nav}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col px-4 py-4">
            <div className="flex items-center justify-between border-b border-paper/15 pb-4">
              <Link
                href={base}
                onClick={() => setOpen(false)}
                className="font-display text-[20px] font-medium leading-none text-primary-foreground no-underline hover:opacity-90"
              >
                Jacquie Zárate
              </Link>
              <button
                ref={menuCloseButtonRef}
                type="button"
                aria-label={copy.close}
                onClick={() => {
                  setOpen(false);
                  window.setTimeout(() => menuButtonRef.current?.focus(), 0);
                }}
                className="rounded-md p-2"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-5">
              <div className="divide-y divide-paper/10">
                {mobileItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-3.5 text-lg no-underline transition-colors ${
                      isActive(item.href)
                        ? "text-primary-foreground underline decoration-primary-foreground/55 decoration-2 underline-offset-[6px]"
                        : "text-primary-foreground/85 hover:text-primary-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 border-t border-paper/20 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/65">
                  {copy.staysGroup}
                </p>
                <Link
                  href={letsGoHref}
                  aria-current={isActive(letsGoHref) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="mt-2 block min-h-11 py-2 text-lg font-medium text-primary-foreground no-underline"
                >
                  Let’s Go Miami
                </Link>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("mobile")}
                data-analytics="navigation:whatsapp"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-paper px-5 text-base font-semibold text-primary no-underline transition-colors hover:bg-surface"
              >
                {copy.whatsapp}
              </a>

              <div className="mt-5">
                <LocaleSwitcher
                  locale={locale}
                  pathWithoutLocale={pathWithoutLocale}
                  variant="dark-mobile"
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-primary-foreground/84 no-underline underline-offset-[12px] transition-colors hover:text-primary-foreground ${
        active
          ? "text-primary-foreground underline decoration-primary-foreground/55 decoration-1"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}

function LocaleSwitcher({
  locale,
  pathWithoutLocale,
  variant,
  onNavigate,
}: {
  locale: SiteLocale;
  pathWithoutLocale: string;
  variant: "dark-desktop" | "dark-mobile" | "light-desktop" | "light-mobile";
  onNavigate?: () => void;
}) {
  const dark = variant.startsWith("dark");
  const mobile = variant.endsWith("mobile");

  return (
    <span className={`inline-flex items-center ${mobile ? "w-full gap-2" : "gap-1"}`}>
      {LOCALES.map(({ code, label, aria, title }) => {
        const sizeClass = mobile ? "h-11 flex-1" : "h-8 w-10";
        const colorClass = dark
          ? "border-paper/25 text-primary-foreground hover:bg-paper/10"
          : "border-primary/20 text-primary hover:bg-surface";

        return code === locale ? (
          <span
            key={code}
            className={`inline-flex items-center justify-center rounded-full border text-xs font-semibold ${sizeClass} ${colorClass}`}
            aria-current="true"
            title={title}
          >
            {label}
          </span>
        ) : (
          <Link
            key={code}
            href={`/${code}${pathWithoutLocale}`}
            onClick={onNavigate}
            title={title}
            aria-label={aria}
            className={`inline-flex items-center justify-center rounded-full border text-xs font-semibold no-underline ${sizeClass} ${colorClass}`}
          >
            {label}
          </Link>
        );
      })}
    </span>
  );
}
