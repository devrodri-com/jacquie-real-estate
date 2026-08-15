// middleware.ts
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/^\/(es|en|fr)(\/|$)/);
  const locale = match?.[1] ?? "es";
  response.headers.set("x-locale", locale);
  return response;
}

export const config = { matcher: ["/", "/(es|en|fr)/:path*"] };