import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAMES, httpOnlyCookieBase } from "@/lib/cookie-config";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  for (const name of AUTH_COOKIE_NAMES) {
    res.cookies.set(name, "", { ...httpOnlyCookieBase, maxAge: 0 });
  }

  return res;
}
