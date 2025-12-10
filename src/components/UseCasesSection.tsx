import {
  Accessibility,
  Shield,
  Smartphone,
  Heart,
  Radio,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: Accessibility,
    title: "Accessibility",
    description:
      "Enable deaf and hard-of-hearing users to understand speech through real-time lip-reading captions.",
    gradient: "from-neon-blue to-neon-cyan",
    delay: 0,
  },
  {
    icon: Shield,
    title: "Smart Surveillance",
    description:
      "Silent speech recognition for security monitoring without audio dependencies.",
    gradient: "from-neon-violet to-neon-pink",
    delay: 0.1,
  },
  {
    icon: Smartphone,
    title: "IoT Devices",
    description:
      "Gesture controls for smart home devices, kiosks, and interactive displays.",
    gradient: "from-neon-cyan to-neon-emerald",
    delay: 0.2,
  },
  {
    icon: Heart,
    title: "Healthcare",
    description:
      "Patient communication tools for those with speech impairments or intubated patients.",
    gradient: "from-neon-pink to-neon-violet",
    delay: 0.3,
  },
  {
    icon: Radio,
    title: "Media & Broadcasting",
    description:
      "Automated lip-sync verification and enhanced captioning for video content.",
    gradient: "from-neon-emerald to-neon-cyan",
    delay: 0.4,
  },
  {
    icon: Lock,
    title: "Security Systems",
    description:
      "Multi-factor authentication using lip patterns and gesture verification.",
    gradient: "from-neon-blue to-neon-violet",
    delay: 0.5,
  },
];

export function UseCasesSection() {
  return (
    <section id='use-cases' className='py-24 bg-background'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
            Use Cases
          </span>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Built for <span className='text-gradient'>Every Industry</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            From accessibility tools to enterprise security, CharadesAI adapts
            to your unique needs.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={cn(
                "group relative p-6 rounded-2xl bg-card border border-border",
                "hover:border-primary/50 transition-all duration-300",
                "hover:shadow-xl hover:shadow-primary/5"
              )}
              style={{ animationDelay: `${useCase.delay}s` }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
                  "bg-gradient-to-br",
                  useCase.gradient
                )}
              >
                <useCase.icon className='w-6 h-6 text-primary-foreground' />
              </div>

              {/* Content */}
              <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                {useCase.title}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {useCase.description}
              </p>

              {/* Hover Glow Effect */}
              <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5",
                    useCase.gradient
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
