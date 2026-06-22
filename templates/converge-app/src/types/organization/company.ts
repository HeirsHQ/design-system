export interface Company {
  Id: string;
  Code: string;
  BusinessName: string;
  Description: string;
  LegalCompanyName: string;
  RegistrationNo: string;
  TradingName: string;
  TaxIdVatNo: string;
  Size: string;
  Email: string;
  Website: string;
  Phone: string;
  Address: string;
  Status: "Active" | "Inactive";
  BranchCount: number;
  BrandingCount: number;
  GroupCount: number;
  CreatedAt: Date;
}
