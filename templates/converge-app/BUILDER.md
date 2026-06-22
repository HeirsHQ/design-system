# Converge 2.0 — Architecture & Design Decisions

> **Usage guide** → see [README.md](./README.md) for how to use these components day-to-day.

---

## Why this architecture exists

Converge is a large scale project and will come with several problems including duplication of code which will take developers' time and introduce bugs, different standards, unpredictable behaviours will might lead to non-replicable code that is not easy to maintain or scale. The app will grow vertically and horizontally (that is more pages and services) and the long-term effect might lead to what we currently have on Converge 1.0

The new application uses a composable component system: a small set of high-level, self-sufficient components that each own their behaviour internally and expose only data and configuration to the page author. The goal is code that is predictable, readable, and easy to replicate across the app as it grows both in pages and in services.

---

## Architecture decisions

### 1. Component layer

Each component is self-contained — it manages its own internal state, error boundaries, loading states, and UI updates. The page author provides data and callbacks; the component handles everything else.

Three rules for a component to be accepted into `src/components/shared/`:

1. It handles its own loading, empty, and error states internally.
2. It exposes a typed configuration interface, not imperative APIs.
3. It is composable — it can be dropped into any page without requiring page-level wiring beyond data and callbacks.

### 2. Data fetching

All server state is managed by TanStack Query. Each feature has its own hook file under `src/hooks/<feature>/` that owns the query keys, the fetch functions, and the cache invalidation logic. Pages call hooks; hooks call `http`; `http` calls the service.

```
Page → hook (useQuery / useMutation) → http client → microservice
```

This means:

- Pages never call `fetch` or `axios` directly.
- Cache invalidation is co-located with the mutation that causes the change.
- Adding optimistic updates or retry logic happens in one place.

### 3. HTTP client

A single `http` object (`src/lib/client.ts`) routes requests to the correct microservice base URL. It injects auth tokens from cookies on every request and handles 401 refresh silently. Pages and hooks never deal with tokens.

```ts
import { http } from "@/lib/client";

// ServiceKey maps to the correct proxy/base URL automatically
http.get("finance", "/budgets");
http.post("employee", "/staff", payload);
http.delete("leave", `/requests/${id}`);
```

### 4. Form validation

All forms use zod schemas + react-hook-form via the shared `Form` component. The schema is the single source of truth — field-level error messages, type inference, and default values all flow from it.

### 5. Table columns

Column definitions live in `src/config/columns/<domain>.tsx`, separate from pages. This keeps pages thin and makes column logic reusable across list pages that show the same data.

---

## Component API (as built)

### `PageLayout`

Wraps every page. Handles the scroll area, title row, subtitle, action buttons, and an optional tab bar.

```tsx
import { PageLayout } from "@/components/shared";

// Simple page
<PageLayout title="People & HR" subtitle="Manage your employees" actions={<Button>Add</Button>}>
  {/* content */}
</PageLayout>;

// Page with built-in underline tab bar
const tabs = [
  { label: "Employees", value: "employees" },
  { label: "Departments", value: "departments" },
];

const [activeTab, setActiveTab] = useState(tabs[0].value);

<PageLayout
  title="People & HR"
  subtitle="Manage your employees"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
>
  <TabPanel selected={activeTab} value="employees">
    {" "}
    …{" "}
  </TabPanel>
  <TabPanel selected={activeTab} value="departments">
    {" "}
    …{" "}
  </TabPanel>
</PageLayout>;
```

### `DataTable`

Handles pagination, search, filter, sort, bulk actions, import/export toolbar, and empty/loading states. Column definitions are defined separately with `createColumns`.

```tsx
import { DataTable } from "@/components/shared";
import { userColumns } from "@/config/columns";

<DataTable
  columns={userColumns("/admin/hr/employees")}
  data={data?.data ?? []}
  isLoading={isLoading}
  total={data?.total ?? 0}
  page={params.page}
  pageSize={params.pageSize}
  onPageChange={(page) => onParamChange("page", page)}
  onPageSizeChange={(size) => onParamChange("pageSize", size)}
  onSearch={(q) => onParamChange("search", q)}
  onFilter={(filters) => console.log(filters)}
  onExport={handleExport}
  onImport={handleImport}
  filters={[
    { key: "role", label: "Role", options: ROLE_OPTIONS, type: "single" },
    { key: "status", label: "Status", options: STATUS_OPTIONS, type: "multiple" },
  ]}
  toolbar={{
    search: { placeholder: "Search employees…" },
    export: { label: "Export CSV" },
    import: { label: "Import" },
    filter: {},
  }}
  bulkActions={[
    { label: "Mark as Paid", icon: CheckCircle, onClick: (rows) => markPaid(rows) },
    { label: "Delete", icon: Trash2, onClick: (rows) => deleteMany(rows) },
  ]}
/>;
```

