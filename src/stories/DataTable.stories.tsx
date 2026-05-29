import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { DataTable } from "../components/data-table.js";
import { Badge } from "../components/badge.js";
import { Checkbox } from "../components/checkbox.js";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "pending";
  createdAt: string;
};

const allUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "inactive", createdAt: "2024-02-20" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "viewer", status: "pending", createdAt: "2024-03-05" },
  { id: "4", name: "Dave Brown", email: "dave@example.com", role: "editor", status: "active", createdAt: "2024-03-22" },
  { id: "5", name: "Eve Davis", email: "eve@example.com", role: "viewer", status: "active", createdAt: "2024-04-10" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", role: "admin", status: "inactive", createdAt: "2024-04-18" },
  { id: "7", name: "Grace Wilson", email: "grace@example.com", role: "editor", status: "active", createdAt: "2024-05-01" },
  { id: "8", name: "Henry Moore", email: "henry@example.com", role: "viewer", status: "pending", createdAt: "2024-05-14" },
];

const statusVariant: Record<User["status"], "default" | "secondary" | "outline"> = {
  active: "default",
  inactive: "secondary",
  pending: "outline",
};

const baseColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>,
  },
  { accessorKey: "createdAt", header: "Created At" },
];

const selectionColumn: ColumnDef<User> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />
  ),
  cell: ({ row }) => (
    <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} onClick={(e) => e.stopPropagation()} />
  ),
};

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const paged = allUsers.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable
        columns={baseColumns}
        data={paged}
        total={allUsers.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        sortable
        toolbar={{ search: { placeholder: "Search users..." } }}
        onSearch={(q) => console.log("search:", q)}
        onExport={() => console.log("export")}
      />
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const paged = allUsers.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable
        title="Users"
        columns={baseColumns}
        data={paged}
        total={allUsers.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        sortable
        toolbar={{ search: { placeholder: "Search..." }, export: {} }}
        onExport={() => console.log("export")}
      />
    );
  },
};

export const WithFilters: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const paged = allUsers.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable
        columns={baseColumns}
        data={paged}
        total={allUsers.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        sortable
        toolbar={{ search: { placeholder: "Search users..." }, export: {} }}
        onExport={() => console.log("export")}
        filters={[
          {
            key: "role",
            label: "Role",
            type: "radio",
            options: [
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ],
          },
          {
            key: "status",
            label: "Status",
            type: "checkbox",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Pending", value: "pending" },
            ],
          },
        ]}
        onFilter={(filters) => console.log("filters:", filters)}
      />
    );
  },
};

export const WithBulkActions: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const paged = allUsers.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable
        columns={[selectionColumn, ...baseColumns]}
        data={paged}
        total={allUsers.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        sortable
        toolbar={{ search: { placeholder: "Search users..." } }}
        onSearch={(q) => console.log("search:", q)}
        bulkActions={[
          {
            label: "Delete selected",
            icon: Trash2,
            onClick: (rows) => console.log("delete:", rows),
          },
        ]}
        onRowClick={(row) => console.log("row clicked:", row)}
      />
    );
  },
};

export const Loading: Story = {
  render: () => (
    <DataTable
      columns={baseColumns}
      data={[]}
      isLoading
      toolbar={{ search: { placeholder: "Search users..." } }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={baseColumns}
      data={[]}
      emptyMessage="No users found."
      toolbar={{ search: { placeholder: "Search users..." }, export: {} }}
      onExport={() => console.log("export")}
    />
  ),
};
