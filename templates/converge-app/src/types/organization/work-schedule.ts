import type { ApiResponse } from "@/types/api";

export type WorkScheduleStatus = "Active" | "Archived";

export interface WorkSchedule {
  Id: string;
  Name: string;
  StartTime: string;
  EndTime: string;
  BreakDurationMinutes: number;
  WorkDays: string[];
  Status: WorkScheduleStatus;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateWorkScheduleDto {
  Name: string;
  StartTime: string;
  EndTime: string;
  BreakDurationMinutes: number;
  WorkDays: string[];
}

export type UpdateWorkScheduleDto = CreateWorkScheduleDto;

export interface WorkScheduleListParams {
  includeArchived?: boolean;
}

export type WorkScheduleResponse = ApiResponse<WorkSchedule>;
export type WorkScheduleListResponse = ApiResponse<WorkSchedule[]>;
