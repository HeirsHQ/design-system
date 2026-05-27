import { IconBase, type IconBaseProps } from "./icon-base.js";

const HtChevronsLeftOutline = ({ ...props }: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M10.8281 12L15.7779 16.9497L14.3637 18.364L7.99974 12L14.3637 5.63599L15.7779 7.0502L10.8281 12Z" fill="currentColor" />
    <path d="M16.8281 12L21.7779 16.9497L20.3637 18.364L14 12L20.3637 5.63599L21.7779 7.0502L16.8281 12Z" fill="currentColor" />
  </IconBase>
);

const HtChevronsLeftSolid = HtChevronsLeftOutline;

export { HtChevronsLeftOutline, HtChevronsLeftSolid };
