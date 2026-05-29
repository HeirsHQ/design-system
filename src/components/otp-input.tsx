import React, { useRef } from "react";

import { cn } from "../lib/utils.js";

interface OtpInputProps {
  /** Number of OTP digits (default: 6) */
  length?: number;
  /** Current OTP string value */
  value: string;
  /** Called with the updated OTP string on every change */
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * Numeric OTP input that renders individual digit boxes.
 * Handles paste, backspace navigation, and digit-only validation.
 *
 * @example
 * ```tsx
 * <OtpInput length={6} value={otp} onChange={setOtp} />
 * ```
 */
function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;

    const digits = value.split("");
    digits[index] = char;
    const next = digits.join("").slice(0, length);
    onChange(next);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "border-input focus-visible:border-primary-400 size-12 rounded-md border bg-transparent text-center text-lg font-semibold shadow-xs transition-[color,box-shadow,border] duration-500 outline-none",
          )}
        />
      ))}
    </div>
  );
}

export { OtpInput };
