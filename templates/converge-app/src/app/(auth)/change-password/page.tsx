"use client";

import { LoaderIcon, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { WithAuth } from "@/components/providers";
import { PASSWORD_REGEX } from "@/config/string";
import { Button } from "@heirshq/design-system";
import type { FormField, User } from "@/types";
import { useApiMutation } from "@/lib/query";
import { Form } from "@heirshq/design-system";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const defaultValues: ChangePasswordForm = {
  confirmNewPassword: "",
  currentPassword: "",
  newPassword: "",
};

const schema = z
  .object({
    currentPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must have at least 8 characters and contain one uppercase, lowercase, number and special character",
      ),
    newPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must have at least 8 characters and contain one uppercase, lowercase, number and special character",
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const fields: Record<keyof ChangePasswordForm, FormField<ChangePasswordForm>> = {
  currentPassword: { label: "Current Password", type: "password", placeholder: "Enter new password" },
  newPassword: { label: "New Password", type: "password", placeholder: "Enter new password" },
  confirmNewPassword: { label: "Confirm Password", type: "password", placeholder: "Confirm new password" },
};

const Page = () => {
  const router = useRouter();

  const { isPending, mutateAsync } = useApiMutation<User, ChangePasswordForm>({
    serviceKey: "identity",
    url: "/auth/change-password",
    method: "POST",
  });

  const handleSubmit = async (values: ChangePasswordForm) => {
    try {
      mutateAsync(values).then(() => router.replace("/"));
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <WithAuth permissions={[]} roles={[]}>
      <div className="flex w-125 flex-col items-center gap-y-6 rounded-[10px] border bg-white p-6 shadow-md">
        <div className="relative grid size-22 place-items-center">
          <div className="absolute inset-0 rounded-full border [clip-path:inset(0_0_50%_0)]" />
          <div className="grid size-14 place-items-center rounded-full shadow-md">
            <Lock />
          </div>
        </div>
        <div className="space-y-1.5 text-center">
          <p className="text-3xl font-semibold">Change your password</p>
          <p className="text-sm text-gray-600"></p>
        </div>
        <Form defaultValues={defaultValues} fields={fields} schema={schema} onSubmit={handleSubmit}>
          {({ field }) => (
            <div className="w-full space-y-4">
              <div>{field("currentPassword")}</div>
              <div>{field("newPassword")}</div>
              <div>{field("confirmNewPassword")}</div>
              <Button className="w-full" disabled={isPending} type="submit">
                {isPending ? <LoaderIcon className="animate-spin" /> : "Reset Password"}
              </Button>
            </div>
          )}
        </Form>
      </div>
    </WithAuth>
  );
};

export default Page;
