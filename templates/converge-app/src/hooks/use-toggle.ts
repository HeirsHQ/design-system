"use client";

import { useState, useCallback } from "react";

/**
 * Return type for useToggle hook.
 */
export type UseToggleReturn = [
  /** Current boolean value */
  boolean,
  /** Toggle function - can be called without args to toggle, or with a boolean to set directly */
  (value?: boolean) => void,
];

/**
 * Hook for managing boolean toggle state.
 *
 * @param initialValue - The initial boolean value (default: false)
 * @returns A tuple of [value, toggle]
 *
 * @example
 * ```tsx
 * const [isOpen, toggleOpen] = useToggle(false);
 *
 * // Toggle the value
 * toggleOpen();
 *
 * // Set to specific value
 * toggleOpen(true);
 * toggleOpen(false);
 *
 * return (
 *   <div>
 *     <button onClick={() => toggleOpen()}>Toggle</button>
 *     <button onClick={() => toggleOpen(false)}>Close</button>
 *     {isOpen && <Modal />}
 *   </div>
 * );
 * ```
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((newValue?: boolean) => {
    setValue((prev) => (typeof newValue === "boolean" ? newValue : !prev));
  }, []);

  return [value, toggle];
}
