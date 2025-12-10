import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Free",
    description: "Perfect for testing and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: "1,000 API calls/month", included: true },
      { text: "720p video resolution", included: true },
      { text: "Community support", included: true },
      { text: "Basic analytics", included: true },
      { text: "Single language", included: true },
      { text: "Standard latency", included: true },
      { text: "Webhook integrations", included: false },
      { text: "Custom model training", included: false },
      { text: "SLA guarantee", included: false },
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
      { text: "50,000 API calls/month", included: true },
      { text: "1080p video resolution", included: true },
      { text: "Priority email support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Multi-language (10)", included: true },
      { text: "Low latency (<50ms)", included: true },
      { text: "Webhook integrations", included: true },
      { text: "Custom model training", included: true },
      { text: "99.9% SLA", included: true },
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
      { text: "Unlimited API calls", included: true },
      { text: "4K video resolution", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Custom analytics", included: true },
      { text: "All 40+ languages", included: true },
      { text: "Ultra-low latency", included: true },
      { text: "Custom integrations", included: true },
      { text: "Private model training", included: true },
      { text: "Custom SLA", included: true },
      { text: "On-premise deployment", included: true },
      { text: "SSO & SAML", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "How does the free trial work?",
    answer: "Start with 1,000 free API calls per month, no credit card required. Upgrade anytime to unlock more calls and features.",
  },
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
  },
  {
    question: "What counts as an API call?",
    answer: "Each video frame or image processed counts as one API call. Batch processing and streaming have the same per-frame pricing.",
  },
  {
    question: "Do you offer discounts for startups?",
    answer: "Yes! We offer special pricing for early-stage startups. Contact our sales team to learn about our startup program.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for annual enterprise contracts.",
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts. Monthly plans can be cancelled anytime. Annual plans are billed upfront with a 20% discount.",
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Pricing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
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
        </section>

        {/* Pricing Cards */}
        <section className="py-24">
          <div className="container mx-auto px-4">
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
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-ai text-primary-foreground text-sm font-medium">
                        <Zap className="w-3.5 h-3.5" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

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

                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full mb-6"
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                          feature.included ? "bg-neon-emerald/20" : "bg-muted"
                        )}>
                          <Check className={cn(
                            "w-3 h-3",
                            feature.included ? "text-neon-emerald" : "text-muted-foreground"
                          )} />
                        </div>
                        <span className={cn(
                          "text-sm",
                          feature.included ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our pricing.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team is here to help. Contact us for custom pricing or enterprise solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="xl">
                Contact Sales
              </Button>
              <Button variant="heroOutline" size="xl">
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Pricing;
