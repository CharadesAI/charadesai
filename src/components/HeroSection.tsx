import { ArrowRight, Play, Zap, Mic, Hand, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className='relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5'>
      {/* Dynamic Background */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 md:opacity-20 dark:opacity-20 md:dark:opacity-30'
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Animated Speech Waves */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Speech Wave Animation */}
        <div className='hidden md:block md:absolute md:top-1/4 md:left-1/4 md:w-96 md:h-32 md:opacity-30'>
          <svg viewBox='0 0 400 100' className='w-full h-full'>
            <path
              d='M0,50 Q50,20 100,50 T200,50 T300,50 T400,50'
              stroke='url(#speechGradient)'
              strokeWidth='2'
              fill='none'
              className='animate-pulse'
            >
              <animate
                attributeName='d'
                dur='2s'
                repeatCount='indefinite'
                values='M0,50 Q50,20 100,50 T200,50 T300,50 T400,50;
                        M0,50 Q50,80 100,50 T200,50 T300,50 T400,50;
                        M0,50 Q50,20 100,50 T200,50 T300,50 T400,50'
              />
            </path>
            <defs>
              <linearGradient
                id='speechGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop offset='0%' stopColor='#00ffff' />
                <stop offset='50%' stopColor='#ff00ff' />
                <stop offset='100%' stopColor='#ffff00' />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Gesture Recognition Circles */}
        <div className='hidden md:block md:absolute md:top-1/3 md:right-1/4 md:w-64 md:h-64'>
          <div
            className='absolute inset-0 rounded-full border-2 border-neon-cyan/20 animate-ping'
            style={{ animationDuration: "3s" }}
          />
          <div
            className='absolute inset-4 rounded-full border border-neon-emerald/30 animate-ping'
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          />
          <div
            className='absolute inset-8 rounded-full border border-neon-violet/40 animate-ping'
            style={{ animationDuration: "1.5s", animationDelay: "1s" }}
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <Hand className='w-8 h-8 text-neon-cyan animate-pulse' />
          </div>
        </div>

        {/* Floating AI Processing Indicators */}
        <div className='hidden md:block'>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet opacity-60 animate-float'
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Real-time Processing Text */}
        <div className='hidden md:block absolute bottom-1/4 left-1/3 transform -translate-x-1/2'>
          <div className='text-neon-cyan/60 text-sm font-mono animate-pulse'>
            Processing: "Hello World" → [H-E-L-L-O W-O-R-L-D]
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-4 py-20 md:py-32 lg:py-40'>
        <div className='max-w-5xl mx-auto text-center'>
          {/* Live Processing Badge */}
          <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full glass mb-8 animate-fade-in-up border border-neon-cyan/30'>
            <div className='w-2 h-2 rounded-full bg-neon-emerald animate-pulse' />
            <Zap className='w-4 h-4 text-neon-cyan' />
            <span className='text-sm font-medium text-foreground'>
              LIVE: Processing 1,247,893 requests/min
            </span>
          </div>

          {/* Dynamic Headline */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up [animation-delay:0.1s]'>
            <span className='text-foreground'>See What You </span>
            <span className='text-gradient animate-shimmer'>Can't Hear</span>
            <br />
            <span className='text-foreground'>Read What You </span>
            <span className='text-gradient animate-shimmer'>Can't See</span>
          </h1>

          {/* Technology Showcase */}
          <div className='flex items-center justify-center gap-8 mb-8 animate-fade-in-up [animation-delay:0.2s]'>
            <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
              <Mic className='w-4 h-4 text-neon-cyan' />
              <span className='text-sm font-medium'>Lip Reading</span>
            </div>
            <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
              <Hand className='w-4 h-4 text-neon-emerald' />
              <span className='text-sm font-medium'>Gesture Recognition</span>
            </div>
            <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
              <Eye className='w-4 h-4 text-neon-violet' />
              <span className='text-sm font-medium'>Real-Time AI</span>
            </div>
          </div>

          {/* Compelling Subheadline */}
          <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up [animation-delay:0.3s]'>
            Transform silent communication into actionable insights. Our AI
            deciphers lip movements and gestures with{" "}
            <span className='text-neon-cyan font-semibold'>99.7% accuracy</span>
            , enabling accessibility, security, and intelligent automation
            across industries.
          </p>

          {/* Enhanced CTAs */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up [animation-delay:0.4s]'>
            <Button
              variant='hero'
              size='xl'
              className='group shadow-2xl shadow-neon-cyan/25 w-full sm:w-auto'
              onClick={() => {
                const demoSection = document.getElementById("live-demo");
                demoSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Sparkles className='w-5 h-5 mr-2' />
              Try Live Demo
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </Button>
            <Button
              variant='heroOutline'
              size='xl'
              className='group border-neon-cyan/50 hover:border-neon-cyan w-full sm:w-auto'
              onClick={() => {
                // Open video modal or external video link
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank"
                );
              }}
            >
              <Play className='w-5 h-5 mr-2' />
              Watch AI in Action
            </Button>
          </div>

          {/* Real-Time Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.5s]'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-neon-cyan mb-1'>
                99.7%
              </div>
              <div className='text-sm text-muted-foreground'>
                Recognition Accuracy
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-neon-emerald mb-1'>
                &lt;50ms
              </div>
              <div className='text-sm text-muted-foreground'>
                Processing Latency
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-neon-violet mb-1'>
                24/7
              </div>
              <div className='text-sm text-muted-foreground'>
                Real-Time Operation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scroll Prompt */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up [animation-delay:1s]'>
        <div className='flex flex-col items-center gap-2 text-muted-foreground/60'>
          <div className='w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2'>
            <div className='w-1 h-2 rounded-full bg-muted-foreground/50 animate-bounce' />
          </div>
          <span className='text-xs'>Explore More</span>
        </div>
      </div>
    </section>
  );
}
