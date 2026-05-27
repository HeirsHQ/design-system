interface Props {
  /** Page or feature name */
  title: string;
  /** Optional description shown below the title */
  description?: string;
}

const ConstructionIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
    <path d="M17 14v7M7 14v7M17 3v3M7 3v3M10 14v7M14 14v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Centered placeholder for pages that are not yet implemented.
 * Displays a construction icon with a title and optional description.
 */
export const PagePlaceholder = ({ title, description }: Props) => {
  return (
    <div className="grid h-full w-full place-items-center p-6">
      <div className="flex flex-col items-center gap-y-8">
        <ConstructionIcon className="text-muted-foreground size-16" />
        <div className="text-center">
          <p className="text-xl font-medium">{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
