import type { Meta, StoryObj } from "@storybook/react-vite";

import { Loader, ButtonLoader, PageLoader } from "../components/loader.js";
import { Button } from "../components/button.js";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse", "bar"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "spinner",
    size: "default",
  },
};

export const Spinner: Story = {
  args: {
    variant: "spinner",
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
  },
};

export const Pulse: Story = {
  args: {
    variant: "pulse",
  },
};

export const Bar: Story = {
  args: {
    variant: "bar",
  },
};

export const Small: Story = {
  args: {
    variant: "spinner",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    variant: "spinner",
    size: "lg",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loader variant="spinner" />
        <span className="text-xs text-gray-500">Spinner</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="dots" />
        <span className="text-xs text-gray-500">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="pulse" />
        <span className="text-xs text-gray-500">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="bar" />
        <span className="text-xs text-gray-500">Bar</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loader variant="spinner" size="sm" />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="spinner" size="default" />
        <span className="text-xs text-gray-500">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="spinner" size="lg" />
        <span className="text-xs text-gray-500">Large</span>
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <ButtonLoader />
        Submitting...
      </Button>
      <Button variant="outline" disabled>
        <ButtonLoader variant="dots" />
        Loading...
      </Button>
    </div>
  ),
};

export const FullPage: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="h-96">
      <PageLoader />
    </div>
  ),
};

export const FullPageDots: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="h-96">
      <PageLoader variant="dots" />
    </div>
  ),
};
