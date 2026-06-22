"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.replace("/admin/overview");
  return null;
};

export default Page;
