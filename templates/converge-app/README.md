# Converge 2.0 — Developer Guide

Practical reference for scaffolding pages and using the high-level components in this codebase.

> **Architecture & design decisions** → see [BUILDER.md](./BUILDER.md) for the why behind this system.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Scaffolding a Page](#scaffolding-a-page)
3. [API Hooks](#api-hooks)
4. [Form Component](#form-component)
5. [Data Table](#data-table)
6. [Tabs & TabPanel](#tabs--tabpanel)
7. [Dialogs & Modals](#dialogs--modals)
8. [Drag and Drop](#drag-and-drop)
9. [Toast Notifications](#toast-notifications)
10. [UI Primitives Cheatsheet](#ui-primitives-cheatsheet)

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Public auth pages (not in URL)
│   ├── super-admin/            # Admin dashboard
│   └── api/v1/                 # Internal REST API (app-builder service)
├── components/
│   ├── ui/                     # shadcn primitives (button, input, dialog…)
│   └── shared/                 # High-level reusables (PageLayout, DataTable, Form…)
├── config/
│   └── columns/                # Table column definitions per domain
├── hooks/
│   └── app-builder/            # Feature-scoped hooks (useApps, useScreens…)
├── lib/
│   ├── client.ts               # Axios http client (all API calls go through here)
│   └── utils.ts                # cn(), formatDate(), formatCurrency()…
└── types/                      # Shared TypeScript types
```

---

## Scaffolding a Page

Every page follows the same four-step pattern: params → data → guard → render.

```tsx
// src/app/admin/inventory/page.tsx
"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Loader, PageLayout } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/inventory"; // your feature hook

const Page = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useItems({ page, limit: 20 });

  // 1. Loading guard — shown while the first fetch is in flight
  if (isLoading) return <Loader />;

  return (
    // 2. PageLayout handles the scroll area, title row, and optional tab bar
    <PageLayout
      title="Inventory"
      subtitle="Manage stock and assets"
      actions={
        <Button asChild size="sm">
          <Link href="/admin/inventory/create">
            <Plus className="mr-1 size-4" /> Add Item
          </Link>
        </Button>
      }
    >
      {/* 3. Your page content goes here */}
    </PageLayout>
  );
};

export default Page;
```

**PageLayout props**

| Prop          | Type                            | Description                              |
| ------------- | ------------------------------- | ---------------------------------------- |
| `title`       | `ReactNode`                     | Page heading                             |
| `subtitle`    | `string`                        | Muted line below the title               |
| `actions`     | `ReactNode`                     | Rendered right-aligned in the header row |
| `tabs`        | `{ label, value, disabled? }[]` | Renders an underline tab bar             |
| `activeTab`   | `string`                        | Currently selected tab value             |
| `onTabChange` | `(tab: string) => void`         | Tab change callback                      |

### Dynamic route page

```tsx
// src/app/admin/inventory/[itemId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { Loader, PageLayout } from "@/components/shared";
import { useItem } from "@/hooks/inventory";

const Page = () => {
  const { itemId } = useParams() as { itemId: string };
  const { data: item, isLoading } = useItem(itemId);

  if (isLoading && !item) return <Loader />;
  if (!item)
    return (
      <PageLayout title="Item not found">
        <div />
      </PageLayout>
    );

  return (
    <PageLayout title={item.name} subtitle={item.category}>
      {/* detail content */}
    </PageLayout>
  );
};

export default Page;
```

---

## API Hooks

All server state lives in React Query hooks inside `src/hooks/<feature>/`.

### Writing a hook file

```ts
// src/hooks/inventory/use-items.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { http } from "@/lib/client";
import { removeNullorUndefined } from "@/lib";
import type { Item, CreateItemInput } from "@/types/inventory";
import type { PaginatedResponse } from "@/types/query";

// Unwrap the response envelope so callers get typed data directly
type Env<T> = { data: T };
const unwrap = <T>(r: unknown) => (r as Env<T>).data;

// ── Query Keys ────────────────────────────────────────────────────────────────

export const inventoryKeys = {
  items: (params?: object) => ["inventory", "items", params] as const,
  item: (id: string) => ["inventory", "items", id] as const,
};

// ── Queries ───────────────────────────────────────────────────────────────────

export function useItems(params?: { page?: number; limit?: number }) {
  const _params = removeNullorUndefined(params);
  return useQuery({
    queryKey: inventoryKeys.items(_params),
    queryFn: () =>
      http
        .get<Env<PaginatedResponse<Item>>>("employee", "/inventory/items", _params)
        .then(unwrap<PaginatedResponse<Item>>),
    staleTime: 5 * 60 * 1000,
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: inventoryKeys.item(id),
    queryFn: () => http.get<Env<Item>>("employee", `/inventory/items/${id}`).then(unwrap<Item>),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateItemInput) =>
      http.post<Env<Item>>("employee", "/inventory/items", data).then(unwrap<Item>),
    onSuccess: (item) => {
      qc.setQueryData(inventoryKeys.item(item.id), item);
      qc.invalidateQueries({ queryKey: inventoryKeys.items() });
      toast.success("Item created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
```

### HTTP client — `ServiceKey` values

The `http` object routes requests through the correct proxy. Pick the right service key:

```ts
import { http } from "@/lib/client";
// ServiceKey: "app-builder" | "employee" | "finance" | "identity"
//           | "leave" | "notification" | "organization"
//           | "questionnaire" | "tenant" | "workflow"

// "app-builder" → /api/v1  (internal Next.js API)
// all others    → /api/proxy/<service>

await http.get("finance", "/budgets");
await http.post("employee", "/staff", payload);
await http.put("leave", `/requests/${id}`, payload);
await http.patch("finance", `/budgets/${id}/status`, { status });
await http.delete("employee", `/staff/${id}`);
```

Tokens (`ACCESS_TOKEN`, `REFRESH_TOKEN`, `COMPANY_ID`) are injected automatically from cookies. 401s trigger a silent refresh — up to 3 retries before force-logout.

---

## Form Component

Located at `src/components/shared/form.tsx`. Wraps react-hook-form + zod with a render-prop API so you control layout completely.

### Basic usage

```tsx
"use client";

import { z } from "zod";
import { Form } from "@/components/shared";
import type { StandardFormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { useCreateItem } from "@/hooks/inventory";

// 1. Schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  quantity: z.number().min(0),
  unit: z.enum(["pcs", "kg", "litre"]),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

// 2. Field definitions — keys must match the schema
const fields: Record<keyof FormValues, StandardFormField<FormValues>> = {
  name: { label: "Item Name", type: "text", placeholder: "e.g. Office Chair" },
  quantity: { label: "Quantity", type: "number", placeholder: "0" },
  unit: {
    label: "Unit",
    type: "select",
    options: [
      { label: "Pieces", value: "pcs" },
      { label: "Kg", value: "kg" },
      { label: "Litre", value: "litre" },
    ],
  },
  description: { label: "Description", type: "textarea", placeholder: "Optional notes" },
  active: { label: "Active", type: "toggle" },
};

// 3. Default values (must satisfy the schema shape)
const defaultValues: FormValues = {
  name: "",
  quantity: 0,
  unit: "pcs",
  description: "",
  active: true,
};

export default function CreateItemPage() {
  const { mutateAsync: createItem } = useCreateItem();

  return (
    <Form
      schema={schema}
      defaultValues={defaultValues}
      fields={fields}
      onSubmit={async (values, form) => {
        await createItem(values);
        form.reset();
      }}
    >
      {({ field, isSubmitting }) => (
        <div className="max-w-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {field("name")}
            {field("quantity")}
            {field("unit")}
          </div>
          {field("description")}
          {field("active")}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Create Item"}
          </Button>
        </div>
      )}
    </Form>
  );
}
```

The render-prop receives `{ field, isSubmitting, form }`:

- `field("key")` — renders the fully controlled field (label, input, error message)
- `isSubmitting` — `true` while `onSubmit` is awaiting
- `form` — the raw `react-hook-form` instance for advanced use (watch, setValue, etc.)

### Supported field types

| `type` value | Renders                                                       |
| ------------ | ------------------------------------------------------------- |
| `"text"`     | `<input type="text">`                                         |
| `"email"`    | `<input type="email">`                                        |
| `"password"` | `<input type="password">` with show/hide toggle               |
| `"number"`   | `<input type="number">`                                       |
| `"tel"`      | `<input type="tel">`                                          |
| `"textarea"` | `<textarea>`                                                  |
| `"select"`   | Dropdown — requires `options: { label, value }[]`             |
| `"radio"`    | Radio group — requires `options`                              |
| `"checkbox"` | Single checkbox                                               |
| `"toggle"`   | Switch                                                        |
| `"date"`     | Date picker                                                   |
| `"file"`     | File input — pass `accept` and `multiple` in the field config |
| `"otp"`      | OTP code input                                                |

### Conditional fields (`showIf`)

Add `showIf` to any field definition to show or hide it based on the current form values. The renderer re-evaluates it on every change, so dependent fields appear and disappear reactively. When a field is hidden by `showIf` its value is still tracked by the schema — use `.optional()` in zod if the field shouldn't be required while hidden.

```tsx
const schema = z.object({
  isEmployee: z.boolean().default(false),
  employeeId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const fields: Record<keyof FormValues, FormField<FormValues>> = {
  isEmployee: { label: "Is Employee", type: "toggle" },
  employeeId: {
    label: "Employee ID",
    type: "text",
    placeholder: "EMP-0001",
    showIf: (values) => values.isEmployee === true,
  },
};
```

`showIf` receives the live form values object and must return a `boolean`. Returning `false` removes the field from the DOM entirely (same effect as `hidden: true`, but dynamic).

---

## Data Table

Located at `src/components/shared/data-table.tsx`.  
Column definitions live in `src/config/columns/<domain>.tsx`.

### Step 1 — Define columns

```tsx
// src/config/columns/inventory.tsx
import { Eye, Trash2 } from "lucide-react";
import { createColumns, CurrencyCell, DateCell, SerialNumberCell, StatusCell } from "./shared";
import type { Item } from "@/types/inventory";

export const itemColumns = (basePath: string) =>
  createColumns<Item>({
    columns: [
      {
        accessorKey: "serial",
        header: "S/N",
        cell: ({ row }) => <SerialNumberCell row={row} />,
      },
      { accessorKey: "name", header: "Item Name" },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "unitPrice",
        header: "Unit Price",
        cell: ({ row }) => <CurrencyCell amount={row.original.unitPrice} display="full" />,
      },
      {
        accessorKey: "createdAt",
        header: "Added On",
        cell: ({ row }) => <DateCell date={row.original.createdAt} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusCell
            status={row.original.status}
            config={{ active: "success", inactive: "neutral", low: "warning" }}
          />
        ),
      },
    ],
    // Popover action menu — rendered as a ⋮ button on each row
    actions: (item) => [
      { label: "View", icon: Eye, href: `${basePath}/${item.id}` },
      { label: "Delete", icon: Trash2, variant: "destructive", onClick: (item) => deleteItem(item.id) },
    ],
    selectable: true, // prepends a checkbox column for bulk selection
  });
```

### Step 2 — Use in the page

```tsx
"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared";
import { itemColumns } from "@/config/columns/inventory";
import { useItems } from "@/hooks/inventory";

const BASE = "/admin/inventory";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Low", value: "low" },
];

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useItems({ page, limit: pageSize, search });

  return (
    <DataTable
      columns={itemColumns(BASE)}
      data={data?.data ?? []}
      isLoading={isLoading}
      total={data?.total ?? 0}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onSearch={setSearch}
      filters={[{ key: "status", label: "Status", options: STATUS_OPTIONS }]}
      onFilter={(filters) => console.log(filters)}
      toolbar={{
        search: { placeholder: "Search items…" },
        export: { label: "Export CSV" },
        import: { label: "Import" },
        filter: {},
      }}
      onExport={() => {
        /* handle export */
      }}
      onImport={() => {
        /* handle import */
      }}
    />
  );
}
```

### Built-in cell components (imported from `@/config/columns/shared`)

| Component                                                    | Use for                        |
| ------------------------------------------------------------ | ------------------------------ |
| `<SerialNumberCell row={row} />`                             | Row index (1-based)            |
| `<DateCell date={value} />`                                  | `dd/MM/yyyy`                   |
| `<DateTimeCell date={value} />`                              | `dd/MM/yyyy HH:mm`             |
| `<RelativeTimeCell date={value} />`                          | "2 hours ago"                  |
| `<CurrencyCell amount={n} display="full" />`                 | Formatted with currency symbol |
| `<NumberCell value={n} />`                                   | Comma-separated number         |
| `<PercentageCell value={n} decimals={1} />`                  | `12.5%`                        |
| `<StatusCell status={s} config={{ approved: "success" }} />` | Coloured badge                 |
| `<BooleanCell value={bool} />`                               | Yes / No                       |
| `<ActionCell actions={fn} rowItem={row.original} />`         | Standalone ⋮ popover           |

**`StatusCell` colour variants:** `"success"` · `"warning"` · `"danger"` · `"info"` · `"neutral"` · `"draft"`

### Bulk actions

```tsx
<DataTable
  ...
  bulkActions={[
    {
      label: "Archive selected",
      icon: Archive,
      onClick: (rows) => archiveMany(rows.map((r) => r.id)),
    },
  ]}
/>
```

---

## Tabs & TabPanel

Use a plain `useState` for the active tab and pair it with `<TabPanel>` from `@/components/shared`.

```tsx
"use client";

import { useState } from "react";
import { TabPanel } from "@/components/shared";
import { cn } from "@/lib";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Documents", value: "documents" },
  { label: "Activity", value: "activity" },
];

export default function DetailPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="bg-muted flex w-fit items-center gap-1 rounded-lg p-0.5 dark:bg-neutral-600">
        {TABS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              tab === value
                ? "bg-white text-black shadow-sm dark:bg-neutral-700 dark:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Panels — only the matching panel mounts (animated by default) */}
      <TabPanel selected={tab} value="overview">
        <p>Overview content</p>
      </TabPanel>

      <TabPanel selected={tab} value="documents">
        <p>Documents content</p>
      </TabPanel>

      <TabPanel selected={tab} value="activity" animated={false}>
        {/* animated={false} skips the framer-motion slide transition */}
        <p>Activity feed</p>
      </TabPanel>
    </div>
  );
}
```

**`TabPanel` props**

| Prop              | Default | Description                      |
| ----------------- | ------- | -------------------------------- |
| `selected`        | —       | Currently active tab value       |
| `value`           | —       | This panel's matching value      |
| `animated`        | `true`  | Fade + slide via framer-motion   |
| `preserveContent` | `false` | Keep DOM mounted when not active |

Alternatively, pass `tabs` + `activeTab` + `onTabChange` directly to `<PageLayout>` for a standard underline tab bar without writing your own buttons.

---

## Dialogs & Modals

Use the shadcn `Dialog` primitive from `@/components/ui/dialog`.

```tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteItemDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete item?</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Popover (lightweight inline panel)

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Options</Button>
  </PopoverTrigger>
  <PopoverContent align="end" className="w-64 space-y-2 p-3">
    {/* inline form, menu items, etc. */}
  </PopoverContent>
</Popover>;
```

---

## Drag and Drop

Uses `@dnd-kit/core` + `@dnd-kit/sortable`. The standard pattern in this codebase is a **sortable vertical list** (e.g. screen reordering in the app builder).

```tsx
"use client";

import { DndContext, type DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib";

// ── Individual sortable row ────────────────────────────────────────────────────

function SortableRow({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("flex items-center gap-2 rounded-lg border bg-white p-3", isDragging && "opacity-50 shadow-lg")}
    >
      <button {...attributes} {...listeners} className="cursor-grab touch-none" aria-label="Drag to reorder">
        <GripVertical className="text-muted-foreground size-4" />
      </button>
      <span className="text-sm">{label}</span>
    </div>
  );
}

// ── Parent list ───────────────────────────────────────────────────────────────

export function SortableList({
  initialItems,
  onReorder,
}: {
  initialItems: { id: string; name: string }[];
  onReorder: (ids: string[]) => void;
}) {
  const [items, setItems] = useState(initialItems);

  // distance: 6 prevents accidental drags on click
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIdx = prev.findIndex((i) => i.id === active.id);
      const newIdx = prev.findIndex((i) => i.id === over.id);
      const next = arrayMove(prev, oldIdx, newIdx);
      onReorder(next.map((i) => i.id));
      return next;
    });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id} label={item.name} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
```

---

## Toast Notifications

Toasts use **Sonner** — the `<Toaster />` is already in the root layout.

```ts
import { toast } from "sonner";

toast.success("Record saved");
toast.error("Something went wrong");
toast.warning("Review before submitting");
toast.info("Processing in background");

// With a description
toast.success("Budget approved", { description: "Finance team has been notified." });

// Loading state that resolves later
const id = toast.loading("Uploading file…");
toast.success("Upload complete", { id }); // replaces the loader
toast.error("Upload failed", { id }); // or on error
```

Mutations in this codebase already call `toast.success` / `toast.error` in their `onSuccess` / `onError` callbacks — you do not need to call `toast` manually inside page handlers unless you want custom messages.

---

## UI Primitives Cheatsheet

All from `@/components/ui/`.

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Utilities
import { cn } from "@/lib"; // tailwind-merge + clsx
import { formatDate } from "@/lib"; // "08 May 2026"
import { formatCurrency } from "@/lib"; // "₦1,250,000.00"
```

**Button variants:** `default` · `outline` · `ghost` · `destructive` · `secondary` · `link`

**Button sizes:** `default` · `sm` · `lg` · `icon`
