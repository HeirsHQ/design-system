import { IconBase, type IconBaseProps } from "./icon-base.js";

const HtMinusOutline = ({ ...props }: IconBaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M5 11V13H19V11H5Z" fill="currentColor"></path>
    </IconBase>
  );
};

const HtMinusSolid = ({ ...props }: IconBaseProps) => {
  return (
    <IconBase {...props}>
      <path d="M5 11V13H19V11H5Z" fill="currentColor"></path>
    </IconBase>
  );
};

export { HtMinusOutline, HtMinusSolid };
