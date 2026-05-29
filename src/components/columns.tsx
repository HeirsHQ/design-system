import { MoreVertical, type LucideIcon } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { formatCurrency } from "../lib/number.js";
import { Button } from "./button.js";
import { cn } from "../lib/utils.js";

// ── Action cell ──────────────────────────────────────────────────────────────

export type TableActionVariant = "amber" | "default" | "destructive" | "info" | "success" | "warning";

const actionVariantStyles: Record<TableActionVariant, string> = {
  amber: "text-orange-700 hover:bg-orange-50",
  default: "text-gray-600 hover:bg-gray-200",
  destructive: "text-red-600 hover:bg-red-50",
  info: "text-blue-600 hover:bg-blue-50",
  success: "text-green-600 hover:bg-green-50",
  warning: "text-yellow-600 hover:bg-yellow-50",
};

export interface TableActionItem<T> {
  label: string;
  icon?: LucideIcon;
  hidden?: boolean | ((args: T) => boolean);
  href?: string | ((args: T) => string);
  onClick?: (args: T) => void;
  variant?: TableActionVariant | (string & {});
}

export interface ActionCellProps<T> {
  actions: (rowItem: T) => TableActionItem<T>[];
  rowItem: T;
  baseHref?: string | undefined;
}

export const ActionCell = <T extends object>({ actions, rowItem, baseHref }: ActionCellProps<T>) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60 p-1">
          {actions(rowItem).map((action) => {
            const href = action.href ? (typeof action.href === "function" ? action.href(rowItem) : action.href) : undefined;
            const finalHref = baseHref && href ? `${baseHref}${href}` : href;
            const isHidden = typeof action.hidden === "function" ? action.hidden(rowItem) : action.hidden;

            const itemClass = cn(
              "flex w-full items-center justify-start gap-x-2 rounded-md px-2.5 py-2 text-xs",
              actionVariantStyles[action.variant as TableActionVariant],
              isHidden && "hidden",
            );

            return action.href ? (
              <a className={itemClass} href={finalHref || ""} key={action.label}>
                {action.icon && <action.icon className="size-4" />}
                {action.label}
              </a>
            ) : (
              <button className={itemClass} key={action.label} onClick={() => action.onClick?.(rowItem)}>
                {action.icon && <action.icon className="size-4" />}
                {action.label}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

// ── Date / time cells ────────────────────────────────────────────────────────

export const DateCell = ({ date, className }: { date: Date | string | null; className?: string }) => {
  if (!date) return <div className={cn("text-muted-foreground", className)}>—</div>;
  return <div className={className}>{format(new Date(date), "dd/MM/yyyy")}</div>;
};

export const TimeCell = ({ date, className }: { date: Date | string | null; className?: string }) => {
  if (!date) return <div className={cn("text-muted-foreground", className)}>—</div>;
  return <div className={className}>{format(new Date(date), "HH:mm")}</div>;
};

export const DateTimeCell = ({ date, className }: { date: Date | string | null; className?: string }) => {
  if (!date) return <div className={cn("text-muted-foreground", className)}>—</div>;
  return <div className={className}>{format(new Date(date), "dd/MM/yyyy, HH:mm")}</div>;
};

export const RelativeTimeCell = ({ date, className }: { date: Date | string | null; className?: string }) => {
  if (!date) return <div className={cn("text-muted-foreground", className)}>—</div>;
  return (
    <div title={format(new Date(date), "dd/MM/yyyy HH:mm")} className={className}>
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </div>
  );
};

// ── Value cells ──────────────────────────────────────────────────────────────

export const CurrencyCell = ({
  amount,
  currency = "USD",
  display = "compact",
}: {
  amount: number;
  currency?: string;
  display?: "compact" | "full";
}) => <span>{formatCurrency(amount, { currency, display })}</span>;

export const NumberCell = ({ value }: { value: number }) => <span>{new Intl.NumberFormat().format(value)}</span>;

export const PercentageCell = ({ value, decimals = 1 }: { value: number; decimals?: number }) => <span>{value.toFixed(decimals)}%</span>;

export const BooleanCell = ({ value, labels = ["Yes", "No"] }: { value: boolean; labels?: [string, string] }) => (
  <span className={cn("text-xs font-medium", value ? "text-green-600" : "text-red-500")}>{value ? labels[0] : labels[1]}</span>
);

// ── Status cell ──────────────────────────────────────────────────────────────

export type StatusVariant = "amber" | "danger" | "draft" | "info" | "neutral" | "success" | "warning";

export const STATUS_DEFAULTS: Record<string, StatusVariant> = {
  active: "success",
  approved: "success",
  completed: "success",
  paid: "success",
  published: "success",
  cancelled: "danger",
  failed: "danger",
  rejected: "danger",
  terminated: "danger",
  draft: "draft",
  "in-progress": "warning",
  inactive: "neutral",
  pending: "warning",
  review: "info",
  suspended: "neutral",
};

export const STATUS_STYLES: Record<StatusVariant, string> = {
  amber: "bg-orange-100 text-orange-700 border-orange-200",
  danger: "bg-red-100 text-red-700 border-red-200",
  draft: "bg-purple-100 text-purple-700 border-purple-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
  neutral: "bg-gray-100 text-gray-500 border-gray-200",
  success: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export interface StatusCellProps<TStatus extends string> {
  status: TStatus;
  /** Override or extend the default variant mapping. Keys autocomplete to the TStatus union. */
  config?: Partial<Record<TStatus, StatusVariant>>;
}

export const StatusCell = <TStatus extends string>({ status, config }: StatusCellProps<TStatus>) => {
  const map: Record<string, StatusVariant> = config ? { ...STATUS_DEFAULTS, ...config } : STATUS_DEFAULTS;
  const variant = map[status.toLowerCase()] ?? "neutral";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_STYLES[variant])}>
      {status.replace(/-/g, " ")}
    </span>
  );
};

// ── Misc cells ───────────────────────────────────────────────────────────────

export const SerialNumberCell = <T extends object>({ row }: { row: Row<T> }) => <span>{row.index + 1}</span>;
