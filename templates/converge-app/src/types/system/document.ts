export type DocumentStatus = "active" | "archived" | "draft";
export type DocumentType = "contract" | "policy" | "report" | "invoice" | "certificate" | "form" | "letter" | "other";

export interface Documents {
  id: string;
  name: string;
  description?: string;
  type: DocumentType;
  module: string;
  url: string;
  mimeType: string;
  size: number;
  tags?: string[];
  status: DocumentStatus;
  uploadedById: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateDocumentDto {
  name: string;
  description?: string;
  type: DocumentType;
  module: string;
  url: string;
  mimeType: string;
  size: number;
  tags?: string[];
}
