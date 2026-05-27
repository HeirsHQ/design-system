import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/card.js";
import { Button } from "../components/button.js";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card. You can put any content here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Fill out the form below to get started with your new account.</p>
      </CardContent>
      <CardFooter>
        <Button>Create Account</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card>
      <CardContent className="pt-6">
        <p>A simple card with just content and no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium">New message from John</p>
              <p className="text-sm text-gray-500">Hey, how are you doing?</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium">Meeting reminder</p>
              <p className="text-sm text-gray-500">Team standup in 30 minutes</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View all
        </Button>
      </CardFooter>
    </Card>
  ),
};
