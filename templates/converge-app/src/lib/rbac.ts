import { User } from "@/types";

export type UserRole = "tenant-admin" | "regular-user";

export function getUserRole(user: User): UserRole {
  if (user.isTenantAdmin) return "tenant-admin";
  return "regular-user";
}

export function getBasePath(user: User): string {
  const role = getUserRole(user);
  switch (role) {
    case "tenant-admin":
      return "/admin";
    case "regular-user":
      return "/ess";
  }
}

export function getDashboardPath(user: User): string {
  const role = getUserRole(user);
  switch (role) {
    case "tenant-admin":
      return "/admin/overview";
    case "regular-user":
      return "/ess/overview";
  }
}

export function isOnOwnRoute(user: User, pathname: string): boolean {
  const basePath = getBasePath(user);
  return pathname.startsWith(basePath);
}
