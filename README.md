# Heirs Design System

A modern, accessible React component library built with TypeScript, Tailwind CSS v4, and Radix UI primitives.

## Features

- **Accessible** — Built on Radix UI primitives with full keyboard navigation and screen reader support
- **Customizable** — Styled with Tailwind CSS for easy theming
- **Type-safe** — Written in TypeScript with full type definitions
- **Tree-shakeable** — Import only what you need
- **Modern** — ES Modules with React 18+ support

---

## Installation

### Step 1 — Configure GitHub Packages

The package is hosted on GitHub Packages. Create or update your `.npmrc` file in your project root:

```
@heirshq:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Your GitHub token needs the `read:packages` scope. You can create one at **GitHub → Settings → Developer settings → Personal access tokens**.

### Step 2 — Install the package

```bash
npm install @heirshq/heirs-design-system
```

### Step 3 — Import the styles

In your app's global CSS file (e.g. `src/index.css` or `src/globals.css`), add:

```css
@import "tailwindcss";
@import "@heirshq/heirs-design-system/styles";

/* Tell Tailwind to scan the design system's compiled files */
@source "../node_modules/@heirshq/heirs-design-system/dist";
```

> The `@import "@heirshq/heirs-design-system/styles"` line loads required keyframe animations (e.g. accordion open/close).
> The `@source` directive ensures Tailwind includes the component utility classes in your CSS build.

### Step 4 — (Optional) Install animation support

Several components use animation utilities from `tailwindcss-animate`. Install it if you want full animations:

```bash
npm install tailwindcss-animate
```

Then add the plugin to your CSS:

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@import "@heirshq/heirs-design-system/styles";

@source "../node_modules/@heirshq/heirs-design-system/dist";
```

---

## Setup by Framework

### Next.js (App Router)

**`app/globals.css`**

```css
@import "tailwindcss";
@import "@heirshq/heirs-design-system/styles";

@source "../node_modules/@heirshq/heirs-design-system/dist";
```

**`app/layout.tsx`**

```tsx
import "./globals.css";
```

### Vite + React

**`src/index.css`**

```css
@import "tailwindcss";
@import "@heirshq/heirs-design-system/styles";

@source "../node_modules/@heirshq/heirs-design-system/dist";
```

**`src/main.tsx`**

```tsx
import "./index.css";
```

Make sure you have the Tailwind Vite plugin installed:

```bash
npm install @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Tailwind v3 (legacy `tailwind.config.js`)

If your project still uses Tailwind v3, add the dist path to the `content` array instead:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@heirshq/heirs-design-system/dist/**/*.js"],
};
```

---

## Usage

```tsx
import { Button, Input, Card, CardHeader, CardContent } from "@heirshq/heirs-design-system";

function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Login</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <Button>Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

### Icons

```tsx
import { HtCalendarOutline, HtCheckSolid } from "@heirshq/heirs-design-system";

<HtCalendarOutline className="h-5 w-5" />
<HtCheckSolid className="h-4 w-4 text-green-600" />
```

### Class name utility

```tsx
import { cn } from "@heirshq/heirs-design-system";

const className = cn("px-4 py-2 rounded", isActive && "bg-blue-500");
```

---

## Components

### Form

| Component     | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `Button`      | Button with variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`, `success` |
| `Input`       | Text input (standard HTML attributes)                                                              |
| `Textarea`    | Multi-line text input                                                                              |
| `Label`       | Accessible form label                                                                              |
| `Checkbox`    | Checkbox with indeterminate state support                                                          |
| `Switch`      | Toggle switch                                                                                      |
| `Select`      | Dropdown select                                                                                    |
| `RadioGroup`  | Radio button group                                                                                 |
| `Toggle`      | Toggle button                                                                                      |
| `OtpInput`    | One-time password input                                                                            |
| `DatePicker`  | Single date or date range picker                                                                   |
| `Slider`      | Range slider                                                                                       |
| `ColorPicker` | Color selection input                                                                              |
| `PhoneInput`  | Phone number input with country code                                                               |
| `ArrayInput`  | Dynamic list of text inputs                                                                        |
| `Combobox`    | Searchable dropdown                                                                                |
| `MultiSelect` | Multi-value select                                                                                 |

### Layout

