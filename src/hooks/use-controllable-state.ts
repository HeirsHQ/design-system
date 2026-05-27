"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Options for useControllableState hook.
 */
export interface UseControllableStateOptions<T> {
  /** The controlled value (makes the component controlled) */
  prop?: T | undefined;
  /** The default value for uncontrolled mode */
  defaultProp?: T | undefined;
  /** Callback when value changes */
  onChange?: ((value: T) => void) | undefined;
}

/**
 * Return type for useControllableState hook.
 */
export type UseControllableStateReturn<T> = [T, (value: T | ((prev: T) => T)) => void];

/**
 * Hook for creating components that can be both controlled and uncontrolled.
 *
 * @param options - Configuration options
 * @returns A tuple of [value, setValue]
 *
 * @example
 * ```tsx
 * interface InputProps {
 *   value?: string;
 *   defaultValue?: string;
 *   onChange?: (value: string) => void;
 * }
 *
 * function Input({ value: valueProp, defaultValue, onChange }: InputProps) {
 *   const [value, setValue] = useControllableState({
 *     prop: valueProp,
 *     defaultProp: defaultValue ?? "",
 *     onChange,
 *   });
 *
 *   return (
 *     <input
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 *
 * // Uncontrolled usage
 * <Input defaultValue="hello" />
 *
 * // Controlled usage
 * const [value, setValue] = useState("hello");
 * <Input value={value} onChange={setValue} />
 * ```
 */
export function useControllableState<T>({ prop, defaultProp, onChange }: UseControllableStateOptions<T>): UseControllableStateReturn<T> {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultProp as T);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledValue;

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const setter = nextValue as (prev: T) => T;
      const newValue = typeof nextValue === "function" ? setter(value) : nextValue;

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      onChangeRef.current?.(newValue);
    },
    [isControlled, value],
  );

  return [value, setValue];
}
