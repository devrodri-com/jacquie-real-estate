// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Rate limit in-memory map
// NOTE: This is a best-effort solution for serverless environments.
// The rate limit state can be reset between function invocations in serverless deployments.
// For production with higher traffic, consider using Redis or a dedicated rate limiting service.
type RateLimitEntry = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

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

// TEMP: Email sending disabled until Resend is configured with Jacquie's domain
export async function POST(req: Request) {
  try {
    const { 
      nombre, 
      email, 
      mensaje, 
      telefonoE164, 
      country,
      company,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term
    } = await req.json();

    // Honeypot check: if company field has any value, it's spam
    if (company && typeof company === "string" && company.trim() !== "") {
      // Silent drop: return success but don't send email
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Rate limit check
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    if (!nombre || !email || !mensaje || !telefonoE164) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    return Response.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Unexpected error" }, { status: 500 });
  }
}