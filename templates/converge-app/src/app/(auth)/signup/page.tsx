"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@heirshq/design-system";
import { MicrosoftIcon } from "@/assets/icons";
import { Form } from "@heirshq/design-system";
import type { FormField } from "@/types";

type SignupForm = { email: string; password: string; rememberMe: boolean };

const defaultValues: SignupForm = { email: "", password: "", rememberMe: false };

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
  rememberMe: z.boolean().default(false),
});

const fields: Record<keyof SignupForm, FormField<SignupForm>> = {
  email: { label: "Work Email", type: "email", placeholder: "" },
  password: { label: "Password", type: "password", placeholder: "" },
  rememberMe: { label: "Keep me signed in", type: "checkbox" },
};

const Page = () => {
  const handleSubmit = async (values: SignupForm) => {
    try {
      console.log({ values });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="flex w-125 flex-col items-center gap-y-6 rounded-[10px] border bg-white p-6 shadow-md">
      <div className="relative grid size-22 place-items-center">
        <div className="absolute inset-0 rounded-full border [clip-path:inset(0_0_50%_0)]" />
        <div className="grid size-14 place-items-center rounded-full shadow-md">
          <User />
        </div>
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-3xl font-semibold">Sign In</p>
        <p className="text-sm text-gray-600">Welcome back! Please sign in to continue.</p>
      </div>
      <Button className="w-full" size="sm" variant="outline">
        <MicrosoftIcon /> Microsoft
      </Button>
      <div className="relative flex w-full items-center justify-center before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:translate-y-1/2 before:bg-gray-300">
        <span className="z-1! bg-white px-3 text-xs text-gray-600">OR</span>
      </div>
      <Form defaultValues={defaultValues} fields={fields} schema={schema} onSubmit={handleSubmit}>
        {({ field, isSubmitting }) => (
          <div className="w-full space-y-4">
            <div>{field("email")}</div>
            <div className="space-y-2">
              <div>{field("password")}</div>
              <div className="flex w-full items-center justify-between">
                <div>{field("rememberMe")}</div>
                <Link className="link text-sm text-gray-600" href="/forgot-password">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <Button className="w-full" disabled={isSubmitting} type="submit">
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <div className="text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link className="link text-black" href="/">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
