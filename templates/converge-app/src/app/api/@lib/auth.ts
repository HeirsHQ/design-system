import { NextRequest } from "next/server";
import { decodeJwt } from "jose";

export interface RequestContext {
  tenantId: string;
  userId: string;
  token: string;
}

export function getRequestContext(req: NextRequest): RequestContext | null {
  const tenantId = req.headers.get("company-id") ?? req.headers.get("x-tenant-id");

  // Read token from HttpOnly cookie first, fall back to Authorization header
  const cookieToken = req.cookies.get("ACCESS_TOKEN")?.value;
  const headerToken = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const token = cookieToken ?? headerToken;

  if (!tenantId || !token) return null;

  let userId = "unknown";
  try {
    // decodeJwt parses the payload without verifying the signature.
    // Full verification is delegated to each downstream microservice.
    const claims = decodeJwt(token);
    userId = String(claims.sub ?? claims.id ?? claims.userId ?? "unknown");
  } catch {
    // not a JWT or malformed — userId stays "unknown"
  }

  return { tenantId, userId, token };
}

const MAX_PAGE_SIZE = 100;

export function parsePageParams(url: URL) {
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(url.searchParams.get("limit") ?? 20)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
