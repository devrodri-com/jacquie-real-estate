export const CONTACT_BODY_MAX_BYTES = 16 * 1024;
export const CONTACT_FIELD_LIMITS = {
  nombre: 100,
  email: 254,
  telefonoE164: 32,
  country: 4,
  mensaje: 4000,
  locale: 2,
  sourcePath: 200,
  utm: 120,
  honeypot: 120,
} as const;

export const CONTACT_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type ContactLocale = "es" | "en" | "fr";
export type ContactUtmKey = (typeof CONTACT_UTM_KEYS)[number];

export type ContactLead = {
  nombre: string;
  email: string;
  mensaje: string;
  telefonoE164: string;
  country: string;
  locale: ContactLocale;
  sourcePath: string;
  submittedAt: string;
  utms: Partial<Record<ContactUtmKey, string>>;
};

export type ActiveContactTransport = {
  configured: true;
  provider: "resend";
  apiKey: string;
  from: string;
  to: string[];
};

export type InactiveContactTransport = {
  configured: false;
};

export type ContactTransportState =
  | ActiveContactTransport
  | InactiveContactTransport;

export type ContactEmailMessage = {
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

export type ContactRateLimiter = {
  allow: (key: string) => boolean;
};

export type ContactRequestDependencies = {
  getTransportState: () => ContactTransportState;
  sendMessage: (
    transport: ActiveContactTransport,
    message: ContactEmailMessage
  ) => Promise<{ ok: boolean }>;
  rateLimiter: ContactRateLimiter;
  now?: () => Date;
};

type ReadBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; error: "payload_too_large" | "validation_error" };

type ParsedContactPayload =
  | { ok: true; lead: Omit<ContactLead, "submittedAt">; company: string }
  | { ok: false; fields: string[] };

const EMAIL_LOCAL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i;
const EMAIL_DOMAIN_LABEL_PATTERN = /^[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i;
const VALID_LOCALES = new Set<ContactLocale>(["es", "en", "fr"]);

export function isSafeEmailAddress(value: string): boolean {
  if (
    value.length === 0 ||
    value.length > CONTACT_FIELD_LIMITS.email ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return false;
  }

  const separatorIndex = value.lastIndexOf("@");
  if (separatorIndex <= 0 || separatorIndex !== value.indexOf("@")) {
    return false;
  }

  const localPart = value.slice(0, separatorIndex);
  const domain = value.slice(separatorIndex + 1);
  if (
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    !EMAIL_LOCAL_PATTERN.test(localPart)
  ) {
    return false;
  }

  const domainLabels = domain.split(".");
  return (
    domainLabels.length >= 2 &&
    domainLabels.every((label) => EMAIL_DOMAIN_LABEL_PATTERN.test(label))
  );
}

function normalizeEmailAddress(value: string): string {
  const separatorIndex = value.lastIndexOf("@");
  if (separatorIndex < 1) return value;

  return (
    value.slice(0, separatorIndex) +
    "@" +
    value.slice(separatorIndex + 1).toLowerCase()
  );
}

export function createInMemoryContactRateLimiter({
  maxRequests = 5,
  windowMs = 10 * 60 * 1000,
  now = Date.now,
}: {
  maxRequests?: number;
  windowMs?: number;
  now?: () => number;
} = {}): ContactRateLimiter {
  const entries = new Map<string, { count: number; resetAt: number }>();

  return {
    allow(key: string) {
      const currentTime = now();

      for (const [entryKey, entry] of entries) {
        if (entry.resetAt <= currentTime) entries.delete(entryKey);
      }

      const entry = entries.get(key);
      if (!entry || entry.resetAt <= currentTime) {
        entries.set(key, {
          count: 1,
          resetAt: currentTime + windowMs,
        });
        return true;
      }

      if (entry.count >= maxRequests) return false;
      entry.count += 1;
      return true;
    },
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: HeadersInit
): Response {
  const headers = new Headers(extraHeaders);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");

  return new Response(JSON.stringify(body), { status, headers });
}

async function readJsonBodyWithLimit(request: Request): Promise<ReadBodyResult> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const parsedLength = Number.parseInt(declaredLength, 10);
    if (
      Number.isFinite(parsedLength) &&
      parsedLength > CONTACT_BODY_MAX_BYTES
    ) {
      return { ok: false, error: "payload_too_large" };
    }
  }

  if (!request.body) return { ok: false, error: "validation_error" };

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let raw = "";

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;

    bytesRead += chunk.value.byteLength;
    if (bytesRead > CONTACT_BODY_MAX_BYTES) {
      await reader.cancel();
      return { ok: false, error: "payload_too_large" };
    }

    raw += decoder.decode(chunk.value, { stream: true });
  }

  raw += decoder.decode();

  try {
    return { ok: true, value: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false, error: "validation_error" };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  record: Record<string, unknown>,
  key: string,
  invalidFields: Set<string>,
  required = false
): string {
  const value = record[key];

  if (value === undefined || value === null) {
    if (required) invalidFields.add(key);
    return "";
  }

  if (typeof value !== "string") {
    invalidFields.add(key);
    return "";
  }

  return value.trim();
}

