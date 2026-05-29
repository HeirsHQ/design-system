import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Edit, Trash2 } from "lucide-react";

import { createColumns } from "../lib/create-columns.js";
import { DataTable } from "../components/data-table.js";
import {
  ActionCell,
  BooleanCell,
  CurrencyCell,
  DateCell,
  DateTimeCell,
  NumberCell,
  PercentageCell,
  RelativeTimeCell,
  SerialNumberCell,
  StatusCell,
  TimeCell,
  STATUS_STYLES,
  type StatusVariant,
} from "../components/columns.js";

// ── Shared sample data ───────────────────────────────────────────────────────

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: "active" | "pending" | "completed" | "cancelled" | "draft" | "in-progress";
  isVerified: boolean;
  quantity: number;
  rate: number;
  createdAt: string;
};

const orders: Order[] = [
  {
    id: "1",
    customer: "Alice Johnson",
    amount: 12450,
    status: "active",
    isVerified: true,
    quantity: 4200,
    rate: 82.5,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    customer: "Bob Smith",
    amount: 830,
    status: "pending",
    isVerified: false,
    quantity: 15,
    rate: 12.3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    customer: "Carol White",
    amount: 99000,
    status: "completed",
    isVerified: true,
    quantity: 1000,
    rate: 99.0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "4",
    customer: "Dave Brown",
    amount: 5600,
    status: "cancelled",
    isVerified: false,
    quantity: 80,
    rate: 70.0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "5",
    customer: "Eve Davis",
    amount: 250,
    status: "draft",
    isVerified: true,
    quantity: 5,
    rate: 50.0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "6",
    customer: "Frank Miller",
    amount: 3100,
    status: "in-progress",
    isVerified: false,
    quantity: 62,
    rate: 50.0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

// ── Cell showcase ────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Helpers/Columns",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCellTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <Section label="StatusCell">
        <Row label="active">
          <StatusCell status="active" />
        </Row>
        <Row label="pending">
          <StatusCell status="pending" />
        </Row>
        <Row label="completed">
          <StatusCell status="completed" />
        </Row>
        <Row label="cancelled">
          <StatusCell status="cancelled" />
        </Row>
        <Row label="draft">
          <StatusCell status="draft" />
        </Row>
        <Row label="in-progress">
          <StatusCell status="in-progress" />
        </Row>
        <Row label="inactive">
          <StatusCell status="inactive" />
        </Row>
        <Row label="unknown → neutral">
          <StatusCell status="unknown" />
        </Row>
      </Section>

      <Section label="DateCell / TimeCell / DateTimeCell / RelativeTimeCell">
        <Row label="DateCell">
          <DateCell date="2024-03-15T09:30:00Z" />
        </Row>
        <Row label="DateCell (null)">
          <DateCell date={null} />
        </Row>
        <Row label="TimeCell">
          <TimeCell date="2024-03-15T09:30:00Z" />
        </Row>
        <Row label="DateTimeCell">
          <DateTimeCell date="2024-03-15T09:30:00Z" />
        </Row>
        <Row label="RelativeTimeCell">
          <RelativeTimeCell date={new Date(Date.now() - 1000 * 60 * 90).toISOString()} />
        </Row>
      </Section>

      <Section label="CurrencyCell / NumberCell / PercentageCell">
        <Row label="CurrencyCell compact">
          <CurrencyCell amount={12450} />
        </Row>
        <Row label="CurrencyCell full">
          <CurrencyCell amount={12450} display="full" />
        </Row>
        <Row label="CurrencyCell NGN">
          <CurrencyCell amount={1500000} currency="NGN" display="full" />
        </Row>
        <Row label="NumberCell">
          <NumberCell value={1234567} />
        </Row>
        <Row label="PercentageCell">
          <PercentageCell value={73.456} decimals={2} />
        </Row>
      </Section>

      <Section label="BooleanCell">
        <Row label="true">
          <BooleanCell value={true} />
        </Row>
        <Row label="false">
          <BooleanCell value={false} />
        </Row>
        <Row label="custom labels">
          <BooleanCell value={true} labels={["Verified", "Unverified"]} />
        </Row>
      </Section>

      <Section label="SerialNumberCell">
        <Row label="index 0">
          <SerialNumberCell row={{ index: 0 } as never} />
        </Row>
        <Row label="index 4">
          <SerialNumberCell row={{ index: 4 } as never} />
        </Row>
      </Section>
    </div>
  ),
};

