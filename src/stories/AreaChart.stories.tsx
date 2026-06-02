import type { Meta, StoryObj } from "@storybook/react-vite";

import { AreaChart } from "../components/area-chart.js";

const monthlyData = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 5800, expenses: 3100 },
  { month: "Mar", revenue: 4900, expenses: 2600 },
  { month: "Apr", revenue: 7200, expenses: 3900 },
  { month: "May", revenue: 6800, expenses: 3400 },
  { month: "Jun", revenue: 8100, expenses: 4200 },
  { month: "Jul", revenue: 7600, expenses: 3800 },
];

const series = [
  { key: "revenue", label: "Revenue" },
  { key: "expenses", label: "Expenses" },
];

const meta: Meta<typeof AreaChart> = {
  title: "Components/AreaChart",
  component: AreaChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AreaChart data={monthlyData} series={series} xKey="month" />,
};

export const Stacked: Story = {
  render: () => <AreaChart data={monthlyData} series={series} xKey="month" stacked />,
};

export const Curved: Story = {
  render: () => <AreaChart data={monthlyData} series={series} xKey="month" curved />,
};

export const WithLegend: Story = {
  render: () => <AreaChart data={monthlyData} series={series} xKey="month" showLegend />,
};

export const HighFillOpacity: Story = {
  render: () => <AreaChart data={monthlyData} series={series} xKey="month" fillOpacity={0.6} curved />,
};

export const SingleSeries: Story = {
  render: () => (
    <AreaChart data={monthlyData} series={[{ key: "revenue", label: "Revenue", color: "hsl(217, 91%, 60%)" }]} xKey="month" curved showLegend />
  ),
};
