import { NextRequest, NextResponse } from "next/server";

import { httpOnlyCookieBase, readableCookieBase } from "@/lib/cookie-config";

interface TokenPayload {
  accessToken: string;
  refreshToken?: string;
  companyId: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as TokenPayload;
  const { accessToken, refreshToken, companyId } = body;

  if (!accessToken || !companyId) {
    return NextResponse.json({ error: "Missing required token fields" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("ACCESS_TOKEN", accessToken, { ...httpOnlyCookieBase, maxAge: 15 * 60 });
  res.cookies.set("COMPANY_ID", companyId, { ...httpOnlyCookieBase, maxAge: 7 * 24 * 60 * 60 });

  res.cookies.set("SESSION_EXISTS", "1", { ...readableCookieBase, maxAge: 7 * 24 * 60 * 60 });
  // CSRF_TOKEN must be readable by JS (httpOnly: false) so the client can echo it in the X-CSRF-Token header.
  res.cookies.set("CSRF_TOKEN", crypto.randomUUID(), { ...readableCookieBase, maxAge: 7 * 24 * 60 * 60 });

  if (refreshToken) {
    res.cookies.set("REFRESH_TOKEN", refreshToken, { ...httpOnlyCookieBase, maxAge: 7 * 24 * 60 * 60 });
  }

  return res;
}
