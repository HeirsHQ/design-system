"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { http, unwrap } from "@/lib/client";
import { removeNullorUndefined } from "@/lib";
import type { HttpResponse } from "@/types/app";
import type { CreateRoleDto, Role } from "@/types/user";

import { identityKeys } from "./keys";

export function useRolesLookup(params?: { page?: number; pageSize?: number; search?: string }) {
  const _params = removeNullorUndefined(params ?? {});
  return useQuery({
    queryKey: identityKeys.rolesLookup(_params),
    queryFn: () => http.get<HttpResponse<Role[]>>("identity", "/roles/lookup", _params).then(unwrap<Role[]>),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRolePermissions(id: string) {
  return useQuery({
    queryKey: identityKeys.rolePermissions(id),
    queryFn: () => http.get<HttpResponse<string[]>>("identity", `/roles/${id}/permissions`).then(unwrap<string[]>),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) => http.post("identity", "/roles", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: identityKeys.rolesLookup() });
      toast.success("Role created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateRole(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) => http.put("identity", `/roles/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: identityKeys.rolesLookup() });
      toast.success("Role updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => http.delete("identity", `/roles/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: identityKeys.rolesLookup() });
      toast.success("Role deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
