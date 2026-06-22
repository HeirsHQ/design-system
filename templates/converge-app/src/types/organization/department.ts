import type { ApiResponse, ListParams, PaginatedApiResponse } from "@/types/api";

export type DepartmentStatus = "Active" | "Suspended" | "Archived";
export type DepartmentAction = "suspend" | "reactivate" | "archive" | "unarchive";

export interface Department {
  Id: string;
  Code: string;
  GroupId: string;
  GroupName: string;
  Name: string;
  ManagerId: string;
  ManagerName: string;
  ManagerEmail: string;
  SizeRange: string;
  Email: string;
  Phone: string;
  Location: string;
  Description: string;
  Status: DepartmentStatus;
  EmployeeCount: number;
  UnitCount: number;
  JobRoleCount: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateDepartmentDto {
  Name: string;
  GroupId?: string;
  ManagerId?: string;
  SizeRange?: string;
  Email?: string;
  Phone?: string;
  Location?: string;
  Description?: string;
}

export interface UpdateDepartmentDto {
  Name: string;
  ManagerId?: string;
  SizeRange?: string;
  Email?: string;
  Phone?: string;
  Location?: string;
  Description?: string;
}

export interface DepartmentListParams extends ListParams {
  groupId?: string;
  status?: DepartmentStatus;
  location?: string;
  manager?: string;
}

export type DepartmentResponse = ApiResponse<Department>;
export type DepartmentListResponse = PaginatedApiResponse<Department>;
