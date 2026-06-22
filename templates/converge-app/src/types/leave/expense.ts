export type ExpenseClaimStatus = "pending" | "approved" | "rejected" | "reimbursed";

export type ExpenseCategory =
  | "travel"
  | "meals"
  | "accommodation"
  | "office-supplies"
  | "training"
  | "medical"
  | "other";

export interface ExpenseClaim {
  id: string;
  employeeName: string;
  employeeId: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  currency: string;
  status: ExpenseClaimStatus;
  approvedBy?: string;
  approvedAmount?: number;
  createdAt: string;
}
