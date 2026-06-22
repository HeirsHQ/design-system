export type LeaveApplicationStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface LeaveApplication {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  daysRequested: number;
  reason?: string;
  status: LeaveApplicationStatus;
  approvedBy?: string;
  createdAt: string;
}

export interface Day {
  id: string;
  date: Date | null;
  events: string[];
  isCurrentMonth?: boolean;
}

export interface CreateLeaveApplicationDto {
  employeeId: string;
  leaveTypeId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  managerId: string;
  reliefOfficerId: string;
  additionalInformation?: string;
  files: File[];
}

export interface SubmitLeaveRequestDto {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason?: string;
  managerId?: string;
  reliefOfficerId?: string;
  additionalInformation?: string;
  attachmentFileIds?: string[];
}

export interface CreateLeaveRequestOnBehalfDto {
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason?: string;
  attachmentFileIds?: string[];
}

export interface ApproveLeaveRequestDto {
  comment?: string;
  approvedDays?: number;
}

export interface RejectLeaveRequestDto {
  comment: string;
}

export interface LeaveRequestCommentDto {
  comment: string;
}

export interface UpdateLeaveRequestCommentDto {
  comment: string;
}

export interface LeaveRequestFilterDto {
  leaveTypeId?: string;
  status?: string;
  employeeId?: string;
  departmentId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface LeaveListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  leaveTypeId?: string;
  department?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}
