# Heirs Design System

A modern, accessible React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## Features

- **Accessible** - Built on Radix UI primitives with full keyboard navigation and screen reader support
- **Customizable** - Styled with Tailwind CSS for easy theming and customization
- **Type-safe** - Written in TypeScript with full type definitions
- **Tree-shakeable** - Import only what you need
- **Modern** - ES Modules with React 18+ support

## Installation

### Option 1: shadcn CLI (Recommended)

Add individual components using the shadcn CLI:

```bash
# Add a single component
npx shadcn@latest add https://heirshq.github.io/heirs-design-system/r/button.json

# Add multiple components
npx shadcn@latest add https://heirshq.github.io/heirs-design-system/r/button.json https://heirshq.github.io/heirs-design-system/r/input.json
```

Or configure as a custom registry in your project:

```json
// components.json
{
  "registries": {
    "heirs": {
      "url": "https://heirshq.github.io/heirs-design-system/r"
    }
  }
}
```

Then add components:

```bash
npx shadcn@latest add heirs/button
npx shadcn@latest add heirs/input
npx shadcn@latest add heirs/select
```

### Option 2: npm Package

Install the full package from GitHub Packages:

```bash
npm install @HeirsHQ/heirs-design-system
```

> **Note:** Ensure your `.npmrc` is configured to authenticate with GitHub Packages:
>
> ```
> @HeirsHQ:registry=https://npm.pkg.github.com
> //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
> ```
>
> Your token needs the `read:packages` scope.

### Peer Dependencies

This library requires React 18 or higher. These should already be installed in your project:

```bash
npm install react react-dom
```

### Tailwind CSS v4 Setup

This library uses Tailwind CSS v4 for styling. You must configure Tailwind to scan the package's compiled files so that the component styles are included in your CSS output.

#### Option 1: CSS `@source` Directive (Recommended)

In your main CSS file, add the `@source` directive to include the package:

```css
@import "tailwindcss";

/* Include the design system package for Tailwind to scan */
@source "@HeirsHQ/heirs-design-system";
```

#### Option 2: Vite with `@tailwindcss/vite`

If using Vite, configure the Tailwind plugin to include the package:

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Then in your CSS file:

```css
@import "tailwindcss";
@source "@HeirsHQ/heirs-design-system";
```

#### Option 3: PostCSS with `@tailwindcss/postcss`

For projects using PostCSS, add to your `postcss.config.js`:

```js
// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Then in your CSS file:

```css
@import "tailwindcss";
@source "@HeirsHQ/heirs-design-system";
```

#### Option 4: CLI

If using the Tailwind CLI directly:

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css
```

With your CSS file containing:

```css
@import "tailwindcss";
@source "@HeirsHQ/heirs-design-system";
```

## Usage

### With shadcn CLI (components copied to your project)

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <h2>Login</h2>
      </CardHeader>
      <CardContent>
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input label="Password" type="password" placeholder="Enter your password" error="Password is required" />
        <Button>Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

### With npm package

