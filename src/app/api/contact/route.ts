// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Rate limit in-memory map
// NOTE: This is a best-effort solution for serverless environments.
// The rate limit state can be reset between function invocations in serverless deployments.
// For production with higher traffic, consider using Redis or a dedicated rate limiting service.
type RateLimitEntry = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

let resendClient: Resend | null = null;

function getResend(apiKey: string): Resend {
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

// Simple hash function for user-agent (not cryptographically secure, just for rate limiting)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 8);
}

function getClientIP(req: Request): string {
  const headers = req.headers;
  // Try x-forwarded-for first (common in proxies/load balancers)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }
  // Fallback to x-real-ip
  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  // Last resort: use user-agent hash as fallback
  const userAgent = headers.get("user-agent") || "unknown";
  const uaHash = simpleHash(userAgent);
  return `unknown:${uaHash}`;
}

// Cleanup expired entries from rate limit map
function cleanupExpiredEntries(): void {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      keysToDelete.push(key);
    }
  }
  
  keysToDelete.forEach(key => rateLimitMap.delete(key));
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  
  // Cleanup expired entries on every check
  cleanupExpiredEntries();
  
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // First request or window expired, create new entry
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return false;
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(ip, entry);
  return true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStringField(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

function getConfiguredRecipients(): string[] {
  return (process.env.LEADS_TO ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function buildLeadText(payload: {
  nombre: string;
  email: string;
  mensaje: string;
  telefonoE164: string;
  country: string;
  locale: string;
  sourcePath: string;
  submittedAt: string;
  utms: Partial<Record<(typeof UTM_KEYS)[number], string>>;
}): string {
  const utmLines = UTM_KEYS
    .map((key) => [key, payload.utms[key]] as const)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${value}`);

  return [
    "Nuevo lead web - Jacquie Zarate Realtor",
    "",
    `Nombre: ${payload.nombre}`,
    `Email: ${payload.email}`,
    `Telefono: ${payload.telefonoE164}`,
    `Pais del telefono: ${payload.country || "No informado"}`,
    "",
    "Mensaje:",
    payload.mensaje,
    "",
    "Contexto:",
    `Locale: ${payload.locale || "No informado"}`,
    `Pagina: ${payload.sourcePath || "No informada"}`,
    `Fecha/hora: ${payload.submittedAt}`,
    ...(utmLines.length > 0 ? ["", "UTMs:", ...utmLines] : []),
  ].join("\n");
}

function buildLeadHtml(payload: {
  nombre: string;
  email: string;
  mensaje: string;
  telefonoE164: string;
  country: string;
  locale: string;
  sourcePath: string;
  submittedAt: string;
  utms: Partial<Record<(typeof UTM_KEYS)[number], string>>;
}): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 0;color:#6f6475;font-size:13px;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#2B2530;font-size:15px;font-weight:600;">${escapeHtml(value || "No informado")}</td>
    </tr>`;

  const utmRows = UTM_KEYS
    .map((key) => [key, payload.utms[key]] as const)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => row(key, value ?? ""))
    .join("");

  return `
    <div style="margin:0;padding:0;background:#F8F5FA;font-family:Inter,Arial,sans-serif;color:#2B2530;">
      <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
        <div style="background:#FFFFFF;border:1px solid rgba(59,39,74,.12);border-radius:14px;padding:28px;">
          <p style="margin:0 0 8px;color:#A98BB8;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Nuevo lead web</p>
          <h1 style="margin:0 0 22px;color:#3B274A;font-size:28px;line-height:1.12;font-family:Georgia,serif;font-weight:500;">Jacquie Zarate Realtor</h1>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            ${row("Nombre", payload.nombre)}
            ${row("Email", payload.email)}
            ${row("Telefono", payload.telefonoE164)}
            ${row("Pais del telefono", payload.country)}
          </table>
          <div style="margin:20px 0;padding:18px;border-radius:12px;background:#F8F5FA;border:1px solid rgba(59,39,74,.10);">
            <p style="margin:0 0 8px;color:#6f6475;font-size:13px;">Mensaje</p>
            <p style="margin:0;color:#2B2530;font-size:16px;line-height:1.65;">${formatMultilineHtml(payload.mensaje)}</p>
          </div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            ${row("Locale", payload.locale)}
            ${row("Pagina", payload.sourcePath)}
            ${row("Fecha/hora", payload.submittedAt)}
            ${utmRows}
          </table>
        </div>
      </div>
    </div>`;
}

export async function POST(req: Request) {
  try {
    const rawPayload: unknown = await req.json();
    if (!isRecord(rawPayload)) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const nombre = getStringField(rawPayload, "nombre");
    const email = getStringField(rawPayload, "email");
    const mensaje = getStringField(rawPayload, "mensaje");
    const telefonoE164 = getStringField(rawPayload, "telefonoE164");
    const country = getStringField(rawPayload, "country");
    const company = getStringField(rawPayload, "company");
    const locale = getStringField(rawPayload, "locale");
    const sourcePath = getStringField(rawPayload, "sourcePath");
    const utms = UTM_KEYS.reduce<Partial<Record<(typeof UTM_KEYS)[number], string>>>((acc, key) => {
      const value = getStringField(rawPayload, key);
      if (value) acc[key] = value;
      return acc;
    }, {});

    // Honeypot check: if company field has any value, it's spam
    if (company) {
      // Silent drop: return success but don't send email
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Rate limit check
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    if (!nombre || !email || !mensaje || !telefonoE164) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.CONTACT_FROM_EMAIL?.trim();
    const to = getConfiguredRecipients();

    if (!resendApiKey || !from || to.length === 0) {
      return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
    }

    const submittedAt = new Date().toISOString();
    const emailPayload = {
      nombre,
      email,
      mensaje,
      telefonoE164,
      country,
      locale,
      sourcePath,
      submittedAt,
      utms,
    };

    const { error } = await getResend(resendApiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: "Nuevo lead web — Jacquie Zarate Realtor",
      text: buildLeadText(emailPayload),
      html: buildLeadHtml(emailPayload),
    });

    if (error) {
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "unexpected_error" }, { status: 500 });
  }
}
