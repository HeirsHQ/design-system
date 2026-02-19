import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils.js";

const sidebarVariants = cva("flex h-full flex-col border-r border-gray-200 bg-white", {
  variants: {
    variant: {
      default: "w-64",
      compact: "w-16",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Sidebar component props.
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sidebarVariants> {
  /**
   * Whether the sidebar is collapsed.
   * @default false
   */
  collapsed?: boolean;
}

/**
 * A composable sidebar component for navigation layouts.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarHeader>
 *     <img src="/logo.svg" alt="Logo" />
 *   </SidebarHeader>
 *   <SidebarContent>
 *     <SidebarGroup>
 *       <SidebarGroupLabel>Main</SidebarGroupLabel>
 *       <SidebarItem active>Dashboard</SidebarItem>
 *       <SidebarItem>Settings</SidebarItem>
 *     </SidebarGroup>
 *   </SidebarContent>
 *   <SidebarFooter>
 *     <span>v1.0.0</span>
 *   </SidebarFooter>
 * </Sidebar>
 * ```
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(({ className, variant, collapsed, ...props }, ref) => (
  <aside ref={ref} className={cn(sidebarVariants({ variant: collapsed ? "compact" : variant }), className)} {...props} />
));
Sidebar.displayName = "Sidebar";

/**
 * Sidebar header component props.
 */
export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Top section of the sidebar, typically for logo or branding.
 */
const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-14 shrink-0 items-center border-b border-gray-200 px-4", className)} {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

/**
 * Sidebar content component props.
 */
export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Scrollable content area of the sidebar.
 */
const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-y-auto py-2", className)} {...props} />
));
SidebarContent.displayName = "SidebarContent";

/**
 * Sidebar footer component props.
 */
export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Bottom section of the sidebar, pinned to the bottom.
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("shrink-0 border-t border-gray-200 p-4", className)} {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

/**
 * Sidebar group component props.
 */
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A logical group of sidebar items.
 */
const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-2 py-1", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

/**
 * Sidebar group label component props.
 */
export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A label for a sidebar group section.
 */
const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-1 px-2 text-xs font-semibold tracking-wide text-gray-400 uppercase", className)} {...props} />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

/**
 * Sidebar item component props.
 */
export interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether this item is the currently active/selected item.
   * @default false
   */
  active?: boolean;
}

/**
 * A single navigation item in the sidebar.
 *
 * @example
 * ```tsx
 * <SidebarItem active>Dashboard</SidebarItem>
 * <SidebarItem onClick={() => navigate("/settings")}>Settings</SidebarItem>
 * ```
 */
const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(({ className, active, ...props }, ref) => (
  <div
    ref={ref}
    data-active={active ? "" : undefined}
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100",
      active && "bg-primary-50 text-primary-600",
      className,
    )}
    {...props}
  />
));
SidebarItem.displayName = "SidebarItem";

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarItem, sidebarVariants };
