export interface TaxBracket {
  minIncome: number;
  maxIncome: number;
  rate: number;
}

export interface TaxCategory {
  id: string;
  name: string;
  effectiveDate: Date;
  description: string;
  taxBrackets: TaxBracket[];
  status: "active" | "inactive";
  createdAt: string;
}

export interface CreateTaxSlabDto {
  name: string;
  effectiveDate: Date | undefined;
  description?: string;
  taxBrackets: TaxBracket[];
}
