// src/components/HighlightsBlock.tsx
import React from "react";  

/** Conjunto de íconos soportados. Ampliable sin romper API. */
type IconKey =
  | "pool"
  | "beach"
  | "rooftop"
  | "cowork"
  | "gym"
  | "yoga"
  | "sofa"
  | "furniture"
  | "pet"
  | "view"
  | "sparkles"
  | "location"
  | "coffee"
  | "portal"
  | "spa"
  | "dock";

/** Item puede venir como string (solo título) o como objeto enriquecido. */
export type HighlightItem = {
  title: string;
  desc?: string;
  /** Si querés forzar un ícono particular. */
  iconKey?: IconKey;
  /** Permite sobreescribir completamente el ícono. */
  icon?: React.ReactNode | string;
};

export default function HighlightsBlock({
  items,
  title,
  className = "",
}: {
  items: Array<string | HighlightItem>;
  title?: string;
  className?: string;
}) {
  const normalized = items.map((it) =>
    typeof it === "string" ? ({ title: it } as HighlightItem) : it
  );

  return (
    <section className={"mt-10 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden " + className}>
      <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
      {title ? (
        <h2 id="highlights-heading" className="mb-2.5 flex items-center gap-2 text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
            <path d="M18 14l.8 1.8L21 16l-1.8.8L18 19l-.8-2.2L15 16l2.2-.2L18 14z" />
          </svg>
          {title}
        </h2>
      ) : null}
      <ul className="mt-2 sm:mt-3 space-y-[11px] max-w-[1000px] lg:max-w-[960px] mx-auto" role="list" aria-labelledby="highlights-heading">
        {normalized.map((it, i) => (
          <li key={`${it.title}-${i}`} role="listitem" className="flex items-start gap-3">
            <span className="relative top-[9px] sm:top-[9px] inline-block h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden />
            <div>
              <p className="text-[16px] leading-[26px] text-white/95">{it.title}</p>
              {it.desc ? (
                <p className="mt-0.5 text-[13px] leading-6 text-white/70">{it.desc}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Íconos SVG minimalistas con trazo consistente (brand #0A2540). */
const ICON_PROPS = { width: 20, height: 20, stroke: "#0A2540", fill: "none", strokeWidth: 1.6 };

const ICON_MAP: Record<IconKey, React.FC> = {
  sparkles: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
      <path d="M18 14l.8 1.8L21 16l-1.8.8L18 19l-.8-2.2L15 16l2.2-.2L18 14z" />
    </svg>
  ),
  pool: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M7 5c0-1.1.9-2 2-2s2 .9 2 2v9" />
      <path d="M13 5c0-1.1.9-2 2-2s2 .9 2 2v9" />
      <path d="M3 16c2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0" />
    </svg>
  ),
  beach: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M3 21h18" />
      <path d="M12 21v-6" />
      <path d="M12 3a7 7 0 0 1 7 7H5a7 7 0 0 1 7-7z" />
      <path d="M16 10l3 11" />
    </svg>
  ),
  rooftop: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M3 21h18" />
      <path d="M6 21V10l6-4 6 4v11" />
      <path d="M9 14h6" />
    </svg>
  ),
  cowork: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <rect x="3" y="6" width="18" height="10" rx="2" />
      <path d="M8 20h8" />
    </svg>
  ),
  gym: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M3 12h18" />
      <path d="M6 9v6M18 9v6" />
      <rect x="1" y="9" width="2" height="6" />
      <rect x="21" y="9" width="2" height="6" />
    </svg>
  ),
  yoga: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v5l-4 4M12 12l4 4" />
      <path d="M6 21h12" />
    </svg>
  ),
  sofa: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <rect x="4" y="10" width="16" height="7" rx="2" />
      <path d="M4 14h16M6 21v-4M18 21v-4" />
    </svg>
  ),
  furniture: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="12" rx="1" />
      <path d="M12 4v12" />
    </svg>
  ),
  pet: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <circle cx="7" cy="8" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="17" cy="8" r="2" />
      <path d="M7 14c3-2 7-2 10 0 1.5 1.2.5 4-2 4H9c-2.5 0-3.5-2.8-2-4z" />
    </svg>
  ),
  view: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    </svg>
  ),
  location: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M12 21s-7-5.5-7-10a7 7 0 1 1 14 0c0 4.5-7 10-7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  ),
  coffee: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
      <path d="M16 8h3a2 2 0 1 1 0 4h-3" />
      <path d="M6 3c1 1 1 2 0 3M10 3c1 1 1 2 0 3M14 3c1 1 1 2 0 3" />
    </svg>
  ),
  portal: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18" />
    </svg>
  ),
  spa: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M8 13c0-2 2-3 2-5S8 5 8 3" />
      <path d="M12 13c0-2 2-3 2-5s-2-3-2-5" />
      <path d="M5 19h14" />
    </svg>
  ),
  dock: () => (
    <svg {...ICON_PROPS} viewBox="0 0 24 24">
      <path d="M3 20h18" />
      <path d="M6 20V9h12v11" />
      <path d="M10 13h4" />
    </svg>
  ),
};

/** Heurística simple para asignar iconos por texto ES/EN. */
function guessIconKey(txt: string): IconKey {
  const t = txt.toLowerCase();
  if (/(piscina|pool|cabana|cabañ|jacuzzi)/.test(t)) return "pool";
  if (/(beach|playa|club)/.test(t)) return "beach";
  if (/(rooftop|terraza|vistas|view)/.test(t)) return /(vista|view)/.test(t) ? "view" : "rooftop";
  if (/(torre|tower|75|glass tower)/.test(t)) return "view";
  if (/(residenc|penthouses|duplex|flats|flow\-?through)/.test(t)) return "view";
  if (/(ubicación|ubicacion|minutes|minutos|bcc|village|metro|metrorail|location)/.test(t)) return "location";
  if (/(cafeter|panader|barista|coffee|café|cafe|wine|beer|mercado)/.test(t)) return "coffee";
  if (/(portal|exposici|plataforma|platform|exhibit)/.test(t)) return "portal";
  if (/(cowork|co\-?trabajo)/.test(t)) return "cowork";
  if (/(gym|gimnasio|fitness)/.test(t)) return "gym";
  if (/(yoga|meditaci)/.test(t)) return "yoga";
  if (/(interior|acabados|kitchen|cocina|baño|baño|pisos|mármol|marmol|granito|quartz|cabinet|mueble)/.test(t)) return "furniture";
  if (/(hammam|spa|steam|sauna|tratamiento|treatment)/.test(t)) return "spa";
  if (/(marina|muelle|dock|water taxi)/.test(t)) return "dock";
  if (/(amoblad|amueblad|furnish)/.test(t)) return "furniture";
  if (/(sofa|lounge)/.test(t)) return "sofa";
  if (/(mascota|pet)/.test(t)) return "pet";
  return "sparkles";
}