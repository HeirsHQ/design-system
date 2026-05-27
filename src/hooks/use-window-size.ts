"use client";

import { useState, useEffect } from "react";

/**
 * Window size dimensions.
 */
export interface WindowSize {
  /** Window width in pixels */
  width: number;
  /** Window height in pixels */
  height: number;
}

/**
 * Hook that tracks window dimensions.
 *
 * @returns Object with width and height of the window
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 *
 * return (
 *   <div>
 *     <p>Window size: {width} x {height}</p>
 *     {width < 768 && <MobileNav />}
 *   </div>
 * );
 * ```
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
