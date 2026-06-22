"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Force a specific theme variant regardless of the active theme */
  preferredTheme?: "dark" | "light";
}

/**
 * Renders the Converge logo image, automatically switching between
 * light and dark variants based on the active theme or `preferredTheme`.
 */

export const Logo = ({ className, preferredTheme = "light" }: Props) => {
  const { theme } = useTheme();

  const image =
    preferredTheme === "dark"
      ? "/assets/images/converge-dark.png"
      : preferredTheme === "light"
        ? "/assets/images/converge-light.png"
        : theme === "light"
          ? "/assets/images/converge-light.png"
          : "/assets/images/converge-dark.png";

  return (
    <div className={cn("relative aspect-[4.7/1] w-40", className)}>
      <Image alt="converge" className="object-cover" fill sizes="100%" src={image} />
    </div>
  );
};
