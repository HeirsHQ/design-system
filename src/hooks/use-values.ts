import { useState } from "react";

/**
 * Hook for managing an object of values as state.
 * Exposes a stable per-key setter so callers don't need to spread the previous object themselves.
 *
 * @example
 * ```tsx
 * const { values, onValueChange } = useValues({ name: "", email: "" });
 * onValueChange("name", "Ada");
 * ```
 */
export const useValues = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const handleValueChange = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return { onValueChange: handleValueChange, values };
};
