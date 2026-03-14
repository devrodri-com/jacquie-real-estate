/* src/components/SpecsBlock.tsx */
import Link from "next/link";
import React from "react";
import type { JSX as JSXNS } from "react";

/** Íconos soportados para tipologías (expandible) */
type IconKey =
  | "bed"
  | "area"
  | "balcony"
  | "height"
  | "pool"
  | "spa"
  | "yoga"
  | "paddle"
  | "work"
  | "garage"
  | "kitchen"
  | "package"
  | "bike"
  | "security"
  | "store"
  | "dot"
  | "coffee"
  | "sparkles"
  | "dumbbell"
  | "dock"
  | "beach"
  | "book"
  | "kid"
  | "laundry"
  | "ac"
  | "wifi"
  | "elevator";

export type SpecItem = {
  /** mini SVG o emoji (16px) — opcional si usás iconKey o heurística */
  icon?: React.ReactNode;
  /** clave para elegir ícono predefinido */
  iconKey?: IconKey;
  label: string;
  subLabel?: string;
  href?: string; // opcional: hace la tarjeta clickeable
};

export type SpecCta = {
  label: string;
  href: string;
  variant?: "solid" | "ghost"; // default: ghost
  ariaLabel?: string;
};

export default function SpecsBlock({
  id,
  title,
  subhead,
  items,
  primaryCta,
  secondaryCta,
  headingLevel = "h2",
  // 1 col en mobile, 2 cols desde sm para evitar scroll horizontal
  gridClassName = "mt-2 grid gap-3 grid-cols-1 sm:grid-cols-2",
  ctaAlign = "left",
  className = "",
}: {
  id?: string;
  title?: string;
  subhead?: string;
  items: Array<string | SpecItem>;
  primaryCta?: SpecCta;
  secondaryCta?: SpecCta;
  headingLevel?: "h2" | "h3" | "h4";
  gridClassName?: string;
  ctaAlign?: "left" | "center" | "right";
  className?: string;
}) {
  const HeadingTag = headingLevel as keyof JSXNS.IntrinsicElements;
  const normalized: SpecItem[] = items.map((it) =>
    typeof it === "string" ? ({ label: it } as SpecItem) : it
  );

  return (
    <section id={id} className={"mt-10 " + className}>
      {title ? <HeadingTag className="text-xl font-medium text-[#0A2540]">{title}</HeadingTag> : null}

      {subhead ? <p className="mt-1 text-[12.5px] font-medium text-[#0A2540]/80">{subhead}</p> : null}

      <ul className={gridClassName}>
        {normalized.map((it, i) => (
          <SpecCard key={`${i}-${it.label}`} {...it} />
        ))}
      </ul>

      {(primaryCta || secondaryCta) && (
        <div
          className={
            "mt-3 flex flex-wrap gap-2 " +
            (ctaAlign === "center" ? "justify-center" : ctaAlign === "right" ? "justify-end" : "")
          }
        >
          {primaryCta ? <CtaButton {...primaryCta} /> : null}
          {secondaryCta ? <CtaButton {...secondaryCta} /> : null}
        </div>
      )}
    </section>
  );
}

function SpecCard({ icon, iconKey, label, subLabel, href }: SpecItem) {
  const content = (
    <div className="relative rounded-lg border border-primary/15 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,.03)] transition-colors hover:bg-[#F9FAFB]">
      {/* hairline dorada sutil */}
      <div
        className="mb-2 h-[2px] w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.35), rgba(212,175,55,.0))",
        }}
      />
      <div className="flex items-center gap-2 w-full text-[14px] text-[#0A2540]">
        <span className="inline-flex h-4 w-4 items-center justify-center text-[#0A2540]" aria-hidden>
          {icon ? icon : <AutoIcon keyName={iconKey} text={label} />}
        </span>
        <div className="min-w-0">
          <span className="block truncate" title={label}>{label}</span>
          {subLabel ? (
            <span className="block text-[12px] text-[#0A2540]/70 truncate" title={subLabel}>
              {subLabel}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );

  const li = (child: React.ReactNode) => <li className="list-none">{child}</li>;

  if (!href) return li(content);

  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (isExternal) {
    const target = href.startsWith("http") ? "_blank" : undefined;
    const rel = href.startsWith("http") ? "noopener noreferrer" : undefined;
    return li(
      <a
        href={href}
        target={target}
        rel={rel}
        className="block focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 rounded-xl"
        aria-label={label}
      >
        {content}
      </a>
    );
  }
  return li(
    <Link
      href={href}
      className="block focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 rounded-xl"
      aria-label={label}
    >
      {content}
    </Link>
  );
}

