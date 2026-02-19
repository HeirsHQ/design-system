import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { DatePicker, SimpleCalendar } from "../components/date-picker.js";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DatePickerExample() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />;
  },
};

export const WithSelectedDate: Story = {
  render: function DatePickerWithValue() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const CustomPlaceholder: Story = {
  render: function DatePickerCustom() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker value={date} onChange={setDate} placeholder="Select your birthday" />;
  },
};

export const DisabledDates: Story = {
  render: function DatePickerDisabled() {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();

    // Disable past dates
    const disablePastDates = (d: Date) => {
      return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Past dates are disabled</p>
        <DatePicker value={date} onChange={setDate} disabled={disablePastDates} placeholder="Select a future date" />
      </div>
    );
  },
};

export const CalendarOnly: Story = {
  render: function CalendarExample() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="rounded-md border">
        <SimpleCalendar selected={date} onSelect={setDate} />
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: function DatePickerWithLabel() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
        <DatePicker value={date} onChange={setDate} placeholder="Select your date of birth" />
        <p className="text-sm text-gray-500">We use this to verify your age</p>
      </div>
    );
  },
};
