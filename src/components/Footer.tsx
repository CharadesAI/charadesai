import { Link } from "react-router-dom";
import { Zap, Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "API Reference", href: "/api" },
    { label: "Changelog", href: "/changelog" },
  ],
  developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Status", href: "/status" },
    { label: "Code Examples", href: "/examples" },
    { label: "Community", href: "/community" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Press Kit", href: "/press-kit" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className='bg-card border-t border-border'>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-2 md:grid-cols-6 gap-8 mb-12'>
          {/* Brand Column */}
          <div className='col-span-2'>
            <Link to='/' className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center'>
                <Zap className='w-5 h-5 text-primary-foreground' />
              </div>
              <span className='text-xl font-bold'>
                Charades<span className='text-gradient'>AI</span>
              </span>
            </Link>
            <p className='text-sm text-muted-foreground mb-6 max-w-xs'>
              Next-generation lip-reading and gesture recognition API for
              developers and enterprises.
            </p>

            {/* Newsletter */}
            <div className='flex gap-2'>
              <Input
                type='email'
                placeholder='Your email'
                className='h-10 bg-background'
              />
              <Button variant='default' size='sm'>
                Subscribe
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className='font-semibold mb-4'>Product</h4>
            <ul className='space-y-2'>
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Developers</h4>
            <ul className='space-y-2'>
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-2'>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4'>
          <p className='text-sm text-muted-foreground'>
            © 2024 CharadesAI. All rights reserved.
          </p>

          <div className='flex items-center gap-4'>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className='w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors'
                aria-label={social.label}
              >
                <social.icon className='w-5 h-5' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
