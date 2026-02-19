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
  args: {
    label: "Message",
    placeholder: "Type your message here...",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    helperText: "Maximum 500 characters",
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description",
    error: "Description is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Notes",
    placeholder: "Enter notes",
    disabled: true,
  },
};
