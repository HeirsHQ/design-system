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

The full registry index is available at `https://heirshq.github.io/design-system/r/index.json`.

---

## MFE Scaffolder

The package ships a `create-mfe` CLI that scaffolds a new Converge micro-frontend workspace — no local install required.

### Prerequisites

Because the package is hosted on GitHub Packages, your shell must have a valid PAT exported **before** running `dlx` — otherwise the package manager cannot resolve `@heirshq/design-system` and the command will fail.

**1. Create a PAT** at GitHub → Settings → Developer settings → Personal access tokens with the `read:packages` scope.

**2. Export it in your shell:**

```bash
# bash / zsh
export NPM_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
```

```powershell
# PowerShell
$env:NPM_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx"
```

**3. Ensure your `.npmrc` maps the scope to GitHub Packages:**

```
@heirshq:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### Usage

```bash
# pnpm (recommended)
pnpm dlx @heirshq/design-system create-mfe --name converge-recruitment-mfe --port 4009

# npm
npx @heirshq/design-system create-mfe --name converge-recruitment-mfe --port 4009
```

### Options

| Flag       | Required | Description                                            |
| ---------- | -------- | ------------------------------------------------------ |
| `--name`   | Yes      | Full module name — must match `converge-{slug}-mfe`    |
| `--port`   | Yes      | Dev server port (1025–65535)                           |
| `--routes` | No       | Comma-separated page route slugs (default: `overview`) |

```bash
# Scaffold with multiple routes
pnpm dlx @heirshq/design-system create-mfe \
  --name converge-recruitment-mfe \
  --port 4009 \
  --routes jobs,candidates,pipelines
```

### What gets generated

Running the command creates a self-contained Nx workspace at `./<name>/` with the following structure:

```
converge-recruitment-mfe/
├── package.json
├── nx.json
├── tsconfig.base.json
├── tsconfig.json
└── converge-recruitment-mfe/
    ├── components.json
    ├── project.json
    ├── module-federation.config.ts
    ├── rspack.config.ts
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── tsconfig.app.json
    └── src/
        ├── main.ts
        ├── bootstrap.tsx
        ├── remote-entry.ts
        ├── index.html
        ├── styles.css
        ├── routes.ts
        ├── app/app.tsx
        ├── lib/         (client.ts, query.ts, utils.ts)
        ├── types/       (app.ts, query.ts)
        └── pages/       (one file per --routes slug)
```

The scaffolder also prints the exact steps to wire the new remote into `converge-shell-mfe` (remotes config, module federation, type declarations, and app routing).

### After scaffolding

```bash
cd converge-recruitment-mfe
pnpm install
pnpm dev
```

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
