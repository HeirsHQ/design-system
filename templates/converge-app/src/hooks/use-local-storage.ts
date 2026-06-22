"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook that syncs state with localStorage.
 *
 * @param key - The localStorage key
 * @param initialValue - The initial value if nothing is stored
 * @returns A tuple of [value, setValue, removeValue]
 *
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");
 * const [user, setUser] = useLocalStorage<User | null>("user", null);
 *
 * // Update value
 * setTheme("dark");
 *
 * // Remove from storage
 * removeTheme();
 * ```
 */
interface UseLocalStorageOptions {
  onError?: (error: unknown) => void;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get stored value or use initial
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update localStorage when state changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new StorageEvent("storage", { key, newValue: JSON.stringify(valueToStore) }));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
        options?.onError?.(error);
      }
    },
    [key, storedValue],
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new StorageEvent("storage", { key, newValue: null }));
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
      options?.onError?.(error);
    }
  }, [key, initialValue]);

  // Sync with other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== JSON.stringify(storedValue)) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue, storedValue]);

  return [storedValue, setValue, removeValue];
}
