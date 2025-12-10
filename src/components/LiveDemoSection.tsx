import { useState, useEffect } from "react";
import { Camera, Volume2, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const demoTexts = [
  "Hello, how are you today?",
  "Nice to meet you.",
  "Thank you very much.",
  "Can you help me please?",
  "I understand completely.",
];

const gestures = ["👋 Wave", "👍 Thumbs Up", "✌️ Peace", "🤚 Stop", "👆 Point"];

export function LiveDemoSection() {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [confidence, setConfidence] = useState(97.5);
  const [currentGesture, setCurrentGesture] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Typing animation
  useEffect(() => {
    if (!isActive) return;

    const text = demoTexts[textIndex];
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentText(text.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        setConfidence(95 + Math.random() * 4.9);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCharIndex(0);
        setCurrentText("");
        setTextIndex((i) => (i + 1) % demoTexts.length);
        setCurrentGesture((g) => (g + 1) % gestures.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [charIndex, textIndex, isActive]);

  return (
    <section className='py-24 bg-gradient-to-b from-background to-secondary/20'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            See <span className='text-gradient'>CharadesAI</span> in Action
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Experience real-time lip-reading and gesture recognition powered by
            our state-of-the-art computer vision models.
          </p>
        </div>

        {/* Demo Container */}
        <div className='max-w-5xl mx-auto'>
          <div className='relative rounded-2xl overflow-hidden glass border border-border'>
            {/* Demo Header */}
            <div className='flex items-center justify-between p-4 border-b border-border'>
              <div className='flex items-center gap-3'>
                <div className='flex gap-1.5'>
                  <div className='w-3 h-3 rounded-full bg-destructive' />
                  <div className='w-3 h-3 rounded-full bg-neon-cyan' />
                  <div className='w-3 h-3 rounded-full bg-neon-emerald' />
                </div>
                <span className='text-sm text-muted-foreground'>
                  Live Demo Preview
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
                    isActive
                      ? "bg-neon-emerald/20 text-neon-emerald"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      isActive
                        ? "bg-neon-emerald animate-pulse"
                        : "bg-muted-foreground"
                    )}
                  />
                  {isActive ? "LIVE" : "PAUSED"}
                </div>
              </div>
            </div>

            {/* Demo Content */}
            <div className='grid md:grid-cols-2 gap-6 p-6'>
              {/* Camera Preview */}
              <div className='relative aspect-video bg-card rounded-xl overflow-hidden'>
                {/* Simulated camera feed */}
                <div className='absolute inset-0 bg-gradient-to-br from-background via-card to-secondary flex items-center justify-center'>
                  <div className='relative'>
                    {/* Face outline */}
                    <div className='w-32 h-40 border-2 border-neon-cyan/50 rounded-full animate-pulse' />
                    {/* Face landmark points */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='relative w-24 h-32'>
                        {/* Eyes */}
                        <div className='absolute top-8 left-4 w-3 h-3 border-2 border-neon-cyan rounded-full' />
                        <div className='absolute top-8 right-4 w-3 h-3 border-2 border-neon-cyan rounded-full' />
                        {/* Nose */}
                        <div className='absolute top-14 left-1/2 -translate-x-1/2 w-2 h-2 border-2 border-neon-violet rounded-full' />
                        {/* Mouth */}
                        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-3 border-2 border-neon-pink rounded-lg animate-pulse' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay Controls */}
                <div className='absolute bottom-3 left-3 flex gap-2'>
                  <div className='p-2 rounded-lg glass'>
                    <Camera className='w-4 h-4 text-neon-cyan' />
                  </div>
                  <div className='p-2 rounded-lg glass'>
                    <Volume2 className='w-4 h-4 text-muted-foreground' />
                  </div>
                </div>
              </div>

              {/* Output Panel */}
              <div className='flex flex-col gap-4'>
                {/* Lip Reading Output */}
                <div className='flex-1 p-4 rounded-xl bg-card border border-border'>
                  <div className='flex items-center gap-2 mb-3'>
                    <Zap className='w-4 h-4 text-neon-cyan' />
                    <span className='text-sm font-medium'>
                      Lip Reading Output
                    </span>
                  </div>
                  <div className='h-16 flex items-center'>
                    <p className='text-xl font-medium'>
                      {currentText}
                      <span className='inline-block w-0.5 h-5 bg-neon-cyan ml-1 animate-blink' />
                    </p>
                  </div>
                </div>

                {/* Gesture Recognition */}
                <div className='p-4 rounded-xl bg-card border border-border'>
                  <div className='flex items-center gap-2 mb-3'>
                    <Activity className='w-4 h-4 text-neon-violet' />
                    <span className='text-sm font-medium'>
                      Gesture Detected
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-2xl'>{gestures[currentGesture]}</span>
                    <div className='text-right'>
                      <div className='text-sm text-muted-foreground'>
                        Confidence
                      </div>
                      <div className='text-lg font-bold text-neon-emerald'>
                        {confidence.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-3 gap-2'>
                  <div className='p-3 rounded-lg bg-card border border-border text-center'>
                    <div className='text-xs text-muted-foreground'>Latency</div>
                    <div className='text-sm font-bold text-neon-cyan'>23ms</div>
                  </div>
                  <div className='p-3 rounded-lg bg-card border border-border text-center'>
                    <div className='text-xs text-muted-foreground'>FPS</div>
                    <div className='text-sm font-bold text-neon-violet'>60</div>
                  </div>
                  <div className='p-3 rounded-lg bg-card border border-border text-center'>
                    <div className='text-xs text-muted-foreground'>
                      Accuracy
                    </div>
                    <div className='text-sm font-bold text-neon-emerald'>
                      99.2%
                    </div>
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
