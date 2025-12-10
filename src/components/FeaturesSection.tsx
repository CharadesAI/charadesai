import { 
  Zap, 
  Globe, 
  Cpu, 
  Code2, 
  Timer, 
  Languages,
  Layers,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Lip-Reading AI Engine",
    description: "State-of-the-art deep learning models trained on millions of video samples for unmatched accuracy.",
    color: "text-neon-cyan",
  },
  {
    icon: Layers,
    title: "Gesture Recognition",
    description: "Detect and classify hand gestures, body poses, and sign language in real-time.",
    color: "text-neon-violet",
  },
  {
    icon: Timer,
    title: "Ultra-Low Latency",
    description: "Sub-50ms inference time ensures smooth, real-time processing for live applications.",
    color: "text-neon-emerald",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Trained on 40+ languages with custom model fine-tuning available for specialized vocabularies.",
    color: "text-neon-pink",
  },
  {
    icon: Cpu,
    title: "Edge AI Compatible",
    description: "Optimized models for on-device processing. Deploy on mobile, IoT, and edge devices.",
    color: "text-neon-blue",
  },
  {
    icon: Code2,
    title: "Developer SDKs",
    description: "Native SDKs for JavaScript, Python, and PHP with comprehensive documentation.",
    color: "text-neon-cyan",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Deploy anywhere with our globally distributed edge network for minimal latency.",
    color: "text-neon-violet",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified, GDPR compliant, with end-to-end encryption.",
    color: "text-neon-emerald",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="text-gradient">Vision AI</span> Capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build intelligent, accessible applications with computer vision.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group p-6 rounded-2xl bg-card border border-border",
                "hover:border-primary/30 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-lg mb-4 flex items-center justify-center",
                "bg-secondary"
              )}>
                <feature.icon className={cn("w-5 h-5", feature.color)} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
