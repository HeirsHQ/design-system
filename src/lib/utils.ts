import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 * Handles conditional classes and resolves Tailwind CSS conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn("px-2 py-1", "px-4") // => "py-1 px-4"
 * cn("text-red-500", isActive && "text-blue-500")
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a shallow copy of `params` with all null, undefined, and empty-string
 * values stripped out. Useful for building clean query payloads.
 *
 * @example
 * ```ts
 * removeNullorUndefined({ name: "Ada", role: null, age: undefined, note: "" })
 * // => { name: "Ada" }
 * ```
 */
export function removeNullorUndefined<T extends object>(params: T) {
  const cleaned = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ""));
  return cleaned as Partial<T>;
}
