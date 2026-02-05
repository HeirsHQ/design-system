import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../components/progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
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
    value: 33,
  },
};

export const HalfComplete: Story = {
  args: {
    value: 50,
  },
};

export const AlmostComplete: Story = {
  args: {
    value: 80,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <p className="mb-2 text-sm text-gray-600">0%</p>
        <Progress value={0} />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">25%</p>
        <Progress value={25} />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">50%</p>
        <Progress value={50} />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">75%</p>
        <Progress value={75} />
      </div>
      <div>
        <p className="mb-2 text-sm text-gray-600">100%</p>
        <Progress value={100} />
      </div>
    </div>
  ),
};
