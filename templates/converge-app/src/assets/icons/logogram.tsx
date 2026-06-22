import { IconBase, type IconProps } from "./icon-base";

export const LogogramIcon = ({ className, ...props }: IconProps) => {
  return (
    <IconBase className={className} viewBox="0 0 54 54" {...props}>
      <path d="M26.4532 0C11.8435 0 0 11.8528 0 26.4741C14.6097 26.4741 26.4532 14.6212 26.4532 0Z" fill="#0A0A0A" />
      <path
        d="M26.4531 52.9467C41.0628 52.9467 52.9063 41.0939 52.9063 26.4727C38.2966 26.4727 26.4531 38.3255 26.4531 52.9467Z"
        fill="#0A0A0A"
      />
      <path
        d="M26.4531 0C41.0628 0 52.9063 11.8528 52.9063 26.4741C38.2966 26.4741 26.4531 14.6212 26.4531 0Z"
        fill="#0A0A0A"
      />
      <path
        d="M26.4532 52.9467C11.8435 52.9467 -1.32266e-06 41.0939 0 26.4727C14.6097 26.4727 26.4532 38.3255 26.4532 52.9467Z"
        fill="#0A0A0A"
      />
    </IconBase>
  );
};
