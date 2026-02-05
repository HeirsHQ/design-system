import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils.js";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-400 text-white shadow hover:bg-primary-500",
        secondary: "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200",
        danger: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        success: "border-transparent bg-green-500 text-white shadow hover:bg-green-600",
        info: "border-transparent bg-blue-500 text-white shadow hover:bg-blue-600",
        warning: "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600",
        outline: "border-gray-300 text-gray-700 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Badge component props.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * A badge component for displaying status, labels, or counts.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Destructive</Badge>
 * <Badge variant="outline">Outline</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
