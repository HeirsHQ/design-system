import { IconBase, type IconBaseProps } from "./icon-base.js";

const HtArrowUpRightOutline = ({ ...props }: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5894 8H7.00373V6H18.0037V17H16.0037V9.41421Z" fill="currentColor" />
  </IconBase>
);

const HtArrowUpRightSolid = HtArrowUpRightOutline;

export { HtArrowUpRightOutline, HtArrowUpRightSolid };
