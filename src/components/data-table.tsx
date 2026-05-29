import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Download, ListFilter, Search, Upload } from "lucide-react";
import type { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { RadioGroup, RadioGroupItem } from "./radio-group.js";
import { useDebouncedCallback } from "../hooks/use-debounce.js";
import type { DateRange } from "./calendar.js";
import { DatePicker } from "./date-picker.js";
import { Pagination } from "./pagination.js";
import { Checkbox } from "./checkbox.js";
import { Button } from "./button.js";
import { Loader } from "./loader.js";
import { Input } from "./input.js";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type ChoiceFilter<TData> = {
  key: keyof TData & string;
  label: string;
  type?: "radio" | "checkbox" | "select";
  options: Option[];
  placeholder?: string;
};

type DateFilter<TData> = {
  key: keyof TData & string;
  label: string;
  type: "date";
  placeholder?: string;
};

type DateRangeFilter<TData> = {
  key: keyof TData & string;
  label: string;
  type: "date-range";
  placeholderFrom?: string;
  placeholderTo?: string;
};

type Filter<TData> = ChoiceFilter<TData> | DateFilter<TData> | DateRangeFilter<TData>;

interface BulkAction<T> {
  label: string;
  onClick: (data: T[]) => void;
  icon?: LucideIcon;
}

interface ToolbarConfig {
  search?: { placeholder?: string; component?: ReactNode };
  filter?: { component?: ReactNode };
  export?: { label?: string; component?: ReactNode };
  import?: { label?: string; component?: ReactNode };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  toolbar?: ToolbarConfig;
  bulkActions?: BulkAction<TData>[];
  filters?: Filter<TData>[];
  toolbarExtra?: ReactNode;
  onSearch?: (query: string) => void;
  onExport?: () => void;
  onImport?: () => void;
  onFilter?: (filters: ColumnFiltersState) => void;
  onRowClick?: (row: TData) => void;
  sortable?: boolean;
  emptyMessage?: string;
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  title?: string;
}

const SortIcon = ({ sorted }: { sorted: false | "asc" | "desc" }) => {
  if (sorted === "asc") return <ArrowUp className="size-3" />;
  if (sorted === "desc") return <ArrowDown className="size-3" />;
  return <ArrowUpDown className="size-3 opacity-40" />;
};

/**
 * Generic data table with built-in search, filter, sort, bulk actions,
 * import/export toolbar slots, and server-side pagination.
 *
 * Layout: when title present — title on LEFT, all other items on RIGHT; when no title — search on LEFT, all other items on RIGHT.
 * Border radius: fully rounded when no toolbar; flat top corners when toolbar present.
 *
 * @template TData - Row data type
 * @template TValue - Cell value type
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={columns}
 *   data={rows}
 *   total={total}
 *   page={page}
 *   pageSize={10}
 *   onPageChange={setPage}
 *   toolbar={{ search: { placeholder: "Search..." }, export: {} }}
 * />
 * ```
 */
export const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  toolbar,
  bulkActions,
  filters,
  toolbarExtra,
  onSearch,
  onExport,
  onImport,
  onFilter,
  onRowClick,
  sortable,
  emptyMessage = "No results.",
  total,
  page,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  title,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((q: string) => onSearch?.(q), 300);
  const isEmpty = !isLoading && data.length === 0;

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    manualPagination: true,
    ...(total !== undefined && { rowCount: total }),
  });

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const hasSelection = selectedRows.length > 0;

  const hasToolbar =
    !!(title || toolbar?.search) ||
    hasSelection ||
    !!(toolbar?.import || onImport) ||
    !!(toolbar?.filter || filters?.length) ||
    !!(toolbar?.export || onExport) ||
    !!toolbarExtra;

  const getFilterValues = (key: string): string[] => {
    const f = columnFilters.find((f) => f.id === key);
    return (f?.value as string[]) ?? [];
  };

  const getDateFilterValue = (key: string): Date | undefined => {
    const f = columnFilters.find((f) => f.id === key);
    return f?.value as Date | undefined;
  };

  const getDateRangeFilterValue = (key: string): DateRange => {
    const f = columnFilters.find((f) => f.id === key);
    return (f?.value as DateRange) ?? { from: undefined, to: undefined };
  };

  const setChoiceFilterValue = (key: string, value: string, type: ChoiceFilter<TData>["type"] = "radio") => {
    setColumnFilters((prev) => {
      const without = prev.filter((f) => f.id !== key);
      if (type === "checkbox") {
        const current = (prev.find((f) => f.id === key)?.value as string[]) ?? [];
        const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
        const updated = next.length ? [...without, { id: key, value: next }] : without;
        onFilter?.(updated);
        return updated;
      }
      const current = (prev.find((f) => f.id === key)?.value as string[])?.[0];
      const updated = current === value ? without : [...without, { id: key, value: [value] }];
      onFilter?.(updated);
      return updated;
    });
  };

  const setDateFilterValue = (key: string, value: Date | undefined) => {
    setColumnFilters((prev) => {
      const without = prev.filter((f) => f.id !== key);
      const updated = value ? [...without, { id: key, value }] : without;
      onFilter?.(updated);
      return updated;
    });
  };

  const setDateRangeFilterValue = (key: string, value: DateRange) => {
    setColumnFilters((prev) => {
      const without = prev.filter((f) => f.id !== key);
      const updated = value.from || value.to ? [...without, { id: key, value }] : without;
      onFilter?.(updated);
      return updated;
    });
  };

  const activeFilterCount = columnFilters.length;

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="w-full space-y-4">
      <div className="overflow-hidden rounded-md border">
        {hasToolbar &&
          (() => {
            const searchEl =
              toolbar?.search &&
              (toolbar.search.component ?? (
                <div className="relative w-full max-w-xs">
                  <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                  <Input className="pl-8" placeholder={toolbar.search.placeholder ?? "Search..."} value={query} onChange={handleQueryChange} />
                </div>
              ));

            const actionButtons = (
              <div className="flex items-center gap-x-4">
                {hasSelection &&
                  bulkActions?.map((action) => (
                    <Button key={action.label} variant="outline" onClick={() => action.onClick(selectedRows)}>
                      {action.icon && <action.icon className="size-3" />}
                      {action.label}
                    </Button>
                  ))}
                {(toolbar?.import || onImport) &&
                  (toolbar?.import?.component ?? (
                    <Button className="min-w-25 gap-x-2" variant="outline" onClick={onImport}>
                      <Upload className="size-3" />
                      {toolbar?.import?.label ?? "Import"}
                    </Button>
                  ))}
                {(toolbar?.filter || filters?.length) &&
                  (toolbar?.filter?.component ?? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="min-w-25 gap-x-2" variant="outline">
                          <ListFilter className="size-3" />
                          Filter
                          {activeFilterCount > 0 && (
                            <span className="bg-primary text-primary-foreground ml-1 rounded-full px-1.5 py-0.5 text-xs leading-none">
                              {activeFilterCount}
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-80">
                        <div className="space-y-3">
                          {filters?.map((filter) => (
                            <div key={filter.key} className="space-y-1.5">
                              <p className="text-xs font-medium">{filter.label}</p>
                              {filter.type === "select" ? (
                                <Select
                                  value={getFilterValues(filter.key)[0] ?? ""}
                                  onValueChange={(value) => setChoiceFilterValue(filter.key, value, "select")}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder={filter.placeholder ?? `Select ${filter.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {filter.options.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        {...(option.disabled !== undefined && { disabled: option.disabled })}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : filter.type === "checkbox" ? (
                                <div className="flex flex-wrap items-center gap-3">
                                  {filter.options.map((option) => {
                                    const selected = getFilterValues(filter.key).includes(option.value);
                                    return (
                                      <label key={option.value} className="flex cursor-pointer items-center gap-2 text-xs">
                                        <Checkbox
                                          checked={selected}
                                          onCheckedChange={() => setChoiceFilterValue(filter.key, option.value, "checkbox")}
                                        />
                                        {option.label}
                                      </label>
                                    );
                                  })}
                                </div>
                              ) : filter.type === "date" ? (
                                <DatePicker
                                  type="single"
                                  value={getDateFilterValue(filter.key)}
                                  onValueChange={(date) => setDateFilterValue(filter.key, date)}
                                  {...(filter.placeholder !== undefined && { placeholder: filter.placeholder })}
                                />
                              ) : filter.type === "date-range" ? (
                                <DatePicker
                                  type="range"
                                  value={getDateRangeFilterValue(filter.key)}
                                  onValueChange={(range) => setDateRangeFilterValue(filter.key, range)}
                                  {...(filter.placeholderFrom !== undefined && { placeholderFrom: filter.placeholderFrom })}
                                  {...(filter.placeholderTo !== undefined && { placeholderTo: filter.placeholderTo })}
                                />
                              ) : (
                                <RadioGroup
                                  value={getFilterValues(filter.key)[0] ?? ""}
                                  onValueChange={(value) => setChoiceFilterValue(filter.key, value, "radio")}
                                  className="flex flex-wrap items-center gap-3"
                                >
                                  {filter.options.map((option) => (
                                    <label key={option.value} className="flex cursor-pointer items-center gap-2 text-xs">
                                      <RadioGroupItem id={`${filter.key}-${option.value}`} value={option.value} className="accent-primary" />
                                      {option.label}
                                    </label>
                                  ))}
                                </RadioGroup>
                              )}
                            </div>
                          ))}
                          {activeFilterCount > 0 && (
                            <Button variant="ghost" className="w-full" onClick={() => setColumnFilters([])}>
                              Clear filters
                            </Button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ))}
                {(toolbar?.export || onExport) &&
                  (toolbar?.export?.component ?? (
                    <Button className="min-w-25 gap-x-2" variant="outline" onClick={onExport} disabled={isEmpty}>
                      <Download className="size-3" />
                      {toolbar?.export?.label ?? "Export"}
                    </Button>
                  ))}
                {toolbarExtra}
              </div>
            );

            return title ? (
              <div className="flex w-full items-center justify-between gap-x-2 border-b p-2">
                <div className="min-w-fit text-sm font-medium">{title}</div>
                <div className="flex items-center gap-x-4">
                  {searchEl}
                  {actionButtons}
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between gap-x-2 border-b p-2">
                <div>{searchEl}</div>
                {actionButtons}
              </div>
            );
          })()}
        <Table className="font-body">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-medium">
                    {header.isPlaceholder ? null : sortable && header.column.getCanSort() ? (
                      <button className="flex items-center gap-1" onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <SortIcon sorted={header.column.getIsSorted()} />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-150 text-center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : !table.getRowModel().rows?.length ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-100 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`h-13 hover:bg-gray-50 data-selected:bg-gray-100 dark:hover:bg-neutral-700 dark:data-selected:bg-neutral-800 ${onRowClick ? "cursor-pointer" : ""}`}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap text-black dark:text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {total != null && page != null && pageSize != null && total > pageSize && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          {...(onPageChange !== undefined && { onPageChange })}
          {...(onPageSizeChange !== undefined && { onPageSizeChange })}
          showPageSizeChange={!!onPageSizeChange}
        />
      )}
    </div>
  );
};
