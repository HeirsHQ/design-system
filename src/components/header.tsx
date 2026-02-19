import * as React from "react";

import { cn } from "../lib/utils.js";

/**
 * Header component props.
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Whether the header sticks to the top on scroll.
   * @default false
   */
  sticky?: boolean;
}

/**
 * A composable header component for top-level navigation.
 *
 * @example
 * ```tsx
 * <Header sticky>
 *   <HeaderLogo>
 *     <img src="/logo.svg" alt="Logo" />
 *   </HeaderLogo>
 *   <HeaderNav>
 *     <a href="/dashboard">Dashboard</a>
 *     <a href="/settings">Settings</a>
 *   </HeaderNav>
 *   <HeaderActions>
 *     <Button size="sm">Sign out</Button>
 *   </HeaderActions>
 * </Header>
 * ```
 */
const Header = React.forwardRef<HTMLElement, HeaderProps>(({ className, sticky = false, ...props }, ref) => (
  <header
    ref={ref}
    className={cn("flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4", sticky && "sticky top-0 z-40", className)}
    {...props}
  />
));
Header.displayName = "Header";

/**
 * Header logo section props.
 */
export interface HeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Container for the logo/brand section of the header.
 */
const HeaderLogo = React.forwardRef<HTMLDivElement, HeaderLogoProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex shrink-0 items-center", className)} {...props} />
));
HeaderLogo.displayName = "HeaderLogo";

/**
 * Header navigation section props.
 */
export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Navigation area in the header, typically containing links.
 */
const HeaderNav = React.forwardRef<HTMLElement, HeaderNavProps>(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("hidden items-center gap-4 md:flex", className)} {...props} />
));
HeaderNav.displayName = "HeaderNav";

/**
 * Header actions section props.
 */
export interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Container for action items (buttons, avatars, etc.) on the right side of the header.
 */
const HeaderActions = React.forwardRef<HTMLDivElement, HeaderActionsProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
));
HeaderActions.displayName = "HeaderActions";

export { Header, HeaderLogo, HeaderNav, HeaderActions };
