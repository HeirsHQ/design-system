import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../components/input.js";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "date", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "You can't edit this",
    disabled: true,
  },
};

export const WithAriaInvalid: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
    "aria-invalid": true,
    defaultValue: "invalid-email",
  },
};

export const AllInputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Text</label>
        <Input type="text" placeholder="Enter text" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <Input type="email" placeholder="Enter email" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Date</label>
        <Input type="date" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Number</label>
        <Input type="number" placeholder="Enter number" />
      </div>
    </div>
  ),
};
