"use client";

import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { ADMIN_ROUTES, type RouteConfig } from "@/config/route";
import { Popover, PopoverContent, PopoverTrigger } from "@heirshq/design-system";
import { GoogleIcon, MicrosoftIcon, SlackIcon } from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@heirshq/design-system";
import { type UserRole, cn, getInitials, normalize } from "@/lib";
import { useAppContext } from "../providers";
import { useUserStore } from "@/store/core";
import { ScrollArea } from "@heirshq/design-system";
import { useDebounce } from "@/hooks";
import { Button } from "@heirshq/design-system";
import { SignOut } from "./sign-out";
import { Input } from "@heirshq/design-system";

interface Props {
  role: UserRole;
}

/**
 * Returns the route set for a given user role.
 * - tenant-admin    → ADMIN_ROUTES   (manages their tenant)
 * - regular-user    → ADMIN_ROUTES (scaffold is admin-only)
 *
 * @param role - The authenticated user's role
 */
const getRoutes = (role: UserRole) => {
  switch (role) {
    case "tenant-admin":
      return ADMIN_ROUTES;
    case "regular-user":
      return ADMIN_ROUTES;
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const slideTransition: Transition = { duration: 0.22, ease: "easeInOut" };

/**
 * Collapsible application sidebar with role-based navigation, search,
 * and a Vercel-style drill-down for grouped routes.
 *
 * @example
 * ```tsx
 * <Sidebar role="tenant-admin" />
 * ```
 */
export const Sidebar = ({ role }: Props) => {
  const { company, companyId, isCollapsed, setCompanyId } = useAppContext();
  const { user } = useUserStore();
  const pathname = usePathname();
  const { theme } = useTheme();
  const router = useRouter();

  const name = user ? `${user.firstName} ${user.lastName}`.trim() : "";
  const companies = user?.companyAccess || [];
  const isRegularUser = role === "regular-user";
  const image = isCollapsed
    ? "/assets/images/converge-icon.svg"
    : theme === "dark"
      ? "/assets/images/converge-dark.png"
      : "/assets/images/converge-light.png";

  const ROUTES = useMemo(() => getRoutes(role), [role]);

  const [drillRoute, setDrillRoute] = useState<RouteConfig | null>(() => {
    const normalizedPath = normalize(pathname);
    for (const group of ROUTES) {
      for (const route of group.routes) {
        if (route.children?.length && normalizedPath.startsWith(route.href)) {
          return route;
        }
      }
    }
    return null;
  });
  const [navDirection, setNavDirection] = useState<1 | -1>(1);
  const [query, setQuery] = useState("");
  const [prevIsCollapsed, setPrevIsCollapsed] = useState(isCollapsed);

  if (prevIsCollapsed !== isCollapsed) {
    setPrevIsCollapsed(isCollapsed);
    if (isCollapsed) setDrillRoute(null);
  }

  const q = useDebounce(query, 300);

  const handleDrillIn = useCallback(
    (route: RouteConfig) => {
      if (!route.children?.length || isCollapsed) {
        router.push(route.href);
        return;
      }
      setNavDirection(1);
      setDrillRoute(route);
    },
    [router, isCollapsed],
  );

  const handleDrillBack = useCallback(() => {
    setNavDirection(-1);
    setDrillRoute(null);
  }, []);

  const filteredRoutes = useMemo(() => {
    if (!q.trim()) return null;
    const lq = q.toLowerCase();
    const results: RouteConfig[] = [];
    const seen = new Set<string>();

    for (const { routes } of ROUTES) {
      for (const route of routes) {
        if (route.label.toLowerCase().includes(lq)) {
          if (!seen.has(route.href)) {
            seen.add(route.href);
            results.push(route);
          }
          continue;
        }
        if (route.children) {
          for (const group of route.children) {
            if (group.group.toLowerCase().includes(lq)) {
              if (!seen.has(route.href)) {
                seen.add(route.href);
                results.push(route);
              }
            }
            for (const child of group.routes) {
              if (child.label.toLowerCase().includes(lq) && !seen.has(child.href)) {
                seen.add(child.href);
                results.push(child);
              }
            }
          }
        }
      }
    }

    return results;
  }, [ROUTES, q]);

  const showDrill = !isCollapsed && !!drillRoute;

  return (
    <div className="relative z-30 flex h-full shrink-0">
      <motion.div
        animate={{ width: isCollapsed ? 56 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-layout-background flex h-full flex-col overflow-hidden border-r"
      >
        <div
          className={cn("flex h-14 w-full shrink-0 items-center border-b px-3 py-2", isCollapsed && "justify-center")}
        >
          {isCollapsed ? (
            <div className="relative aspect-square w-6 rounded-full">
              <Image alt="converge" fill loading="eager" priority sizes="100%" src={image} />
            </div>
          ) : (
            <div className="relative aspect-[4.7/1] w-30">
              <Image alt="converge" fill loading="eager" priority sizes="100%" src={image} />
            </div>
          )}
        </div>
        {company && !isCollapsed && (
          <div className="border-b px-2 py-1">
            {companies.length > 1 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-muted/60 group flex w-full items-center gap-x-2 rounded-md px-1.5 text-left transition-colors">
                    <Avatar className="size-7 shrink-0 rounded">
                      <AvatarFallback className="bg-primary-500 rounded text-[10px] font-semibold text-white">
                        {getInitials(company.BusinessName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs leading-tight font-medium">{company.BusinessName}</p>
                      <p className="text-muted-foreground truncate text-[10px] leading-tight">
                        {company.Website?.toLowerCase()}
                      </p>
                    </div>
                    <ChevronsUpDown className="text-muted-foreground group-hover:text-foreground size-3.5 shrink-0 transition-colors" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" sideOffset={6} className="w-61 p-1">
                  <p className="text-muted-foreground px-2 py-1.5 text-[10px] font-medium tracking-wider uppercase">
                    Workspaces
                  </p>
                  <div className="space-y-0.5">
                    {companies.map((c) => {
                      const isActive = c.companyId === companyId;
                      return (
                        <button
                          key={c.companyId}
                          onClick={() => setCompanyId(c.companyId)}
                          className={cn(
                            "hover:bg-muted flex w-full items-center gap-x-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                            isActive && "bg-muted/70",
                          )}
                        >
                          <Avatar className="size-6 shrink-0 rounded">
                            <AvatarFallback className="bg-primary-500/90 rounded text-[9px] font-semibold text-white">
                              {getInitials(c.companyName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="min-w-0 flex-1 truncate font-medium">{c.companyName}</span>
                          {isActive && <Check className="text-primary-500 size-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex w-full items-center gap-x-2 p-1.5">
                <Avatar className="size-7 shrink-0 rounded">
                  <AvatarFallback className="bg-primary-500 rounded text-[10px] font-semibold text-white">
                    {getInitials(company.BusinessName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm leading-tight font-medium">{company.BusinessName}</p>
                  <p className="text-muted-foreground truncate text-xs leading-tight">
                    {company.Website?.toLowerCase()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {isRegularUser && (
          <div className="flex flex-col items-center gap-y-2 py-6">
            <Avatar className={cn("bg-muted dark:bg-neutral-600", isCollapsed ? "size-8" : "size-20")}>
              <AvatarImage />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="text-center">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs">{user?.email}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Button size="icon" variant="outline">
                    <MicrosoftIcon className="size-4.5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <GoogleIcon className="size-4.5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <SlackIcon className="size-4.5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence custom={navDirection} initial={false} mode="wait">
            {showDrill ? (
              <motion.div
                key={drillRoute!.href}
                custom={navDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="absolute inset-0 flex flex-col"
              >
                <div className="flex shrink-0 items-center border-b px-3 py-2.5">
                  <button
                    onClick={handleDrillBack}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-x-1 text-sm font-medium transition-colors"
                  >
                    <ChevronLeft className="size-4" />
                    All modules
                  </button>
                </div>
                <div className="shrink-0 px-4 py-3">
                  <p className="text-sm font-semibold">{drillRoute!.label}</p>
                  {drillRoute!.description && (
                    <p className="text-muted-foreground text-xs">{drillRoute!.description}</p>
                  )}
                </div>
                <ScrollArea className="flex-1">
                  <div className="space-y-4 px-2 pb-4">
                    <Link
                      href={drillRoute!.href}
                      className={cn(
                        "flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                        pathname === drillRoute!.href
                          ? "bg-primary-500 text-white"
                          : "text-sidebar-foreground hover:bg-gray-200 dark:hover:text-black",
                      )}
                    >
                      Overview
                    </Link>
                    {drillRoute!.children?.map((group) => (
                      <div key={group.group} className="space-y-0.5">
                        <p className="text-muted-foreground px-2 pb-1 text-[10px] tracking-wider uppercase">
                          {group.group}
                        </p>
                        {group.routes.map((route) => {
                          const disabled = group.disabled || !!route.disabled;
                          const isCurrentPath = pathname === route.href || pathname.startsWith(route.href + "/");
                          return (
                            <Link
                              key={route.href}
                              href={disabled ? "#" : route.href}
                              className={cn(
                                "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                                disabled
                                  ? "text-muted-foreground/50 pointer-events-none cursor-not-allowed"
                                  : isCurrentPath
                                    ? "bg-primary-500 text-white"
                                    : "text-sidebar-foreground hover:bg-gray-200 dark:hover:text-black",
                              )}
                            >
                              {route.label}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </motion.div>
            ) : (
              <motion.div
                key="main-nav"
                custom={navDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="absolute inset-0 flex flex-col"
              >
                <ScrollArea className="h-full w-full">
                  <div className="space-y-2 py-2">
                    {!isCollapsed && (
                      <div className="px-2">
                        <Input onChange={(e) => setQuery(e.target.value)} placeholder="Search..." value={query} />
                      </div>
                    )}
                    {!isCollapsed && filteredRoutes ? (
                      <div className="space-y-0.5 px-2">
                        {filteredRoutes.length === 0 && (
                          <p className="text-muted-foreground p-2 text-center text-xs">No results found</p>
                        )}
                        {filteredRoutes.map((route) => {
                          const disabled = !!route.disabled;
                          const hasChildren = (route.children?.length || 0) > 0;
                          const isCurrentPath = normalize(pathname) === route.href;
                          return (
                            <button
                              key={route.label}
                              className={cn(
                                "flex w-full items-center justify-between gap-x-2 rounded-md p-2 text-left",
                                disabled
                                  ? "text-muted-foreground/50 cursor-not-allowed"
                                  : isCurrentPath
                                    ? "bg-primary-500 text-white"
                                    : "text-sidebar-foreground hover:bg-gray-200 dark:hover:text-black",
                              )}
                              onClick={() => !disabled && handleDrillIn(route)}
                              disabled={disabled}
                            >
                              <div className="flex items-center gap-x-2 text-sm font-medium">
                                {route.icon && <route.icon className="size-4" />}
                                {route.label}
                              </div>
                              {hasChildren && <ChevronRight className="size-4 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className={cn("space-y-1", isCollapsed && "space-y-0")}>
                        {ROUTES.map((topGroup) => {
                          const groupDisabled = !!topGroup.disabled;
                          return (
                            <div className={cn("px-2", isCollapsed && "px-1.5")} key={topGroup.group}>
                              {!isCollapsed && (
                                <p className="text-muted-foreground p-2 text-[10px] tracking-wider uppercase">
                                  {topGroup.group}
                                </p>
                              )}
                              <div className="space-y-1">
                                {topGroup.routes.map((route) => {
                                  const disabled = groupDisabled || !!route.disabled;
                                  const hasChildren = (route.children?.length || 0) > 0;
                                  const isCurrentPath = normalize(pathname) === route.href;
                                  const tooltip = isCollapsed ? route.label : undefined;
                                  return (
                                    <button
                                      key={route.label}
                                      className={cn(
                                        "flex w-full items-center rounded-md",
                                        isCollapsed
                                          ? "aspect-square w-10 shrink-0 justify-center"
                                          : "justify-between gap-x-2 p-2",
                                        disabled
                                          ? "text-muted-foreground/50 cursor-not-allowed"
                                          : isCurrentPath
                                            ? "bg-primary-500 text-white"
                                            : "text-sidebar-foreground hover:bg-gray-200 dark:hover:text-black",
                                      )}
                                      onClick={() => !disabled && handleDrillIn(route)}
                                      title={tooltip}
                                      disabled={disabled}
                                    >
                                      {isCollapsed ? (
                                        route.icon ? (
                                          <route.icon className="size-5" />
                                        ) : (
                                          <span className="text-xs font-bold">{route.label[0]}</span>
                                        )
                                      ) : (
                                        <>
                                          <div className="flex items-center gap-x-2 text-sm font-medium">
                                            {route.icon && <route.icon className="size-4" />}
                                            {route.label}
                                          </div>
                                          {hasChildren && <ChevronRight className="size-4 shrink-0" />}
                                        </>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex h-14 w-full shrink-0 items-center justify-between border-t p-2">
          <SignOut isCollapsed={isCollapsed} role={role} user={user} />
        </div>
      </motion.div>
    </div>
  );
};
