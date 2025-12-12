import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import {
  Check,
  ArrowRight,
  Zap,
  HelpCircle,
  Calculator,
  TrendingUp,
  Users,
  Crown,
  Star,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { plans } from "@/lib/pricng";

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
  },
  {
    question: "What counts as an API call?",
    answer:
      "Each video frame or image processed counts as one API call. Batch processing and streaming have the same per-frame pricing.",
  },
  {
    question: "Do you offer discounts for startups?",
    answer:
      "Yes! We offer special pricing for early-stage startups. Contact our sales team to learn about our startup program.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and wire transfers for annual enterprise contracts.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No long-term contracts. Monthly plans can be cancelled anytime. Annual plans are billed upfront with a 20% discount.",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);

  const [loading, setLoading] = useState(true);
  const [calculatorValues, setCalculatorValues] = useState({
    apiCalls: 5000,
    resolution: "1080p",
    languages: 5,
    support: "priority",
  });

  const calculatePrice = () => {
    // Base pricing tiers that match the plans
    if (calculatorValues.apiCalls <= 5000) {
      // Basic tier - $29/month
      const basePrice = 29;
      return isYearly ? basePrice * 12 : basePrice;
    } else if (calculatorValues.apiCalls <= 50000) {
      // Pro tier pricing - $99/month base
      const basePrice = 99;

      // Multipliers based on features
      const resolutionMultiplier =
        calculatorValues.resolution === "4K"
          ? 1.5
          : calculatorValues.resolution === "1080p"
          ? 1.2
          : 1;
      const languageMultiplier = Math.min(
        1.5,
        1 + (calculatorValues.languages - 5) * 0.1
      );
      const supportMultiplier =
        calculatorValues.support === "enterprise"
          ? 2
          : calculatorValues.support === "priority"
          ? 1.3
          : 1;

      const monthlyPrice = Math.round(
        basePrice *
          resolutionMultiplier *
          languageMultiplier *
          supportMultiplier
      );
      return isYearly ? monthlyPrice * 12 : monthlyPrice;
    } else {
      // Enterprise tier - custom pricing
      return null; // Custom pricing
    }
  };

  const getRecommendedPlan = () => {
    if (calculatorValues.apiCalls <= 5000)
      return { name: "Basic", slug: "basic", monthlyPrice: 29 };
    if (calculatorValues.apiCalls <= 50000)
      return { name: "Pro", slug: "pro", monthlyPrice: 99 };
    return { name: "Enterprise", slug: "enterprise", monthlyPrice: null };
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar />
        <main className='pt-32'>
          <div className='container mx-auto px-4'>
            <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-border animate-pulse'
                >
                  <div className='h-6 bg-muted/20 rounded mb-4'></div>
                  <div className='h-4 bg-muted/20 rounded mb-6'></div>
                  <div className='h-8 bg-muted/20 rounded mb-6'></div>
                  <div className='space-y-3'>
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className='h-4 bg-muted/20 rounded'></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
        <AIChatWidget />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Interactive Hero with Calculator */}
        <section className='relative py-32 overflow-hidden'>
          <div className='absolute inset-0 mx-4 mt-20 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&crop=center'
              alt='Pricing calculator background'
              className='w-full h-full object-cover rounded-3xl'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              {/* Hero Content */}
              <div className='text-center lg:text-left'>
                <span className='inline-block px-4 py-1.5 rounded-full bg-card/80 border border-border backdrop-blur-sm text-card-foreground text-sm font-medium mb-6'>
                  Smart Pricing Calculator
                </span>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-card-foreground'>
                  Find Your <span className='text-gradient'>Perfect</span> Plan
                </h1>
                <p className='text-lg text-muted-foreground mb-8'>
                  Use our interactive calculator to estimate costs based on your
                  specific needs.
                </p>

                {/* Billing Toggle */}
                <div className='inline-flex items-center gap-4 p-1 rounded-full bg-card/80 backdrop-blur-md border border-border mb-8'>
                  <button
                    onClick={() => setIsYearly(false)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      !isYearly
                        ? "bg-neon-cyan text-black"
                        : "text-muted-foreground hover:text-card-foreground"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                      isYearly
                        ? "bg-neon-cyan text-black"
                        : "text-muted-foreground hover:text-card-foreground"
                    )}
                  >
                    Yearly
                    <span className='text-xs px-2 py-0.5 rounded-full bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/30'>
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className='p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border'>
                <div className='flex items-center gap-3 mb-6'>
                  <Calculator className='w-6 h-6 text-neon-cyan' />
                  <h3 className='text-xl font-bold text-card-foreground'>
                    Cost Calculator
                  </h3>
                </div>

                <div className='space-y-6'>
                  {/* API Calls Slider */}
                  <div>
                    <div className='flex justify-between items-center mb-3'>
                      <label className='text-sm font-medium text-card-foreground'>
                        API Calls/Month
                      </label>
                      <span className='text-neon-cyan font-bold'>
                        {calculatorValues.apiCalls.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      value={[calculatorValues.apiCalls]}
                      onValueChange={(value) =>
                        setCalculatorValues((prev) => ({
                          ...prev,
                          apiCalls: value[0],
                        }))
                      }
                      max={100000}
                      min={1000}
                      step={1000}
                      className='w-full'
                    />
                  </div>

                  {/* Resolution Selector */}
                  <div>
                    <label className='block text-sm font-medium text-card-foreground mb-3'>
                      Video Resolution
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      {["720p", "1080p", "4K"].map((res) => (
                        <button
                          key={res}
                          onClick={() =>
                            setCalculatorValues((prev) => ({
                              ...prev,
                              resolution: res,
                            }))
                          }
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            calculatorValues.resolution === res
                              ? "bg-neon-cyan text-black"
                              : "bg-card/80 text-card-foreground hover:bg-card/90"
                          )}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Languages Slider */}
                  <div>
                    <div className='flex justify-between items-center mb-3'>
                      <label className='text-sm font-medium text-card-foreground'>
                        Languages
                      </label>
                      <span className='text-neon-cyan font-bold'>
                        {calculatorValues.languages}
                      </span>
                    </div>
                    <Slider
                      value={[calculatorValues.languages]}
                      onValueChange={(value) =>
                        setCalculatorValues((prev) => ({
                          ...prev,
                          languages: value[0],
                        }))
                      }
                      max={40}
                      min={1}
                      step={1}
                      className='w-full'
                    />
                  </div>

                  {/* Support Level */}
                  <div>
                    <label className='block text-sm font-medium text-card-foreground mb-3'>
                      Support Level
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { key: "basic", label: "Basic" },
                        { key: "priority", label: "Priority" },
                        { key: "enterprise", label: "Enterprise" },
                      ].map((support) => (
                        <button
                          key={support.key}
                          onClick={() =>
                            setCalculatorValues((prev) => ({
                              ...prev,
                              support: support.key,
                            }))
                          }
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            calculatorValues.support === support.key
                              ? "bg-neon-cyan text-black"
                              : "bg-card/80 text-card-foreground hover:bg-card/90"
                          )}
                        >
                          {support.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className='mt-8 p-6 rounded-2xl bg-gradient-to-r from-neon-cyan/10 to-neon-violet/10 border border-neon-cyan/20'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-card-foreground mb-2'>
                        ${calculatePrice()}
                        <span className='text-lg text-muted-foreground'>
                          /{isYearly ? "year" : "month"}
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Estimated cost based on your selections
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Feature Comparison Table */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4 text-card-foreground'>
                Compare All Features
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Choose the perfect plan for your needs with our detailed feature
                comparison.
              </p>
            </div>

            {/* Comparison Table */}
            <div className='max-w-6xl mx-auto'>
              <div className='overflow-x-auto'>
                <table className='w-full bg-card/80 backdrop-blur-md border border-border rounded-2xl'>
                  <thead>
                    <tr className='border-b border-border'>
                      <th className='text-left p-6 text-card-foreground font-bold'>
                        Features
                      </th>
                      {plans.map((plan) => (
                        <th key={plan.name} className='text-center p-6'>
                          <div className='space-y-3'>
                            <div
                              className={cn(
                                "text-lg font-bold",
                                plan.popular
                                  ? "text-neon-cyan"
                                  : "text-card-foreground"
                              )}
                            >
                              {plan.name}
                            </div>
                            {plan.monthlyPrice !== null ? (
                              <div className='text-2xl font-bold text-card-foreground'>
                                $
                                {isYearly
                                  ? plan.yearlyPrice
                                  : plan.monthlyPrice}
                                <div className='text-sm text-muted-foreground'>
                                  /month
                                </div>
                              </div>
                            ) : (
                              <div className='text-2xl font-bold text-card-foreground'>
                                Custom
                              </div>
                            )}
                            <Button
                              size='sm'
                              variant={plan.popular ? "hero" : "outline"}
                              className={cn(
                                "w-full",
                                plan.popular
                                  ? "bg-gradient-ai"
                                  : "bg-card/80 border-border text-card-foreground hover:border-neon-cyan"
                              )}
                              onClick={() => {
                                if (plan.name === "Enterprise") {
                                  navigate("/contact");
                                } else {
                                  const monthlyPrice = plan.monthlyPrice;
                                  const price = isYearly
                                    ? monthlyPrice * 12
                                    : monthlyPrice;
                                  const features = plan.features
                                    .map((f) => f.text)
                                    .join("|");
                                  navigate(
                                    `/checkout?plan=${encodeURIComponent(
                                      plan.name.toLowerCase()
                                    )}&name=${encodeURIComponent(
                                      plan.name
                                    )}&price=${price}&interval=${
                                      isYearly ? "yearly" : "monthly"
                                    }&features=${encodeURIComponent(features)}`
                                  );
                                }
                              }}
                            >
                              {plan.cta}
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        category: "API Calls",
                        features: ["5,000/month", "50,000/month", "Unlimited"],
                      },
                      {
                        category: "Video Resolution",
                        features: ["720p", "1080p", "4K"],
                      },
                      { category: "Languages", features: ["3", "10", "40+"] },
                      {
                        category: "Latency",
                        features: ["Standard", "<50ms", "Ultra-low"],
                      },
                      {
                        category: "Support",
                        features: ["Email", "Priority Email", "24/7 Dedicated"],
                      },
                      {
                        category: "Analytics",
                        features: ["Basic", "Advanced", "Custom"],
                      },
                      { category: "Webhooks", features: ["❌", "✅", "✅"] },
                      {
                        category: "Model Training",
                        features: ["❌", "✅", "✅"],
                      },
                      { category: "SLA", features: ["❌", "99.9%", "Custom"] },
                      { category: "SSO/SAML", features: ["❌", "❌", "✅"] },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className='border-b border-border last:border-b-0'
                      >
                        <td className='p-6 text-card-foreground font-medium'>
                          {row.category}
                        </td>
                        {row.features.map((feature, i) => (
                          <td
                            key={i}
                            className='p-6 text-center text-muted-foreground'
                          >
                            {feature}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Journey Cards */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <TrendingUp className='w-12 h-12 mx-auto mb-4 text-neon-cyan' />
              <h2 className='text-3xl md:text-4xl font-bold mb-4 text-card-foreground'>
                Your Growth Journey
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Start small and scale with confidence. Here's how our plans grow
                with your business.
              </p>
            </div>

            <div className='relative max-w-5xl mx-auto'>
              {/* Connection Line */}
              <div className='absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent hidden lg:block'></div>

              <div className='grid md:grid-cols-3 gap-8 relative'>
                {[
                  {
                    icon: Play,
                    title: "Get Started",
                    plan: "Basic",
                    description: "Perfect for small projects",
                    color: "from-blue-500 to-cyan-500",
                    features: [
                      "5K API calls",
                      "Email support",
                      "Core features",
                    ],
                  },
                  {
                    icon: Users,
                    title: "Scale Up",
                    plan: "Pro",
                    description: "For growing teams and apps",
                    color: "from-neon-cyan to-neon-violet",
                    features: [
                      "50K API calls",
                      "Priority support",
                      "Advanced features",
                    ],
                  },
                  {
                    icon: Crown,
                    title: "Go Enterprise",
                    plan: "Enterprise",
                    description: "For large-scale deployments",
                    color: "from-neon-violet to-pink-500",
                    features: [
                      "Unlimited usage",
                      "Dedicated support",
                      "Custom solutions",
                    ],
                  },
                ].map((stage, index) => (
                  <div key={stage.title} className='relative group'>
                    {/* Stage Number */}
                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-neon-cyan text-black font-bold flex items-center justify-center text-sm z-10'>
                      {index + 1}
                    </div>

                    <div className='p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border hover:border-neon-cyan/30 transition-all duration-300 group-hover:scale-105 text-center'>
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl bg-gradient-to-r mx-auto mb-6 flex items-center justify-center",
                          stage.color
                        )}
                      >
                        <stage.icon className='w-8 h-8 text-primary-foreground' />
                      </div>

                      <h3 className='text-xl font-bold mb-2 text-card-foreground group-hover:text-neon-cyan transition-colors'>
                        {stage.title}
                      </h3>
                      <div className='text-neon-cyan font-semibold mb-3'>
                        {stage.plan} Plan
                      </div>
                      <p className='text-muted-foreground mb-6'>
                        {stage.description}
                      </p>

                      <ul className='space-y-2 text-left'>
                        {stage.features.map((feature, i) => (
                          <li
                            key={i}
                            className='flex items-center gap-3 text-sm text-muted-foreground'
                          >
                            <Check className='w-4 h-4 text-neon-emerald flex-shrink-0' />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Calculator Section */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <Calculator className='w-12 h-12 mx-auto mb-4 text-neon-cyan' />
              <h2 className='text-3xl md:text-4xl font-bold mb-4 text-card-foreground'>
                Estimate Your Usage
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Calculate your potential costs based on real usage scenarios.
              </p>
            </div>

            <div className='max-w-4xl mx-auto grid md:grid-cols-2 gap-8'>
              {/* Calculator Scenarios */}
              <div className='space-y-6'>
                <h3 className='text-xl font-bold text-card-foreground mb-6'>
                  Common Use Cases
                </h3>

                {[
                  {
                    title: "Small Project",
                    description: "Indie developer or small startup",
                    apiCalls: 3000,
                    resolution: "720p",
                    languages: 2,
                    support: "basic",
                    estimatedPrice: isYearly ? 29 * 12 : 29,
                    plan: "basic",
                  },
                  {
                    title: "Mobile App Startup",
                    description: "Growing team building a lip-reading feature",
                    apiCalls: 25000,
                    resolution: "1080p",
                    languages: 5,
                    support: "priority",
                    estimatedPrice: isYearly ? 99 * 12 : 99,
                    plan: "pro",
                  },
                  {
                    title: "Enterprise Solution",
                    description: "Large corporation with custom requirements",
                    apiCalls: 200000,
                    resolution: "4K",
                    languages: 25,
                    support: "enterprise",
                    estimatedPrice: null, // Custom pricing
                    plan: "enterprise",
                  },
                ].map((scenario, index) => (
                  <Card
                    key={index}
                    className='p-6 bg-card/80 backdrop-blur-md border-border hover:border-neon-cyan/30 transition-colors cursor-pointer group'
                    onClick={() =>
                      setCalculatorValues({
                        apiCalls: scenario.apiCalls,
                        resolution: scenario.resolution,
                        languages: scenario.languages,
                        support: scenario.support,
                      })
                    }
                  >
                    <CardHeader className='p-0 mb-4'>
                      <div className='flex items-center justify-between'>
                        <CardTitle className='text-lg font-bold text-card-foreground group-hover:text-neon-cyan transition-colors'>
                          {scenario.title}
                        </CardTitle>
                        {scenario.estimatedPrice && (
                          <Badge
                            variant='secondary'
                            className='bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'
                          >
                            ${scenario.estimatedPrice}/
                            {isYearly ? "year" : "month"}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className='text-muted-foreground'>
                        {scenario.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                      <div className='text-sm text-muted-foreground'>
                        {scenario.apiCalls.toLocaleString()} API calls •{" "}
                        {scenario.resolution} • {scenario.languages} languages
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Live Calculator */}
              <Card className='p-8 bg-card/80 backdrop-blur-md border border-border sticky top-8'>
                <CardHeader className='pb-6'>
                  <div className='flex items-center gap-3'>
                    <Calculator className='w-6 h-6 text-neon-cyan' />
                    <CardTitle className='text-xl font-bold text-card-foreground'>
                      Live Calculator
                    </CardTitle>
                  </div>
                  <CardDescription className='text-muted-foreground'>
                    Adjust your usage parameters to see real-time pricing
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='live-api-calls'
                      className='text-sm font-medium text-card-foreground'
                    >
                      Monthly API Calls
                    </Label>
                    <Input
                      id='live-api-calls'
                      type='number'
                      min='1000'
                      max='1000000'
                      value={calculatorValues.apiCalls}
                      onChange={(e) =>
                        setCalculatorValues((prev) => ({
                          ...prev,
                          apiCalls: parseInt(e.target.value) || 1000,
                        }))
                      }
                      className='bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-card-foreground'>
                        Resolution
                      </Label>
                      <Select
                        value={calculatorValues.resolution}
                        onValueChange={(value) =>
                          setCalculatorValues((prev) => ({
                            ...prev,
                            resolution: value,
                          }))
                        }
                      >
                        <SelectTrigger className='bg-card/80 border-border text-card-foreground focus:border-neon-cyan'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className='bg-card/80 border-border'>
                          <SelectItem
                            value='720p'
                            className='text-card-foreground hover:bg-card/90'
                          >
                            720p
                          </SelectItem>
                          <SelectItem
                            value='1080p'
                            className='text-card-foreground hover:bg-card/90'
                          >
                            1080p
                          </SelectItem>
                          <SelectItem
                            value='4K'
                            className='text-card-foreground hover:bg-card/90'
                          >
                            4K
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label
                        htmlFor='live-languages'
                        className='text-sm font-medium text-card-foreground'
                      >
                        Languages
                      </Label>
                      <Input
                        id='live-languages'
                        type='number'
                        min='1'
                        max='40'
                        value={calculatorValues.languages}
                        onChange={(e) =>
                          setCalculatorValues((prev) => ({
                            ...prev,
                            languages: parseInt(e.target.value) || 1,
                          }))
                        }
                        className='bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label className='text-sm font-medium text-card-foreground'>
                      Support Level
                    </Label>
                    <Select
                      value={calculatorValues.support}
                      onValueChange={(value) =>
                        setCalculatorValues((prev) => ({
                          ...prev,
                          support: value,
                        }))
                      }
                    >
                      <SelectTrigger className='bg-card/80 border-border text-card-foreground focus:border-neon-cyan'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-card/80 border-border'>
                        <SelectItem
                          value='basic'
                          className='text-card-foreground hover:bg-card/90'
                        >
                          Basic
                        </SelectItem>
                        <SelectItem
                          value='priority'
                          className='text-card-foreground hover:bg-card/90'
                        >
                          Priority
                        </SelectItem>
                        <SelectItem
                          value='enterprise'
                          className='text-card-foreground hover:bg-card/90'
                        >
                          Enterprise
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='p-6 rounded-2xl bg-gradient-to-r from-neon-cyan/10 to-neon-violet/10 border border-neon-cyan/20'>
                    <div className='text-center'>
                      <div className='text-4xl font-bold text-card-foreground mb-2'>
                        {calculatePrice() !== null
                          ? `$${calculatePrice()}`
                          : "Custom"}
                      </div>
                      <p className='text-sm text-muted-foreground mb-4'>
                        Estimated {isYearly ? "yearly" : "monthly"} cost
                      </p>
                      <Badge
                        variant='secondary'
                        className='mb-4 bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'
                      >
                        {calculatorValues.apiCalls <= 5000
                          ? "Basic Plan"
                          : calculatorValues.apiCalls <= 50000
                          ? "Pro Plan"
                          : "Enterprise Plan"}
                      </Badge>
                      <Button
                        variant='hero'
                        size='sm'
                        className='w-full'
                        onClick={() => {
                          const recommended = getRecommendedPlan();
                          const computedPrice = calculatePrice();
                          // If price is custom (enterprise) or null -> go to contact
                          if (
                            computedPrice === null ||
                            recommended.slug === "enterprise"
                          ) {
                            navigate("/contact");
                            return;
                          }

                          // Build a features string from user-selected values
                          const features = `${
                            calculatorValues.apiCalls
                          } API calls/month|${
                            calculatorValues.resolution
                          } video resolution|${
                            calculatorValues.languages
                          } languages|${
                            calculatorValues.support === "basic"
                              ? "Email support"
                              : calculatorValues.support === "priority"
                              ? "Priority email support"
                              : "24/7 dedicated support"
                          }`;

                          navigate(
                            `/checkout?plan=${
                              recommended.slug
                            }&name=${encodeURIComponent(
                              recommended.name
                            )}&price=${computedPrice}&interval=${
                              isYearly ? "yearly" : "monthly"
                            }&apiCalls=${
                              calculatorValues.apiCalls
                            }&resolution=${encodeURIComponent(
                              calculatorValues.resolution
                            )}&languages=${
                              calculatorValues.languages
                            }&support=${encodeURIComponent(
                              calculatorValues.support
                            )}&features=${encodeURIComponent(features)}`
                          );
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <HelpCircle className='w-12 h-12 mx-auto mb-4 text-neon-cyan' />
              <h2 className='text-3xl md:text-4xl font-bold mb-4 text-card-foreground'>
                Frequently Asked Questions
              </h2>
              <p className='text-muted-foreground'>
                Everything you need to know about our pricing.
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              <div className='grid md:grid-cols-2 gap-6'>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className='p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border hover:border-neon-cyan/30 transition-colors group'
                  >
                    <h3 className='font-semibold text-card-foreground mb-3 group-hover:text-neon-cyan transition-colors'>
                      {faq.question}
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA with Full-Width Background */}
        <section className='relative py-24 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&crop=center'
              alt='Contact sales background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6 text-card-foreground'>
              Ready to Get Started?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Join thousands of developers building the future of AI
              accessibility.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button
                variant='hero'
                size='lg'
                className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/60'
                onClick={() => {
                  const monthlyPrice = 99;
                  const price = isYearly ? monthlyPrice * 12 : monthlyPrice;
                  const features =
                    "50,000 API calls/month|1080p video resolution|Priority email support|Advanced analytics|Multi-language (10)|Low latency (<50ms)|Webhook integrations|Custom model training|99.9% SLA";
                  navigate(
                    `/checkout?plan=pro&name=Pro&price=${price}&interval=${
                      isYearly ? "yearly" : "monthly"
                    }&features=${encodeURIComponent(features)}`
                  );
                }}
              >
                Get Started <ArrowRight className='w-4 h-4' />
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/60 text-card-foreground'
                onClick={() => navigate("/contact")}
              >
                Contact Sales
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
