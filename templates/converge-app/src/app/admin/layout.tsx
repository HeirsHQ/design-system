import React from "react";

import { Header, Sidebar } from "@/components/shared";
import { WithAuth } from "@/components/providers";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <WithAuth permissions={[]} roles={[]}>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar role="tenant-admin" />
        <div className="h-full flex-1 overflow-hidden">
          <Header />
          <div className="h-[calc(100%-56px)] w-full overflow-y-auto bg-neutral-50 dark:bg-neutral-800">{children}</div>
        </div>
      </div>
    </WithAuth>
  );
};

export default DashboardLayout;
