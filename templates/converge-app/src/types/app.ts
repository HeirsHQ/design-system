export type Maybe<T> = T | null;

export type Undefined<T> = T | undefined;

export type Nullable<T> = T | null | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;

export type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

export type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface HttpResponse<T> {
  data: T;
  message: string;
  responseCode: string;
  statusCode: number;
  success: boolean;
}

export interface HttpResponse<T> {
  Data: T;
  Message: string;
  StatusCode: number;
  Success: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginationResponse<T> extends Pagination {
  data: T[];
}

export interface HttpError {
  error: string;
  message: string;
  status: number;
  success: boolean;
}
