import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "../components/toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toast open>
      <div className="grid gap-1">
        <ToastTitle>Scheduled: Catch up</ToastTitle>
        <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Toast open>
      <div className="grid gap-1">
        <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
        <ToastDescription>There was a problem with your request.</ToastDescription>
      </div>
      <ToastAction altText="Try again">Try again</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const Success: Story = {
  render: () => (
    <Toast open variant="success">
      <div className="grid gap-1">
        <ToastTitle>Success!</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Danger: Story = {
  render: () => (
    <Toast open variant="danger">
      <div className="grid gap-1">
        <ToastTitle>Error</ToastTitle>
        <ToastDescription>Failed to delete the item.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Info: Story = {
  render: () => (
    <Toast open variant="info">
      <div className="grid gap-1">
        <ToastTitle>Info</ToastTitle>
        <ToastDescription>A new version is available.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast open variant="warning">
      <div className="grid gap-1">
        <ToastTitle>Warning</ToastTitle>
        <ToastDescription>Your session will expire in 5 minutes.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast open variant="default" className="relative">
        <div className="grid gap-1">
          <ToastTitle>Default Toast</ToastTitle>
          <ToastDescription>This is the default style.</ToastDescription>
        </div>
      </Toast>
      <Toast open variant="success" className="relative">
        <div className="grid gap-1">
          <ToastTitle>Success Toast</ToastTitle>
          <ToastDescription>Operation completed successfully.</ToastDescription>
        </div>
      </Toast>
      <Toast open variant="danger" className="relative">
        <div className="grid gap-1">
          <ToastTitle>Error Toast</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
        </div>
      </Toast>
      <Toast open variant="info" className="relative">
        <div className="grid gap-1">
          <ToastTitle>Info Toast</ToastTitle>
          <ToastDescription>Here is some information.</ToastDescription>
        </div>
      </Toast>
      <Toast open variant="warning" className="relative">
        <div className="grid gap-1">
          <ToastTitle>Warning Toast</ToastTitle>
          <ToastDescription>Please be careful.</ToastDescription>
        </div>
      </Toast>
    </div>
  ),
};