export const StatusCellVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(STATUS_STYLES) as StatusVariant[]).map((v) => (
        <StatusCell key={v} status={v} />
      ))}
    </div>
  ),
};

export const StatusCellCustomConfig: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusCell<"processing" | "shipped" | "delivered" | "returned">
        status="processing"
        config={{ processing: "warning", shipped: "info", delivered: "success", returned: "danger" }}
      />
      <StatusCell<"processing" | "shipped" | "delivered" | "returned">
        status="shipped"
        config={{ processing: "warning", shipped: "info", delivered: "success", returned: "danger" }}
      />
      <StatusCell<"processing" | "shipped" | "delivered" | "returned">
        status="delivered"
        config={{ processing: "warning", shipped: "info", delivered: "success", returned: "danger" }}
      />
      <StatusCell<"processing" | "shipped" | "delivered" | "returned">
        status="returned"
        config={{ processing: "warning", shipped: "info", delivered: "success", returned: "danger" }}
      />
    </div>
  ),
};

export const ActionCellDemo: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-muted-foreground text-sm">Open the menu →</span>
      <ActionCell
        rowItem={orders[0]}
        actions={() => [
          { label: "Edit", icon: Edit, variant: "default", onClick: (r) => alert(`Edit ${r.customer}`) },
          { label: "Delete", icon: Trash2, variant: "destructive", onClick: (r) => alert(`Delete ${r.customer}`) },
        ]}
      />
    </div>
  ),
};

export const WithCreateColumns: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const paged = orders.slice((page - 1) * pageSize, page * pageSize);

    const columns = createColumns<Order>({
      selectable: true,
      columns: [
        { id: "serial", header: "#", cell: ({ row }) => <SerialNumberCell row={row} /> },
        { accessorKey: "customer", header: "Customer" },
        { accessorKey: "amount", header: "Amount", cell: ({ row }) => <CurrencyCell amount={row.original.amount} /> },
        { accessorKey: "quantity", header: "Qty", cell: ({ row }) => <NumberCell value={row.original.quantity} /> },
        { accessorKey: "rate", header: "Rate", cell: ({ row }) => <PercentageCell value={row.original.rate} /> },
        { accessorKey: "isVerified", header: "Verified", cell: ({ row }) => <BooleanCell value={row.original.isVerified} labels={["Yes", "No"]} /> },
        { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusCell status={row.original.status} /> },
        { accessorKey: "createdAt", header: "Created", cell: ({ row }) => <RelativeTimeCell date={row.original.createdAt} /> },
      ],
      actions: (row) => [
        { label: "Edit", icon: Edit, variant: "default", onClick: () => alert(`Edit ${row.customer}`) },
        { label: "Delete", icon: Trash2, variant: "destructive", onClick: () => alert(`Delete ${row.customer}`) },
        { label: "Hidden action", hidden: true, onClick: () => {} },
        { label: "Conditional hide", hidden: () => row.status === "cancelled", onClick: () => alert(`Action on ${row.customer}`) },
      ],
    });

    return (
      <DataTable
        title="Orders"
        columns={columns}
        data={paged}
        total={orders.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        sortable
        toolbar={{ search: { placeholder: "Search orders..." } }}
        onSearch={(q) => console.log("search:", q)}
      />
    );
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">{label}</p>
      <div className="divide-y rounded-md border">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 px-3 py-2">
      <span className="text-muted-foreground w-48 shrink-0 text-xs">{label}</span>
      {children}
    </div>
  );
}
