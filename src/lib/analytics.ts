export {
  CONSENT_DEFAULT,
  CONSENT_GRANTED,
  CONSENT_POLICY_DEFAULT_STATE,
  CONSENT_STORAGE_KEY,
  buildWhatsAppPayload,
  getAnalyticsConsent,
  getAnalyticsCookieNames,
  isAnalyticsConsent,
  isValidMeasurementId,
  isWhatsAppUrl,
  loadGoogleAnalytics,
  parseStoredConsent,
  revokeAnalytics,
  setAnalyticsConsent,
  trackWhatsAppClick,
} from "./analytics-core.mjs";

export type {
  AnalyticsBrand,
  AnalyticsConsent,
  AnalyticsLocale,
} from "./analytics-core.mjs";
