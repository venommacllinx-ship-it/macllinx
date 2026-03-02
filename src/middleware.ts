import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "./lib/logger";

export function middleware(request: NextRequest) {
  const start = Date.now();
  const url = request.nextUrl;

  // Log incoming request
  logger.info(`→ ${request.method} ${url.pathname}${url.search}`, {
    method: request.method,
    path: url.pathname,
    userAgent: request.headers.get("user-agent")?.slice(0, 100),
  });

  // Continue to the route
  const response = NextResponse.next();

  // Add response time header and log
  const duration = Date.now() - start;
  response.headers.set("X-Response-Time", `${duration}ms`);

  logger.info(`← ${request.method} ${url.pathname} - ${response.status} (${duration}ms)`, {
    method: request.method,
    path: url.pathname,
    status: response.status,
    durationMs: duration,
  });

  return response;
}

// Configure middleware to run on all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
