import type { PermissionInput } from "@/types/user/permission";

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  userCount: number;
  permissionCount: number;
  status: "active" | "inactive";
  createdBy: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface RoleProfile {
  id: string;
  name: string;
  description?: string;
  roleCount: number;
  userCount: number;
  createdAt: Date;
}

export interface CreateRoleDto {
  name: string;
  description: string;
  featurePermissions: string[];
  entityPermissions: PermissionInput[];
}
