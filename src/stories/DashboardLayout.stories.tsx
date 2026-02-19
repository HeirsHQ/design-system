import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashboardLayout } from "../components/dashboard-layout";
import { Header, HeaderLogo, HeaderNav, HeaderActions } from "../components/header";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarItem } from "../components/sidebar";
import { Button } from "../components/button";

const meta: Meta<typeof DashboardLayout> = {
  title: "Components/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DashboardLayout
      sidebar={
        <Sidebar>
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
              <SidebarItem>Preferences</SidebarItem>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <span className="text-xs text-gray-400">v1.0.0</span>
          </SidebarFooter>
        </Sidebar>
      }
      header={
        <Header>
          <HeaderLogo>
            <span className="font-semibold">Dashboard</span>
          </HeaderLogo>
          <HeaderNav>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Overview
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Customers
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Products
            </a>
          </HeaderNav>
          <HeaderActions>
            <Button size="sm" variant="default-outline">
              Sign out
            </Button>
          </HeaderActions>
        </Header>
      }
    >
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Welcome back</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">$45,231</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold">2,350</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  ),
};

export const WithStickyHeader: Story = {
  render: () => (
    <DashboardLayout
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary-400 text-sm font-bold text-white">H</div>
              <span className="font-semibold">Heirs</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarItem active>Home</SidebarItem>
              <SidebarItem>Users</SidebarItem>
              <SidebarItem>Settings</SidebarItem>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      }
      header={
        <Header sticky>
          <HeaderLogo>
            <span className="font-semibold">Home</span>
          </HeaderLogo>
          <HeaderActions>
            <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">JD</div>
          </HeaderActions>
        </Header>
      }
    >
      <div className="space-y-4 p-6">
        <h1 className="text-2xl font-bold">Page Content</h1>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            This is content paragraph {i + 1}. Scroll to see the sticky header remain in place while the sidebar stays fixed.
          </p>
        ))}
      </div>
    </DashboardLayout>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <DashboardLayout
      header={
        <Header>
          <HeaderLogo>
            <span className="text-lg font-bold">No Sidebar</span>
          </HeaderLogo>
          <HeaderActions>
            <Button size="sm">Action</Button>
          </HeaderActions>
        </Header>
      }
    >
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Full Width Layout</h1>
        <p className="text-gray-600">This layout has no sidebar, only a header and content area.</p>
      </div>
    </DashboardLayout>
  ),
};

export const SidebarOnly: Story = {
  render: () => (
    <DashboardLayout
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <span className="text-lg font-bold">App</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarItem active>Dashboard</SidebarItem>
              <SidebarItem>Settings</SidebarItem>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      }
    >
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Sidebar Only</h1>
        <p className="text-gray-600">This layout has a sidebar but no header.</p>
      </div>
    </DashboardLayout>
  ),
};
