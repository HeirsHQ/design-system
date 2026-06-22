"use client";

import { useState } from "react";

export const useValues = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const handleValueChange = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return { onValueChange: handleValueChange, values };
};
