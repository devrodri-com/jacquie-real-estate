// src/components/SectionServices.tsx
import Link from "next/link";

type Props = { locale: "es" | "en" | "fr" };

export default function SectionServices({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN ? "Main services" : isFR ? "Services principaux" : "Servicios principales";
  const intro = isEN
    ? "I support you in Miami based on your goal: investing, buying, renting, or managing a property."
    : isFR
      ? "Je vous accompagne à Miami selon votre objectif : investir, acheter, louer ou gérer un bien."
      : "Te acompaño en Miami según tu objetivo: invertir, comprar, rentar o administrar una propiedad.";

  const cards = [
    {
      title: isEN ? "Active Listings" : isFR ? "Annonces actives" : "Listings activos",
      description: isEN
        ? "I help you find selected properties with strong investment and rental potential in Miami."
        : isFR
          ? "Je vous aide à identifier des propriétés sélectionnées à fort potentiel d'investissement et de location à Miami."
          : "Te ayudo a identificar propiedades seleccionadas con potencial de inversión y renta en Miami.",
      href: `/${locale}/listings`,
    },
    {
      title: isEN ? "Property Management" : isFR ? "Gestion immobilière" : "Gestión de propiedades",
      description: isEN
        ? "If you already own a property in Miami, I can help you manage and operate it."
        : isFR
          ? "Si vous possédez déjà un bien à Miami, je peux vous aider à le gérer et l'exploiter."
          : "Si ya tenés una propiedad en Miami, te ayudo con su gestión y operación.",
      href: `/${locale}/contacto`,
    },
    {
      title: isEN ? "Accommodation in Miami" : isFR ? "Hébergement à Miami" : "Alojamiento en Miami",
      description: isEN
        ? "Coming for business or leisure? I can help you find the right accommodation for your stay."
        : isFR
          ? "Vous venez pour le travail ou les vacances ? Je peux vous aider à trouver l'hébergement adapté à votre séjour."
          : "¿Venís por turismo o negocios? Te ayudo a encontrar el alojamiento ideal según tu viaje.",
      href: `/${locale}/contacto`,
    },
    {
      title: isEN ? "Pre-construction" : isFR ? "Préconstruction" : "Preconstrucción",
      description: isEN
        ? "I connect you with selected brokerage projects with a long-term investment focus."
        : isFR
          ? "Je vous connecte à des projets sélectionnés du courtage, avec une vision investissement à long terme."
          : "Te conecto con proyectos seleccionados del brokerage con enfoque en inversión a futuro.",
      href: `/${locale}/proyectos`,
    },
  ];

  return (
    <section aria-labelledby="services-title" className="max-w-[1100px] mx-auto px-4">
      <h2 id="services-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
        {title}
      </h2>
      <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.7] text-foreground/85">
        {intro}
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href + card.title}
            href={card.href}
            className="group flex flex-col h-full overflow-hidden rounded-[16px] ring-1 ring-primary-foreground/10 bg-primary text-left no-underline shadow-md transition-all hover:shadow-2xl hover:-translate-y-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div className="h-[3px] w-full bg-accent/90 shrink-0" aria-hidden />
            <div className="flex flex-col flex-1 min-h-0 p-6 pt-5">
              <h3 className="text-[17px] font-semibold tracking-tight text-primary-foreground">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 min-h-0 text-[14px] leading-[1.5] text-primary-foreground/80">
                {card.description}
              </p>
              <span className="mt-5 pt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-foreground">
                <span className="underline-offset-4 decoration-2 decoration-primary-foreground/40 group-hover:underline">{isEN ? "See more" : isFR ? "Voir plus" : "Ver más"}</span>
                <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
