import {
  Zap,
  Globe,
  Cpu,
  Code2,
  Timer,
  Languages,
  Layers,
  Shield,
  Brain,
  Eye,
  Mic,
  Activity,
  ArrowRight,
  Sparkles,
  Network,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

const pipelineStages = [
  {
    icon: Camera,
    title: "Visual Capture",
    description:
      "High-fidelity camera input with automatic face detection and tracking at 60fps.",
    color: "text-neon-cyan",
    stage: "Input",
    metric: "60fps Capture",
  },
  {
    icon: Brain,
    title: "Neural Processing",
    description:
      "Multi-modal AI engine simultaneously processes lip movements and facial expressions.",
    color: "text-neon-violet",
    stage: "Processing",
    metric: "Dual-Modal AI",
  },
  {
    icon: Mic,
    title: "Audio Sync",
    description:
      "Synchronized audio analysis with visual cues for enhanced speech recognition accuracy.",
    color: "text-neon-pink",
    stage: "Analysis",
    metric: "99.2% Sync Rate",
  },
  {
    icon: Activity,
    title: "Real-Time Inference",
    description:
      "Sub-40ms processing pipeline with continuous gesture and speech pattern recognition.",
    color: "text-neon-emerald",
    stage: "Inference",
    metric: "<40ms Latency",
  },
  {
    icon: Network,
    title: "Context Awareness",
    description:
      "Adaptive learning system that understands environmental context and user intent.",
    color: "text-neon-blue",
    stage: "Context",
    metric: "Adaptive Learning",
  },
  {
    icon: Sparkles,
    title: "Actionable Insights",
    description:
      "Structured output with confidence scores, timestamps, and semantic understanding.",
    color: "text-neon-cyan",
    stage: "Output",
    metric: "Structured Data",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description:
      "On-device processing with zero data retention. Your conversations stay private.",
    color: "text-neon-violet",
    stage: "Security",
    metric: "Zero Retention",
  },
  {
    icon: Globe,
    title: "Universal Access",
    description:
      "Works across devices, platforms, and languages with seamless API integration.",
    color: "text-neon-pink",
    stage: "Integration",
    metric: "Cross-Platform",
  },
];

export function FeaturesSection() {
  return (
    <section
      id='features'
      className='py-24 bg-gradient-to-br from-secondary/20 via-background to-primary/5'
    >
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
            <Brain className='w-4 h-4 text-neon-cyan animate-pulse' />
            <span className='text-sm font-medium text-primary'>
              Neural Processing
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            AI Perception
            <span className='text-gradient block'>Pipeline</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Experience the complete neural processing journey - from visual
            capture to actionable insights, all in real-time with
            enterprise-grade reliability.
          </p>
        </div>

        {/* Pipeline Flow Indicator */}
        <div className='flex justify-center items-center mb-12'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <span className='px-3 py-1 rounded-full bg-primary/10 text-primary font-medium'>
              Input
            </span>
            <ArrowRight className='w-4 h-4' />
            <span className='px-3 py-1 rounded-full bg-secondary text-muted-foreground'>
              Processing
            </span>
            <ArrowRight className='w-4 h-4' />
            <span className='px-3 py-1 rounded-full bg-secondary text-muted-foreground'>
              Analysis
            </span>
            <ArrowRight className='w-4 h-4' />
            <span className='px-3 py-1 rounded-full bg-secondary text-muted-foreground'>
              Output
            </span>
          </div>
        </div>

        {/* Pipeline Stages Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {pipelineStages.map((stage, index) => (
            <div
              key={stage.title}
              className={cn(
                "group relative p-6 rounded-2xl bg-card border border-border",
                "hover:border-primary/30 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10",
                "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:to-primary/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              )}
            >
              {/* Stage Badge */}
              <div className='absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium'>
                {stage.stage}
              </div>

              {/* Icon with Glow Effect */}
              <div
                className={cn(
                  "relative w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
                  "bg-secondary group-hover:scale-110 transition-transform duration-300"
                )}
              >
                <stage.icon className={cn("w-6 h-6", stage.color)} />
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity",
                    "bg-gradient-to-br from-current to-transparent blur-sm"
                  )}
                />
              </div>

              {/* Content */}
              <h3 className='text-lg font-semibold mb-2 group-hover:text-primary transition-colors'>
                {stage.title}
              </h3>
              <p className='text-muted-foreground text-sm leading-relaxed mb-3'>
                {stage.description}
              </p>

              {/* Metric Badge */}
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20'>
                <div className='w-2 h-2 bg-neon-cyan rounded-full animate-pulse'></div>
                <span className='text-xs font-medium text-primary'>
                  {stage.metric}
                </span>
              </div>

              {/* Connection Arrow for non-last items */}
              {index < pipelineStages.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10'>
                  <ArrowRight className='w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors' />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pipeline Summary */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-neon-cyan rounded-full animate-pulse'></div>
              <span className='text-sm font-medium'>End-to-End Processing</span>
            </div>
            <div className='w-px h-4 bg-border'></div>
            <div className='flex items-center gap-2'>
              <Zap className='w-4 h-4 text-neon-emerald' />
              <span className='text-sm text-muted-foreground'>
                Sub-100ms Total Latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
