// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useParams } from "next/navigation";

export default function ProjectCard({ p, showMonthlyEstimate = false, variant = "default" }: { p: Project; showMonthlyEstimate?: boolean; variant?: "default" | "landing" }) {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const isEN = locale === "en";

  // i18n helpers for common ES labels
  const RENTAL_MAP_EN: Record<string, string> = {
    "No restr.": "No restrictions",
    "30 días": "30 days",
    "60 días": "60 days",
    "90 días": "90 days",
  };
  const HIGHLIGHT_MAP_EN: Record<string, string> = {
    "Inversión flexible": "Flexible investment",
    "Servicio 5★": "5★ service",
    "Servicio 5*": "5★ service",
    "Financia al cierre": "Closing financing",
    "Beach club": "Beach club",
    "Acceso a playa": "Beach access",
  };

  // Reverse maps for EN->ES
  const RENTAL_MAP_ES: Record<string, string> = {
    "No restrictions": "No restr.",
    "30 days": "30 días",
    "60 days": "60 días",
    "90 days": "90 días",
  };
  const HIGHLIGHT_MAP_ES: Record<string, string> = {
    "Flexible investment": "Inversión flexible",
    "5★ service": "Servicio 5★",
    "5* service": "Servicio 5★",
    "Closing financing": "Financia al cierre",
    "Beach club": "Club de playa",
    "Beach access": "Acceso a playa",
  };
  const trPolicy = (s: string) => (isEN ? (RENTAL_MAP_EN[s] ?? s) : (RENTAL_MAP_ES[s] ?? s));
  const trHighlight = (s: string) => (isEN ? (HIGHLIGHT_MAP_EN[s] ?? s) : (HIGHLIGHT_MAP_ES[s] ?? s));

  // Simple monthly estimate: assumes 30% down, fixed rate 6.5% APR, 30 years
  const DOWN_PCT = 0.30;
  const RATE_ANNUAL = 0.065;
  const TERM_YEARS = 30;
  const monthlyPayment = (price: number) => {
    const principal = Math.max(price * (1 - DOWN_PCT), 0);
    const r = RATE_ANNUAL / 12;
    const n = TERM_YEARS * 12;
    if (principal <= 0) return 0;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  };
  const monthly = p.priceFromUsd && showMonthlyEstimate ? Math.round(monthlyPayment(p.priceFromUsd)) : 0;

  const numberLocale = isEN ? "en-US" : "es-ES";
  const fmt = (n?: number) => (typeof n === "number" ? n.toLocaleString(numberLocale) : "");

  // Prepare badges: priority 1) financing, 2) first highlight
  const badges: string[] = [];
  if (p.financingAtClosing) {
    badges.push(isEN ? "Closing financing" : "Financia al cierre");
  }
  if (Array.isArray(p.highlights) && p.highlights.length > 0) {
    badges.push(trHighlight(p.highlights[0]));
  }
  // Cap to 2
  const cappedBadges = badges.slice(0, 2);

  const aspectClass = variant === "landing" ? "aspect-[4/3]" : "aspect-[3/2]";
  const minHClass = variant === "landing"
    ? "min-h-[360px] sm:min-h-[380px] lg:min-h-[400px]"
    : "min-h-[400px] sm:min-h-[420px] lg:min-h-[440px]";

  return (
    <div className={`snap-center shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] rounded-2xl border border-black/10 bg-white overflow-hidden transition hover:-translate-y-[2px] hover:shadow-sm flex flex-col ${minHClass} group`}>
      <div className={`relative ${aspectClass} overflow-hidden rounded-t-2xl`}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-cover transition-transform group-hover:scale-[1.01]"
          sizes="(min-width:1024px) 33vw, 80vw"
          loading="lazy"
          decoding="async"
        />
        {p.delivery && (
          <span className="absolute left-2 top-2 text-[11px] px-2 py-0.5 rounded-full bg-white/80 text-[#0A2540] backdrop-blur-[2px]">
            {p.delivery}
          </span>
        )}
      </div>
      <div className="p-3.5 flex flex-col h-full min-h-[180px]">
        <h3 className="text-[15px] md:text-[16px] font-semibold tracking-tight text-[#0A2540] line-clamp-1">{p.name}</h3>
        <p className="mt-1 text-[12px] text-[#0A2540]/70 line-clamp-1">
          {p.city} · {trPolicy(p.rentalPolicy)}
        </p>
        <div className="mt-2 text-[14px] font-semibold text-[#0A2540]">
          {typeof p.priceFromUsd === "number"
            ? (isEN ? `From USD ${fmt(p.priceFromUsd)}` : `Desde USD ${fmt(p.priceFromUsd)}`)
            : (isEN ? "Inquire" : "Consultar")}
          {p.pricePerSfApprox ? (
            <span className="ml-1 text-[12px] font-normal text-[#0A2540]/50"> · ~${p.pricePerSfApprox}/sf</span>
          ) : null}
          {monthly > 0 ? (
            <span className="ml-1 text-[12px] font-normal text-[#0A2540]/60"> · {isEN ? `Est. ${fmt(monthly)}/mo*` : `Cuota estimada ${fmt(monthly)}/mes*`}</span>
          ) : null}
        </div>
        <div className="mt-2 flex items-center justify-between gap-1.5">
          {cappedBadges.map((label, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[#0A2540]/5 text-[#0A2540] whitespace-nowrap max-w-[48%] truncate"
            >
              {label}
            </span>
          ))}
        </div>
        <p className={`mt-1 text-[11px] ${monthly > 0 ? "text-[#0A2540]/50" : "invisible"}`}>
          {isEN ? "*30% down, 6.5% APR, 30y." : "*30% anticipo, 6.5% APR, 30 años."}
        </p>
        <Link
          href={p.slug}
          className="mt-auto inline-flex h-9 w-full items-center justify-center rounded-md border border-[#0A2540]/20 px-3 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:ring-offset-2"
        >
          {isEN ? "View details" : "Ver ficha"}
        </Link>
      </div>
    </div>
  );
}