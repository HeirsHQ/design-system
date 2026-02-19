import * as React from "react";

import { HtCalendarOutline } from "../icons/calendar.js";
import { cn } from "../lib/utils.js";
import { Button } from "./button.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

/**
 * Simple calendar props.
 */
interface SimpleCalendarProps {
  selected?: Date | undefined;
  onSelect?: ((date: Date | undefined) => void) | undefined;
  disabled?: ((date: Date) => boolean) | undefined;
  className?: string | undefined;
}

/**
 * A simple built-in calendar component.
 */
function SimpleCalendar({ selected, onSelect, disabled, className }: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => selected ?? new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return selected.getDate() === day && selected.getMonth() === currentMonth.getMonth() && selected.getFullYear() === currentMonth.getFullYear();
  };

  const isDisabled = (day: number) => {
    if (!disabled) return false;
    return disabled(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button variant="secondary-outline" size="icon" className="h-7 w-7" onClick={prevMonth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
        <span className="text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <Button variant="secondary-outline" size="icon" className="h-7 w-7" onClick={nextMonth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="flex h-8 items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}
        {days.map((day) => {
          const dayDisabled = isDisabled(day);
          return (
            <button
              key={day}
              disabled={dayDisabled}
              onClick={() => {
                if (!dayDisabled) {
                  onSelect?.(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                }
              }}
              className={cn(
                "h-8 w-8 rounded-md text-sm text-gray-900 transition-colors",
                "hover:bg-gray-100",
                "focus:ring-primary-400 focus:ring-2 focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
                isSelected(day) && "bg-primary-400 hover:bg-primary-500 text-white",
                isToday(day) && !isSelected(day) && "bg-gray-100",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Date picker component props.
 */
export interface DatePickerProps {
  /** The selected date */
  value?: Date | undefined;
  /** Called when the date changes */
  onChange?: (date: Date | undefined) => void;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Disable specific dates */
  disabled?: (date: Date) => boolean;
  /** Additional class names */
  className?: string;
}

/**
 * A date picker component with calendar popover.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date>();
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Pick a date"
 * />
 * ```
 */
function DatePicker({ value, onChange, placeholder = "Pick a date", disabled, className }: DatePickerProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary-outline" className={cn("w-60 justify-start text-left font-normal", !value && "text-gray-400", className)}>
          <HtCalendarOutline className="mr-2 h-4 w-4" />
          {value ? formatDate(value) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <SimpleCalendar selected={value} onSelect={onChange} disabled={disabled} />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, SimpleCalendar };
