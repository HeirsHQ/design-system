// Real backend contracts for the payroll service (distinct from the mock-shaped
// SalaryComponent/SalaryStructure types used by the current payroll pages).

export enum PayrollComponentType {
  Basic = "Basic",
  Allowance = "Allowance",
  Deduction = "Deduction",
  Gross = "Gross",
  Net = "Net",
  Contract = "Contract",
}

export enum PayrollCalculationType {
  Fixed = "Fixed",
  Percentage = "Percentage",
  Calculation = "Calculation",
  Tax = "Tax",
  Employee = "Employee",
}

export enum PayrollCalculationOption {
  Addition = "Addition",
  Subtraction = "Subtraction",
}

export interface SalaryComponentItem {
  salaryComponentId: string;
  childComponentId?: string;
  percentage: number;
}

export interface SalaryComponentResponse {
  id: string;
  tenantId: string;
  companyId: string;
  name: string;
  type: PayrollComponentType;
  calculationType: number | string | null;
  calculationOptions: number | string | null;
  appearsOnPayslip: boolean;
  amount: number | null;
  sequence: number;
  isTaxable: boolean;
  isActive: boolean;
  salaryComponents: SalaryComponentItem[];
}

export interface CreateSalaryComponentDto {
  name: string;
  type: PayrollComponentType | string;
  calculationType?: number | string | null;
  calculationOptions?: number | string | null;
  appearsOnPayslip: boolean;
  amount?: number | null;
  sequence?: number;
  isTaxable: boolean;
  salaryComponents?: SalaryComponentItem[];
}

export type UpdateSalaryComponentDto = Partial<CreateSalaryComponentDto>;

export interface SalaryStructureComponent {
  salaryComponentId: string;
  salaryComponentName: string;
  type: string;
  calculationType: number | null;
  calculationOptions: number | null;
  appearsOnPayslip: boolean;
  amount: number | null;
  sequence: number;
  isTaxable: boolean;
  isActive: boolean;
}

export interface EmployeeBenefit {
  id: string;
  name: string;
  tenantId: string;
  organizationId: string;
  createdOn: string;
  isActive: boolean;
}

export interface SalaryStructureResponse {
  id: string;
  name: string;
  description: string;
  tenantId?: string;
  organizationId?: string;
  createdOn: string;
  isActive?: boolean;
  salaryComponents: SalaryStructureComponent[] | null;
  employeeBenefits?: EmployeeBenefit[];
}

export interface CreateSalaryStructureDto {
  tenantId: string;
  organizationId: string;
  name: string;
  description: string;
  salaryComponentIds: string[];
  benefitIds: string[];
}

export type UpdateSalaryStructureDto = Partial<CreateSalaryStructureDto>;

export interface TaxBandResponse {
  id: string;
  tenantId: string;
  organizationId: string;
  minimumIncome: number;
  maximumIncome: number;
  taxRate: number;
}

export interface CreateTaxBandDto {
  tenantId: string;
  organizationId: string;
  minimumIncome: number;
  maximumIncome: number;
  taxRate: number;
}

export interface UpdateTaxBandDto {
  name?: string;
  lowerLimit?: number;
  upperLimit?: number;
  rate?: number;
}
