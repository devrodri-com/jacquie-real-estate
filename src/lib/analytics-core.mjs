const VALID_LOCALES = new Set(["es", "en", "fr"]);
const VALID_BRANDS = new Set(["jacquie", "lets_go_miami"]);
const VALID_CONSENTS = new Set(["unknown", "granted", "denied"]);
const loadedMeasurementIds = new Set();

export const CONSENT_STORAGE_KEY = "jacquie_analytics_consent_v1";

// Product state is denied_by_default; Google receives its supported "denied" value.
export const CONSENT_POLICY_DEFAULT_STATE = Object.freeze({
  analytics_storage: "denied_by_default",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
});

export const CONSENT_DEFAULT = Object.freeze({
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
});

export const CONSENT_GRANTED = Object.freeze({
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
});

let activeConsent = "unknown";

function getRuntime(runtime) {
  if (runtime && typeof runtime === "object") return runtime;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {};
  }
  return { window, document };
}

export function isValidMeasurementId(value) {
  return typeof value === "string" && /^G-[A-Z0-9]{6,}$/i.test(value.trim());
}

export function parseStoredConsent(value) {
  return value === "granted" || value === "denied" ? value : null;
}

export function isAnalyticsConsent(value) {
  return typeof value === "string" && VALID_CONSENTS.has(value);
}

export function setAnalyticsConsent(value) {
  activeConsent = isAnalyticsConsent(value) ? value : "unknown";
}

export function getAnalyticsConsent() {
  return activeConsent;
}

function getWindowAndDocument(runtime) {
  const resolved = getRuntime(runtime);
  return {
    window: resolved.window,
    document: resolved.document,
  };
}

export function loadGoogleAnalytics(measurementId, runtime) {
  if (!isValidMeasurementId(measurementId)) return false;

  const { window: runtimeWindow, document: runtimeDocument } =
    getWindowAndDocument(runtime);
  if (!runtimeWindow || !runtimeDocument) return false;

  const disableKey = `ga-disable-${measurementId}`;
  runtimeWindow[disableKey] = false;

  if (loadedMeasurementIds.has(measurementId)) return false;

  const existingScript = runtimeDocument.querySelector?.(
    `script[data-jacquie-ga4="${measurementId}"]`
  );
  if (existingScript) {
    loadedMeasurementIds.add(measurementId);
    return false;
  }

  runtimeWindow.dataLayer = Array.isArray(runtimeWindow.dataLayer)
    ? runtimeWindow.dataLayer
    : [];
  if (typeof runtimeWindow.gtag !== "function") {
    runtimeWindow.gtag = function gtag() {
      runtimeWindow.dataLayer.push(arguments);
    };
  }

  runtimeWindow.gtag("consent", "default", CONSENT_DEFAULT);
  runtimeWindow.gtag("consent", "update", CONSENT_GRANTED);
  runtimeWindow.gtag("js", new Date());
  runtimeWindow.gtag("config", measurementId, { anonymize_ip: true });

  const script = runtimeDocument.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    measurementId
  )}`;
  script.dataset.jacquieGa4 = measurementId;
  runtimeDocument.head.appendChild(script);
  loadedMeasurementIds.add(measurementId);
  return true;
}

export function getAnalyticsCookieNames(cookieHeader) {
  if (typeof cookieHeader !== "string") return [];

  return cookieHeader
    .split(";")
    .map((part) => part.trim().split("=", 1)[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
}

export function revokeAnalytics(measurementId, runtime) {
  setAnalyticsConsent("denied");
  if (!isValidMeasurementId(measurementId)) return [];

  const { window: runtimeWindow, document: runtimeDocument } =
    getWindowAndDocument(runtime);
  if (!runtimeWindow || !runtimeDocument) return [];

  runtimeWindow[`ga-disable-${measurementId}`] = true;
  const cookieNames = getAnalyticsCookieNames(runtimeDocument.cookie);
  const hostname = runtimeWindow.location?.hostname;
  const domains = hostname
    ? ["", `; domain=${hostname}`, `; domain=.${hostname}`]
    : [""];

  for (const name of cookieNames) {
    for (const domain of domains) {
      runtimeDocument.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }

  return cookieNames;
}

export function isWhatsAppUrl(href) {
  if (typeof href !== "string" || href.length === 0) return false;

  try {
    const url = new URL(href, "https://jacquiezarate.com");
    return (
      url.protocol === "https:" &&
      (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com")
    );
  } catch {
    return false;
  }
}

function normalizeLocale(value) {
  return VALID_LOCALES.has(value) ? value : "es";
}

function normalizePagePath(value) {
  const path = String(value || "/").split(/[?#]/, 1)[0] || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildWhatsAppPayload({ locale, pagePath, placement, brand }) {
  const normalizedBrand = VALID_BRANDS.has(brand) ? brand : "jacquie";
  const normalizedPlacement = String(placement || "whatsapp").trim() || "whatsapp";

  return {
    locale: normalizeLocale(locale),
    page_path: normalizePagePath(pagePath),
    placement: normalizedPlacement,
    brand: normalizedBrand,
  };
}

export function trackWhatsAppClick(placement, runtime) {
  if (activeConsent !== "granted") return false;

  const { window: runtimeWindow } = getWindowAndDocument(runtime);
  if (!runtimeWindow || typeof runtimeWindow.gtag !== "function") return false;

  const pagePath = normalizePagePath(runtimeWindow.location?.pathname);
  const locale = pagePath.split("/")[1] || "es";
  const brand = pagePath.includes("/lets-go-miami")
    ? "lets_go_miami"
    : "jacquie";
  runtimeWindow.gtag("event", "click_whatsapp", buildWhatsAppPayload({
    locale,
    pagePath,
    placement,
    brand,
  }));
  return true;
}

export function resetAnalyticsLoaderForTests() {
  loadedMeasurementIds.clear();
  activeConsent = "unknown";
}
