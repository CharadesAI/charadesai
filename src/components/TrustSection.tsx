import {
  Star,
  Quote,
  Shield,
  Eye,
  Mic,
  Zap,
  CheckCircle,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "CharadesAI's gesture recognition authenticated 99.7% of our users instantly. No more passwords - just natural movements.",
    author: "Dr. Elena Vasquez",
    role: "Security Lead, BioSecure",
    rating: 5,
    validationType: "gesture",
    liveMetric: "99.7% Success Rate",
    image: "/images/testimonial.webp",
    company: "BioSecure",
    achievement: "Reduced login time by 85%",
  },
  {
    quote:
      "Lip-reading API processes real-time captions at 40ms latency. Our deaf community users can now participate fully in live streams.",
    author: "James Park",
    role: "Accessibility Director, LiveStream Pro",
    rating: 5,
    validationType: "voice",
    liveMetric: "40ms Processing",
    image: "/images/testimonial (3).webp",
    company: "LiveStream Pro",
    achievement: "10M+ accessible streams",
  },
  {
    quote:
      "Enterprise deployment was seamless. The AI continuously learns from our 10M+ daily interactions, improving accuracy every day.",
    author: "Maria Santos",
    role: "AI Operations, GlobalTech",
    rating: 5,
    validationType: "continuous",
    liveMetric: "10M+ Daily Interactions",
    image: "/images/testimonial (2).webp",
    company: "GlobalTech",
    achievement: "99.9% uptime achieved",
  },
  {
    quote:
      "The real-time gesture recognition has transformed our virtual training platform. Trainees can now interact naturally with our AI instructor.",
    author: "Dr. Sarah Chen",
    role: "Education Director, LearnAI",
    rating: 5,
    validationType: "gesture",
    liveMetric: "50K+ Training Sessions",
    image: "/images/testimonial (4).webp",
    company: "LearnAI",
    achievement: "Enhanced learning by 40%",
  },
];

const trustSignals = [
  {
    label: "Gesture Auth",
    sublabel: "Biometric Security",
    icon: Shield,
    color: "text-neon-cyan",
    value: "99.7%",
  },
  {
    label: "Voice Verified",
    sublabel: "Real-Time Processing",
    icon: Mic,
    color: "text-neon-violet",
    value: "40ms",
  },
  {
    label: "Live Validation",
    sublabel: "Continuous Learning",
    icon: Activity,
    color: "text-neon-pink",
    value: "10M+",
  },
  {
    label: "Zero Latency",
    sublabel: "Instant Recognition",
    icon: Zap,
    color: "text-neon-cyan",
    value: "<50ms",
  },
];

const liveStats = [
  {
    value: "99.9%",
    label: "Uptime",
    icon: CheckCircle,
    color: "text-neon-cyan",
  },
  { value: "40ms", label: "Avg Latency", icon: Zap, color: "text-neon-violet" },
  {
    value: "10M+",
    label: "Daily Validations",
    icon: Activity,
    color: "text-neon-pink",
  },
  {
    value: "150+",
    label: "Enterprise Clients",
    icon: Shield,
    color: "text-neon-emerald",
  },
];

export function TrustSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Full-width rounded background image */}
      <div className='hidden md:block absolute inset-0 mx-4 mt-8 mb-8'>
        <img
          src='/images/live trust signal bg.webp'
          alt='Trust and validation background'
          className='w-full h-full object-cover rounded-3xl'
        />
        {/* Overlay for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80 rounded-3xl' />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Content overlay on top of image */}
        <div className='grid lg:grid-cols-2 gap-12 items-center min-h-[420px] md:min-h-[600px]'>
          {/* Left Column - Testimonial Cards */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className='relative'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Testimonial Card */}
              <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.5 }}
                  className='relative p-8 rounded-3xl bg-card/90 backdrop-blur-md border border-border shadow-2xl hover:shadow-primary/10 transition-all duration-300'
                >
                  {/* Live Indicator */}
                  <div className='absolute -top-2 -right-2 w-4 h-4 bg-neon-cyan rounded-full animate-pulse-ring'></div>

                  <Quote className='w-8 h-8 text-primary/20 mb-6' />

                  {/* Validation Type Badge */}
                  <motion.div
                    className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {testimonials[currentTestimonial].validationType ===
                      "gesture" && (
                      <Shield className='w-3 h-3 text-neon-cyan' />
                    )}
                    {testimonials[currentTestimonial].validationType ===
                      "voice" && <Mic className='w-3 h-3 text-neon-violet' />}
                    {testimonials[currentTestimonial].validationType ===
                      "continuous" && (
                      <Activity className='w-3 h-3 text-neon-pink' />
                    )}
                    <span className='text-xs font-medium text-primary capitalize'>
                      {testimonials[currentTestimonial].validationType}{" "}
                      Validation
                    </span>
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    className='flex gap-1 mb-6'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className='w-4 h-4 fill-neon-cyan text-neon-cyan'
                        />
                      )
                    )}
                  </motion.div>

                  <motion.p
                    className='text-foreground mb-8 leading-relaxed text-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    "{testimonials[currentTestimonial].quote}"
                  </motion.p>

                  {/* Achievement Badge */}
                  <motion.div
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 mb-6'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Zap className='w-4 h-4 text-neon-cyan' />
                    <span className='text-sm font-medium text-neon-cyan'>
                      {testimonials[currentTestimonial].achievement}
                    </span>
                  </motion.div>

                  {/* Author Info */}
                  <motion.div
                    className='flex items-center gap-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].author}
                      className='w-14 h-14 rounded-full object-cover border-2 border-primary/20'
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.7,
                        type: "spring",
                        stiffness: 200,
                      }}
                    />
                    <div>
                      <div className='font-medium text-sm'>
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className='text-xs text-primary font-medium'>
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className='flex items-center justify-between mt-6'>
                <button
                  onClick={prevTestimonial}
                  className='p-3 rounded-full bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-110 shadow-lg'
                >
                  <ChevronLeft className='w-4 h-4' />
                </button>

                {/* Dots Indicator */}
                <div className='flex gap-2'>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        index === currentTestimonial
                          ? "bg-neon-cyan scale-125 shadow-lg"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className='p-3 rounded-full bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-110 shadow-lg'
                >
                  <ChevronRight className='w-4 h-4' />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Title Content */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className='space-y-6'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border backdrop-blur-sm'>
                <Activity className='w-4 h-4 text-neon-cyan animate-pulse' />
                <span className='text-sm font-medium'>Live Trust Signals</span>
              </div>
              <h2 className='text-3xl md:text-4xl font-bold'>
                Real-Time Validation
                <span className='text-gradient block'>
                  Proven in Production
                </span>
              </h2>
              <p className='text-muted-foreground max-w-md text-lg leading-relaxed'>
                See how enterprises worldwide trust CharadesAI for
                mission-critical AI validation, with real-time metrics and
                continuous learning.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
