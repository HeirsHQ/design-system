"use client";

import { Bell } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@heirshq/design-system";
import { Button } from "@heirshq/design-system";

export const Notifications = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <Bell className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-100">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Notifications</p>
        </div>
        <div className="space-y-2"></div>
      </PopoverContent>
    </Popover>
  );
};
