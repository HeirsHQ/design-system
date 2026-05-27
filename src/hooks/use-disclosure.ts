"use client";

import { useState, useCallback, useMemo } from "react";

/**
 * Return type for useDisclosure hook.
 */
export interface UseDisclosureReturn {
  /** Whether the disclosure is open */
  isOpen: boolean;
  /** Function to open the disclosure */
  open: () => void;
  /** Function to close the disclosure */
  close: () => void;
  /** Function to toggle the disclosure */
  toggle: () => void;
  /** Function to set the disclosure state directly */
  setIsOpen: (value: boolean) => void;
  /** Props to spread on the trigger element */
  getButtonProps: () => {
    "aria-expanded": boolean;
    onClick: () => void;
  };
  /** Props to spread on the disclosure panel */
  getDisclosureProps: () => {
    hidden: boolean;
  };
}

/**
 * Options for useDisclosure hook.
 */
export interface UseDisclosureOptions {
  /** Initial open state */
  defaultIsOpen?: boolean | undefined;
  /** Controlled open state */
  isOpen?: boolean | undefined;
  /** Callback when state changes */
  onOpen?: (() => void) | undefined;
  /** Callback when closed */
  onClose?: (() => void) | undefined;
}

/**
 * Hook for managing disclosure state (modals, dropdowns, accordions, etc.).
 *
 * @param options - Configuration options
 * @returns Disclosure state and control functions
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle, getButtonProps, getDisclosureProps } = useDisclosure();
 *
 * return (
 *   <div>
 *     <button {...getButtonProps()}>Toggle Menu</button>
 *     <div {...getDisclosureProps()}>
 *       <p>Menu content</p>
 *       <button onClick={close}>Close</button>
 *     </div>
 *   </div>
 * );
 *
 * // With callbacks
 * const modal = useDisclosure({
 *   onOpen: () => console.log("Modal opened"),
 *   onClose: () => console.log("Modal closed"),
 * });
 * ```
 */
export function useDisclosure(options: UseDisclosureOptions = {}): UseDisclosureReturn {
  const { defaultIsOpen = false, isOpen: isOpenProp, onOpen, onClose } = options;

  const [isOpenState, setIsOpenState] = useState(defaultIsOpen);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const open = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(true);
    }
    onOpen?.();
  }, [isControlled, onOpen]);

  const close = useCallback(() => {
    if (!isControlled) {
      setIsOpenState(false);
    }
    onClose?.();
  }, [isControlled, onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (value) {
        open();
      } else {
        close();
      }
    },
    [open, close],
  );

  const getButtonProps = useCallback(
    () => ({
      "aria-expanded": isOpen,
      onClick: toggle,
    }),
    [isOpen, toggle],
  );

  const getDisclosureProps = useCallback(
    () => ({
      hidden: !isOpen,
    }),
    [isOpen],
  );

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      setIsOpen,
      getButtonProps,
      getDisclosureProps,
    }),
    [isOpen, open, close, toggle, setIsOpen, getButtonProps, getDisclosureProps],
  );
}
