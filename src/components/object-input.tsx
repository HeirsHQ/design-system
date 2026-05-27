"use client";

import type { FieldValues, UseFormReturn } from "react-hook-form";

import { colSpanClass, resolveDisabled } from "../lib/form.js";
import type { ObjectFormField } from "../types/form.js";
import { StandardFieldInput } from "./standard-input.js";

interface ObjectFieldRendererProps<T extends FieldValues> {
  name: string;
  field: ObjectFormField;
  form: UseFormReturn<T>;
  formDisabled: boolean;
  parentGridCols?: number;
}

export const ObjectFieldRenderer = <T extends FieldValues>({ name, field, form, formDisabled, parentGridCols = 12 }: ObjectFieldRendererProps<T>) => {
  const values = form.watch();
  const disabled = resolveDisabled(field.disabled, formDisabled, values);
  const gridCols = field.gridCols ?? parentGridCols;
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <div className={`${colSpanClass(field.colSpan)} flex flex-col gap-y-3`}>
      {(field.label || field.description) && (
        <div className="flex flex-col gap-y-0.5">
          {field.label && <span className="text-foreground text-sm font-medium">{field.label}</span>}
          {field.description && <span className="text-muted-foreground text-xs">{field.description}</span>}
        </div>
      )}

      <div
        className="border-border rounded-md border p-4"
        style={{ display: "grid", gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, gap: "1rem" }}
      >
        {Object.entries(field.fields).map(([subKey, subField]) => {
          const fullName = `${name}.${subKey}` as string;
          const subError = (form.formState.errors[name] as Record<string, { message?: string }>)?.[subKey]?.message;
          const isCheckbox = subField.type === "checkbox";
          return (
            <div
              key={subKey}
              className={`${colSpanClass(subField.colSpan)} flex flex-col gap-y-1.5`}
              style={{ gridColumn: `span ${subField.colSpan ?? gridCols} / span ${subField.colSpan ?? gridCols}` }}
            >
              {!isCheckbox && (
                <label htmlFor={fullName} className="text-foreground text-sm font-medium">
                  {subField.label}
                </label>
              )}
              <StandardFieldInput
                name={fullName}
                field={{ ...subField, disabled: resolveDisabled(subField.disabled, disabled, values) }}
                form={form}
                formDisabled={formDisabled}
                withWrapper={false}
              />
              {subField.description && !subError && <p className="text-muted-foreground text-xs">{subField.description}</p>}
              {subError && <p className="text-destructive text-xs">{subError}</p>}
            </div>
          );
        })}
      </div>

      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
