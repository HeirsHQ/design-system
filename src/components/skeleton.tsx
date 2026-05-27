"use client";

import React from "react";

interface Props {
  /** Theme variant for the hatch pattern. Defaults to "light". */
  theme?: "light" | "dark";
}

export const Skeleton = ({ theme = "light" }: Props) => {
  const hatchStyle: React.CSSProperties = {
    backgroundImage:
      theme === "dark"
        ? "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(225,225,225,0.5) 8px, rgba(225,225,225,0.5) 9px)"
        : "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.04) 9px)",
  };

  return (
    <div className="grid h-full min-h-[110dvh] w-full grid-cols-3 gap-6 overflow-y-auto p-6.5">
      <div className="col-span-2 grid h-full grid-rows-7 gap-6">
        <div className="row-span-1 animate-pulse rounded-xl border duration-100" style={hatchStyle}></div>
        <div className="row-span-3 animate-pulse rounded-xl border duration-100" style={hatchStyle}></div>
        <div className="row-span-3 animate-pulse rounded-xl border duration-100" style={hatchStyle}></div>
      </div>
      <div className="grid h-full grid-rows-7 gap-6">
        <div className="row-span-3 animate-pulse rounded-xl border duration-100" style={hatchStyle}></div>
        <div className="row-span-2 animate-pulse rounded-xl border duration-100" style={hatchStyle}></div>
        <div className="row-span-2 animate-pulse rounded-xl border duration-100" style={hatchStyle}></div>
      </div>
    </div>
  );
};
