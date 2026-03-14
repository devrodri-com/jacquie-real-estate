// src/app/[locale]/sobre-mi/page.tsx
import Image from 'next/image';
import { MapPinIcon, GlobeAltIcon, AcademicCapIcon, ChartBarIcon, ShieldCheckIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default async function SobreMi({
  params,
}: {
  params: { locale: 'es' | 'en' }
}) {
  const locale = params?.locale || 'es';
  const isEN = locale === 'en';

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-12">
      {/* Profile */}
      <section aria-labelledby="about-card-title" className="relative rounded-[12px] ring-1 ring-white/10 bg-[#0A2540] p-6 sm:p-7 grid gap-6 sm:grid-cols-[180px,1fr] text-white overflow-hidden">
        <h3 id="about-card-title" className="sr-only">{isEN ? 'Advisor profile' : 'Perfil del asesor'}</h3>
        <div
          className="pointer-events-none absolute inset-x-6 sm:inset-x-7 top-0 h-[1.5px] rounded-full"
          style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}}
        />
        <div className="mb-4">
          <h1 className="text-[22px] sm:text-[24px] font-semibold tracking-tight text-white">
            {isEN ? 'About me' : 'Sobre mí'}
          </h1>
          <p className="mt-1 max-w-[60ch] text-white/85 leading-relaxed">
            {isEN
              ? 'I advise real‑estate investors in Miami throughout the entire process —from selecting the right project to closing— with a clear focus on ROI and capital preservation.'
              : 'Asesoro a inversores en Miami durante todo el proceso desde la selección del proyecto hasta el cierre con foco claro en ROI y preservación de capital.'}
          </p>
        </div>
        <div className="relative h-44 w-44 overflow-hidden rounded-xl ring-1 ring-white/20 sm:h-48 sm:w-48">
          <Image src="/images/Esteban.jpg" alt="Esteban Firpo" fill sizes="160px" className="object-cover" />
        </div>
        <div className="space-y-4">
          {/* Elegant credentials block */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 border-b border-white/10 pb-3 text-white text-[13px] font-light">
            <div className="flex items-center space-x-1">
              <MapPinIcon className="h-4 w-4 text-white" aria-hidden="true" />
              <span className="text-white/75">{isEN ? 'Miami' : 'Miami'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GlobeAltIcon className="h-4 w-4 text-white" aria-hidden="true" />
              <span className="text-white/75">ES · EN</span>
            </div>
            <div className="flex items-center space-x-1">
              <AcademicCapIcon className="h-4 w-4 text-white" aria-hidden="true" />
              <span className="text-white/75">{isEN ? 'FL License' : 'Lic. Florida'}</span>
            </div>
          </div>
          {/* Bio in two paragraphs */}
          <div className="space-y-3 text-white/90 leading-7 max-w-[60ch]">
            <p>
              {isEN
                ? 'Born in Paysandú (Uruguay). I studied Engineering in Montevideo and led Magenta for 15+ years, making it one of the most important printing companies in Uruguay’s interior and still operating today.'
                : 'Nací en Paysandú (Uruguay). Estudié Ingeniería en Montevideo y durante más de 15 años dirigí Magenta, que es una de las imprentas más importantes del interior del país y al día de hoy sigue operando.'}
            </p>
            <p>
              {isEN
                ? 'Now based in Miami, I advise investors on pre‑construction and strategic opportunities. I prioritize solid developers, the math behind the ROI, and planning the exit before entering. I guide the full cycle: project selection, due diligence, reservation and contract, construction milestones, financing at closing, and title transfer. I coordinate with attorneys, lenders, and property management; I work in Spanish and English.'
                : 'Hoy en Miami, asesoro a inversores en preconstrucción y oportunidades estratégicas. Priorizo desarrolladores sólidos, los números detrás del ROI y planificar la salida antes de entrar. Acompaño todo el ciclo: selección de proyecto, debida diligencia, reserva y contrato, hitos de obra, financiación al cierre y traspaso de título. Coordino con abogados, lenders y property management; trabajo en español e inglés.'}
            </p>
          </div>
          {/* services grid */}
          <div className="grid gap-3 md:grid-cols-3">
            <div className="relative rounded-[12px] ring-1 ring-white/10 bg-[#0A2540] p-4 text-white">
              <div className="mb-2 h-[2px] w-full rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
              <div className="flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-white" aria-hidden="true" />
                <div className="text-[14.5px] leading-6 text-white">
                  <p className="font-medium">{isEN ? 'ROI & strategy' : 'ROI y estrategia'}</p>
                  <p className="text-[12px] text-white/80">{isEN ? 'Project and exit analysis' : 'Análisis de proyecto y salida'}</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[12px] ring-1 ring-white/10 bg-[#0A2540] p-4 text-white">
              <div className="mb-2 h-[2px] w-full rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                <div className="text-[14.5px] leading-6 text-white">
                  <p className="font-medium">{isEN ? 'Reliable developers' : 'Desarrolladores confiables'}</p>
                  <p className="text-[12px] text-white/80">{isEN ? 'Curated opportunities' : 'Curaduría de oportunidades'}</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[12px] ring-1 ring-white/10 bg-[#0A2540] p-4 text-white">
              <div className="mb-2 h-[2px] w-full rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
              <div className="flex items-center gap-2">
                <ClipboardDocumentListIcon className="h-5 w-5 text-white" aria-hidden="true" />
                <div className="text-[14.5px] leading-6 text-white">
                  <p className="font-medium">{isEN ? 'End‑to‑end process' : 'Proceso integral'}</p>
                  <p className="text-[12px] text-white/80">{isEN ? 'Documentation & closing' : 'Documentación y cierre'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
        <a
          href="mailto:esteban@miamiliferealty.com"
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#0A2540] px-5 text-white text-[14px] font-medium hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
        >
          {isEN ? 'Email Esteban' : 'Escribir a Esteban'}
        </a>
        <a
          href="https://wa.me/17542673931"
          target="_blank"
          rel="noreferrer"
          title="WhatsApp +1 754 267 3931"
          className="inline-flex h-11 items-center justify-center rounded-md border border-[#0A2540] px-5 text-[#0A2540] text-[14px] font-medium hover:bg-[#0A2540]/10 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
        >
          {isEN ? 'WhatsApp' : 'Hablá por WhatsApp'}
        </a>
      </section>
    </main>
  );
}