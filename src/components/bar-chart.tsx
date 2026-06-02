"use client";

import { Bar, BarChart as RechartsBarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "../components/chart.js";
import type { BarChartProps, ChartDataPoint } from "../types/chart.js";
import { seriesToChartConfig } from "../constants/colors.js";
import { cn } from "../lib/utils.js";

const formatAxisTick = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return String(value);
};

export const BarChart = <T extends ChartDataPoint = ChartDataPoint>({
  data,
  series,
  xKey,
  barSize = 32,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  stacked = false,
  layout = "vertical",
  radius = 4,
}: BarChartProps<T>) => {
  const config = seriesToChartConfig(series);
  const rechartsLayout = layout === "horizontal" ? "vertical" : "horizontal";

  return (
    <ChartContainer className={cn("w-full", className)} config={config} style={{ height }}>
      <RechartsBarChart data={data} layout={rechartsLayout} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {layout === "horizontal" ? (
          <>
            <YAxis dataKey={xKey} tickLine={false} tickMargin={5} axisLine={false} type="category" width={100} />
            <XAxis tickFormatter={formatAxisTick} type="number" />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tickLine={false} tickMargin={5} axisLine={false} />
            <YAxis tickFormatter={formatAxisTick} />
          </>
        )}
        {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
        {showLegend && <Legend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Bar
            dataKey={s.key}
            barSize={barSize}
            fill={`var(--color-${s.key})`}
            key={s.key}
            radius={[radius, radius, 0, 0]}
            {...(stacked ? { stackId: "stack" } : {})}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};
