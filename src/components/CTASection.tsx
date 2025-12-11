import { useState } from "react";
import { ArrowRight, Mail, Zap, Brain, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function CTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(
        "AI activation initiated! Welcome to the future of perception."
      );
      setEmail("");
    }
  };

  return (
    <section className='py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20 relative overflow-hidden'>
      {/* Neural Network Background Effects */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Central Neural Hub */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-neon-cyan/30 via-neon-violet/20 to-transparent animate-pulse-ring' />

        {/* Neural Nodes */}
        <div className='absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-neon-cyan/20 blur-xl animate-orbit' />
        <div
          className='absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-neon-violet/20 blur-xl animate-orbit'
          style={{ animationDelay: "2s" }}
        />
        <div
          className='absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-neon-pink/20 blur-xl animate-orbit'
          style={{ animationDelay: "4s" }}
        />

        {/* Connection Lines (simulated with gradients) */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent rotate-45' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon-violet/30 to-transparent -rotate-45' />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Activation Status */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
            <Activity className='w-4 h-4 text-neon-cyan animate-pulse' />
            <span className='text-sm font-medium text-primary'>
              Neural Network Online
            </span>
            <div className='w-2 h-2 bg-neon-cyan rounded-full animate-pulse'></div>
          </div>

          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
            Activate Your
            <span className='text-gradient block'>AI Perception</span>
          </h2>

          <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
            Join the neural revolution. Transform how humans and machines
            understand each other with real-time lip-reading and gesture
            recognition powered by advanced AI.
          </p>

          {/* Activation Metrics */}
          <div className='grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12'>
            <div className='text-center'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Brain className='w-5 h-5 text-neon-cyan' />
                <span className='text-2xl font-bold text-foreground'>10M+</span>
              </div>
              <div className='text-sm text-muted-foreground'>
                Neural Inferences
              </div>
            </div>
            <div className='text-center'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Activity className='w-5 h-5 text-neon-violet' />
                <span className='text-2xl font-bold text-foreground'>40ms</span>
              </div>
              <div className='text-sm text-muted-foreground'>Avg Latency</div>
            </div>
            <div className='text-center'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Sparkles className='w-5 h-5 text-neon-pink' />
                <span className='text-2xl font-bold text-foreground'>
                  99.9%
                </span>
              </div>
              <div className='text-sm text-muted-foreground'>Accuracy Rate</div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8'
          >
            <div className='relative flex-1'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
              <Input
                type='email'
                placeholder='Enter your neural endpoint'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-10 h-12 bg-card/80 border-border/50 backdrop-blur-sm focus:border-neon-cyan/50'
              />
            </div>
            <Button
              type='submit'
              variant='hero'
              size='lg'
              className='group relative overflow-hidden'
            >
              <span className='relative z-10 flex items-center gap-2'>
                <Zap className='w-4 h-4' />
                Activate AI
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 opacity-0 group-hover:opacity-100 transition-opacity' />
            </Button>
          </form>

          <div className='flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-neon-cyan rounded-full animate-pulse'></div>
              <span>No credit card required</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-neon-violet rounded-full animate-pulse'></div>
              <span>Free compute units included</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-neon-pink rounded-full animate-pulse'></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
