export type IsolationMode = "Dedicated" | "Shared";
export type TenantStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface Tenant {
  id: string;
  code: string;
  correlationId: string;
  tenantName: string;
  email: string;
  domain: string;
  domainSuffix: string;
  phoneNumber: string;
  address: string;
  currency: string;
  dateCreated: Date;
  subscriptionPlan: string;
  isolationMode: IsolationMode;
  status: TenantStatus;
  organizationName: "Heirs Insurance";
}

export interface TenantListResponse {
  items: Tenant[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
