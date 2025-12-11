import heroBg from "@/assets/hero-bg.jpg";
import { cn } from "@/lib/utils";

export function AuthLayout({
  children,
  title,
  subtitle,
  image,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left image */}
      <div className="relative hidden md:block bg-gradient-to-br from-background via-primary/5 to-secondary/20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: `url(${image || heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1724]/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-md mx-auto text-center text-white px-8">
            <h2 className="text-4xl font-bold mb-4">{title || "Welcome"}</h2>
            <p className="text-lg opacity-90 mb-6">{subtitle || "Join the neural revolution."}</p>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl p-6 bg-card/90 border border-border/50 shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
