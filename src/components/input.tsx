import * as React from "react";

import { HtCalendarOutline } from "../icons/calendar.js";
import { HtEyeOffOutline } from "../icons/eye-off.js";
import { HtSearchOutline } from "../icons/search.js";
import { HtLockOutline } from "../icons/lock.js";
import { HtMailOutline } from "../icons/mail.js";
import { HtEyeOutline } from "../icons/eye.js";
import { type IconBaseProps } from "../icons/icon-base.js";
import { cn } from "../lib/utils.js";

/**
 * Input component props.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the input */
  label?: string | undefined;
  /** Additional class names for the label */
  labelClassName?: string | undefined;
  /** Error message to display */
  error?: string | undefined;
  /** Helper text to display below the input */
  helperText?: string | undefined;
  /** Hide the automatic icon based on input type */
  hideTypeIcon?: boolean | undefined;
}

type IconComponent = React.ComponentType<Omit<IconBaseProps, "children">>;

const typeIconMap: Record<string, IconComponent> = {
  email: HtMailOutline,
  password: HtLockOutline,
  search: HtSearchOutline,
  date: HtCalendarOutline,
  "datetime-local": HtCalendarOutline,
  month: HtCalendarOutline,
  week: HtCalendarOutline,
};

/**
 * A styled input component with label, error, and helper text support.
 * Automatically shows appropriate icons based on input type.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="Enter email" />
 * <Input label="Password" type="password" error="Password is required" />
 * <Input label="Username" helperText="This will be your display name" />
 * <Input label="Search" type="search" placeholder="Search..." />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, labelClassName, error, helperText, hideTypeIcon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const LeftIcon = !hideTypeIcon ? typeIconMap[type] : undefined;
    const hasLeftIcon = !!LeftIcon;
    const hasRightIcon = isPassword;

    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={cn("mb-1.5 block text-sm font-medium text-gray-700", labelClassName)}>
            {label}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <LeftIcon className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base text-gray-900 transition-colors",
              "placeholder:text-gray-400",
              "focus-visible:ring-primary-400 focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700",
              "md:text-sm",
              error ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500" : "border-gray-300",
              hasLeftIcon && "pl-9",
              hasRightIcon && "pr-9",
              className,
            )}
            ref={ref}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <HtEyeOffOutline className="h-4 w-4" /> : <HtEyeOutline className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
