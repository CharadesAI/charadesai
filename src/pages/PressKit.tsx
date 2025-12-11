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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  FileText,
  Image,
  Mail,
  ArrowRight,
  Zap,
  Palette,
  Type,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  Check,
  Eye,
  Code,
  FileImage,
  FileVideo,
  Music,
  Archive,
  Settings,
  BookOpen,
  Star,
  Award,
  Users,
  TrendingUp,
  Calendar,
  Globe,
  Shield,
  Heart,
  Target,
  Lightbulb,
  Rocket,
  Brain,
  Camera,
  Volume2,
  Edit,
  Trash2,
  Send,
  Smile,
  Paperclip,
  Bold,
  Italic,
  List,
  Quote,
  Code2,
  AtSign,
  Hash as HashIcon,
  Lock,
  Unlock,
  RefreshCw,
  SortAsc,
  SortDesc,
  Grid3X3,
  List as ListIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const pressReleases = [
  {
    title: "CharadesAI Raises $15M Series A for Accessible AI Technology",
    date: "November 15, 2025",
    excerpt:
      "Funding will accelerate development of lip-reading and gesture recognition APIs.",
  },
  {
    title: "CharadesAI Achieves 99.7% Accuracy in Lip-Reading Benchmark",
    date: "October 28, 2025",
    excerpt:
      "New research demonstrates industry-leading performance in real-world conditions.",
  },
  {
    title: "Major Tech Companies Adopt CharadesAI for Accessibility Features",
    date: "September 10, 2025",
    excerpt:
      "Leading platforms integrate vision AI to improve user experience for millions.",
  },
];

const assets = [
  {
    category: "Logos",
    items: [
      { name: "Primary Logo (PNG)", format: "PNG", size: "2MB" },
      { name: "Primary Logo (SVG)", format: "SVG", size: "45KB" },
      { name: "Icon Only (PNG)", format: "PNG", size: "500KB" },
      { name: "Wordmark (PNG)", format: "PNG", size: "1.2MB" },
    ],
  },
  {
    category: "Brand Guidelines",
    items: [
      { name: "Brand Style Guide", format: "PDF", size: "5.8MB" },
      { name: "Color Palette", format: "ASE", size: "12KB" },
      { name: "Typography Guide", format: "PDF", size: "2.1MB" },
    ],
  },
  {
    category: "Product Images",
    items: [
      { name: "API Dashboard Screenshots", format: "ZIP", size: "15MB" },
      { name: "Demo Video Thumbnails", format: "ZIP", size: "8.5MB" },
      { name: "Infographic Templates", format: "ZIP", size: "12MB" },
    ],
  },
];

const PressKit = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-20 bg-gradient-hero relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neon-emerald/20 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-cyan/10 blur-3xl' />
            <div className='absolute inset-0 bg-black/40 dark:bg-black/20' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              <FileText className='w-4 h-4' />
              Press Kit
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Press <span className='text-gradient'>Resources</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Download logos, press releases, and brand assets. Everything you
              need to cover CharadesAI.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button
                variant='hero'
                size='lg'
                onClick={() => navigate("/contact")}
              >
                Download Full Kit <Download className='w-4 h-4' />
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                onClick={() => navigate("/contact")}
              >
                Contact Press Team <Mail className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Latest <span className='text-gradient'>News</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Stay updated with our latest announcements and milestones.
              </p>
            </div>
            <div className='space-y-6'>
              {pressReleases.map((release, index) => (
                <Card key={index} className='hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-xl mb-2'>
                          {release.title}
                        </CardTitle>
                        <p className='text-sm text-muted-foreground mb-2'>
                          {release.date}
                        </p>
                        <CardDescription>{release.excerpt}</CardDescription>
                      </div>
                      <Badge variant='secondary'>Press Release</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant='outline'
                      onClick={() => navigate("/contact")}
                    >
                      Read Full Release <ArrowRight className='w-4 h-4 ml-1' />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Assets */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Brand <span className='text-gradient'>Assets</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Download high-quality assets for your coverage and publications.
              </p>
            </div>
            <div className='grid md:grid-cols-3 gap-8'>
              {assets.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Image className='w-5 h-5' />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {category.items.map((item, i) => (
                        <div
                          key={i}
                          className='flex items-center justify-between p-3 bg-card rounded-lg'
                        >
                          <div>
                            <p className='font-medium text-sm'>{item.name}</p>
                            <p className='text-xs text-muted-foreground'>
                              {item.format} • {item.size}
                            </p>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => navigate("/contact")}
                          >
                            <Download className='w-4 h-4' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Facts */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Company <span className='text-gradient'>Facts</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Key information about CharadesAI for your articles and reports.
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-gradient mb-2'>
                      2023
                    </div>
                    <p className='text-sm text-muted-foreground'>Founded</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-gradient mb-2'>
                      50+
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Team Members
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-gradient mb-2'>
                      $15M
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Series A Funding
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='pt-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-gradient mb-2'>
                      99.7%
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Accuracy Rate
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className='py-24 bg-gradient-hero'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Need More <span className='text-gradient'>Information</span>?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Our press team is available to answer questions and provide
              additional materials.
            </p>
            <div className='flex justify-center gap-4'>
              <Button
                variant='hero'
                size='lg'
                onClick={() => navigate("/contact")}
              >
                <Mail className='w-4 h-4 mr-2' />
                Contact Press Team
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                onClick={() => navigate("/contact")}
              >
                <Zap className='w-4 h-4 mr-2' />
                Schedule Interview
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

export default PressKit;
