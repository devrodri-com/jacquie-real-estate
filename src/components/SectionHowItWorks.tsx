// src/components/SectionHowItWorks.tsx
type Props = { locale: "es" | "en" | "fr" };

export default function SectionHowItWorks({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN ? "How it works" : isFR ? "Comment ça fonctionne" : "Cómo funciona";
  const intro = isEN
    ? "Whether you’re considering investing or already own a property, I guide you through the entire process."
    : isFR
      ? "Que vous envisagiez d’investir ou que vous possédiez déjà un bien, je vous accompagne tout au long du processus."
      : "Ya sea que estés evaluando invertir o ya tengas una propiedad, te acompaño en todo el proceso.";

  const stepLabel = isEN ? "Step" : isFR ? "Étape" : "Paso";

  const steps = isEN
    ? [
        "You tell me where you are in the process and what you’re looking for.",
        "I guide you so you can make clear decisions, whether you’re buying or getting ready to rent.",
        "We get your property set up for short-term rentals, optimizing occupancy and performance.",
        "I handle the day-to-day management so everything runs smoothly without hassle.",
      ]
    : isFR
      ? [
          "Vous me dites où vous en êtes et ce que vous recherchez.",
          "Je vous conseille pour prendre des décisions claires, que ce soit pour acheter ou commencer à louer.",
          "Nous mettons votre bien en location courte durée en optimisant l’occupation et le rendement.",
          "Je m’occupe de la gestion quotidienne pour que tout fonctionne parfaitement, sans complications.",
        ]
      : [
          "Me contás en qué etapa estás y qué estás buscando.",
          "Te asesoro para tomar decisiones claras, ya sea para comprar o empezar a rentar.",
          "Ponemos la propiedad a trabajar con renta corta, optimizando ocupación y rendimiento.",
          "Me encargo del día a día para que todo funcione bien y sin complicaciones.",
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

      <ol className="mt-10 grid gap-5 sm:grid-cols-2">
        {steps.map((step, idx) => (
          <li
            key={step}
            className="rounded-[14px] border border-primary/10 bg-primary/[0.03] p-5 shadow-sm"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
              {stepLabel} {idx + 1}
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
