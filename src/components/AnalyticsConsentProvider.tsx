"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_STORAGE_KEY,
  isValidMeasurementId,
  isWhatsAppUrl,
  loadGoogleAnalytics,
  parseStoredConsent,
  revokeAnalytics,
  setAnalyticsConsent,
  trackWhatsAppClick,
  type AnalyticsConsent,
} from "@/lib/analytics";
import type { SiteLocale } from "@/lib/whatsapp";

type AnalyticsConsentContextValue = {
  enabled: boolean;
  consent: AnalyticsConsent;
  openSettings: () => void;
};

const AnalyticsConsentContext = createContext<AnalyticsConsentContextValue | null>(
  null,
);

const COPY: Record<
  SiteLocale,
  {
    title: string;
    description: string;
    accept: string;
    deny: string;
    privacy: string;
    settingsGranted: string;
    settingsDenied: string;
  }
> = {
  es: {
    title: "Privacidad y analítica",
    description:
      "Usamos Google Analytics únicamente si aceptás, para entender cómo se utiliza el sitio y medir acciones como los clics en WhatsApp. No enviamos a Analytics tu nombre, email, teléfono ni el contenido de tus mensajes.",
    accept: "Aceptar Analytics",
    deny: "Continuar sin Analytics",
    privacy: "Ver política de privacidad",
    settingsGranted: "Analytics está habilitado.",
    settingsDenied: "Analytics está deshabilitado.",
  },
  en: {
    title: "Privacy and analytics",
    description:
      "We use Google Analytics only if you agree, to understand how the site is used and measure actions such as WhatsApp clicks. We do not send your name, email, phone number, or message content to Analytics.",
    accept: "Accept Analytics",
    deny: "Continue without Analytics",
    privacy: "View privacy policy",
    settingsGranted: "Analytics is enabled.",
    settingsDenied: "Analytics is disabled.",
  },
  fr: {
    title: "Confidentialité et analytique",
    description:
      "Nous utilisons Google Analytics uniquement si vous l’acceptez, afin de comprendre l’utilisation du site et de mesurer des actions comme les clics vers WhatsApp. Nous n’envoyons à Analytics ni votre nom, ni votre courriel, ni votre numéro de téléphone, ni le contenu de vos messages.",
    accept: "Accepter Analytics",
    deny: "Continuer sans Analytics",
    privacy: "Voir la politique de confidentialité",
    settingsGranted: "Analytics est activé.",
    settingsDenied: "Analytics est désactivé.",
  },
};

let sessionConsent: AnalyticsConsent | null = null;

function readConsent(): AnalyticsConsent {
  if (sessionConsent) return sessionConsent;

  try {
    const stored = parseStoredConsent(
      window.localStorage.getItem(CONSENT_STORAGE_KEY),
    );
    if (stored) {
      sessionConsent = stored;
      return stored;
    }
  } catch {
    // A session-only decision remains available when localStorage is blocked.
  }

  return "unknown";
}

function persistConsent(value: AnalyticsConsent): void {
  sessionConsent = value;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Keep the valid decision in memory for the current session.
  }
}

function ConsentBanner({
  locale,
  consent,
  settingsOpen,
  onAccept,
  onDeny,
}: {
  locale: SiteLocale;
  consent: AnalyticsConsent;
  settingsOpen: boolean;
  onAccept: () => void;
  onDeny: () => void;
}) {
  const copy = COPY[locale];
  const firstActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (settingsOpen) firstActionRef.current?.focus();
  }, [settingsOpen]);

  return (
    <section
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-6xl rounded-xl border border-border-brand bg-paper p-4 text-ink shadow-[0_12px_40px_rgba(43,37,48,.16)] sm:inset-x-6 sm:bottom-6 sm:p-5"
      data-analytics-consent-banner
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-6">
        <div>
          <h2
            id="analytics-consent-title"
            className="text-base font-semibold text-primary sm:text-lg"
          >
            {copy.title}
          </h2>
          {settingsOpen && consent !== "unknown" ? (
            <p className="mt-1 text-xs font-semibold text-primary" role="status">
              {consent === "granted" ? copy.settingsGranted : copy.settingsDenied}
            </p>
          ) : null}
          <p
            id="analytics-consent-description"
            className="mt-2 max-w-[76ch] text-sm leading-6 text-foreground/78"
          >
            {copy.description}
          </p>
          <Link
            href={`/${locale}/privacidad`}
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            {copy.privacy}
          </Link>
        </div>

        <div className="flex flex-col gap-2 sm:min-w-[220px]">
          <button
            ref={firstActionRef}
            type="button"
            onClick={onAccept}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            {copy.accept}
          </button>
          <button
            type="button"
            onClick={onDeny}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/45 bg-paper px-4 text-sm font-semibold text-primary transition-colors hover:bg-brand-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            {copy.deny}
          </button>
        </div>
      </div>
    </section>
  );
}

export function AnalyticsConsentProvider({
  measurementId,
  locale,
  children,
}: {
  measurementId: string | null;
  locale: SiteLocale;
  children: ReactNode;
}) {
  const enabled = Boolean(measurementId && isValidMeasurementId(measurementId));
  const [consent, setConsent] = useState<AnalyticsConsent>("unknown");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!enabled || !measurementId) {
      setConsent("unknown");
      setAnalyticsConsent("unknown");
      return;
    }

    const storedConsent = readConsent();
    setConsent(storedConsent);
    setAnalyticsConsent(storedConsent);
    if (storedConsent === "granted") loadGoogleAnalytics(measurementId);
  }, [enabled, measurementId]);

  useEffect(() => {
    if (!enabled) return;

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || !isWhatsAppUrl(href)) return;

      trackWhatsAppClick(anchor.getAttribute("data-analytics") ?? "whatsapp");
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [enabled]);

  const applyConsent = useCallback(
    (nextConsent: Exclude<AnalyticsConsent, "unknown">) => {
      if (!enabled || !measurementId) return;

      persistConsent(nextConsent);
      setConsent(nextConsent);
      setSettingsOpen(false);
      setAnalyticsConsent(nextConsent);

      if (nextConsent === "granted") {
        loadGoogleAnalytics(measurementId);
      } else {
        revokeAnalytics(measurementId);
      }
    },
    [enabled, measurementId],
  );

  const contextValue: AnalyticsConsentContextValue = {
    enabled,
    consent,
    openSettings: () => {
      if (enabled) setSettingsOpen(true);
    },
  };

  return (
    <AnalyticsConsentContext.Provider value={contextValue}>
      {children}
      {enabled && (consent === "unknown" || settingsOpen) ? (
        <ConsentBanner
          locale={locale}
          consent={consent}
          settingsOpen={settingsOpen}
          onAccept={() => applyConsent("granted")}
          onDeny={() => applyConsent("denied")}
        />
      ) : null}
    </AnalyticsConsentContext.Provider>
  );
}

export function useAnalyticsConsent(): AnalyticsConsentContextValue {
  return (
    useContext(AnalyticsConsentContext) ?? {
      enabled: false,
      consent: "unknown",
      openSettings: () => undefined,
    }
  );
}
