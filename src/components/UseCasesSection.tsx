import {
  Accessibility,
  Shield,
  Smartphone,
  Heart,
  Radio,
  Lock,
  Users,
  Building,
  GraduationCap,
  Gamepad2,
  Car,
  Zap,
  TrendingUp,
  Eye,
  Mic,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: Accessibility,
    title: "Universal Accessibility",
    description:
      "Break communication barriers for 1.5B people worldwide with hearing impairments through real-time lip-reading and sign language recognition.",
    gradient: "from-neon-cyan to-neon-blue",
    stats: "1.5B+ Users",
    impact: "Breaking Barriers",
    features: [
      "Real-time captions",
      "Sign language detection",
      "Multi-language support",
    ],
    delay: 0,
  },
  {
    icon: Shield,
    title: "Intelligent Security",
    description:
      "Silent authentication and surveillance systems that detect threats through facial expressions and unauthorized gestures.",
    gradient: "from-neon-violet to-neon-pink",
    stats: "99.7% Accuracy",
    impact: "Enhanced Security",
    features: ["Gesture-based auth", "Emotion detection", "Silent monitoring"],
    delay: 0.1,
  },
  {
    icon: Building,
    title: "Smart Buildings & IoT",
    description:
      "Gesture-controlled smart homes, offices, and public spaces. Control lighting, security, and appliances with natural hand movements.",
    gradient: "from-neon-emerald to-neon-cyan",
    stats: "50+ Gestures",
    impact: "Touch-Free Control",
    features: ["Gesture commands", "Voice-free control", "Accessibility first"],
    delay: 0.2,
  },
  {
    icon: Heart,
    title: "Healthcare Innovation",
    description:
      "Assist patients with speech impairments, monitor vital signs through facial cues, and enable silent communication in critical care.",
    gradient: "from-neon-pink to-neon-violet",
    stats: "24/7 Monitoring",
    impact: "Better Patient Care",
    features: [
      "Silent communication",
      "Vital sign monitoring",
      "Emergency detection",
    ],
    delay: 0.3,
  },
  {
    icon: Radio,
    title: "Media & Entertainment",
    description:
      "Automated lip-sync verification, enhanced captioning, and interactive experiences that respond to audience gestures and reactions.",
    gradient: "from-neon-blue to-neon-emerald",
    stats: "10M+ Hours",
    impact: "Content Verification",
    features: ["Lip-sync validation", "Auto-captioning", "Interactive media"],
    delay: 0.4,
  },
  {
    icon: Car,
    title: "Autonomous Vehicles",
    description:
      "Driver monitoring systems that detect fatigue, distraction, and emergency gestures for safer autonomous and semi-autonomous driving.",
    gradient: "from-neon-violet to-neon-cyan",
    stats: "<50ms Response",
    impact: "Safer Transportation",
    features: ["Driver monitoring", "Emergency detection", "Gesture controls"],
    delay: 0.5,
  },
  {
    icon: GraduationCap,
    title: "Education Technology",
    description:
      "Interactive learning experiences with gesture-based controls, accessibility tools for diverse learners, and automated assessment.",
    gradient: "from-neon-emerald to-neon-pink",
    stats: "500K+ Students",
    impact: "Inclusive Learning",
    features: [
      "Gesture navigation",
      "Accessibility tools",
      "Interactive assessment",
    ],
    delay: 0.6,
  },
  {
    icon: Gamepad2,
    title: "Gaming & VR",
    description:
      "Immersive gaming experiences with gesture controls, facial expression recognition, and natural interaction in virtual worlds.",
    gradient: "from-neon-pink to-neon-blue",
    stats: "Real-time Sync",
    impact: "Next-Gen Gaming",
    features: ["Gesture controls", "Emotion recognition", "VR integration"],
    delay: 0.7,
  },
];

export function UseCasesSection() {
  return (
    <section
      id='use-cases'
      className='py-20 md:py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='hidden md:block absolute inset-0 opacity-5'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/20 blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-violet/20 blur-3xl' />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Enhanced Section Header */}
        <div className='text-center mb-12 md:mb-20'>
          <div className='inline-flex items-center gap-2 px-6 py-2 rounded-full glass mb-6 border border-neon-cyan/30'>
            <Target className='w-4 h-4 text-neon-cyan animate-pulse' />
            <span className='text-sm font-medium'>Real-World Applications</span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            Transforming{" "}
            <span className='text-gradient'>Industries Worldwide</span>
          </h2>
          <p className='text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed'>
            From healthcare to entertainment, our AI technology is
            revolutionizing how humans interact with technology, making systems
            more intuitive, accessible, and intelligent.
          </p>

          {/* Global Impact Stats */}
          <div className='flex flex-wrap justify-center gap-8 mt-12'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-neon-cyan mb-1'>50+</div>
              <div className='text-sm text-muted-foreground'>Industries</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-neon-emerald mb-1'>
                2B+
              </div>
              <div className='text-sm text-muted-foreground'>
                Potential Users
              </div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-neon-violet mb-1'>
                99.7%
              </div>
              <div className='text-sm text-muted-foreground'>Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Enhanced Use Cases Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className={cn(
                "group relative p-6 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50",
                "hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10",
                "transition-all duration-500 hover:scale-105",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${useCase.delay}s` }}
            >
              {/* Animated Background Glow */}
              <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-10 blur-xl",
                    useCase.gradient
                  )}
                />
              </div>

              {/* Header Section */}
              <div className='relative z-10 mb-4'>
                <div className='flex items-start justify-between mb-3'>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                      "bg-gradient-to-br group-hover:scale-110 transition-transform duration-300",
                      useCase.gradient
                    )}
                  >
                    <useCase.icon className='w-6 h-6 text-primary-foreground' />
                  </div>
                  <div className='text-right'>
                    <div className='text-xs font-medium text-primary mb-1'>
                      {useCase.stats}
                    </div>
                    <div className='px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary'>
                      {useCase.impact}
                    </div>
                  </div>
                </div>

                <h3 className='text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                  {useCase.title}
                </h3>
              </div>

              {/* Description */}
              <p className='text-muted-foreground text-sm leading-relaxed mb-4 relative z-10'>
                {useCase.description}
              </p>

              {/* Features List */}
              <div className='space-y-2 relative z-10'>
                {useCase.features.map((feature, idx) => (
                  <div key={idx} className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary/60' />
                    <span className='text-xs text-muted-foreground'>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Hover Effect */}
              <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center'>
                  <TrendingUp className='w-4 h-4 text-primary' />
                </div>
              </div>

              {/* Animated Border */}
              <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300' />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <div className='inline-flex items-center gap-4 px-4 sm:px-8 py-2 sm:py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20'>
            <Eye className='w-5 h-5 text-primary' />
            <span className='text-sm font-medium'>
              Explore industry-specific implementations and case studies
            </span>
            <Mic className='w-5 h-5 text-primary' />
          </div>
        </div>
      </div>
    </section>
  );
}
