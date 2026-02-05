import * as React from "react";

import { cn } from "../lib/utils.js";

/**
 * Textarea component props.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text for the textarea */
  label?: string | undefined;
  /** Additional class names for the label */
  labelClassName?: string | undefined;
  /** Error message to display */
  error?: string | undefined;
  /** Helper text to display below the textarea */
  helperText?: string | undefined;
}

/**
 * A styled textarea component with label, error, and helper text support.
 *
 * @example
 * ```tsx
 * <Textarea label="Message" placeholder="Type your message here." />
 * <Textarea label="Bio" error="Bio is required" />
 * <Textarea label="Notes" helperText="Maximum 500 characters" />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, labelClassName, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className={cn("mb-1.5 block text-sm font-medium text-gray-700", labelClassName)}>
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base text-gray-900 transition-colors",
            "placeholder:text-gray-400",
            "focus-visible:ring-primary-400 focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
            "md:text-sm",
            error ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500" : "border-gray-300",
            className,
          )}
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
