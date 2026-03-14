// src/app/[locale]/precon/page.tsx
export default async function Precon({ params }: { params: { locale: 'es' | 'en' } }) {
  const locale = params.locale;
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
          {locale === 'en' ? 'Why invest in pre-construction?' : '¿Por qué invertir en preconstrucción?'}
        </h1>

        <p className="text-[16px] leading-[1.75] text-neutral-800">
          {locale === 'en'
            ? 'Lock today’s price, stage payments during build, capture pre-delivery appreciation and finance at closing. New product, modern amenities and lower maintenance in a globally liquid market.'
            : 'Fijá el precio de hoy, fraccioná pagos durante la obra, capturá plusvalía pre-entrega y financiá al cierre. Producto nuevo, amenities modernas y menor mantenimiento en un mercado global y líquido.'}
        </p>
        <div className="space-y-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`/${locale}/proyectos?tipo=precon`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-medium text-white no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            >
              {locale === 'en' ? 'See pre-sale listings' : 'Ver unidades en preventa'}
            </a>
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ21yM5KOsoq2niX4QY7FXyUrFiLuQpLxw9IIzheIYWY1ruSBHG5DUrSzUmGst3Ew4nb8ZKw6ptP"
              rel="noopener"
              target="_blank"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/25 bg-white px-4 text-sm font-medium text-[#0A2540] no-underline hover:bg-[#0A2540]/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            >
              {locale === 'en' ? 'Calculate your plan' : 'Calculá tu plan'}
            </a>
          </div>
          <p className="text-[12px] text-neutral-500">{locale === 'en' ? 'filtered by 2025-2028 deliveries' : 'filtradas por entregas 2025-2028'}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          {locale === 'en' ? 'Model & advantages' : 'Modelo y ventajas'}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            locale === 'en' ? ['Staged payments 20/10/10/60','Reserve, contract, milestones, closing'] : ['Pagos 20/10/10/60','Reserva, contrato, hitos, cierre'],
            locale === 'en' ? ['No mortgage until closing','Finance the balance at closing'] : ['Sin hipoteca hasta entrega','Financiás el saldo al cierre'],
            locale === 'en' ? ['Today’s price for future asset','Capture appreciation during build'] : ['Precio de hoy por activo futuro','Capturás plusvalía en obra'],
            locale === 'en' ? ['Financing ~70-75% LTV','Available even for foreigners'] : ['Financiación ~70-75% LTV','Incluso para extranjeros']
          ].map(([title, micro], i) => (
            <div key={i} className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white">
              <div className="absolute left-4 right-4 top-0 h-[2px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
              <p className="text-[15px] leading-6 font-medium text-white">{title}</p>
              <p className="text-[12px] text-white/80">{micro as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">{locale === 'en' ? 'Historical performance (10-year lens)' : 'Desempeño histórico (últimos 10 años)'}</h2>
        <div className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-5 text-white overflow-hidden">
          <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
          <p className="text-[15px] leading-7 text-white/95">
            {locale === 'en'
              ? 'Early buyers in core zones frequently captured double-digit uplift between launch and completion.'
              : 'Quienes compran temprano en zonas core suelen capturar alzas de dos dígitos entre lanzamiento y entrega.'}
          </p>
          <p className="mt-1 text-[12px] text-white/70 italic">{locale === 'en' ? 'Sources: MLS, Case-Shiller, developer reports.' : 'Fuentes: MLS, Case-Shiller, reportes de desarrolladores.'}</p>
        </div>
      </section>

      {/* Beneficios fiscales */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          {locale === 'en' ? 'Tax benefits (U.S.)' : 'Beneficios fiscales (EE.UU.)'}
        </h2>
        <p className="text-[14px] text-neutral-600">{locale === 'en' ? 'How policy improves your net ROI' : 'Cómo mejora tu ROI neto'}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            locale === 'en' ? ['Deductible mortgage interest (rental use)','Lower taxable income'] : ['Intereses deducibles (si se renta)','Baja base imponible'],
            locale === 'en' ? ['Depreciation + cost segregation','Accelerated deductions'] : ['Depreciación + segregación de costos','Deducciones aceleradas'],
            locale === 'en' ? ['1031 exchange: defer gains','Defer capital gains'] : ['Intercambio 1031 (diferí la ganancia)','Diferí impuesto a la ganancia']
          ].map(([title, micro], i) => (
            <div
              key={i}
              className="relative flex items-start gap-3 rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
            >
              <div
                className="h-10 w-[3px] rounded-full"
                style={{ background: 'linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))' }}
              />
              <div>
                <p className="text-[15px] leading-6 font-medium text-white">{title}</p>
                <p className="text-[12px] text-white/80">{micro as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparativa internacional */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">{locale === 'en' ? 'Why Miami vs. other markets' : '¿Por qué Miami vs. otras plazas?'}</h2>
        <p className="text-[14px] text-neutral-600">{locale === 'en' ? 'Legal certainty, liquidity and leverage' : 'Seguridad jurídica, liquidez y apalancamiento'}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            locale === 'en' ? ['Legal certainty (title insurance)'] : ['Seguridad jurídica (seguro de título)'],
            locale === 'en' ? ['Global liquidity; strong cash buyer base'] : ['Liquidez global; alta base de cash buyers'],
            locale === 'en' ? ['Financing access for foreign buyers'] : ['Financiación para extranjeros'],
            locale === 'en' ? ['Transparent market (MLS data)'] : ['Mercado transparente (datos MLS)']
          ].map(([text], i) => (
            <div
              key={i}
              className="rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white flex items-start gap-3"
            >
              <div
                className="h-10 w-[3px] rounded-full"
                style={{ background: 'linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))' }}
              />
              <p className="text-[15px] leading-6 text-white/95">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apalancamiento inteligente */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">{locale === 'en' ? 'Smart leverage' : 'Apalancamiento inteligente'}</h2>
        <p className="text-[14px] text-neutral-600">{locale === 'en' ? 'How debt multiplies returns responsibly' : 'Cómo la deuda multiplica retornos con control'}</p>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-200 z-0" />
          <div className="relative grid gap-3 md:grid-cols-3 z-10">
            {[
              locale === 'en' ? ['01','30-year fixed, predictable payments'] : ['01','Fija 30 años, pagos predecibles'],
              locale === 'en' ? ['02','Refinance: lower rate or cash-out'] : ['02','Refinanciá: menor tasa o cash-out'],
              locale === 'en' ? ['03','Tax shield: interest + depreciation'] : ['03','Escudo fiscal: interés + depreciación']
            ].map(([step, text], i) => (
              <div
                key={i}
                className="relative flex items-center gap-3 rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
              >
                <div
                  className="h-10 w-[3px] rounded-full"
                  style={{ background: 'linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))' }}
                />
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 min-w-[40px] items-center justify-center rounded-full bg-white/10 px-3 text-[12px] font-semibold text-white ring-1 ring-white/20 leading-none">{step}</span>
                  <p className="text-[15px] leading-6 text-white/95">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-5 text-white overflow-hidden">
          <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <p className="text-[13px] font-medium text-white">{locale === 'en' ? 'Assumptions' : 'Supuestos'}</p>
              <p className="font-mono text-[13px] text-white/85">{locale === 'en' ? 'Price $500k · 30% down · +10% appreciation' : 'Precio $500k · 30% down · +10% apreciación'}</p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-white">{locale === 'en' ? 'Result' : 'Resultado'}</p>
              <p className="font-mono text-[13px] text-white/85">{locale === 'en' ? 'ROI on equity ≈ 33%' : 'ROI sobre equity ≈ 33%'}</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-white/70 italic">{locale === 'en' ? 'Illustrative, not financial advice.' : 'Ilustrativo, no es asesoramiento financiero.'}</p>
        </div>
      </section>

      {/* Tendencias actuales */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          {locale === 'en' ? 'Current trends' : 'Tendencias actuales'}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            locale === 'en'
              ? ['STR-friendly projects (Airbnb/30-day) in allowed zones','Short-term rental flexibility in the right buildings']
              : ['Proyectos STR-friendly (Airbnb/30 días) en zonas permitidas','Flexibilidad de renta corta en edificios aptos'],
            locale === 'en'
              ? ['Amenities for rentability: coworking, wellness, fit-out','Modern design supports higher demand and rates']
              : ['Amenidades pro-renta: coworking, wellness, fit-out','Diseño moderno que impulsa demanda y tarifas']
          ].map(([title, micro], i) => (
            <div key={i} className="relative flex items-start gap-3 rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white">
              <div className="h-10 w-[3px] rounded-full" style={{background:'linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))'}} />
              <div>
                <p className="text-[15px] leading-6 font-medium text-white">{title}</p>
                <p className="text-[12px] text-white/80">{micro as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusiones y perfil de inversor */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">
          {locale === 'en' ? 'Conclusions & investor fit' : 'Conclusiones y perfil de inversor'}
        </h2>
        <p className="text-[15px] leading-7 text-neutral-800">
          {locale === 'en'
            ? 'Best for 3-10 year horizons seeking appreciation, leverage and USD cashflow. Ideal for foreign buyers and diversified portfolios.'
            : 'Ideal para horizontes de 3-10 años que buscan apreciación, apalancamiento y flujo en USD. Perfecto para extranjeros y carteras diversificadas.'}
        </p>
      </section>

      {/* Key takeaways */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">{locale === 'en' ? 'Key takeaways' : 'Puntos clave'}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            locale === 'en' ? ['Staged entry','Finance at closing'] : ['Entrada escalonada','Financiás al cierre'],
            locale === 'en' ? ['Pre-delivery uplift','New product premium'] : ['Plusvalía pre-entrega','Producto premium'],
            locale === 'en' ? ['Leverage up to ~75% LTV','Higher ROI on equity'] : ['Apalancamiento hasta ~75% LTV','Mayor ROI sobre equity'],
            locale === 'en' ? ['Tax-efficient net returns','Interest + depreciation'] : ['Retornos netos eficientes','Interés + depreciación'],
            locale === 'en' ? ['Global demand','Exit liquidity'] : ['Demanda global','Liquidez de salida']
          ].map(([title, micro], i) => (
            <div key={i} className="relative flex items-start gap-3 rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white">
              <div className="h-10 w-[3px] rounded-full" style={{background:'linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))'}} />
              <div>
                <p className="text-[15px] leading-6 font-medium text-white">{title}</p>
                <p className="text-[12px] text-white/80">{micro as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs rápidas */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">FAQ</h2>
        <div className="divide-y divide-neutral-200 rounded-lg border border-primary/10 bg-white">
          <div className="px-4 py-3">
            <p className="text-[14px] font-semibold text-[#0A2540]">{locale === 'en' ? 'Typical payment plan' : 'Plan de pago típico'}</p>
            <p className="text-[13px] text-neutral-700">{locale === 'en' ? '20/10/10/60 over ~24-36 months.' : '20/10/10/60 en ~24-36 meses.'}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[14px] font-semibold text-[#0A2540]">{locale === 'en' ? 'Foreign financing' : 'Financiación a extranjeros'}</p>
            <p className="text-[13px] text-neutral-700">{locale === 'en' ? 'Up to ~70-75% LTV at closing.' : 'Hasta ~70-75% LTV al cierre.'}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[14px] font-semibold text-[#0A2540]">{locale === 'en' ? 'Rental flexibility' : 'Flexibilidad de renta'}</p>
            <p className="text-[13px] text-neutral-700">{locale === 'en' ? 'Airbnb/30-day minimum depends on building & zoning.' : 'Airbnb/30 días depende del edificio y la zonificación.'}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[14px] font-semibold text-[#0A2540]">{locale === 'en' ? 'Completion timeline' : 'Plazo de entrega'}</p>
            <p className="text-[13px] text-neutral-700">{locale === 'en' ? 'Most projects ~2-3 years.' : 'La mayoría de proyectos ~2-3 años.'}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 ring-1 ring-white/10 text-white text-center relative overflow-hidden max-w-[1100px] mx-auto">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
        <div className="mx-auto mb-3 h-[2px] w-24 rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,.0), rgba(212,175,55,.6), rgba(212,175,55,.0))'}} />
        <p className="mb-3 text-[14px] text-white/90">{locale === 'en' ? 'Ready to see numbers and available units?' : '¿Listo para ver números y unidades disponibles?'}</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`/${locale}/proyectos?tipo=precon`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-white/10 px-4 text-sm font-medium text-white no-underline hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
          >
            {locale === 'en' ? 'Browse pre-sale listings' : 'Ver unidades en preventa'}
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ21yM5KOsoq2niX4QY7FXyUrFiLuQpLxw9IIzheIYWY1ruSBHG5DUrSzUmGst3Ew4nb8ZKw6ptP"
            rel="noopener"
            target="_blank"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/25 bg-transparent px-4 text-sm font-medium text-white no-underline hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
          >
            {locale === 'en' ? 'Plan a 15-min strategy call' : 'Agendá una asesoría de 15 min'}
          </a>
        </div>
      </section>
    </main>
  );
}