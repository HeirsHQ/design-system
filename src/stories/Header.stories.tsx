import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header, HeaderLogo, HeaderNav, HeaderActions } from "../components/header.js";
import { Button } from "../components/button.js";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    sticky: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Header {...args}>
      <HeaderLogo>
        <span className="text-lg font-bold">MyApp</span>
      </HeaderLogo>
      <HeaderNav>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          Dashboard
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          Projects
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          Settings
        </a>
      </HeaderNav>
      <HeaderActions>
        <Button size="sm" variant="default-outline">
          Sign out
        </Button>
      </HeaderActions>
    </Header>
  ),
};

export const WithLogoImage: Story = {
  render: () => (
    <Header>
      <HeaderLogo>
        <div className="flex items-center gap-2">
          <div className="bg-primary-400 flex size-8 items-center justify-center rounded-md text-sm font-bold text-white">H</div>
          <span className="font-semibold">Heirs</span>
        </div>
      </HeaderLogo>
      <HeaderNav>
        <a href="#" className="text-primary-600 text-sm font-medium">
          Home
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          About
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
          Contact
        </a>
      </HeaderNav>
      <HeaderActions>
        <Button size="sm">Get Started</Button>
      </HeaderActions>
    </Header>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div className="h-150 overflow-y-auto">
      <Header sticky>
        <HeaderLogo>
          <span className="text-lg font-bold">StickyHeader</span>
        </HeaderLogo>
        <HeaderActions>
          <Button size="sm" variant="ghost">
            Menu
          </Button>
        </HeaderActions>
      </Header>
      <div className="space-y-4 p-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            Scroll down to see the sticky header in action. This is paragraph {i + 1}.
          </p>
        ))}
      </div>
    </div>
  ),
};

export const MinimalHeader: Story = {
  render: () => (
    <Header>
      <HeaderLogo>
        <span className="text-lg font-bold">Logo</span>
      </HeaderLogo>
      <HeaderActions>
        <Button size="sm" variant="ghost">
          Sign in
        </Button>
        <Button size="sm">Sign up</Button>
      </HeaderActions>
    </Header>
  ),
};
