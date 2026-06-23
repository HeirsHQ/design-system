# Heirs Design System

A modern, accessible React component library built with TypeScript, Tailwind CSS v4, and Radix UI primitives.

---

## Installation

### Step 1 — Configure GitHub Packages

The package is hosted on GitHub Packages. Create or update your `.npmrc` file in your project root:

```
@heirshq:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

Then set `NPM_TOKEN` in your environment to a GitHub token with the `read:packages` scope. You can create one at **GitHub → Settings → Developer settings → Personal access tokens**.

> **Important:** The token must be set as an environment variable in your shell _before_ running the install command, otherwise the package manager will ignore the `.npmrc` auth config and fall back to the public npm registry (resulting in a 404).
>
> ```bash
> # bash / zsh
> export NPM_TOKEN=ghp_your_token_here
>
> # PowerShell
> $env:NPM_TOKEN = "ghp_your_token_here"
> ```
>
> For CI environments, add `NPM_TOKEN` as a repository secret and set it via `env:` in your workflow step.

### Step 2 — Install the package

```bash
# npm
npm install @heirshq/design-system

# pnpm
pnpm add @heirshq/design-system

# yarn
yarn add @heirshq/design-system

# bun
bun add @heirshq/design-system
```

### Step 3 — Import the styles

In your app's global CSS file (e.g. `src/index.css` or `src/globals.css`), add:

```css
@import "tailwindcss";
@import "@heirshq/design-system/styles";

/* Tell Tailwind to scan the design system's compiled files */
@source "../node_modules/@heirshq/design-system/dist";
```

> The `@import "@heirshq/design-system/styles"` line loads required keyframe animations (e.g. accordion open/close).
> The `@source` directive ensures Tailwind includes the component utility classes in your CSS build.

### Step 4 — (Optional) Install animation support

Several components use animation utilities from `tailwindcss-animate`. Install it if you want full animations:

```bash
# npm
npm install tailwindcss-animate

# pnpm
pnpm add tailwindcss-animate

# yarn
yarn add tailwindcss-animate

# bun
bun add tailwindcss-animate
```

Then add the plugin to your CSS:

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@import "@heirshq/design-system/styles";

@source "../node_modules/@heirshq/design-system/dist";
```

---

## Using with shadcn

As an alternative to the NPM package, you can add individual components directly into your project using the shadcn CLI. This copies the component source files into your codebase so you own and can customise them freely — no package import needed.

> **When to use which approach**
>
> - **NPM package** — you want to stay in sync with updates and treat the design system as a black box
> - **shadcn registry** — you want to own the source and customise components per project

### Prerequisites

You need the shadcn CLI and Tailwind CSS set up in your project. If you haven't initialised shadcn yet:

```bash
# npm
npx shadcn init

# pnpm
pnpm dlx shadcn init

# yarn
yarn dlx shadcn init

# bun
bunx shadcn init
```

### Add a component

```bash
# npm
npx shadcn add https://heirshq.github.io/design-system/r/[component-name].json

# pnpm
pnpm dlx shadcn add https://heirshq.github.io/design-system/r/[component-name].json

# yarn
yarn dlx shadcn add https://heirshq.github.io/design-system/r/[component-name].json

# bun
bunx shadcn add https://heirshq.github.io/design-system/r/[component-name].json
```

Replace `[component-name]` with any of the available components below. For example:

```bash
npx shadcn add https://heirshq.github.io/design-system/r/button.json
```

### Available components

| Name            | Type      |
| --------------- | --------- |
| `utils`         | lib       |
| `icons`         | lib       |
| `button`        | component |
| `input`         | component |
| `textarea`      | component |
| `label`         | component |
| `checkbox`      | component |
| `switch`        | component |
| `select`        | component |
| `radio`         | component |
| `slider`        | component |
| `toggle`        | component |
| `otp-input`     | component |
| `date-picker`   | component |
| `card`          | component |
| `separator`     | component |
| `scroll-area`   | component |
| `table`         | component |
| `tabs`          | component |
| `breadcrumb`    | component |
| `pagination`    | component |
| `dialog`        | component |
| `sheet`         | component |
| `popover`       | component |
| `dropdown-menu` | component |
| `tooltip`       | component |
| `toast`         | component |
| `progress`      | component |
| `accordion`     | component |
| `avatar`        | component |
| `badge`         | component |
| `chart`         | component |
| `area-chart`    | component |
| `bar-chart`     | component |
| `line-chart`    | component |
| `pie-chart`     | component |

The full registry index is available at `https://heirshq.github.io/design-system/r/index.json`.

---

## App Scaffolder (`create-app`)

`create-app` scaffolds a complete standalone **Next.js (App Router)** application pre-wired with the full Converge foundation on top of this design system. The design system is public, so no token is needed to run it.

### Usage

```bash
pnpm --package=@heirshq/design-system dlx create-app my-app
```

`<app-name>` is a positional argument used for both the folder name and the `package.json` name.

### What you get