function hasLineBreak(value: string): boolean {
  return /[\r\n]/.test(value);
}

function parseContactPayload(value: unknown): ParsedContactPayload {
  if (!isRecord(value)) return { ok: false, fields: ["form"] };

  const invalidFields = new Set<string>();
  const nombre = readString(value, "nombre", invalidFields, true);
  const email = readString(value, "email", invalidFields, true);
  const mensaje = readString(value, "mensaje", invalidFields, true);
  const telefonoE164 = readString(
    value,
    "telefonoE164",
    invalidFields,
    true
  );
  const country = readString(value, "country", invalidFields, true);
  const localeValue = readString(value, "locale", invalidFields, true);
  const sourcePath = readString(value, "sourcePath", invalidFields, true);
  const company = readString(value, "company", invalidFields);

  if (
    nombre.length < 2 ||
    nombre.length > CONTACT_FIELD_LIMITS.nombre ||
    hasLineBreak(nombre)
  ) {
    invalidFields.add("nombre");
  }

  if (!isSafeEmailAddress(email)) invalidFields.add("email");

  if (
    mensaje.length < 10 ||
    mensaje.length > CONTACT_FIELD_LIMITS.mensaje
  ) {
    invalidFields.add("mensaje");
  }

  if (
    telefonoE164.length > CONTACT_FIELD_LIMITS.telefonoE164 ||
    !/^\+[1-9]\d{7,14}$/.test(telefonoE164)
  ) {
    invalidFields.add("telefonoE164");
  }

  if (
    country.length > CONTACT_FIELD_LIMITS.country ||
    !/^(?:[A-Z]{2}|INTL)$/.test(country)
  ) {
    invalidFields.add("country");
  }

  const locale = VALID_LOCALES.has(localeValue as ContactLocale)
    ? (localeValue as ContactLocale)
    : null;
  if (!locale) invalidFields.add("locale");

  if (
    sourcePath.length > CONTACT_FIELD_LIMITS.sourcePath ||
    hasLineBreak(sourcePath) ||
    !/^\/(?:es|en|fr)\/contacto\/?$/.test(sourcePath)
  ) {
    invalidFields.add("sourcePath");
  }

  if (company.length > CONTACT_FIELD_LIMITS.honeypot) {
    invalidFields.add("company");
  }

  const utms: Partial<Record<ContactUtmKey, string>> = {};
  for (const key of CONTACT_UTM_KEYS) {
    const utmValue = readString(value, key, invalidFields);
    if (!utmValue) continue;

    if (
      utmValue.length > CONTACT_FIELD_LIMITS.utm ||
      hasLineBreak(utmValue)
    ) {
      invalidFields.add(key);
      continue;
    }

    utms[key] = utmValue;
  }

  if (invalidFields.size > 0 || !locale) {
    return { ok: false, fields: [...invalidFields].sort() };
  }

  return {
    ok: true,
    company,
    lead: {
      nombre,
      email: normalizeEmailAddress(email),
      mensaje,
      telefonoE164,
      country,
      locale,
      sourcePath,
      utms,
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMultilineHtml(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

export function buildContactEmailMessage(
  lead: ContactLead
): ContactEmailMessage {
  const utmLines = CONTACT_UTM_KEYS
    .map((key) => [key, lead.utms[key]] as const)
    .filter((entry): entry is readonly [ContactUtmKey, string] =>
      Boolean(entry[1])
    )
    .map(([key, value]) => key + ": " + value);

  const text = [
    "Nuevo lead web - Jacquie Zárate",
    "",
    "Nombre: " + lead.nombre,
    "Email: " + lead.email,
    "Teléfono: " + lead.telefonoE164,
    "País del teléfono: " + lead.country,
    "",
    "Mensaje:",
    lead.mensaje,
    "",
    "Contexto:",
    "Locale: " + lead.locale,
    "Página: " + lead.sourcePath,
    "Fecha/hora: " + lead.submittedAt,
    ...(utmLines.length > 0 ? ["", "UTMs:", ...utmLines] : []),
  ].join("\n");

  const row = (label: string, rowValue: string) =>
    '<tr><td style="padding:8px 0;color:#6f6475;font-size:13px;">' +
    escapeHtml(label) +
    '</td><td style="padding:8px 0;color:#2B2530;font-size:15px;font-weight:600;">' +
    escapeHtml(rowValue || "No informado") +
    "</td></tr>";

  const utmRows = CONTACT_UTM_KEYS
    .map((key) => [key, lead.utms[key]] as const)
    .filter((entry): entry is readonly [ContactUtmKey, string] =>
      Boolean(entry[1])
    )
    .map(([key, value]) => row(key, value))
    .join("");

  const html =
    '<div style="margin:0;padding:0;background:#F8F5FA;font-family:Inter,Arial,sans-serif;color:#2B2530;">' +
    '<div style="max-width:640px;margin:0 auto;padding:28px 18px;">' +
    '<div style="background:#FFFFFF;border:1px solid rgba(59,39,74,.12);border-radius:14px;padding:28px;">' +
    '<p style="margin:0 0 8px;color:#A98BB8;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Nuevo lead web</p>' +
    '<h1 style="margin:0 0 22px;color:#3B274A;font-size:28px;line-height:1.12;font-family:Georgia,serif;font-weight:500;">Jacquie Zárate</h1>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">' +
    row("Nombre", lead.nombre) +
    row("Email", lead.email) +
    row("Teléfono", lead.telefonoE164) +
    row("País del teléfono", lead.country) +
    "</table>" +
    '<div style="margin:20px 0;padding:18px;border-radius:12px;background:#F8F5FA;border:1px solid rgba(59,39,74,.10);">' +
    '<p style="margin:0 0 8px;color:#6f6475;font-size:13px;">Mensaje</p>' +
    '<p style="margin:0;color:#2B2530;font-size:16px;line-height:1.65;">' +
    formatMultilineHtml(lead.mensaje) +
    "</p></div>" +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">' +
    row("Locale", lead.locale) +
    row("Página", lead.sourcePath) +
    row("Fecha/hora", lead.submittedAt) +
    utmRows +
    "</table></div></div></div>";

  return {
    replyTo: lead.email,
    subject: "Nuevo lead web — Jacquie Zárate",
    text,
    html,
  };
}

function simpleHash(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).slice(0, 8);
}

function getRateLimitKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim().slice(0, 64);

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim().slice(0, 64);

  return "ua:" + simpleHash(request.headers.get("user-agent") ?? "unknown");
}

export function createContactRequestHandler(
  dependencies: ContactRequestDependencies
): (request: Request) => Promise<Response> {
  return async function handleContactRequest(request: Request) {
    try {
      const contentType = request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase();

      if (contentType !== "application/json") {
        return jsonResponse(
          { ok: false, error: "validation_error" },
          415
        );
      }

      const bodyResult = await readJsonBodyWithLimit(request);
      if (!bodyResult.ok) {
        return jsonResponse(
          { ok: false, error: bodyResult.error },
          bodyResult.error === "payload_too_large" ? 413 : 400
        );
      }

      const parsed = parseContactPayload(bodyResult.value);

      if (
        isRecord(bodyResult.value) &&
        typeof bodyResult.value.company === "string" &&
        bodyResult.value.company.trim().length > 0
      ) {
        return jsonResponse({ ok: true }, 200);
      }

      if (!dependencies.rateLimiter.allow(getRateLimitKey(request))) {
        return jsonResponse(
          { ok: false, error: "rate_limited" },
          429,
          { "Retry-After": "600" }
        );
      }

      if (!parsed.ok) {
        return jsonResponse(
          {
            ok: false,
            error: "validation_error",
            fields: parsed.fields,
          },
          400
        );
      }

      const transport = dependencies.getTransportState();
      if (!transport.configured) {
        return jsonResponse(
          { ok: false, error: "email_not_configured" },
          503
        );
      }

      const lead: ContactLead = {
        ...parsed.lead,
        submittedAt: (dependencies.now ?? (() => new Date()))().toISOString(),
      };

      let sendResult: { ok: boolean };
      try {
        sendResult = await dependencies.sendMessage(
          transport,
          buildContactEmailMessage(lead)
        );
      } catch {
        return jsonResponse({ ok: false, error: "send_failed" }, 502);
      }

      if (!sendResult.ok) {
        return jsonResponse({ ok: false, error: "send_failed" }, 502);
      }

      return jsonResponse({ ok: true, status: "sent" }, 200);
    } catch {
      return jsonResponse({ ok: false, error: "unexpected_error" }, 500);
    }
  };
}
