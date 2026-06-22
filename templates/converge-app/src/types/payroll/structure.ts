export interface SalaryStructure {
  id: string;
  name: string;
  description?: string;
  basicSalaryComponentId?: string;
  allowanceIds: string[];
  deductionIds: string[];
  contributionIds: string[];
  componentCount: number;
  employeeCount: number;
  status: "active" | "inactive";
  createdAt: string;
}
