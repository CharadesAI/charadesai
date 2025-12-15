import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import {
  FaXTwitter as XTwitter,
  FaFacebook as Facebook,
  FaYoutube as Youtube,
  FaLinkedin as Linkedin,
} from "react-icons/fa6";
import { SiCrunchbase } from "react-icons/si";
import { cn } from "@/lib/utils";
import { i } from "node_modules/framer-motion/dist/types.d-DagZKalS";
import { FaPinterest } from "react-icons/fa";
import Logo from "./Logo";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Use Cases", href: "/use-cases" },
  ],
  developers: [
    { label: "API Docs", href: "/api" },
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
  {
    icon: Facebook,
    href: "https://www.facebook.com/charadesai5",
    label: "Facebook",
  },
  { icon: XTwitter, href: "https://x.com/account/access", label: "X" },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@CharadesAi",
    label: "YouTube",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/charadesai",
    label: "LinkedIn",
  },
  {
    icon: FaPinterest,
    href: "https://www.pinterest.com/CharadesAi",
    label: "Pinterest",
  },
];

// SVG icons for Crunchbase and F6S (placeholder - user will add actual SVGs)

const F6SIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 800 800'
    className='w-6 h-6 fill-current'
  >
    <path d='M156.9 180.1h136.8v57.8h-79.1v124.9h45.8v57.8h-45.8v199.3h-57.8V180.1z' />
    <path d='M372.4 237.9v124.9h68.5c16.6 0 31.1 14.5 31.1 31v194.7c0 16.7-14.5 31.4-31.1 31.4h-95c-16.6 0-31.1-14.3-31.1-30.6V212.3c0-16.8 14.4-32.2 30.3-32.2h95.9c16.6 0 31.1 14.5 31.1 31v72.7h-57.8v-45.8zm0 182.7v141.5h41.9V420.6h-41.9z' />
    <path d='M647.1 283.7h-57.8v-45.8h-41.9v124.9l69.1 0.02c16.4 0 30.5 19.7 30.5 35.8v189.7c0 16.8-14.3 31.6-30.5 31.6h-92.9c-16.3 0-30.5-14.4-30.5-30.7v-106l54.3-0.1v79.1h41.9v-141.5l-65.7 0.02c-16.2 0-30.5-14.6-30.5-31.1V211.3c0-16.6 14.3-31.2 30.5-31.2h92.9c16.3 0 30.5 14.6 30.5 31.2v72.4z' />
  </svg>
);

const platformLinks = [
  {
    icon: SiCrunchbase,
    href: "https://www.crunchbase.com/organization/charadesai",
    label: "Crunchbase",
  },
  { icon: F6SIcon, href: "hhttps://www.f6s.com/charadesai", label: "F6S" },
];

export function Footer() {
  return (
    <footer className='relative border-t border-border bg-background/80 backdrop-blur-xl'>
      {/* Gradient accent line at top */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent' />

      <div className='container mx-auto px-4 py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-8 mb-12'>
          {/* Brand Column */}
          <div className='col-span-2 md:col-span-1'>
            <Link to='/' className='flex items-center h-20 gap-2 mb-4 group'>
              <Logo />
            </Link>
            <p className='text-sm text-muted-foreground mb-6 max-w-xs'>
              Next-generation lip-reading and gesture recognition API for
              developers and enterprises.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className='font-semibold mb-4 text-card-foreground'>Product</h4>
            <ul className='space-y-2'>
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-neon-cyan transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div>
            <h4 className='font-semibold mb-4 text-card-foreground'>
              Developers
            </h4>
            <ul className='space-y-2'>
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-neon-cyan transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className='font-semibold mb-4 text-card-foreground'>Company</h4>
            <ul className='space-y-2'>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-neon-cyan transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className='font-semibold mb-4 text-card-foreground'>Legal</h4>
            <ul className='space-y-2'>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className='text-sm text-muted-foreground hover:text-neon-cyan transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-6'>
          {/* Copyright */}
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} CharadesAI. All rights reserved.
          </p>

          {/* Social & Platform Links */}
          <div className='flex items-center gap-3'>
            {/* Social Icons */}
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "bg-card/80 border border-border",
                  "text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50",
                  "transition-all duration-200 hover:scale-105"
                )}
                aria-label={social.label}
              >
                <social.icon className='w-4 h-4' />
              </a>
            ))}

            {/* Divider */}
            <div className='w-px h-6 bg-border mx-1' />

            {/* Platform Icons (Crunchbase, F6S) */}
            {platformLinks.map((platform) => (
              <a
                key={platform.label}
                href={platform.href}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "bg-card/80 border border-border",
                  "text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50",
                  "transition-all duration-200 hover:scale-105"
                )}
                aria-label={platform.label}
              >
                <platform.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
