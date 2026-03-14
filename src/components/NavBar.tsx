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
  const locale = (useLocale() as "es"|"en") || "es";
  const base = `/${locale}`;

  const L = locale === "es"
    ? {home:"Inicio", proyectos:"Proyectos", miami:"Miami", precon:"Preconstrucción", storages:"Storages", financing:"Financiación", sobreMi:"Sobre mí", contacto:"Contacto"}
    : {home:"Home", projects:"Projects", miami:"Miami", precon:"Pre-construction", storages:"Storages", financing:"Financing", sobreMi:"About", contact:"Contact"};

  const items = [
    { href: `${base}`,              label: L.home },
    { href: `${base}/proyectos`,    label: L.proyectos || L.projects },
    { href: `${base}/miami`,        label: L.miami },
    { href: `${base}/precon`,       label: L.precon },
    { href: `${base}/storages`,     label: L.storages },
    { href: `${base}/financiacion`, label: L.financing },
    { href: `${base}/sobre-mi`,     label: L.sobreMi },
    { href: `${base}/contacto`,     label: L.contacto || L.contact }
  ];

  const switchTo = locale === "es" ? "en" : "es";
  const switchHref = `/${switchTo}${pathname.replace(/^\/(es|en)/,"")}`;

  return (
    <header className={"w-full bg-[#0A2540] text-white transition-shadow " + (scrolled ? "border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,.08)]" : "border-b border-white/5")}>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href={base} className="text-sm font-semibold text-white no-underline hover:opacity-90">
          Esteban Firpo · Miami Real Estate
        </Link>

        <button aria-label="Abrir menú" onClick={()=>setOpen(v=>!v)} className="lg:hidden p-2">
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
                className={`no-underline text-white/85 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/30 underline-offset-10 xl:underline-offset-12 transition-colors ${isActive ? 'text-white underline decoration-2 xl:decoration-1 decoration-[#D4AF37]' : ''}`}
              >
                {it.label}
              </Link>
            )
          })}
          <Link
            href={switchHref}
            title={switchTo.toUpperCase()}
            aria-label={locale === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            className="inline-flex items-center rounded-full border border-white/25 text-white px-2.5 py-1 text-xs font-semibold no-underline hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
          >
            {switchTo.toUpperCase()}
          </Link>
        </nav>
      </div>

      {open && (
        <nav className="lg:hidden fixed inset-0 z-50 bg-[#0A2540]/95 text-white backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col h-full">
            {/* Top bar */}
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <Link href={base} onClick={()=>setOpen(false)} className="text-sm font-semibold text-white no-underline hover:opacity-90">
                Esteban Firpo · Miami Real Estate
              </Link>
              <button aria-label="Cerrar menú" onClick={()=>setOpen(false)} className="p-2">
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
                      className={`block py-3.5 text-lg no-underline transition-colors ${isActive ? 'text-white underline decoration-2 underline-offset-[6px] decoration-[#D4AF37]' : 'text-white/85 hover:text-white'}`}
                    >
                      {it.label}
                    </Link>
                  )})}
              </div>
              <div className="mt-4">
                <Link
                  href={switchHref}
                  onClick={()=>setOpen(false)}
                  title={switchTo.toUpperCase()}
                  aria-label={locale === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                  className="inline-flex w-full items-center justify-center rounded-md border border-white/25 text-white px-3 py-2 text-sm font-semibold no-underline hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
                >
                  {switchTo.toUpperCase()}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}