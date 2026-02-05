import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../lib/utils.js";

/**
 * Breadcrumb component props.
 */
export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
}

/**
 * Root breadcrumb navigation component.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

/**
 * Breadcrumb list component props.
 */
export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {}

/**
 * Container for breadcrumb items.
 */
const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("flex flex-wrap items-center gap-1.5 text-sm break-words text-gray-500 sm:gap-2.5", className)} {...props} />
));
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Breadcrumb item component props.
 */
export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {}

/**
 * Individual breadcrumb item wrapper.
 */
const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Breadcrumb link component props.
 */
export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

/**
 * Clickable breadcrumb link.
 */
const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-gray-900", className)} {...(props as object)} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * Breadcrumb page component props.
 */
export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {}

/**
 * Current page indicator (non-clickable).
 */
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(({ className, ...props }, ref) => (
  <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn("font-normal text-gray-900", className)} {...props} />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * Breadcrumb separator component props.
 */
export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"li"> {}

/**
 * Visual separator between breadcrumb items.
 */
const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)} {...props}>
    {children ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * Breadcrumb ellipsis component props.
 */
export interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<"span"> {}

/**
 * Ellipsis indicator for collapsed breadcrumb items.
 */
const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <span role="presentation" aria-hidden="true" className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
