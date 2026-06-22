import type { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ZodSchema } from "zod";
import type React from "react";

export type FormFieldType =
  | "amount"
  | "checkbox"
  | "color"
  | "date"
  | "email"
  | "file"
  | "number"
  | "otp"
  | "password"
  | "radio"
  | "search"
  | "select"
  | "tel"
  | "text"
  | "textarea"
  | "toggle";

export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CustomFieldRenderProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  error?: string;
  disabled?: boolean;
}

export type FormFieldBase = {
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean | ((values: FieldValues) => boolean);
  readOnly?: boolean;
  colSpan?: ColSpan;
  hidden?: boolean;
  /** Return false to hide this field based on current form values. Evaluated reactively on every change. */
  showIf?: (values: FieldValues) => boolean;
};

export type StandardFormField = FormFieldBase & {
  kind?: "standard";
  custom?: never;
  array?: never;
  object?: never;
  type: FormFieldType;
  options?: SelectOption[] | RadioOption[] | ((values: FieldValues) => SelectOption[] | RadioOption[]);
  otpLength?: number;
  accept?: string;
  multiple?: boolean;
  /** Only applies when type is "date". Defaults to "single". */
  dateMode?: "single" | "range";
  /** Only applies when type is "number". Defaults to "single". */
  numberMode?: "single" | "range";
  /** Placeholder for the end input when dateMode or numberMode is "range". */
  placeholderTo?: string;
};

export type CustomFormField<T extends FieldValues = FieldValues> = FormFieldBase & {
  kind?: "custom";
  type?: never;
  array?: never;
  object?: never;
  custom: true;
  customMode: "uncontrolled" | "controlled";
  render: ((props: CustomFieldRenderProps<T>) => React.ReactNode) | React.ReactNode;
};

export type ObjectFormField = FormFieldBase & {
  kind: "object";
  type?: never;
  custom?: never;
  array?: never;
  /**
   * Sub-fields keyed by their property name within the object.
   * Each value must be a StandardFormField (no nesting beyond one level).
   */
  fields: Record<string, StandardFormField>;
  /** Grid columns for the object's own sub-grid. Defaults to parent gridCols. */
  gridCols?: number;
};

/**
 * Primitive array — each item is a single input rendered inline.
 * e.g. tags: string[]
 */
export type PrimitiveArrayFormField = FormFieldBase & {
  kind: "array";
  type?: never;
  custom?: never;
  object?: never;
  itemKind: "primitive";
  /**
   * The field definition for each item.
   * colSpan is relative to the row grid (always 12).
   */
  itemField: StandardFormField;
  addLabel?: string;
  minItems?: number;
  maxItems?: number;
};

/**
 * Object array — each item is a record with its own named fields.
 * e.g. contacts: { name: string; email: string }[]
 */
export type ObjectArrayFormField = FormFieldBase & {
  kind: "array";
  type?: never;
  custom?: never;
  object?: never;
  itemKind: "object";
  /**
   * Fields for each item object, keyed by property name.
   * Each value must be a StandardFormField.
   */
  itemFields: Record<string, StandardFormField>;
  /** Grid columns for the item row. Defaults to 12. */
  itemGridCols?: number;
  addLabel?: string;
  minItems?: number;
  maxItems?: number;
};

export type ArrayFormField = PrimitiveArrayFormField | ObjectArrayFormField;

export type FormField<T extends FieldValues = FieldValues> =
  | StandardFormField
  | CustomFormField<T>
  | ObjectFormField
  | ArrayFormField;

export interface FormSection {
  title?: string;
  description?: string;
  fields: string[];
}

export interface FormConfig<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues: T;
  fields: Record<string, FormField<T>>;
  sections?: FormSection[];
  gridCols?: number;
  title?: string;
  description?: string;
  submitLabel?: string;
  onSubmit: (values: T, form: UseFormReturn<T>) => Promise<void> | void;
}
