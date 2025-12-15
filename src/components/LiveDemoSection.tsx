import { useState, useEffect } from "react";
import {
  Camera,
  Volume2,
  Zap,
  Activity,
  Brain,
  Eye,
  Mic,
  Target,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const demoTexts = [
  "Hello, how are you today?",
  "Nice to meet you.",
  "Thank you very much.",
  "Can you help me please?",
  "I understand completely.",
  "Let's get started!",
  "That sounds great.",
  "Absolutely correct.",
  "Perfect timing.",
  "See you later.",
];

const gestures = [
  "👋 Wave",
  "👍 Thumbs Up",
  "✌️ Peace",
  "🤚 Stop",
  "👆 Point",
  "✊ Fist",
  "🖐️ High Five",
  "👎 Thumbs Down",
];

export function LiveDemoSection() {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [confidence, setConfidence] = useState(97.5);
  const [currentGesture, setCurrentGesture] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState(0);

  // Enhanced typing animation with processing steps
  useEffect(() => {
    if (!isActive) return;

    const text = demoTexts[textIndex];
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentText(text.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        setConfidence(95 + Math.random() * 4.9);
        setProcessingStep((s) => (s + 1) % 4);
        setNeuralActivity(Math.random());
      }, 60 + Math.random() * 40);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCharIndex(0);
        setCurrentText("");
        setTextIndex((i) => (i + 1) % demoTexts.length);
        setCurrentGesture((g) => (g + 1) % gestures.length);
        setProcessingStep(0);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [charIndex, textIndex, isActive]);

  const processingSteps = [
    "Analyzing",
    "Processing",
    "Translating",
    "Complete",
  ];

  return (
    <section
      id='live-demo'
      className='py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-secondary/20 relative overflow-hidden'
    >
      {/* Background Neural Network Pattern */}
      <div className='hidden md:block absolute inset-0 opacity-5'>
        <svg width='100%' height='100%' className='absolute inset-0'>
          <defs>
            <pattern
              id='neural'
              x='0'
              y='0'
              width='100'
              height='100'
              patternUnits='userSpaceOnUse'
            >
              <circle cx='20' cy='20' r='1' fill='currentColor' />
              <circle cx='80' cy='30' r='1' fill='currentColor' />
              <circle cx='40' cy='70' r='1' fill='currentColor' />
              <circle cx='90' cy='80' r='1' fill='currentColor' />
              <line
                x1='20'
                y1='20'
                x2='80'
                y2='30'
                stroke='currentColor'
                strokeWidth='0.5'
              />
              <line
                x1='80'
                y1='30'
                x2='40'
                y2='70'
                stroke='currentColor'
                strokeWidth='0.5'
              />
              <line
                x1='40'
                y1='70'
                x2='90'
                y2='80'
                stroke='currentColor'
                strokeWidth='0.5'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#neural)' />
        </svg>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Enhanced Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-neon-cyan/30'>
            <Brain className='w-4 h-4 text-neon-cyan animate-pulse' />
            <span className='text-sm font-medium'>
              Visual Intelligence - Live
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            See <span className='text-gradient'>AI </span>
            Understand the <span className='text-gradient'>Unspoken</span>
          </h2>
          <p className='text-muted-foreground max-w-3xl mx-auto text-lg'>
            Witness real-time neural inference as silent speech and human motion
            are transformed into meaningful, machine-readable insight.
          </p>
        </div>

        {/* Immersive Demo Container */}
        <div className='max-w-6xl mx-auto'>
          <div className='relative rounded-3xl overflow-hidden glass border border-border/50 shadow-2xl shadow-primary/10'>
            {/* Dynamic Header */}
            <div className='flex items-center justify-between p-4 md:p-6 border-b border-border/50 bg-gradient-to-r from-background/80 to-primary/5'>
              <div className='flex items-center gap-4'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 rounded-full bg-destructive animate-pulse' />
                  <div
                    className='w-3 h-3 rounded-full bg-neon-cyan animate-pulse'
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className='w-3 h-3 rounded-full bg-neon-emerald animate-pulse'
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
                <div>
                  <span className='text-sm font-medium'>
                    CharadesAI Live Processing
                  </span>
                  <div className='text-xs text-muted-foreground'>
                    Real-time neural analysis active
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-emerald/20 border border-neon-emerald/30'>
                  <div className='w-2 h-2 rounded-full bg-neon-emerald animate-pulse' />
                  <span className='text-xs font-medium text-neon-emerald'>
                    LIVE
                  </span>
                </div>
                <div className='text-xs text-muted-foreground'>
                  Processing: {processingSteps[processingStep]}
                </div>
              </div>
            </div>

            {/* Enhanced Demo Content */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-0'>
              {/* Advanced Camera Feed */}
              <div className='lg:col-span-2 relative aspect-square lg:aspect-auto bg-gradient-to-br from-background via-card/50 to-primary/10'>
                {/* Neural Processing Overlay */}
                <div className='hidden md:block absolute inset-0'>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className='absolute w-1 h-1 rounded-full bg-neon-cyan/60 animate-ping'
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 80}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Face Detection Grid */}
                <div className='absolute inset-0 flex items-center justify-center p-4 md:p-8'>
                  <div className='relative w-full max-w-sm aspect-square'>
                    {/* Face bounding box */}
                    <div className='absolute inset-4 border-2 border-neon-cyan/70 rounded-2xl animate-pulse'>
                      <div className='absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-neon-cyan/20 rounded text-xs font-medium text-neon-cyan border border-neon-cyan/30'>
                        Face Detected
                      </div>
                    </div>
                    <img
                      src={"/images/face detected.webp"}
                      alt='Face Detected'
                      className='w-full h-full object-cover rounded-2xl'
                    />
                    {/* Facial landmarks */}
                    {/* <div className='absolute inset-4'>
                      <div className='absolute top-1/3 left-1/4 w-4 h-4 border-2 border-neon-emerald rounded-full animate-pulse' />
                      <div className='absolute top-1/3 right-1/4 w-4 h-4 border-2 border-neon-emerald rounded-full animate-pulse' />

                      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 border-2 border-neon-violet rounded-full animate-pulse' />

                      <div className='absolute bottom-1/3 left-1/2 -translate-x-1/2 w-12 h-4 border-2 border-neon-pink rounded-lg animate-pulse'>
                        <div className='absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neon-pink/20 rounded text-xs font-medium text-neon-pink border border-neon-pink/30'>
                          Lip Reading Active
                        </div>
                        <svg
                          className='absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-4'
                          viewBox='0 0 64 16'
                        >
                          <path
                            d='M0,8 Q8,4 16,8 T32,8 T48,8 T64,8'
                            stroke='url(#waveGradient)'
                            strokeWidth='1.5'
                            fill='none'
                            className='animate-pulse'
                          />
                          <defs>
                            <linearGradient
                              id='waveGradient'
                              x1='0%'
                              y1='0%'
                              x2='100%'
                              y2='0%'
                            >
                              <stop offset='0%' stopColor='#00ffff' />
                              <stop offset='100%' stopColor='#ff00ff' />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div> */}

                    <div className='absolute top-1/4 right-1/4 w-3 h-3 border-2 border-neon-violet rounded-full animate-ping' />
                    <div
                      className='absolute bottom-1/4 left-1/4 w-3 h-3 border-2 border-neon-violet rounded-full animate-ping'
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                </div>

                {/* Camera Controls */}
                <div className='hidden md:flex md:absolute md:bottom-4 md:left-4 gap-2'>
                  <div className='p-3 rounded-xl glass border border-neon-cyan/30 hover:border-neon-cyan/50 transition-colors'>
                    <Camera className='w-5 h-5 text-neon-cyan' />
                  </div>
                  <div className='p-3 rounded-xl glass border border-muted-foreground/30'>
                    <Volume2 className='w-5 h-5 text-muted-foreground' />
                  </div>
                </div>

                {/* Processing Indicator */}
                <div className='hidden md:block md:absolute md:top-4 md:right-4 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30'>
                  <div className='flex items-center gap-2'>
                    <Brain className='w-3 h-3 text-primary animate-pulse' />
                    <span className='text-xs font-medium'>AI Active</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Output Panel */}
              <div className='lg:col-span-3 p-4 md:p-6 space-y-6'>
                {/* Lip Reading Output */}
                <div className='p-6 rounded-2xl bg-gradient-to-r from-card to-card/80 border border-border/50 shadow-lg'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='p-1 rounded-lg bg-neon-cyan/20 border border-neon-cyan/30'>
                        <img
                          src={"/images/face detected icon.webp"}
                          alt='Lip Reading'
                          className='w-8 h-8 text-neon-cyan rounded-md'
                        />
                      </div>
                      <div>
                        <span className='font-medium'>
                          Lip Reading Translation
                        </span>
                        <div className='text-xs text-muted-foreground'>
                          Real-time speech recognition
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-xs text-muted-foreground'>
                        Confidence
                      </div>
                      <div className='text-lg font-bold text-neon-cyan'>
                        {confidence.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className='min-h-[3rem] flex items-center'>
                    <p className='text-xl font-medium leading-relaxed'>
                      {currentText}
                      {currentText && (
                        <span className='inline-block w-0.5 h-6 bg-neon-cyan ml-1 animate-blink' />
                      )}
                    </p>
                  </div>
                  {/* Processing visualization */}
                  <div className='mt-4 flex gap-1'>
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className='h-1 bg-neon-cyan/30 rounded-full flex-1 animate-pulse'
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          opacity: i < currentText.length ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Gesture Recognition */}
                <div className='p-4 md:p-6 rounded-2xl bg-gradient-to-r from-card to-card/80 border border-border/50 shadow-lg'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='p-1 rounded-lg bg-neon-violet/20 border border-neon-violet/30'>
                        <img
                          src={"/images/face detected icon (2).webp"}
                          alt='Gesture Recognition'
                          className='w-8 h-8 rounded-md'
                        />
                      </div>
                      <div>
                        <span className='font-medium'>Gesture Recognition</span>
                        <div className='text-xs text-muted-foreground'>
                          Motion analysis active
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-xs text-muted-foreground'>
                        Detected
                      </div>
                      <div className='text-lg font-bold text-neon-violet'>
                        High Confidence
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <span className='text-3xl'>
                        {gestures[currentGesture]}
                      </span>
                      <div className='px-3 py-1 rounded-full bg-neon-violet/20 border border-neon-violet/30'>
                        <span className='text-sm font-medium text-neon-violet'>
                          Gesture Detected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Metrics Grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div className='p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 text-center group hover:border-neon-cyan/30 transition-colors'>
                    <div className='text-xs text-muted-foreground mb-1'>
                      Latency
                    </div>
                    <div className='text-lg font-bold text-neon-cyan group-hover:scale-110 transition-transform'>
                      23ms
                    </div>
                  </div>
                  <div className='p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 text-center group hover:border-neon-violet/30 transition-colors'>
                    <div className='text-xs text-muted-foreground mb-1'>
                      FPS
                    </div>
                    <div className='text-lg font-bold text-neon-violet group-hover:scale-110 transition-transform'>
                      60
                    </div>
                  </div>
                  <div className='p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 text-center group hover:border-neon-emerald/30 transition-colors'>
                    <div className='text-xs text-muted-foreground mb-1'>
                      Accuracy
                    </div>
                    <div className='text-lg font-bold text-neon-emerald group-hover:scale-110 transition-transform'>
                      99.2%
                    </div>
                  </div>
                  <div className='p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 text-center group hover:border-neon-pink/30 transition-colors'>
                    <div className='text-xs text-muted-foreground mb-1'>
                      Neural Load
                    </div>
                    <div className='text-lg font-bold text-neon-pink group-hover:scale-110 transition-transform'>
                      {(neuralActivity * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* AI Processing Status */}
                <div className='flex items-center justify-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20'>
                  <Sparkles className='w-5 h-5 text-primary animate-pulse' />
                  <span className='text-sm font-medium'>
                    AI Neural Networks Processing Live Data
                  </span>
                  <div className='flex gap-1'>
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className='w-2 h-2 rounded-full bg-primary animate-pulse'
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