Column definitions:

```tsx
// src/config/columns/employee.tsx
import { Eye, Pencil } from "lucide-react";

import { createColumns, DateCell, StatusCell, SerialNumberCell } from "./shared";
import type { Employee } from "@/types";

export const employeeColumns = (basePath: string) =>
  createColumns<Employee>({
    columns: [
      { accessorKey: "serial", header: "S/N", cell: ({ row }) => <SerialNumberCell row={row} /> },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusCell
            status={row.original.status}
            config={{ active: "success", inactive: "neutral", suspended: "danger" }}
          />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => <DateCell date={row.original.createdAt} />,
      },
    ],
    actions: (employee) => [
      { label: "View", icon: Eye, href: `${basePath}/${employee.id}` },
      { label: "Edit", icon: Pencil, href: `${basePath}/${employee.id}/edit` },
    ],
    selectable: true,
  });
```

### `Form`

Render-prop form builder backed by react-hook-form + zod. The schema drives validation and type inference; the field map drives rendering; the render prop controls layout.

```tsx
import { z } from "zod";

import { Form } from "@/components/shared";
import type { FormField } from "@/types";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email(),
  role: z.enum(["admin", "user", "viewer"]),
  startDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const fields: Record<keyof FormValues, FormField<FormValues>> = {
  firstName: { label: "First Name", type: "text", placeholder: "Jane" },
  lastName: { label: "Last Name", type: "text", placeholder: "Doe" },
  email: { label: "Email", type: "email", placeholder: "jane@acme.com" },
  role: {
    label: "Role",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Viewer", value: "viewer" },
    ],
  },
  startDate: { label: "Start Date", type: "date" },
};

const defaultValues: FormValues = { firstName: "", lastName: "", email: "", role: "user", startDate: "" };

const handleSubmit = async (values: FormValues) => {
  try {
    await useCreateEmployee().mutate(values);
  } catch (e) {
    toast.error(e.message);
  }
};

<Form schema={schema} defaultValues={defaultValues} fields={fields} onSubmit={handleSubmit}>
  {({ field, isSubmitting }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {field("firstName")}
        {field("lastName")}
        {field("email")}
        {field("role")}
        {field("startDate")}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Create Employee"}
      </Button>
    </div>
  )}
</Form>;
```

### Data fetching

```ts
// src/hooks/employees/use-employees.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { http } from "@/lib/client";
import { removeNullorUndefined } from "@/lib";

type Env<T> = { data: T };
const unwrap = <T>(r: unknown) => (r as Env<T>).data;

const employeeKeys = {
  all: () => ["employees"] as const,
  list: (p?: object) => ["employees", "list", p] as const,
  detail: (id: string) => ["employees", "detail", id] as const,
};

export function useEmployees(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () =>
      http
        .get<Env<PaginatedResponse<Employee>>>("employee", "/staff", removeNullorUndefined(params))
        .then(unwrap<PaginatedResponse<Employee>>),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEmployeeInput) =>
      http.post<Env<Employee>>("employee", "/staff", data).then(unwrap<Employee>),
    onSuccess: (emp) => {
      qc.setQueryData(employeeKeys.detail(emp.id), emp);
      qc.invalidateQueries({ queryKey: employeeKeys.list() });
      toast.success("Employee created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
```

---

## Page workflow

1. Create the route file (`src/app/<role>/<feature>/page.tsx`).
2. Import `PageLayout` and wrap your content with it.
3. Import the relevant hooks — they own loading state, caching, and error toasts.
4. Define/import types and the zod schema if the page has a form.
5. Let the components handle state transitions, empty states, loading spinners, and toast notifications.
6. Keep page files focused on page-specific logic only.

---

## Outcomes

- New developers can ship a working list/form page in under an hour by following the patterns above.
- Bugs in shared behaviour (pagination, token refresh, form validation) are fixed once and benefit every page.
- UI is consistent across the app because layout and interaction patterns come from the same components.
- Column definitions, form schemas, and hook files are independently testable.
  worry about page-specific logics

## Expected Outcomes

- Reduced time to onboard new developers
- Reduced time to ship new features
- Recuced duplication of code and effort
- Consistent UI patterns across the app
- Bug fixes can be easily traced and fix
- Components are testable with predictable outcomes
- Developers can focus on building features and not worry about page-specific logics
