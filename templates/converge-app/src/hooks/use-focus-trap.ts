"use client";

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

/**
 * Options for useFocusTrap hook.
 */
export interface UseFocusTrapOptions {
  /** Whether the trap is active */
  enabled?: boolean | undefined;
  /** Whether to auto-focus the first focusable element */
  autoFocus?: boolean | undefined;
  /** Whether to restore focus to the previously focused element on disable */
  restoreFocus?: boolean | undefined;
}

/**
 * Hook that traps focus within a container element.
 * Useful for modals, dialogs, and dropdown menus.
 *
 * @param options - Configuration options
 * @returns Ref to attach to the container element
 *
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose, children }) {
 *   const trapRef = useFocusTrap({ enabled: isOpen });
 *
 *   if (!isOpen) return null;
 *
 *   return (
 *     <div ref={trapRef} className="modal">
 *       {children}
 *       <button onClick={onClose}>Close</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions = {},
): React.RefObject<T | null> {
  const { enabled = true, autoFocus = true, restoreFocus = true } = options;
  const containerRef = useRef<T | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      // Shift + Tab
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [enabled, getFocusableElements],
  );

  useEffect(() => {
    if (!enabled) return;

    // Store previously focused element
    if (restoreFocus) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
    }

    // Auto-focus first element
    if (autoFocus) {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      if (firstElement) {
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus
      if (restoreFocus && previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [enabled, autoFocus, restoreFocus, getFocusableElements, handleKeyDown]);

  return containerRef;
}
