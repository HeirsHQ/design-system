// import * as React from "react";
import { cn } from "../lib/utils.js";

interface SidebarProps {
  variant?: "default" | "compact";
}

const Sidebar = ({ variant }: SidebarProps) => {
  return <div className={cn("", variant)}></div>;
};

export { Sidebar };
