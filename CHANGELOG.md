# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Chart Components** — composable chart wrappers built on shadcn + Recharts
  - `AreaChart` — area chart with optional stacking and fill opacity control
  - `BarChart` — bar chart supporting horizontal/vertical layout and stacking
  - `LineChart` — line chart with curved interpolation and dot visibility options
  - `PieChart` — pie/donut chart with configurable inner radius
- **Chart types** — `ChartDataPoint`, `ChartSeries`, `BaseChartProps`, `BarChartProps`, `LineChartProps`, `AreaChartProps`, `PieChartDataPoint`, `PieChartProps`
- **Chart utilities** — `DEFAULT_COLORS`, `toColorKey`, `seriesToChartConfig`, `pieDataToChartConfig`

### Changed

- README trimmed to installation and usage documentation only
- `.npmrc` auth token now uses `${NPM_TOKEN}` environment variable instead of a hardcoded placeholder, making the file safe to commit

---

## [1.0.0] - 2024

### Added

#### Components

- **Form Components**
  - `Button` - Clickable button with variants (default, destructive, outline, secondary, ghost, link) and sizes
  - `Input` - Text input with label, error message, and helper text support
  - `Textarea` - Multi-line text input with label and validation support
  - `Label` - Accessible form label component
  - `Checkbox` - Checkbox with indeterminate state support
  - `Switch` - Toggle switch component
  - `Select` - Dropdown select with trigger, content, item, and group components
  - `Radio` - Radio button group
  - `Slider` - Range slider input
  - `Toggle` - Toggle button with pressed state
  - `OTPInput` - One-time password input with configurable length
  - `DatePicker` - Date selection component

- **Layout Components**
  - `Card` - Container with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
  - `Separator` - Visual divider (horizontal/vertical)
  - `ScrollArea` - Custom scrollable container with styled scrollbar
  - `Table` - Data table with `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`
  - `Tabs` - Tabbed interface with `TabsList`, `TabsTrigger`, `TabsContent`
  - `Breadcrumb` - Navigation breadcrumbs with `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`
  - `Pagination` - Page navigation with `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`

- **Overlay Components**
  - `Dialog` - Modal dialog with `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`
  - `Sheet` - Slide-out panel with configurable side (top, right, bottom, left)
  - `Popover` - Floating content panel
  - `DropdownMenu` - Dropdown menu with items, checkboxes, radio items, and submenus
  - `Tooltip` - Informational tooltip
  - `Toast` - Notification system with `Toaster` and `useToast` hook
  - `Accordion` - Expandable content sections

- **Data Display Components**
  - `Progress` - Progress bar with value indicator
  - `Avatar` - User avatar with `AvatarImage` and `AvatarFallback`
  - `Badge` - Status badge with variants

#### Hooks

- `useClickOutside` - Detect clicks outside an element
- `useControllableState` - Manage controlled/uncontrolled component state
- `useCopyToClipboard` - Copy text to clipboard
- `useDebounce` - Debounce rapidly changing values
- `useDisclosure` - Manage open/close state for modals, dropdowns, etc.
- `useDraggableComponent` - Make elements draggable
- `useEventListener` - Add event listeners with automatic cleanup
- `useFileHandler` - Handle file uploads with validation
- `useFocusTrap` - Trap focus within an element for accessibility
- `useInterval` - Set up intervals with automatic cleanup
- `useIsomorphicLayoutEffect` - Layout effect that works with SSR
- `useLocalStorage` - Persist state to localStorage with SSR support
- `useMediaQuery` - Respond to CSS media queries
- `useMockApiCall` - Simulate API calls for testing/prototyping
- `useMounted` - Check if component is mounted
- `usePrevious` - Get previous value of a variable
- `usePrint` - Print functionality using react-to-print
- `useScrollLock` - Lock body scroll (useful for modals)
- `useToggle` - Toggle boolean state
- `useWindowSize` - Track window dimensions

#### Icons

- `IconBase` - Base SVG icon component
- `IconAdd` - Plus/add icon with size variants
- `IconEye` - Eye/visibility icon
- `IconEyeOff` - Hidden/visibility off icon
- `IconLock` - Lock/security icon
- `IconMail` - Email icon
- `IconMinus` - Minus/remove icon
- `IconSearch` - Search/magnifier icon

#### Utilities

- `cn()` - Tailwind CSS class name merge utility (clsx + tailwind-merge)
- Number formatting utilities
- String manipulation utilities

#### Infrastructure

- TypeScript configuration with strict mode
- ESLint configuration with React Hooks plugin
- Prettier configuration with Tailwind CSS plugin
- ES Modules build output with source maps
- Full TypeScript declaration files
- GitHub Actions CI workflow (typecheck, lint, format, build)
- GitHub Actions publish workflow (automated npm publishing)

### Technical Details

- Built with React 18+ (peer dependency)
- Radix UI primitives for accessibility
- Tailwind CSS for styling
- Class Variance Authority (CVA) for component variants
- TypeScript 5.9+ with strict mode
- Tailwind CSS v4 for styling
- Proprietary license for internal use only
