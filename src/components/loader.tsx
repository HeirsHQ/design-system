import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils.js";

const loaderVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * Loader component props.
 */
interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {
  /**
   * The visual variant of the loader animation.
   * @default "spinner"
   */
  variant?: "spinner" | "dots" | "pulse" | "bar";
}

/**
 * An inline loader component with multiple animation variants and sizes.
 *
 * @example
 * ```tsx
 * <Loader />
 * <Loader variant="dots" size="lg" />
 * <Loader variant="pulse" size="sm" />
 * <Loader variant="bar" />
 * ```
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(({ className, variant = "spinner", size = "default", ...props }, ref) => {
  const resolvedSize = size || "default";
  return (
    <div ref={ref} role="status" aria-label="Loading" className={cn(loaderVariants({ size: resolvedSize }), className)} {...props}>
      {variant === "spinner" && <SpinnerAnimation size={resolvedSize} />}
      {variant === "dots" && <DotsAnimation size={resolvedSize} />}
      {variant === "pulse" && <PulseAnimation size={resolvedSize} />}
      {variant === "bar" && <BarAnimation size={resolvedSize} />}
      <span className="sr-only">Loading...</span>
    </div>
  );
});
Loader.displayName = "Loader";

/**
 * A small loader designed for use inside buttons.
 *
 * @example
 * ```tsx
 * <Button disabled>
 *   <ButtonLoader />
 *   Submitting...
 * </Button>
 * ```
 */
const ButtonLoader = React.forwardRef<HTMLDivElement, Omit<LoaderProps, "size">>(({ className, variant = "spinner", ...props }, ref) => {
  return <Loader ref={ref} variant={variant} size="sm" className={className} {...props} />;
});
ButtonLoader.displayName = "ButtonLoader";

/**
 * A full-page centered loader overlay.
 *
 * @example
 * ```tsx
 * <PageLoader />
 * <PageLoader variant="dots" />
 * ```
 */
const PageLoader = React.forwardRef<HTMLDivElement, LoaderProps>(({ className, variant = "spinner", size = "lg", ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex min-h-150 flex-1 items-center justify-center", className)} {...props}>
      <Loader variant={variant} size={size} />
    </div>
  );
});
PageLoader.displayName = "PageLoader";

/* ----- Internal animation components ----- */

function SpinnerAnimation({ size }: { size: "sm" | "default" | "lg" }) {
  const sizeClass = size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-6";
  return (
    <svg className={cn("animate-spin text-current", sizeClass)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function DotsAnimation({ size }: { size: "sm" | "default" | "lg" }) {
  const dotSize = size === "sm" ? "size-1" : size === "lg" ? "size-2.5" : "size-1.5";
  const gap = size === "sm" ? "gap-0.5" : size === "lg" ? "gap-1.5" : "gap-1";
  return (
    <div className={cn("flex items-center", gap)}>
      <span className={cn("animate-bounce rounded-full bg-current [animation-delay:-0.3s]", dotSize)} />
      <span className={cn("animate-bounce rounded-full bg-current [animation-delay:-0.15s]", dotSize)} />
      <span className={cn("animate-bounce rounded-full bg-current", dotSize)} />
    </div>
  );
}

function PulseAnimation({ size }: { size: "sm" | "default" | "lg" }) {
  const sizeClass = size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-6";
  return <span className={cn("animate-pulse rounded-full bg-current opacity-50", sizeClass)} />;
}

function BarAnimation({ size }: { size: "sm" | "default" | "lg" }) {
  const barHeight = size === "sm" ? "h-3" : size === "lg" ? "h-6" : "h-4";
  const barWidth = size === "sm" ? "w-1" : size === "lg" ? "w-2" : "w-1.5";
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn("animate-pulse rounded-sm bg-current", barHeight, barWidth)}
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

export { ButtonLoader, Loader, PageLoader, loaderVariants, type LoaderProps };
