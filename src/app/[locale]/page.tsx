// src/app/[locale]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import SectionAboutJacquieHome from '@/components/SectionAboutJacquieHome';
import SectionAccommodationHome from '@/components/SectionAccommodationHome';
import SectionHowItWorks from '@/components/SectionHowItWorks';
import SectionListingsHome from '@/components/SectionListingsHome';
import SectionPropertyManagementHome from '@/components/SectionPropertyManagementHome';
import SectionServices from '@/components/SectionServices';
import SectionWhyPrecon from '@/components/SectionWhyPrecon';

type HomeLocale = "es" | "en" | "fr";
export default async function Home({params}: {params: {locale: string}}) {
  const locale: HomeLocale = params.locale === "en" ? "en" : params.locale === "fr" ? "fr" : "es";
  const whatsappMessage =
    locale === "en"
      ? "Hi Jacquie, I’d like to talk with you about an opportunity in Miami."
      : locale === "fr"
        ? "Bonjour Jacquie, j’aimerais vous parler d’une opportunité à Miami."
        : "Hola Jacquie, quiero hablar con vos sobre una oportunidad en Miami.";
  const whatsAppHref = `https://wa.me/17864072591?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-20 pt-0 pb-12">
      {/* HERO */}
      <section
        role="region"
        aria-labelledby="hero-title"
        aria-describedby="hero-desc"
        className="relative left-1/2 -translate-x-1/2 overflow-hidden bg-[#FFFFFF] flex flex-col min-h-[600px] w-[100dvw] max-w-[100dvw]"
      >
        <div className="relative flex min-h-[600px] items-start justify-center px-4 pt-[88px] pb-28 sm:px-0 md:pt-[104px] md:pb-28">
        {/* Background media (SORA-ready) */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* Desktop/Tablet: video de fondo */}
          <div className="hidden sm:block absolute inset-0">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              poster="/images/hero-fallback.jpg"
            >
              <source src="/videos/hero-sora.webm" type="video/webm" />
              <source src="/videos/hero-sora.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Mobile: imagen estática */}
          <div className="sm:hidden absolute inset-0">
            <Image src="/images/hero-fallback-mobile.jpg" alt="" fill priority className="object-cover" />
          </div>
          {/* Overlay claro para legibilidad sobre texto oscuro */}
          <div className="absolute inset-0 bg-white/62 md:bg-gradient-to-r md:from-white/86 md:via-white/68 md:to-white/28" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-14">
            <div className="max-w-[44rem] text-left">
              <div className="mb-5 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/72 px-3 py-2 ring-1 ring-[#9C8FD6]/18 backdrop-blur-sm">
                  <Image
                    src="/images/jacquie-zarate.jpg"
                    alt="Jacquie Zarate Realtor"
                    width={96}
                    height={96}
                    sizes="96px"
                    quality={90}
                    priority
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-white/80"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2B2B2B]/80">
                      JACQUIE ZARATE · REALTOR®
                    </p>
                    <p className="text-[13px] leading-5 text-[#2B2B2B]/72">
                      {locale === 'en'
                        ? 'Your trusted contact in Miami'
                        : locale === 'fr'
                          ? 'Votre personne de confiance à Miami'
                          : 'Tu persona de confianza en Miami'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-3 text-[12px] uppercase tracking-[0.12em] text-[#2B2B2B]/70 text-center md:text-left">
                <div className="md:hidden leading-[1.5]">
                  {locale === 'en' ? (
                    <>
                      <div>MIAMI · INVESTMENT</div>
                      <div>PERSONAL SUPPORT</div>
                    </>
                  ) : locale === 'fr' ? (
                    <>
                      <div>MIAMI · INVESTISSEMENT</div>
                      <div>ACCOMPAGNEMENT PERSONNALISÉ</div>
                    </>
                  ) : (
                    <>
                      <div>MIAMI · INVERSIÓN</div>
                      <div>ACOMPAÑAMIENTO PERSONAL</div>
                    </>
                  )}
                </div>

                <p className="hidden md:block">
                  {locale === 'en'
                    ? 'MIAMI · INVESTMENT · PERSONAL SUPPORT'
                    : locale === 'fr'
                      ? 'MIAMI · INVESTISSEMENT · ACCOMPAGNEMENT PERSONNALISÉ'
                      : 'MIAMI · INVERSIÓN · ACOMPAÑAMIENTO PERSONAL'}
                </p>
              </div>

              <h1
                id="hero-title"
                className="max-w-[14ch] text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#2B2B2B] sm:text-5xl md:text-[54px] lg:text-[58px]"
              >
                {locale === 'en'
                  ? 'I help you invest in Miami with hands-on support throughout the entire process.'
                  : locale === 'fr'
                    ? 'Je vous accompagne pour investir à Miami avec un suivi réel à chaque étape.'
                    : 'Te ayudo a invertir en Miami con acompañamiento real en todo el proceso.'}
              </h1>

              <p className="mt-5 max-w-[68ch] text-[18px] font-medium leading-8 text-[#2B2B2B]/80">
                {locale === 'en'
                  ? "From finding the right property to managing it, I personally guide you so you can invest with clarity, confidence, and ongoing support — even if you’re not in Miami."
                  : locale === 'fr'
                    ? "De l’achat à la gestion de votre bien, je vous accompagne personnellement pour investir avec clarté, sécurité et tranquillité d’esprit, même à distance."
                    : "Desde la compra hasta la gestión de tu propiedad, te acompaño personalmente para que inviertas con claridad, seguridad y seguimiento real, incluso si no estás en Miami."}
              </p>

              <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 min-w-[176px] w-full items-center justify-center rounded-lg bg-[#9C8FD6] px-6 text-sm font-medium text-white transition-opacity transition-colors transition-transform hover:-translate-y-[1px] hover:opacity-90 hover:shadow-md active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9C8FD6] focus-visible:ring-2 focus-visible:ring-[#9C8FD6]/40 sm:w-auto"
                >
                  {locale === 'en' ? 'Chat on WhatsApp' : locale === 'fr' ? 'Écrire sur WhatsApp' : 'Hablar por WhatsApp'}
                </a>
                <Link
                  href={`/${locale}/listings`}
                  className="inline-flex h-11 min-w-[176px] w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#9C8FD6] px-6 text-sm font-semibold text-[#9C8FD6] transition-colors hover:bg-[#9C8FD6] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9C8FD6] focus-visible:ring-2 focus-visible:ring-[#9C8FD6]/40 sm:w-auto md:min-w-0"
                >
                  {locale === 'en' ? 'View opportunities' : locale === 'fr' ? 'Voir les opportunités' : 'Ver oportunidades'}
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[#2B2B2B]/58">
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs"
                  aria-label="Miami Life Realty"
                  title="Miami Life Realty"
                >
                  MIAMI LIFE REALTY
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs"
                  aria-label="NAR · REALTOR®"
                  title="NAR · REALTOR®"
                >
                  NAR · REALTOR®
                </span>
              </div>

              <div id="hero-desc" className="flex items-center justify-center md:justify-start pt-4 pb-10 md:pb-0 text-xs text-[#2B2B2B]/70 text-center md:text-left">
                <span className="mr-1 hidden text-[#2B2B2B]/60 sm:inline">
                  {locale === 'en' ? 'Questions?' : locale === 'fr' ? 'Des questions?' : '¿Dudas?'}
                </span>
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir WhatsApp de Jacquie con mensaje prellenado"
                  className="block underline decoration-[#9C8FD6]/40 underline-offset-2 hover:decoration-[#9C8FD6] sm:ml-2 sm:inline"
                  data-analytics="hero:whatsapp"
                >
                  {locale === 'en' ? 'Chat on WhatsApp' : locale === 'fr' ? 'Écrire sur WhatsApp' : 'Hablemos por WhatsApp'}
                </a>
              </div>
            </div>

            <div className="relative hidden md:flex justify-end">
              <div className="relative w-full max-w-[420px]">
                <div className="absolute -inset-4 rounded-[32px] bg-white/40 blur-2xl" />
                <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-[#F7F6F3]/80 p-3 ring-1 ring-[#9C8FD6]/18 shadow-[0_20px_60px_rgba(43,43,43,0.08)] backdrop-blur-sm">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                    <Image
                      src="/images/jacquie-zarate.jpg"
                      alt="Jacquie Zarate Realtor"
                      fill
                      sizes="(min-width: 768px) 420px, 0px"
                      quality={92}
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="px-2 pb-1 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2B2B2B]/60">
                      {locale === 'en'
                        ? 'Direct support in Miami'
                        : locale === 'fr'
                          ? 'Présence directe à Miami'
                          : 'Acompañamiento directo en Miami'}
                    </p>
                    <p className="mt-2 text-[22px] font-semibold leading-[1.2] tracking-tight text-[#2B2B2B]">
                      {locale === 'en'
                        ? 'Personal guidance from search to management.'
                        : locale === 'fr'
                          ? 'Un accompagnement personnel, de la recherche à la gestion.'
                          : 'Acompañamiento personal desde la búsqueda hasta la gestión.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* Banda de transición — remate inferior del Hero (anclada al pie de la imagen) */}
        <div className="absolute bottom-0 left-0 right-0 w-full bg-[#2B2B2B] text-primary-foreground py-5 px-4" role="region" aria-label={locale === 'en' ? 'What we offer' : locale === 'fr' ? 'Ce que nous offrons' : 'Qué ofrecemos'}>
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-center gap-3 text-center text-sm font-medium sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            <span className="text-primary-foreground/95">
              {locale === 'en'
                ? 'Personalized support'
                : locale === 'fr'
                  ? 'Accompagnement personnalisé'
                  : 'Acompañamiento personalizado'}
            </span>
            <span className="hidden sm:inline text-primary-foreground/35" aria-hidden>·</span>
            <span className="text-primary-foreground/95">
              {locale === 'en'
                ? 'Invest and manage with clarity'
                : locale === 'fr'
                  ? 'Investir et gérer avec clarté'
                  : 'Invertí y gestioná con claridad'}
            </span>
            <span className="hidden sm:inline text-primary-foreground/35" aria-hidden>·</span>
            <span className="text-primary-foreground/95">
              {locale === 'en'
                ? 'Your trusted contact in Miami'
                : locale === 'fr'
                  ? 'Votre personne de confiance à Miami'
                  : 'Tu persona de confianza en Miami'}
            </span>
          </div>
        </div>
      </section>

      <div className="bg-surface">
        <SectionPropertyManagementHome locale={locale} />
      </div>

      <SectionHowItWorks locale={locale} />

      <SectionListingsHome locale={locale} />

      <SectionWhyPrecon
        heroImageSrc="/images/precon-hero.jpg"
        heroImageAlt={locale === 'en' ? 'Pre-construction in Miami at sunset' : locale === 'fr' ? 'Préconstruction à Miami au coucher du soleil' : 'Preconstrucción en Miami al atardecer'}
      />

      <div className="bg-surface">
        <SectionAboutJacquieHome locale={locale} />
      </div>

      <SectionAccommodationHome locale={locale} />

      <div className="bg-surface">
        <SectionServices locale={locale} />
      </div>

      {/* BANDA CTA — premium */}
      <section className="mt-6 rounded-[10px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground text-center relative overflow-hidden max-w-[1100px] mx-auto">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        <div className="mx-auto mb-3 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary-foreground">
          {locale === 'en' ? "Tell me what you're looking for in Miami" : locale === 'fr' ? "Dites-moi ce que vous cherchez à Miami" : 'Contame qué estás buscando en Miami'}
        </h3>
        <p className="mt-2 text-[14px] text-primary-foreground/80">
          {locale === 'en'
            ? "I can help you find an opportunity aligned with your goal, whether it's investing, buying, managing a property, or planning your stay."
            : locale === 'fr'
              ? "Je peux vous aider à trouver une opportunité alignée avec votre objectif : investir, acheter, gérer un bien ou planifier votre séjour."
              : 'Puedo ayudarte a encontrar una oportunidad alineada con tu objetivo, ya sea invertir, comprar, administrar o planificar tu estadía.'}
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:jacqueline@miamiliferealty.com?subject=${encodeURIComponent(locale === 'en' ? 'Investment inquiry from website' : locale === 'fr' ? 'Demande d\'information depuis le site' : 'Consulta de inversión desde la web')}`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground/10 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/20 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {locale === 'en' ? 'Email Jacquie' : locale === 'fr' ? 'Écrire à Jacquie' : 'Escribir a Jacquie'}
          </a>
          <a
            href={`https://wa.me/17864072591?text=${encodeURIComponent(locale === 'en' ? 'Hi Jacquie, I would like to schedule a call to discuss investment opportunities.' : locale === 'fr' ? 'Bonjour Jacquie, j\'aimerais prendre rendez-vous pour discuter d\'opportunités d\'investissement.' : 'Hola Jacquie, me gustaría agendar una llamada para hablar de oportunidades de inversión.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground/25 px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {locale === 'en' ? 'WhatsApp' : locale === 'fr' ? 'WhatsApp' : 'WhatsApp'}
          </a>
        </div>
      </section>
    </div>
  );
}