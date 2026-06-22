export const CSRF_COOKIE = "CSRF_TOKEN";
export const CSRF_HEADER = "x-csrf-token";

// Client-side only: reads the CSRF token from the readable cookie set at login.
export function readCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)CSRF_TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