| Component              | Description                            |
| ---------------------- | -------------------------------------- |
| `Card`                 | Container with header, content, footer |
| `Separator`            | Visual divider                         |
| `ScrollArea`           | Custom scrollable container            |
| `Table`                | Data table                             |
| `TabPanel`             | Tabbed interface                       |
| `Breadcrumb`           | Navigation breadcrumbs                 |
| `Pagination`           | Page navigation                        |
| `PageLayout`           | Full-page layout wrapper               |
| `PagePlaceholder`      | Empty state for pages                  |
| `DashboardPlaceholder` | Empty state for dashboard sections     |

### Overlay

| Component      | Description                 |
| -------------- | --------------------------- |
| `Dialog`       | Modal dialog                |
| `Sheet`        | Slide-out panel             |
| `Popover`      | Floating content panel      |
| `DropdownMenu` | Dropdown menu               |
| `Tooltip`      | Informational tooltip       |
| `Accordion`    | Expandable content sections |
| `Command`      | Command palette             |

### Data Display

| Component  | Description                 |
| ---------- | --------------------------- |
| `Progress` | Progress bar                |
| `Avatar`   | User avatar with fallback   |
| `Badge`    | Status badge                |
| `Chart`    | Chart components (Recharts) |
| `Kanban`   | Drag-and-drop kanban board  |
| `StatCard` | Metric/stat display card    |
| `Tree`     | Hierarchical tree view      |
| `Skeleton` | Loading skeleton            |

---

## Hooks

| Hook                        | Description                          |
| --------------------------- | ------------------------------------ |
| `useClickOutside`           | Detect clicks outside an element     |
| `useControllableState`      | Manage controlled/uncontrolled state |
| `useCopyToClipboard`        | Copy text to clipboard               |
| `useDebounce`               | Debounce a value                     |
| `useDisclosure`             | Manage open/close state              |
| `useDraggableComponent`     | Make elements draggable              |
| `useEventListener`          | Add event listeners with cleanup     |
| `useFileHandler`            | Handle file uploads                  |
| `useFocusTrap`              | Trap focus within an element         |
| `useInterval`               | Set up intervals with cleanup        |
| `useIsomorphicLayoutEffect` | Layout effect that works with SSR    |
| `useLocalStorage`           | Persist state in localStorage        |
| `useMediaQuery`             | Respond to media queries             |
| `useMockApiCall`            | Simulate API calls for testing       |
| `useMounted`                | Check if component is mounted        |
| `usePrevious`               | Get the previous value of a variable |
| `useScrollLock`             | Lock body scroll                     |
| `useToggle`                 | Toggle boolean state                 |
| `useWindowSize`             | Track window dimensions              |

---

## Peer Dependencies

| Package               | Required | Notes                                                             |
| --------------------- | -------- | ----------------------------------------------------------------- |
| `react` ≥ 18          | Yes      |                                                                   |
| `react-dom` ≥ 18      | Yes      |                                                                   |
| `tailwindcss` ≥ 4     | Yes      |                                                                   |
| `tailwindcss-animate` | No       | Required for dialog, sheet, tooltip, and other overlay animations |
| `recharts` ≥ 3        | No       | Required only if using `Chart` components                         |
| `cmdk` ≥ 1            | No       | Required only if using `Command`                                  |
| `sonner` ≥ 2          | No       | Required only if using `Toast`                                    |
| `react-hook-form` ≥ 7 | No       | Required only if using `Form` / `FieldRenderer`                   |
| `zod` ≥ 3             | No       | Required only if using `Form` with Zod schemas                    |
| `@base-ui/react` ≥ 1  | No       | Required only if using `Calendar`                                 |

---

## Development

```bash
# Install dependencies
npm install

# Run Storybook (component explorer)
npm run storybook

# Type check
npm run typecheck

# Lint
npm run lint

# Format code
npm run prettier:write

# Build package
npm run build
```

---

## Publishing

### Automatic (Recommended)

1. Create a GitHub Release with a version tag (e.g. `v1.0.1`)
2. The publish workflow runs automatically and publishes to GitHub Packages

### Manual

```bash
# Bump version
npm version patch   # or minor / major

# Build and publish
npm publish
```

No secrets required — the workflow uses `GITHUB_TOKEN` with `packages: write` permission.

---

## Requirements

- React 18+ and React DOM 18+
- Tailwind CSS v4

## Browser Support

Chrome, Firefox, Safari, and Edge (latest versions).

---

## License

Proprietary software owned by Heirs Technologies. For internal use only. See [LICENSE](./LICENSE) for details.
