import axios, { type AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

import { readCsrfToken, CSRF_HEADER } from "./csrf";
// import { clearAuthCookies } from "./auth-cookies";

/**
 * Valid keys representing the available microservices in the system.
 */
export type ServiceKey =
  | "alert"
  | "app-builder"
  | "appraisal"
  | "attrition"
  | "documents"
  | "employee"
  | "goal"
  | "identity"
  | "import"
  | "kpi-tracking"
  | "leave"
  | "notification"
  | "organization"
  | "payroll"
  | "performance"
  | "questionnaire"
  | "reviews"
  | "sequence"
  | "talent"
  | "tenant"
  | "workflow";

const instanceCache = new Map<ServiceKey, AxiosInstance>();

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _retryCount?: number;
};

// const MAX_RETRIES = 3;

const services: Record<ServiceKey, string> = {
  alert: "/api/proxy/alert",
  "app-builder": "/api/v1",
  appraisal: "/api/proxy/appraisal",
  attrition: "/api/proxy/attrition",
  documents: "/api/proxy/documents",
  employee: "/api/proxy/employee",
  goal: "/api/proxy/goal",
  identity: "/api/proxy/identity",
  import: "/api/proxy/import",
  "kpi-tracking": "/api/proxy/kpi-tracking",
  leave: "/api/proxy/leave",
  notification: "/api/proxy/notification",
  organization: "/api/proxy/organization",
  payroll: "/api/proxy/payroll",
  performance: "/api/proxy/performance",
  questionnaire: "/api/proxy/questionnaire",
  reviews: "/api/proxy/reviews",
  sequence: "/api/proxy/sequence",
  talent: "/api/proxy/talent",
  tenant: "/api/proxy/tenant",
  workflow: "/api/proxy/workflow",
};

// const forceLogout = async () => {
//   await clearAuthCookies();
//   window.location.href = "/";
// };

let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async (): Promise<void> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = axios
    .post("/api/auth/refresh", null, {
      withCredentials: true,
      headers: { [CSRF_HEADER]: readCsrfToken() ?? "" },
    })
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

/**
 * Creates and configures an Axios instance for a specific microservice.
 */
export const createApiClient = (serviceKey: ServiceKey): AxiosInstance => {
  const cached = instanceCache.get(serviceKey);
  if (cached) return cached;

  const apiClient = axios.create({
    baseURL: services[serviceKey],
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  apiClient.interceptors.request.use((config) => {
    const method = config.method?.toLowerCase();
    if (method && ["post", "put", "patch", "delete"].includes(method)) {
      const csrf = readCsrfToken();
      if (csrf) config.headers[CSRF_HEADER] = csrf;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequest;

      const message =
        (error.response?.data as Record<string, string>)?.message ?? error.message ?? "An unexpected error occurred";

      if (error.response?.status !== 401) {
        return Promise.reject(new Error(message));
      }

      originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

      // if (originalRequest._retryCount > MAX_RETRIES) {
      //   await forceLogout();
      //   return Promise.reject(new Error("Session expired. You have been logged out."));
      // }

      try {
        await refreshAccessToken();
        return apiClient(originalRequest);
      } catch {
        // if (originalRequest._retryCount >= MAX_RETRIES) {
        //   await forceLogout();
        //   return Promise.reject(new Error("Session expired. You have been logged out."));
        // }
        return Promise.reject(new Error(message));
      }
    },
  );

  instanceCache.set(serviceKey, apiClient);
  return apiClient;
};

/**
 * Unwraps the core-service response envelope, returning the inner payload.
 * Tolerates both PascalCase (Data) and camelCase (data) envelopes.
 */
export function unwrap<T>(res: unknown): T {
  const r = res as { Data?: T; data?: T };
  return (r.Data ?? r.data) as T;
}

/**
 * A unified HTTP client interface for performing typed API requests across microservices.
 */
export const http = {
  get: <T>(serviceKey: ServiceKey, url: string, params?: object) =>
    createApiClient(serviceKey)
      .get<T>(url, { params })
      .then((r) => r.data),

  post: <T>(serviceKey: ServiceKey, url: string, data?: unknown) =>
    createApiClient(serviceKey)
      .post<T>(url, data)
      .then((r) => r.data),

  put: <T>(serviceKey: ServiceKey, url: string, data?: unknown) =>
    createApiClient(serviceKey)
      .put<T>(url, data)
      .then((r) => r.data),

  patch: <T>(serviceKey: ServiceKey, url: string, data?: unknown) =>
    createApiClient(serviceKey)
      .patch<T>(url, data)
      .then((r) => r.data),

  delete: <T>(serviceKey: ServiceKey, url: string, data?: unknown) =>
    createApiClient(serviceKey)
      .delete<T>(url, { data })
      .then((r) => r.data),
};
