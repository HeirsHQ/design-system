import type { PermissionAction, PermissionLevel, PermissionRule } from "@/types/user";

export interface PermissionSubject {
  roles: string[];
  employeeId?: string | null;
  unitId?: string | null;
  departmentId?: string | null;
  isTenantAdmin?: boolean;
}

export interface PermissionObject {
  module: string;
  entity: string;
  ownerId?: string | null;
  unitId?: string | null;
  departmentId?: string | null;
}

export interface PermissionRequirement {
  action: PermissionAction;
  on: PermissionObject;
}

export interface PermissionDecision {
  allowed: boolean;
  level: PermissionLevel | null;
  matchedRule?: PermissionRule;
}

const LEVEL_RANK: Record<PermissionLevel, number> = {
  own: 0,
  unit: 1,
  department: 2,
  organization: 3,
};

export function can(
  subject: PermissionSubject,
  action: PermissionAction,
  object: PermissionObject,
  rules: PermissionRule[],
): PermissionDecision {
  if (subject.isTenantAdmin) return { allowed: true, level: "organization" };

  const subjectRoles = new Set(subject.roles);
  const candidates = rules.filter(
    (r) =>
      subjectRoles.has(r.role) &&
      r.module === object.module &&
      r.entity === object.entity &&
      r.actions[action] === true,
  );
  if (candidates.length === 0) return { allowed: false, level: null };

  const widest = candidates.reduce((a, b) => (LEVEL_RANK[b.level] > LEVEL_RANK[a.level] ? b : a));

  const hasRowContext =
    object.ownerId !== undefined || object.unitId !== undefined || object.departmentId !== undefined;
  if (!hasRowContext) {
    return { allowed: true, level: widest.level, matchedRule: widest };
  }

  const ok = scopeMatches(widest.level, subject, object);
  return {
    allowed: ok,
    level: ok ? widest.level : null,
    matchedRule: ok ? widest : undefined,
  };
}

function scopeMatches(level: PermissionLevel, s: PermissionSubject, o: PermissionObject): boolean {
  switch (level) {
    case "organization":
      return true;
    case "department":
      return !!s.departmentId && s.departmentId === o.departmentId;
    case "unit":
      return !!s.unitId && s.unitId === o.unitId;
    case "own":
      return !!s.employeeId && s.employeeId === o.ownerId;
  }
}
