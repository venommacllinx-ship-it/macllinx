import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const start = Date.now();
  const url = request.nextUrl;

  // Skip logging for static assets and _next internal routes to reduce noise
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Continue to the route
  const response = NextResponse.next();

  // Add response time header
  const duration = Date.now() - start;
  response.headers.set("X-Response-Time", `${duration}ms`);

  // Only log in development or if explicitly enabled
  if (process.env.NODE_ENV === "development" || process.env.LOG_REQUESTS === "true") {
    // Use console instead of logger to avoid potential circular dependencies
    // eslint-disable-next-line no-console
    console.log(`[${request.method}] ${url.pathname} - ${response.status} (${duration}ms)`);
  }

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
