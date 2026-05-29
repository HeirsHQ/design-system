import React from "react";

import { cn } from "../lib/utils.js";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The currently selected tab value */
  selected: string | number;
  /** The value this panel corresponds to */
  value: string | number;
  children?: React.ReactNode;
  className?: string;
  /** Class applied to the inner content wrapper */
  innerClassName?: string;
  /** Keep content mounted in the DOM even when not selected (default: false) */
  preserveContent?: boolean;
}

/**
 * Accessible tab panel that shows/hides content based on the selected tab.
 *
 * @example
 * ```tsx
 * <TabPanel selected={activeTab} value="settings">
 *   <SettingsForm />
 * </TabPanel>
 * ```
 */
const TabPanel = ({ selected, value, children, className, innerClassName, preserveContent = false }: Props) => {
  if (typeof selected !== typeof value) {
    throw new Error("TabPanel: selected and value must be of the same type");
  }

  const isSelected = selected === value;
  const content = <div className={cn("h-full w-full", innerClassName)}>{children}</div>;

  return (
    <div
      role="tabpanel"
      hidden={!isSelected}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      aria-hidden={!isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={cn("h-full w-full", className)}
    >
      {(isSelected || preserveContent) && content}
    </div>
  );
};

export { TabPanel };
export type { Props as TabPanelProps };
