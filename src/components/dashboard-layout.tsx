import * as React from "react";

import { cn } from "../lib/utils.js";

/**
 * Dashboard layout component props.
 */
export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The sidebar element, rendered on the left side of the layout.
   */
  sidebar?: React.ReactNode;
  /**
   * The header element, rendered at the top of the main content area.
   */
  header?: React.ReactNode;
}

/**
 * A composable dashboard layout with sidebar and header slots.
 * Provides a standard application shell with sidebar navigation,
 * top header, and a scrollable main content area.
 *
 * @example
 * ```tsx
 * <DashboardLayout
 *   sidebar={
 *     <Sidebar>
 *       <SidebarHeader>Logo</SidebarHeader>
 *       <SidebarContent>
 *         <SidebarItem active>Home</SidebarItem>
 *       </SidebarContent>
 *     </Sidebar>
 *   }
 *   header={
 *     <Header sticky>
 *       <HeaderLogo>App</HeaderLogo>
 *       <HeaderActions>
 *         <Button size="sm">Logout</Button>
 *       </HeaderActions>
 *     </Header>
 *   }
 * >
 *   <div className="p-6">Page content</div>
 * </DashboardLayout>
 * ```
 */
const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(({ className, sidebar, header, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-screen overflow-hidden bg-gray-50", className)} {...props}>
    {sidebar}
    <div className="flex flex-1 flex-col overflow-hidden">
      {header}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  </div>
));
DashboardLayout.displayName = "DashboardLayout";

export { DashboardLayout };
