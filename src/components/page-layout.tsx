import React from "react";

import { cn } from "../lib/utils.js";
import { ScrollArea } from "./scroll-area.js";

export interface PageLayoutTab {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  actions?: React.ReactNode;
  activeTab?: string;
  className?: string;
  onTabChange?: (tab: string) => void;
  subtitle?: string;
  tabs?: PageLayoutTab[];
}

/**
 * Standard page wrapper with optional header (title, subtitle, actions)
 * and an inline tab bar. Content is rendered inside a ScrollArea.
 */
export const PageLayout = ({ children, title, subtitle, tabs, activeTab, onTabChange, actions, className }: Props) => {
  const hasTabs = Boolean(tabs && !!tabs.length);
  const hasHeader = title || subtitle || actions;

  return (
    <ScrollArea className={cn("h-full w-full p-6", className)}>
      {hasHeader && (
        <div className="mb-4 flex w-full items-center justify-between">
          <div>
            {title && <div className="text-lg font-semibold">{title}</div>}
            {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-x-4">{actions}</div>}
        </div>
      )}
      <div className="w-full space-y-4">
        {hasTabs && (
          <div className="flex items-center border-b">
            {tabs?.map((tab) => (
              <button
                key={tab.value}
                disabled={tab.disabled}
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  "-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.value ? "border-primary text-primary" : "text-muted-foreground hover:text-foreground border-transparent",
                  tab.disabled && "cursor-not-allowed opacity-50",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
        {children}
      </div>
    </ScrollArea>
  );
};
