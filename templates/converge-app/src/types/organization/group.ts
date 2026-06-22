import type { ApiResponse, ListParams, PaginatedApiResponse } from "@/types/api";

export interface Group {
  Id: string;
  Code: string;
  Name: string;
  ManagerId: string;
  ManagerName: string;
  ManagerEmail: string;
  Email: string;
  Phone: string;
  Location: string;
  Responsibilities: string;
  Status: string;
  DepartmentCount: number;
  EmployeeCount: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateGroupDto {
  Name: string;
  ManagerId?: string;
  Email?: string;
  Phone?: string;
  Location?: string;
  Responsibilities?: string;
}

export interface UpdateGroupDto {
  Name: string;
  ManagerId?: string;
  Email?: string;
  Phone?: string;
  Location?: string;
  Responsibilities?: string;
}

export interface GroupListParams extends ListParams {
  includeArchived?: boolean;
}

export type GroupResponse = ApiResponse<Group>;
export type GroupListResponse = PaginatedApiResponse<Group>;
