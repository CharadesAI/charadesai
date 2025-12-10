import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function CTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neon-blue/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-violet/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-cyan/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Start Building with{" "}
            <span className="text-gradient">Vision AI</span>{" "}
            Today
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of developers building the future of human-computer interaction. 
            Start free, scale infinitely.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-card/50 border-border"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            No credit card required • Free 1,000 API calls • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
