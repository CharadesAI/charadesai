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

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We believe in making communication accessible to everyone, regardless of hearing ability.",
  },
  {
    icon: Eye,
    title: "Innovation First",
    description:
      "Pushing the boundaries of computer vision to solve real-world problems.",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Every feature we build starts with understanding user needs.",
  },
  {
    icon: Zap,
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
    image: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "Ex-Meta ML infrastructure lead. Built systems serving billions.",
    image: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Engineering",
    bio: "Former Stripe engineer. Expert in scalable distributed systems.",
    image: "ER",
  },
  {
    name: "Dr. James Liu",
    role: "Head of AI Research",
    bio: "PhD Stanford. Published 40+ papers on speech recognition.",
    image: "JL",
  },
  {
    name: "Aisha Patel",
    role: "Head of Product",
    bio: "Former Figma PM. Passionate about accessible design.",
    image: "AP",
  },
  {
    name: "David Kim",
    role: "VP of Sales",
    bio: "Built sales teams at 3 unicorn startups from 0 to $50M ARR.",
    image: "DK",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Founded",
    description:
      "CharadesAI founded in San Francisco with a mission to make communication accessible.",
  },
  {
    year: "2021",
    title: "Seed Round",
    description:
      "$5M seed funding led by Sequoia Capital. Launched first lip-reading API.",
  },
  {
    year: "2022",
    title: "Series A",
    description:
      "$25M Series A. Expanded to gesture recognition and multi-language support.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description:
      "Opened offices in London and Singapore. Reached 10,000+ developers.",
  },
  {
    year: "2024",
    title: "Enterprise Launch",
    description:
      "Launched enterprise solutions. Partnered with Fortune 500 companies.",
  },
];

const stats = [
  { value: "10,000+", label: "Developers" },
  { value: "500M+", label: "API Calls/Month" },
  { value: "40+", label: "Languages" },
  { value: "99.7%", label: "Accuracy" },
];

const About = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='pt-32 pb-20 bg-gradient-hero'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
                About Us
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
                Making Communication{" "}
                <span className='text-gradient'>Accessible</span> for Everyone
              </h1>
              <p className='text-lg text-muted-foreground mb-8'>
                We're building the future of human-computer interaction through
                advanced lip-reading and gesture recognition AI.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className='py-12 bg-card border-y border-border'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {stats.map((stat) => (
                <div key={stat.label} className='text-center'>
                  <div className='text-3xl md:text-4xl font-bold text-gradient mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='grid lg:grid-cols-2 gap-16'>
              <div>
                <div className='w-14 h-14 rounded-2xl bg-gradient-ai flex items-center justify-center mb-6'>
                  <Target className='w-7 h-7 text-primary-foreground' />
                </div>
                <h2 className='text-3xl font-bold mb-4'>Our Mission</h2>
                <p className='text-muted-foreground leading-relaxed'>
                  To break down communication barriers through AI. We believe
                  that everyone deserves equal access to information, regardless
                  of hearing ability or speaking conditions. Our technology
                  empowers developers to build inclusive applications that
                  understand human communication in all its forms.
                </p>
              </div>
              <div>
                <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-pink flex items-center justify-center mb-6'>
                  <Eye className='w-7 h-7 text-primary-foreground' />
                </div>
                <h2 className='text-3xl font-bold mb-4'>Our Vision</h2>
                <p className='text-muted-foreground leading-relaxed'>
                  A world where technology understands us as naturally as humans
                  do. We're working towards a future where devices can read
                  lips, understand gestures, and respond to non-verbal
                  communication seamlessly—making technology truly accessible to
                  all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Our <span className='text-gradient'>Values</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                The principles that guide everything we do.
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {values.map((value) => (
                <div
                  key={value.title}
                  className='p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors'
                >
                  <value.icon className='w-10 h-10 text-primary mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>{value.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Our <span className='text-gradient'>Journey</span>
              </h2>
            </div>
            <div className='max-w-3xl mx-auto'>
              <div className='relative'>
                <div className='absolute left-4 top-0 bottom-0 w-0.5 bg-border' />
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className='relative pl-12 pb-12 last:pb-0'
                  >
                    <div className='absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold'>
                      {index + 1}
                    </div>
                    <div className='text-sm text-primary font-medium mb-1'>
                      {item.year}
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
                    <p className='text-muted-foreground'>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Meet the <span className='text-gradient'>Team</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                World-class engineers and researchers building the future of
                computer vision.
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
              {team.map((member) => (
                <div
                  key={member.name}
                  className='p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors text-center group'
                >
                  <div className='w-20 h-20 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4'>
                    {member.image}
                  </div>
                  <h3 className='text-lg font-semibold mb-1'>{member.name}</h3>
                  <div className='text-sm text-primary mb-3'>{member.role}</div>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {member.bio}
                  </p>
                  <div className='flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <a
                      href='#'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      <Linkedin className='w-4 h-4' />
                    </a>
                    <a
                      href='#'
                      className='text-muted-foreground hover:text-foreground'
                    >
                      <Twitter className='w-4 h-4' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-24 bg-gradient-hero'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Join Our Mission
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              We're always looking for talented people passionate about AI and
              accessibility.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button variant='hero' size='xl'>
                View Open Positions <ArrowRight className='w-5 h-5' />
              </Button>
              <Button variant='heroOutline' size='xl'>
                Contact Us
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

export default About;