/** Botón con foco visible y aria-label */
function CtaButton({ label, href, variant = "ghost", ariaLabel }: SpecCta) {
  const base =
    "inline-flex h-9 items-center justify-center rounded-md px-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20";
  const styles =
    variant === "solid"
      ? " bg-[#0A2540] text-white hover:opacity-95"
      : " border border-[#0A2540]/20 text-[#0A2540] hover:bg-[#F9FAFB]";

  const computedAria = ariaLabel ?? label;

  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (isExternal) {
    const target = href.startsWith("http") ? "_blank" : undefined;
    const rel = href.startsWith("http") ? "noopener noreferrer" : undefined;
    return (
      <a href={href} target={target} rel={rel} className={base + styles} aria-label={computedAria}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={base + styles} aria-label={computedAria}>
      {label}
    </Link>
  );
}

/** Ícono automático por clave o heurística de texto (ES/EN) */
function AutoIcon({ keyName, text }: { keyName?: IconKey; text: string }) {
  const key = keyName ?? guessIconKey(text);
  switch (key) {
    case "bed":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M3 7h6a3 3 0 0 1 3 3v2H3V7z" />
          <path d="M21 12H12M3 21v-9M21 21v-9" />
        </svg>
      );
    case "area":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M8 8h8v8H8z" />
        </svg>
      );
    case "balcony":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M4 10h16v8H4z" />
          <path d="M4 10l4-4h8l4 4" />
          <path d="M7 14v4M12 14v4M17 14v4" />
        </svg>
      );
    case "beach":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M2 21h20" />
          <path d="M6 21c1.5-3 4.5-3 6 0" />
          <path d="M12 8a4 4 0 0 1 8 0v1H12z" />
          <path d="M12 9c-3 0-6 1-8 3" />
          <path d="M20 9l-3-6" />
        </svg>
      );
    case "height":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M12 3v18" />
          <path d="M9 6l3-3 3 3M9 18l3 3 3-3" />
        </svg>
      );
    case "pool":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M3 16c2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0" />
          <path d="M8 12V7a2 2 0 0 1 4 0v5" />
          <path d="M12 12V7a2 2 0 0 1 4 0v5" />
        </svg>
      );
    case "spa":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M8 13c0-2 2-3 2-5S8 5 8 3" />
          <path d="M12 13c0-2 2-3 2-5s-2-3-2-5" />
          <path d="M5 19h14" />
        </svg>
      );
    case "yoga":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v6l-4 4M12 13l4 4" />
        </svg>
      );
    case "paddle":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <circle cx="16" cy="8" r="3" />
          <path d="M7 17l6-6" />
          <path d="M5 19l2-2" />
        </svg>
      );
    case "work":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case "garage":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M3 10l9-5 9 5v9H3z" />
          <path d="M7 19v-5h10v5" />
        </svg>
      );
    case "kitchen":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <rect x="4" y="6" width="16" height="12" rx="1" />
          <path d="M8 6v12M16 6v12" />
        </svg>
      );
    case "package":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
        </svg>
      );
    case "bike":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <circle cx="7" cy="17" r="3" />
          <circle cx="17" cy="17" r="3" />
          <path d="M7 17l5-9 3 6h-5" />
        </svg>
      );
    case "security":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "store":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M4 7h16l-1 3H5L4 7z" />
          <path d="M5 10v7h14v-7" />
        </svg>
      );
    case "coffee":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
          <path d="M16 8h3a2 2 0 1 1 0 4h-3" />
          <path d="M6 3c1 1 1 2 0 3M10 3c1 1 1 2 0 3M14 3c1 1 1 2 0 3" />
        </svg>
      );
    case "sparkles":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M12 3l2.2 4.5L19 9l-4.8 1.5L12 15l-2.2-4.5L5 9l4.8-1.5L12 3z" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M3 9h3v6H3zM18 9h3v6h-3z" />
          <path d="M6 12h12" />
        </svg>
      );
    case "dock":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M3 20h18" />
          <path d="M6 20V9h12v11" />
          <path d="M10 13h4" />
        </svg>
      );
    case "book":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <path d="M4 5a2 2 0 0 1 2-2h10v16H6a2 2 0 0 0-2 2V5z" />
          <path d="M16 19h2a2 2 0 0 0 2-2V3h-2" />
        </svg>
      );
    case "kid":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20c1.5-3 5-5 7-5s5.5 2 7 5" />
        </svg>
      );
    case "laundry":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="13" r="4" />
          <path d="M8 6h8M8 9h2M14 9h2" />
        </svg>
      );
    case "ac":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 4c2.2 0 4 1.8 4 4 0 .7-.2 1.3-.5 1.9l-2.9-.9" />
          <path d="M20 12c0 2.2-1.8 4-4 4-.7 0-1.3-.2-1.9-.5l.9-2.9" />
          <path d="M12 20c-2.2 0-4-1.8-4-4 0-.7.2-1.3.5-1.9l2.9.9" />
        </svg>
      );
    case "wifi":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12a11 11 0 0 1 14 0" />
          <path d="M7.5 14.5a7 7 0 0 1 9 0" />
          <path d="M10 17a3 3 0 0 1 4 0" />
          <circle cx="12" cy="20" r="1" />
        </svg>
      );
    case "elevator":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2540" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="16" rx="1" />
          <path d="M9 9l2-2 2 2" />
          <path d="M9 15l2 2 2-2" />
        </svg>
      );
    default:
      return <span>•</span>;
  }
}

