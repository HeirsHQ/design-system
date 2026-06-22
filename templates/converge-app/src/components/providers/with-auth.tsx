"use client";

import React, { useEffect } from "react";

import { useRbac, useProtectedRoutes } from "@/hooks";
import { useUserStore } from "@/store/core";
import { Loader } from "@heirshq/design-system";
import type { PermissionRequirement } from "@/lib/permissions";
import type { UserRole } from "@/lib/rbac";

interface Props {
  children: React.ReactNode;
  permissions: PermissionRequirement[];
  roles: UserRole[];
  enableRbacRedirect?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const WithAuth = ({
  children,
  permissions,
  roles,
  enableRbacRedirect,
  fallback = <Loader isFullScreen />,
  redirectTo = "/",
}: Props) => {
  const { user, isHydrated, hydrate } = useUserStore();
  const handleRbac = useRbac();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const { hasResourceAccess } = useProtectedRoutes({ permissions, roles, checkOnMount: true, redirectTo });

  useEffect(() => {
    if (isHydrated && hasResourceAccess && user && enableRbacRedirect) {
      handleRbac(user);
    }
  }, [isHydrated, hasResourceAccess, enableRbacRedirect, handleRbac, user]);

  if (!isHydrated) {
    return fallback;
  }

  if (!user) {
    return fallback;
  }

  if (!hasResourceAccess) {
    return fallback;
  }

  return children;
};
