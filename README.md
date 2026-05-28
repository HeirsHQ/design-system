# Heirs Design System

A modern, accessible React component library built with TypeScript, Tailwind CSS v4, and Radix UI primitives.

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
