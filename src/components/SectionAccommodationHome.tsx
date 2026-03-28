// src/components/SectionAccommodationHome.tsx
import Link from "next/link";

type Props = { locale: "es" | "en" | "fr" };

export default function SectionAccommodationHome({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN ? "Accommodation in Miami" : isFR ? "Hébergement à Miami" : "Alojamiento en Miami";
  const intro = isEN
    ? "If you're traveling to Miami for business or leisure, I can help you find an accommodation option aligned with your stay and preferred location."
    : isFR
      ? "Si vous voyagez à Miami pour le travail ou les vacances, je peux vous aider à trouver un hébergement adapté à votre séjour et à l'emplacement souhaité."
      : "Si viajás a Miami por turismo o negocios, puedo ayudarte a encontrar una opción de alojamiento alineada con tu estadía y tu ubicación ideal.";

  const cards = [
    {
      title: isEN ? "Options based on your trip" : isFR ? "Options selon votre voyage" : "Opciones según tu viaje",
      text: isEN
        ? "I offer stays for leisure, business, or investment trips, with a focus on practicality, location, and comfort."
        : isFR
          ? "Je propose des séjours pour le tourisme, le travail ou l'investissement, avec un accent sur la praticité, l'emplacement et le confort."
          : "Te ofrezco estadías para turismo, trabajo o viajes de inversión, con foco en practicidad, ubicación y comodidad.",
    },
    {
      title: isEN ? "Personalized guidance" : isFR ? "Accompagnement personnalisé" : "Acompañamiento personalizado",
      text: isEN
        ? "I guide you from the initial inquiry to finding a convenient option for your arrival in Miami."
        : isFR
          ? "Je vous accompagne de la première demande jusqu'à trouver une option adaptée pour votre arrivée à Miami."
          : "Te acompaño desde la consulta inicial hasta encontrar una alternativa conveniente para tu llegada a Miami.",
    },
  ];

  return (
    <section aria-labelledby="accommodation-home-title" className="max-w-[1100px] mx-auto px-4">
      <h2 id="accommodation-home-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
        {title}
      </h2>
      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.7] text-foreground/85">
        {intro}
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[12px] ring-1 ring-primary-foreground/10 bg-primary p-6 text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="text-[17px] font-semibold tracking-tight text-primary-foreground">
              {card.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.5] text-primary-foreground/80">
              {card.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/contacto`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground no-underline hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "Ask about accommodation" : isFR ? "Consulter pour l'hébergement" : "Consultar alojamiento"}
        </Link>
        <a
          href="https://wa.me/17864072591"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md border border-primary/25 px-5 text-sm font-medium text-primary no-underline hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          {isEN ? "Talk on WhatsApp" : isFR ? "Parler sur WhatsApp" : "Hablar por WhatsApp"}
        </a>
      </div>
    </section>
  );
}
