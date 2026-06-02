import type { Meta, StoryObj } from "@storybook/react-vite";

import { BarChart } from "../components/bar-chart.js";

const salesData = [
  { quarter: "Q1", mobile: 18400, desktop: 24200, tablet: 9800 },
  { quarter: "Q2", mobile: 22100, desktop: 28700, tablet: 11300 },
  { quarter: "Q3", mobile: 19800, desktop: 26400, tablet: 10600 },
  { quarter: "Q4", mobile: 31200, desktop: 35100, tablet: 14700 },
];

const series = [
  { key: "mobile", label: "Mobile" },
  { key: "desktop", label: "Desktop" },
  { key: "tablet", label: "Tablet" },
];

const meta: Meta<typeof BarChart> = {
  title: "Components/BarChart",
  component: BarChart,
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
  render: () => <BarChart data={salesData} series={series} xKey="quarter" />,
};

export const Horizontal: Story = {
  render: () => <BarChart data={salesData} series={series} xKey="quarter" layout="horizontal" height={350} />,
};

export const Stacked: Story = {
  render: () => <BarChart data={salesData} series={series} xKey="quarter" stacked />,
};

export const StackedHorizontal: Story = {
  render: () => <BarChart data={salesData} series={series} xKey="quarter" stacked layout="horizontal" height={350} />,
};

export const WithLegend: Story = {
  render: () => <BarChart data={salesData} series={series} xKey="quarter" showLegend />,
};

export const SingleSeries: Story = {
  render: () => (
    <BarChart data={salesData} series={[{ key: "desktop", label: "Desktop Sales", color: "hsl(217, 91%, 60%)" }]} xKey="quarter" showLegend />
  ),
};
