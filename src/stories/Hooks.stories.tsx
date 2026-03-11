import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { useToggle } from "../hooks/use-toggle.js";
import { useDisclosure } from "../hooks/use-disclosure.js";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard.js";
import { useDebounce } from "../hooks/use-debounce.js";
import { useClickOutside } from "../hooks/use-click-outside.js";
import { useWindowSize } from "../hooks/use-window-size.js";
import { useMediaQuery } from "../hooks/use-media-query.js";
import { useLocalStorage } from "../hooks/use-local-storage.js";
import { useMounted } from "../hooks/use-mounted.js";
import { usePrevious } from "../hooks/use-previous.js";
import { useInterval } from "../hooks/use-interval.js";

const Wrapper = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

const meta: Meta<typeof Wrapper> = {
  title: "Hooks/Overview",
  component: Wrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-400">{children}</span>
);

const Value = ({ children }: { children: React.ReactNode }) => (
  <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{children}</span>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex w-80 flex-col gap-y-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
    <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{title}</h3>
    {children}
  </div>
);

export const UseToggle: Story = {
  name: "useToggle",
  render: () => {
    const [value, toggle] = useToggle(false);

    return (
      <Card title="useToggle">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label>State</Label>
            <Value>{value ? "ON" : "OFF"}</Value>
          </div>
          <div className="flex gap-x-2">
            <button onClick={() => toggle()} className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white dark:bg-white dark:text-neutral-900">
              Toggle
            </button>
            <button onClick={() => toggle(true)} className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white">
              Set ON
            </button>
            <button onClick={() => toggle(false)} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">
              Set OFF
            </button>
          </div>
        </div>
      </Card>
    );
  },
};

export const UseDisclosure: Story = {
  name: "useDisclosure",
  render: () => {
    const { isOpen, open, close, toggle } = useDisclosure();

    return (
      <Card title="useDisclosure">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label>State</Label>
            <Value>{isOpen ? "Open" : "Closed"}</Value>
          </div>
          <div className="flex gap-x-2">
            <button onClick={open} className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white">Open</button>
            <button onClick={close} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">Close</button>
            <button onClick={toggle} className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white dark:bg-white dark:text-neutral-900">Toggle</button>
          </div>
        </div>
      </Card>
    );
  },
};

export const UseCopyToClipboard: Story = {
  name: "useCopyToClipboard",
  render: () => {
    const { copiedValue, copy, isSuccess } = useCopyToClipboard(2000);

    return (
      <Card title="useCopyToClipboard">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label>Copied value</Label>
            <Value>{copiedValue ?? "—"}</Value>
          </div>
          <div>
            <Label>Status</Label>
            <Value>{isSuccess ? "Copied!" : "Idle"}</Value>
          </div>
          <button
            onClick={() => copy("Hello from Storybook!")}
            className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white dark:bg-white dark:text-neutral-900"
          >
            Copy "Hello from Storybook!"
          </button>
        </div>
      </Card>
    );
  },
};

export const UseDebounce: Story = {
  name: "useDebounce",
  render: () => {
    const [input, setInput] = useState("");
    const debouncedValue = useDebounce(input, 500);

    return (
      <Card title="useDebounce">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label>Instant value</Label>
            <Value>{input || "—"}</Value>
          </div>
          <div>
            <Label>Debounced value (500ms)</Label>
            <Value>{debouncedValue || "—"}</Value>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-neutral-800"
          />
        </div>
      </Card>
    );
  },
};

export const UseClickOutside: Story = {
  name: "useClickOutside",
  render: () => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(() => setCount((c) => c + 1), ref);

    return (
      <Card title="useClickOutside">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label>Outside clicks</Label>
            <Value>{count}</Value>
          </div>
          <div
            ref={ref}
            className="grid h-20 place-items-center rounded-lg border-2 border-dashed border-primary-300 bg-primary-50 dark:border-primary-700 dark:bg-primary-950/30"
          >
            <span className="text-sm text-primary-600 dark:text-primary-400">Click outside me</span>
          </div>
        </div>
      </Card>
    );
  },
};

export const UseWindowSize: Story = {
  name: "useWindowSize",
  render: () => {
    const { width, height } = useWindowSize();

    return (
      <Card title="useWindowSize">
        <div className="flex gap-x-6">
          <div>
            <Label>Width</Label>
            <Value>{width}px</Value>
          </div>
          <div>
            <Label>Height</Label>
            <Value>{height}px</Value>
          </div>
        </div>
        <p className="text-xs text-neutral-400">Resize the browser to see values update.</p>
      </Card>
    );
  },
};

export const UseMediaQuery: Story = {
  name: "useMediaQuery",
  render: () => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");
    const isDark = useMediaQuery("(prefers-color-scheme: dark)");

    return (
      <Card title="useMediaQuery">
        <div className="flex flex-col gap-y-1">
          {[
            { label: "Mobile (max-width: 640px)", value: isMobile },
            { label: "Tablet (max-width: 1024px)", value: isTablet },
            { label: "Prefers dark mode", value: isDark },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-1">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
              <span className={`text-sm font-medium ${value ? "text-green-600" : "text-red-500"}`}>{value ? "true" : "false"}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

export const UseLocalStorage: Story = {
  name: "useLocalStorage",
  render: () => {
    const [value, setValue, removeValue] = useLocalStorage("storybook-demo", "Hello!");

    return (
      <Card title="useLocalStorage">
        <div className="flex flex-col gap-y-2">
          <div>
            <Label>Stored value (key: "storybook-demo")</Label>
            <Value>{value}</Value>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-600 dark:bg-neutral-800"
          />
          <button onClick={removeValue} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">
            Remove from storage
          </button>
        </div>
      </Card>
    );
  },
};

export const UseMounted: Story = {
  name: "useMounted",
  render: () => {
    const isMounted = useMounted();

    return (
      <Card title="useMounted">
        <div>
          <Label>Is mounted</Label>
          <Value>{isMounted ? "true" : "false"}</Value>
        </div>
        <p className="text-xs text-neutral-400">Returns false during SSR and true after hydration.</p>
      </Card>
    );
  },
};

export const UsePrevious: Story = {
  name: "usePrevious",
  render: () => {
    const [count, setCount] = useState(0);
    const previous = usePrevious(count);

    return (
      <Card title="usePrevious">
        <div className="flex gap-x-6">
          <div>
            <Label>Current</Label>
            <Value>{count}</Value>
          </div>
          <div>
            <Label>Previous</Label>
            <Value>{previous ?? "—"}</Value>
          </div>
        </div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white dark:bg-white dark:text-neutral-900"
        >
          Increment
        </button>
      </Card>
    );
  },
};

function IntervalDemo() {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), 1000);

  return (
    <Card title="useInterval">
      <div className="flex flex-col gap-y-2">
        <div>
          <Label>Counter (1s interval)</Label>
          <Value>{count}</Value>
        </div>
        <p className="text-xs text-neutral-400">Counter increments every second automatically.</p>
      </div>
    </Card>
  );
}

export const UseInterval: Story = {
  name: "useInterval",
  render: () => <IntervalDemo />,
};
