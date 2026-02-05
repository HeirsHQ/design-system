import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../lib/utils.js";

/**
 * Progress component props.
 */
export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {}

/**
 * A progress bar component built on Radix UI Progress.
 *
 * @example
 * ```tsx
 * <Progress value={33} />
 * <Progress value={66} className="w-[60%]" />
 * ```
 */
const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root ref={ref} className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)} {...props}>
    <ProgressPrimitive.Indicator
      className="bg-primary-400 h-full w-full flex-1 transition-all"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
