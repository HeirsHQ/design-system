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

export const ADMIN_ROUTES: RouteGroup[] = [];

export const CONVERGE_APPS: ConvergeApp[] = [];
