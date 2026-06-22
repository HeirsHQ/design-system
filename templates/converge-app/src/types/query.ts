import type { QueryKey, UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import type { ServiceKey } from "@/lib/client";

/**
 * Standard envelope for paginated API responses.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Configuration for toast notifications on success or error.
 */
export interface ToastConfig {
  success?: string | false;
  error?: string | false;
}

/**
 * Configuration for optimistic UI updates during mutations.
 */
export interface OptimisticConfig<TCache, TVariables> {
  /**
   * Returns the new cached value to apply immediately.
   * Receives the current cached snapshot and the mutation variables.
   */
  updater: (current: TCache | undefined, variables: TVariables) => TCache;
  /**
   * Optional override rollback. If omitted, the hook rolls back to the
   * snapshot captured before the mutation automatically.
   */
  rollback?: (current: TCache | undefined, variables: TVariables) => TCache;
}

/**
 * Configuration for a standard GET query (used with useApiQuery).
 * The method is implied — no need to pass it explicitly.
 */
export interface QueryConfig<TData, TParams extends object = object> {
  serviceKey: ServiceKey;
  url: string;
  /** Merged into the query key and sent as axios params. */
  params?: TParams;
  /** Stale time in ms. Default: 5 minutes */
  staleTime?: number;
  enabled?: boolean;
  /** Transform the raw response before it reaches the consumer. */
  transform?: (raw: unknown) => TData;
}

/**
 * Configuration for an offset-based paginated GET query (used with usePaginatedQuery).
 * Page and pageSize are managed internally; pass initialPage/pageSize to seed the defaults.
 */
export interface PaginatedQueryConfig<TParams extends object = object> {
  serviceKey: ServiceKey;
  url: string;
  /** Additional query params merged with page/limit before each request. */
  params?: TParams;
  initialPage?: number;
  pageSize?: number;
  staleTime?: number;
  enabled?: boolean;
}

/**
 * Configuration for state-changing requests (used with useApiMutation).
 */
export interface MutationConfig<TData, TVariables, TCache = unknown> {
  serviceKey: ServiceKey;
  url: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  /** Toast messages shown on success/error. Pass false to silence a specific event. */
  toast?: ToastConfig;
  /** Transform the raw response before it reaches the consumer. */
  transform?: (raw: unknown) => TData;
  /**
   * Query keys to invalidate after a successful mutation.
   * Accepts static keys or a function receiving the response data.
   */
  invalidates?: QueryKey[] | ((data: TData) => QueryKey[]);
  optimistic?: OptimisticConfig<TCache, TVariables>;
  /** Query key whose cache entry will receive the optimistic update. */
  optimisticQueryKey?: QueryKey;
}

/**
 * Return type for standard queries.
 */
export type QueryReturn<TData> = UseQueryResult<TData, Error> & {
  kind: "query";
};

/**
 * Return type for offset-based paginated queries.
 */
export type PaginatedReturn<TData> = UseQueryResult<PaginatedResponse<TData>, Error> & {
  kind: "paginated";
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
};

/**
 * Return type for mutations — full TanStack Query result plus a kind discriminant.
 */
export type MutationReturn<TData, TVariables> = UseMutationResult<TData, Error, TVariables> & {
  kind: "mutation";
};
