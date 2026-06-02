"use client";

import { CartesianGrid, Legend, Line, LineChart as RechartsLineChart, Tooltip, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "../components/chart.js";
import type { ChartDataPoint, LineChartProps } from "../types/chart.js";
import { seriesToChartConfig } from "../constants/colors.js";
import { cn } from "../lib/utils.js";

/**
 * Composable line chart built on shadcn + Recharts.
 * Supports curved interpolation and dot visibility.
 *
 * @example
 * <LineChart
 *   data={trendData}
 *   series={[{ key: "users", label: "Active Users" }]}
 *   xKey="date"
 *   curved
 * />
 */
export const LineChart = <T extends ChartDataPoint = ChartDataPoint>({
  data,
  series,
  xKey,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  curved = false,
  showDots = false,
}: LineChartProps<T>) => {
  const config = seriesToChartConfig(series);
  const curve = curved ? "monotone" : "linear";

  return (
    <ChartContainer className={cn("w-full", className)} config={config} style={{ height }}>
      <RechartsLineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={xKey} />
        <YAxis />
        {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
        {showLegend && <Legend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Line dataKey={s.key} dot={showDots} key={s.key} stroke={`var(--color-${s.key})`} strokeWidth={2} type={curve} />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
