"use client";

import { useEffect, useRef } from "react";

/**
 * Hook that sets up an interval that is properly cleaned up on unmount.
 * The callback is stored in a ref to avoid re-creating the interval when the callback changes.
 *
 * @param callback - Function to call on each interval tick
 * @param delay - The interval delay in milliseconds
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * useInterval(() => setCount((c) => c + 1), 1000);
 *
 * return <div>Count: {count}</div>;
 * ```
 */
export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};
