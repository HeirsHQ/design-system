import type { Meta, StoryObj } from "@storybook/react-vite";

import { OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator } from "../components/otp-input.js";

const meta: Meta<typeof OTPInput> = {
  title: "Components/OTPInput",
  component: OTPInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    length: {
      control: { type: "number", min: 4, max: 8 },
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <OTPInput length={6}>
      <OTPInputGroup>
        <OTPInputSlot index={0} />
        <OTPInputSlot index={1} />
        <OTPInputSlot index={2} />
      </OTPInputGroup>
      <OTPInputSeparator />
      <OTPInputGroup>
        <OTPInputSlot index={3} />
        <OTPInputSlot index={4} />
        <OTPInputSlot index={5} />
      </OTPInputGroup>
    </OTPInput>
  ),
};

export const FourDigits: Story = {
  render: () => (
    <OTPInput length={4}>
      <OTPInputGroup>
        <OTPInputSlot index={0} />
        <OTPInputSlot index={1} />
        <OTPInputSlot index={2} />
        <OTPInputSlot index={3} />
      </OTPInputGroup>
    </OTPInput>
  ),
};

export const WithSeparators: Story = {
  render: () => (
    <OTPInput length={6}>
      <OTPInputGroup>
        <OTPInputSlot index={0} />
        <OTPInputSlot index={1} />
      </OTPInputGroup>
      <OTPInputSeparator />
      <OTPInputGroup>
        <OTPInputSlot index={2} />
        <OTPInputSlot index={3} />
      </OTPInputGroup>
      <OTPInputSeparator />
      <OTPInputGroup>
        <OTPInputSlot index={4} />
        <OTPInputSlot index={5} />
      </OTPInputGroup>
    </OTPInput>
  ),
};

export const Disabled: Story = {
  render: () => (
    <OTPInput length={6} disabled>
      <OTPInputGroup>
        <OTPInputSlot index={0} />
        <OTPInputSlot index={1} />
        <OTPInputSlot index={2} />
      </OTPInputGroup>
      <OTPInputSeparator />
      <OTPInputGroup>
        <OTPInputSlot index={3} />
        <OTPInputSlot index={4} />
        <OTPInputSlot index={5} />
      </OTPInputGroup>
    </OTPInput>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Enter verification code</label>
      <OTPInput length={6}>
        <OTPInputGroup>
          <OTPInputSlot index={0} />
          <OTPInputSlot index={1} />
          <OTPInputSlot index={2} />
        </OTPInputGroup>
        <OTPInputSeparator />
        <OTPInputGroup>
          <OTPInputSlot index={3} />
          <OTPInputSlot index={4} />
          <OTPInputSlot index={5} />
        </OTPInputGroup>
      </OTPInput>
      <p className="text-sm text-gray-500">We sent a 6-digit code to your email</p>
    </div>
  ),
};
