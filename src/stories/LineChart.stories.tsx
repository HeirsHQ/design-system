import type { Meta, StoryObj } from "@storybook/react-vite";

import { LineChart } from "../components/line-chart.js";

const weeklyData = [
  { week: "Wk 1", active: 1200, new: 340, churned: 80 },
  { week: "Wk 2", active: 1480, new: 420, churned: 140 },
  { week: "Wk 3", active: 1350, new: 290, churned: 420 },
  { week: "Wk 4", active: 1610, new: 510, churned: 250 },
  { week: "Wk 5", active: 1750, new: 380, churned: 240 },
  { week: "Wk 6", active: 1920, new: 460, churned: 290 },
  { week: "Wk 7", active: 2080, new: 510, churned: 350 },
  { week: "Wk 8", active: 2240, new: 590, churned: 430 },
];

const series = [
  { key: "active", label: "Active Users" },
  { key: "new", label: "New Users" },
  { key: "churned", label: "Churned" },
];

const meta: Meta<typeof LineChart> = {
  title: "Components/LineChart",
  component: LineChart,
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
  render: () => <LineChart data={weeklyData} series={series} xKey="week" />,
};

export const Curved: Story = {
  render: () => <LineChart data={weeklyData} series={series} xKey="week" curved />,
};

export const WithDots: Story = {
  render: () => <LineChart data={weeklyData} series={series} xKey="week" showDots />,
};

export const CurvedWithDots: Story = {
  render: () => <LineChart data={weeklyData} series={series} xKey="week" curved showDots />,
};

export const WithLegend: Story = {
  render: () => <LineChart data={weeklyData} series={series} xKey="week" curved showLegend />,
};

export const SingleSeries: Story = {
  render: () => (
    <LineChart
      data={weeklyData}
      series={[{ key: "active", label: "Active Users", color: "hsl(217, 91%, 60%)" }]}
      xKey="week"
      curved
      showDots
      showLegend
    />
  ),
};
