import { Employee } from "./employee";

export type LoanType = "personal" | "home" | "auto" | "business" | "student" | "payday";
export type LoanStatus = "approved" | "rejected" | "pending" | "disbursed" | "closed";
export type LoanApplicationStatus = "pending" | "approved" | "rejected" | "disbursed";
export type LoanRepaymentStatus = "pending" | "paid" | "overdue" | "partial";

export interface LoanDisbursement {
  id: string;
  date: Date;
  amount: number;
  method: string;
  reference: string;
}

export interface GradeLimit {
  id: string;
  name: string;
  enabled: boolean;
  maxAmount: string;
  maxAllowable: string;
}

export interface LoanTypeConfig {
  id: string;
  name: string;
  maxAmount: number;
  rate: number;
  maxTenor: number;
  calculatedAs: string;
  sourceOfFunds: string;
  description: string;
  grades: GradeLimit[];
  status: "active" | "inactive";
}

export interface Loan {
  id: string;
  employee: Employee;
  loanType: LoanType;
  amount: number;
  interestRate: number;
  tenor: number;
  status: LoanStatus;
  disbursed: boolean;
  startDate: Date;
  endDate: Date;
  disbursements: LoanDisbursement[];
}

export interface LoanApplication {
  id: string;
  employeeId: string;
  employee: Employee;
  loanType: LoanType;
  amount: number;
  tenor: number;
  purpose: string;
  interestRate: number;
  status: LoanApplicationStatus;
  appliedAt: Date;
  approvedAt: Date | null;
  startDate: Date;
  endDate: Date;
}

export interface CreateLoanApplicationDto {
  employeeId: string;
  loanType: LoanType | (string & {});
  amount: number;
  tenor: number;
  purpose: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface LoanRepayment {
  id: string;
  loanId: string;
  borrowerName: string;
  employeeId: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  paidDate: string | null;
  status: LoanRepaymentStatus;
}
