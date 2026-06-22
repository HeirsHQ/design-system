export type ConditionOperators = "eq" | "neq" | "gt" | "lt" | "gte" | "lte" | "in" | "nin" | "contains";
export type ActionType = "submit" | "approve" | "reject" | "reassign" | "comment" | "custom";
export type StepType = "manual" | "automatic" | "conditional" | "parallel" | "approval";
export type WorkflowStatus = "draft" | "active" | "archived" | "deleted";

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperators;
  value: unknown;
  logicalOperator?: "and" | "or";
}

export interface Transition {
  id: string;
  fromStepId: string;
  toStepId: string;
  action: ActionType;
  conditions?: Condition[];
  metadata?: Record<string, unknown>;
}

export interface WorkflowAction {
  id: string;
  type: ActionType;
  label: string;
  icon?: string;
  permission?: string;
  transitionIds: string[];
  metadata?: Record<string, unknown>;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  type: StepType;
  order: number;
  duration?: number;
  isInitial: boolean;
  isFinal: boolean;
  assignees?: string[];
  actions: WorkflowAction[];
  notifications?: string[];
  formSchema?: Record<string, unknown>;
  permissions?: string[];
  metadata?: Record<string, unknown>;
}
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  version: number;
  steps: WorkflowStep[];
  transitions: Transition[];
  tags?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  workflowVersion: number;
  entityId: string;
  entityType: string;
  currentStepId: WorkflowStep;
  previousStepIds: WorkflowStep[];
  status: "active" | "completed" | "failed" | "paused";
  context: Record<string, unknown>;
  assignedTo?: string;
  startedAt: Date;
  completedAt: Date | null;
  createdBy: string;
}

export interface CreateWorkflowDto {
  name: string;
}
