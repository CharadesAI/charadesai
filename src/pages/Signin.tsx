import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/AuthLayout";
import { postJson, getApiBase } from "@/lib/api";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { useNavigate, useLocation, Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

async function hashPassword(password: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Signin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get("redirectTo") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const passHash = await hashPassword(data.password);
      type UserData = Record<string, unknown>;
      type LoginResp = {
        data?: { user?: UserData; token?: string };
        token?: string;
        user?: UserData;
        message?: string;
      };
      const resp = await postJson<LoginResp>("/auth/login", {
        email: data.email,
        password_hash: passHash,
      });
      const token = resp.data?.token || resp.token;
      const user = resp.data?.user || resp.user;
      if (token) auth.login(token, user ?? null);
      toast.success("Signed in successfully");
      navigate(from);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg || "Failed to sign in");
    }
  };

  const startOAuth = (provider: "google" | "github") => {
    const base = getApiBase();
    window.location.href = `${base}/auth/${provider}/redirect`;
  };

  return (
    <AuthLayout title='Welcome back' subtitle='Sign in to your account'>
      <div className='mb-6'>
        <h3 className='text-2xl font-bold mb-1'>Sign in</h3>
        <p className='text-sm text-muted-foreground'>
          Enter your email and password to continue.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex items-center gap-3 mb-1'>
          <div className='flex-1 h-px bg-border/50' />
          <div className='text-xs text-muted-foreground'>Or continue with</div>
          <div className='flex-1 h-px bg-border/50' />
        </div>
        <div className='flex gap-3 mb-2'>
          <button
            type='button'
            className='flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/50 hover:bg-card'
            onClick={() => startOAuth("google")}
          >
            <FcGoogle className='w-5 h-5' />
            Google
          </button>
          <button
            type='button'
            className='flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/50 hover:bg-card'
            onClick={() => startOAuth("github")}
          >
            <FaGithub className='w-4 h-4' />
            Github
          </button>
        </div>
        <div>
          <label className='text-sm font-medium'>Email</label>
          <Input type='email' {...register("email")} />
          {errors.email && (
            <div className='text-sm text-destructive mt-1'>
              {errors.email.message}
            </div>
          )}
        </div>

        <div>
          <label className='text-sm font-medium'>Password</label>
          <Input type='password' {...register("password")} />
          {errors.password && (
            <div className='text-sm text-destructive mt-1'>
              {errors.password.message}
            </div>
          )}
        </div>

        <div className='flex items-center justify-between'>
          <Link to='/forgot' className='text-sm text-primary hover:underline'>
            Forgot password?
          </Link>
          <Button type='submit' variant='hero' disabled={isSubmitting}>
            Sign in
          </Button>
        </div>
      </form>

      <div className='text-center mt-6 text-sm text-muted-foreground'>
        Don't have an account?{" "}
        <Link to='/signup' className='text-primary hover:underline'>
          Create one
        </Link>
      </div>
    </AuthLayout>
  );
}
