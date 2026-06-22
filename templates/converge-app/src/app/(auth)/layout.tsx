import React from "react";

import { Logo } from "@/components/shared";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-21 w-full items-center justify-between px-10">
        <Logo />
        <div className=""></div>
      </div>
      <div className="bg-dot grid h-[calc(100%-168px)] w-full place-items-center bg-cover bg-center bg-no-repeat">
        {children}
      </div>
      <div className="flex h-21 w-full items-center justify-between px-10">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Heirs Technologies</p>
        <p className="text-sm text-gray-600">All rights reserved</p>
      </div>
    </div>
  );
}

export default AuthLayout;
