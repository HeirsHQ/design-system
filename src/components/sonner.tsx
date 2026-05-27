"use client";

import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Themed Sonner toast container. Theme is passed as a prop instead of pulled from next-themes,
 * so the DS doesn't depend on any specific theme provider.
 *
 * @example
 * ```tsx
 * <Toaster theme="dark" />
 * ```
 */
const Toaster = ({ theme = "system", ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: { toast: "cn-toast" },
      }}
      {...props}
    />
  );
};

export { Toaster };
