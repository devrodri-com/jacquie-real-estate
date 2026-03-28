// src/components/SectionAboutJacquieHome.tsx
import Link from "next/link";

type Props = { locale: "es" | "en" | "fr" };

export default function SectionAboutJacquieHome({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN ? "About me" : isFR ? "À propos de moi" : "Sobre mí";
  const intro = isEN
    ? "I'm Jacquie Zarate, a Realtor in Miami. I work with buyers, investors, and property owners looking for personalized guidance, clarity, and support from start to finish."
    : isFR
      ? "Je suis Jacquie Zarate, Realtor à Miami. J'accompagne des acheteurs, investisseurs et propriétaires qui recherchent un accompagnement personnalisé, clair et suivi de bout en bout."
      : "Soy Jacquie Zarate, Realtor en Miami. Acompaño a compradores, inversores y propietarios que buscan una atención personalizada, clara y de principio a fin.";
  const additional = isEN
    ? "I'm originally from Argentina, I speak Spanish and English, and I know Miami, Sunny Isles, and different areas of South Florida closely. What sets me apart is my personal approach, real follow-through, and becoming your trusted contact in Miami."
    : isFR
      ? "Je suis argentine, je parle espagnol et anglais, et je connais bien Miami, Sunny Isles et différentes zones du sud de la Floride. Ce qui me distingue, c'est mon approche personnalisée, mon vrai suivi et le fait de devenir votre personne de confiance à Miami."
      : "Soy argentina, hablo español e inglés, y conozco de cerca Miami, Sunny Isles y distintas zonas del sur de Florida. Mi diferencial está en el trato cercano, el seguimiento real y en convertirme en tu persona de confianza en Miami.";
  const credentials =
    isEN
      ? [
          {
            title: "Realtor in Florida",
            description: "I support buyers, investors, and property owners through purchase, investment, and management processes in Miami.",
          },
          {
            title: "International clients",
            description: "I work with buyers and investors who want clear support from abroad.",
          },
          {
            title: "Real follow-through",
            description: "I'm involved from start to finish so you have a careful, trustworthy experience.",
          },
        ]
      : isFR
        ? [
            {
              title: "Realtor en Floride",
              description: "J'accompagne les processus d'achat, d'investissement et de gestion immobilière à Miami.",
            },
            {
              title: "Clients internationaux",
              description: "Je travaille avec des acheteurs et investisseurs qui recherchent un soutien clair depuis l'étranger.",
            },
            {
              title: "Suivi réel",
              description: "Je m'implique du début à la fin pour une expérience soignée et fiable.",
            },
          ]
        : [
            {
              title: "Realtor en Florida",
              description: "Acompaño procesos de compra, inversión y gestión inmobiliaria en Miami.",
            },
            {
              title: "Clientes internacionales",
              description: "Trabajo con compradores e inversores que buscan apoyo claro desde el exterior.",
            },
            {
              title: "Seguimiento real",
              description: "Me involucro de inicio a fin para que tengas una experiencia cuidada y confiable.",
            },
          ];
  const ctaLabel = isEN ? "Learn more about me" : isFR ? "En savoir plus sur moi" : "Conocé más sobre mí";

  return (
    <section aria-labelledby="about-jacquie-home-title" className="max-w-[1100px] mx-auto px-4">
      <h2 id="about-jacquie-home-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary text-center">
        {title}
      </h2>
      <div className="mt-4 mx-auto max-w-[55ch] text-center space-y-3">
        <p className="text-[15px] leading-[1.7] text-foreground/90">
          {intro}
        </p>
        <p className="text-[15px] leading-[1.7] text-foreground/85">
          {additional}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {credentials.map((item, index) => (
          <div
            key={index}
            className="bg-primary text-primary-foreground rounded-[16px] ring-1 ring-primary-foreground/10 p-5 shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="text-sm font-semibold text-primary-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href={`/${locale}/sobre-mi`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