- **Design system wired in** — `@heirshq/design-system`, Tailwind v4 and the shadcn `components.json`
- **API layer** — typed Axios client + `/api/proxy` routing, and the react-query hooks (`useApiQuery`, `usePaginatedQuery`, `useApiMutation`)
- **App shell** — `Sidebar` + `Header` with an empty navigation config (`src/config/route.ts`), an empty `admin/overview` page, and all `(auth)` pages
- **State & access** — zustand user store, `WithAuth` guard, app provider, error boundary, inactivity handling, and the permission resolver (`lib/permissions`, `lib/rbac`)

### Options

| Argument / Flag | Required | Description                                               |
| --------------- | -------- | --------------------------------------------------------- |
| `<app-name>`    | Yes      | Kebab-case name — names the folder and the `package.json` |
| `--title`       | No       | Document title in the root layout (default: derived)      |
| `--dir`         | No       | Parent directory to create the app in (default: cwd)      |
| `--force`       | No       | Allow scaffolding into a non-empty directory              |

### After scaffolding

```bash
cd <app-name>
pnpm install
# set your *_SERVICE URLs in .env, then
pnpm dev
```

---

## Bare App Scaffolder (`create-new-app`)

`create-new-app` scaffolds a **bare** app — just `@heirshq/design-system`, Tailwind v4 and shadcn config, with no auth, providers, store or API layer. Choose a **Next.js** or **Vite** starter.

### Usage

```bash
# Next.js (default)
pnpm --package=@heirshq/design-system dlx create-new-app my-app

# Vite + React
pnpm --package=@heirshq/design-system dlx create-new-app my-app --template vite
```

### Options

| Argument / Flag | Required | Description                                                       |
| --------------- | -------- | ----------------------------------------------------------------- |
| `<app-name>`    | Yes      | Kebab-case name — names the folder and the `package.json`         |
| `--template`    | No       | `next` (default) or `vite`                                        |
| `--title`       | No       | Document title (layout / `index.html`), default derived from name |
| `--dir`         | No       | Parent directory to create the app in (default: cwd)              |
| `--force`       | No       | Allow scaffolding into a non-empty directory                      |

### What you get

- `@heirshq/design-system` installed, with `@import "@heirshq/design-system/styles"` and `/theme` in the global CSS
- Tailwind v4 (`@tailwindcss/postcss` for Next, `@tailwindcss/vite` for Vite) plus `tailwindcss-animate`
- a shadcn `components.json` and a `@/lib/utils` `cn` helper, so `npx shadcn add …` works out of the box
- one example page rendering a design-system `Button`, an `.npmrc` mapping the `@heirshq` scope to GitHub Packages, and a `.gitignore`

### After scaffolding

```bash
cd <app-name>
pnpm install
pnpm dev
```

> **Next.js note:** design-system components are client components, so import them from a `"use client"` file — the generated `app/page.tsx` already is. The Vite starter has no such constraint.

---

## Setup by Framework

### Next.js (App Router)

**`app/globals.css`**

```css
@import "tailwindcss";
@import "@heirshq/design-system/styles";

@source "../node_modules/@heirshq/design-system/dist";
```

**`app/layout.tsx`**

```tsx
import "./globals.css";
```

### Vite + React

**`src/index.css`**

```css
@import "tailwindcss";
@import "@heirshq/design-system/styles";

@source "../node_modules/@heirshq/design-system/dist";
```

**`src/main.tsx`**

```tsx
import "./index.css";
```

Make sure you have the Tailwind Vite plugin installed:

```bash
# npm
npm install @tailwindcss/vite

# pnpm
pnpm add @tailwindcss/vite

# yarn
yarn add @tailwindcss/vite

# bun
bun add @tailwindcss/vite
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
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@heirshq/design-system/dist/**/*.js"],
};
```

---

## Peer Dependencies

| Package               | Required | Notes                                                                                          |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `react` ≥ 18          | Yes      |                                                                                                |
| `react-dom` ≥ 18      | Yes      |                                                                                                |
| `tailwindcss` ≥ 4     | Yes      |                                                                                                |
| `tailwindcss-animate` | No       | Required for dialog, sheet, tooltip, and other overlay animations                              |
| `recharts` ≥ 3        | No       | Required only if using `Chart`, `AreaChart`, `BarChart`, `LineChart`, or `PieChart` components |
| `cmdk` ≥ 1            | No       | Required only if using `Command`                                                               |
| `sonner` ≥ 2          | No       | Required only if using `Toast`                                                                 |
| `react-hook-form` ≥ 7 | No       | Required only if using `Form` / `FieldRenderer`                                                |
| `zod` ≥ 3             | No       | Required only if using `Form` with Zod schemas                                                 |
| `@base-ui/react` ≥ 1  | No       | Required only if using `Calendar`                                                              |

---

## Usage

```tsx
import { Button, Input, Card, CardHeader, CardContent } from "@heirshq/design-system";

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
import { HtCalendarOutline, HtCheckSolid } from "@heirshq/design-system";

<HtCalendarOutline className="h-5 w-5" />
<HtCheckSolid className="h-4 w-4 text-green-600" />
```

### Class name utility

```tsx
import { cn } from "@heirshq/design-system";

const className = cn("px-4 py-2 rounded", isActive && "bg-blue-500");
```
