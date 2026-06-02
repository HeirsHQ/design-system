export type ChartDataPoint = Record<string, string | number>;

/**
 * Defines a single data series for cartesian charts.
 */
export type ChartSeries = {
  key: string;
  label: string;
  color?: string;
};

/**
 * Base props shared by Bar, Line, and Area charts.
 */
export type BaseChartProps<T extends ChartDataPoint = ChartDataPoint> = {
  data: T[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
};

export type BarChartProps<T extends ChartDataPoint = ChartDataPoint> = BaseChartProps<T> & {
  barSize?: number;
  stacked?: boolean;
  layout?: "horizontal" | "vertical";
  radius?: number;
};

export type LineChartProps<T extends ChartDataPoint = ChartDataPoint> = BaseChartProps<T> & {
  curved?: boolean;
  showDots?: boolean;
};

export type AreaChartProps<T extends ChartDataPoint = ChartDataPoint> = BaseChartProps<T> & {
  curved?: boolean;
  stacked?: boolean;
  fillOpacity?: number;
};

export type PieChartDataPoint = {
  label: string;
  value: number;
  color?: string;
};

export type PieChartProps = {
  data: PieChartDataPoint[];
  height?: number;
  className?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
};
