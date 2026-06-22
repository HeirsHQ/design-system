export interface LeaveTypeListItem {
  leaveTypeId: string;
  name: string;
  code: string;
  status: "Active" | "Archived";
}

export interface LeaveType {
  leaveTypeId: string;
  name: string;
  code: string;
  applicableAfterDays: number;
  minimumNoticePeriodDays: number;
  maxConsecutiveDays: number;
  customInstructions: string;
  requireHandoverNotes: boolean;
  requireSupportingDocuments: boolean;
  requireReasonDescription: boolean;
  allowOverAllocation: boolean;
  status: "Active" | "Archived";
  message?: string;
}

export interface CreateLeaveTypeDto {
  name: string;
  code?: string;
  applicableAfterDays?: number;
  minimumNoticePeriodDays?: number;
  maxConsecutiveDays?: number;
  customInstructions?: string;
  requireHandoverNotes: boolean;
  requireSupportingDocuments: boolean;
  requireReasonDescription: boolean;
  allowOverAllocation: boolean;
}

export interface UpdateLeaveTypeDto {
  name: string;
  applicableAfterDays?: number;
  minimumNoticePeriodDays?: number;
  maxConsecutiveDays?: number;
  customInstructions?: string;
  requireHandoverNotes: boolean;
  requireSupportingDocuments: boolean;
  requireReasonDescription: boolean;
  allowOverAllocation: boolean;
}
