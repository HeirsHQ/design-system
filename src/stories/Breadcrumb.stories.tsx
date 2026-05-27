import type { Meta, StoryObj } from "@storybook/react-vite";

import { Breadcrumb } from "../components/breadcrumb.js";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current Page" }],
  },
};

export const WithHomeIcon: Story = {
  args: {
    items: [{ label: "Products", href: "/products" }, { label: "Category", href: "/products/category" }, { label: "Current Page" }],
    showHome: true,
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/dashboard/settings" },
      { label: "Profile", href: "/dashboard/settings/profile" },
      { label: "Edit" },
    ],
  },
};

export const WithCollapsedItems: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/dashboard/settings" },
      { label: "Profile", href: "/dashboard/settings/profile" },
      { label: "Edit" },
    ],
    maxItems: 3,
  },
};
