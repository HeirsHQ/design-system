import type { ApiResponse, ListParams, PaginatedApiResponse } from "@/types/api";

export type JobRoleStatus = "Active" | "Inactive";

export interface JobRole {
  Id: string;
  Code: string;
  DepartmentId: string;
  DepartmentName: string;
  RoleName: string;
  RoleDescription: string;
  ReportsToId: string;
  ReportsToName: string;
  ReportsToEmail: string;
  Email: string;
  Phone: string;
  Status: JobRoleStatus;
  EmployeeCount: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateJobRoleDto {
  DepartmentId?: string;
  RoleName: string;
  RoleDescription?: string;
  ReportsToId?: string;
  Email?: string;
  Phone?: string;
}

export interface UpdateJobRoleDto {
  RoleName: string;
  RoleDescription?: string;
  ReportsToId?: string;
  Email?: string;
  Phone?: string;
}

export interface JobRoleListParams extends ListParams {
  departmentId?: string;
  roleName?: string;
  head?: string;
  updatedAfter?: string;
  updatedBefore?: string;
}

export interface Designation {
  id: string;
  title: string;
  departmentName?: string;
  level?: string;
  employeeCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

export type JobRoleResponse = ApiResponse<JobRole>;
export type JobRoleListResponse = PaginatedApiResponse<JobRole>;
