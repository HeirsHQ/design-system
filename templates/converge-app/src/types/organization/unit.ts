import type { ApiResponse, ListParams, PaginatedApiResponse } from "@/types/api";

export type UnitStatus = "Active" | "Suspended" | "Archived";
export type UnitAction = "suspend" | "reactivate" | "archive" | "unarchive";

export interface Unit {
  Id: string;
  Code: string;
  DepartmentId: string;
  DepartmentName: string;
  Name: string;
  SizeRange: string;
  ManagerId: string;
  ManagerName: string;
  ManagerEmail: string;
  Email: string;
  Phone: string;
  Location: string;
  Description: string;
  Status: UnitStatus;
  EmployeeCount: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateUnitDto {
  DepartmentId?: string;
  Name: string;
  SizeRange?: string;
  ManagerId?: string;
  Email?: string;
  Phone?: string;
  Location?: string;
  Description?: string;
}

export interface UpdateUnitDto {
  Name: string;
  SizeRange?: string;
  ManagerId?: string;
  Email?: string;
  Phone?: string;
  Location?: string;
  Description?: string;
}

export interface UnitListParams extends ListParams {
  departmentId?: string;
  status?: UnitStatus;
}

export type UnitResponse = ApiResponse<Unit>;
export type UnitListResponse = PaginatedApiResponse<Unit>;
