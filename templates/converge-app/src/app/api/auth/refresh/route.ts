import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { httpOnlyCookieBase } from "@/lib/cookie-config";
import { env } from "../../@lib/env";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("REFRESH_TOKEN")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const response = await axios.post<{ accessToken: string }>(`${env.IDENTITY_SERVICE}/auth/refresh`, null, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    const { accessToken } = response.data;

    const res = NextResponse.json({ accessToken });
    res.cookies.set("ACCESS_TOKEN", accessToken, { ...httpOnlyCookieBase, maxAge: 15 * 60 });

    return res;
  } catch (error) {
    console.error("[auth/refresh] failed:", error);
    return NextResponse.json({ error: "Token refresh failed" }, { status: 401 });
  }
}
