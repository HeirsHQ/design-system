import { type LucideIcon } from "lucide-react";

export type RouteConfig = {
  href: string;
  label: string;
  permissions: string[];
  children?: RouteGroup[];
  color?: string;
  description?: string;
  disabled?: boolean;
  icon?: LucideIcon;
};

export type RouteGroup = {
  group: string;
  routes: RouteConfig[];
  permissions: string[];
  disabled?: boolean;
};

export type ConvergeApp = {
  label: string;
  href?: string;
  description?: string;
  icon?: LucideIcon;
  disabled?: boolean;
};

// Navigation is intentionally empty in the scaffold. Populate these to build out your app's menu.
export const QUICK_LINKS: RouteConfig[] = [];
export const ADMIN_ROUTES: RouteGroup[] = [];
export const USER_ROUTES: RouteGroup[] = [];
export const CONVERGE_APPS: ConvergeApp[] = [];
