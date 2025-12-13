import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Zap,
  Users,
  Award,
  Globe,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const values = [
  {
    icon: "/images/our values.webp",
    title: "Mission-Driven",
    description:
      "We believe in making communication accessible to everyone, regardless of hearing ability.",
  },
  {
    icon: "/images/our values (2).webp",
    title: "Innovation First",
    description:
      "Pushing the boundaries of computer vision to solve real-world problems.",
  },
  {
    icon: "/images/our values (3).webp",
    title: "User-Centric",
    description: "Every feature we build starts with understanding user needs.",
  },
  {
    icon: "/images/our values (4).webp",
    title: "Performance Obsessed",
    description:
      "Milliseconds matter. We optimize relentlessly for speed and accuracy.",
  },
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Google AI researcher with 15+ years in computer vision.",
    imageFallBack: "SC",
    image: "/images/team (4).webp",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "Ex-Meta ML infrastructure lead. Built systems serving billions.",
    imageFallBack: "MJ",
    image: "/images/team (2).webp",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Engineering",
    bio: "Former Stripe engineer. Expert in scalable distributed systems.",
    imageFallBack: "ER",
    image: "/images/team (6).webp",
  },
  {
    name: "Dr. James Liu",
    role: "Head of AI Research",
    bio: "PhD Stanford. Published 40+ papers on speech recognition.",
    imageFallBack: "JL",
    image: "/images/team.webp",
  },
  {
    name: "Aisha Patel",
    role: "Head of Product",
    bio: "Former Figma PM. Passionate about accessible design.",
    imageFallBack: "AP",
    image: "/images/team (5).webp",
  },
  {
    name: "David Kim",
    role: "VP of Sales",
    bio: "Built sales teams at 3 unicorn startups from 0 to $50M ARR.",
    imageFallBack: "DK",
    image: "/images/team (3).webp",
  },
];

const timeline = [
  {
    year: "2023",
    title: "Founded",
    description:
      "CharadesAI founded in San Francisco with a mission to make communication accessible.",
  },
  {
    year: "2024",
    title: "Seed Round",
    description:
      "$5M seed funding led by Sequoia Capital. Launched first lip-reading API.",
  },
  {
    year: "2025",
    title: "Series A",
    description:
      "$25M Series A. Expanded to gesture recognition and multi-language support.",
  },
];

