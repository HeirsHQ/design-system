export type DataImportStatus = "pending" | "processing" | "completed" | "failed";

export interface DataImport {
  id: string;
  name: string;
  entity: string;
  totalRecords: number;
  failedRecords: number;
  status: DataImportStatus;
  createdBy: string;
  createdAt: Date;
}

export interface CreateDataImportDto {
  name: string;
  entity: string;
  file: File | null;
}
