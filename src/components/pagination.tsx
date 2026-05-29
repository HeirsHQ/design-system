import { HtChevronLeftOutline, HtChevronRightOutline, HtChevronsLeftOutline, HtChevronsRightOutline } from "../icons/index.js";
import { Button } from "./button.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select.js";

interface Props {
  /** Current 1-based page number */
  page: number;
  /** Number of rows per page */
  pageSize: number;
  /** Total number of rows across all pages */
  total: number;
  /** Called with the new 1-based page number */
  onPageChange?: (page: number) => void;
  /** Called when the user changes the page size */
  onPageSizeChange?: (pageSize: number) => void;
  /** Show the rows-per-page selector (default: false) */
  showPageSizeChange?: boolean;
}

/**
 * Pagination controls with first/prev/next/last buttons, page info,
 * and an optional rows-per-page selector.
 *
 * @example
 * ```tsx
 * <Pagination page={page} pageSize={10} total={100} onPageChange={setPage} />
 * ```
 */
const ROWS_PER_PAGE = ["10", "15", "20", "25", "30"];

export const Pagination = ({ onPageChange, page, pageSize, total, onPageSizeChange, showPageSizeChange = false }: Props) => {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;

  return (
    <div className="flex h-13 w-full items-center justify-between px-4 text-sm">
      <p className="text-gray-500 dark:text-gray-400">
        {start}-{end} of {total} rows
      </p>
      <div className="flex items-center gap-x-8">
        {showPageSizeChange && (
          <div className="flex items-center gap-x-3">
            <p className="text-gray-500 dark:text-gray-400">Rows per page</p>
            <Select onValueChange={(value) => onPageSizeChange?.(Number(value))} value={pageSize.toString()}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROWS_PER_PAGE.map((row) => (
                  <SelectItem key={row} value={row}>
                    {row}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center gap-x-4">
          <p className="text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-x-1">
            <Button variant="outline" size="icon-sm" onClick={() => onPageChange?.(1)} disabled={!canPreviousPage}>
              <HtChevronsLeftOutline className="size-4" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => onPageChange?.(page - 1)} disabled={!canPreviousPage}>
              <HtChevronLeftOutline className="size-4" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => onPageChange?.(page + 1)} disabled={!canNextPage}>
              <HtChevronRightOutline className="size-4" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={() => onPageChange?.(totalPages)} disabled={!canNextPage}>
              <HtChevronsRightOutline className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
