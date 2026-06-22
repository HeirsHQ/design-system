"use client";

import { LogOut, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@heirshq/design-system";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@heirshq/design-system";

const COUNTDOWN_SECONDS = 10;

interface InactivityModalProps {
  open: boolean;
  onStayActive: () => void;
  onSignout: () => void;
}

export const InactivityModal = ({ open, onStayActive, onSignout }: InactivityModalProps) => {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) onSignout();
  }, [countdown, onSignout]);

  const progress = (countdown / COUNTDOWN_SECONDS) * 100;

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mb-1 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20">
              <ShieldAlert className="size-6 text-amber-500" />
            </div>
          </div>
          <DialogTitle className="text-center">Session Expiring Soon</DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve been inactive for a while. You&apos;ll be logged out in{" "}
            <span className="text-foreground font-semibold">{countdown}</span> second{countdown !== 1 ? "s" : ""}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2 py-1">
          <span className="text-4xl font-bold tabular-nums">{countdown}</span>
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-700">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onSignout} className="gap-x-2">
            <LogOut className="size-4" />
            Log out
          </Button>
          <Button onClick={onStayActive}>Stay logged in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