function guessIconKey(text: string): IconKey {
  const t = text.toLowerCase();
  if (/(jr|studio|dormitorio|bed)/.test(t)) return "bed";
  if (/(m²|sq ft|ft²|metros|square)/.test(t)) return "area";
  if (/(balcón|balcon|balcony|terraza)/.test(t)) return "balcony";
  if (/(diseñ|diseño|planos?|uno y dos pisos|1 y 2 pisos|dos pisos|2 pisos|1 piso|\b(1|one)\s*[--—]?\s*(and|y)\s*(2|two)\s*[--—]?\s*story\b|\b(1|one)\s*[--—]?\s*story\b|\b(2|two)\s*[--—]?\s*story\b|\bstory\b|\bstories\b)/.test(t)) return "height";
  if (/(iluminaci[oó]n|lighting)/.test(t)) return "sparkles";
  if (/(materiales|materials?|acabados|finishes?)/.test(t)) return "sparkles";
  if (/(piso|pisos|flooring|floors|large[-\s]?format|porcelanato)/.test(t)) return "sparkles";
  if (/(blackout|shade(s)?|persianas|cortinas)/.test(t)) return "sparkles";
  if (/(beach club|club de playa|beach|playa)/.test(t)) return "beach";
  if (/(lobby|chandelier|grand salon|sal[oó]n)/.test(t)) return "sparkles";
  if (/(altura|alturas|height|techo|techos|ceiling|piso\s*a\s*techo|piso‑techo|piso-techo|floor\s*to\s*ceiling|floor\-to\-ceiling)/.test(t)) return "height";
  if (/(piscina|pool|rooftop)/.test(t)) return "pool";
  if (/(sauna|cold plunge|spa)/.test(t)) return "spa";
  if (/(belleza|wellness|sal[oó]n privado)/.test(t)) return "spa";
  if (/(ba[ñn]o|bathroom|bath(s)?|vanit(y|ies)|fixtures?|thg|italkraft|waterworks)/.test(t)) return "spa";
  if (/(shower|showers|ducha|duchas|frameless)/.test(t)) return "spa";
  if (/(gimnasio|gym|anatomy)/.test(t)) return "dumbbell";
  if (/(yoga|meditación|meditacion)/.test(t)) return "yoga";
  if (/(paddle|pickleball)/.test(t)) return "paddle";
  if (/(cowork|work lounge|sala de trabajo|administración de propiedades|administracion de propiedades)/.test(t)) return "work";
  if (/(business lounge|owner portal|portal|anal[ií]tica|analytics)/.test(t)) return "work";
  if (/(garaje|garage|parking|estacionamiento|aparcam|parqueadero)/.test(t)) return "garage";
  if (/(impact|impacto)/.test(t)) return "security";
  if (/(cocina|kitchen|electrodom[eé]stic|appliance|horno|microondas|lavavajillas|refrigerador)/.test(t)) return "kitchen";
  if (/(encimera|encimeras|grifer[ií]a|griferia|countertop|countertops|stone countertops)/.test(t)) return "kitchen";
  if (/(paquetes|package room|mail room)/.test(t)) return "package";
  if (/(biciclet|bike)/.test(t)) return "bike";
  if (/(control de acceso|access control|seguridad)/.test(t)) return "security";
  if (/(cine|screening|pel[ií]cula|movie|juegos|game room)/.test(t)) return "sparkles";
  if (/(lavadora|secadora|washer|dryer|laundry)/.test(t)) return "laundry";
  if (/(wi[-\s]?fi|wifi|internet|fibra|fiber)/.test(t)) return "wifi";
  if (/(climatizaci[oó]n|hvac|aire\s*acondicionado|air\s*conditioning|a\/?c\b|heating|alta\s*eficiencia)/.test(t)) return "ac";
  if (/(biblioteca|library|lounge)/.test(t)) return "book";
  if (/(ascensor|elevador|elevator)/.test(t)) return "elevator";
  if (/(cl[óo]set|closet|vestidor(?:es)?|walk[-\s]?in)/.test(t)) return "package";
  if (/(toilette|powder\s*room|toilet)/.test(t)) return "spa";
  if (/(marina|muelle|dock|water taxi)/.test(t)) return "dock";
  if (/(club infantil|niñ|child|kids|infantil)/.test(t)) return "kid";
  if (/(restaurante|restaurant|catering|dining|comida|bebidas|food|beverage)/.test(t)) return "coffee";
  if (/(agua\s*filtrada|water\s*filtered|uv\s*water|filtraci[oó]n\s*uv|aire\s*filtrado|filtered\s*air)/.test(t)) return "sparkles";
  if (/(hilton|hotel|concierge|room\s*service|housekeeping)/.test(t)) return "sparkles";
  if (/(tecnolog[ií]a\s*inteligente|smart\s*home|dom[oó]tica)/.test(t)) return "sparkles";
  if (/(comercio|retail|tienda)/.test(t)) return "store";
  if (/(cafeter|panader|barista|coffee|café|cafe|wine|beer|cerveza|bar)/.test(t)) return "coffee";
  if (/(amoblad|amuebl|furnished|terminadas|finished|llave\s*en\s*mano|turn[-\s]?key|restoration\s*hardware|\brh\b|mobiliario)/.test(t)) return "sparkles";
  return "dot";
}