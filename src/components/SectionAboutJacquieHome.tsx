// src/components/SectionAboutJacquieHome.tsx
import Link from "next/link";

type Props = { locale: "es" | "en" | "fr" };

export default function SectionAboutJacquieHome({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN ? "About me" : isFR ? "À propos de moi" : "Sobre mí";
  const intro = isEN
    ? "I'm Jacquie Zárate, a realtor in Miami. I support buyers, investors, and property owners looking for personalized guidance from start to finish."
    : isFR
      ? "Je suis Jacquie Zárate, realtor à Miami. J’accompagne les acheteurs, investisseurs et propriétaires qui recherchent un accompagnement personnalisé du début à la fin."
      : "Soy Jacquie Zárate, realtor en Miami. Acompaño a compradores, inversores y propietarios que buscan una atención personalizada de principio a fin.";
  const additional = isEN
    ? "I was born in Buenos Aires, Argentina, and I bring more than 15 years of Finance experience working with S&P 500 companies. In Miami, I have worked in Real Estate and Property Management since 2023."
    : isFR
      ? "Je suis née à Buenos Aires, en Argentine, et je compte plus de 15 ans d’expérience en finances au sein d’entreprises du S&P 500. À Miami, je travaille dans l’immobilier et la gestion immobilière depuis 2023."
      : "Nací en Buenos Aires, Argentina, y cuento con más de 15 años de experiencia en Finanzas trabajando en empresas S&P 500. En Miami trabajo en Real Estate y Property Management desde 2023.";
  const differentiator = isEN
    ? "What sets me apart is combining a close, personal approach with financial judgment, real follow-through, and local knowledge to help you make real estate decisions with more clarity."
    : isFR
      ? "Ce qui me distingue, c’est la combinaison d’une approche proche, d’un jugement financier, d’un vrai suivi et d’une connaissance locale pour vous aider à prendre des décisions immobilières avec plus de clarté."
      : "Mi diferencial está en combinar una mirada cercana con criterio financiero, seguimiento real y conocimiento local para ayudarte a tomar decisiones inmobiliarias con más claridad.";
  const credentials =
    isEN
      ? [
          {
            title: "Financial experience",
            description: "More than 15 years in Finance working with S&P 500 companies, with a perspective focused on numbers, processes, and decision-making.",
          },
          {
            title: "Miami Real Estate",
            description: "I work with buyers, investors, and property owners in Miami, supporting purchase, investment, and property management processes.",
          },
          {
            title: "Personalized guidance",
            description: "I stay involved from start to finish so you have clarity, follow-through, and a carefully guided experience at every stage.",
          },
        ]
      : isFR
        ? [
            {
              title: "Expérience financière",
              description: "Plus de 15 ans en finances au sein d’entreprises du S&P 500, avec une approche axée sur les chiffres, les processus et la prise de décision.",
            },
            {
              title: "Immobilier à Miami",
              description: "Je travaille avec des acheteurs, investisseurs et propriétaires à Miami, en accompagnant les processus d’achat, d’investissement et de gestion immobilière.",
            },
            {
              title: "Accompagnement personnalisé",
              description: "Je m’implique du début à la fin pour vous offrir clarté, suivi et une expérience soignée à chaque étape.",
            },
          ]
        : [
            {
              title: "Experiencia financiera",
              description: "Más de 15 años en Finanzas trabajando en empresas S&P 500, con una mirada orientada a números, procesos y toma de decisiones.",
            },
            {
              title: "Real Estate en Miami",
              description: "Trabajo con compradores, inversores y propietarios en Miami, acompañando procesos de compra, inversión y gestión inmobiliaria.",
            },
            {
              title: "Acompañamiento personalizado",
              description: "Me involucro de principio a fin para que tengas claridad, seguimiento y una experiencia cuidada en cada etapa.",
            },
          ];
  const ctaLabel = isEN ? "Learn more about me" : isFR ? "En savoir plus sur moi" : "Conocé más sobre mí";

  return (
    <section aria-labelledby="about-jacquie-home-title" className="max-w-[1100px] mx-auto px-4 py-12 sm:py-14 lg:py-16">
      <h2 id="about-jacquie-home-title" className="font-display text-3xl font-medium leading-[1.05] tracking-normal text-primary text-center sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4 mx-auto max-w-[55ch] text-center space-y-3">
        <p className="text-[15px] leading-[1.7] text-foreground/90">
          {intro}
        </p>
        <p className="text-[15px] leading-[1.7] text-foreground/85">
          {additional}
        </p>
        <p className="text-[15px] leading-[1.7] text-foreground/85">
          {differentiator}
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
