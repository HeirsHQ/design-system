import * as React from "react";

import { cn } from "../lib/utils.js";
import { type ButtonProps, buttonVariants } from "./button.js";

/**
 * Pagination component props.
 */
export interface PaginationProps extends React.ComponentProps<"nav"> {}

/**
 * Root pagination component.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
);
Pagination.displayName = "Pagination";

/**
 * Pagination content component props.
 */
export interface PaginationContentProps extends React.ComponentProps<"ul"> {}

/**
 * Container for pagination items.
 */
const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

/**
 * Pagination item component props.
 */
export interface PaginationItemProps extends React.ComponentProps<"li"> {}

/**
 * Individual pagination item wrapper.
 */
const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

/**
 * Pagination link component props.
 */
export interface PaginationLinkProps extends Pick<ButtonProps, "size">, React.ComponentProps<"a"> {
  isActive?: boolean;
}

/**
 * Clickable pagination page link.
 */
const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default-outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/**
 * Pagination previous component props.
 */
export interface PaginationPreviousProps extends React.ComponentProps<typeof PaginationLink> {}

/**
 * Previous page navigation link.
 */
const PaginationPrevious = ({ className, ...props }: PaginationPreviousProps) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
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
      <path d="m15 18-6-6 6-6" />
    </svg>
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * Pagination next component props.
 */
export interface PaginationNextProps extends React.ComponentProps<typeof PaginationLink> {}

/**
 * Next page navigation link.
 */
const PaginationNext = ({ className, ...props }: PaginationNextProps) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/**
 * Pagination ellipsis component props.
 */
export interface PaginationEllipsisProps extends React.ComponentProps<"span"> {}

/**
 * Ellipsis indicator for skipped pages.
 */
const PaginationEllipsis = ({ className, ...props }: PaginationEllipsisProps) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
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
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis };
