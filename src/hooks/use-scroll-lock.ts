import { useEffect, useRef } from "react";

/**
 * Hook that locks body scroll when enabled.
 * Useful for modals, dialogs, and mobile navigation.
 *
 * @param lock - Whether to lock scroll
 *
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose, children }) {
 *   useScrollLock(isOpen);
 *
 *   if (!isOpen) return null;
 *
 *   return (
 *     <div className="modal">
 *       {children}
 *       <button onClick={onClose}>Close</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollLock(lock: boolean): void {
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (lock) {
      // Save current scroll position
      scrollPosition.current = window.scrollY;

      // Get scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply styles to lock scroll
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";
    } else {
      // Remove styles and restore scroll position
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [lock]);
}
