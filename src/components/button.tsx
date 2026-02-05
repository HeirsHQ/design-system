import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-400 text-white shadow hover:bg-primary-500",
        "default-outline": "border border-primary-400 bg-transparent text-primary-400 hover:bg-primary-50",
        danger: "bg-red-500 text-white shadow-sm hover:bg-red-600",
        "danger-outline": "border border-red-500 bg-transparent text-red-500 hover:bg-red-50",
        success: "bg-green-500 text-white shadow-sm hover:bg-green-600",
        "success-outline": "border border-green-500 bg-transparent text-green-500 hover:bg-green-50",
        info: "bg-blue-500 text-white shadow-sm hover:bg-blue-600",
        "info-outline": "border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-50",
        warning: "bg-yellow-500 text-white shadow-sm hover:bg-yellow-600",
        "warning-outline": "border border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-50",
        secondary: "bg-gray-500 text-white shadow-sm hover:bg-gray-600",
        "secondary-outline": "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Button component props.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a Slot component,
   * allowing you to pass a custom element as the button.
   */
  asChild?: boolean;
}

/**
 * A customizable button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="default">Click me</Button>
 * <Button variant="destructive" size="lg">Delete</Button>
 * <Button variant="outline" asChild>
 *   <a href="/link">Link Button</a>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
