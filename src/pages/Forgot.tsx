import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/AuthLayout";
import { postJson, getApiBase } from "@/lib/api";
import { getCaptchaToken } from "@/lib/recaptcha";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string }) => {
    try {
      const captchaToken = await getCaptchaToken("password_forgot");
      if (
        import.meta.env.VITE_CAPTCHA_PROVIDER &&
        import.meta.env.VITE_CAPTCHA_PROVIDER !== "none" &&
        !captchaToken
      ) {
        toast.error("Captcha verification failed. Please try again.");
        return;
      }

      await postJson("/auth/password/forgot", {
        email: data.email,
        ...(captchaToken ? { recaptcha_token: captchaToken } : {}),
      });
      toast.success("If this email is registered, a reset link has been sent.");
      navigate("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg || "Failed to send reset link");
    }
  };

  return (
    <AuthLayout
      title='Reset your password'
      subtitle='We will send a password reset link to your email'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='text-sm font-medium'>Email</label>
          <Input type='email' {...register("email")} />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' variant='hero'>
            Send Reset Link
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
