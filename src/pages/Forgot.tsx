import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/AuthLayout";
import { postJson } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadRecaptchaScript, executeRecaptcha } from "@/lib/recaptcha";

export default function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ email: string }>();
  const navigate = useNavigate();

  // Load reCAPTCHA script on mount
  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  const onSubmit = async (data: { email: string }) => {
    try {
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha("forgot_password");

      await postJson("/auth/password/forgot", {
        email: data.email,
        ...(recaptchaToken && { recaptcha_token: recaptchaToken }),
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
          <Button type='submit' variant='hero' disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
