"use client";

import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
// import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select.js";
import { RadioGroup, RadioGroupItem } from "./radio-group.js";
import type { StandardFormField } from "../types/form.js";
import { resolveDisabled } from "../lib/form.js";
import { ColorPicker } from "./color-picker.js";
import { MultiSelect } from "./multi-select.js";
import { DatePicker } from "./date-picker.js";
import { PhoneInput } from "./phone-input.js";
import { OtpInput } from "./otp-input.js";
import { Checkbox } from "./checkbox.js";
import { Textarea } from "./textarea.js";
import { Switch } from "./switch.js";
import { cn } from "../lib/utils.js";
import { Input } from "./input.js";

interface StandardFieldInputProps<T extends FieldValues> {
  name: string;
  field: StandardFormField;
  form: UseFormReturn<T>;
  formDisabled: boolean;
  withWrapper?: boolean;
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 h-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export const StandardFieldInput = <T extends FieldValues>({ name, field, form, formDisabled, withWrapper = true }: StandardFieldInputProps<T>) => {
  const values = form.watch();
  const disabled = resolveDisabled(field.disabled, formDisabled, values);
  const error = form.formState.errors[name]?.message as string | undefined;
  const { type, label, placeholder, readOnly, otpLength, accept, multiple, description, placeholderTo } = field;
  const options = typeof field.options === "function" ? field.options(values) : field.options;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <Textarea {...f} placeholder={placeholder} disabled={disabled} readOnly={readOnly} value={f.value ?? ""} aria-invalid={!!error} />
            )}
          />
        );

      case "tel":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => <PhoneInput value={f.value ?? ""} onChange={f.onChange} disabled={disabled} />}
          />
        );

      case "select":
        if (field.multiple) {
          return (
            <Controller
              control={form.control}
              name={name as Path<T>}
              render={({ field: f }) => (
                <MultiSelect
                  value={Array.isArray(f.value) ? f.value : []}
                  onChange={(val) => {
                    f.onChange(val);
                    f.onBlur();
                  }}
                  options={options ?? []}
                  placeholder={placeholder ?? `Select ${label}`}
                  disabled={disabled}
                />
              )}
            />
          );
        }
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <Select value={f.value ?? ""} onValueChange={f.onChange} onOpenChange={(open) => !open && f.onBlur()} disabled={disabled}>
                <SelectTrigger className={cn("h-9", inputClass)} aria-invalid={!!error}>
                  <SelectValue placeholder={placeholder ?? `Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} disabled={Boolean(opt.disabled)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <div className="flex items-center gap-x-2">
                <Checkbox id={name} checked={!!f.value} onCheckedChange={f.onChange} disabled={disabled} />
                <label htmlFor={name} className="text-foreground text-sm">
                  {label}
                </label>
              </div>
            )}
          />
        );

      case "color":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => <ColorPicker value={f.value ?? "#000000"} onChange={f.onChange} disabled={disabled} />}
          />
        );

      case "amount":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => {
              const hasValue = f.value != null && f.value !== "" && !isNaN(Number(f.value));
              const display = hasValue ? new Intl.NumberFormat("en-US").format(Number(f.value)) : "";
              return (
                <Input
                  ref={f.ref}
                  name={f.name}
                  type="text"
                  inputMode="numeric"
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  value={display}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, "");
                    f.onChange(digits === "" ? "" : Number(digits));
                  }}
                  onBlur={f.onBlur}
                />
              );
            }}
          />
        );

      case "radio":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <RadioGroup value={f.value} onValueChange={f.onChange} className="flex flex-col gap-y-2">
                {options?.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-x-2 text-sm">
                    <RadioGroupItem value={opt.value} disabled={disabled || opt.disabled} />
                    <label>{opt.label}</label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        );

      case "file":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: { onChange, onBlur, ref } }) => (
              <Input
                ref={ref}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onBlur={onBlur}
                onChange={(e) => onChange(multiple ? e.target.files : e.target.files?.[0])}
              />
            )}
          />
        );

      case "otp":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => <OtpInput value={f.value ?? ""} onChange={f.onChange} length={otpLength ?? 6} disabled={disabled} />}
          />
        );

      case "date":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) =>
              field.dateMode === "range" ? (
                <DatePicker
                  type="range"
                  value={f.value ?? { from: undefined, to: undefined }}
                  onValueChange={f.onChange}
                  disabled={disabled}
                  placeholderFrom={placeholder || "From"}
                  placeholderTo={field.placeholderTo || "To"}
                  onBlur={f.onBlur}
                  error={!!error}
                />
              ) : (
                <DatePicker
                  type="single"
                  value={f.value}
                  onValueChange={f.onChange}
                  disabled={disabled}
                  placeholder={placeholder || ""}
                  onBlur={f.onBlur}
                  error={!!error}
                />
              )
            }
          />
        );

      case "toggle":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => <Switch checked={!!f.value} onCheckedChange={f.onChange} disabled={disabled} />}
          />
        );

      case "email":
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <Input
                {...f}
                type="email"
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                value={f.value ?? ""}
                aria-invalid={!!error}
              />
            )}
          />
        );

      case "number":
        if (field.numberMode === "range") {
          return (
            <Controller
              control={form.control}
              name={name as Path<T>}
              render={({ field: f }) => {
                const range: [number | "", number | ""] = Array.isArray(f.value) ? [f.value[0] ?? "", f.value[1] ?? ""] : ["", ""];
                return (
                  <div className="flex items-center gap-x-2">
                    <Input
                      type="number"
                      placeholder={placeholder ?? "Min"}
                      disabled={disabled}
                      readOnly={readOnly}
                      value={range[0]}
                      onChange={(e) => f.onChange([e.target.valueAsNumber, range[1]])}
                      onBlur={f.onBlur}
                    />
                    <span className="text-muted-foreground shrink-0 text-sm">—</span>
                    <Input
                      type="number"
                      placeholder={placeholderTo ?? "Max"}
                      disabled={disabled}
                      readOnly={readOnly}
                      value={range[1]}
                      onChange={(e) => f.onChange([range[0], e.target.valueAsNumber])}
                      onBlur={f.onBlur}
                    />
                  </div>
                );
              }}
            />
          );
        }
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <Input
                {...f}
                type="number"
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                value={f.value ?? ""}
                aria-invalid={!!error}
                onChange={(e) => {
                  const raw = e.target.value;
                  f.onChange(raw === "" ? undefined : Number(raw));
                }}
              />
            )}
          />
        );

      default:
        return (
          <Controller
            control={form.control}
            name={name as Path<T>}
            render={({ field: f }) => (
              <Input
                {...f}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                value={f.value ?? ""}
                aria-invalid={!!error}
              />
            )}
          />
        );
    }
  };

  if (!withWrapper) return renderInput();

  const isCheckbox = type === "checkbox";

  return (
    <div className="flex flex-col gap-y-1.5">
      {!isCheckbox && (
        <label htmlFor={name} className="text-foreground text-sm font-medium">
          {label}
        </label>
      )}
      {renderInput()}
      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
