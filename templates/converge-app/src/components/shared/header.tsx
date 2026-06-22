"use client";

import { LayoutGrid, Moon, PanelLeft, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useMemo } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@heirshq/design-system";
import { Notifications } from "./notifications";
import { CONVERGE_APPS } from "@/config/route";
import { useAppContext } from "../providers";
import { buildBreadcrumbs, cn } from "@/lib";
import { Breadcrumb } from "@heirshq/design-system";
import { Button } from "@heirshq/design-system";
import { Input } from "@heirshq/design-system";

/**
 * Top application header with sidebar toggle, breadcrumb navigation,
 * global search input, notification bell, and theme switcher.
 */
export const Header = () => {
  const { isCollapsed, setIsCollapsed } = useAppContext();
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => buildBreadcrumbs(pathname), [pathname]);
  const isInEss = useMemo(() => pathname.startsWith("/ess"), [pathname]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-layout-background flex h-14 w-full items-center justify-between border-b px-6">
      <div className="flex items-center gap-x-4">
        <button className="h-7 w-11 border-r" onClick={() => setIsCollapsed(!isCollapsed)}>
          <PanelLeft className={cn("size-4 transition-all duration-300", isCollapsed && "rotate-180")} />
        </button>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex items-center gap-x-4">
        <Input className="w-75" placeholder="Search Converge..." />
        <Notifications />
        <Button onClick={toggleTheme} size="icon" variant="outline">
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        {!isInEss && (
          <Popover>
            <PopoverTrigger>
              <Button size="icon" variant="outline">
                <LayoutGrid className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w grid max-h-75 w-75 grid-cols-3 gap-4 overflow-y-auto">
              {CONVERGE_APPS.map((app) => {
                if (app.disabled || !app.href) {
                  return (
                    <span
                      aria-disabled="true"
                      className="text-muted-foreground/50 grid aspect-square cursor-not-allowed place-items-center text-center"
                      key={app.label}
                    >
                      <app.icon className="size-5" />
                      <span className="text-xs">{app.label}</span>
                    </span>
                  );
                }
                return (
                  <a
                    className="hover:bg-muted grid aspect-square place-items-center text-center"
                    href={`${app.href}?token=TOKEN&user=USER&scope=SCOPE`}
                    key={app.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <app.icon className="size-5" />
                    <span className="text-xs">{app.label}</span>
                  </a>
                );
              })}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};
