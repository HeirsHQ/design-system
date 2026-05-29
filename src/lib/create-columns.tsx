import type { ColumnDef, Row } from "@tanstack/react-table";

import { ActionCell, type TableActionItem } from "../components/columns.js";
import { Checkbox } from "../components/checkbox.js";

export interface CreateColumnProps<T extends object> {
  columns: ColumnDef<T>[];
  /** Row action menu items. Omit to hide the actions column. */
  actions?: (rowItem: T) => TableActionItem<T>[];
  actionColumnId?: string;
  actionColumnHeader?: string;
  baseHref?: string;
  /** Prepends a checkbox column for row selection. */
  selectable?: boolean;
}

export const createColumns = <T extends object>({
  columns,
  actions,
  actionColumnId,
  actionColumnHeader,
  baseHref,
  selectable,
}: CreateColumnProps<T>): ColumnDef<T>[] => {
  const result: ColumnDef<T>[] = [];

  if (selectable) {
    result.push({
      id: "select",
      header: ({ table }) => (
        <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} aria-label="Select all" />
      ),
      cell: ({ row }: { row: Row<T> }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} aria-label="Select row" />
      ),
      enableSorting: false,
    });
  }

  result.push(...columns);

  if (actions) {
    result.push({
      id: actionColumnId ?? "actions",
      header: actionColumnHeader ?? "Actions",
      cell: ({ row }) => <ActionCell actions={actions} rowItem={row.original} baseHref={baseHref} />,
    });
  }

  return result;
};
