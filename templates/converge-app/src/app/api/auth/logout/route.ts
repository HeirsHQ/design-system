import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAMES, httpOnlyCookieBase } from "@/lib/cookie-config";
import { applyCors, corsPreflight } from "@/lib/cors";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request, ["POST"]);
}

export async function POST(request: NextRequest) {
  const res = NextResponse.json({ ok: true });

  for (const name of AUTH_COOKIE_NAMES) {
    res.cookies.set(name, "", { ...httpOnlyCookieBase, maxAge: 0 });
  }

  return applyCors(request, res);
}
