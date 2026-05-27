import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { DatePicker } from "../components/date-picker.js";
import type { DateRange } from "../components/calendar.js";

const meta: Meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDate: Story = {
  render: function SingleDateExample() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker type="single" value={date} onValueChange={setDate} placeholder="Pick a date" />;
  },
};

export const WithSelectedDate: Story = {
  render: function DatePickerWithValue() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <DatePicker type="single" value={date} onValueChange={setDate} />;
  },
};

export const WithLabel: Story = {
  render: function DatePickerWithLabel() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker type="single" value={date} onValueChange={setDate} label="Date of Birth" placeholder="Select your date of birth" />;
  },
};

export const DisabledPicker: Story = {
  render: function DatePickerDisabled() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker type="single" value={date} onValueChange={setDate} disabled placeholder="Disabled" />;
  },
};

export const WithMinMaxDate: Story = {
  render: function DatePickerMinMax() {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Only dates within the next 30 days are selectable</p>
        <DatePicker type="single" value={date} onValueChange={setDate} minDate={today} maxDate={nextMonth} placeholder="Select a date" />
      </div>
    );
  },
};

export const RangePicker: Story = {
  render: function DateRangeExample() {
    const [range, setRange] = React.useState<DateRange>({ from: undefined, to: undefined });
    return <DatePicker type="range" value={range} onValueChange={setRange} />;
  },
};

export const RangePickerWithLabel: Story = {
  render: function DateRangeWithLabelExample() {
    const [range, setRange] = React.useState<DateRange>({ from: undefined, to: undefined });
    return (
      <DatePicker type="range" value={range} onValueChange={setRange} label="Date Range" placeholderFrom="Start date" placeholderTo="End date" />
    );
  },
};
