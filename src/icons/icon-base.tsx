import type React from "react";

/**
 * IconBaseProps
 * @param children - The children of the icon
 * @param className - The class name of the icon
 * @param height - The height of the icon
 * @param size - The size of the icon
 * @param viewBox - The viewBox of the icon
 * @param width - The width of the icon
 */
interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  children?: React.ReactNode;
  className?: string;
  height?: string | number;
  size?: number;
  viewBox?: string;
  width?: string | number;
}

/**
 * IconBase component for rendering SVG icons with consistent styling and props.
 * @param props - IconBaseProps
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <IconBase viewBox="0 0 16 16" width={16} height={16}>
 *   <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z" />
 * </IconBase>
 * ```
 */
const IconBase = ({ viewBox = "0 0 24 24", width = 24, height = 24, className = "", children, ...props }: IconBaseProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={width} height={height} fill="none" className={className} {...props}>
      {children}
    </svg>
  );
};

export { IconBase, type IconBaseProps };
