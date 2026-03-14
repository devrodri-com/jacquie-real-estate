// src/components/SectionWhyStorages.tsx
import Link from "next/link";

type Props = {
  locale?: "es" | "en";
};

const dict = {
  es: {
    title: "¿Por qué invertir en Storages?",
    sub: "Modelo resiliente, dolarizado y de baja barrera de entrada. Ingresos pasivos en USD." ,
    // Primero destacamos el ticket accesible
    tiles: [
      {
        t: "Ticket accesible",
        d: "Escritura individual (modelo condo storage) y management profesional.",
      },
      {
        t: "Mercado resiliente",
        d: "Industria consolidada en EE.UU. con alta ocupación y demanda estable.",
      },
      {
        t: "Renta en USD",
        d: "Renta fija contractual y administración profesional sin vacancia para el inversor.",
      },
    ],
    ctaPrimary: "Ver oportunidades desde USD 50.000",
    ctaSecondary: "Agendar 15 min",
  },
  en: {
    title: "Why invest in Storages?",
    sub: "Resilient, USD‑based model with a low entry ticket. Passive income in dollars.",
    tiles: [
      {
        t: "Low entry ticket",
        d: "Individual deed (condo storage model) and professional management.",
      },
      {
        t: "Resilient market",
        d: "Mature U.S. industry with high occupancy and stable demand.",
      },
      {
        t: "USD income",
        d: "Fixed contractual rent and professional management—no vacancy risk for investors.",
      },
    ],
    ctaPrimary: "See opportunities from USD 50,000",
    ctaSecondary: "Book 15‑min call",
  },
};

export default function SectionWhyStorages({ locale = "es" }: Props) {
  const t = dict[locale];

  return (
    <section aria-labelledby="why-storages" className="py-12 rounded-[10px] bg-[#0A2540] ring-1 ring-white/10 text-white relative overflow-hidden max-w-[1100px] mx-auto p-6 sm:p-7">
      <div
        className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full"
        style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}}
      />
      <div>
        <header className="mb-6">
          <h2
            id="why-storages"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
          >
            {t.title}
          </h2>
          <p className="mt-1 text-[15px] leading-[1.75] text-white/90">
            {t.sub}
          </p>
        </header>

        {/* value tiles */}
        <ul className="mb-6 grid gap-3 md:grid-cols-3">
          {t.tiles.map((card, i) => {
            const isTicketTile =
              card.t === (locale === "en" ? "Low entry ticket" : "Ticket accesible");

            return (
              <li
                key={`tile-${i}`}
                className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
              >
                <div
                  className="mb-2 h-[2px] w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,.08))",
                  }}
                />

                {/* Badge de precio para destacar el ticket */}
                {isTicketTile && (
                  <div className="mb-2 inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[12px] font-semibold text-white">
                    {locale === "en" ? "From USD 50,000" : "Desde USD 50.000"}
                  </div>
                )}

                <p className="font-medium tracking-tight text-white">{card.t}</p>
                <p className="mt-1 text-[13px] text-white/80">{card.d}</p>
              </li>
            );
          })}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}/storages`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-white/10 px-4 text-sm font-medium text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
          >
            {t.ctaPrimary}
          </Link>
          <a
            href={`https://wa.me/17542673931?text=${encodeURIComponent(
              locale === "en"
                ? "Hi Esteban, I would like to learn more about storage investments."
                : "Hola Esteban, me gustaría conocer más sobre inversiones en storages."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/25 px-4 text-sm font-medium text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
          >
            {t.ctaSecondary}
          </a>
        </div>

        {/* footnote / sources */}
        <p className="mt-3 text-[12px] text-white/50">
          {locale === "en"
            ? "Industry data from BAS Storage / BAS Academy and public sources."
            : "Datos de industria: BAS Storage / BAS Academy y fuentes públicas."}
        </p>
      </div>
    </section>
  );
}
