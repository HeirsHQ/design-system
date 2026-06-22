"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { getDashboardPath, isOnOwnRoute } from "@/lib/rbac";
import { Maybe, User } from "@/types";

/**
 * Returns a callback that enforces role-based routing.
 * If the user is not on a route that matches any of their roles, redirects to their primary dashboard.
 *
 * @example
 * const enforceRbac = useRbac();
 * useEffect(() => { enforceRbac(user); }, [user]);
 */
export const useRbac = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getRedirectPath = useCallback((user: User): string => {
    return getDashboardPath(user);
  }, []);

  return useCallback(
    (user: Maybe<User>) => {
      if (!user) {
        router.replace("/");
        return;
      }

      if (!isOnOwnRoute(user, pathname)) {
        router.replace(getRedirectPath(user));
      }
    },
    [pathname, getRedirectPath, router],
  );
};
