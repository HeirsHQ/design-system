import { ADMIN_ROUTES, USER_ROUTES, type RouteGroup } from "@/config/route";

function buildLabelMap(groups: RouteGroup[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const group of groups) {
    for (const route of group.routes) {
      map[route.href] = route.label;
      if (route.children) {
        for (const child of route.children) {
          for (const r of child.routes) {
            map[r.href] = r.label;
          }
        }
      }
    }
  }
  return map;
}

const ROUTE_LABEL_MAP: Record<string, string> = {
  ...buildLabelMap(ADMIN_ROUTES),
  ...buildLabelMap(USER_ROUTES),
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ID_RE = /^[0-9a-f]{16,}$|^\d+$|^[0-9a-f-]{20,}$/i;

function isIdSegment(segment: string): boolean {
  return UUID_RE.test(segment) || ID_RE.test(segment);
}

function formatSegment(segment: string): string {
  return segment.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface BreadcrumbEntry {
  label: string;
  href: string;
}

export function buildBreadcrumbs(pathname: string): BreadcrumbEntry[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const items: BreadcrumbEntry[] = [];
  let href = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    href += `/${segment}`;

    if (isIdSegment(segment)) {
      const parent = segments[i - 1];
      const singular = parent ? parent.replace(/s$/, "") : "item";
      items.push({ label: `${formatSegment(singular)} Details`, href });
    } else if (ROUTE_LABEL_MAP[href] === undefined && i === 0) {
      // base prefix segment (e.g. /admin) — skip
      continue;
    } else {
      const label = ROUTE_LABEL_MAP[href] ?? formatSegment(segment);
      items.push({ label, href });
    }
  }

  return items;
}
