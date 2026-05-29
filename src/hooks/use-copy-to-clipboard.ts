import { useState, useCallback } from "react";

/**
 * Return type for useCopyToClipboard hook.
 */
export interface UseCopyToClipboardReturn {
  /** The copied text, or null if nothing has been copied */
  copiedText: string | null;
  /** Whether the copy was successful */
  isCopied: boolean;
  /** Function to copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Function to reset the copied state */
  reset: () => void;
}

/**
 * Hook for copying text to the clipboard.
 *
 * @param resetDelay - Optional delay in ms to auto-reset the copied state (default: 2000)
 * @returns Object with copiedText, isCopied state, copy function, and reset function
 *
 * @example
 * ```tsx
 * const { copiedText, isCopied, copy, reset } = useCopyToClipboard();
 *
 * return (
 *   <button onClick={() => copy("Hello, World!")}>
 *     {isCopied ? "Copied!" : "Copy"}
 *   </button>
 * );
 * ```
 */
export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const reset = useCallback(() => {
    setCopiedText(null);
    setIsCopied(false);
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard API not available");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setIsCopied(true);

        if (resetDelay > 0) {
          setTimeout(reset, resetDelay);
        }

        return true;
      } catch (error) {
        console.warn("Failed to copy to clipboard:", error);
        setCopiedText(null);
        setIsCopied(false);
        return false;
      }
    },
    [resetDelay, reset],
  );

  return { copiedText, isCopied, copy, reset };
}
