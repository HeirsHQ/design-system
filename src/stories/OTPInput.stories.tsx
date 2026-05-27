import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { OtpInput } from "../components/otp-input.js";

const meta: Meta<typeof OtpInput> = {
  title: "Components/OTPInput",
  component: OtpInput,
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
  render: function OTPExample() {
    const [value, setValue] = React.useState("");
    return <OtpInput length={6} value={value} onChange={setValue} />;
  },
};

export const FourDigits: Story = {
  render: function OTPFourDigits() {
    const [value, setValue] = React.useState("");
    return <OtpInput length={4} value={value} onChange={setValue} />;
  },
};

export const EightDigits: Story = {
  render: function OTPEightDigits() {
    const [value, setValue] = React.useState("");
    return <OtpInput length={8} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: function OTPDisabled() {
    const [value, setValue] = React.useState("123");
    return <OtpInput length={6} value={value} onChange={setValue} disabled />;
  },
};

export const WithLabel: Story = {
  render: function OTPWithLabel() {
    const [value, setValue] = React.useState("");
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Enter verification code</label>
        <OtpInput length={6} value={value} onChange={setValue} />
        <p className="text-sm text-gray-500">We sent a 6-digit code to your email</p>
      </div>
    );
  },
};
