export const identityKeys = {
  all: ["identity"] as const,
  users: (params?: object) => ["identity", "users", params] as const,
  user: (id: string) => ["identity", "users", id] as const,
  rolesLookup: (params?: object) => ["identity", "roles", "lookup", params] as const,
  rolePermissions: (id: string) => ["identity", "roles", id, "permissions"] as const,
};
