import { useState } from "react";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Perfect for testing and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1,000 API calls/month",
      "720p video resolution",
      "Community support",
      "Basic analytics",
      "Single language",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams and production apps",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "50,000 API calls/month",
      "1080p video resolution",
      "Priority support",
      "Advanced analytics",
      "Multi-language support",
      "Webhook integrations",
      "Custom model training",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale deployments",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Unlimited API calls",
      "4K video resolution",
      "24/7 dedicated support",
      "Custom SLA",
      "On-premise deployment",
      "Custom integrations",
      "SSO & SAML",
      "Audit logs",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-card border border-border">
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
              <span className="text-xs px-2 py-0.5 rounded-full bg-neon-emerald/20 text-neon-emerald">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 rounded-2xl bg-card border transition-all duration-300",
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-105"
                  : "border-border hover:border-primary/30"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-ai text-primary-foreground text-sm font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold">Custom</div>
                )}
                {isYearly && plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed annually (${plan.yearlyPrice * 12}/year)
                  </p>
                )}
              </div>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full mb-6"
                size="lg"
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-neon-emerald/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-neon-emerald" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
