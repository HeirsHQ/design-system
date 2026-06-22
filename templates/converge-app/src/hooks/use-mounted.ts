"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook that tracks whether the component is mounted.
 *
 * @returns Boolean indicating if the component is currently mounted
 *
 * @example
 * ```tsx
 * const isMounted = useMounted();
 *
 * useEffect(() => {
 *   fetchData().then((data) => {
 *     // Only update state if component is still mounted
 *     if (isMounted) {
 *       setData(data);
 *     }
 *   });
 * }, [isMounted]);
 * ```
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}

/**
 * Hook that returns a function to check if component is mounted.
 * Useful for async operations.
 *
 * @returns Function that returns true if component is mounted
 *
 * @example
 * ```tsx
 * const isMountedRef = useIsMountedRef();
 *
 * const handleClick = async () => {
 *   const data = await fetchData();
 *   if (isMountedRef()) {
 *     setData(data);
 *   }
 * };
 * ```
 */
export function useIsMountedRef(): () => boolean {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}
