import { NextRequest, NextResponse } from "next/server";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const CSRF_EXEMPT_EXACT = new Set(["/api/auth/token"]);
const CSRF_EXEMPT_PREFIXES = ["/api/proxy/identity/auth/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!MUTATING_METHODS.has(request.method)) return NextResponse.next();
  if (CSRF_EXEMPT_EXACT.has(pathname)) return NextResponse.next();
  if (CSRF_EXEMPT_PREFIXES.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const cookieToken = request.cookies.get("CSRF_TOKEN")?.value;
  const headerToken = request.headers.get("x-csrf-token");

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
