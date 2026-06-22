"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import { can, type PermissionRequirement } from "@/lib/permissions";
import { usePermissions } from "@/hooks/identity";
import { useUserStore } from "@/store/core";
import { getUserRole } from "@/lib/rbac";
import type { UserRole } from "@/lib/rbac";

interface Props {
  permissions: PermissionRequirement[];
  roles: UserRole[];
  checkOnMount?: boolean;
  redirectTo?: string;
}

/**
 * Guards a route by checking the current user's roles and permission requirements.
 * Optionally runs the check on mount and redirects if access is denied.
 *
 * @example
 * const { hasResourceAccess } = useProtectedRoutes({
 *   roles: ["tenant-admin"],
 *   permissions: [{ action: "read", on: { module: "budget", entity: "budget" } }],
 *   checkOnMount: true,
 * });
 */
export const useProtectedRoutes = ({ permissions, roles, checkOnMount, redirectTo }: Props) => {
  const toastId = useRef<string | null>(null);
  const { user, isHydrated } = useUserStore();
  const router = useRouter();
  const needsRules = permissions.length > 0;
  const { data: rules } = usePermissions(undefined, { enabled: needsRules });

  const showToast = useCallback((title: string, description: string, id: string) => {
    if (toastId.current !== id) {
      toast.error(title, { description, id, richColors: true });
      toastId.current = id;
    }
  }, []);

  const hasResourceAccess = useMemo(() => {
    if (!isHydrated || !user) return false;
    const role = getUserRole(user);
    const hasRole = roles.length === 0 || roles.includes(role);
    if (!hasRole) return false;
    if (!needsRules) return true;
    if (!rules) return false;
    const subject = {
      roles: user.roles,
      employeeId: user.employeeId,
      isTenantAdmin: user.isTenantAdmin,
    };
    return permissions.every(({ action, on }) => can(subject, action, on, rules).allowed);
  }, [permissions, roles, user, isHydrated, needsRules, rules]);

  const checkResourceAccess = React.useCallback(() => {
    if (!isHydrated) return false;
    if (needsRules && !rules) return false;

    if (!user) {
      showToast("Authentication Required", "Please log in to access this page", "auth-required");
      router.replace(redirectTo ?? "/");
      return false;
    }

    if (!hasResourceAccess) {
      showToast("Access Denied", "You don't have permission to access this page", "access-denied");
      router.replace(redirectTo ?? "/");
      return false;
    }

    return true;
  }, [user, isHydrated, hasResourceAccess, redirectTo, router, showToast, needsRules, rules]);

  useEffect(() => {
    if (checkOnMount && isHydrated) checkResourceAccess();
    return () => {
      toastId.current = null;
    };
  }, [checkResourceAccess, checkOnMount, isHydrated]);

  return { hasResourceAccess, checkResourceAccess };
};
