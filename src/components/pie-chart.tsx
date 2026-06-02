"use client";
import { Cell, Legend, Pie, PieChart as RechartsPieChart, Tooltip } from "recharts";

import { ChartContainer, ChartLegendContent, ChartTooltipContent } from "../components/chart.js";
import { DEFAULT_COLORS, pieDataToChartConfig, toColorKey } from "../constants/colors.js";
import type { PieChartProps } from "../types/chart.js";
import { cn } from "../lib/utils.js";

export const PieChart = ({ data, height = 300, className, showTooltip = true, showLegend = false, innerRadius = 0 }: PieChartProps) => {
  const config = pieDataToChartConfig(data);
  const normalizedData = data.map((d, i) => ({
    ...d,
    colorKey: toColorKey(d.label),
    resolvedColor: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? "#000000",
  }));

  return (
    <ChartContainer className={cn("w-full", className)} config={config} style={{ height }}>
      <RechartsPieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={normalizedData}
          dataKey="value"
          innerRadius={innerRadius}
          nameKey="colorKey"
          outerRadius="80%"
          paddingAngle={innerRadius > 0 ? 1 : 0}
        >
          {normalizedData.map((entry, index) => (
            <Cell fill={entry.resolvedColor} key={`cell-${index}`} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<ChartTooltipContent nameKey="colorKey" />} />}
        {showLegend && <Legend content={<ChartLegendContent nameKey="colorKey" />} />}
      </RechartsPieChart>
    </ChartContainer>
  );
};
