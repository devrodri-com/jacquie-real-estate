// src/components/SectionPropertyManagementTrust.tsx
type Props = { locale: "es" | "en" | "fr" };

export default function SectionPropertyManagementTrust({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN
    ? "Why work with me"
    : isFR
      ? "Pourquoi travailler avec moi"
      : "Por qué trabajar conmigo";

  const intro = isEN
    ? "I don’t offer an impersonal management service. I get involved in each property with criteria, attention, and direct follow-up."
    : isFR
      ? "Je ne propose pas une gestion impersonnelle. Je m'implique dans chaque propriété avec discernement, attention et suivi direct."
      : "No ofrezco una gestión impersonal. Me involucro en cada propiedad con criterio, atención y seguimiento directo.";

  const items = isEN
    ? [
        {
          title: "Personalized attention",
          text: "Each property and every guest receive direct, close follow-up.",
        },
        {
          title: "Careful guest selection",
          text: "I prioritize calm profiles, families, and referrals to take care of your unit.",
        },
        {
          title: "Your trusted person in Miami",
          text: "I am in Miami to solve issues, coordinate, and take care of your property as if it were my own.",
        },
      ]
    : isFR
      ? [
          {
            title: "Attention personnalisée",
            text: "Chaque propriété et chaque invité bénéficient d'un suivi direct et rapproché.",
          },
          {
            title: "Sélection soigneuse des invités",
            text: "Je privilégie les profils calmes, les familles et les personnes recommandées pour protéger votre unité.",
          },
          {
            title: "Votre personne de confiance à Miami",
            text: "Je suis à Miami pour résoudre, coordonner et prendre soin de votre propriété comme si c'était la mienne.",
          },
        ]
      : [
          {
            title: "Atención personalizada",
            text: "Cada propiedad y cada huésped reciben seguimiento directo y cercano.",
          },
          {
            title: "Selección cuidadosa de huéspedes",
            text: "Priorizo perfiles tranquilos, familias y referidos para cuidar tu unidad.",
          },
          {
            title: "Tu persona de confianza en Miami",
            text: "Estoy en Miami para resolver, coordinar y cuidar tu propiedad como si fuera propia.",
          },
        ];

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-10">
      <div className="max-w-[60ch]">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-[1.7] text-foreground/85">
          {intro}
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[12px] ring-1 ring-primary-foreground/10 bg-primary p-5 text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="text-[15px] font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-primary-foreground/80">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

