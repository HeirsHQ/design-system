import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect.js";

/**
 * Hook that attaches an event listener to a target element.
 *
 * @param eventName - The event name to listen for
 * @param handler - The event handler function
 * @param element - The target element (defaults to window)
 * @param options - Optional event listener options
 *
 * @example
 * ```tsx
 * // Listen to window events
 * useEventListener("resize", () => {
 *   console.log("Window resized");
 * });
 *
 * // Listen to document events
 * useEventListener("keydown", (e) => {
 *   if (e.key === "Escape") closeModal();
 * }, document);
 *
 * // Listen to element events
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useEventListener("click", handleClick, buttonRef);
 * ```
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  KW extends keyof WindowEventMap,
  KD extends keyof DocumentEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KD | KH,
  handler: (event: WindowEventMap[KW] | DocumentEventMap[KD] | HTMLElementEventMap[KH] | Event) => void,
  element?: Document | React.RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void {
  // Store handler in ref to avoid re-adding listener when handler changes
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Get the target element
    let targetElement: EventTarget | null = null;
    if (element === undefined) {
      targetElement = window;
    } else if (element instanceof Document) {
      targetElement = element;
    } else if (element.current) {
      targetElement = element.current;
    }

    if (!targetElement?.addEventListener) {
      return;
    }

    const eventListener = (event: Event) => {
      savedHandler.current(event as Parameters<typeof handler>[0]);
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
