export interface Branding {
  Id: string;
  Code: string;
  CompanyId: string;
  CompanyName: string;
  BrandName: string;
  LogoUrl: string;
  PrimaryColor: string;
  SecondaryColor: string;
  IsPrimary: boolean;
  Status: "Active" | "Inactive";
  CreatedAt: Date;
}

export interface CreateBrandingDto {
  CompanyId?: string;
  BrandName: string;
  LogoUrl: string;
  PrimaryColor: string;
  SecondaryColor: string;
  IsPrimary?: boolean;
}
