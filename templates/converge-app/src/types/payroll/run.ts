export type PayrollStatus = "draft" | "pending" | "processed" | "failed";
export type PayrollFrequency = "monthly" | "bi-weekly" | "weekly";

export interface PayrollRun {
  id: string;
  payPeriod: string;
  frequency: PayrollFrequency;
  employeeCount: number;
  grossPay: number;
  netPay: number;
  status: PayrollStatus;
  processedAt: Date | null;
}

export interface PayrollSlip {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  payPeriod: string;
  grossPay: number;
  netPay: number;
  status: PayrollStatus;
  processedAt: Date | null;
}

export interface PayrollEmployee {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  joinDate: Date;
  status: string;
}

export interface RunPayrollFormValues {
  payrollMonth: string;
  employeeType: string[];
  paymentDate: string;
  specialInstructions: string;
}
