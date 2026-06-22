import type { DashboardItem } from "@/types/hr/dashboard";

export type ExitType = "RESIGNATION" | "TERMINATION" | "RETIREMENT" | "CONTRACT_END";
export type ExitStatus = "Overdue" | "Pending" | "Completed";

export interface Attrition {
  id: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  exitType: ExitType;
  exitDate: Date;
  reason: string;
  status: ExitStatus;
  additionalInfo?: string;
  dateSubmitted?: Date;
  actionBy?: string;
  createdAt: Date;
}

export interface OffboardingChecklist {
  assetsReturned: boolean;
  itAccessRevoked: boolean;
  finalSalaryProcessed: boolean;
  benefitsTerminated: boolean;
}

export interface CreateExitDto {
  employeeId: string;
  exitType: string;
  exitDate: Date | undefined;
  primaryReason: string;
  additionalInformation: string;
  attachments: File[];
  offboardingChecklist: OffboardingChecklist;
}

export interface UpdateExitDto {
  exitType?: ExitType;
  exitDate?: string;
  primaryReason?: string;
  additionalInformation?: string;
  offboardingChecklist?: OffboardingChecklist;
}

export interface AddExitCommentDto {
  comment: string;
}

export interface ExitListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  exitType?: string;
  department?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface AtrritionDashboardResponse {
  totalExits: DashboardItem;
  voluntaryResignations: DashboardItem;
  contractTerminations: DashboardItem;
  retirements: DashboardItem;
  contractEnds: DashboardItem;
  pendingClearance: DashboardItem;
  generatedAt: Date;
}

export interface ListAttritionResponse {
  items: Attrition[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
