import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "../components/separator.js";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Heirs Design System</h4>
        <p className="text-sm text-gray-500">A reusable component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
        <Separator orientation="vertical" />
        <div>Support</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64">
      <div className="py-2">Item 1</div>
      <Separator />
      <div className="py-2">Item 2</div>
      <Separator />
      <div className="py-2">Item 3</div>
    </div>
  ),
};
