import type { DashboardItem } from "@/types/hr/dashboard";

export type SanctionType = "VERBAL_WARNING" | "WRITTEN_WARNING" | "FINAL_WARNING" | "SUSPENSION" | "TERMINATION";
export type SanctionStatus = "ESCALATED" | "UNDER_REVIEW" | "ACTIVE" | "RESOLVED" | "ARCHIVED" | "DELETED";

export interface Sanction {
  id: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  jobTitle?: string;
  departmentManager?: string;
  email?: string;
  dateJoined?: Date;
  employmentStatus?: string;
  sanctionType: SanctionType;
  dateIssued: Date;
  issuedBy: string;
  status: SanctionStatus;
  reasonSummary: string;
  detailedDescription?: string;
  effectivePeriodStart?: Date;
  effectivePeriodEnd?: Date;
  additionalInfo?: string;
  createdAt: Date;
}

export interface CreateSanctionDto {
  employeeId: string;
  sanctionType: SanctionType;
  issuedDate: string;
  effectiveFrom: Date | undefined;
  effectiveTo: Date | undefined;
  reasonSummary: string;
  detailedDescription: string;
  attachments: File[];
}

export interface UpdateSanctionDto {
  sanctionType?: SanctionType;
  issuedDate?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  reasonSummary?: string;
  detailedDescription?: string;
}

export interface ChangeSanctionStatusDto {
  newStatus: SanctionStatus;
}

export interface SanctionListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sanctionType?: string;
  department?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface SanctionDashboardResponse {
  activeSanctions: DashboardItem;
  writtenWarnings: DashboardItem;
  suspensions: DashboardItem;
  resolvedCases: DashboardItem;
  generatedAt: Date;
}

export interface ListSanctionsResponse {
  items: Sanction[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
