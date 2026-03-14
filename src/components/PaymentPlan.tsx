// src/components/PaymentPlan.tsx
import React from "react";

type PaymentStep = {
  label: string;
  description?: string;
  id?: string; // opcional para keys estables y analytics
};

const DISCLAIMER_ES =
  "Los planes de pago pueden modificarse sin previo aviso. Consulte su contrato de compraventa para conocer los requisitos exactos de depósito.";
const DISCLAIMER_EN =
  "Deposit schedules are subject to change without notice. Please refer to your purchase agreement for exact deposit requirements.";

type PaymentPlanProps = {
  steps: PaymentStep[];
  id?: string;
  title?: string;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
  project?: string;
  /** Locale para el disclaimer legal (es | en) */
  locale?: "es" | "en";
  /** Negrita del primer token del label (por defecto true) */
  emphasizeFirstToken?: boolean;
  /** Variante visual del badge numerado */
  variant?: "filled" | "outline";
};

const PaymentPlan: React.FC<PaymentPlanProps> = ({
  steps,
  id,
  title,
  className = "",
  headingLevel = "h3",
  project = "",
  locale = "es",
  emphasizeFirstToken = true,
  variant = "filled",
}) => {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      className={`rounded-[10px] bg-[#0A2540] p-6 sm:p-7 ring-1 ring-white/10 text-white relative overflow-hidden ${className}`}
      aria-label={title ?? "Plan de pagos"}
      data-project={project || undefined}
    >
      <div
        className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full"
        style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))' }}
      />
      {title ? (
        <Heading className="mb-2.5 text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">{title}</Heading>
      ) : null}

      <ol className="flex flex-col space-y-[11px] mt-2 sm:mt-3">
        {steps.map((step, index) => {
          const [firstToken, ...restTokens] = step.label.split(" ");
          const restLabel = restTokens.join(" ");
          const numberBadgeBase =
            "flex flex-shrink-0 select-none items-center justify-center rounded-full mr-4 w-8 h-8 font-semibold transition-colors";
          const numberBadge =
            variant === "filled"
              ? `${numberBadgeBase} bg-white/15 text-white ring-1 ring-white/20`
              : `${numberBadgeBase} border border-white/25 text-white bg-transparent`;

          const labelContent = emphasizeFirstToken ? (
            <>
              <span className="font-semibold">{firstToken}</span>
              {restLabel ? " " + restLabel : ""}
            </>
          ) : (
            step.label
          );

          const aria = `${index + 1}. ${step.label}${
            step.description ? ` — ${step.description}` : ""
          }`;

          return (
            <li
              key={step.id ?? `${index}-${step.label}`}
              className="flex items-center"
              aria-label={aria}
            >
              <span aria-hidden className={numberBadge}>
                {index + 1}
              </span>
              <div>
                <p className="text-[16px] leading-[26px] text-white/95">{labelContent}</p>
                {step.description ? (
                  <p className="mt-1 text-[14px] leading-[22px] text-white/80">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      {steps.length > 0 ? (
        <p className="mt-4 text-[12px] leading-[18px] text-white/60">
          {locale === "en" ? DISCLAIMER_EN : DISCLAIMER_ES}
        </p>
      ) : null}
    </section>
  );
};

export default PaymentPlan;
