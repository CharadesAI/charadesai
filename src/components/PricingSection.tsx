import { useState } from "react";
import {
  Check,
  ArrowRight,
  Zap,
  Cpu,
  Brain,
  Activity,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const computeTiers = [
  {
    name: "Starter",
    description: "Perfect for prototyping and small applications",
    monthlyPrice: 0,
    yearlyPrice: 0,
    computeUnits: "10",
    concurrentSessions: "1",
    modelComplexity: "Basic",
    features: [
      "10 compute units/month",
      "1 concurrent session",
      "Basic gesture models",
      "Community support",
      "Standard resolution (720p)",
      "Basic analytics dashboard",
    ],
    cta: "Start Building",
    popular: false,
    icon: Cpu,
    color: "text-neon-cyan",
  },
  {
    name: "Professional",
    description: "For production apps and growing teams",
    monthlyPrice: 149,
    yearlyPrice: 119,
    computeUnits: "500",
    concurrentSessions: "10",
    modelComplexity: "Advanced",
    features: [
      "500 compute units/month",
      "10 concurrent sessions",
      "Advanced multi-modal AI",
      "Priority support",
      "HD resolution (1080p)",
      "Real-time analytics",
      "Webhook integrations",
      "Custom model fine-tuning",
      "Multi-language support",
    ],
    cta: "Start Pro Plan",
    popular: true,
    icon: Brain,
    color: "text-neon-violet",
  },
  {
    name: "Enterprise",
    description: "For large-scale AI deployments",
    monthlyPrice: null,
    yearlyPrice: null,
    computeUnits: "∞",
    concurrentSessions: "∞",
    modelComplexity: "Custom",
    features: [
      "Unlimited compute units",
      "Unlimited concurrent sessions",
      "Custom AI model development",
      "24/7 dedicated support",
      "4K resolution processing",
      "On-premise deployment",
      "Custom SLAs",
      "SSO & SAML integration",
      "Advanced security & compliance",
      "Dedicated infrastructure",
    ],
    cta: "Contact Enterprise Sales",
    popular: false,
    icon: Activity,
    color: "text-neon-pink",
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section
      id='pricing'
      className='py-24 bg-gradient-to-br from-secondary/20 via-background to-primary/5'
    >
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
            <Cpu className='w-4 h-4 text-neon-cyan animate-pulse' />
            <span className='text-sm font-medium text-primary'>
              Compute Tiers
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            AI Processing
            <span className='text-gradient block'>Power Levels</span>
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto mb-8'>
            Scale your AI capabilities with compute units designed for real-time
            lip-reading and gesture recognition processing.
          </p>

          {/* Billing Toggle */}
          <div className='inline-flex items-center gap-4 p-1 rounded-full bg-card border border-border'>
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                !isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className='text-xs px-2 py-0.5 rounded-full bg-neon-emerald/20 text-neon-emerald'>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Compute Tiers Cards */}
        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {computeTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative p-8 rounded-2xl bg-card border transition-all duration-300",
                tier.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-105"
                  : "border-border hover:border-primary/30 hover:scale-102"
              )}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2'>
                  <div className='flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-ai text-primary-foreground text-sm font-medium'>
                    <Zap className='w-3.5 h-3.5' />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier Header with Icon */}
              <div className='mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      "bg-secondary"
                    )}
                  >
                    <tier.icon className={cn("w-5 h-5", tier.color)} />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>{tier.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {tier.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compute Metrics */}
              <div className='grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-secondary/50'>
                <div className='text-center'>
                  <div className='text-lg font-bold text-foreground'>
                    {tier.computeUnits}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    Compute Units
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-lg font-bold text-foreground'>
                    {tier.concurrentSessions}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    Concurrent
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-lg font-bold text-foreground'>
                    {tier.modelComplexity}
                  </div>
                  <div className='text-xs text-muted-foreground'>AI Models</div>
                </div>
              </div>

              {/* Price */}
              <div className='mb-6'>
                {tier.monthlyPrice !== null ? (
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-bold'>
                      ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className='text-muted-foreground'>/month</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <InfinityIcon className='w-6 h-6 text-neon-pink' />
                    <span className='text-2xl font-bold'>Custom Pricing</span>
                  </div>
                )}
                {isYearly &&
                  tier.monthlyPrice !== null &&
                  tier.monthlyPrice > 0 && (
                    <p className='text-sm text-muted-foreground mt-1'>
                      Billed annually (${tier.yearlyPrice * 12}/year)
                    </p>
                  )}
              </div>

              {/* CTA */}
              <Button
                variant={tier.popular ? "hero" : "outline"}
                className='w-full mb-6'
                size='lg'
              >
                {tier.cta}
                <ArrowRight className='w-4 h-4' />
              </Button>

              {/* Features */}
              <ul className='space-y-3'>
                {tier.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-3'>
                    <div className='w-5 h-5 rounded-full bg-neon-emerald/20 flex items-center justify-center mt-0.5'>
                      <Check className='w-3 h-3 text-neon-emerald' />
                    </div>
                    <span className='text-sm text-muted-foreground'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Usage Calculator Hint */}
        <div className='text-center mt-12'>
          <p className='text-sm text-muted-foreground'>
            Not sure which tier is right for you?
            <span className='text-primary font-medium ml-1'>
              Check our usage calculator
            </span>{" "}
            to estimate your compute needs.
          </p>
        </div>
      </div>
    </section>
  );
}
