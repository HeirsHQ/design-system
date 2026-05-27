import React from "react";

import { HtArrowUpRightOutline } from "../icons/index.js";
import type { IconBaseProps } from "../icons/icon-base.js";
import { cn } from "../lib/utils.js";

type Trend = "down" | "up";
type Variant = "default" | "success" | "warning" | "danger" | "info";

interface Props {
  label: string;
  value: string | number;
  action?: React.JSX.Element;
  className?: string;
  delta?: string;
  description?: string;
  icon?: React.ComponentType<IconBaseProps>;
  isLoading?: boolean;
  variant?: Variant;
}

const trendVariant: Record<Trend, string> = {
  down: "text-red-500",
  up: "text-green-500",
};

const cardVariant: Record<Variant, { card: string; icon: string }> = {
  default: { card: "", icon: "text-muted-foreground" },
  success: { card: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950", icon: "text-green-600" },
  warning: {
    card: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
    icon: "text-yellow-600",
  },
  danger: { card: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950", icon: "text-red-600" },
  info: { card: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950", icon: "text-blue-600" },
};

export const StatCard = ({ icon: Icon, label, value, action, className, description, delta, isLoading, variant = "default" }: Props) => {
  const { card, icon } = cardVariant[variant];

  const trend: Trend = delta?.startsWith("+") ? "up" : "down";

  if (isLoading) {
    return (
      <div className={cn("space-y-6 rounded-xl border bg-white p-6 dark:bg-neutral-900", card)}>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="size-4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
          </div>
          <div className="h-8 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        </div>
        <div className="h-4 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-6 rounded-xl border p-6", card, className)}>
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <p className={cn("text-muted-foreground text-sm", className)}>{label}</p>
          {Icon && <Icon className={cn("size-4", icon, className)} />}
        </div>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
      {(delta || description) && (
        <div className="flex items-center gap-x-2">
          {delta && (
            <div className={cn("flex items-center gap-x-1", trendVariant[trend])}>
              {trend === "down" ? <HtArrowUpRightOutline className="size-4 rotate-180" /> : <HtArrowUpRightOutline className="size-4" />}
              <span className="text-xs">{delta}</span>
            </div>
          )}
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      )}
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
};
