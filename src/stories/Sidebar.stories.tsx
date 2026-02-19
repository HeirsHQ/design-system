import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarItem } from "../components/sidebar.js";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact"],
    },
    collapsed: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-125">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <span className="text-lg font-bold">MyApp</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarItem active>Dashboard</SidebarItem>
          <SidebarItem>Analytics</SidebarItem>
          <SidebarItem>Reports</SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarItem>Account</SidebarItem>
          <SidebarItem>Billing</SidebarItem>
          <SidebarItem>Preferences</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-xs text-gray-400">v1.0.0</span>
      </SidebarFooter>
    </Sidebar>
  ),
};

export const Compact: Story = {
  render: () => (
    <Sidebar variant="compact">
      <SidebarHeader className="justify-center px-0">
        <div className="bg-primary-400 flex size-8 items-center justify-center rounded-md text-sm font-bold text-white">H</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem active className="justify-center px-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </SidebarItem>
          <SidebarItem className="justify-center px-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader className="justify-center px-0">
        <div className="bg-primary-400 flex size-8 items-center justify-center rounded-md text-sm font-bold text-white">H</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem active className="justify-center px-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

export const WithManyItems: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <span className="text-lg font-bold">Admin Panel</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarItem active>Dashboard</SidebarItem>
          <SidebarItem>Analytics</SidebarItem>
          <SidebarItem>Reports</SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarItem>Users</SidebarItem>
          <SidebarItem>Roles</SidebarItem>
          <SidebarItem>Permissions</SidebarItem>
          <SidebarItem>Teams</SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarItem>General</SidebarItem>
          <SidebarItem>Security</SidebarItem>
          <SidebarItem>Notifications</SidebarItem>
          <SidebarItem>Integrations</SidebarItem>
          <SidebarItem>API Keys</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">JD</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-gray-400">john@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  ),
};
