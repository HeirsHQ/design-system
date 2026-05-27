"use client";

import { format } from "date-fns";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { Calendar, type DateRange } from "./calendar.js";
import { HtCalendarOutline } from "../icons/index.js";
import { cn } from "../lib/utils.js";

type SingleDatePickerProps = {
  onValueChange: (date: Date | undefined) => void;
  type: "single";
  value: Date | undefined;
  className?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  onBlur?: () => void;
  error?: boolean;
};

type RangeDatePickerProps = {
  onValueChange: (range: DateRange) => void;
  type: "range";
  value: DateRange;
  className?: string;
  label?: string;
  labelClassName?: string;
  placeholderFrom?: string;
  placeholderTo?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  onBlur?: () => void;
  error?: boolean;
};

type Props = SingleDatePickerProps | RangeDatePickerProps;

export const DatePicker = (props: Props) => {
  const { className, label, labelClassName, type, disabled = false, minDate, maxDate, disabledDates } = props;
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean, onBlur?: () => void) => {
    setOpen(nextOpen);
    if (!nextOpen && onBlur) onBlur();
  };

  if (type === "range") {
    const { value, onValueChange, placeholderFrom = "Start date", placeholderTo = "End date", onBlur, error } = props as RangeDatePickerProps;
    const fromDisplay = value.from ? format(value.from, "MMM dd, yyyy") : "";
    const toDisplay = value.to ? format(value.to, "MMM dd, yyyy") : "";

    const handleRangeSelect = (range: DateRange) => {
      onValueChange(range);
      if (range.from && range.to) {
        setOpen(false);
        onBlur?.();
      }
    };

    const triggerClass = cn(
      "flex h-10 flex-1 items-center justify-between gap-x-2 rounded-md border bg-white px-3 text-sm transition-colors dark:bg-neutral-800",
      "focus:border-primary-500 focus:ring-primary-500/20 hover:border-neutral-400 focus:ring-2 focus:outline-none",
      disabled && "cursor-not-allowed opacity-50",
      error ? "border-red-500" : "border-neutral-300",
    );

    return (
      <div className={cn("flex flex-col gap-y-1", className)}>
        {label && <label className={cn("text-sm font-medium text-neutral-700", labelClassName)}>{label}</label>}
        <Popover open={open} onOpenChange={(o) => handleOpenChange(o, onBlur)}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-x-2">
              <button type="button" disabled={disabled} className={cn(triggerClass, !fromDisplay && "text-neutral-400")}>
                <span className="truncate">{fromDisplay || placeholderFrom}</span>
                <HtCalendarOutline className="size-4 shrink-0 text-neutral-500" />
              </button>
              <span className="text-neutral-400">-</span>
              <button type="button" disabled={disabled} className={cn(triggerClass, !toDisplay && "text-neutral-400")}>
                <span className="truncate">{toDisplay || placeholderTo}</span>
                <HtCalendarOutline className="size-4 shrink-0 text-neutral-500" />
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <Calendar
              mode="range"
              numberOfMonths={2}
              value={value}
              onSelect={handleRangeSelect}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates || []}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  const { value, onValueChange, placeholder = "Select date", onBlur, error } = props as SingleDatePickerProps;
  const displayValue = value ? format(value, "MMM dd, yyyy") : "";

  const handleSingleSelect = (date: Date | undefined) => {
    onValueChange(date);
    if (date) {
      setOpen(false);
      onBlur?.();
    }
  };

  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      {label && <label className={cn("text-sm font-medium text-neutral-700", labelClassName)}>{label}</label>}
      <Popover open={open} onOpenChange={(o) => handleOpenChange(o, onBlur)}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center justify-between gap-x-2 rounded-md border bg-white px-3 text-sm transition-colors dark:bg-neutral-800",
              "focus:border-primary-500 focus:ring-primary-500/20 hover:border-neutral-400 focus:ring-2 focus:outline-none",
              disabled && "cursor-not-allowed opacity-50",
              !displayValue && "text-neutral-400",
              error ? "border-red-500" : "border-neutral-300",
            )}
          >
            <span className="truncate">{displayValue || placeholder}</span>
            <HtCalendarOutline className="size-4 shrink-0 text-neutral-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <Calendar
            mode="single"
            value={value}
            onSelect={handleSingleSelect}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates || []}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
