import { useCallback, useEffect } from "react";
import type React from "react";

/**
 * Hook that detects clicks outside of a referenced element.
 *
 * @param callback - Function to call when a click outside is detected
 * @param ref - React ref object pointing to the element to monitor
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(() => setIsOpen(false), ref);
 *
 * return <div ref={ref}>Click outside to close</div>;
 * ```
 */
export const useClickOutside = (callback: () => void, ref: React.RefObject<HTMLElement | null>) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    },
    [callback, ref],
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);
};
