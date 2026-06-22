"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@heirshq/design-system";
import { Popover, PopoverContent, PopoverTrigger } from "@heirshq/design-system";
import { Avatar, AvatarFallback, AvatarImage } from "@heirshq/design-system";
import { cn, getInitials, getUserRole, UserRole } from "@/lib";
import { useUserStore } from "@/store/core";
import { USER_OPTIONS } from "@/constants";
import { Maybe, User } from "@/types";
import { Button } from "@heirshq/design-system";

interface Props {
  isCollapsed: boolean;
  role: UserRole;
  user: Maybe<User>;
}

export const SignOut = ({ isCollapsed, role, user }: Props) => {
  const [open, setOpen] = useState(false);
  const { signout } = useUserStore();
  const router = useRouter();

  const name = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  const actualRole = user ? getUserRole(user) : "regular-user";
  const canSwitch = Boolean(actualRole === "tenant-admin");
  const switchLabel = role === "tenant-admin" ? "Switch to ESS Workspace" : "Switch to Admin Workspace";
  const switchTarget = role === "tenant-admin" ? "/ess/overview" : "/admin/overview";

  const handleSwitchAccount = () => router.push(switchTarget);

  const handleSignout = async () => {
    try {
      await signout();
      router.replace("/");
    } catch (error) {
      console.error({ error });
      router.replace("/");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="hover:bg-muted flex h-9 w-full cursor-pointer items-center gap-x-2 rounded-md px-3">
          <Avatar className="size-7 border">
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
            <AvatarImage src="" />
          </Avatar>
          {!isCollapsed && (
            <div className="flex w-full flex-col items-start">
              <p className="text-xs">{name}</p>
              <p className="text-muted-foreground max-w-46.25 truncate text-[10px]">{user?.email}</p>
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="ml-2 w-65">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <Avatar className="size-10 border">
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
              <AvatarImage src="" />
            </Avatar>
            <div className="flex w-full flex-col items-start">
              <p className="text-sm">{name}</p>
              <p className="text-muted-foreground max-w-46.25 truncate text-xs">{user?.email}</p>
            </div>
          </div>
          <hr />
          {USER_OPTIONS({ onSwitchAccount: handleSwitchAccount, canSwitch, switchLabel }).map((option) => {
            if (option.href) {
              return (
                <Link
                  className={cn(
                    "hover:bg-muted flex h-8 w-full items-center gap-x-2 rounded-md px-3 text-sm font-medium",
                    option.hidden && "hidden",
                  )}
                  href={option.href}
                  key={option.label}
                >
                  <option.icon className="size-4" /> {option.label}
                </Link>
              );
            } else {
              return (
                <button
                  className={cn(
                    "hover:bg-muted flex h-8 w-full items-center gap-x-2 rounded-md px-3 text-sm font-medium",
                    option.hidden && "hidden",
                  )}
                  key={option.label}
                  onClick={option.onClick}
                >
                  <option.icon className="size-4" /> {option.label}
                </button>
              );
            }
          })}
          <hr />
          <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
            <DialogTrigger asChild>
              <button className="flex h-8 w-full items-center gap-x-2 rounded-md px-3 text-sm font-medium text-red-500 hover:bg-red-50">
                <LogOut className="size-4" /> Sign Out
              </button>
            </DialogTrigger>
            <DialogContent className="w-100">
              <DialogTitle>Sign out of your account</DialogTitle>
              <DialogDescription>Are you sure you want to sign out of your account?</DialogDescription>
              <div className="mt-6 flex w-full items-center justify-end gap-x-4">
                <Button onClick={() => setOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSignout}>Sign Out</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </PopoverContent>
    </Popover>
  );
};
