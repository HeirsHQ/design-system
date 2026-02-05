import * as React from "react";

import { cn } from "../lib/utils.js";

/**
 * OTP Input context value.
 */
interface OTPInputContextValue {
  slots: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  disabled: boolean;
}

const OTPInputContext = React.createContext<OTPInputContextValue | null>(null);

function useOTPInputContext() {
  const context = React.useContext(OTPInputContext);
  if (!context) {
    throw new Error("OTPInput components must be used within an OTPInput");
  }
  return context;
}

/**
 * OTP Input component props.
 */
export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Number of OTP digits */
  length?: number | undefined;
  /** Current OTP value */
  value?: string | undefined;
  /** Called when OTP value changes */
  onChange?: ((value: string) => void) | undefined;
  /** Called when all digits are filled */
  onComplete?: ((value: string) => void) | undefined;
  /** Disable the input */
  disabled?: boolean | undefined;
}

/**
 * A one-time password input component.
 *
 * @example
 * ```tsx
 * <OTPInput length={6} onComplete={(otp) => console.log("OTP:", otp)}>
 *   <OTPInputGroup>
 *     <OTPInputSlot index={0} />
 *     <OTPInputSlot index={1} />
 *     <OTPInputSlot index={2} />
 *   </OTPInputGroup>
 *   <OTPInputSeparator />
 *   <OTPInputGroup>
 *     <OTPInputSlot index={3} />
 *     <OTPInputSlot index={4} />
 *     <OTPInputSlot index={5} />
 *   </OTPInputGroup>
 * </OTPInput>
 * ```
 */
const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({ className, length = 6, value = "", onChange, onComplete, disabled = false, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const currentValue = value !== undefined ? value : internalValue;
    const slots = currentValue.split("").concat(Array(length - currentValue.length).fill(""));

    const handleChange = React.useCallback(
      (newValue: string) => {
        const sanitized = newValue.replace(/[^0-9]/g, "").slice(0, length);
        if (value === undefined) {
          setInternalValue(sanitized);
        }
        onChange?.(sanitized);
        if (sanitized.length === length) {
          onComplete?.(sanitized);
        }
      },
      [length, onChange, onComplete, value],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (disabled) return;

        if (e.key === "Backspace") {
          e.preventDefault();
          const newValue = currentValue.slice(0, -1);
          handleChange(newValue);
          const prevIndex = Math.max(0, currentValue.length - 1);
          setActiveIndex(prevIndex);
          inputRefs.current[prevIndex]?.focus();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex = Math.max(0, index - 1);
          setActiveIndex(prevIndex);
          inputRefs.current[prevIndex]?.focus();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex = Math.min(length - 1, index + 1);
          setActiveIndex(nextIndex);
          inputRefs.current[nextIndex]?.focus();
        } else if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          const newValue = currentValue.slice(0, index) + e.key + currentValue.slice(index + 1);
          handleChange(newValue.slice(0, length));
          const nextIndex = Math.min(length - 1, index + 1);
          setActiveIndex(nextIndex);
          inputRefs.current[nextIndex]?.focus();
        }
      },
      [currentValue, disabled, handleChange, length],
    );

    const handlePaste = React.useCallback(
      (e: React.ClipboardEvent) => {
        if (disabled) return;
        e.preventDefault();
        const pastedData = e.clipboardData
          .getData("text")
          .replace(/[^0-9]/g, "")
          .slice(0, length);
        handleChange(pastedData);
        const nextIndex = Math.min(length - 1, pastedData.length);
        setActiveIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
      },
      [disabled, handleChange, length],
    );

    const contextValue = React.useMemo(
      () => ({
        slots,
        activeIndex,
        setActiveIndex,
        handleKeyDown,
        inputRefs,
        disabled,
      }),
      [slots, activeIndex, handleKeyDown, disabled],
    );

    return (
      <OTPInputContext.Provider value={contextValue}>
        <div ref={ref} className={cn("flex items-center gap-2", disabled && "opacity-50", className)} onPaste={handlePaste} {...props}>
          {children}
        </div>
      </OTPInputContext.Provider>
    );
  },
);
OTPInput.displayName = "OTPInput";

/**
 * OTP Input group component props.
 */
export interface OTPInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Groups OTP input slots together.
 */
const OTPInputGroup = React.forwardRef<HTMLDivElement, OTPInputGroupProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  );
});
OTPInputGroup.displayName = "OTPInputGroup";

/**
 * OTP Input slot component props.
 */
export interface OTPInputSlotProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onKeyDown"> {
  /** The index of this slot (0-based) */
  index: number;
}

/**
 * Individual OTP digit input slot.
 */
const OTPInputSlot = React.forwardRef<HTMLInputElement, OTPInputSlotProps>(({ className, index, disabled: slotDisabled, ...props }, ref) => {
  const { slots, activeIndex, setActiveIndex, handleKeyDown, inputRefs, disabled: contextDisabled } = useOTPInputContext();
  const value = slots[index] ?? "";
  const isActive = activeIndex === index;
  const disabled = slotDisabled ?? contextDisabled;

  const setRef = React.useCallback(
    (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    },
    [index, inputRefs, ref],
  );

  return (
    <input
      ref={setRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      disabled={disabled}
      className={cn(
        "h-10 w-10 rounded-md border border-gray-300 bg-transparent text-center text-sm text-gray-900 shadow-sm transition-all",
        "focus:ring-primary-400 focus:border-primary-400 focus:ring-2 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isActive && "ring-primary-400 border-primary-400 ring-2",
        className,
      )}
      onFocus={() => setActiveIndex(index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onChange={() => {}} // Controlled by parent
      {...props}
    />
  );
});
OTPInputSlot.displayName = "OTPInputSlot";

/**
 * OTP Input separator component props.
 */
export interface OTPInputSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Visual separator between OTP input groups.
 */
const OTPInputSeparator = React.forwardRef<HTMLDivElement, OTPInputSeparatorProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
    <span className="text-gray-400">-</span>
  </div>
));
OTPInputSeparator.displayName = "OTPInputSeparator";

export { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator };
