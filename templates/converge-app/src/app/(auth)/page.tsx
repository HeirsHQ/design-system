"use client";

import { Loader, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { z } from "zod";

import { FormField, HttpResponse, SigninDto, SigninResponse } from "@/types";
import { Button } from "@heirshq/design-system";
import { MicrosoftIcon } from "@/assets/icons";
import { useApiMutation } from "@/lib/query";
import { useUserStore } from "@/store/core";
import { Form } from "@heirshq/design-system";
import { getBasePath } from "@/lib";

const defaultValues: SigninDto = {
  email: "",
  password: "",
  rememberMe: false,
};

const schema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(8).max(20),
  rememberMe: z.boolean().default(false).optional(),
});

const Page = () => {
  const { signin } = useUserStore();
  const router = useRouter();

  const { isPending, mutateAsync } = useApiMutation<HttpResponse<SigninResponse>, SigninDto>({
    method: "POST",
    serviceKey: "identity",
    url: "/auth/login",
    toast: {
      success: "Signed in successfully",
    },
  });

  const fields: Record<keyof SigninDto, FormField<SigninDto>> = {
    email: { label: "Email", type: "email", placeholder: "" },
    password: { label: "Password", type: "password", placeholder: "" },
    rememberMe: { label: "Keep me signed in", type: "checkbox" },
  };

  const handleSubmit = async (values: SigninDto) => {
    try {
      const response = await mutateAsync(values);
      await signin(response.data);
      // if (response.data.user.requirePasswordReset) {}
      const path = getBasePath(response.data.user);
      router.replace(`${path}/overview`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      toast.error(message);
    }
  };

  return (
    <div className="bg-background flex w-125 flex-col items-center gap-y-6 rounded-[10px] border p-6 shadow-md">
      <div className="relative grid size-22 place-items-center">
        <div className="absolute inset-0 rounded-full border [clip-path:inset(0_0_50%_0)]" />
        <div className="grid size-14 place-items-center rounded-full shadow-md">
          <UserIcon />
        </div>
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-3xl font-semibold">Sign In</p>
        <p className="text-sm text-gray-600">Welcome back! Please sign in to continue.</p>
      </div>
      <Button className="w-full" disabled={isPending} onClick={() => {}} variant="outline">
        <MicrosoftIcon /> Microsoft
      </Button>
      <div className="relative flex w-full items-center justify-center before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:translate-y-1/2 before:bg-gray-300">
        <span className="z-1! bg-white px-3 text-xs text-gray-600">OR</span>
      </div>
      <Form defaultValues={defaultValues} fields={fields} schema={schema} onSubmit={handleSubmit}>
        {({ field, isSubmitting }) => {
          const IsLoading = isSubmitting || isPending;
          return (
            <div className="w-full space-y-4">
              <div className="">{field("email")}</div>
              <div className="space-y-2">
                <div className="">{field("password")}</div>
                <div className="flex w-full items-center justify-between">
                  <div className="">{field("rememberMe")}</div>
                  <Link className="link text-sm" href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button className="w-full" disabled={IsLoading} type="submit">
                {IsLoading ? <Loader className="animate-spin" /> : "Sign In"}
              </Button>
            </div>
          );
        }}
      </Form>
    </div>
  );
};

export default Page;
