import { useCallback, useState } from "react";

/**
 * Standardized hook for managing query/filter params across pages.
 * Keeps all params in one state object and exposes a stable setter and reset.
 *
 * @example
 * ```tsx
 * const { params, onParamChange, resetParams } = useParamsHandler({ page: 1, pageSize: 10, search: "" });
 * onParamChange("page", 2);
 * onParamChange("search", "john");
 * ```
 */
export const useParamsHandler = <T extends Record<string, unknown>>(initialParams: T) => {
  const [params, setParams] = useState<T>(initialParams);

  const onParamChange = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetParams = useCallback(() => setParams(initialParams), [initialParams]);

  return { params, onParamChange, resetParams };
};
