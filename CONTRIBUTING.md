# Contributing to Heirs Design System

Thank you for your interest in contributing to the Heirs Design System. This document provides guidelines and instructions for contributing to this internal package.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Adding Components](#adding-components)
- [Adding Hooks](#adding-hooks)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Versioning](#versioning)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Access to GitHub Packages (with `read:packages` scope)

### Available Scripts

| Command                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| `npm run build`          | Compile TypeScript to JavaScript              |
| `npm run typecheck`      | Run TypeScript type checking without emitting |
| `npm run lint`           | Run ESLint on source files                    |
| `npm run prettier:write` | Format source files with Prettier             |
| `npm run prettier:check` | Check if files are formatted correctly        |

## Project Structure

```
heirs-design-system/
├── src/
│   ├── components/     # UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts    # Component exports
│   ├── hooks/          # Custom React hooks
│   │   ├── use-debounce.ts
│   │   └── index.ts    # Hook exports
│   ├── icons/          # SVG icon components
│   │   ├── icon-base.tsx
│   │   └── index.ts    # Icon exports
│   ├── lib/            # Utility functions
│   │   ├── utils.ts    # cn() and other utilities
│   │   └── index.ts    # Utility exports
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts    # Type exports
│   ├── constants/      # Constants and configuration
│   │   └── index.ts    # Constant exports
│   └── index.ts        # Main entry point
├── dist/               # Compiled output (git-ignored)
├── package.json
├── tsconfig.json
├── eslint.config.js
└── .prettierrc
```

## Adding Components

### 1. Create the Component File

Create a new file in `src/components/` following the naming convention `component-name.tsx`:

````tsx
// src/components/my-component.tsx
import * as React from "react";
import { cn } from "../lib/utils.js";

/**
 * MyComponent props.
 */
export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Description of the variant prop */
  variant?: "default" | "secondary";
}

/**
 * A brief description of what MyComponent does.
 *
 * @example
 * ```tsx
 * <MyComponent variant="default">Content</MyComponent>
 * ```
 */
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("base-classes-here", variant === "secondary" && "secondary-classes", className)} {...props}>
      {children}
    </div>
  );
});
MyComponent.displayName = "MyComponent";

export { MyComponent };
````

### 2. Export the Component

Add the export to `src/components/index.ts`:

```ts
export * from "./my-component.js";
```

### 3. Component Guidelines

- Use `React.forwardRef` for all components that render DOM elements
- Set `displayName` for better debugging
- Use the `cn()` utility for class name merging
- Include JSDoc comments with `@example` blocks
- Export both the component and its props interface
- Use Tailwind CSS classes for styling
- Follow existing patterns in the codebase

## Adding Hooks

### 1. Create the Hook File

Create a new file in `src/hooks/` following the naming convention `use-hook-name.ts`:

````ts
// src/hooks/use-my-hook.ts
import { useState, useCallback } from "react";

/**
 * A brief description of what this hook does.
 *
 * @param initialValue - Description of the parameter
 * @returns Description of the return value
 *
 * @example
 * ```tsx
 * const { value, setValue } = useMyHook("initial");
 * ```
 */
export function useMyHook<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, setValue, reset };
}
````

### 2. Export the Hook

Add the export to `src/hooks/index.ts`:

```ts
export * from "./use-my-hook.js";
```

### 3. Hook Guidelines

- Prefix all hooks with `use`
- Include comprehensive JSDoc documentation
- Handle cleanup in `useEffect` hooks
- Consider SSR compatibility (use `useIsomorphicLayoutEffect` when needed)
- Export the hook as a named export

## Code Style

### TypeScript

- Enable strict mode (already configured in `tsconfig.json`)
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` - use `unknown` if the type is truly unknown

### React

- Use functional components with hooks
- Use `React.forwardRef` for components that need ref forwarding
- Destructure props in function parameters
- Use `React.ComponentPropsWithoutRef<"element">` for extending HTML element props

### Styling

- Use Tailwind CSS utility classes
- Use the `cn()` utility for conditional classes
- Use CSS variables for theming when appropriate
- Follow mobile-first responsive design

### Formatting

Code is automatically formatted with Prettier. Run before committing:

```bash
npm run prettier:write
```

Configuration is in `.prettierrc`:

- Uses Tailwind CSS plugin for class sorting
- Configured for the project's needs

## Commit Guidelines

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type       | Description                           |
| ---------- | ------------------------------------- |
| `feat`     | New feature                           |
| `fix`      | Bug fix                               |
| `docs`     | Documentation changes                 |
| `style`    | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring                      |
| `test`     | Adding or updating tests              |
| `chore`    | Maintenance tasks                     |

### Examples

```
feat(button): add loading state variant

fix(input): resolve focus ring not showing on error state

docs(readme): update installation instructions

refactor(hooks): extract common logic to useEventListener
```

## Pull Request Process

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make your changes** following the guidelines above

3. **Run checks** before committing:

   ```bash
   npm run typecheck
   npm run lint
   npm run prettier:check
   npm run build
   ```

4. **Commit your changes** following the commit guidelines

5. **Push your branch** and create a pull request

6. **PR Requirements**:
   - Clear description of changes
   - All checks passing
   - Code review approval from at least one team member
   - No merge conflicts with `main`

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Releasing a New Version

#### Option 1: Automated Release (Recommended)

1. Ensure all changes are merged to `main`
2. Go to GitHub Actions → **Publish Package** → **Run workflow**
3. Select the version bump type (patch/minor/major)
4. The workflow will:
   - Run quality checks
   - Bump the version
   - Create a git tag
   - Publish to npm
5. Update `CHANGELOG.md` with the new version's changes

#### Option 2: GitHub Release

1. Create a new Release on GitHub
2. Tag it with the version (e.g., `v1.0.1`)
3. The publish workflow triggers automatically

#### Option 3: Manual Release

1. Ensure all changes are merged to `main`
2. Update the version:
   ```bash
   npm version patch  # or minor, or major
   ```
3. Push the tag:
   ```bash
   git push --follow-tags
   ```
4. Publish to GitHub Packages:
   ```bash
   npm publish
   ```
5. Update `CHANGELOG.md` with the new version's changes

## Questions?

For questions or support, create an issue in the repository.
