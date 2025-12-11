import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
  LayoutGrid,
  Home,
  Users,
  Sparkles,
  BookOpen,
  Mail,
  DollarSign,
  Briefcase,
  Code2,
  Activity,
  Terminal,
  MessageSquare,
  MessagesSquare,
  FileImage,
  Shield,
  FileText,
  Cookie,
  History,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

// Menu categories with all pages
const menuCategories = [
  {
    title: "Main",
    description: "Core pages",
    items: [
      {
        label: "Home",
        href: "/",
        icon: Home,
        description: "Welcome to CharadesAI",
      },
      {
        label: "About",
        href: "/about",
        icon: Users,
        description: "Our story & mission",
      },
      {
        label: "Features",
        href: "/features",
        icon: Sparkles,
        description: "Explore capabilities",
      },
      {
        label: "Pricing",
        href: "/pricing",
        icon: DollarSign,
        description: "Plans & pricing",
      },
    ],
  },
  {
    title: "Resources",
    description: "Learn & explore",
    items: [
      {
        label: "Blog",
        href: "/blog",
        icon: BookOpen,
        description: "Latest articles & news",
      },
      {
        label: "Use Cases",
        href: "/use-cases",
        icon: Briefcase,
        description: "Real-world applications",
      },
      {
        label: "Code Examples",
        href: "/examples",
        icon: Terminal,
        description: "Sample implementations",
      },
      {
        label: "Changelog",
        href: "/changelog",
        icon: History,
        description: "What's new",
      },
    ],
  },
  {
    title: "Developers",
    description: "Build with us",
    items: [
      {
        label: "API Docs",
        href: "/api",
        icon: Code2,
        description: "Complete API reference",
      },
      {
        label: "API Status",
        href: "/status",
        icon: Activity,
        description: "Service health monitor",
      },
      {
        label: "Community",
        href: "/community",
        icon: MessageSquare,
        description: "Join the community",
      },
      {
        label: "Forum",
        href: "/forum",
        icon: MessagesSquare,
        description: "Discussions & support",
      },
    ],
  },
  {
    title: "Company",
    description: "About us",
    items: [
      {
        label: "Contact",
        href: "/contact",
        icon: Mail,
        description: "Get in touch",
      },
      {
        label: "Press Kit",
        href: "/press-kit",
        icon: FileImage,
        description: "Brand assets",
      },
      {
        label: "Privacy",
        href: "/privacy",
        icon: Shield,
        description: "Privacy policy",
      },
      {
        label: "Terms",
        href: "/terms",
        icon: FileText,
        description: "Terms of service",
      },
      {
        label: "Cookies",
        href: "/cookie-policy",
        icon: Cookie,
        description: "Cookie policy",
      },
    ],
  },
];

