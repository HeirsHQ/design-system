import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper } from "../components/stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    current: {
      control: { type: "number", min: 0, max: 4 },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { index: 0, label: "Account", description: "Create your account" },
  { index: 1, label: "Profile", description: "Set up your profile" },
  { index: 2, label: "Review", description: "Review and confirm" },
];

export const Default: Story = {
  args: {
    current: 0,
    steps: defaultSteps,
  },
};

export const SecondStep: Story = {
  args: {
    current: 1,
    steps: defaultSteps,
  },
};

export const AllCompleted: Story = {
  args: {
    current: 3,
    steps: defaultSteps,
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  args: {
    current: 1,
    steps: defaultSteps,
    orientation: "vertical",
  },
};

export const Clickable: Story = {
  args: {
    current: 1,
    steps: defaultSteps,
    onStepChange: (step: number) => {
      console.log("Step clicked:", step);
    },
  },
};

export const ManySteps: Story = {
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
  args: {
    current: 2,
    steps: [
      { index: 0, label: "Cart", description: "Review items" },
      { index: 1, label: "Shipping", description: "Enter address" },
      { index: 2, label: "Payment", description: "Payment method" },
      { index: 3, label: "Review", description: "Confirm order" },
      { index: 4, label: "Complete", description: "Order placed" },
    ],
  },
};

export const NoDescriptions: Story = {
  args: {
    current: 1,
    steps: [
      { index: 0, label: "Step 1" },
      { index: 1, label: "Step 2" },
      { index: 2, label: "Step 3" },
    ],
  },
};
