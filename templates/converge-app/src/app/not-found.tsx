"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@heirshq/design-system";

const image = "/assets/images/converge-icon.svg";
export const dynamic = "force-dynamic";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col items-center gap-y-10">
        <div className="relative aspect-square w-20">
          <Image alt="converge" className="object-cover" fill sizes="100%" src={image} />
        </div>
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">404</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="text-muted-foreground max-w-md text-sm sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
