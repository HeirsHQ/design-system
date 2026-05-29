import type { FieldValues, Resolver, DefaultValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type React from "react";

import type { FormConfig } from "../types/index.js";
import { FormFieldRenderer } from "./field-renderer.js";

type Zod3Type<Output, Input extends FieldValues = FieldValues> = {
  _output: Output;
  _input: Input;
  _def: { typeName: string };
};

/**
 * Headless form builder powered by react-hook-form and zod validation.
 *
 * @example
 * ```tsx
 * import { z } from "zod";
 * import { Form } from "@HeirsHQ/heirs-design-system";
 *
 * const schema = z.object({
 *   email: z.string().email(),
 *   name: z.string().min(2),
 * });
 *
 * const fields = {
 *   email: { label: "Email", type: "email" },
 *   name: { label: "Full Name", type: "text" },
 * } satisfies Record<string, StandardFormField>;
 *
 * function MyPage() {
 *   return (
 *     <Form
 *       schema={schema}
 *       defaultValues={{ email: "", name: "" }}
 *       fields={fields}
 *       onSubmit={async (values) => console.log(values)}
 *     >
 *       {({ field, isSubmitting }) => (
 *         <div className="space-y-4">
 *           <div className="grid grid-cols-2 gap-4">
 *             {field("name")}
 *             {field("email")}
 *           </div>
 *           <button type="submit" disabled={isSubmitting}>Submit</button>
 *         </div>
 *       )}
 *     </Form>
 *   );
 * }
 * ```
 */
export const Form = <T extends FieldValues>({
  schema,
  defaultValues,
  fields,
  gridCols = 12,
  mode = "onBlur",
  children,
  onSubmit,
}: Omit<FormConfig<T>, "sections" | "title" | "description" | "submitLabel"> & {
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
  children: (renderProps: {
    field: (name: Path<T>) => React.ReactNode;
    isSubmitting: boolean;
    form: ReturnType<typeof useForm<T>>;
  }) => React.ReactNode;
}) => {
  const form = useForm<T>({
    resolver: zodResolver(schema as unknown as Zod3Type<T>, undefined, { raw: false }) as Resolver<T>,
    defaultValues: defaultValues as unknown as DefaultValues<T>,
    mode,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const field = (name: Path<T>) => {
    const parts = (name as string).split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fieldDef: any = fields;
    for (const part of parts) {
      if (!fieldDef) return null;
      fieldDef = fieldDef.fields ? fieldDef.fields[part] : fieldDef[part];
    }
    if (!fieldDef) return null;
    return <FormFieldRenderer name={String(name)} field={fieldDef} form={form} formDisabled={isSubmitting} parentGridCols={gridCols} />;
  };

  const submit = handleSubmit(async (values) => {
    await onSubmit(values as unknown as T, form as unknown as ReturnType<typeof useForm<T>>);
  });

  return (
    <form className="w-full" onSubmit={submit} noValidate>
      {children({ field, isSubmitting, form })}
    </form>
  );
};
