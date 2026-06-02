import type { Meta, StoryObj } from "@storybook/react-vite";

import { PieChart } from "../components/pie-chart.js";

const categoryData = [
  { label: "Direct", value: 3820 },
  { label: "Organic Search", value: 2940 },
  { label: "Referral", value: 1860 },
  { label: "Social", value: 1240 },
  { label: "Email", value: 780 },
];

const meta: Meta<typeof PieChart> = {
  title: "Components/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PieChart data={categoryData} />,
};

export const Donut: Story = {
  render: () => <PieChart data={categoryData} innerRadius={60} />,
};

export const WithLegend: Story = {
  render: () => <PieChart data={categoryData} showLegend />,
};

export const DonutWithLegend: Story = {
  render: () => <PieChart data={categoryData} innerRadius={60} showLegend />,
};

export const CustomColors: Story = {
  render: () => (
    <PieChart
      data={[
        { label: "Direct", value: 3820, color: "hsl(217, 91%, 60%)" },
        { label: "Organic Search", value: 2940, color: "hsl(142, 71%, 45%)" },
        { label: "Referral", value: 1860, color: "hsl(38, 92%, 50%)" },
        { label: "Social", value: 1240, color: "hsl(291, 64%, 42%)" },
        { label: "Email", value: 780, color: "hsl(0, 84%, 60%)" },
      ]}
      innerRadius={70}
      showLegend
    />
  ),
};
