import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "CharadesAI transformed how we build accessibility features. Integration took just hours, not months.",
    author: "Sarah Chen",
    role: "CTO, AccessibleTech",
    rating: 5,
  },
  {
    quote:
      "The accuracy and latency are incredible. Our real-time captioning feature wouldn't be possible without CharadesAI.",
    author: "Marcus Johnson",
    role: "Lead Developer, StreamCo",
    rating: 5,
  },
  {
    quote:
      "Enterprise-grade security with startup-level agility. Best computer vision API we've worked with.",
    author: "Emily Rodriguez",
    role: "VP Engineering, SecureVision",
    rating: 5,
  },
];

const logos = [
  "TechCorp",
  "InnovateLabs",
  "GlobalAI",
  "SmartDevices",
  "FutureVision",
  "DataFlow",
  "CloudScale",
  "SecureNet",
];

const badges = [
  { label: "SOC 2", sublabel: "Type II" },
  { label: "GDPR", sublabel: "Compliant" },
  { label: "HIPAA", sublabel: "Ready" },
  { label: "ISO", sublabel: "27001" },
];

export function TrustSection() {
  return (
    <section className='py-24 bg-background'>
      <div className='container mx-auto px-4'>
        {/* Client Logos */}
        <div className='text-center mb-16'>
          <p className='text-sm text-muted-foreground mb-8'>
            Trusted by innovative companies worldwide
          </p>
          <div className='flex flex-wrap justify-center items-center gap-8 md:gap-12'>
            {logos.map((logo) => (
              <div
                key={logo}
                className='text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors'
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className='grid md:grid-cols-3 gap-6 mb-16'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors'
            >
              <Quote className='w-8 h-8 text-primary/20 mb-4' />

              {/* Rating */}
              <div className='flex gap-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-4 h-4 fill-neon-cyan text-neon-cyan'
                  />
                ))}
              </div>

              <p className='text-foreground mb-6 leading-relaxed'>
                "{testimonial.quote}"
              </p>

              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground font-bold text-sm'>
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className='font-medium text-sm'>
                    {testimonial.author}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className='flex flex-wrap justify-center gap-4'>
          {badges.map((badge) => (
            <div
              key={badge.label}
              className='flex flex-col items-center px-6 py-4 rounded-xl bg-card border border-border'
            >
              <span className='text-lg font-bold text-foreground'>
                {badge.label}
              </span>
              <span className='text-xs text-muted-foreground'>
                {badge.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
