import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Users,
  Shield,
  Zap,
  Eye,
  Mic,
  Smartphone,
  Building,
  Heart,
  Gamepad2,
  Car,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const useCases = [
  {
    icon: Users,
    title: "Accessibility Solutions",
    description:
      "Empower people with disabilities through advanced lip-reading and gesture recognition technology.",
    features: [
      "Real-time captioning",
      "Sign language translation",
      "Voice assistance",
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Security & Authentication",
    description:
      "Advanced biometric security using facial expressions and lip movements for secure access control.",
    features: [
      "Multi-factor authentication",
      "Fraud detection",
      "Secure login",
    ],
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Zap,
    title: "Real-time Communication",
    description:
      "Break language barriers with instant translation and gesture-based communication tools.",
    features: [
      "Live translation",
      "Gesture commands",
      "Cross-language support",
    ],
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Eye,
    title: "Healthcare Applications",
    description:
      "Assistive technology for medical professionals and patients in clinical environments.",
    features: [
      "Patient monitoring",
      "Medical transcription",
      "Rehabilitation support",
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Mic,
    title: "Content Creation",
    description:
      "Enhance video production with automatic captioning and gesture-based editing controls.",
    features: ["Auto-captioning", "Gesture editing", "Multi-language support"],
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Seamless integration with mobile apps for enhanced user experiences and accessibility.",
    features: ["Voice commands", "Gesture navigation", "Offline processing"],
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Building,
    title: "Enterprise Solutions",
    description:
      "Large-scale deployment for corporate environments with advanced analytics and reporting.",
    features: [
      "Analytics dashboard",
      "Custom integrations",
      "Enterprise security",
    ],
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-500/10",
  },
  {
    icon: Heart,
    title: "Assistive Technology",
    description:
      "Comprehensive tools for individuals with speech and hearing impairments.",
    features: ["Speech therapy", "Communication aids", "Educational support"],
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Gamepad2,
    title: "Gaming & Entertainment",
    description:
      "Immersive gaming experiences with gesture controls and voice interaction.",
    features: ["Gesture gaming", "Voice chat", "Interactive experiences"],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Car,
    title: "Automotive Industry",
    description:
      "Driver assistance systems and in-car communication using advanced CharadesAI.",
    features: ["Driver monitoring", "Voice commands", "Safety alerts"],
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: GraduationCap,
    title: "Education Technology",
    description:
      "Transform learning experiences with interactive tools and accessibility features.",
    features: [
      "Interactive learning",
      "Accessibility tools",
      "Language learning",
    ],
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Enhance productivity in professional environments with AI-powered communication tools.",
    features: [
      "Meeting transcription",
      "Presentation tools",
      "Collaboration features",
    ],
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
  },
];

const stats = [
  { value: "99.7%", label: "Accuracy Rate" },
  { value: "50+", label: "Languages Supported" },
  { value: "10M+", label: "API Calls Processed" },
  { value: "500+", label: "Active Applications" },
];

const UseCases = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-24 relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-violet/10 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
              <Sparkles className='w-4 h-4' />
              Use Cases
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Transform Industries with{" "}
              <span className='text-gradient'>CharadesAI</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed'>
              Discover how CharadesAI's advanced lip-reading and gesture
              recognition technology is revolutionizing accessibility, security,
              communication, and user experiences across diverse industries and
              applications.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button
                variant='hero'
                size='lg'
                onClick={() => navigate("/features")}
                className='group'
              >
                Explore Features
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                onClick={() => navigate("/contact")}
                className='group'
              >
                Get Started Free
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className='py-16 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='text-3xl md:text-4xl font-bold text-gradient mb-2'>
                    {stat.value}
                  </div>
                  <p className='text-muted-foreground text-sm md:text-base'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Applications Across{" "}
                <span className='text-gradient'>Industries</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                From accessibility tools to enterprise security, discover how
                CharadesAI is transforming the way we interact with technology
                and each other.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className='group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm'
                >
                  <CardHeader className='pb-4'>
                    <div
                      className={`w-12 h-12 rounded-lg ${useCase.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <useCase.icon
                        className={`w-6 h-6 bg-gradient-to-r ${useCase.color} bg-clip-text text-transparent`}
                      />
                    </div>
                    <CardTitle className='text-xl mb-2'>
                      {useCase.title}
                    </CardTitle>
                    <CardDescription className='text-muted-foreground leading-relaxed'>
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2 mb-4'>
                      {useCase.features.map((feature, i) => (
                        <div
                          key={i}
                          className='flex items-center gap-2 text-sm text-muted-foreground'
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${useCase.color}`}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='group/btn w-full justify-between hover:bg-primary/5'
                    >
                      Learn More
                      <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className='py-24 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Why Choose <span className='text-gradient'>CharadesAI</span>?
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Our advanced CharadesAI technology delivers unparalleled
                accuracy and reliability for your most demanding applications.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Lightning Fast</h3>
                <p className='text-muted-foreground'>
                  Real-time processing with sub-second response times for
                  seamless user experiences.
                </p>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Shield className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Enterprise Security
                </h3>
                <p className='text-muted-foreground'>
                  SOC 2 compliant with end-to-end encryption and GDPR
                  compliance.
                </p>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <Users className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Developer Friendly
                </h3>
                <p className='text-muted-foreground'>
                  Simple REST APIs, comprehensive SDKs, and extensive
                  documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4 text-center'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                Ready to Build Your{" "}
                <span className='text-gradient'>CharadesAI</span> Solution?
              </h2>
              <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
                Join thousands of developers and businesses creating innovative
                applications with CharadesAI. Start with our free tier and scale
                as you grow.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button
                  variant='hero'
                  size='lg'
                  onClick={() => navigate("/pricing")}
                  className='group'
                >
                  View Pricing
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Button>
                <Button
                  variant='heroOutline'
                  size='lg'
                  onClick={() => navigate("/contact")}
                  className='group'
                >
                  Contact Sales
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default UseCases;
