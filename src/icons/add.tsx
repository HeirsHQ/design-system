import { IconBase, type IconBaseProps } from "./icon-base.js";

const HtAddOutline = ({ ...props }: IconBaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="currenctColor"></path>
    </IconBase>
  );
};

const HtAddSolid = ({ ...props }: IconBaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="currenctColor"></path>
    </IconBase>
  );
};

export { HtAddOutline, HtAddSolid };
