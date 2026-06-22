import type { Employee } from "@/types/employee";

export type LeaveStatus = "active" | "exhausted" | "expired";

export interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveTypeId: string;
  leaveTypeName: string;
  year: number;
  daysAllowed: number;
  daysUsed: number;
  daysRemaining: number;
  daysCarriedForward: number;
  isPaid: boolean;
  reason: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  createdAt: string;
  updatedAt: string | null;
}

export interface LeaveAllocation {
  id: string;
  leaveType: string;
  employee: Employee;
  startDate: Date;
  endDate: Date;
  totalLeaveDays: number;
  newLeaveDays: number;
  status: "pending" | "approved" | "rejected";
}

export interface CreateLeaveDto {
  employeeId: string;
  leaveTypeId: string;
  year: number;
  daysAllowed: number;
  daysCarriedForward?: number;
}

export interface CreateLeaveAllocationDto {
  leaveTypeId: string;
  employeeId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  newLeaveDays: number;
  totalLeaveDays: number;
  note?: string;
}

export interface CreateLeaveAllocationRequest {
  leaveTypeId: string;
  employeeIds: string[];
  startDate: string;
  endDate: string;
  allocatedDays: number;
  description?: string;
}

export interface UpdateLeaveAllocationRequest {
  startDate?: string;
  endDate?: string;
  allocatedDays?: number;
  description?: string;
  employeeIds?: string[];
}

export interface AllocationActionDto {
  reason?: string;
  confirmAction: boolean;
}

export interface AdjustLeaveBalanceDto {
  employeeId: string;
  leaveTypeId: string;
  days: number;
  reason: string;
  year?: number;
}

export interface LeaveAllocationListParams {
  Status?: string;
  LeaveTypeId?: string;
  Search?: string;
  Page?: number;
  Limit?: number;
  SortBy?: string;
  SortOrder?: string;
}