const navLinksHead = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isMobileMenuOpen
          ? "bg-background"
          : isScrolled
          ? "bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between gap-4'>
          {/* Left Section: Menu Button + Logo in bordered container */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {/* Hamburger Menu Button */}
              <Button
                variant='outline'
                size='icon'
                className='h-12 w-12 rounded-xl border-border bg-card/50 hover:bg-accent/50'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>

              {/* Logo in bordered container */}
              <Link
                to='/'
                className='flex items-center gap-3 px-4 h-12 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors group'
              >
                <div className='relative'>
                  <div className='w-8 h-8 rounded-lg bg-gradient-ai flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                    <Zap className='w-4 h-4 text-primary-foreground' />
                  </div>
                </div>
                <span className='text-lg font-bold hidden sm:block'>
                  Charades <span className='text-gradient'>AI</span>
                </span>
              </Link>
            </div>

            {/* Center Section: Navigation Links (Desktop) */}
            <div className='hidden lg:flex items-center gap-1 px-2 h-12 rounded-xl border border-border bg-card/50'>
              {navLinksHead.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className='px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium rounded-lg hover:bg-accent/50'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: CTAs */}
          <div className='flex items-center gap-3'>
            {/* Program/Dashboard Button (Desktop) */}
            <Link to='/pricing'>
              <Button
                variant='outline'
                className='hidden md:flex items-center gap-2 h-12 px-5 rounded-xl border-border bg-card/50 hover:bg-card'
              >
                <LayoutGrid className='h-4 w-4' />
                <span>Pricing</span>
              </Button>
            </Link>

            {/* Primary CTA */}
            <Button
              variant='hero'
              className='h-12 px-6 rounded-xl font-semibold'
            >
              <span className='hidden sm:inline'>Start Free Trial</span>
              <span className='sm:hidden'>Start</span>
            </Button>

            {/* Theme Toggle (Desktop) */}
            <div className='hidden md:block'>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-x-0 top-[75px] bottom-0 bg-background/98 backdrop-blur-2xl border-t border-border animate-fade-in z-50 overflow-y-auto'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute -top-40 -right-40 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl' />
            <div className='absolute top-1/2 -left-40 w-96 h-96 bg-neon-violet/5 rounded-full blur-3xl' />
            <div className='absolute -bottom-40 right-1/3 w-72 h-72 bg-neon-pink/5 rounded-full blur-3xl' />
          </div>

          <div className='container mx-auto px-4 py-6 md:py-10 relative'>
            {/* Desktop: Grid Layout */}
            <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
              {menuCategories.map((category, catIndex) => (
                <div
                  key={category.title}
                  className='animate-slide-up'
                  style={{ animationDelay: `${catIndex * 0.05}s` }}
                >
                  {/* Category Header */}
                  <div className='mb-4 pb-2 border-b border-border/50'>
                    <h3 className='text-xs font-bold uppercase tracking-wider text-neon-cyan'>
                      {category.title}
                    </h3>
                    <p className='text-xs text-muted-foreground mt-1'>
                      {category.description}
                    </p>
                  </div>

                  {/* Category Items */}
                  <div className='space-y-1'>
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className='group flex items-start gap-3 p-3 rounded-xl hover:bg-card/80 transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/5'
                        style={{
                          animationDelay: `${
                            catIndex * 0.05 + itemIndex * 0.02
                          }s`,
                        }}
                      >
                        <div className='flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-card to-muted/50 border border-border/50 flex items-center justify-center group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-all duration-300'>
                          <item.icon className='w-4 h-4 text-muted-foreground group-hover:text-neon-cyan transition-colors' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium text-sm text-foreground group-hover:text-neon-cyan transition-colors'>
                              {item.label}
                            </span>
                            <ArrowRight className='w-3 h-3 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200' />
                          </div>
                          <p className='text-xs text-muted-foreground mt-0.5 truncate'>
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Accordion-style Layout */}
            <div className='md:hidden space-y-4'>
              {menuCategories.map((category, catIndex) => (
                <div
                  key={category.title}
                  className='animate-slide-up'
                  style={{ animationDelay: `${catIndex * 0.08}s` }}
                >
                  {/* Category Header */}
                  <div className='mb-3 flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-neon-cyan' />
                    <h3 className='text-sm font-bold uppercase tracking-wider text-foreground'>
                      {category.title}
                    </h3>
                  </div>

                  {/* Category Items - Horizontal scroll on mobile */}
                  <div className='flex flex-wrap gap-2'>
                    {category.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className='group flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/60 border border-border/50 hover:border-neon-cyan/40 hover:bg-card transition-all duration-200'
                      >
                        <item.icon className='w-4 h-4 text-muted-foreground group-hover:text-neon-cyan transition-colors' />
                        <span className='text-sm font-medium text-foreground group-hover:text-neon-cyan transition-colors'>
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile: CTA Section */}
              <div
                className='pt-6 mt-6 border-t border-border/50 animate-slide-up'
                style={{ animationDelay: `${menuCategories.length * 0.08}s` }}
              >
                <div className='flex flex-col gap-3'>
                  <Link to='/signup' onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant='hero'
                      size='lg'
                      className='w-full rounded-xl'
                    >
                      Start Free Trial
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                  </Link>
                  <Link to='/signin' onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant='heroOutline'
                      size='lg'
                      className='w-full rounded-xl'
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mobile: Theme Toggle */}
              <div className='flex items-center justify-between pt-4'>
                <span className='text-sm text-muted-foreground'>Theme</span>
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop: Bottom CTA Bar */}
            <div
              className='hidden md:flex items-center justify-between mt-10 pt-6 border-t border-border/50 animate-slide-up'
              style={{ animationDelay: "0.3s" }}
            >
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                  <span className='text-sm text-muted-foreground'>
                    All systems operational
                  </span>
                </div>
                <Link
                  to='/status'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='text-sm text-neon-cyan hover:underline flex items-center gap-1'
                >
                  View status
                  <ExternalLink className='w-3 h-3' />
                </Link>
              </div>
              <div className='flex items-center gap-3'>
                <Link to='/signin' onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant='heroOutline' className='rounded-xl'>
                    Sign In
                  </Button>
                </Link>
                <Link to='/signup' onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant='hero' className='rounded-xl'>
                    Start Free Trial
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
