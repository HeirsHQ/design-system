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
    hideTypeIcon: {
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

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const Email: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Search: Story = {
  args: {
    label: "Search",
    type: "search",
    placeholder: "Search...",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be your public display name",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "You can't edit this",
    disabled: true,
  },
};

export const DateInput: Story = {
  args: {
    label: "Date of Birth",
    type: "date",
  },
};

export const AllInputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="Enter email" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Search" type="search" placeholder="Search..." />
      <Input label="Date" type="date" />
      <Input label="Number" type="number" placeholder="Enter number" />
    </div>
  ),
};
