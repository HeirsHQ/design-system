import type { ApiResponse, ListParams, PaginatedApiResponse } from "@/types/api";

export type BranchStatus = "Active" | "Suspended" | "Archived";
export type BranchAction = "suspend" | "reactivate" | "archive" | "unarchive";

export interface Branch {
  Id: string;
  Code: string;
  Name: string;
  Address: string;
  Country: string;
  City: string;
  Phone: string;
  IsHeadquarters: boolean;
  Status: BranchStatus;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateBranchDto {
  CompanyId?: string;
  Name: string;
  Address?: string;
  Country?: string;
  City?: string;
  Phone?: string;
  IsHeadquarters?: boolean;
}

export interface UpdateBranchDto {
  Name: string;
  Address?: string;
  Country?: string;
  City?: string;
  Phone?: string;
  IsHeadquarters?: boolean;
}

export interface BranchListParams extends ListParams {
  status?: BranchStatus;
}

export type BranchResponse = ApiResponse<Branch>;
export type BranchListResponse = PaginatedApiResponse<Branch>;
export type ListBranchesResponse = ApiResponse<Branch[]>;
