"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http, unwrap } from "@/lib/client";
import { removeNullorUndefined } from "@/lib";
import type { HttpResponse } from "@/types/app";
import type { PermissionRule } from "@/types/user";

import { identityKeys } from "./keys";

export function usePermissions(
  params?: { page?: number; pageSize?: number; search?: string },
  options?: { enabled?: boolean },
) {
  const _params = removeNullorUndefined(params ?? {});
  return useQuery({
    queryKey: [...identityKeys.all, "permissions", _params] as const,
    queryFn: () =>
      http.get<HttpResponse<PermissionRule[]>>("identity", "/permissions", _params).then(unwrap<PermissionRule[]>),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

export function useUpdatePermissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => http.put("identity", "/permissions", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...identityKeys.all, "permissions"] }),
  });
}
