"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { type ServiceKey, http } from "./client";
import { removeNullorUndefined } from "./utils";
import type {
  MutationConfig,
  MutationReturn,
  PaginatedQueryConfig,
  PaginatedResponse,
  PaginatedReturn,
  QueryConfig,
  QueryReturn,
} from "@/types/query";

// ---------------------------------------------------------------------------
// Internal fetch helpers
// ---------------------------------------------------------------------------

const fetchOne = async <TData>(
  serviceKey: ServiceKey,
  url: string,
  params?: object,
  transform?: (raw: unknown) => TData,
): Promise<TData> => {
  const raw = await http.get<TData>(serviceKey, url, params);
  return transform ? transform(raw) : (raw as TData);
};

const fetchMutate = async <TData, TVariables>(
  serviceKey: ServiceKey,
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  variables: TVariables,
  transform?: (raw: unknown) => TData,
): Promise<TData> => {
  const raw = await http[method.toLowerCase() as "post" | "put" | "patch" | "delete"]<TData>(
    serviceKey,
    url,
    variables,
  );
  return transform ? transform(raw) : (raw as TData);
};

// ---------------------------------------------------------------------------
// useApiQuery — standard GET
// ---------------------------------------------------------------------------

/**
 * Fetches data from a GET endpoint and keeps it in the query cache.
 *
 * @example
 * const { data, isPending } = useApiQuery<Profile>({
 *   serviceKey: "identity",
 *   url: "/me",
 * });
 */
export function useApiQuery<TData, TParams extends object = object>(
  config: QueryConfig<TData, TParams>,
): QueryReturn<TData> {
  const _params = removeNullorUndefined(config.params ?? {});
  const result = useQuery<TData, Error>({
    queryKey: [config.url, JSON.stringify(_params)],
    queryFn: () => fetchOne<TData>(config.serviceKey, config.url, _params, config.transform),
    enabled: config.enabled ?? true,
    staleTime: config.staleTime ?? 5 * 60 * 1000,
  });

  return { ...result, kind: "query" } as QueryReturn<TData>;
}

// ---------------------------------------------------------------------------
// usePaginatedQuery — offset-based paginated GET
// ---------------------------------------------------------------------------

/**
 * Fetches a paginated list from a GET endpoint.
 * Page and pageSize are managed internally; setPage/setPageSize let you control them.
 *
 * @example
 * const { data, page, setPage, pageSize, setPageSize } = usePaginatedQuery<Budget>({
 *   serviceKey: "finance",
 *   url: "/budgets",
 *   pageSize: 10,
 * });
 * // data.data       → Budget[] for current page
 * // data.total      → total record count
 * // data.totalPages → total page count
 */
export function usePaginatedQuery<TData, TParams extends object = object>(
  config: PaginatedQueryConfig<TParams>,
): PaginatedReturn<TData> {
  const [page, setPage] = useState(config.initialPage ?? 1);
  const [pageSize, setPageSize] = useState(config.pageSize ?? 20);

  const result = useQuery<PaginatedResponse<TData>, Error>({
    queryKey: [config.url, JSON.stringify(config.params ?? {}), page, pageSize],
    queryFn: () =>
      http.get<PaginatedResponse<TData>>(config.serviceKey, config.url, {
        ...config.params,
        page,
        limit: pageSize,
      }),
    enabled: config.enabled ?? true,
    staleTime: config.staleTime ?? 5 * 60 * 1000,
    // Keep showing previous page data while the next page loads.
    placeholderData: (prev) => prev,
  });

  return { ...result, kind: "paginated", page, setPage, pageSize, setPageSize };
}

// ---------------------------------------------------------------------------
// useApiMutation — POST / PUT / PATCH / DELETE
// ---------------------------------------------------------------------------

/**
 * Performs a state-changing request with optional optimistic updates,
 * cache invalidation, and toast notifications.
 *
 * @example
 * const { mutate, isPending } = useApiMutation<void, LoginDto>({
 *   serviceKey: "identity",
 *   url: "/auth/login",
 *   method: "POST",
 *   toast: { success: "Signed in!" },
 *   invalidates: [["/me"]],
 * });
 */
export function useApiMutation<TData, TVariables = void, TCache = unknown>(
  config: MutationConfig<TData, TVariables, TCache>,
): MutationReturn<TData, TVariables> {
  const queryClient = useQueryClient();

  const result = useMutation<TData, Error, TVariables>({
    mutationFn: (variables) =>
      fetchMutate<TData, TVariables>(config.serviceKey, config.url, config.method, variables, config.transform),

    onMutate: async (variables) => {
      if (!config.optimistic || !config.optimisticQueryKey) return;

      await queryClient.cancelQueries({ queryKey: config.optimisticQueryKey });

      const snapshot = queryClient.getQueryData<TCache>(config.optimisticQueryKey);

      queryClient.setQueryData<TCache>(config.optimisticQueryKey, (current) =>
        config.optimistic!.updater(current, variables),
      );

      return { snapshot };
    },

    onError: (error, variables, context) => {
      if (config.optimistic && config.optimisticQueryKey) {
        const ctx = context as { snapshot: TCache } | undefined;
        queryClient.setQueryData<TCache>(
          config.optimisticQueryKey,
          config.optimistic.rollback
            ? (current) => config.optimistic!.rollback!(current, variables)
            : () => ctx?.snapshot,
        );
      }

      if (config.toast?.error !== false) {
        toast.error(config.toast?.error ?? error.message);
      }
    },

    onSuccess: (data) => {
      if (config.toast?.success !== false) {
        toast.success(config.toast?.success ?? "Done");
      }

      const keys = typeof config.invalidates === "function" ? config.invalidates(data) : (config.invalidates ?? []);

      keys.forEach((key) => queryClient.invalidateQueries({ queryKey: key as readonly unknown[] }));
    },
  });

  return { ...result, kind: "mutation" };
}
