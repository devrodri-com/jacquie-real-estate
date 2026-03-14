// src/app/[locale]/storages/page.tsx

import { callaway } from "../../../data/storages/callaway";
import type { StorageProject } from "../../../data/storages/types";
export default async function StoragesPage({
  params,
}: {
  params: { locale: "es" | "en" };
}) {
  const locale = params?.locale || "es";
  const isEN = locale === "en";

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-[#0A2540]">
      {/* Hero */}
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
          {isEN ? "Invest in Self‑Storage" : "Invierte en Storages en EE.UU."}
        </h1>
        <div
          className="h-[2px] w-24 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.6), rgba(212,175,55,.0))",
          }}
        />
        <p className="max-w-[60ch] text-[15px] leading-[1.75]">
          {isEN
            ? "Resilient asset class with high occupancy and stable demand. Low entry ticket and passive USD income with professional management."
            : "Clase de activo resiliente, con alta ocupación y demanda estable. Ticket de entrada bajo e ingresos pasivos en USD con management profesional."}
        </p>
      </header>

      {/* What is condo storage */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-medium tracking-tight">
          {isEN ? "What is condo‑storage?" : "¿Qué es el modelo condo‑storage?"}
        </h2>
        <div className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-6 text-white overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full"
            style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}}
          />
          <div className="grid gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={`step-${n}`}
                className="rounded-md ring-1 ring-white/10 bg-[#0A2540] p-3 text-white"
              >
                <div className="mb-1 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[12px] font-semibold text-white">
                  {n}
                </div>
                <p className="font-medium tracking-tight text-white">
                  {isEN
                    ? [
                        "Acquire and title",
                        "Professional management",
                        "Individual deed (condo)",
                        "Fixed rent in USD",
                      ][n - 1]
                    : [
                        "Compra con título",
                        "Gestión profesional",
                        "Escritura individual (condo)",
                        "Renta fija en USD",
                      ][n - 1]}
                </p>
                <p className="mt-1 text-[13px] text-white/80">
                  {isEN
                    ? [
                        "Investor purchases storage units or fraction.",
                        "Operator runs leasing/maintenance.",
                        "Units are subdivided with individual deeds.",
                        "Contractual income paid periodically.",
                      ][n - 1]
                    : [
                        "El inversor adquiere unidades o fracción.",
                        "El operador administra alquiler y mantenimiento.",
                        "Se subdividen unidades con escrituras individuales.",
                        "Ingreso contractual pagado periódicamente.",
                      ][n - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry highlights */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-medium tracking-tight">
          {isEN ? "Why now" : "¿Por qué ahora?"}
        </h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {[
            isEN
              ? {
                  t: "Resilient demand",
                  d: "Industry with ~92-96% occupancy and sticky tenants.",
                }
              : {
                  t: "Demanda resiliente",
                  d: "Industria con ~92-96% de ocupación promedio y tenencia estable.",
                },
            isEN
              ? {
                  t: "Large, mature market",
                  d: "+51,000 facilities in the U.S.; ~USD 35B annual revenue.",
                }
              : {
                  t: "Mercado grande y maduro",
                  d: "+51.000 edificios en EE.UU.; ~USD 35B de facturación anual.",
                },
            isEN
              ? {
                  t: "USD income",
                  d: "Fixed rents and professional operators reduce volatility.",
                }
              : {
                  t: "Ingresos en USD",
                  d: "Renta fija contractual y operadores profesionales disminuyen la volatilidad.",
                },
          ].map((card, i) => (
            <li
              key={`ind-${i}`}
              className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
            >
              <div
                className="mb-2 h-[2px] w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.25), rgba(212,175,55,.0))",
                }}
              />
              <p className="font-medium tracking-tight text-white">{card.t}</p>
              <p className="mt-1 text-[13px] text-white/80">{card.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[12px] text-neutral-500">
          {isEN
            ? "Sources: BAS Storage / BAS Academy presentations and public market reports."
            : "Fuentes: presentaciones de BAS Storage / BAS Academy y reportes públicos de mercado."}
        </p>
      </section>

      {/* Propuesta BAS (resumen comercial) */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-medium tracking-tight">
          {isEN ? "BAS proposal for investors" : "Propuesta BAS para inversores"}
        </h2>
        <div className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-6 text-white overflow-hidden">
          <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
          <ul className="grid gap-2 sm:grid-cols-2 text-[15px] leading-[1.7] text-white/95">
            <li>✓ {isEN ? "Entry from ~USD 50,000 with individual deed" : "Desde ~USD 50.000 con escritura individual"}</li>
            <li>✓ {isEN ? "Fixed rent (7% Y1 / 6% Y2) contractual" : "Renta fija contractual (7% Año 1 / 6% Año 2)"}</li>
            <li>✓ {isEN ? "Quarterly distributions (passive income)" : "Distribuciones trimestrales (ingreso pasivo)"}</li>
            <li>✓ {isEN ? "No vacancy or operating expenses for investor" : "Sin vacancia ni gastos para el inversor"}</li>
            <li>✓ {isEN ? "Easy exit (broker for resale)" : "Salida fácil (bróker para reventa)"}</li>
          </ul>
          <p className="mt-2 text-[12px] text-white/60">
            {isEN
              ? "According to BAS Storage proposal and webinar materials."
              : "Según propuesta y materiales de BAS Storage."}
          </p>
        </div>
      </section>

      {/* Project: Callaway only */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-medium tracking-tight">
          {isEN ? "Available storage" : "Storage disponible"}
        </h2>
        <article className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-6 text-white overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full"
            style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[15px] leading-[1.75] text-white"><strong>{callaway.name}</strong> — {callaway.city}</p>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-[14px] text-white/90">
                <li>{isEN ? "Units" : "Unidades"}: {callaway.units}</li>
                <li>{isEN ? "Rentable sqft" : "ft² rentables"}: {callaway.rentableSqft.toLocaleString()}</li>
                <li>{isEN ? "Occupancy" : "Ocupación"}: {(callaway.occupancy * 100).toFixed(0)}%</li>
                <li>{isEN ? "Lot (acres)" : "Lote (acres)"}: {callaway.lotAcres}</li>
                <li>{isEN ? "Year built" : "Año"}: {callaway.yearBuilt}</li>
              </ul>
              {/* CTA específico para Callaway */}
              <div className="mt-3 flex gap-3">
                <a
                  href={`https://wa.me/17542673931?text=${encodeURIComponent(
                    isEN
                      ? "Hi Esteban, I'd like to see the numbers for Callaway Self Storage."
                      : "Hola Esteban, quiero ver los números de Callaway Self Storage."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/25 px-4 text-sm font-medium text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
                >
                  {isEN ? "See numbers" : "Ver números"}
                </a>
              </div>
            </div>
            {/* Thumbnail pequeño */}
            <div className="mt-2 h-40 w-full max-w-[260px] overflow-hidden rounded-md bg-[#F2F4F7] sm:mt-0">
              {/* Placeholder de imagen: reemplazar con la imagen generada en Sora */}
              {/* Subí la imagen a /public/images/storages/callaway-hero.jpg */}
              <img
                src="/images/storages/callaway-hero.jpg"
                alt={isEN ? "Marketing render of self-storage facility" : "Render marketing de self-storage"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Datos locales (resumen) */}
          <div className="mt-4 grid gap-2 text-[14px] sm:grid-cols-3">
            <div className="rounded-md ring-1 ring-white/10 bg-[#0A2540] p-3 text-white">
              <p className="font-medium text-white">{isEN ? "Underbuilt market" : "Mercado insaturado"}</p>
              <p className="text-[13px] text-white/80">{isEN ? "5.63 ft² per capita (5‑mile radius)" : "5.63 ft² per cápita (radio 5 millas)"}</p>
            </div>
            <div className="rounded-md ring-1 ring-white/10 bg-[#0A2540] p-3 text-white">
              <p className="font-medium text-white">{isEN ? "Demographics" : "Demografía"}</p>
              <p className="text-[13px] text-white/80">{isEN ? "Population ~37k; average income ~USD 52k" : "Población ~37k; ingreso promedio hogar ~USD 52k"}</p>
            </div>
            <div className="rounded-md ring-1 ring-white/10 bg-[#0A2540] p-3 text-white">
              <p className="font-medium text-white">{isEN ? "Economy" : "Economía"}</p>
              <p className="text-[13px] text-white/80">{isEN ? "Tourism, port/naval industry and retail" : "Turismo, industria naval y retail"}</p>
            </div>
          </div>
          <p className="mt-2 text-[12px] text-white/60">
            {isEN
              ? "Sources: Callaway Self Storage proposal and BAS materials."
              : "Fuentes: propuesta de Callaway Self Storage y materiales de BAS."}
          </p>
        </article>
      </section>

      {/* Steps */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-medium tracking-tight">
          {isEN ? "How to invest" : "Cómo invertir"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={`s-${n}`}
              className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
            >
              <div
                className="mb-2 h-[2px] w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.25), rgba(212,175,55,.0))",
                }}
              />
              <div className="-mt-[2px] mb-1 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[12px] font-semibold text-white">
                {n}
              </div>
              <p className="font-semibold tracking-tight text-white">
                {isEN
                  ? ["Apply", "Approve", "Close"][n - 1]
                  : ["Aplicar", "Aprobar", "Cerrar"][n - 1]}
              </p>
              <p className="mt-1 text-[13px] text-white/80">
                {isEN
                  ? [
                      "Send documents and submit application.",
                      "Bank confirms amounts and terms.",
                      "Closing with deed and income contract.",
                    ][n - 1]
                  : [
                      "Reuní documentos y enviá la solicitud.",
                      "El banco confirma montos y condiciones.",
                      "Cierre con escritura y contrato de renta.",
                    ][n - 1]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mt-10 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 ring-1 ring-white/10 text-white text-center relative overflow-hidden max-w-[1100px] mx-auto">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
        <div className="mx-auto mb-3 h-[2px] w-24 rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.6), rgba(212,175,55,.0))'}} />
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
          {isEN ? 'Ready to explore storage investments?' : '¿Listo para explorar inversiones en storages?'}
        </h3>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`https://wa.me/17542673931?text=${encodeURIComponent(
              isEN
                ? 'Hi Esteban, I would like to see eligible storage deals.'
                : 'Hola Esteban, me gustaría ver storages elegibles.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white/10 px-5 text-sm font-medium text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            aria-label={
              isEN
                ? 'Request storage options via WhatsApp'
                : 'Consultar opciones de storages por WhatsApp'
            }
          >
            {isEN ? 'WhatsApp' : 'WhatsApp'}
          </a>
          <a
            href={`/${locale}/proyectos`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-medium text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
          >
            {isEN ? 'See catalogue' : 'Ver catálogo'}
          </a>
        </div>
      </section>
    </main>
  );
}