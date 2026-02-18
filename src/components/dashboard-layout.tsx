import * as React from "react";

import { cn } from "../lib/utils.js";

interface DashboardLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ className}: DashboardLayoutProps) => {
  return <div className={cn("", className)}></div>;
};

export { DashboardLayout };
