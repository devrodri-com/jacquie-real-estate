// src/components/SectionPropertyManagementIncluded.tsx
type Props = { locale: "es" | "en" | "fr" };

export default function SectionPropertyManagementIncluded({ locale }: Props) {
  const isEN = locale === "en";
  const isFR = locale === "fr";

  const title = isEN
    ? "What the service includes"
    : isFR
      ? "Ce que comprend le service"
      : "Qué incluye el servicio";

  const intro = isEN
    ? "I handle the day-to-day management so your property in Miami works as a well-cared-for and well-managed investment."
    : isFR
      ? "Je prends en charge la gestion quotidienne pour que votre propriété à Miami fonctionne comme un investissement bien entretenu et bien géré."
      : "Me encargo de la gestión diaria para que tu propiedad en Miami funcione como una inversión bien cuidada y bien administrada.";

  const items = isEN
    ? [
        {
          title: "Listing and booking management",
          text: "I list the property on platforms like Airbnb and manage each reservation from start to finish.",
        },
        {
          title: "Guest support",
          text: "I am the direct point of contact for any questions or needs during each stay.",
        },
        {
          title: "Personalized check-in",
          text: "I provide a thoughtful arrival experience with personalized check-in.",
        },
        {
          title: "Maintenance and coordination",
          text: "If any issue or operational need arises, I coordinate the solution with your authorization.",
        },
      ]
    : isFR
      ? [
          {
            title: "Mise en ligne et gestion des réservations",
            text: "Je publie la propriété sur des plateformes comme Airbnb et je gère chaque réservation du début à la fin.",
          },
          {
            title: "Support aux invités",
            text: "Je suis le contact direct pour toute question ou besoin pendant le séjour.",
          },
          {
            title: "Check-in personnalisé",
            text: "J'assure une expérience d'arrivée soignée avec un check-in personnalisé.",
          },
          {
            title: "Maintenance et coordination",
            text: "En cas de réparation ou de besoin opérationnel, je coordonne la solution avec votre accord.",
          },
        ]
      : [
          {
            title: "Publicación y gestión de reservas",
            text: "Publico la propiedad en plataformas como Airbnb y gestiono cada reserva de principio a fin.",
          },
          {
            title: "Atención al huésped",
            text: "Soy el contacto directo ante cualquier duda o necesidad durante la estadía.",
          },
          {
            title: "Check-in personalizado",
            text: "Ofrezco una experiencia cuidada desde la llegada, con atención personalizada.",
          },
          {
            title: "Mantenimiento y coordinación",
            text: "Si surge cualquier arreglo o necesidad operativa, coordino la solución con tu autorización.",
          },
        ];

  return (
    <section className="max-w-[1100px] mx-auto px-4">
      <div className="max-w-[60ch]">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-[1.7] text-foreground/85">
          {intro}
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[12px] bg-paper ring-1 ring-primary/10 p-5 shadow-sm"
          >
            <h3 className="text-[15px] font-semibold tracking-tight text-primary">
              {item.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-foreground/80">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

