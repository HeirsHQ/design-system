import * as React from "react";

import { cn } from "../lib/utils.js";

/**
 * Table component props.
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

/**
 * A composable table component.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";

/**
 * Table header component props.
 */
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Container for table header rows.
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

/**
 * Table body component props.
 */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Container for table body rows.
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

/**
 * Table footer component props.
 */
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Container for table footer rows.
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

/**
 * Table row component props.
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

/**
 * A table row.
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)} {...props} />
));
TableRow.displayName = "TableRow";

/**
 * Table head component props.
 */
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

/**
 * A table header cell.
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * Table cell component props.
 */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

/**
 * A table data cell.
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)} {...props} />
));
TableCell.displayName = "TableCell";

/**
 * Table caption component props.
 */
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

/**
 * A table caption.
 */
const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
