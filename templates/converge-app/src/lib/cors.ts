import { NextRequest, NextResponse } from "next/server";

const REMOTE_ORIGIN_ENV_KEYS = [
  "NEXT_PUBLIC_CONVERGE_ASSETS_URL",
  "NEXT_PUBLIC_CONVERGE_BUDGET_URL",
  "NEXT_PUBLIC_CONVERGE_CRM_URL",
  "NEXT_PUBLIC_CONVERGE_FINANCE_URL",
  "NEXT_PUBLIC_CONVERGE_INVENTORY_URL",
  "NEXT_PUBLIC_CONVERGE_LOANS_URL",
  "NEXT_PUBLIC_CONVERGE_PROCUREMENT_URL",
  "NEXT_PUBLIC_CONVERGE_SALES_URL",
] as const;

const buildAllowedOrigins = (): Set<string> => {
  const origins = new Set<string>();
  for (const key of REMOTE_ORIGIN_ENV_KEYS) {
    const value = process.env[key];
    if (!value) continue;
    try {
      origins.add(new URL(value).origin);
    } catch {
      // ignore malformed env values
    }
  }
  return origins;
};

const allowedOrigins = buildAllowedOrigins();

export const isAllowedOrigin = (origin: string | null): origin is string => !!origin && allowedOrigins.has(origin);

export const applyCors = (req: NextRequest, res: NextResponse): NextResponse => {
  const origin = req.headers.get("origin");
  if (isAllowedOrigin(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Vary", "Origin");
  }
  return res;
};

export const corsPreflight = (req: NextRequest, methods: string[]): NextResponse => {
  const res = new NextResponse(null, { status: 204 });
  const origin = req.headers.get("origin");
  if (isAllowedOrigin(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Methods", [...methods, "OPTIONS"].join(", "));
    res.headers.set(
      "Access-Control-Allow-Headers",
      req.headers.get("access-control-request-headers") ?? "Content-Type, X-CSRF-Token",
    );
    res.headers.set("Access-Control-Max-Age", "86400");
    res.headers.set("Vary", "Origin");
  }
  return res;
};
