// middleware.ts
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Next.js prefetches every `<Link>` that scrolls into view, so a visitor sitting
 * on /fr silently triggers requests for /es and /en. next-intl treats each
 * matched request as a locale signal and rewrites NEXT_LOCALE on the response,
 * which lets a speculative prefetch overwrite the locale the visitor chose.
 *
 * Requests issued by the client router carry `next-url` (the route they were
 * issued from); a real top-level navigation never does. Only a top-level
 * navigation is a deliberate act, so only those may persist a preference.
 */
function isClientRouterRequest(request: NextRequest): boolean {
  return request.headers.has("next-url");
}

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  if (isClientRouterRequest(request)) {
    // Safe to drop wholesale: the locale cookie is the only cookie set here.
    response.headers.delete("set-cookie");
  }

  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/^\/(es|en|fr)(\/|$)/);
  const locale = match?.[1] ?? "es";
  response.headers.set("x-locale", locale);
  return response;
}

export const config = { matcher: ["/", "/(es|en|fr)/:path*"] };
