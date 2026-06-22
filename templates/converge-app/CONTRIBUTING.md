# Contributing to Converge 2.0

## Prerequisites

- Node.js 20+
- pnpm (required — do not use npm or yarn)
- Access to the Prisma database (see `.env.example`)

## Setup

```bash
pnpm install
cp .env.example .env        # fill in required values
pnpm prisma:generate
pnpm dev
```

## Branch naming

```
feature/<short-description>
fix/<short-description>
chore/<short-description>
refactor/<short-description>
```

Branch off `main`. Keep branches short-lived and focused on one thing.

## Commits

Follow conventional commits:

```
features: add leave balance widget
fix: correct pagination offset in DataTable
chore: update prisma schema for employees
refactor: extract shared status cell logic
```

Husky runs `prettier --write` on staged files before every commit. Do not skip hooks (`--no-verify`).

## Code rules

**TypeScript**

- No `any`. Use `unknown` and narrow, or define a proper type in `src/types/`.
- Export types from the correct domain file, not inline in component files.

**React / Next.js**

- All pages live under `src/app/` and follow the four-step pattern: params → data → guard → render (see README).
- Mark files `"use client"` only when needed. Prefer server components for static/layout work.
- Do not import server-only modules in client components.

**State & data fetching**

- All server state goes through React Query hooks in `src/hooks/<feature>/`.
- All API calls go through `http` from `@/lib/client` — never call `fetch` or `axios` directly.
- Follow the existing query-key factory pattern (`featureKeys.*`) for cache consistency.

**Forms**

- Use the shared `<Form>` component with a Zod schema. Do not reach for react-hook-form directly unless the form layout cannot be expressed with the render-prop API.

**Styling**

- Use Tailwind utility classes. Do not write custom CSS files.
- Use `cn()` from `@/lib` to merge conditional classes.
- Do not use inline `style` props except for dynamic values that Tailwind cannot express (e.g. chart colours).

**Components**

- Reusable UI primitives go in `src/components/ui/` (shadcn base).
- Feature-agnostic higher-level components go in `src/components/shared/`.
- Feature-specific components stay co-located with their feature.
- Do not add props to shared components "just in case" — only add what is immediately needed.

**Comments**

- Write no comments by default. Add one only when the _why_ is non-obvious to a future reader.

## Adding a new page

1. Create the file under the correct role directory (`super-admin/`, `tenant-admin/`, `user/`).
2. Add a loading skeleton at the same path (e.g. `page.tsx` → `loading.tsx`).
3. Add the route to the sidebar navigation config.
4. Add column definitions to `src/config/columns/<domain>.tsx` if the page has a table.
5. Add types to `src/types/<domain>.ts`.

## Adding a new component

## Pull requests

- Target `main`.
- PR title follows the same conventional-commit format as commit messages.
- Include a short description of _why_, not just _what_.
- Make sure `pnpm check` (lint + prettier) passes locally before opening a PR.
- One logical change per PR — split unrelated work into separate PRs.

## Package management

Always use `pnpm add` / `pnpm remove`. Never commit a `package-lock.json` or `yarn.lock`.
