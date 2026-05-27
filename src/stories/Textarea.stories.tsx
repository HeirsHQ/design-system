import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "../components/textarea.js";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
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
    placeholder: "Type your message here...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-1">
      <label className="text-sm font-medium text-gray-700">Message</label>
      <Textarea placeholder="Type your message here..." />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="w-80 space-y-1">
      <label className="text-sm font-medium text-gray-700">Bio</label>
      <Textarea placeholder="Tell us about yourself" />
      <p className="text-sm text-gray-500">Maximum 500 characters</p>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80 space-y-1">
      <label className="text-sm font-medium text-gray-700">Description</label>
      <Textarea placeholder="Enter description" aria-invalid />
      <p className="text-sm text-red-500">Description is required</p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Enter notes",
    disabled: true,
  },
};
