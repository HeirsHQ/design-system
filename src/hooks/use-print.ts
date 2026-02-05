import { useReactToPrint, type UseReactToPrintFn } from "react-to-print";
import { useState } from "react";
import type React from "react";

interface UsePrintProps {
  /** Ref to the element to print */
  contentRef: React.RefObject<HTMLElement>;
  /** Title for the printed document */
  documentTitle: string;
  /** Callback fired after printing completes */
  onAfterPrint: () => void;
  /** Async callback fired before printing starts */
  onBeforePrint: () => Promise<void>;
  /** Callback fired when a print error occurs */
  onPrintError: (errorLocation: "onBeforePrint" | "print", error: Error) => void;
}

interface UsePrintReturn {
  /** Function to trigger the print dialog */
  handlePrint: UseReactToPrintFn;
  /** Whether printing is in progress */
  isPrinting: boolean;
}

/**
 * Hook for printing React components using react-to-print.
 * Provides loading state and lifecycle callbacks.
 *
 * @param props - Configuration options
 * @param props.contentRef - Ref to the element to print
 * @param props.documentTitle - Title for the print document
 * @param props.onAfterPrint - Callback after printing
 * @param props.onBeforePrint - Async callback before printing
 * @param props.onPrintError - Error callback
 * @returns Object with print handler and printing state
 *
 * @example
 * ```tsx
 * const contentRef = useRef<HTMLDivElement>(null);
 *
 * const { handlePrint, isPrinting } = usePrint({
 *   contentRef,
 *   documentTitle: "My Document",
 *   onAfterPrint: () => console.log("Print complete"),
 *   onBeforePrint: async () => {
 *     // Prepare document for printing
 *   },
 *   onPrintError: (location, error) => console.error(location, error),
 * });
 *
 * return (
 *   <div>
 *     <button onClick={handlePrint} disabled={isPrinting}>
 *       {isPrinting ? "Printing..." : "Print"}
 *     </button>
 *     <div ref={contentRef}>Content to print</div>
 *   </div>
 * );
 * ```
 */
export const usePrint = ({ contentRef, documentTitle, onAfterPrint, onBeforePrint, onPrintError }: UsePrintProps): UsePrintReturn => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    onAfterPrint: () => {
      setIsPrinting(false);
      onAfterPrint();
    },
    onBeforePrint: async () => {
      setIsPrinting(true);
      await onBeforePrint();
    },
    onPrintError: (errorLocation, error) => {
      setIsPrinting(false);
      onPrintError(errorLocation, error);
    },
  });

  return { handlePrint, isPrinting };
};
