// Real backend contracts for the sequence service (distinct from the mock
// Sequence type in system/sequence.ts).

export type SequenceApiStatus = "Active" | "Inactive" | "Archived";
export type ResetPolicy = "None" | "Daily" | "Weekly" | "Monthly" | "Yearly" | "FiscalYear";

export interface SequenceApiResponse {
  id: string;
  name: string;
  code: string;
  implementation: string;
  nextValue: number;
  incrementStep: number;
  prefix: string;
  suffix: string;
  paddingSize: number;
  scope: number;
  module: string;
  tenantId?: string;
  status: SequenceApiStatus;
  resetPolicy: ResetPolicy;
  lastResetDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SequenceStats {
  totalSequences: number;
  activeSequences: number;
  inactiveSequences: number;
  recentlyUpdated: number;
  activePercentage: number;
  inactivePercentage: number;
  lastUpdatedAt: string;
}

export interface SequenceListResponse {
  items: SequenceApiResponse[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
