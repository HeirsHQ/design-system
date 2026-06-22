import { readCsrfToken, CSRF_HEADER } from "./csrf";

/**
 * Clears auth tokens server-side (removes HttpOnly cookies).
 * Must be called from async contexts — use `await clearAuthCookies()`.
 */
export const clearAuthCookies = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  const csrf = readCsrfToken();
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: csrf ? { [CSRF_HEADER]: csrf } : {},
  });
};

/**
 * Persists tokens as HttpOnly cookies via the server-side token route.
 * Call immediately after a successful sign-in response.
 */
export const setAuthTokens = async (payload: {
  accessToken: string;
  refreshToken?: string;
  companyId: string;
}): Promise<void> => {
  await fetch("/api/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
