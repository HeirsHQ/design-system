"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@heirshq/design-system";
import { useApiMutation } from "@/lib/query";
import { Form } from "@heirshq/design-system";
import type { FormField } from "@/types";

type Step = "email" | "otp";
type EmailStep = { email: string };
type OtpStep = { otp: string };

const emailDefaultValues: EmailStep = { email: "" };
const otpDefaultValues: OtpStep = { otp: "" };

const emailSchema = z.object({ email: z.string().email("Valid email required") });
const otpSchema = z.object({ otp: z.string().length(6, "Enter the 6-digit code") });

const emailFields: Record<keyof EmailStep, FormField<EmailStep>> = {
  email: { label: "Work Email", type: "email", placeholder: "Enter your email" },
};

const otpFields: Record<keyof OtpStep, FormField<OtpStep>> = {
  otp: { label: "Verification Code", type: "otp", otpLength: 6 },
};

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [sentEmail, setSentEmail] = useState("");

  const { isPending: isSendingCode, mutateAsync: sendCode } = useApiMutation<null, { email: string }>({
    serviceKey: "identity",
    url: "/auth/forgot-password",
    method: "POST",
  });

  const { isPending: isResendingOtp, mutateAsync: resendOtp } = useApiMutation<null, { email: string }>({
    serviceKey: "identity",
    url: "/auth/resend-email-otp",
    method: "POST",
  });

  const { isPending: isVerifyingOtp, mutateAsync: verifyOtp } = useApiMutation<null, { email: string; otp: string }>({
    serviceKey: "identity",
    url: "/auth/verify-email",
    method: "POST",
  });

  const handleSendCode = async ({ email }: EmailStep) => {
    try {
      await sendCode({ email });
      setSentEmail(email);
      setStep("otp");
    } catch {}
  };

  const handleVerifyOtp = async ({ otp }: OtpStep) => {
    try {
      await verifyOtp({ email: sentEmail, otp });
      router.push("/reset-password");
    } catch {}
  };

  return (
    <div className="flex min-h-120 w-125 flex-col items-center gap-y-6 rounded-[10px] border bg-white p-6 shadow-md">
      <div className="relative grid size-22 place-items-center">
        <div className="absolute inset-0 rounded-full border [clip-path:inset(0_0_50%_0)]" />
        <div className="grid size-14 place-items-center rounded-full shadow-md">
          <Lock />
        </div>
      </div>

      {step === "email" && (
        <>
          <div className="space-y-1.5 text-center">
            <p className="text-3xl font-semibold">Forgot your password?</p>
            <p className="text-sm text-gray-600">
              Enter your email address and we&apos;ll send you password reset instructions.
            </p>
          </div>
          <Form defaultValues={emailDefaultValues} fields={emailFields} schema={emailSchema} onSubmit={handleSendCode}>
            {({ field }) => (
              <div className="w-full space-y-4">
                {field("email")}
                <Button className="w-full" disabled={isSendingCode} type="submit">
                  Send Code
                </Button>
              </div>
            )}
          </Form>
        </>
      )}

      {step === "otp" && (
        <>
          <div className="space-y-1.5 text-center">
            <p className="text-3xl font-semibold">Check your email</p>
            <p className="text-sm text-gray-600">
              We sent a 6-digit code to <span className="font-medium text-black">{sentEmail}</span>. Enter it below to
              continue.
            </p>
          </div>
          <Form defaultValues={otpDefaultValues} fields={otpFields} schema={otpSchema} onSubmit={handleVerifyOtp}>
            {({ field, form }) => (
              <div className="w-full space-y-4">
                {field("otp")}
                <Button
                  className="w-full"
                  disabled={isVerifyingOtp || (form.watch("otp") ?? "").length < 6}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            )}
          </Form>
          <button
            type="button"
            className="cursor-pointer text-sm text-gray-600 hover:underline"
            disabled={isResendingOtp}
            onClick={() => resendOtp({ email: sentEmail })}
          >
            Didn&apos;t receive a code?{" "}
            <span className="font-medium text-black">{isResendingOtp ? "Sending…" : "Resend"}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Page;
