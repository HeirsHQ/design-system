"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Hook that returns the previous value of a variable.
 *
 * @param value - The current value to track
 * @returns The previous value (undefined on first render)
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * // On first render: prevCount is undefined
 * // After incrementing: prevCount is the old value
 *
 * return (
 *   <div>
 *     <p>Current: {count}</p>
 *     <p>Previous: {prevCount ?? "N/A"}</p>
 *     <button onClick={() => setCount(c => c + 1)}>Increment</button>
 *   </div>
 * );
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(ref.current);
    ref.current = value;
  }, [value]);

  return previous;
}
