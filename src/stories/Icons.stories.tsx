import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconBase, type IconBaseProps } from "../icons/icon-base.js";
import { HtAddOutline, HtAddSolid } from "../icons/add.js";
import { HtCalendarOutline, HtCalendarSolid } from "../icons/calendar.js";
import { HtCheckOutline, HtCheckSolid } from "../icons/check.js";
import { HtChevronDownOutline, HtChevronDownSolid } from "../icons/chevron-down.js";
import { HtChevronRightOutline, HtChevronRightSolid } from "../icons/chevron-right.js";
import { HtChevronUpOutline, HtChevronUpSolid } from "../icons/chevron-up.js";
import { HtEditOutline, HtEditSolid } from "../icons/edit.js";
import { HtEyeOutline, HtEyeSolid } from "../icons/eye.js";
import { HtEyeOffOutline, HtEyeOffSolid } from "../icons/eye-off.js";
import { HtLockOutline, HtLockSolid } from "../icons/lock.js";
import { HtMailOutline, HtMailSolid } from "../icons/mail.js";
import { HtMinusOutline, HtMinusSolid } from "../icons/minus.js";
import { HtMoreOutline, HtMoreSolid } from "../icons/more.js";
import { HtSearchOutline, HtSearchSolid } from "../icons/search.js";
import { HtTrashOutline, HtTrashSolid } from "../icons/trash.js";

const icons: { name: string; outline: (props: IconBaseProps) => React.JSX.Element; solid: (props: IconBaseProps) => React.JSX.Element }[] = [
  { name: "Add", outline: HtAddOutline, solid: HtAddSolid },
  { name: "Calendar", outline: HtCalendarOutline, solid: HtCalendarSolid },
  { name: "Check", outline: HtCheckOutline, solid: HtCheckSolid },
  { name: "ChevronDown", outline: HtChevronDownOutline, solid: HtChevronDownSolid },
  { name: "ChevronRight", outline: HtChevronRightOutline, solid: HtChevronRightSolid },
  { name: "ChevronUp", outline: HtChevronUpOutline, solid: HtChevronUpSolid },
  { name: "Edit", outline: HtEditOutline, solid: HtEditSolid },
  { name: "Eye", outline: HtEyeOutline, solid: HtEyeSolid },
  { name: "EyeOff", outline: HtEyeOffOutline, solid: HtEyeOffSolid },
  { name: "Lock", outline: HtLockOutline, solid: HtLockSolid },
  { name: "Mail", outline: HtMailOutline, solid: HtMailSolid },
  { name: "Minus", outline: HtMinusOutline, solid: HtMinusSolid },
  { name: "More", outline: HtMoreOutline, solid: HtMoreSolid },
  { name: "Search", outline: HtSearchOutline, solid: HtSearchSolid },
  { name: "Trash", outline: HtTrashOutline, solid: HtTrashSolid },
];

const meta: Meta<typeof IconBase> = {
  title: "Icons/Overview",
  component: IconBase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: () => {
    const [variant, setVariant] = useState<"outline" | "solid">("outline");

    return (
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setVariant("outline")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${variant === "outline" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"}`}
          >
            Outline
          </button>
          <button
            onClick={() => setVariant("solid")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${variant === "solid" ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"}`}
          >
            Solid
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {icons.map(({ name, outline, solid }) => {
            const Icon = variant === "outline" ? outline : solid;
            return (
              <div key={name} className="flex flex-col items-center gap-y-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <Icon className="size-6 text-neutral-700 dark:text-neutral-300" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-x-6">
      {[16, 20, 24, 32, 40, 48].map((size) => (
        <div key={size} className="flex flex-col items-center gap-y-2">
          <HtSearchOutline width={size} height={size} className="text-neutral-700 dark:text-neutral-300" />
          <span className="text-xs text-neutral-500">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-x-6">
      {[
        { label: "Default", className: "text-neutral-700" },
        { label: "Primary", className: "text-primary-500" },
        { label: "Success", className: "text-green-500" },
        { label: "Warning", className: "text-yellow-500" },
        { label: "Danger", className: "text-red-500" },
        { label: "Muted", className: "text-neutral-400" },
      ].map(({ label, className }) => (
        <div key={label} className="flex flex-col items-center gap-y-2">
          <HtEditOutline className={`size-6 ${className}`} />
          <span className="text-xs text-neutral-500">{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const OutlineVsSolid: Story = {
  render: () => (
    <div className="flex flex-col gap-y-4">
      {icons.map(({ name, outline: Outline, solid: Solid }) => (
        <div key={name} className="flex items-center gap-x-6">
          <span className="w-28 text-sm text-neutral-500">{name}</span>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col items-center gap-y-1">
              <Outline className="size-6 text-neutral-700 dark:text-neutral-300" />
              <span className="text-[10px] text-neutral-400">Outline</span>
            </div>
            <div className="flex flex-col items-center gap-y-1">
              <Solid className="size-6 text-neutral-700 dark:text-neutral-300" />
              <span className="text-[10px] text-neutral-400">Solid</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
