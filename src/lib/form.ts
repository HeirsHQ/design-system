import type { FieldValues } from "react-hook-form";
import type {
  ArrayFormField,
  ColSpan,
  CustomFormField,
  FormField,
  FormSection,
  ObjectArrayFormField,
  ObjectFormField,
  PrimitiveArrayFormField,
  StandardFormField,
} from "../types/form.js";

export const isCustomField = <T extends FieldValues>(field: FormField<T>): field is CustomFormField<T> => "custom" in field && field.custom === true;

export const isStandardField = <T extends FieldValues>(field: FormField<T>): field is StandardFormField =>
  !("custom" in field) && !("kind" in field && field.kind !== "standard") && "type" in field;

export const isObjectField = <T extends FieldValues>(field: FormField<T>): field is ObjectFormField => "kind" in field && field.kind === "object";

export const isArrayField = <T extends FieldValues>(field: FormField<T>): field is ArrayFormField => "kind" in field && field.kind === "array";

export const isPrimitiveArrayField = <T extends FieldValues>(field: FormField<T>): field is PrimitiveArrayFormField =>
  isArrayField(field) && (field as ArrayFormField).itemKind === "primitive";

export const isObjectArrayField = <T extends FieldValues>(field: FormField<T>): field is ObjectArrayFormField =>
  isArrayField(field) && (field as ArrayFormField).itemKind === "object";

export const colSpanClass = (span: ColSpan = 12): string =>
  ({
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  })[span];

export const normaliseSections = <T extends FieldValues>(fields: Record<string, FormField<T>>, sections?: FormSection[]): FormSection[] => {
  if (sections && sections.length > 0) return sections;
  return [{ fields: Object.keys(fields) }];
};

export const resolveDisabled = (
  fieldDisabled?: boolean | ((values: FieldValues) => boolean),
  formDisabled?: boolean,
  values?: FieldValues,
): boolean => {
  const field = typeof fieldDisabled === "function" ? fieldDisabled(values ?? {}) : fieldDisabled;
  return !!(field || formDisabled);
};
