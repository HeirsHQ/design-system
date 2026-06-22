import { Company } from "./organization";
import { User } from "./user";

export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";
export type CurrencyStatus = "active" | "draft" | "inactive";
export type LedgerType = "parent" | "leaf";

export interface Ledger {
  id: string;
  name: string;
  code: string;
  currency: string;
  balance: number;
  accountType: AccountType;
  ledgerType: LedgerType;
  parentLedgerId?: string;
  leafLedgers?: Ledger[];
  createdAt: Date;
  updatedAt: Date;
}

export type FiscalYearStatus = "active" | "closed" | "draft";

export interface FiscalYear {
  id: string;
  company: Company;
  name: string;
  startDate: Date;
  endDate: Date;
  status: FiscalYearStatus;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLedgerDto {
  name: string;
  code: string;
  currency: string;
  accountType: AccountType | (string & {});
  ledgerType: LedgerType | (string & {});
  parentLedgerId?: string;
}

export interface CreateFiscalYearDto {
  companyId: string;
  name: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: FiscalYearStatus;
}

export interface Bank {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  swiftCode: string;
  branchAddress: string;
  enableAutoSync: boolean;
  enableAutoReconcilation: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateBankDto {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  swiftCode: string;
  branchAddress: string;
  enableAutoSync: boolean;
  enableAutoReconcilation: boolean;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  published: boolean;
  status: CurrencyStatus;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: User;
  updatedBy: User | null;
}

export interface Forex {
  id: string;
  baseCurrency: Currency;
  quoteCurrency: Currency;
  buyRate: number;
  sellRate: number;
  spread: number;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateForexDto {
  baseCurrency: Currency;
  quoteCurrency: Currency;
  buyRate: number;
  sellRate: number;
  spread: number;
}

export interface CostCenter {
  id: string;
  name: string;
  code: string;
  description: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCostCenterDto {
  name: string;
  code: string;
  description: string;
}
