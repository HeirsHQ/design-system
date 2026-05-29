import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { colSpanClass, isObjectArrayField, isPrimitiveArrayField, resolveDisabled } from "../lib/form.js";
import type { ArrayFormField } from "../types/form.js";
import { StandardFieldInput } from "./standard-input.js";

interface ArrayFieldRendererProps<T extends FieldValues> {
  name: string;
  field: ArrayFormField;
  form: UseFormReturn<T>;
  formDisabled: boolean;
  parentGridCols?: number;
}

export const ArrayFieldRenderer = <T extends FieldValues>({ name, field, form, formDisabled, parentGridCols = 12 }: ArrayFieldRendererProps<T>) => {
  const values = form.watch();
  const disabled = resolveDisabled(field.disabled, formDisabled, values);

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: name as never,
  });

  const atMax = field.maxItems !== undefined && items.length >= field.maxItems;
  const atMin = field.minItems !== undefined && items.length <= field.minItems;

  const handleAdd = () => {
    if (atMax) return;
    if (isPrimitiveArrayField(field)) {
      append("" as never);
      return;
    }
    if (isObjectArrayField(field)) {
      const empty = Object.fromEntries(Object.keys(field.itemFields).map((k) => [k, ""]));
      append(empty as never);
    }
  };

  const itemGridCols = isObjectArrayField(field) ? (field.itemGridCols ?? parentGridCols) : 12;

  return (
    <div className={`${colSpanClass(field.colSpan)} flex flex-col gap-y-3`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-0.5">
          {field.label && <span className="text-foreground text-sm font-medium">{field.label}</span>}
          {field.description && <span className="text-muted-foreground text-xs">{field.description}</span>}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled || atMax}
          className="border-border text-foreground hover:bg-muted inline-flex items-center gap-x-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-600"
        >
          <span>+</span>
          <span>{field.addLabel ?? `Add ${field.label}`}</span>
        </button>
      </div>

      {items.length === 0 && (
        <p className="border-border text-muted-foreground rounded-md border border-dashed px-4 py-6 text-center text-xs">
          No items yet. Click &quot;{field.addLabel ?? `Add ${field.label}`}&quot; to add one.
        </p>
      )}

      <div className="flex flex-col gap-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="border-border relative rounded-md border p-3">
            {isPrimitiveArrayField(field) && (
              <StandardFieldInput
                name={`${name}.${index}`}
                field={{ ...field.itemField, disabled: resolveDisabled(field.itemField.disabled, disabled, values) }}
                form={form}
                formDisabled={formDisabled}
                withWrapper={false}
              />
            )}
            {isObjectArrayField(field) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${itemGridCols}, minmax(0, 1fr))`,
                  gap: "0.75rem",
                }}
              >
                {Object.entries(field.itemFields).map(([subKey, subField]) => {
                  const fullName = `${name}.${index}.${subKey}`;
                  const subError = (form.formState.errors as Record<string, unknown>)[fullName] as string | undefined;
                  const isCheckbox = subField.type === "checkbox";
                  return (
                    <div
                      key={subKey}
                      className="flex flex-col gap-y-1.5"
                      style={{
                        gridColumn: `span ${subField.colSpan ?? itemGridCols} / span ${subField.colSpan ?? itemGridCols}`,
                      }}
                    >
                      {!isCheckbox && (
                        <label htmlFor={fullName} className="text-foreground text-xs font-medium">
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
                      {subError && <p className="text-destructive text-xs">{subError}</p>}
                    </div>
                  );
                })}
              </div>
            )}
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={disabled || atMin}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive absolute top-2 right-2 rounded p-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
