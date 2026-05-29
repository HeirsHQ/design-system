import * as React from "react";

import { HtChevronRightOutline, HtHomeOutline } from "../icons/index.js";
import type { IconBaseProps } from "../icons/icon-base.js";
import { cn } from "../lib/utils.js";

/** A single breadcrumb navigation item. */
type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ComponentType<IconBaseProps>;
  /** Renders the item as non-interactive text */
  disabled?: boolean;
};

interface BreadcrumbProps {
  /** Ordered list of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator node (defaults to ChevronRight) */
  separator?: React.ReactNode | undefined;
  /** Href for the auto-prepended home item (default: "/") */
  homeHref?: string;
  /** Prepend a Home icon item automatically (default: false) */
  showHome?: boolean;
  /** Collapse items beyond this count, showing an ellipsis button */
  maxItems?: number;
  className?: string | undefined;
  itemClassName?: string;
  activeClassName?: string | undefined;
  separatorClassName?: string;
  /** Label shown for the collapsed items button (default: "...") */
  collapsedLabel?: string | undefined;
}

interface BreadcrumbItemProps {
  item: BreadcrumbItem;
  isLast: boolean;
  className?: string | undefined;
  activeClassName?: string | undefined;
}

const BreadcrumbItemComponent = ({ item, isLast, className, activeClassName }: BreadcrumbItemProps) => {
  const Icon = item.icon;
  const content = (
    <span className="flex items-center gap-1.5">
      {Icon && <Icon className="size-4" />}
      <span>{item.label}</span>
    </span>
  );

  if (isLast || !item.href || item.disabled) {
    return (
      <span className={cn("text-sm font-medium text-neutral-600", activeClassName, className)} aria-current={isLast ? "page" : undefined}>
        {content}
      </span>
    );
  }

  return (
    <a href={item.href} className={cn("text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-600", className)}>
      {content}
    </a>
  );
};

const BreadcrumbSeparator = ({ separator, className }: { separator?: React.ReactNode | undefined; className?: string | undefined }) => (
  <span className={cn("text-neutral-400", className)} aria-hidden="true">
    {separator ?? <HtChevronRightOutline className="size-4" />}
  </span>
);

const CollapsedItems = ({ items, collapsedLabel = "..." }: { items: BreadcrumbItem[]; collapsedLabel?: string | undefined }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        aria-label="Show more breadcrumbs"
      >
        {collapsedLabel}
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 z-20 mt-1 flex min-w-50 flex-col gap-1 rounded-md border bg-white p-2 shadow-lg dark:bg-neutral-800">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={`${item.label}-${index}`}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {Icon && <Icon className="size-4" />}
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-neutral-700">
                      {Icon && <Icon className="size-4" />}
                      <span>{item.label}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Accessible breadcrumb navigation component with optional home item,
 * custom separators, and overflow collapsing.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: "Dashboard", href: "/overview" },
 *     { label: "Settings", href: "/settings" },
 *     { label: "Profile" },
 *   ]}
 *   showHome
 * />
 * ```
 */
export const Breadcrumb = ({
  items,
  separator,
  homeHref = "/",
  showHome = false,
  maxItems,
  className,
  itemClassName,
  activeClassName,
  separatorClassName,
  collapsedLabel,
}: BreadcrumbProps) => {
  const allItems = React.useMemo(() => {
    const crumbs = [...items];

    if (showHome && crumbs[0]?.href !== homeHref) {
      crumbs.unshift({
        label: "Home",
        href: homeHref,
        icon: HtHomeOutline,
      });
    }

    return crumbs;
  }, [items, showHome, homeHref]);

  const displayItems = React.useMemo(() => {
    if (!maxItems || allItems.length <= maxItems) {
      return allItems;
    }

    const firstItem = allItems[0];
    const lastItems = allItems.slice(-(maxItems - 2));
    const collapsedItems = allItems.slice(1, -(maxItems - 2));

    return firstItem ? [firstItem, { collapsed: collapsedItems }, ...lastItems] : [{ collapsed: collapsedItems }, ...lastItems];
  }, [allItems, maxItems]);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-2">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const key = `breadcrumb-${index}`;

          if ("collapsed" in item) {
            return (
              <React.Fragment key={key}>
                <li>
                  <CollapsedItems items={item.collapsed as BreadcrumbItem[]} collapsedLabel={collapsedLabel} />
                </li>
                {!isLast && (
                  <li>
                    <BreadcrumbSeparator separator={separator} className={separatorClassName} />
                  </li>
                )}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={key}>
              <li>
                <BreadcrumbItemComponent item={item as BreadcrumbItem} isLast={isLast} className={itemClassName} activeClassName={activeClassName} />
              </li>
              {!isLast && (
                <li>
                  <BreadcrumbSeparator separator={separator} className={separatorClassName} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export type { BreadcrumbProps, BreadcrumbItem };
