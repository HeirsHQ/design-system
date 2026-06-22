"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { z } from "zod";

import { Button } from "@heirshq/design-system";
import { useApiMutation } from "@/lib/query";
import { Form } from "@heirshq/design-system";
import type { FormField } from "@/types";

type ResetPasswordForm = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    otp: z.string().min(6, "6-digit code required"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Page = () => {
  const router = useRouter();

  const {} = useApiMutation({
    serviceKey: "identity",
    url: "/auth/reset-password",
    method: "POST",
  });

  const defaultValues: ResetPasswordForm = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const fields: Record<keyof ResetPasswordForm, FormField<ResetPasswordForm>> = {
    email: { label: "Email Address", type: "email", placeholder: "Enter your email" },
    otp: { label: "OTP", type: "text", placeholder: "Enter 6-digit code" },
    newPassword: { label: "New Password", type: "password", placeholder: "Enter new password" },
    confirmPassword: { label: "Confirm Password", type: "password", placeholder: "Confirm new password" },
  };

  const handleSubmit = async (values: ResetPasswordForm) => {
    try {
      console.log({ values });
      router.replace("/");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="flex w-125 flex-col items-center gap-y-6 rounded-[10px] border bg-white p-6 shadow-md">
      <div className="relative grid size-22 place-items-center">
        <div className="absolute inset-0 rounded-full border [clip-path:inset(0_0_50%_0)]" />
        <div className="grid size-14 place-items-center rounded-full shadow-md">
          <Lock />
        </div>
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-3xl font-semibold">Reset your password</p>
        <p className="text-sm text-gray-600">Enter your new password below.</p>
      </div>
      <Form defaultValues={defaultValues} fields={fields} schema={schema} onSubmit={handleSubmit}>
        {({ field, isSubmitting }) => (
          <div className="w-full space-y-4">
            <div>{field("otp")}</div>
            <div>{field("newPassword")}</div>
            <div>{field("confirmPassword")}</div>
            <Button className="w-full" disabled={isSubmitting} type="submit">
              Reset Password
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Page;
