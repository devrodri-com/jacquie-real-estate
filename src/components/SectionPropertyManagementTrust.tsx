// src/components/SectionPropertyManagementTrust.tsx
type Props = { locale: "es" | "en" | "fr" };

export default function SectionPropertyManagementTrust({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN
    ? "Why trust me to manage your property"
    : isFR
      ? "Pourquoi me confier la gestion de votre propriété"
      : "Por qué confiar en mí para gestionar tu propiedad";

  const intro = isEN
    ? "Real follow-up, good judgment, and local presence. I take care of your place with the same attention I’d want for my own."
    : isFR
      ? "Un suivi réel, du discernement et une présence locale. Je prends soin de votre propriété avec l’attention que j’aimerais pour la mienne."
      : "Seguimiento real, criterio y presencia local. Cuido tu propiedad con la misma atención que me gustaría para la mía.";

  const items = isEN
    ? [
        {
          title: "Personal attention",
          text: "You’re not one more unit. You get direct communication and steady follow-up.",
        },
        {
          title: "Good judgment to protect your home",
          text: "I prioritize calm, respectful stays and decisions that preserve your property.",
        },
        {
          title: "Real presence in Miami",
          text: "I’m here to check in, coordinate, and respond quickly when something matters.",
        },
      ]
    : isFR
      ? [
          {
            title: "Attention personnalisée",
            text: "Vous n’êtes pas un dossier de plus. Communication directe et suivi constant.",
          },
          {
            title: "Du discernement pour protéger votre bien",
            text: "Je privilégie des séjours sereins et des décisions qui préservent votre propriété.",
          },
          {
            title: "Une présence réelle à Miami",
            text: "Je suis sur place pour vérifier, coordonner et réagir vite quand il le faut.",
          },
        ]
      : [
          {
            title: "Atención personalizada",
            text: "No sos un caso más. Comunicación directa y seguimiento constante.",
          },
          {
            title: "Criterio para cuidar tu propiedad",
            text: "Priorizo estadías tranquilas y decisiones que protegen tu unidad y tu tranquilidad.",
          },
          {
            title: "Presencia real en Miami",
            text: "Estoy en Miami para supervisar, coordinar y responder rápido cuando importa.",
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

