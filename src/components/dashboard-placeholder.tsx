interface Props {
  /** Page title displayed at the top */
  title: string;
  /** Optional subtitle below the title */
  description?: string;
}

const PieChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.97 13.165a10 10 0 1 1-11.13-11.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/**
 * Placeholder layout for dashboard pages under construction.
 * Renders a title, description, and skeleton stat/chart blocks.
 */
export const DashboardPlaceholder = ({ title, description }: Props) => {
  return (
    <div className="h-full w-full space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Stat Label</p>
              <PieChartIcon className="size-5" />
            </div>
            <p className="mt-2 text-2xl font-medium">0</p>
            <p className="mt-1 text-xs text-gray-400">0% increase from last week</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-50 rounded-md border"></div>
        <div className="h-50 rounded-md border"></div>
      </div>
      <div className="h-75 rounded-md border"></div>
    </div>
  );
};
