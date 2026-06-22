// Canonical envelope returned by the core .NET microservices
// (organization, employee, leave, payroll, identity, ...).
// The app-builder service uses the lighter `{ data }` shape in types/query.ts.

export type SortOrder = "asc" | "desc";

export interface ApiResponse<T> {
  StatusCode: number;
  Success: boolean;
  Message: string | null;
  Data: T;
}

export interface ActionResponse {
  StatusCode: number;
  Success: boolean;
  Message: string | null;
}

export interface Paginated<T> {
  Items: T[];
  Data: T[];
  TotalCount: number;
  Page: number;
  PageSize: number;
  TotalPages: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
}

export type PaginatedApiResponse<T> = ApiResponse<Paginated<T>>;

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}
