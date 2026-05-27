"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe version of useLayoutEffect.
 *
 * Uses useLayoutEffect on the client and useEffect on the server to avoid
 * React hydration warnings.
 *
 * @example
 * ```tsx
 * useIsomorphicLayoutEffect(() => {
 *   // This runs synchronously after DOM mutations
 *   // Safe to use in SSR environments
 *   const element = ref.current;
 *   if (element) {
 *     const { width } = element.getBoundingClientRect();
 *     setWidth(width);
 *   }
 * }, []);
 * ```
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
