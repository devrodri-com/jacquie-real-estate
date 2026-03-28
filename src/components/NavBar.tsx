// src/components/NavBar.tsx
"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState, useEffect} from "react";
import {useLocale} from "next-intl";

export default function NavBar(){
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const pathname = usePathname() || "/es";
  const locale = (useLocale() as "es"|"en"|"fr") || "es";
  const base = `/${locale}`;
  const pathWithoutLocale = (pathname && pathname.replace(/^\/(es|en|fr)/, "")) || "/";

  const L = locale === "es"
    ? { home: "Inicio", proyectos: "Proyectos", listings: "Propiedades", propertyManagement: "Gestión de propiedades", sobreMi: "Sobre mí", contacto: "Contacto" }
    : locale === "en"
      ? { home: "Home", proyectos: "Projects", listings: "Listings", propertyManagement: "Property Management", sobreMi: "About", contacto: "Contact" }
      : { home: "Accueil", proyectos: "Projets", listings: "Propriétés", propertyManagement: "Gestion de propriétés", sobreMi: "À propos", contacto: "Contact" };

  const menuA11y =
    locale === "en"
      ? { open: "Open menu", close: "Close menu" }
      : locale === "fr"
        ? { open: "Ouvrir le menu", close: "Fermer le menu" }
        : { open: "Abrir menú", close: "Cerrar menú" };

  const items = [
    { href: `${base}`,              label: L.home },
    { href: `${base}/proyectos`,    label: L.proyectos },
    { href: `${base}/listings`,     label: L.listings },
    { href: `${base}/property-management`, label: L.propertyManagement },
    { href: `${base}/sobre-mi`,     label: L.sobreMi },
    { href: `${base}/contacto`,    label: L.contacto }
  ];

  const locales: { code: "es"|"en"|"fr"; label: string; aria: string; title: string }[] = [
    { code: "es", label: "ES", aria: "Cambiar a español", title: "Español" },
    { code: "en", label: "EN", aria: "Switch to English", title: "English" },
    { code: "fr", label: "FR", aria: "Passer au français (Canada)", title: "Français (Canada)" },
  ];

  return (
    <header className={"w-full bg-primary text-primary-foreground transition-shadow " + (scrolled ? "border-b border-paper/10 shadow-[0_1px_8px_rgba(0,0,0,.08)]" : "border-b border-paper/5")}>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href={base} className="text-sm font-semibold text-primary-foreground no-underline hover:opacity-90">
          Jacquie Zarate Realtor
        </Link>

        <button aria-label={open ? menuA11y.close : menuA11y.open} onClick={()=>setOpen(v=>!v)} className="lg:hidden p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav className="hidden lg:flex gap-6 xl:gap-7 text-sm font-medium">
          {items.map(it=>{
            const isHome = it.href === base;
            const isActive = isHome ? (pathname === base) : pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={isActive ? 'page' : undefined}
                className={`no-underline text-primary-foreground/85 hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus-visible:ring-2 focus-visible:ring-accent/30 underline-offset-10 xl:underline-offset-12 transition-colors ${isActive ? 'text-primary-foreground underline decoration-2 xl:decoration-1 decoration-accent' : ''}`}
              >
                {it.label}
              </Link>
            )
          })}
          <span className="inline-flex items-center gap-1">
            {locales.map(({ code, label, aria, title }) =>
              code === locale ? (
                <span
                  key={code}
                  className="inline-flex h-8 w-12 items-center justify-center rounded-full border border-paper/25 text-xs font-semibold text-primary-foreground opacity-90"
                  aria-current="true"
                  title={title}
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={code}
                  href={`/${code}${pathWithoutLocale}`}
                  title={title}
                  aria-label={aria}
                  className="inline-flex h-8 w-12 items-center justify-center rounded-full border border-paper/25 text-primary-foreground text-xs font-semibold no-underline hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {label}
                </Link>
              )
            )}
          </span>
        </nav>
      </div>

      {open && (
        <nav className="lg:hidden fixed inset-0 z-50 bg-primary/95 text-primary-foreground backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col h-full">
            {/* Top bar */}
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <Link href={base} onClick={()=>setOpen(false)} className="text-sm font-semibold text-primary-foreground no-underline hover:opacity-90">
                Jacquie Zarate Realtor
              </Link>
              <button aria-label={menuA11y.close} onClick={()=>setOpen(false)} className="p-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="white" />
                  <line x1="6" y1="6" x2="18" y2="18" stroke="white" />
                </svg>
              </button>
            </div>

            {/* Menu items + language switch */}
            <div className="mt-3 overflow-y-auto">
              <div className="divide-y divide-black/5">
                {items.map(it=>{
                  const isHome = it.href === base;
                  const isActive = isHome ? (pathname === base) : pathname.startsWith(it.href);
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={()=>setOpen(false)}
                      className={`block py-3.5 text-lg no-underline transition-colors ${isActive ? 'text-primary-foreground underline decoration-2 underline-offset-[6px] decoration-accent' : 'text-primary-foreground/85 hover:text-primary-foreground'}`}
                    >
                      {it.label}
                    </Link>
                  )})}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {locales.map(({ code, label, aria, title }) =>
                  code === locale ? (
                    <span
                      key={code}
                      onClick={()=>setOpen(false)}
                      className="flex h-11 flex-1 items-center justify-center rounded-md border border-paper/25 px-3 text-sm font-semibold text-primary-foreground opacity-90 text-center"
                      aria-current="true"
                      title={title}
                    >
                      {label}
                    </span>
                  ) : (
                    <Link
                      key={code}
                      href={`/${code}${pathWithoutLocale}`}
                      onClick={()=>setOpen(false)}
                      title={title}
                      aria-label={aria}
                      className="inline-flex h-11 flex-1 items-center justify-center rounded-md border border-paper/25 text-primary-foreground px-3 text-sm font-semibold no-underline hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}