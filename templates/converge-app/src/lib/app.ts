import { ADMIN_ROUTES, RouteGroup } from "@/config/route";

export const getPreferredRoutes = (config: string[]): RouteGroup[] => {
  if (!config.length) return ADMIN_ROUTES;
  if (config.some((route) => route === "*")) return ADMIN_ROUTES;
  return ADMIN_ROUTES.map((group) => ({
    ...group,
    routes: group.routes.filter((route) => config.includes(route.label)),
  })).filter((group) => group.routes.length > 0);
};
