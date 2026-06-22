"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { http, unwrap } from "@/lib/client";
import { removeNullorUndefined } from "@/lib";
import type { HttpResponse } from "@/types/app";
import type { CreateUserDto, ListUserResponse, User } from "@/types/user";

import { identityKeys } from "./keys";

export function useUsers(params?: { page?: number; pageSize?: number; search?: string; status?: string }) {
  const _params = removeNullorUndefined(params ?? {});
  return useQuery({
    queryKey: identityKeys.users(_params),
    queryFn: () =>
      http.get<HttpResponse<ListUserResponse>>("identity", "/users", _params).then(unwrap<ListUserResponse>),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: identityKeys.user(id),
    queryFn: () => http.get<HttpResponse<User>>("identity", `/users/${id}`).then(unwrap<User>),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserDto) => http.post<HttpResponse<User>>("identity", "/users", data).then(unwrap<User>),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: identityKeys.all });
      toast.success("User created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateUser(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CreateUserDto>) => http.put("identity", `/users/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: identityKeys.all });
      toast.success("User updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
