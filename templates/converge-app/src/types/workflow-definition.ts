// Real backend contracts for the workflow service (WorkflowDefinition model),
// distinct from the in-app Workflow engine model in workflow.ts.

export interface WorkflowDefinitionSummary {
  id: string;
  documentType: string;
  entityId?: string;
  documentTypeId?: string | null;
  processType?: string | null;
  code: string;
  name: string;
  version: number;
  isActive: boolean;
  isLatestVersion: boolean;
  rootDefinitionId: string;
  parentDefinitionId: string | null;
  stepCount: number;
  updatedAt: string;
}

export interface WorkflowDefinitionStats {
  totalWorkflows: number;
  activeWorkflows: number;
  inactiveWorkflows: number;
  draftWorkflows: number;
  totalWorkflowsChange: number;
  activeWorkflowsChange: number;
  inactiveWorkflowsChange: number;
  draftWorkflowsChange: number;
  totalWorkflowsComparisonText: string;
  activeWorkflowsComparisonText: string;
  inactiveWorkflowsComparisonText: string;
  draftWorkflowsComparisonText: string;
}

export interface WorkflowDefinitionPaginated {
  items: WorkflowDefinitionSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CreateWorkflowDefinitionDto {
  documentType: string;
  entityId: string;
  code: string;
  name: string;
  description?: string;
  steps: unknown[];
  states?: unknown[];
  transitions?: unknown[];
}

export type UpdateWorkflowDefinitionDto = Partial<CreateWorkflowDefinitionDto>;
