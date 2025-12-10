import { Zap, Shield, Globe, TrendingUp, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const reasons = [
  {
    icon: Zap,
    title: "Fastest Inference",
    description:
      "Sub-50ms latency with our optimized models. Real-time processing at 60 FPS.",
    stat: "<50ms",
    statLabel: "Latency",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified, GDPR compliant, end-to-end encryption.",
    stat: "SOC 2",
    statLabel: "Certified",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Edge nodes in 40+ regions for minimal latency worldwide.",
    stat: "40+",
    statLabel: "Regions",
  },
  {
    icon: TrendingUp,
    title: "99.7% Accuracy",
    description:
      "Industry-leading accuracy trained on millions of real-world samples.",
    stat: "99.7%",
    statLabel: "Accuracy",
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Enterprise SLA with automatic failover and redundancy.",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "24/7 technical support with dedicated account managers for enterprise.",
    stat: "24/7",
    statLabel: "Support",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className='py-24 bg-secondary/30 overflow-hidden'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
            Why CharadesAI
          </span>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Built for <span className='text-gradient'>Scale & Performance</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Enterprise-grade infrastructure trusted by leading companies
            worldwide.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={cn(
                "group relative p-6 rounded-2xl bg-card border border-border",
                "hover:border-primary/30 transition-all duration-300",
                "hover:shadow-lg"
              )}
            >
              <div className='flex items-start justify-between mb-4'>
                {/* Icon */}
                <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                  <reason.icon className='w-6 h-6 text-primary' />
                </div>

                {/* Stat */}
                <div className='text-right'>
                  <div className='text-2xl font-bold text-gradient'>
                    {reason.stat}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {reason.statLabel}
                  </div>
                </div>
              </div>

              <h3 className='text-lg font-semibold mb-2'>{reason.title}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
