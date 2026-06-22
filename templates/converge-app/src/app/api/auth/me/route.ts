import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import axios from "axios";

import { applyCors, corsPreflight } from "@/lib/cors";
import { env } from "../../@lib/env";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request, ["GET"]);
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("ACCESS_TOKEN")?.value;

  if (!accessToken) {
    return applyCors(request, NextResponse.json({ error: "Unauthenticated" }, { status: 401 }));
  }

  let userId: string | undefined;
  try {
    const claims = decodeJwt(accessToken);
    const candidate = claims.sub ?? claims.id ?? claims.userId;
    userId = candidate ? String(candidate) : undefined;
  } catch {
    // malformed token
  }

  if (!userId) {
    return applyCors(request, NextResponse.json({ error: "Invalid session" }, { status: 401 }));
  }

  try {
    const upstream = await axios.get(`${env.IDENTITY_SERVICE}/users/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return applyCors(request, NextResponse.json(upstream.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return applyCors(request, NextResponse.json(error.response.data, { status: error.response.status }));
    }
    console.error("[auth/me] upstream failed:", error);
    return applyCors(request, NextResponse.json({ error: "Failed to load session" }, { status: 502 }));
  }
}
