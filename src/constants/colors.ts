import type { ChartSeries, PieChartDataPoint } from "../types/chart.js";
import type { ChartConfig } from "../components/chart.js";

export const DEFAULT_COLORS = ["hsl(12, 76%, 61%)", "hsl(173, 58%, 39%)", "hsl(197, 37%, 24%)", "hsl(43, 74%, 66%)", "hsl(263, 70%, 50%)"];

export const toColorKey = (label: string) =>
  label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const fallbackColor = (i: number): string => DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? "#000000";

export const seriesToChartConfig = (series: ChartSeries[]): ChartConfig =>
  Object.fromEntries(series.map((s, i) => [s.key, { label: s.label, color: s.color ?? fallbackColor(i) }])) as ChartConfig;

export const pieDataToChartConfig = (data: PieChartDataPoint[]): ChartConfig =>
  Object.fromEntries(data.map((d, i) => [toColorKey(d.label), { label: d.label, color: d.color ?? fallbackColor(i) }])) as ChartConfig;
