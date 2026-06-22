export type SalaryComponentType = "earning" | "deduction" | "contribution";
export type SalaryCalculationType = "fixed" | "percentage" | "formula";

export interface SalaryComponent {
  id: string;
  name: string;
  type: SalaryComponentType;
  calculationType: SalaryCalculationType;
  amount: number;
  sequence: number;
  appearOnPayslip: boolean;
  status: "active" | "inactive";
  createdAt: string;
}
