"use client";

import { useMemo } from "react";

import { can, type PermissionDecision, type PermissionObject } from "@/lib/permissions";
import { useUserStore } from "@/store/core";
import type { PermissionAction } from "@/types/user";

import { usePermissions } from "./use-permissions";

export function useCan(action: PermissionAction, object: PermissionObject): PermissionDecision {
  const { user } = useUserStore();
  const { data: rules } = usePermissions();

  return useMemo(() => {
    if (!user || !rules) return { allowed: false, level: null };
    return can(
      {
        roles: user.roles,
        employeeId: user.employeeId,
        isTenantAdmin: user.isTenantAdmin,
      },
      action,
      object,
      rules,
    );
  }, [user, rules, action, object]);
}
