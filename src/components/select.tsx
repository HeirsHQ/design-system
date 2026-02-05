import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { HtCheckOutline } from "../icons/check.js";
import { HtChevronDownOutline } from "../icons/chevron-down.js";
import { HtChevronUpOutline } from "../icons/chevron-up.js";
import { cn } from "../lib/utils.js";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/**
 * Select trigger component props.
 */
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Whether the trigger has an error state */
  hasError?: boolean | undefined;
}

/**
 * The button that toggles the select dropdown.
 */
const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ className, children, hasError, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap text-gray-900 transition-colors",
        "placeholder:text-gray-400",
        "focus:ring-primary-400 focus:border-primary-400 focus:ring-2 focus:outline-none",
        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
        "[&>span]:line-clamp-1",
        hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <HtChevronDownOutline className="h-4 w-4 text-gray-400" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * Select scroll up button component props.
 */
export interface SelectScrollUpButtonProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> {}

const SelectScrollUpButton = React.forwardRef<React.ElementRef<typeof SelectPrimitive.ScrollUpButton>, SelectScrollUpButtonProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
      <HtChevronUpOutline className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  ),
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * Select scroll down button component props.
 */
export interface SelectScrollDownButtonProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> {}

const SelectScrollDownButton = React.forwardRef<React.ElementRef<typeof SelectPrimitive.ScrollDownButton>, SelectScrollDownButtonProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
      <HtChevronDownOutline className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  ),
);
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/**
 * Select content component props.
 */
export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

/**
 * The dropdown content container for select options.
 */
const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-900 shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * Select label component props.
 */
export interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}

/**
 * A label for a group of select options.
 */
const SelectLabel = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Label>, SelectLabelProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * Select item component props.
 */
export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

/**
 * An individual option in the select dropdown.
 */
const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none",
      "text-gray-900 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <HtCheckOutline className="text-primary-400 h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * Select separator component props.
 */
export interface SelectSeparatorProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}

/**
 * A visual separator between select options.
 */
const SelectSeparator = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Separator>, SelectSeparatorProps>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-200", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

/**
 * Select field component props - wraps Select with label, error, and helper text.
 */
export interface SelectFieldProps {
  /** Label text for the select */
  label?: string | undefined;
  /** Additional class names for the label */
  labelClassName?: string | undefined;
  /** Error message to display */
  error?: string | undefined;
  /** Helper text to display below the select */
  helperText?: string | undefined;
  /** Placeholder text */
  placeholder?: string | undefined;
  /** The select value */
  value?: string | undefined;
  /** Called when the value changes */
  onValueChange?: ((value: string) => void) | undefined;
  /** Whether the select is disabled */
  disabled?: boolean | undefined;
  /** Additional class names for the wrapper */
  className?: string | undefined;
  /** Children (SelectItem components) */
  children: React.ReactNode;
}

/**
 * A complete select field with label, error, and helper text support.
 *
 * @example
 * ```tsx
 * <SelectField label="Country" placeholder="Select a country" error="Country is required">
 *   <SelectItem value="us">United States</SelectItem>
 *   <SelectItem value="uk">United Kingdom</SelectItem>
 * </SelectField>
 * ```
 */
function SelectField({
  label,
  labelClassName,
  error,
  helperText,
  placeholder,
  value,
  onValueChange,
  disabled,
  className,
  children,
}: SelectFieldProps) {
  const id = React.useId();

  // Build select props conditionally to satisfy exactOptionalPropertyTypes
  const selectProps: {
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
  } = {};
  if (value !== undefined) selectProps.value = value;
  if (onValueChange !== undefined) selectProps.onValueChange = onValueChange;
  if (disabled !== undefined) selectProps.disabled = disabled;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={id} className={cn("mb-1.5 block text-sm font-medium text-gray-700", labelClassName)}>
          {label}
        </label>
      )}
      <Select {...selectProps}>
        <SelectTrigger id={id} hasError={!!error} aria-invalid={error ? "true" : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectField,
};
