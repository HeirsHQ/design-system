// Real backend contracts for the goal service.

export type GoalType = "Individual" | "Team" | "Organisational";
export type GoalStatus = "NotStarted" | "InProgress" | "Completed" | "Overdue";
export type GoalMeasurementType = "Manual" | "KpiDerived";

export interface AssignedEmployeeDto {
  employeeId: string;
  fullName: string | null;
}

export interface GoalListItemDto {
  id: string;
  goalName: string | null;
  assignedTo: AssignedEmployeeDto[] | null;
  createdBy: string;
  createdByName: string | null;
  deadline: string;
  status: GoalStatus;
  progress: number;
}

export interface GoalListItemDtoPagedResult {
  items: GoalListItemDto[] | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface GoalFilterParams {
  searchTerm?: string;
  status?: GoalStatus;
  createdBy?: string;
  assignedTo?: string;
  startDateFrom?: string;
  startDateTo?: string;
  includeArchived?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateGoalDto {
  goalName: string;
  description?: string | null;
  goalType: GoalType;
  parentGoalId?: string | null;
  startDate: string;
  dueDate: string;
  measurementType: GoalMeasurementType;
  measurementNote?: string | null;
  assignTo?: string[] | null;
}

export type UpdateGoalDto = Partial<CreateGoalDto>;

export interface GoalsDashboardResponse {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  overdueGoals: number;
  totalGoalsChange: number;
  activeGoalsChange: number;
  completedGoalsChange: number;
  overdueGoalsChange: number;
  computedAt: string;
}
