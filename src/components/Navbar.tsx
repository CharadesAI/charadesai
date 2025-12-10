import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
const navLinksHead = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
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
        isScrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
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
                  Vision<span className='text-gradient'>AI</span>
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

      {/* Full Menu Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-x-0 top-[88px] bottom-0 bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in z-40'>
          <div className='container mx-auto px-4 py-8'>
            <div className='flex flex-col gap-2'>
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className='text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors py-4 border-b border-border animate-slide-up'
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to='/pricing'
                className='text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors py-4 border-b border-border animate-slide-up'
                style={{ animationDelay: `${navLinks.length * 0.05}s` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div
                className='flex items-center gap-4 pt-6 animate-slide-up'
                style={{ animationDelay: `${(navLinks.length + 1) * 0.05}s` }}
              >
                <Button variant='ghost' size='lg' className='flex-1 max-w-xs'>
                  Sign In
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
