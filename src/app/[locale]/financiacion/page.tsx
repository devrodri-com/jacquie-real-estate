// src/app/[locale]/financiacion/page.tsx
import React from "react";
import es from "@/i18n/messages/es.json";
import en from "@/i18n/messages/en.json";

type StepT = { t: string; d: string };
interface FinancingT {
  title: string;
  seo: string;
  intro: string;
  benefitsTitle: string;
  benefits: ({ text: string; microcopy?: string } | string)[];
  reqTitle: string;
  requirements: string[];
  processTitle: string;
  steps: StepT[];
  ctaLabel: string;
  ctaHref: string;
}
interface Messages {
  financing: FinancingT;
}
type Benefit = { text: string; microcopy?: string } | string;
type NormalizedBenefit = { text: string; microcopy: string };

function getDict(locale: string): Messages {
  return (locale === "en" ? (en as unknown as Messages) : (es as unknown as Messages));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const dict = getDict(params?.locale);
  const t = dict.financing;
  return {
    title: t.title,
    description: t.seo,
    alternates: {
      languages: {
        en: "/en/financiacion",
        es: "/es/financiacion",
      },
    },
  };
}

// Icon components for steps
const FormIcon = () => (
  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6M5 7h14v10H5V7z" />
  </svg>
);
const BankIcon = () => (
  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-6 9 6M4 10v10h16V10" />
  </svg>
);
const SignatureIcon = () => (
  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l4-4m0 0l-4-4m4 4H8" />
  </svg>
);

export default function FinancingPage({ params }: { params: { locale: string } }) {
  const dict = getDict(params?.locale);
  const t = dict.financing;

  // Normalize benefits to objects and sort
  const normalizedBenefits: NormalizedBenefit[] = (t.benefits as Benefit[]).map((b): NormalizedBenefit =>
    typeof b === 'string' ? { text: b, microcopy: '' } : { text: b.text, microcopy: b.microcopy ?? '' }
  );
  const sortedBenefits = [...normalizedBenefits].sort((a, b) => b.text.length - a.text.length);

  // Map step icons by index
  const stepIcons = [<FormIcon key="icon-0" />, <BankIcon key="icon-1" />, <SignatureIcon key="icon-2" />];

  // Active verbs for step titles - replace original titles with active verbs
  // Since we don't have the original titles here, we keep the original but prepend active verbs for demonstration
  // In real case, t.steps should have active verb titles, but we'll prepend "Complete", "Visit", "Sign" for example
  const activeVerbTitles = t.steps.map((step, i) => {
    const verbs = ["Complete", "Visit", "Sign"];
    return {
      ...step,
      t: `${verbs[i] || "Step"} ${step.t}`,
    };
  });

  const ariaLabelCTA = params.locale === "en" ? "Apply for financing - opens in new tab" : "Solicitar financiación - se abre en una nueva pestaña";
  const trustMicrocopy = params.locale === "en" ? "Response in Miami local time" : "Respuesta en horario local de Miami";

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-12 text-[#0A2540]">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">{t.title}</h1>
        <p className="mb-8 max-w-[60ch] text-[15px] leading-[1.75]">{t.intro}</p>

        <h2 className="mb-4 text-xl font-medium">{t.benefitsTitle}</h2>
        <ul className="mb-10 grid gap-3 md:grid-cols-2">
          {sortedBenefits.map((b, i) => (
            <li
              key={`b-${i}`}
              className="relative flex flex-col items-start gap-1 rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
            >
              <div className="flex items-center gap-3 w-full">
                <span
                  aria-hidden
                  className="h-6 w-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(212,175,55,.3), rgba(212,175,55,.08))",
                  }}
                />
                <p className="text-[15px] leading-6 text-white/95">{b.text}</p>
              </div>
              <p className="ml-[calc(3px+0.75rem)] text-[13px] text-white/80">{b.microcopy}</p>
            </li>
          ))}
        </ul>

        <h2 className="mb-4 text-xl font-medium">{t.reqTitle}</h2>
        <div className="mb-10 relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-6 text-white overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))",
            }}
          />
          <ul className="grid grid-cols-1 gap-2 text-[15px] md:grid-cols-2 text-white/95">
            {t.requirements.map((r, i) => (
              <li
                key={`r-${i}`}
                className="flex items-center gap-2"
              >
                <span className="text-white text-lg leading-none select-none">✔︎</span>
                <span className="list-none">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <h2 className="mb-4 text-xl font-medium">{t.processTitle}</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {activeVerbTitles.map((s: StepT, i) => (
            <div
              key={`s-${i}`}
              className="relative rounded-[10px] ring-1 ring-white/10 bg-[#0A2540] p-4 sm:p-5 text-white"
            >
              <div
                className="mb-2 h-[2px] w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))",
                }}
              />
              <div className="mb-1 flex items-center gap-2">
                <div className="inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[12px] font-semibold text-white" style={{ position: 'relative', top: '-2px' }}>
                  {i + 1}
                </div>
                {stepIcons[i]}
                <p className="font-semibold tracking-tight text-white">{s.t}</p>
              </div>
              <p className="mt-1 text-[13px] text-white/80">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <a
            href={t.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabelCTA}
            className="inline-flex items-center justify-center rounded-md bg-[#0A2540] px-6 py-3 font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20"
          >
            {t.ctaLabel}
          </a>
          <p className="mt-2 text-[13px] text-[#0A2540]/70">{trustMicrocopy}</p>
        </div>
      </section>
    </main>
  );
}