const stats = [
  { value: "10,000+", label: "Developers" },
  { value: "500M+", label: "API Calls/Month" },
  { value: "40+", label: "Languages" },
  { value: "99.7%", label: "Accuracy" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-sceen'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='relative py-48 overflow-hidden '>
          {/* Background Image */}
          <div className='absolute inset-0 opacity-10 md:opacity-20 dark:opacity-20 md:dark:opacity-30 bg-[url("/images/39.webp")] bg-cover bg-no-repeat bg-center'></div>
          {/* Animated background elements */}
          <div className='absolute inset-0'>
            <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 rounded-full blur-3xl animate-pulse'></div>
            <div
              className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-full blur-3xl animate-pulse'
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <span className='inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in'>
                About Us
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up'>
                Making Communication{" "}
                <span className='text-gradient animate-shimmer'>
                  Accessible{" "}
                </span>{" "}
                for Everyone
              </h1>
              <p
                className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up'
                style={{ animationDelay: "0.2s" }}
              >
                We're building the future of human-computer interaction through
                advanced lip-reading and gesture recognition AI.
              </p>
              <div
                className='flex flex-wrap justify-center gap-4 animate-slide-up'
                style={{ animationDelay: "0.4s" }}
              >
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <div className='w-2 h-2 bg-neon-cyan rounded-full animate-pulse'></div>
                  Trusted by 10,000+ developers
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <div
                    className='w-2 h-2 bg-neon-violet rounded-full animate-pulse'
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  500M+ API calls monthly
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className='py-16 bg-gradient-to-r from-card/50 via-card/30 to-card/50 border-y border-border'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className='text-center group animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className='relative'>
                    <div className='text-3xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300'>
                      {stat.value}
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl'></div>
                  </div>
                  <div className='text-sm text-muted-foreground font-medium'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className='py-32 relative overflow-hidden'>
          {/* Background decoration */}
          <div className='absolute inset-0 opacity-30'>
            <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-neon-cyan/20 to-transparent rounded-full blur-3xl'></div>
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-violet/20 to-transparent rounded-full blur-3xl'></div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='text-center mb-20'>
              <h2 className='text-3xl md:text-5xl font-bold mb-6 animate-slide-up'>
                Our <span className='text-gradient'>Purpose</span>
              </h2>
              <p
                className='text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up'
                style={{ animationDelay: "0.2s" }}
              >
                Driving innovation in accessibility technology to create a more
                inclusive world
              </p>
            </div>

            <div className='grid lg:grid-cols-2 gap-16 lg:gap-24'>
              <div
                className='group animate-slide-up'
                style={{ animationDelay: "0.3s" }}
              >
                <div className='relative p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 rounded-2xl bg-gradient-ai flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                      <Target className='w-8 h-8 text-primary-foreground' />
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Our Mission</h3>
                    <p className='text-muted-foreground leading-relaxed text-lg'>
                      To break down communication barriers through AI. We
                      believe that everyone deserves equal access to
                      information, regardless of hearing ability or speaking
                      conditions. Our technology empowers developers to build
                      inclusive applications that understand human communication
                      in all its forms.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className='group animate-slide-up'
                style={{ animationDelay: "0.5s" }}
              >
                <div className='relative p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-neon-violet/20 to-neon-pink/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl'></div>
                  <div className='relative'>
                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                      <Eye className='w-8 h-8 text-primary-foreground' />
                    </div>
                    <h3 className='text-2xl font-bold mb-4'>Our Vision</h3>
                    <p className='text-muted-foreground leading-relaxed text-lg'>
                      A world where technology understands us as naturally as
                      humans do. We're working towards a future where devices
                      can read lips, understand gestures, and respond to
                      non-verbal communication seamlessly—making technology
                      truly accessible to all.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className='py-32 bg-gradient-to-br from-secondary/20 via-background to-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-20'>
              <h2 className='text-3xl md:text-5xl font-bold mb-6 animate-slide-up'>
                Our <span className='text-gradient'>Values</span>
              </h2>
              <p
                className='text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up'
                style={{ animationDelay: "0.2s" }}
              >
                The principles that guide everything we do and shape our culture
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className='group relative animate-fade-in'
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 via-neon-violet/20 to-neon-pink/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl'></div>
                  <div className='relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2'>
                    <div className='w-14 h-14 p-1 rounded-2xl bg-gradient-ai flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                      <img
                        src={value.icon}
                        alt={value.title}
                        className='w-full h-full text-primary-foreground rounded-lg'
                      />
                    </div>
                    <h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300'>
                      {value.title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed'>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className='py-32 relative'>
          {/* Background pattern */}
          <div className='absolute inset-0 opacity-5'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='text-center mb-20'>
              <h2 className='text-3xl md:text-5xl font-bold mb-6 animate-slide-up'>
                Our <span className='text-gradient'>Journey</span>
              </h2>
              <p
                className='text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up'
                style={{ animationDelay: "0.2s" }}
              >
                From humble beginnings to industry leadership in accessibility
                AI
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              <div className='relative'>
                {/* Timeline line with gradient */}
                <div className='absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20 rounded-full'></div>

                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className='relative pl-20 pb-16 last:pb-0 animate-slide-up'
                    style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
                  >
                    {/* Timeline dot with animation */}
                    <div className='absolute left-4 w-12 h-12 rounded-full bg-gradient-ai flex items-center justify-center border-4 border-background shadow-lg animate-pulse'>
                      <div className='w-3 h-3 bg-primary-foreground rounded-full'></div>
                    </div>

                    {/* Year badge */}
                    <div className='inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-4'>
                      {item.year}
                    </div>

                    {/* Content card */}
                    <div className='bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5'>
                      <h3 className='text-xl md:text-2xl font-bold mb-3 text-foreground'>
                        {item.title}
                      </h3>
                      <p className='text-muted-foreground leading-relaxed'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className='py-32 bg-gradient-to-br from-secondary/30 via-background to-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-20'>
              <h2 className='text-3xl md:text-5xl font-bold mb-6 animate-slide-up'>
                Meet the <span className='text-gradient'>Team</span>
              </h2>
              <p
                className='text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up'
                style={{ animationDelay: "0.2s" }}
              >
                World-class engineers and researchers building the future of
                computer vision
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className='group relative animate-fade-in'
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className='absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 via-neon-violet/20 to-neon-pink/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl'></div>
                  <div className='relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 text-center'>
                    {/* Avatar with gradient border */}
                    <div className='relative mb-6'>
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className='w-24 h-24 rounded-full object-cover mx-auto mb-4 relative z-10'
                        />
                      ) : (
                        <div className='w-24 h-24 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground text-3xl font-bold mx-auto mb-4 relative z-10'>
                          {member.imageFallBack}
                        </div>
                      )}
                      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md scale-110'></div>
                    </div>

                    <h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                      {member.name}
                    </h3>
                    <div className='text-primary font-medium mb-4 text-sm'>
                      {member.role}
                    </div>
                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='relative py-32 overflow-hidden'>
          {/* Animated background */}
          <div className='absolute inset-0 bg-gradient-hero'>
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80'></div>
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-cyan/30 to-transparent rounded-full blur-3xl animate-pulse'></div>
            <div
              className='absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-violet/30 to-transparent rounded-full blur-3xl animate-pulse'
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up'>
                Join Our <span className='text-gradient'>Mission</span>
              </h2>
              <p
                className='text-lg md:text-xl text-muted-foreground mb-12 animate-slide-up'
                style={{ animationDelay: "0.2s" }}
              >
                We're always looking for talented people passionate about AI and
                accessibility. Help us build the future of human-computer
                interaction.
              </p>

              <div
                className='flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up'
                style={{ animationDelay: "0.4s" }}
              >
                <Button
                  variant='hero'
                  size='xl'
                  onClick={() => navigate("/contact")}
                  className='group relative overflow-hidden'
                >
                  <span className='relative z-10 flex items-center gap-3'>
                    View Open Positions
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </Button>

                <Button
                  variant='heroOutline'
                  size='xl'
                  onClick={() => navigate("/contact")}
                  className='group border-2 hover:border-primary/50'
                >
                  <span className='flex items-center gap-3'>Contact Us</span>
                </Button>
              </div>

              {/* Additional info */}
              <div
                className='mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in'
                style={{ animationDelay: "0.6s" }}
              >
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-neon-cyan rounded-full animate-pulse'></div>
                  Remote-first culture
                </div>
                <div className='flex items-center gap-2'>
                  <div
                    className='w-2 h-2 bg-neon-violet rounded-full animate-pulse'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  Competitive compensation
                </div>
                <div className='flex items-center gap-2'>
                  <div
                    className='w-2 h-2 bg-neon-pink rounded-full animate-pulse'
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  Equity package
                </div>
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

export default About;
