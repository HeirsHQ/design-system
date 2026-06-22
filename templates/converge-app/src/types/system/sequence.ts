export type SequenceStatus = "active" | "inactive" | "draft" | "in-review";

export interface Sequence {
  id: string;
  name: string;
  code: string;
  module: string;
  scope: string;
  prefix: string;
  suffix: string;
  size: number;
  next: number;
  increment: number;
  preview: string;
  status: SequenceStatus;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateSequenceDto {
  name: string;
  code: string;
  module: string;
  scope: string;
  prefix: string;
  size: number;
  increment: number;
  suffix?: string;
  next?: number;
}
