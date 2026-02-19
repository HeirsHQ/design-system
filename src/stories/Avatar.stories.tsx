import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarImage, AvatarFallback } from "../components/avatar.js";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://invalid-url.com/image.png" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const MultipleAvatars: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="border-2 border-white">
        <AvatarFallback className="bg-blue-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarFallback className="bg-green-500 text-white">CD</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarFallback className="bg-purple-500 text-white">EF</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarFallback className="text-lg">LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};
