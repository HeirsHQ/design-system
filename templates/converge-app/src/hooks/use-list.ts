"use client";

import { useCallback, useEffect, useState } from "react";
import { ZodError, ZodType } from "zod";

type ListError<T extends object> = Record<number, ZodError<T>["message"] | null>;

interface UseListUncontrolledProps<T extends object> {
  initialValues: T[];
  schema: ZodType<T>;
  value?: never;
  onChange?: never;
}

interface UseListControlledProps<T extends object> {
  initialValues?: never;
  schema: ZodType<T>;
  value: T[];
  onChange: (items: T[]) => void;
}

type UseListProps<T extends object> = UseListUncontrolledProps<T> | UseListControlledProps<T>;

interface UseListReturn<T extends object> {
  errors: ListError<T>;
  hasErrors: boolean;
  items: T[];
  onAddItem: (item: T) => void;
  onDeleteItem: (index: number) => void;
  onReset: () => void;
  onUpdateItem: (index: number, item: T) => void;
  onUpdateField: <K extends keyof T>(index: number, field: K, value: T[K]) => void;
  setItems: (items: T[] | ((prev: T[]) => T[])) => void;
  validateAll: () => void;
  validateItem: (index: number) => void;
  isControlled: boolean;
}

export const useList = <T extends object>(props: UseListProps<T>): UseListReturn<T> => {
  const { schema } = props;

  const isControlled = "value" in props && props.value !== undefined;
  const initialValues = isControlled ? props.value : (props.initialValues ?? []);

  const [internalItems, setInternalItems] = useState<T[]>(initialValues);
  const [errors, setErrors] = useState<ListError<T>>({});

  const items = isControlled ? props.value : internalItems;
  const setItems = useCallback(
    (newItems: T[] | ((prev: T[]) => T[])) => {
      if (isControlled) {
        const resolved = typeof newItems === "function" ? newItems(props.value) : newItems;
        props.onChange(resolved);
      } else {
        setInternalItems(newItems);
      }
    },
    [isControlled, props],
  );

  useEffect(() => {
    if (isControlled) {
      queueMicrotask(() => setInternalItems(props.value));
    }
  }, [isControlled, props.value]);

  const cleanErrors = useCallback((index: number) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      const shiftedErrors: typeof newErrors = {};
      Object.entries(newErrors).forEach(([key, value]) => {
        const normalized = parseInt(key);
        if (normalized > index) {
          shiftedErrors[normalized - 1] = value;
        } else {
          shiftedErrors[normalized] = value;
        }
      });
      return shiftedErrors;
    });
  }, []);

  const validateItem = useCallback(
    (index: number): boolean => {
      const item = items[index];
      const result = schema.safeParse(item);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, [index]: result.error.message }));
        return false;
      } else {
        setErrors((prev) => ({ ...prev, [index]: null }));
        return true;
      }
    },
    [items, schema],
  );

  const validateAll = useCallback((): boolean => {
    let allIsValid = true;
    items.forEach((_, index) => {
      const isValid = validateItem(index);
      if (!isValid) allIsValid = false;
    });
    return allIsValid;
  }, [items, validateItem]);

  const handleAddItem = useCallback(
    (item: T) => {
      setItems((prev) => [...prev, item]);
      const index = items.length;
      setTimeout(() => validateItem(index), 0);
    },
    [items.length, setItems, validateItem],
  );

  const handleUpdateItem = useCallback(
    (index: number, item: T) => {
      setItems((prev) => {
        const newItems = [...prev];
        newItems[index] = item;
        return newItems;
      });
      validateItem(index);
    },
    [setItems, validateItem],
  );

  const handleUpdateField = useCallback(
    <K extends keyof T>(index: number, field: K, value: T[K]) => {
      setItems((prev) => {
        const newItems = [...prev];
        newItems[index] = { ...newItems[index], [field]: value };
        return newItems;
      });
      setTimeout(() => validateItem(index), 0);
    },
    [setItems, validateItem],
  );

  const handleDeleteItem = useCallback(
    (index: number) => {
      setItems((prev) => {
        const newItems = [...prev];
        newItems.splice(index, 1);
        return newItems;
      });
      cleanErrors(index);
    },
    [cleanErrors, setItems],
  );

  const handleReset = useCallback(() => {
    setItems(isControlled ? props.value : (props.initialValues ?? []));
    setErrors({});
  }, [setItems, isControlled, props.value, props.initialValues]);

  const hasErrors = Object.values(errors).some((error) => error !== null);

  return {
    errors,
    hasErrors,
    isControlled,
    items,
    onAddItem: handleAddItem,
    onDeleteItem: handleDeleteItem,
    onReset: handleReset,
    onUpdateField: handleUpdateField,
    onUpdateItem: handleUpdateItem,
    setItems,
    validateAll,
    validateItem,
  };
};
