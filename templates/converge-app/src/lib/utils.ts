import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function paginate<T>(data: T[], page: number, limit: number, total: number): T[] {
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);
  if (startIndex >= total) return [];
  return data.slice(startIndex, endIndex);
}

export function removeNullorUndefined<
  T extends {
    [K in keyof T]: T[K] | null | undefined;
  },
>(params: T) {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ""),
  );
  return cleaned as Partial<T>;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function downloadUrl(src: File | string) {
  const link = document.createElement("a");
  if (typeof src === "string") {
    link.href = src;
    link.download = "";
  } else {
    const url = URL.createObjectURL(src);
    link.href = url;
    link.download = src.name;
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateUUID() {
  return crypto.randomUUID();
}
