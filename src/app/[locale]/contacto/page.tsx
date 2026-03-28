// src/app/[locale]/contacto/page.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";
import enLabels from "react-phone-number-input/locale/en.json";
import esLabels from "react-phone-number-input/locale/es.json";
import frLabels from "react-phone-number-input/locale/fr.json";
import "react-phone-number-input/style.css";
import styles from "./ContactoPhone.module.css";
import CountrySelect from "./CountrySelect";

declare global {
  interface Window { gtag?: (...args: any[]) => void }
}

export default function Contacto() {
  const { locale } = useParams() as { locale: 'es' | 'en' | 'fr' };
  const isEN = locale === 'en';
  const isFR = locale === 'fr';
  const waMsg = isEN ? 'Hi Jacquie, I would like to schedule a call to discuss Miami pre-construction opportunities.' : isFR ? 'Bonjour Jacquie, je souhaiterais prendre rendez-vous pour discuter d\'opportunités en préconstruction à Miami.' : 'Hola Jacquie, me gustaría coordinar una llamada para hablar de oportunidades en Miami.';
  const waHref = `https://wa.me/17864072591?text=${encodeURIComponent(waMsg)}`;

  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "", telefonoE164: "", country: "" as Country | "" | "INTL" });
  const [companyHoneypot, setCompanyHoneypot] = useState<string>("");
  const [phoneInputValue, setPhoneInputValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const ignoreNextPhoneChange = useRef(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<null | { type: 'success' | 'error'; text: string }>(null);
  const [utms, setUtms] = useState<{
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  }>({});
  const router = useRouter();

  // Capturar UTMs desde la URL al cargar la página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utmParams: typeof utms = {};
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
      utmKeys.forEach(key => {
        const value = params.get(key);
        if (value) {
          utmParams[key] = value;
        }
      });
      if (Object.keys(utmParams).length > 0) {
        setUtms(utmParams);
        // Guardar UTMs en sessionStorage para usarlos en /gracias
        sessionStorage.setItem("lead_utms", JSON.stringify(utmParams));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoneChange = (value: string | undefined) => {
    const newValue = value ?? "";
    if (ignoreNextPhoneChange.current) {
      ignoreNextPhoneChange.current = false;
      // Force a clean international input state.
      setPhoneInputValue("");
      setForm(prev => ({ ...prev, telefonoE164: "", country: "" }));
      setPhoneError(null);
      return;
    }

    // Actualizar siempre el valor visible del input
    setPhoneInputValue(newValue);

    if (!newValue) {
      setForm(prev => ({ ...prev, telefonoE164: "", country: "" }));
      setPhoneError(null);
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(newValue);
      if (phoneNumber && isValidPhoneNumber(newValue)) {
        const countryCode = phoneNumber.country || "";
        const finalCountry = countryCode || "INTL";
        setForm(prev => ({ 
          ...prev, 
          telefonoE164: phoneNumber.format("E.164"), 
          country: finalCountry as Country | "INTL"
        }));
        setPhoneError(null);
      } else {
        // Solo mostrar error si el usuario está escribiendo (más de 3 caracteres)
        if (newValue.length > 3) {
          setPhoneError(isEN ? "Invalid phone number" : isFR ? "Numéro de téléphone invalide" : "Número de teléfono inválido");
        } else {
          setPhoneError(null);
        }
        setForm(prev => ({ ...prev, telefonoE164: "", country: "" }));
      }
    } catch (err) {
      // Solo mostrar error si el usuario está escribiendo (más de 3 caracteres)
      if (newValue.length > 3) {
        setPhoneError(isEN ? "Invalid phone number" : isFR ? "Numéro de téléphone invalide" : "Número de teléfono inválido");
      } else {
        setPhoneError(null);
      }
      setForm(prev => ({ ...prev, telefonoE164: "", country: "" }));
    }
  };

  const handleCountryChange = (country: Country | undefined) => {
    // Actualizar el país seleccionado
    setSelectedCountry(country);
    
    // Si se selecciona International (country undefined), resetear todo
    if (country === undefined) {
      ignoreNextPhoneChange.current = true;
      setPhoneInputValue("");
      setForm(prev => ({ ...prev, telefonoE164: "", country: "" }));
      setPhoneError(null);
    } else {
      // Al cambiar de país, resetear el input y mantener solo el nuevo país
      setPhoneInputValue("");
      setForm(prev => ({ ...prev, telefonoE164: "", country: country ?? "" }));
      setPhoneError(null);
    }
  };

  const handleSubmit = async () => {
    // Validar teléfono antes de enviar
    if (!form.telefonoE164 || !isValidPhoneNumber(form.telefonoE164)) {
      setPhoneError(isEN ? "Please enter a valid phone number" : isFR ? "Veuillez entrer un numéro de téléphone valide" : "Por favor ingresa un número de teléfono válido");
      return;
    }

    setSending(true);
    setPhoneError(null);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...utms, company: companyHoneypot }),
      });
      const raw = await r.text();
      let data: any = {};
      try { data = JSON.parse(raw); } catch {}
      
      // Handle rate limiting specifically
      if (r.status === 429 || data?.error === "rate_limited") {
        setNotice({ 
          type: 'error', 
          text: isEN ? 'Too many attempts. Please try again in a few minutes.' : isFR ? 'Trop de tentatives. Réessayez dans quelques minutes.' : 'Demasiados intentos. Probá de nuevo en unos minutos.' 
        });
        return;
      }
      
      if (!r.ok || !data?.ok) throw new Error(data?.error || raw || 'send failed');
      setNotice({ type: 'success', text: isEN ? 'Message sent. I will contact you shortly.' : isFR ? 'Message envoyé. Je vous recontacterai sous peu.' : 'Mensaje enviado. Te contactaré a la brevedad.' });
      
      // Evento gtag mejorado sin PII
      window.gtag?.('event', 'generate_lead', {
        event_category: 'form',
        event_label: isEN ? 'contact' : isFR ? 'contact_fr' : 'contacto',
        locale: locale,
        has_phone: 'true',
        phone_country: form.country || 'INTL',
        ...(utms.utm_source && { utm_source: utms.utm_source }),
        ...(utms.utm_medium && { utm_medium: utms.utm_medium }),
        ...(utms.utm_campaign && { utm_campaign: utms.utm_campaign }),
      });
      
      setTimeout(() => router.push(`/${locale}/gracias`), 400);
    } catch (err) {
      setNotice({ type: 'error', text: isEN ? 'Could not send the message. Try again.' : isFR ? 'Impossible d\'envoyer le message. Réessayez.' : 'No se pudo enviar. Intenta de nuevo.' });
      console.error("contact api error:", err);
    } finally {
      setSending(false);
    }
  };

  const handleWhatsApp = () => {
    window.gtag?.('event','click_whatsapp',{
      event_category:'engagement',
      event_label: isEN ? 'contact_whatsapp_en' : isFR ? 'contact_whatsapp_fr' : 'contact_whatsapp_es'
    });
  };

  return (
    <div className="w-full bg-surface">
      <div className="mx-auto w-full max-w-[980px] px-4 py-16">
        <header className="mb-10 max-w-[42rem] text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
            {isEN
              ? "Tell me what you're looking for in Miami"
              : isFR
                ? "Dites-moi ce que vous recherchez à Miami"
                : "Contame qué estás buscando en Miami"}
          </h1>
          <p className="mt-3 text-[15px] leading-[1.7] text-foreground/80">
            {isEN
              ? "You can reach me on WhatsApp or leave your inquiry here, and I'll personally get back to you."
              : isFR
                ? "Vous pouvez m'écrire sur WhatsApp ou laisser votre demande ici, et je vous répondrai personnellement."
                : "Podés escribirme por WhatsApp o dejarme tu consulta y te voy a responder personalmente."}
          </p>
        </header>

        <div className="grid w-full min-w-0 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <aside className="min-w-0 space-y-5 lg:pt-1">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-primary/10">
                <Image
                  src="/images/jacquie-zarate.jpg"
                  alt="Jacquie Zarate Realtor"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-primary">Jacquie Zarate Realtor</p>
                <p className="mt-1 text-sm font-medium text-primary/90">
                  {isEN
                    ? "Your trusted contact in Miami"
                    : isFR
                      ? "Votre personne de confiance à Miami"
                      : "Tu persona de confianza en Miami"}
                </p>
              </div>
            </div>
            <p className="text-[15px] leading-[1.7] text-foreground/80">
              {isEN
                ? "I can help you evaluate a property, answer your questions, and guide you through the process."
                : isFR
                  ? "Je peux vous aider à évaluer un bien, répondre à vos questions et vous accompagner dans le processus."
                  : "Puedo ayudarte a evaluar una propiedad, resolver dudas y acompañarte en el proceso."}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 h-11 rounded-lg border border-primary/25 bg-white px-5 text-primary text-[14px] font-medium shadow-sm transition-all duration-200 hover:bg-primary/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={isEN ? "Chat on WhatsApp" : isFR ? "Contacter par WhatsApp" : "Contactar por WhatsApp"}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 opacity-90 transition-transform group-hover:scale-110" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.54 4.1 1.57 5.89L0 24l6.42-1.67a11.75 11.75 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.14-3.38-8.44ZM12.05 21.4a9.55 9.55 0 0 1-4.86-1.33l-.35-.2-3.81 1 1.02-3.71-.23-.38a9.65 9.65 0 0 1-1.49-5.2c0-5.32 4.33-9.64 9.66-9.64 2.58 0 5 1 6.82 2.82a9.6 9.6 0 0 1 2.83 6.8c0 5.32-4.33 9.64-9.59 9.64Zm5.46-7.17c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.78-1.49-1.73-1.66-2.02-.17-.3-.02-.46.13-.6.13-.12.3-.32.44-.48.15-.16.2-.27.3-.45.1-.2.05-.36-.02-.5-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.5.07-.76.36-.26.3-1 1-1 2.42s1.02 2.8 1.17 3c.15.2 2.02 3.08 4.92 4.33.69.3 1.24.48 1.66.6.7.22 1.35.19 1.86.12.57-.08 1.77-.72 2.03-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.36Z"/></svg>
              <span className="relative">
                {isEN ? "Contact via WhatsApp" : isFR ? "Contacter par WhatsApp" : "Contactar por WhatsApp"}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              </span>
            </a>
          </aside>

          <section className="relative z-10 min-w-0 rounded-[12px] bg-primary p-6 sm:p-7 ring-1 ring-primary-foreground/10 text-primary-foreground">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

        <header className="mb-4">
          <h2 className="text-[22px] sm:text-[24px] font-semibold tracking-tight">
            {isEN ? "Leave your inquiry" : isFR ? "Laissez votre demande" : "Dejame tu consulta"}
          </h2>
          <p className="mt-1 text-primary-foreground/85 leading-relaxed">
            {isEN
              ? "Fill out the form and I'll get back to you shortly."
              : isFR
                ? "Remplissez le formulaire et je vous répondrai rapidement."
                : "Completá el formulario y te responderé a la brevedad."}
          </p>
        </header>

        <form className="mt-2 grid min-w-0 gap-3" onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
          <label className="block">
            <span className="sr-only">{isEN ? 'Name' : isFR ? 'Nom' : 'Nombre'}</span>
            <input
              name="nombre"
              className="h-11 w-full rounded-md border border-primary-foreground/20 bg-white px-3 text-primary placeholder-black/40 outline-none focus:ring-2 focus:ring-accent/40"
              placeholder={isEN ? 'Name' : isFR ? 'Nom' : 'Nombre'}
              required
              onChange={handleChange}
            />
          </label>
          <label className="block">
            <span className="sr-only">{isEN ? 'Email' : isFR ? 'Courriel' : 'Email'}</span>
            <input
              name="email"
              className="h-11 w-full rounded-md border border-primary-foreground/20 bg-white px-3 text-primary placeholder-black/40 outline-none focus:ring-2 focus:ring-accent/40"
              placeholder={isEN ? 'Email' : isFR ? 'Courriel' : 'Email'}
              type="email"
              required
              onChange={handleChange}
            />
          </label>
          <div className="block">
          <label className="block">
            <span className="sr-only">{isEN ? 'Phone (WhatsApp preferred)' : isFR ? 'Téléphone (WhatsApp de préférence)' : 'Teléfono (WhatsApp preferido)'}</span>
            <div className={`${styles.phoneWrapper} min-w-0`}>
                <PhoneInput
                  key={`${selectedCountry ?? "INTL"}`}
                  international
                  defaultCountry={selectedCountry ?? undefined}
                  country={selectedCountry}
                  countryCallingCodeEditable={true}
                  countries={['US','CA','ES','MX','AR','CO','CL','PE','VE','EC','DO','GT','HN','NI','CR','PA','CU','PR','BO','PY','UY','BR']}
                  labels={isEN ? enLabels : isFR ? frLabels : esLabels}
                  countrySelectComponent={(props) => (
                    <CountrySelect {...props} labels={isEN ? enLabels : isFR ? frLabels : esLabels} isEN={isEN} isFR={isFR} />
                  )}
                  value={phoneInputValue}
                  onChange={handlePhoneChange}
                  onCountryChange={handleCountryChange}
                  placeholder={
                    selectedCountry
                      ? (isEN ? 'Phone number' : isFR ? 'Numéro de téléphone' : 'Número de teléfono')
                      : (isEN ? '+ Country code + number' : isFR ? '+ Indicatif + numéro' : '+ Código de país + número')
                  }
                />
              </div>
            </label>
            {phoneError && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {phoneError}
              </p>
            )}
          </div>
          <label className="block">
            <span className="sr-only">{isEN ? 'Message' : isFR ? 'Message' : 'Mensaje'}</span>
            <textarea
              name="mensaje"
              className="min-h-32 w-full rounded-md border border-primary-foreground/20 bg-white p-3 text-primary placeholder-black/40 outline-none focus:ring-2 focus:ring-accent/40"
              placeholder={isEN ? 'Your message' : isFR ? 'Votre message' : 'Tu consulta'}
              required
              onChange={handleChange}
            />
          </label>

          {/* Honeypot field - invisible to users */}
          <div className="sr-only">
            <input
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companyHoneypot}
              onChange={(e) => setCompanyHoneypot(e.target.value)}
              aria-hidden="true"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className={`mt-1 h-11 rounded-md px-4 text-primary-foreground text-[14px] font-medium focus-visible:ring-2 focus-visible:ring-accent/40 transition-colors ${sending ? 'bg-primary-foreground/10 opacity-70 cursor-not-allowed' : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'}`}
            aria-label={isEN ? 'Send inquiry' : isFR ? 'Envoyer la demande' : 'Enviar consulta'}
          >
            {isEN ? 'Send' : isFR ? 'Envoyer' : 'Enviar'}
          </button>
        </form>
          </section>
        </div>

      {/* Toast */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-lg px-4 py-3 shadow-lg ring-1 backdrop-blur-sm ${notice.type==='success' ? 'bg-white/95 text-primary ring-black/10' : 'bg-red-600 text-white ring-red-700/40'}`}
        >
          <div className="flex items-start gap-3">
            {notice.type === 'success' ? (
              <svg className="h-5 w-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ) : (
              <svg className="h-5 w-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
            )}
            <div className="text-sm leading-5">{notice.text}</div>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="ml-auto rounded p-1 opacity-70 hover:opacity-100 focus:outline-none"
              aria-label={isEN ? 'Close notification' : isFR ? 'Fermer la notification' : 'Cerrar notificación'}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}