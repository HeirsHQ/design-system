const IS_PROD = process.env.NODE_ENV === "production";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

interface CookieBaseOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
  domain?: string;
}

export const httpOnlyCookieBase: CookieBaseOptions = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax",
  path: "/",
  ...(COOKIE_DOMAIN && { domain: COOKIE_DOMAIN }),
};

export const readableCookieBase: CookieBaseOptions = {
  httpOnly: false,
  secure: IS_PROD,
  sameSite: "lax",
  path: "/",
  ...(COOKIE_DOMAIN && { domain: COOKIE_DOMAIN }),
};

export const AUTH_COOKIE_NAMES = [
  "ACCESS_TOKEN",
  "REFRESH_TOKEN",
  "COMPANY_ID",
  "SESSION_EXISTS",
  "CSRF_TOKEN",
] as const;
