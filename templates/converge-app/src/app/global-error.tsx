"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-y-10 px-6 text-center">
        <div className="relative aspect-square w-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="converge" className="h-full w-full object-cover" src="/assets/images/converge-icon.svg" />
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">500</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md text-sm sm:text-base">
            An unexpected error occurred. You can try again, and we&apos;ll let our team know if it keeps happening.
          </p>
          {error.digest ? (
            <p className="text-muted-foreground text-xs">
              Error ID: <span className="font-mono">{error.digest}</span>
            </p>
          ) : null}
        </div>
        <button
          onClick={() => reset()}
          type="button"
          className="bg-primary-500 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white transition-all hover:opacity-80"
        >
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
