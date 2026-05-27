import { IconBase, type IconBaseProps } from "./icon-base.js";

const HtChevronsRightOutline = ({ ...props }: IconBaseProps) => (
  <IconBase {...props}>
    <path d="M13.1719 12L8.22217 7.05023L9.63638 5.63601L16.0004 12L9.63638 18.364L8.22217 16.9497L13.1719 12Z" fill="currentColor" />
    <path d="M7.17188 12L2.22214 7.05023L3.63635 5.63601L10.0003 12L3.63635 18.364L2.22214 16.9497L7.17188 12Z" fill="currentColor" />
  </IconBase>
);

const HtChevronsRightSolid = HtChevronsRightOutline;

export { HtChevronsRightOutline, HtChevronsRightSolid };
