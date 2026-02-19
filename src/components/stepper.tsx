import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils.js";

const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center gap-x-0.5",
      vertical: "flex-col gap-y-0.5",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

/**
 * Props for a single step definition.
 */
type StepProps = {
  index: number;
  label: string;
  description?: string;
  icon?: React.FC<{ className?: string }>;
};

/**
 * Stepper component props.
 */
interface StepperProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stepperVariants> {
  /**
   * The index of the currently active step.
   */
  current: number;
  /**
   * Array of step definitions.
   */
  steps: StepProps[];
  /**
   * Callback fired when a step is clicked.
   */
  onStepChange?: (step: number) => void;
  /**
   * Additional class name applied to each individual step.
   */
  stepClassName?: string;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * A stepper component for multi-step flows. Supports horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { index: 0, label: "Account", description: "Create your account" },
 *   { index: 1, label: "Profile", description: "Set up your profile" },
 *   { index: 2, label: "Review", description: "Review and confirm" },
 * ];
 *
 * <Stepper current={1} steps={steps} onStepChange={setCurrent} />
 * <Stepper orientation="vertical" current={0} steps={steps} />
 * ```
 */
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, orientation, current, steps, onStepChange, stepClassName, ...props }, ref) => {
    return (
      <div ref={ref} role="list" aria-label="Progress" className={cn(stepperVariants({ orientation }), className)} {...props}>
        {steps.map((step) => (
          <StepperItem
            key={step.index}
            step={step}
            current={current}
            onStepChange={onStepChange}
            orientation={orientation}
            className={stepClassName}
          />
        ))}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";

/**
 * Stepper item component props.
 */
interface StepperItemProps {
  step: StepProps;
  current: number;
  onStepChange?: ((step: number) => void) | undefined;
  orientation?: "horizontal" | "vertical" | null | undefined;
  className?: string | undefined;
}

/**
 * A single step within the Stepper. Can also be used standalone for custom layouts.
 *
 * @example
 * ```tsx
 * <StepperItem
 *   step={{ index: 0, label: "Step 1", description: "First step" }}
 *   current={0}
 * />
 * ```
 */
const StepperItem = ({ step, current, onStepChange, className }: StepperItemProps) => {
  const { index, label, description, icon } = step;
  const state = current === index ? "active" : current > index ? "completed" : "upcoming";

  return (
    <div
      role="listitem"
      aria-current={state === "active" ? "step" : undefined}
      onClick={() => onStepChange?.(index)}
      className={cn(
        "flex flex-1 flex-col gap-y-0.5 p-2",
        state === "active" && "bg-primary-50/50 text-primary-600",
        state === "upcoming" && "bg-neutral-200 text-neutral-600",
        state === "completed" && "bg-green-100 text-green-600",
        onStepChange ? "cursor-pointer" : "cursor-default",
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        {state === "completed" ? <CheckIcon /> : icon ? React.createElement(icon, { className: "size-4" }) : <StepNumber index={index} />}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {description && <span className="text-xs">{description}</span>}
    </div>
  );
};
StepperItem.displayName = "StepperItem";

function StepNumber({ index }: { index: number }) {
  return <span className="flex size-5 items-center justify-center rounded-full border border-current text-[10px] font-semibold">{index + 1}</span>;
}

export { Stepper, StepperItem, stepperVariants, type StepProps, type StepperProps };
