import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../components/button.js";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "default-outline",
        "danger",
        "danger-outline",
        "success",
        "success-outline",
        "info",
        "info-outline",
        "warning",
        "warning-outline",
        "secondary",
        "secondary-outline",
        "ghost",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

export const DefaultOutline: Story = {
  args: {
    children: "Button",
    variant: "default-outline",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
  },
};

export const DangerOutline: Story = {
  args: {
    children: "Delete",
    variant: "danger-outline",
  },
};

export const Success: Story = {
  args: {
    children: "Save",
    variant: "success",
  },
};

export const SuccessOutline: Story = {
  args: {
    children: "Save",
    variant: "success-outline",
  },
};

export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
  },
};

export const InfoOutline: Story = {
  args: {
    children: "Info",
    variant: "info-outline",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const WarningOutline: Story = {
  args: {
    children: "Warning",
    variant: "warning-outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const SecondaryOutline: Story = {
  args: {
    children: "Secondary",
    variant: "secondary-outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="default-outline">Default Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="danger-outline">Danger Outline</Button>
      <Button variant="success">Success</Button>
      <Button variant="success-outline">Success Outline</Button>
      <Button variant="info">Info</Button>
      <Button variant="info-outline">Info Outline</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="warning-outline">Warning Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary-outline">Secondary Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
