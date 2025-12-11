import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Layers,
  Timer,
  Languages,
  Cpu,
  Code2,
  Globe,
  Shield,
  Eye,
  Brain,
  Fingerprint,
  Mic,
  Video,
  Gauge,
  Server,
  Lock,
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const mainFeatures = [
  {
    icon: Eye,
    title: "Lip-Reading AI Engine",
    description:
      "Our state-of-the-art deep learning models analyze lip movements with unprecedented accuracy. Trained on millions of video samples across diverse demographics, lighting conditions, and angles.",
    highlights: [
      "99.7% accuracy on benchmark datasets",
      "Works with partial face visibility",
      "Noise-resistant processing",
    ],
    gradient: "from-neon-blue to-neon-cyan",
  },
  {
    icon: Layers,
    title: "Gesture Recognition",
    description:
      "Detect and classify hand gestures, body poses, and sign language in real-time. Support for custom gesture libraries and multi-hand tracking.",
    highlights: [
      "21+ hand landmarks per hand",
      "Full body pose estimation",
      "Custom gesture training",
    ],
    gradient: "from-neon-violet to-neon-pink",
  },
  {
    icon: Brain,
    title: "Multi-Modal Fusion",
    description:
      "Combine lip-reading with audio for superior accuracy in noisy environments. Our fusion models adapt to signal quality in real-time.",
    highlights: [
      "Audio-visual sync detection",
      "Adaptive confidence scoring",
      "Fallback processing",
    ],
    gradient: "from-neon-cyan to-neon-emerald",
  },
];

const technicalSpecs = [
  {
    icon: Timer,
    label: "Latency",
    value: "<50ms",
    description: "End-to-end processing time",
  },
  {
    icon: Gauge,
    label: "Throughput",
    value: "60 FPS",
    description: "Real-time video processing",
  },
  {
    icon: Server,
    label: "Uptime",
    value: "99.9%",
    description: "Enterprise SLA guaranteed",
  },
  {
    icon: Globe,
    label: "Languages",
    value: "40+",
    description: "Supported languages",
  },
];

const additionalFeatures = [
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Trained on 40+ languages with custom vocabulary fine-tuning.",
  },
  {
    icon: Cpu,
    title: "Edge AI Compatible",
    description: "Optimized models for mobile, IoT, and edge devices.",
  },
  {
    icon: Code2,
    title: "Developer SDKs",
    description: "Native SDKs for JavaScript, Python, PHP, and more.",
  },
  {
    icon: Video,
    title: "Video Processing",
    description: "Batch processing for recorded video analysis.",
  },
  {
    icon: Fingerprint,
    title: "Speaker Identification",
    description: "Identify who is speaking in multi-person scenarios.",
  },
  {
    icon: Mic,
    title: "Audio Enhancement",
    description: "AI-powered audio reconstruction from lip movements.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "On-premise deployment options for sensitive data.",
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero with Full-Width Background */}
        <section className='relative py-48 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-20 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1920&h=1080&fit=crop&crop=center'
              alt='AI and computer vision technology background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='text-center'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-card/80 border border-border backdrop-blur-sm text-card-foreground text-sm font-medium mb-6'>
                Features
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
                Powerful <span className='text-gradient'>Vision AI</span>{" "}
                Capabilities
              </h1>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
                Everything you need to build intelligent, accessible
                applications with computer vision. Enterprise-grade accuracy and
                performance.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button
                  variant='hero'
                  size='lg'
                  className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/90 text-card-foreground hover:text-card-foreground'
                  onClick={() => navigate("/pricing")}
                >
                  Start Free Trial <ArrowRight className='w-4 h-4' />
                </Button>
                <Button
                  variant='heroOutline'
                  size='lg'
                  className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/90 text-card-foreground hover:text-card-foreground'
                  onClick={() => navigate("/contact")}
                >
                  View API Docs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs Bar - Redesigned */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {technicalSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className='text-center p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300'
                >
                  <spec.icon className='w-8 h-8 mx-auto mb-3 text-neon-cyan' />
                  <div className='text-3xl font-bold mb-1'>{spec.value}</div>
                  <div className='text-sm font-medium mb-1'>{spec.label}</div>
                  <div className='text-xs text-muted-foreground'>
                    {spec.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Features - Redesigned Grid */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Core <span className='text-gradient'>AI Capabilities</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Advanced computer vision technologies powering the next
                generation of intelligent applications.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {mainFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className='group p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105'
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br",
                      feature.gradient
                    )}
                  >
                    <feature.icon className='w-8 h-8 text-primary-foreground' />
                  </div>
                  <h3 className='text-xl font-bold mb-4'>{feature.title}</h3>
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    {feature.description}
                  </p>
                  <ul className='space-y-3'>
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className='flex items-center gap-3'>
                        <div className='w-5 h-5 rounded-full bg-neon-emerald/20 flex items-center justify-center'>
                          <Check className='w-3 h-3 text-neon-emerald' />
                        </div>
                        <span className='text-sm'>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid - Redesigned */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                And Much <span className='text-gradient'>More</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                A complete toolkit for building vision-powered applications.
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {additionalFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className='group p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105'
                >
                  <feature.icon className='w-8 h-8 text-neon-cyan mb-4 group-hover:scale-110 transition-transform duration-300' />
                  <h3 className='font-semibold mb-2'>{feature.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Redesigned */}
        <section className='relative py-24 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Get Started?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Start building with CharadesAI today. Free tier includes 1,000 API
              calls per month.
            </p>
            <Button
              variant='hero'
              size='xl'
              className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/90 text-card-foreground hover:text-card-foreground'
              onClick={() => navigate("/pricing")}
            >
              Start Free Trial <ArrowRight className='w-5 h-5' />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Features;
