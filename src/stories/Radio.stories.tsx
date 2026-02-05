import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "../components/radio";
import { Label } from "../components/label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};

export const ThreeOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d2" disabled />
        <Label htmlFor="d2" className="opacity-50">
          Disabled Option
        </Label>
      </div>
    </RadioGroup>
  ),
};

export const PlanSelection: Story = {
  render: () => (
    <RadioGroup defaultValue="pro" className="space-y-3">
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="free" id="plan-free" className="mt-1" />
        <div>
          <Label htmlFor="plan-free" className="font-medium">
            Free
          </Label>
          <p className="text-sm text-gray-500">Basic features for individuals</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="pro" id="plan-pro" className="mt-1" />
        <div>
          <Label htmlFor="plan-pro" className="font-medium">
            Pro
          </Label>
          <p className="text-sm text-gray-500">Advanced features for professionals</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="enterprise" id="plan-enterprise" className="mt-1" />
        <div>
          <Label htmlFor="plan-enterprise" className="font-medium">
            Enterprise
          </Label>
          <p className="text-sm text-gray-500">Custom solutions for large teams</p>
        </div>
      </div>
    </RadioGroup>
  ),
};
