import { RotateCcwKey, Settings, User } from "lucide-react";

interface Props {
  onSwitchAccount: () => void;
  canSwitch: boolean;
  switchLabel: string;
}

export const USER_OPTIONS = ({ onSwitchAccount, canSwitch, switchLabel }: Props) => [
  { label: "Profile", href: "/", icon: User, hidden: false },
  { label: "Settings", href: "/", icon: Settings, hidden: false },
  { label: switchLabel, onClick: onSwitchAccount, icon: RotateCcwKey, hidden: !canSwitch },
];
