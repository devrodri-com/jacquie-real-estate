// src/components/WhyBlock.tsx
import Link from "next/link";
import React from "react";
import type { JSX as JSXNS } from "react";

/** Íconos soportados (ampliable) */
type IconKey = "shield" | "beach" | "skyline" | "sparkles" | "location" | "coffee" | "portal";

export type WhyItem = {
  icon?: React.ReactNode;          // vector mini icon (override)
  iconKey?: IconKey;               // si querés forzar uno predefinido
  heading: string;
  text?: string;
  href?: string;                   // hace la card clickeable (opcional)
  analytics?: Record<string, string | number | boolean>; // datos opcionales para data-attrs
};

export default function WhyBlock({
  id,
  title,
  items,
  headingLevel = "h2",
  gridClassName = "mt-3 grid gap-4 md:gap-5 sm:grid-cols-3",
  className = "",
}: {
  id?: string;
  title?: string;
  items: WhyItem[];
  headingLevel?: "h2" | "h3" | "h4";
  gridClassName?: string;
  className?: string;
}) {
  const HeadingTag = headingLevel as keyof JSXNS.IntrinsicElements;
  return (
    <section id={id} className={"mt-12 " + className}>
      {title ? (
        <HeadingTag className="mb-3 sm:mb-4 text-xl font-medium text-[#0A2540]">{title}</HeadingTag>
      ) : null}

      <ul className={gridClassName}>
        {items.map((it, i) => (
          <li key={`${i}-${it.heading}`} className="list-none">
            <WhyCard {...it} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhyCard({ icon, iconKey, heading, text, href, analytics }: WhyItem) {
  const badge =
    icon ?? (
      <span
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2540]/5 text-[#0A2540]"
      >
        <AutoIcon keyName={iconKey} text={heading} />
      </span>
    );

  const content = (
    <div className="relative overflow-hidden rounded-lg border border-primary/15 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,.03)] transition-colors hover:bg-[#F9FAFB]">
      {/* hairline dorada sutil y recortada por el borde */}
      <div
        className="mb-2 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.22), rgba(212,175,55,.05))",
        }}
      />
      <div className="flex items-center gap-3">
        {typeof icon === "string" ? (
          <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2540]/5 text-lg">
            {icon}
          </span>
        ) : (
          badge
        )}
        <div>
          <p className="text-[13px] font-medium text-[#0A2540]">{heading}</p>
          {text ? <p className="mt-0.5 text-[12.5px] text-[#0A2540]/80">{text}</p> : null}
        </div>
      </div>
    </div>
  );

  const dataAttrs =
    analytics && typeof analytics === "object"
      ? Object.fromEntries(
          Object.entries(analytics).map(([k, v]) => [`data-why-${k}`, String(v)])
        )
      : {};

  if (!href) return content;

  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const aria = { "aria-label": heading };

  if (isExternal) {
    const target = href.startsWith("http") ? "_blank" : undefined;
    const rel = href.startsWith("http") ? "noopener noreferrer" : undefined;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className="block focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 rounded-xl"
        {...aria}
        {...dataAttrs}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 rounded-xl"
      {...aria}
      {...dataAttrs}
    >
      {content}
    </Link>
  );
}

/** Ícono automático por clave o por heurística ES/EN */
function AutoIcon({ keyName, text }: { keyName?: IconKey; text: string }) {
  const key = keyName ?? guessIconKey(text);
  const stroke = "#0A2540";
  switch (key) {
    case "shield":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M12 3l8 3v6c0 4.5-3 7.5-8 9-5-1.5-8-4.5-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "beach":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M3 21h18" />
          <path d="M12 3a7 7 0 0 1 7 7H5a7 7 0 0 1 7-7z" />
          <path d="M16 10l3 11" />
        </svg>
      );
    case "skyline":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M3 21h18" />
          <path d="M6 21V9h4v12" />
          <path d="M12 21V5h4v16" />
          <path d="M18 21v-8h3v8" />
        </svg>
      );
    case "location":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M12 21s-7-5.5-7-10a7 7 0 1 1 14 0c0 4.5-7 10-7 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    case "coffee":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
          <path d="M16 8h3a2 2 0 1 1 0 4h-3" />
          <path d="M6 3c1 1 1 2 0 3M10 3c1 1 1 2 0 3M14 3c1 1 1 2 0 3" />
        </svg>
      );
    case "portal":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
        </svg>
      );
  }
}

function guessIconKey(text: string): IconKey {
  const t = text.toLowerCase();
  if (/(^|\W)str(\W|$)/.test(t)) return "shield";
  if (/(renta corta|short\-?term|lease|approved|gestión)/.test(t)) return "shield";
  if (/(playa|beach|club)/.test(t)) return "beach";
  if (/(ubicaci[oó]n|north beach|city|barrio|vistas|skyline)/.test(t)) return "skyline";
  if (/(coraz[oó]n|brickell|downtown|centro|en el coraz[oó]n)/.test(t)) return "location";
  if (/(ubicaci[oó]n|location|minutes|minutos|metro|bcc|village)/.test(t)) return "location";
  if (/(cafeter|panader|barista|coffee|café|cafe|wine|beer|mercado)/.test(t)) return "coffee";
  if (/(portal|exposici|plataforma|platform|exhibit)/.test(t)) return "portal";
  if (/(peacock|sal[oó]n|salon|room)/.test(t)) return "sparkles";
  return "sparkles";
}