```tsx
import { Button, Input, Card, CardHeader, CardContent } from "@HeirsHQ/heirs-design-system";

function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <h2>Login</h2>
      </CardHeader>
      <CardContent>
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input label="Password" type="password" placeholder="Enter your password" error="Password is required" />
        <Button>Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Form Components

| Component    | Description                                           |
| ------------ | ----------------------------------------------------- |
| `Button`     | Clickable button with multiple variants and sizes     |
| `Input`      | Text input with label, error, and helper text support |
| `Textarea`   | Multi-line text input                                 |
| `Label`      | Accessible form label                                 |
| `Checkbox`   | Checkbox input with indeterminate state support       |
| `Switch`     | Toggle switch for boolean values                      |
| `Select`     | Dropdown select with search and multi-select support  |
| `Radio`      | Radio button group                                    |
| `Slider`     | Range slider input                                    |
| `Toggle`     | Toggle button                                         |
| `OTPInput`   | One-time password input                               |
| `DatePicker` | Date selection component                              |

### Layout Components

| Component    | Description                                         |
| ------------ | --------------------------------------------------- |
| `Card`       | Container with header, content, and footer sections |
| `Separator`  | Visual divider                                      |
| `ScrollArea` | Custom scrollable container                         |
| `Table`      | Data table with header, body, and footer            |
| `Tabs`       | Tabbed interface                                    |
| `Breadcrumb` | Navigation breadcrumbs                              |
| `Pagination` | Page navigation                                     |

### Overlay Components

| Component      | Description                           |
| -------------- | ------------------------------------- |
| `Dialog`       | Modal dialog                          |
| `Sheet`        | Slide-out panel                       |
| `Popover`      | Floating content panel                |
| `DropdownMenu` | Dropdown menu with items and submenus |
| `Tooltip`      | Informational tooltip                 |
| `Toast`        | Notification toast messages           |
| `Accordion`    | Expandable content sections           |

### Data Display Components

| Component  | Description               |
| ---------- | ------------------------- |
| `Progress` | Progress bar              |
| `Avatar`   | User avatar with fallback |
| `Badge`    | Status badge              |

## Hooks

The library includes a collection of useful React hooks:

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
| `useLocalStorage`           | Persist state to localStorage        |
| `useMediaQuery`             | Respond to media queries             |
| `useMockApiCall`            | Simulate API calls for testing       |
| `useMounted`                | Check if component is mounted        |
| `usePrevious`               | Get previous value of a variable     |
| `usePrint`                  | Print functionality                  |
| `useScrollLock`             | Lock body scroll                     |
| `useToggle`                 | Toggle boolean state                 |
| `useWindowSize`             | Track window dimensions              |

## Icons

The library includes `Outline` and `Solid` variants of icons:

| Icon | Usage |
|------|-------|
| `HtAddOutline` / `HtAddSolid` | Add/plus icon |
| `HtCalendarOutline` / `HtCalendarSolid` | Calendar icon |
| `HtCheckOutline` / `HtCheckSolid` | Checkmark icon |
| `HtChevronDownOutline` / `HtChevronDownSolid` | Chevron down |
| `HtChevronRightOutline` / `HtChevronRightSolid` | Chevron right |
| `HtChevronUpOutline` / `HtChevronUpSolid` | Chevron up |
| `HtEyeOutline` / `HtEyeSolid` | Eye (show) icon |
| `HtEyeOffOutline` / `HtEyeOffSolid` | Eye off (hide) icon |
| `HtLockOutline` / `HtLockSolid` | Lock icon |
| `HtMailOutline` / `HtMailSolid` | Mail/email icon |
| `HtMinusOutline` / `HtMinusSolid` | Minus icon |
| `HtSearchOutline` / `HtSearchSolid` | Search icon |

```tsx
import { HtCalendarOutline, HtCheckSolid } from "@HeirsHQ/heirs-design-system";

<HtCalendarOutline className="h-5 w-5" />
```

## Utilities

### `cn()` - Class Name Utility

Merge Tailwind CSS classes with proper precedence:

```tsx
import { cn } from "@HeirsHQ/heirs-design-system";

const className = cn("px-4 py-2 rounded", isActive && "bg-blue-500", className);
```

## Development

```bash
# Install dependencies
npm install

# Type check
npm run typecheck

# Build package
npm run build

# Build shadcn registry
npm run build:registry

# Lint
npm run lint

# Format code
npm run prettier:write
```

## Requirements

- React 18.0.0 or higher
- React DOM 18.0.0 or higher
- Tailwind CSS v4 (for styling)

## Browser Support

This library supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## CI/CD

This project uses GitHub Actions for continuous integration and deployment.

### Automated Workflows

| Workflow     | Trigger                   | Description                                       |
| ------------ | ------------------------- | ------------------------------------------------- |
| **CI**       | Push to `main`, PRs       | Runs typecheck, lint, formatting check, and build |
| **Publish**  | Release published, Manual | Publishes package to GitHub Packages              |
| **Registry** | Push to `main`, Manual    | Builds and deploys shadcn registry to GitHub Pages |

### Publishing

#### Automatic (Recommended)

1. Create a GitHub Release with a version tag (e.g., `v1.0.1`)
2. The publish workflow will automatically run and publish to GitHub Packages

Or trigger manually:

1. Go to Actions → Publish Package → Run workflow
2. Select version bump type (patch/minor/major)

#### Manual

```bash
# Update version
npm version patch  # or minor, or major

# Build and publish
npm publish
```

### Required Secrets

No additional secrets required. The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions with `packages: write` permission.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing to this package.

## License

This is proprietary software owned by Heirs Technologies. For internal use only. See [LICENSE](./LICENSE) for details.
