export type PermissionAction =
  | "select"
  | "read"
  | "write"
  | "create"
  | "delete"
  | "submit"
  | "cancel"
  | "amend"
  | "print"
  | "email"
  | "report"
  | "import"
  | "export"
  | "share"
  | "setUserPermissions";

export type PermissionLevel = "own" | "unit" | "department" | "organization";

export interface PermissionRule {
  id: string;
  module: string;
  entity: string;
  resource: string;
  role: string;
  level: PermissionLevel;
  actions: Record<PermissionAction, boolean>;
}

export interface Permission {
  id: string;
  module: string;
  resource: string;
  action: PermissionAction;
  description?: string;
}

export interface PermissionInput {
  entity: string;
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
  export: boolean;
  print: boolean;
  import: boolean;
  email: boolean;
}

export interface EntityPermission {
  module: string;
  permissions: EntityPermissionInput[];
}

export interface EntityPermissionInput {
  id: string;
  description: string;
  name: string;
}
