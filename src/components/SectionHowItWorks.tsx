// src/components/SectionHowItWorks.tsx
type Props = { locale: "es" | "en" | "fr" };

export default function SectionHowItWorks({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN
    ? "How we work together"
    : isFR
      ? "Comment on travaille ensemble"
      : "Cómo trabajamos juntos";
  const intro = isEN
    ? "Everything stays simple: clear communication, consistent follow-up, and someone you can trust on the ground in Miami."
    : isFR
      ? "L’idée est simple : de la clarté, un suivi constant et une personne de confiance sur place à Miami."
      : "La idea es simple: claridad, seguimiento constante y alguien de confianza en Miami, sin complicarte.";

  const steps = isEN
    ? [
        "You share your property details and what you want to achieve.",
        "Together, we define the best way to protect it and keep it running smoothly.",
        "I take care of the follow-up and day-to-day management in Miami.",
      ]
    : isFR
      ? [
          "Vous me parlez de votre propriété et de votre objectif.",
          "On définit ensemble la meilleure façon de la protéger et de bien la faire fonctionner.",
          "Je prends en charge le suivi et la gestion au quotidien à Miami.",
        ]
      : [
          "Me contás tu propiedad y qué querés lograr.",
          "Definimos juntos la mejor forma de cuidarla y que funcione bien.",
          "Yo me ocupo del seguimiento y la gestión diaria en Miami.",
        ];

  return (
    <section aria-labelledby="how-it-works-title" className="max-w-[1100px] mx-auto px-4">
      <div className="max-w-[72ch]">
        <h2 id="how-it-works-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="mt-3 max-w-[82ch] text-[16px] leading-[1.75] text-foreground/78">
          {intro}
        </p>
      </div>

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, idx) => (
          <li
            key={step}
            className="rounded-[14px] border border-primary/10 bg-primary/[0.03] p-5 shadow-sm"
          >
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/10 px-2 text-[11px] font-semibold text-primary/75">
              {idx + 1}
            </span>
            <p className="mt-3 text-[18px] leading-[1.55] font-medium tracking-tight text-primary">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
