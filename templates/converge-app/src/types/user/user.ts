export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING";

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: "Admin" | "User";
  avatarUrl?: string | null;
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  surname: string;
  roles: string[];
  permissions: string[];
  status: UserStatus;
  lastLogin: Date;
  createdAt: Date;
  isTenantAdmin: boolean;
  isPlatformAdmin: boolean;
  requirePasswordReset: boolean;
  phone: string;
  employeeId: string | null;
  updatedAt: Date | null;
  tenantId: string;
  companyAccess: {
    companyId: string;
    companyName: string;
    roles: string[];
    permissions: string[];
  }[];
}

export interface CreateUserDto {
  email: string;
  isEmployee: boolean;
  name: string;
  phone: string;
  roles: string[];
  surname: string;
  requirePasswordReset?: boolean;
  employeeId?: string;
  staffId?: string;
}

export interface ListUserResponse {
  items: User[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
}

export interface Session {
  session_id: string;
  expires_at: string;
}
