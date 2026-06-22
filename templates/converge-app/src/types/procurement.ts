import { Department } from "./organization";
import { Attachment } from "./ai-assistant";
import { Employee } from "./employee";

export type PurchaseOrderStatus = "draft" | "pending" | "issued" | "received" | "partially-received" | "cancelled";
export type ProcurementStatus = "draft" | "pending" | "approved" | "rejected" | "cancelled";
export type RFQStatus = "draft" | "published" | "closed" | "awarded";
export type VendorKind = "product" | "service";

export interface ProcurementItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  unitType: string;
  totalPrice: number;
}

export interface PurchaseRequest {
  id: string;
  title: string;
  description?: string;
  departmentId: string;
  department?: Department;
  requestedById: string;
  requestedBy?: Employee;
  items: ProcurementItem[];
  totalAmount: number;
  status: ProcurementStatus;
  priority: "low" | "medium" | "high" | "urgent";
  neededBy?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  purchaseRequestId: string | null;
  supplierId: string;
  supplier?: Supplier;
  items: ProcurementItem[];
  totalAmount: number;
  currency: string;
  status: PurchaseOrderStatus;
  terms?: string;
  notes?: string;
  expectedDeliveryDate: Date | null;
  actualDeliveryDate: Date | null;
  issuedAt: Date | null;
  receivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Supplier {
  id: string;
  code: string;
  businessName: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  primaryContactPosition?: string;
  address: {
    label?: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
  currency: string;
  website?: string | null;
  federalTin?: string;
  stateTin?: string;
  categoryId: string;
  category: VendorCategory;
  status: "active" | "inactive" | "pending" | "blacklisted";
  rating?: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Vendor extends Supplier {
  businessLogo: string | null;
  businessColor: string;
  kind: VendorKind;
  bankName?: string;
  accountNumber?: string;
  description?: string;
  rcNumber?: string;
  paymentTerms?: string;
}

export interface VendorCategory {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface RequestForQuote {
  id: string;
  rfqNumber: string;
  title: string;
  department: Department;
  description?: string;
  items: ProcurementItem[];
  deadline: Date;
  status: RFQStatus;
  suppliers: string[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePurchaseRequestDto {
  title: string;
  description?: string;
  departmentId: string;
  items: Omit<ProcurementItem, "id" | "totalPrice">[];
  priority: "low" | "medium" | "high" | "urgent";
  neededBy?: Date | string;
}

export interface CreatePurchaseOrderDto {
  purchaseRequestId?: string;
  supplierId: string;
  items: Omit<ProcurementItem, "id" | "totalPrice">[];
  currency: string;
  expectedDeliveryDate?: Date | string;
  terms?: string;
  notes?: string;
}

export interface CreateSupplierDto {
  businessName: string;
  businessLogo?: File | null;
  businessColor?: string;
  category: string;
  currency: string;
  federalTin?: string;
  stateTin?: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  primaryContactPosition?: string;
  address: {
    label?: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
  website?: string;
  description?: string;
}

export interface CreateVendorDto extends CreateSupplierDto {
  kind: VendorKind | (string & {});
  bankName?: string;
  accountNumber?: string;
  rcNumber?: string;
  paymentTerms?: string;
}

export interface CreateRFQDto {
  title: string;
  departmentId: string;
  description?: string;
  items: Omit<ProcurementItem, "id" | "totalPrice">[];
  deadline: Date | undefined;
  suppliers: string[];
  attachments: File[];
}
