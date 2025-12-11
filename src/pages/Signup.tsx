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
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passwords do not match", path: ["confirmPassword"] });
  }
});

type FormValues = z.infer<typeof schema>;

async function hashPassword(password: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const passHash = await hashPassword(data.password);
      const passHashConfirm = await hashPassword(data.confirmPassword);
      const payload = {
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password_hash: passHash,
        password_hash_confirmation: passHashConfirm,
      };
      type UserData = Record<string, unknown>;
      type RegisterResp = { data?: { user?: UserData; token?: string }; token?: string; user?: UserData; message?: string };
      const resp = await postJson<RegisterResp>("/auth/register", payload);
      const token = resp.data?.token || resp.token;
      const user = resp.data?.user || resp.user;
      if (token) auth.login(token, user ?? null);
      toast.success("Account created successfully");
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg || "Failed to create account");
    }
  };

  const startOAuth = (provider: "google" | "github") => {
    const base = getApiBase();
    window.location.href = `${base}/auth/${provider}/redirect`;
  };

  return (
    <AuthLayout title="Create an account" subtitle="Start building with CharadesAI">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-1">Get started</h3>
        <p className="text-sm text-muted-foreground">Create a free account to access the API.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1 h-px bg-border/50" />
          <div className="text-xs text-muted-foreground">Or continue with</div>
          <div className="flex-1 h-px bg-border/50" />
        </div>
        <div className="flex gap-3 mb-2">
          <button type="button" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/50 hover:bg-card" onClick={() => startOAuth('google')}>
            <FcGoogle className='w-5 h-5' />
            Google
          </button>
          <button type="button" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/50 hover:bg-card" onClick={() => startOAuth('github')}>
            <FaGithub className='w-4 h-4' />
            Github
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium">First name</label>
            <Input {...register("firstName")} />
            {errors.firstName && <div className="text-sm text-destructive mt-1">{errors.firstName.message}</div>}
          </div>
          <div>
            <label className="text-sm font-medium">Last name</label>
            <Input {...register("lastName")} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Username</label>
          <Input {...register("username")} />
          {errors.username && <div className="text-sm text-destructive mt-1">{errors.username.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...register("email")} />
          {errors.email && <div className="text-sm text-destructive mt-1">{errors.email.message}</div>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register("password")} />
            {errors.password && <div className="text-sm text-destructive mt-1">{errors.password.message}</div>}
          </div>
          <div>
            <label className="text-sm font-medium">Confirm password</label>
            <Input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <div className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</div>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in</Link></div>
          <Button type='submit' variant='hero' disabled={isSubmitting}>Create account</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
