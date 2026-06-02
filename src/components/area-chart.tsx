"use client";

import { Area, AreaChart as RechartsAreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "../components/chart.js";
import type { AreaChartProps, ChartDataPoint } from "../types/chart.js";
import { seriesToChartConfig } from "../constants/colors.js";
import { cn } from "../lib/utils.js";

/**
 * Composable area chart built on shadcn + Recharts.
 * Supports stacked areas and fill opacity control.
 *
 * @example
 * <AreaChart
 *   data={revenueData}
 *   series={[{ key: "income", label: "Income" }, { key: "expenses", label: "Expenses" }]}
 *   xKey="month"
 *   stacked
 *   fillOpacity={0.3}
 * />
 */
export const AreaChart = <T extends ChartDataPoint = ChartDataPoint>({
  data,
  series,
  xKey,
  height = 300,
  className,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  curved = false,
  stacked = false,
  fillOpacity = 0.2,
}: AreaChartProps<T>) => {
  const config = seriesToChartConfig(series);
  const curve = curved ? "monotone" : "linear";

  return (
    <ChartContainer className={cn("w-full", className)} config={config} style={{ height }}>
      <RechartsAreaChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis dataKey={xKey} />
        <YAxis />
        {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
        {showLegend && <Legend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Area
            dataKey={s.key}
            fill={`var(--color-${s.key})`}
            fillOpacity={fillOpacity}
            key={s.key}
            {...(stacked ? { stackId: "stack" } : {})}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            type={curve}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
};
