import { Department } from "./organization";

export type BudgetStatus = "approved" | "draft" | "pending" | "rejected";

export interface Budget {
  approved: number;
  balance: number;
  department: Department;
  effective: number;
  extraBudget: number;
  id: string;
  pending: number;
  spent: number;
  utilization: number;
  status: BudgetStatus;
  year: string;
  createdAt: Date;
  approvedAt: Date;
  title: string;
  lineItems: BudgetItem[];
}

export interface BudgetProposal {
  createdAt: Date;
  department: Department;
  id: string;
  lineItems: BudgetItem[];
  status: string;
  title: string;
  totalAmount: number;
  year: string;
}

export interface BudgetItem {
  id: string;
  costCenter: string;
  description: string;
  name: string;
  quantity: number;
  type: string;
  unitPrice: number;
  breakdown: BudgetItemRow[];
}

export interface BudgetItemRow {
  month: number; // 1–12
  amount: number;
}

export type ExpenseStatus = "approved" | "draft" | "pending" | "rejected";
export type ExpenseType = "opex" | "service" | "capex" | "travel" | "training" | "marketing" | "it" | "office" | "misc";

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: ExpenseType;
  budgetId: string;
  budget: Pick<Budget, "id" | "title" | "year">;
  budgetItem: Pick<BudgetItem, "name" | "costCenter">;
  department: Department;
  category: string;
  receiptUrl: string | null;
  submittedBy: string;
  submittedAt: Date;
  approvedBy: string | null;
  approvedAt: Date | null;
  status: ExpenseStatus;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExpenseDto {
  amount: number;
  budgetId: string;
  budgetItemName: string;
  category: string;
  date: Date | string;
  departmentId: string;
  description: string;
  title: string;
  year: string;
  receiptUrl?: string;
}

export interface CreateBudgetDto {
  amount: number;
  category: string;
  department: string;
  description: string;
  period: string;
}

export interface CreateBudgetItem {
  costCenter: string;
  description: string;
  name: string;
  quantity: number;
  type: string;
  unitPrice: number;
}

export interface CreateBudgetProposal {
  department: string;
  currency: string;
  description: string;
  lineItems: CreateBudgetItem[];
  title: string;
  year: string;
}

export interface ExtraBudget {
  id: string;
  department: Department;
  year: string;
  reason: string;
  requestedAmount: number;
  approvedAmount: number | null;
  status: BudgetStatus;
  requestedAt: Date;
  approvedAt: Date | null;
  approvedBy: string | null;
  budgetId: string;
}

export interface CreateExtraBudgetDto {
  department: string;
  year: string;
  reason: string;
  requestedAmount: number;
}

export interface TransferFundsDto {
  budgetYear: string;
  sourceDepartment: string;
  sourceLineItem: string;
  destinationDepartment: string;
  destinationLineItem: string;
  pendingRequestId?: string;
  amount: number;
  reason: string;
}

export interface BudgetType {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

export interface BudgetProject {
  id: string;
  code: string;
  name: string;
  department: string;
  status: "active" | "on-hold" | "inactive";
  startDate: string;
  endDate: string | null;
}

export interface ApprovalLimit {
  role: string;
  maxAmount: number | null;
  description: string;
}

export interface ApprovalFlow {
  color: string;
  label: string;
}
