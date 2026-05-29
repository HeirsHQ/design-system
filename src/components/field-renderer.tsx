import * as React from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

import { colSpanClass, isArrayField, isCustomField, isObjectField, isStandardField, resolveDisabled } from "../lib/form.js";
import type { FormField } from "../types/form.js";
import { ArrayFieldRenderer } from "./array-input.js";
import { ObjectFieldRenderer } from "./object-input.js";
import { StandardFieldInput } from "./standard-input.js";

interface FormFieldRendererProps<T extends FieldValues> {
  name: string;
  field: FormField<T>;
  form: UseFormReturn<T>;
  formDisabled: boolean;
  parentGridCols?: number;
}

export const FormFieldRenderer = <T extends FieldValues>({ name, field, form, formDisabled, parentGridCols = 12 }: FormFieldRendererProps<T>) => {
  const values = form.watch();
  if (field.hidden) return null;
  if (field.showIf && !field.showIf(values)) return null;

  if (isObjectField(field)) {
    return <ObjectFieldRenderer name={name} field={field} form={form} formDisabled={formDisabled} parentGridCols={parentGridCols} />;
  }

  if (isArrayField(field)) {
    return <ArrayFieldRenderer name={name} field={field} form={form} formDisabled={formDisabled} parentGridCols={parentGridCols} />;
  }

  if (isCustomField(field)) {
    const disabled = resolveDisabled(field.disabled, formDisabled, values);
    const error = form.formState.errors[name]?.message as string | undefined;
    const span = colSpanClass(field.colSpan);

    if (field.customMode === "uncontrolled") {
      return <div className={span}>{typeof field.render === "function" ? (field.render as () => React.ReactNode)() : field.render}</div>;
    }

    return (
      <div className={span}>
        <Controller
          control={form.control}
          name={name as Path<T>}
          render={({ field: rhfField }) => (
            <>
              {(field.render as (props: { field: typeof rhfField; error: string | undefined; disabled: boolean }) => React.ReactNode)({
                field: rhfField,
                error,
                disabled,
              })}
            </>
          )}
        />
      </div>
    );
  }

  if (isStandardField(field)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = name.split(".").reduce((obj: any, key) => obj?.[key], form.formState.errors)?.message as string | undefined;
    return (
      <div className={`${colSpanClass(field.colSpan)} flex flex-col gap-y-1.5`}>
        {field.type !== "checkbox" && (
          <label htmlFor={name} className="text-foreground text-sm font-medium">
            {field.label}
          </label>
        )}
        <StandardFieldInput name={name} field={field} form={form} formDisabled={formDisabled} withWrapper={false} />
        {field.description && !error && <p className="text-muted-foreground text-xs">{field.description}</p>}
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
    );
  }

  return null;
};
