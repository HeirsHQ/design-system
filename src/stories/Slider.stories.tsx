import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../components/slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
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
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const WithSteps: Story = {
  args: {
    defaultValue: [25],
    max: 100,
    step: 25,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
};

export const VolumeControl: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label className="text-sm font-medium text-gray-700">Volume</label>
      <Slider defaultValue={[75]} max={100} step={1} />
    </div>
  ),
};
