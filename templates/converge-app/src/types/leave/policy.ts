export type LeavePolicyStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
export type LeavePolicyAction = "suspend" | "reactivate" | "archive";
export type LeaveAccrualType = "Annual" | "Monthly" | "Quarterly" | "BiAnnual";

export interface LeavePolicyListItem {
  id: string;
  policyName: string;
  leaveTypeName: string;
  leaveDuration: number;
  status: LeavePolicyStatus;
  policyStartDate: string | null;
  policyEndDate: string | null;
}

export interface LeavePolicy {
  id: string;
  policyName: string;
  leaveTypeId: string;
  leaveTypeName: string;
  description: string;
  employmentTypes: string[];
  leaveDuration: number;
  accrualType: LeaveAccrualType;
  status: LeavePolicyStatus;
  version: number;
  message?: string;
}

export interface CreatePolicyDto {
  policyName: string;
  leaveTypeId: string;
  description?: string;
  leaveDuration: number;
  accrualType: LeaveAccrualType;
  requiresApproval?: boolean;
  allowAttachment?: boolean;
  carryForward?: {
    enabled: boolean;
    expiryMonths?: number;
    maxCarryForwardDays?: number;
  };
  policyPeriod?: {
    startDate?: string;
    endDate?: string;
  };
}

export interface UpdatePolicyDto {
  policyName: string;
  description?: string;
  leaveDuration: number;
}

export interface PolicyActionDto {
  reason?: string;
  confirmAction: boolean;
}
