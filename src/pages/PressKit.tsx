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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Copy,
  Check,
  Eye,
  FileImage,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Utility: Convert HSL string like "217 91% 60%" to HEX color
function hslStringToHex(hslString: string): string {
  // extract numeric parts
  const parts = hslString.match(/-?\d+\.?\d*/g);
  if (!parts || parts.length < 3) return "#000000";
  const h = Number(parts[0]);
  const s = Number(parts[1].replace("%", ""));
  const l = Number(parts[2].replace("%", ""));

  // Convert HSL to RGB
  const a = s / 100;
  const b = l / 100;
  const c = (1 - Math.abs(2 * b - 1)) * a;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = b - c / 2;
  let r = 0,
    g = 0,
    blue = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    blue = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    blue = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    blue = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    blue = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    blue = c;
  } else {
    r = c;
    g = 0;
    blue = x;
  }
  const R = Math.round((r + m) * 255);
  const G = Math.round((g + m) * 255);
  const B = Math.round((blue + m) * 255);

  const hex = `#${[R, G, B]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
  return hex;
}

const pressReleases = [
  {
    title: "CharadesAI Raises $15M Series A for Accessible AI Technology",
    date: "November 15, 2025",
    excerpt:
      "Funding will accelerate development of lip-reading and gesture recognition APIs.",
    category: "Funding",
    readTime: "3 min read",
  },
  {
    title: "CharadesAI Achieves 99.7% Accuracy in Lip-Reading Benchmark",
    date: "October 28, 2025",
    excerpt:
      "New research demonstrates industry-leading performance in real-world conditions.",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    title: "Major Tech Companies Adopt CharadesAI for Accessibility Features",
    date: "September 10, 2025",
    excerpt:
      "Leading platforms integrate CharadesAI to improve user experience for millions.",
    category: "Partnerships",
    readTime: "4 min read",
  },
];

const brandAssets = [
  {
    category: "Primary Logo",
    icon: Image,
    description: "Main CharadesAI logo for all applications",
    items: [
      {
        name: "Logo - Primary (PNG)",
        format: "PNG",
        size: "2.4 MB",
        resolution: "4000x4000px",
        usage: "Print, large displays",
        downloadUrl: "/assets/logo-primary.png",
        preview: "/assets/logo-preview.png",
      },
      {
        name: "Logo - Primary (SVG)",
        format: "SVG",
        size: "45 KB",
        resolution: "Vector",
        usage: "Web, scalable",
        downloadUrl: "/assets/logo-primary.svg",
        preview: "/assets/logo-preview.png",
      },
      {
        name: "Logo - Monochrome",
        format: "PNG",
        size: "890 KB",
        resolution: "4000x4000px",
        usage: "Limited color situations",
        downloadUrl: "/assets/logo-mono.png",
        preview: "/assets/logo-preview.png",
      },
    ],
  },
  {
    category: "Icon & Favicon",
    icon: Monitor,
    description: "Website and app icons",
    items: [
      {
        name: "Favicon (ICO)",
        format: "ICO",
        size: "12 KB",
        resolution: "Multiple sizes",
        usage: "Browser tabs",
        downloadUrl: "/favicon.ico",
        preview: "/favicon.ico",
      },
      {
        name: "App Icon (PNG)",
        format: "PNG",
        size: "156 KB",
        resolution: "1024x1024px",
        usage: "Mobile apps",
        downloadUrl: "/assets/app-icon.png",
        preview: "/assets/app-icon.png",
      },
      {
        name: "Icon - Small (PNG)",
        format: "PNG",
        size: "8 KB",
        resolution: "64x64px",
        usage: "Small UI elements",
        downloadUrl: "/assets/icon-small.png",
        preview: "/assets/icon-small.png",
      },
    ],
  },
  {
    category: "Wordmark",
    icon: Type,
    description: "Text-only logo variations",
    items: [
      {
        name: "Wordmark - Full",
        format: "PNG",
        size: "1.2 MB",
        resolution: "3000x800px",
        usage: "Horizontal layouts",
        downloadUrl: "/assets/wordmark-full.png",
        preview: "/assets/wordmark-preview.png",
      },
      {
        name: "Wordmark - Stacked",
        format: "PNG",
        size: "980 KB",
        resolution: "2000x2000px",
        usage: "Vertical layouts",
        downloadUrl: "/assets/wordmark-stacked.png",
        preview: "/assets/wordmark-preview.png",
      },
    ],
  },
];

// Color palette based on actual CSS variables from index.css
const colorPalette = [
  {
    name: "Background",
    lightHsl: "220 20% 97%",
    darkHsl: "222 47% 6%",
    usage: "Page background",
    cssVar: "--background",
  },
  {
    name: "Foreground",
    lightHsl: "220 30% 15%",
    darkHsl: "210 40% 98%",
    usage: "Primary text color",
    cssVar: "--foreground",
  },
  {
    name: "Primary",
    lightHsl: "217 91% 60%",
    darkHsl: "217 91% 60%",
    usage: "Primary actions, links, buttons",
    cssVar: "--primary",
  },
  {
    name: "Secondary",
    lightHsl: "220 14% 96%",
    darkHsl: "217 33% 17%",
    usage: "Secondary elements, muted backgrounds",
    cssVar: "--secondary",
  },
  {
    name: "Accent",
    lightHsl: "280 70% 60%",
    darkHsl: "280 70% 55%",
    usage: "Highlights, emphasis elements",
    cssVar: "--accent",
  },
  {
    name: "Muted",
    lightHsl: "220 14% 96%",
    darkHsl: "217 33% 17%",
    usage: "Muted backgrounds, disabled states",
    cssVar: "--muted",
  },
  {
    name: "Destructive",
    lightHsl: "0 84% 60%",
    darkHsl: "0 63% 45%",
    usage: "Error states, destructive actions",
    cssVar: "--destructive",
  },
  {
    name: "Border",
    lightHsl: "220 13% 91%",
    darkHsl: "217 33% 17%",
    usage: "Borders, dividers",
    cssVar: "--border",
  },
];

// Neon/Glow colors from CSS variables
const neonColors = [
  {
    name: "Neon Cyan",
    lightHsl: "185 100% 50%",
    darkHsl: "185 100% 60%",
    usage: "Glow effects, highlights",
    cssVar: "--neon-cyan",
  },
  {
    name: "Neon Blue",
    lightHsl: "217 100% 60%",
    darkHsl: "217 100% 65%",
    usage: "Accent glow effects",
    cssVar: "--neon-blue",
  },
  {
    name: "Neon Violet",
    lightHsl: "270 100% 65%",
    darkHsl: "270 100% 70%",
    usage: "Accent glow effects",
    cssVar: "--neon-violet",
  },
  {
    name: "Neon Emerald",
    lightHsl: "160 84% 45%",
    darkHsl: "160 84% 55%",
    usage: "Success indicators",
    cssVar: "--neon-emerald",
  },
  {
    name: "Neon Pink",
    lightHsl: "330 100% 65%",
    darkHsl: "330 100% 70%",
    usage: "Accent highlights",
    cssVar: "--neon-pink",
  },
];

const typographyExamples = [
  {
    name: "Heading 1",
    class: "text-4xl md:text-6xl font-bold",
    sample: "Welcome to CharadesAI",
    usage: "Main page titles",
  },
  {
    name: "Heading 2",
    class: "text-3xl md:text-4xl font-bold",
    sample: "Advanced AI Technology",
    usage: "Section headers",
  },
  {
    name: "Heading 3",
    class: "text-2xl font-semibold",
    sample: "Key Features",
    usage: "Subsection headers",
  },
  {
    name: "Body Large",
    class: "text-lg",
    sample:
      "Our AI technology provides real-time lip-reading and gesture recognition capabilities.",
    usage: "Lead paragraphs",
  },
  {
    name: "Body Regular",
    class: "text-base",
    sample:
      "CharadesAI's advanced machine learning models deliver industry-leading accuracy in understanding human communication through visual cues.",
    usage: "Main content text",
  },
  {
    name: "Body Small",
    class: "text-sm text-muted-foreground",
    sample: "Last updated: December 2025",
    usage: "Metadata, captions",
  },
];

const PressKit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAsset, setSelectedAsset] = useState<{
    name: string;
    format: string;
    size: string;
    resolution: string;
    usage: string;
    downloadUrl: string;
    preview: string;
  } | null>(null);
  const [assetSearch, setAssetSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewText, setPreviewText] = useState("The future of AI is here.");
  const [assetSizes, setAssetSizes] = useState<Record<string, string>>({});

  // Calculate dynamic file sizes
  useEffect(() => {
    const calculateFileSizes = async () => {
      const sizes: Record<string, string> = {};

      for (const category of brandAssets) {
        for (const item of category.items) {
          try {
            const response = await fetch(item.downloadUrl);
            if (response.ok) {
              const contentLength = response.headers.get("content-length");
              if (contentLength) {
                const sizeInBytes = parseInt(contentLength);
                const sizeInKB = Math.round(sizeInBytes / 1024);
                sizes[item.downloadUrl] = `${sizeInKB} KB`;
              }
            }
          } catch (error) {
            // Keep the static size if fetch fails
            console.warn(`Could not fetch size for ${item.name}`);
          }
        }
      }

      setAssetSizes(sizes);
    };

    calculateFileSizes();
  }, []);

  const openAssetPreview = (asset: {
    name: string;
    format: string;
    size: string;
    resolution: string;
    usage: string;
    downloadUrl: string;
    preview: string;
  }) => {
    setSelectedAsset(asset);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      toast({
        title: "Copied!",
        description: `${label} value copied to clipboard`,
      });
      setTimeout(() => setCopiedValue(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const downloadFile = (url: string, filename: string) => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";

    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: `Downloading ${filename}`,
    });
  };

  const generateBrandGuidelines = () => {
    const coreColorLines = colorPalette
      .map((c) => {
        const lightHex = hslStringToHex(c.lightHsl);
        const darkHex = hslStringToHex(c.darkHsl);
        return `- ${c.name}: Light hsl(${c.lightHsl}) / ${lightHex} | Dark hsl(${c.darkHsl}) / ${darkHex} — ${c.usage}`;
      })
      .join("\n");

    const neonColorLines = neonColors
      .map((c) => {
        const lightHex = hslStringToHex(c.lightHsl);
        const darkHex = hslStringToHex(c.darkHsl);
        return `- ${c.name}: Light hsl(${c.lightHsl}) / ${lightHex} | Dark hsl(${c.darkHsl}) / ${darkHex} — ${c.usage}`;
      })
      .join("\n");

    const guidelines = `
# CharadesAI Brand Guidelines

## Overview
CharadesAI is a cutting-edge AI platform specializing in lip-reading and gesture recognition technology.

## Logo Usage
- Minimum clear space: 1x logo height around all sides
- Do not distort, rotate, or modify the logo
- Use approved color variations only

## Color System (CSS Custom Properties)

### Core Colors
${coreColorLines}

### Neon/Glow Colors
${neonColorLines}

## Typography
Primary Font: Inter (Google Fonts)
Fallback: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif
Monospace: JetBrains Mono
Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)

## Voice & Tone
Professional yet approachable, innovative and trustworthy.
Focus on accessibility, technology, and human connection.

---
Generated on ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([guidelines], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "charadesai-brand-guidelines.md");
    URL.revokeObjectURL(url);
  };

  const generateCompletePressKit = () => {
    // Create a comprehensive press kit with all assets and information
    const pressKitContent = `
# CharadesAI Press Kit

## Company Overview
CharadesAI is a cutting-edge AI platform specializing in real-time lip-reading and gesture recognition technology.

## Key Facts
- Founded: 2023
- Team Size: 50+ members
- Funding: $15M Series A
- Accuracy Rate: 99.7%

## Technology
Our advanced machine learning models provide industry-leading accuracy in understanding human communication through visual cues.

## Contact Information
For press inquiries: press@charadesai.com
Website: https://charadesai.com

---
Generated on ${new Date().toLocaleDateString()}
    `.trim();

    // Create multiple files for the press kit
    const files = [
      { name: "README.md", content: pressKitContent },
      {
        name: "company-facts.md",
        content:
          "# Company Facts\n\n- Founded: 2023\n- HQ: San Francisco, CA\n- Team: 50+ engineers\n- Funding: $15M Series A\n- Patents: 12 pending",
      },
      {
        name: "press-contacts.md",
        content:
          "# Press Contacts\n\nMedia Inquiries: press@charadesai.com\nTechnical Questions: tech@charadesai.com\nPartnerships: partnerships@charadesai.com",
      },
    ];

    // Create a ZIP-like structure (simplified for demo)
    const zipContent = files
      .map((file) => `${file.name}:\n${file.content}`)
      .join("\n\n---\n\n");

    const blob = new Blob([zipContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "charadesai-press-kit.txt");
    URL.revokeObjectURL(url);

    toast({
      title: "Press Kit Downloaded",
      description: "Complete press kit with all materials has been downloaded",
    });
  };
  const generateStyleGuide = () => {
    const coreColorLines = colorPalette
      .map((c) => {
        const lightHex = hslStringToHex(c.lightHsl);
        const darkHex = hslStringToHex(c.darkHsl);
        return `- ${c.name} (${c.cssVar})\n  Light: hsl(${c.lightHsl}) / ${lightHex}\n  Dark: hsl(${c.darkHsl}) / ${darkHex}\n  Usage: ${c.usage}`;
      })
      .join("\n\n");

    const neonColorLines = neonColors
      .map((c) => {
        const lightHex = hslStringToHex(c.lightHsl);
        const darkHex = hslStringToHex(c.darkHsl);
        return `- ${c.name} (${c.cssVar})\n  Light: hsl(${c.lightHsl}) / ${lightHex}\n  Dark: hsl(${c.darkHsl}) / ${darkHex}\n  Usage: ${c.usage}`;
      })
      .join("\n\n");

    const typographyLines = typographyExamples
      .map(
        (t) =>
          `### ${t.name}\nClass: \`${t.class}\`\nUsage: ${t.usage}\nSample: ${t.sample}`
      )
      .join("\n\n");

    const content = `# CharadesAI Style Guide

## Overview
CharadesAI visual system: colors, typography, and component variants for consistent branding.

## Core Colors (CSS Custom Properties)
${coreColorLines}

## Neon/Glow Colors
${neonColorLines}

## Typography
${typographyLines}

## Font Families
- Primary: Inter (Google Fonts)
- Monospace: JetBrains Mono
- Fallback: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif

## Button Variants
- hero — Gradient background with glow effect
- heroOutline — Bordered secondary CTA
- glow — Hover glow effect
- neon — Cyan neon border style

## Usage Notes
- Use CSS custom properties for theming support
- All colors support light and dark modes automatically
- Prefer accessible color contrast for text
- Maintain minimum clear space around logos

---
Generated on ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, "charadesai-style-guide.md");
    URL.revokeObjectURL(url);

    toast({
      title: "Style Guide Downloaded",
      description: "CharadesAI style guide has been downloaded",
    });
  };

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
                onClick={() => setActiveTab("assets")}
              >
                Download Assets <Download className='w-4 h-4' />
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

        {/* Interactive Press Kit */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-5 mb-12'>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='assets'>Brand Assets</TabsTrigger>
                <TabsTrigger value='colors'>Colors</TabsTrigger>
                <TabsTrigger value='typography'>Typography</TabsTrigger>
                <TabsTrigger value='news'>News</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value='overview' className='space-y-12'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Complete <span className='text-gradient'>Press Kit</span>
                  </h2>
                  <p className='text-muted-foreground max-w-2xl mx-auto'>
                    Everything you need to create compelling content about
                    CharadesAI.
                  </p>
                </div>

                <div className='grid md:grid-cols-3 gap-8'>
                  <Card className='hover:shadow-lg transition-all duration-300 hover:scale-105'>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-3'>
                        <Image className='w-6 h-6 text-primary' />
                        Brand Assets
                      </CardTitle>
                      <CardDescription>
                        Logos, icons, and visual elements in multiple formats
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className='w-full'
                        onClick={() => setActiveTab("assets")}
                      >
                        View Assets <ArrowRight className='w-4 h-4 ml-2' />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className='hover:shadow-lg transition-all duration-300 hover:scale-105'>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-3'>
                        <Palette className='w-6 h-6 text-primary' />
                        Design System
                      </CardTitle>
                      <CardDescription>
                        Colors, typography, and style guidelines
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => setActiveTab("colors")}
                        >
                          View Colors
                        </Button>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => setActiveTab("typography")}
                        >
                          View Typography
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='hover:shadow-lg transition-all duration-300 hover:scale-105'>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-3'>
                        <FileText className='w-6 h-6 text-primary' />
                        Press Materials
                      </CardTitle>
                      <CardDescription>
                        Releases, factsheets, and downloadable guides
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => setActiveTab("news")}
                        >
                          View News
                        </Button>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={generateBrandGuidelines}
                        >
                          Download Guidelines
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className='bg-secondary/30 rounded-2xl p-8'>
                  <h3 className='text-2xl font-bold text-center mb-8'>
                    Company at a Glance
                  </h3>
                  <div className='grid md:grid-cols-4 gap-6 mb-8'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-gradient mb-2'>
                        2023
                      </div>
                      <p className='text-sm text-muted-foreground'>Founded</p>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-gradient mb-2'>
                        50+
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Team Members
                      </p>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-gradient mb-2'>
                        $15M
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Series A Funding
                      </p>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-gradient mb-2'>
                        99.7%
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Accuracy Rate
                      </p>
                    </div>
                  </div>
                  <div className='text-center'>
                    <Button onClick={generateCompletePressKit} size='lg'>
                      <Download className='w-4 h-4 mr-2' />
                      Download Complete Press Kit
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Brand Assets Tab */}
              <TabsContent value='assets' className='space-y-12'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Brand <span className='text-gradient'>Assets</span>
                  </h2>
                  <p className='text-muted-foreground max-w-2xl mx-auto'>
                    Download high-quality assets for your coverage and
                    publications.
                  </p>
                </div>

                {/* Search and Filter Controls */}
                <div className='bg-secondary/30 rounded-2xl p-6 mb-8'>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1'>
                      <Input
                        placeholder='Search assets...'
                        value={assetSearch}
                        onChange={(e) => setAssetSearch(e.target.value)}
                        className='w-full'
                      />
                    </div>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className='w-full md:w-48'>
                        <SelectValue placeholder='Filter by category' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Categories</SelectItem>
                        <SelectItem value='Logo'>Logo</SelectItem>
                        <SelectItem value='Icon'>Icon</SelectItem>
                        <SelectItem value='Wordmark'>Wordmark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-12'>
                  {brandAssets
                    .filter(
                      (category) =>
                        selectedCategory === "all" ||
                        category.category === selectedCategory
                    )
                    .map((category, categoryIndex) => {
                      const filteredItems = category.items.filter(
                        (item) =>
                          item.name
                            .toLowerCase()
                            .includes(assetSearch.toLowerCase()) ||
                          item.format
                            .toLowerCase()
                            .includes(assetSearch.toLowerCase()) ||
                          item.usage
                            .toLowerCase()
                            .includes(assetSearch.toLowerCase())
                      );

                      if (filteredItems.length === 0) return null;

                      return (
                        <div key={categoryIndex}>
                          <div className='flex items-center gap-4 mb-6'>
                            <category.icon className='w-8 h-8 text-primary' />
                            <div>
                              <h3 className='text-2xl font-bold'>
                                {category.category}
                              </h3>
                              <p className='text-muted-foreground'>
                                {category.description}
                              </p>
                            </div>
                          </div>

                          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {filteredItems.map((item, itemIndex) => (
                              <Card
                                key={itemIndex}
                                className='hover:shadow-lg transition-all duration-300 hover:scale-105'
                              >
                                <CardHeader>
                                  <div className='flex items-start justify-between'>
                                    <div className='flex-1'>
                                      <CardTitle className='text-lg mb-2'>
                                        {item.name}
                                      </CardTitle>
                                      <div className='flex items-center gap-2 mb-2'>
                                        <Badge variant='secondary'>
                                          {item.format}
                                        </Badge>
                                        <Badge variant='outline'>
                                          {assetSizes[item.downloadUrl] ||
                                            item.size}
                                        </Badge>
                                      </div>
                                      <CardDescription className='text-sm'>
                                        {item.resolution} • {item.usage}
                                      </CardDescription>
                                    </div>
                                    <Button
                                      variant='ghost'
                                      size='sm'
                                      onClick={() =>
                                        downloadFile(
                                          item.downloadUrl,
                                          item.name
                                        )
                                      }
                                      className='shrink-0'
                                    >
                                      <Download className='w-4 h-4' />
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div
                                    className='aspect-square bg-secondary/20 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:bg-secondary/30 transition-colors'
                                    onClick={() => openAssetPreview(item)}
                                  >
                                    <FileImage className='w-12 h-12 text-muted-foreground' />
                                  </div>
                                  <div className='flex gap-2'>
                                    <Button
                                      variant='outline'
                                      className='flex-1'
                                      onClick={() => openAssetPreview(item)}
                                    >
                                      <Eye className='w-4 h-4 mr-2' />
                                      Preview
                                    </Button>
                                    <Button
                                      className='flex-1'
                                      onClick={() =>
                                        downloadFile(
                                          item.downloadUrl,
                                          item.name
                                        )
                                      }
                                    >
                                      <Download className='w-4 h-4 mr-2' />
                                      Download
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent value='colors' className='space-y-12'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Color <span className='text-gradient'>System</span>
                  </h2>
                  <p className='text-muted-foreground max-w-2xl mx-auto'>
                    Our design system colors based on CSS custom properties. All
                    colors support light and dark modes.
                  </p>
                </div>

                {/* Core Colors */}
                <div>
                  <h3 className='text-2xl font-bold mb-6 flex items-center gap-2'>
                    <Palette className='w-6 h-6 text-primary' />
                    Core Colors
                  </h3>
                  <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {colorPalette.map((color, index) => {
                      const lightHex = hslStringToHex(color.lightHsl);
                      const darkHex = hslStringToHex(color.darkHsl);
                      return (
                        <Card
                          key={index}
                          className='hover:shadow-lg transition-all duration-300 group overflow-hidden'
                        >
                          <div className='flex h-20'>
                            <div
                              className='w-1/2 flex items-center justify-center text-xs font-medium'
                              style={{
                                backgroundColor: `hsl(${color.lightHsl})`,
                                color:
                                  color.name === "Background" ||
                                  color.name === "Secondary" ||
                                  color.name === "Muted" ||
                                  color.name === "Border"
                                    ? "hsl(220 30% 15%)"
                                    : "white",
                              }}
                            >
                              Light
                            </div>
                            <div
                              className='w-1/2 flex items-center justify-center text-xs font-medium'
                              style={{
                                backgroundColor: `hsl(${color.darkHsl})`,
                                color:
                                  color.name === "Foreground"
                                    ? "hsl(222 47% 6%)"
                                    : "white",
                              }}
                            >
                              Dark
                            </div>
                          </div>
                          <CardContent className='pt-4 pb-4'>
                            <div className='flex items-center justify-between mb-2'>
                              <h4 className='font-semibold text-sm'>
                                {color.name}
                              </h4>
                              <code className='text-xs bg-muted px-2 py-0.5 rounded'>
                                {color.cssVar}
                              </code>
                            </div>
                            <p className='text-xs text-muted-foreground mb-3'>
                              {color.usage}
                            </p>
                            <div className='space-y-1'>
                              <div className='flex items-center justify-between text-xs'>
                                <span className='text-muted-foreground'>
                                  Hex (Light):
                                </span>
                                <div className='flex items-center gap-1'>
                                  <code className='bg-muted px-1.5 py-0.5 rounded font-mono'>
                                    {lightHex}
                                  </code>
                                  <Button
                                    variant='ghost'
                                    size='sm'
                                    className='h-6 w-6 p-0'
                                    title={`Copy ${color.name} Light HEX`}
                                    aria-label={`Copy ${color.name} Light HEX`}
                                    onClick={() =>
                                      copyToClipboard(
                                        lightHex,
                                        `${color.name} Light HEX`
                                      )
                                    }
                                  >
                                    {copiedValue === lightHex ? (
                                      <Check className='w-3 h-3 text-neon-emerald' />
                                    ) : (
                                      <Copy className='w-3 h-3' />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <div className='flex items-center justify-between text-xs'>
                                <span className='text-muted-foreground'>
                                  Hex (Dark):
                                </span>
                                <div className='flex items-center gap-1'>
                                  <code className='bg-muted px-1.5 py-0.5 rounded font-mono'>
                                    {darkHex}
                                  </code>
                                  <Button
                                    variant='ghost'
                                    size='sm'
                                    className='h-6 w-6 p-0'
                                    title={`Copy ${color.name} Dark HEX`}
                                    aria-label={`Copy ${color.name} Dark HEX`}
                                    onClick={() =>
                                      copyToClipboard(
                                        darkHex,
                                        `${color.name} Dark HEX`
                                      )
                                    }
                                  >
                                    {copiedValue === darkHex ? (
                                      <Check className='w-3 h-3 text-neon-emerald' />
                                    ) : (
                                      <Copy className='w-3 h-3' />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <div className='flex items-center justify-between text-xs'>
                                <span className='text-muted-foreground'>
                                  HSL (Light):
                                </span>
                                <div className='flex items-center gap-1'>
                                  <code className='bg-muted px-1.5 py-0.5 rounded font-mono'>{`hsl(${color.lightHsl})`}</code>
                                  <Button
                                    variant='ghost'
                                    size='sm'
                                    className='h-6 w-6 p-0'
                                    title={`Copy ${color.name} Light HSL`}
                                    aria-label={`Copy ${color.name} Light HSL`}
                                    onClick={() =>
                                      copyToClipboard(
                                        `hsl(${color.lightHsl})`,
                                        `${color.name} Light HSL`
                                      )
                                    }
                                  >
                                    {copiedValue ===
                                    `hsl(${color.lightHsl})` ? (
                                      <Check className='w-3 h-3 text-neon-emerald' />
                                    ) : (
                                      <Copy className='w-3 h-3' />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <div className='flex items-center justify-between text-xs'>
                                <span className='text-muted-foreground'>
                                  HSL (Dark):
                                </span>
                                <div className='flex items-center gap-1'>
                                  <code className='bg-muted px-1.5 py-0.5 rounded font-mono'>{`hsl(${color.darkHsl})`}</code>
                                  <Button
                                    variant='ghost'
                                    size='sm'
                                    className='h-6 w-6 p-0'
                                    title={`Copy ${color.name} Dark HSL`}
                                    aria-label={`Copy ${color.name} Dark HSL`}
                                    onClick={() =>
                                      copyToClipboard(
                                        `hsl(${color.darkHsl})`,
                                        `${color.name} Dark HSL`
                                      )
                                    }
                                  >
                                    {copiedValue === `hsl(${color.darkHsl})` ? (
                                      <Check className='w-3 h-3 text-neon-emerald' />
                                    ) : (
                                      <Copy className='w-3 h-3' />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Neon/Glow Colors */}
                <div>
                  <h3 className='text-2xl font-bold mb-6 flex items-center gap-2'>
                    <Zap className='w-6 h-6 text-neon-cyan' />
                    Neon & Glow Effects
                  </h3>
                  <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
                    {neonColors.map((color, index) => {
                      const hex = hslStringToHex(color.darkHsl);
                      return (
                        <Card
                          key={index}
                          className='hover:shadow-lg transition-all duration-300 group overflow-hidden'
                        >
                          <div
                            className='h-16 flex items-center justify-center'
                            style={{
                              backgroundColor: `hsl(${color.darkHsl})`,
                              boxShadow: `0 0 30px hsl(${color.darkHsl} / 0.5)`,
                            }}
                          >
                            <span className='text-white text-xs font-medium drop-shadow-lg'>
                              Glow
                            </span>
                          </div>
                          <CardContent className='pt-4 pb-4'>
                            <div className='flex items-center justify-between mb-2'>
                              <h4 className='font-semibold text-sm'>
                                {color.name}
                              </h4>
                            </div>
                            <p className='text-xs text-muted-foreground mb-3'>
                              {color.usage}
                            </p>
                            <div className='flex items-center justify-between text-xs gap-2'>
                              <div className='flex items-center gap-2'>
                                <code className='bg-muted px-1.5 py-0.5 rounded font-mono text-xs'>
                                  {hex}
                                </code>
                                <code className='text-xs text-muted-foreground'>
                                  hsl({color.darkHsl})
                                </code>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-6 w-6 p-0'
                                  title={`Copy ${color.name} HEX`}
                                  aria-label={`Copy ${color.name} HEX`}
                                  onClick={() =>
                                    copyToClipboard(hex, `${color.name} HEX`)
                                  }
                                >
                                  {copiedValue === hex ? (
                                    <Check className='w-3 h-3 text-neon-emerald' />
                                  ) : (
                                    <Copy className='w-3 h-3' />
                                  )}
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-6 w-6 p-0'
                                  title={`Copy ${color.name} HSL`}
                                  aria-label={`Copy ${color.name} HSL`}
                                  onClick={() =>
                                    copyToClipboard(
                                      `hsl(${color.darkHsl})`,
                                      `${color.name} HSL`
                                    )
                                  }
                                >
                                  {copiedValue === `hsl(${color.darkHsl})` ? (
                                    <Check className='w-3 h-3 text-neon-emerald' />
                                  ) : (
                                    <Copy className='w-3 h-3' />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className='bg-secondary/30 rounded-2xl p-8'>
                  <h3 className='text-xl font-bold mb-4'>
                    Download Style Guide
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    Get the complete color palette and usage guidelines in a
                    downloadable format.
                  </p>
                  <Button onClick={generateStyleGuide}>
                    <Download className='w-4 h-4 mr-2' />
                    Download Style Guide
                  </Button>
                </div>
              </TabsContent>

              {/* Typography Tab */}
              <TabsContent value='typography' className='space-y-12'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Typography <span className='text-gradient'>System</span>
                  </h2>
                  <p className='text-muted-foreground max-w-2xl mx-auto'>
                    Our typography scale and usage guidelines for consistent
                    communication.
                  </p>
                </div>

                <div className='space-y-8'>
                  {typographyExamples.map((type, index) => (
                    <Card
                      key={index}
                      className='hover:shadow-lg transition-all duration-300'
                    >
                      <CardContent className='pt-6'>
                        <div className='flex items-center justify-between mb-4'>
                          <h3 className='text-lg font-semibold'>{type.name}</h3>
                          <Badge variant='outline'>{type.usage}</Badge>
                        </div>
                        <div className={`mb-4 ${type.class}`}>
                          {type.sample}
                        </div>
                        <code className='text-sm bg-secondary px-3 py-2 rounded block'>
                          {type.class}
                        </code>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Interactive Typography Preview */}
                <div className='bg-secondary/30 rounded-2xl p-8'>
                  <h3 className='text-xl font-bold mb-6'>
                    Live Typography Preview
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    Type below to see how your text looks in our typography
                    system.
                  </p>

                  <div className='space-y-6'>
                    <Textarea
                      placeholder='Enter your text here to preview...'
                      className='min-h-24'
                      value={previewText}
                      onChange={(e) => setPreviewText(e.target.value)}
                    />

                    {previewText && (
                      <div className='space-y-6'>
                        <h4 className='font-semibold'>Preview:</h4>
                        {typographyExamples.map((type, index) => (
                          <div
                            key={index}
                            className='border-l-4 border-primary/30 pl-4'
                          >
                            <div className='flex items-center gap-2 mb-2'>
                              <Badge variant='secondary' className='text-xs'>
                                {type.name}
                              </Badge>
                              <span className='text-xs text-muted-foreground'>
                                {type.usage}
                              </span>
                            </div>
                            <div className={`text-foreground ${type.class}`}>
                              {previewText}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className='bg-secondary/30 rounded-2xl p-8'>
                  <h3 className='text-xl font-bold mb-4'>
                    Typography Guidelines
                  </h3>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold mb-2'>Font Family</h4>
                      <p className='text-sm text-muted-foreground mb-4'>
                        Primary: Inter (Google Fonts)
                        <br />
                        Fallback: System font stack (ui-sans-serif, system-ui,
                        -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                        Helvetica Neue, Arial, sans-serif)
                      </p>
                      <h4 className='font-semibold mb-2'>Monospace Font</h4>
                      <p className='text-sm text-muted-foreground'>
                        JetBrains Mono (Primary)
                        <br />
                        Fallback: ui-monospace, SFMono-Regular, Menlo, Monaco,
                        Consolas, Liberation Mono, Courier New, monospace
                      </p>
                    </div>
                    <div>
                      <h4 className='font-semibold mb-2'>Weights</h4>
                      <p className='text-sm text-muted-foreground mb-4'>
                        300 (Light), 400 (Regular), 500 (Medium), 600
                        (Semi-bold), 700 (Bold), 800 (Extra-bold)
                      </p>
                      <h4 className='font-semibold mb-2'>Line Heights</h4>
                      <p className='text-sm text-muted-foreground mb-4'>
                        Headings: 1.2
                        <br />
                        Body: 1.6
                        <br />
                        Small: 1.5
                      </p>
                      <h4 className='font-semibold mb-2'>Letter Spacing</h4>
                      <p className='text-sm text-muted-foreground'>
                        Tight: -0.02em
                        <br />
                        Normal: 0<br />
                        Wide: 0.02em
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* News Tab */}
              <TabsContent value='news' className='space-y-12'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Latest <span className='text-gradient'>News</span>
                  </h2>
                  <p className='text-muted-foreground max-w-2xl mx-auto'>
                    Stay updated with our latest announcements and milestones.
                  </p>
                </div>

                <div className='space-y-6'>
                  {pressReleases.map((release, index) => (
                    <Card
                      key={index}
                      className='hover:shadow-lg transition-shadow'
                    >
                      <CardHeader>
                        <div className='flex items-start justify-between'>
                          <div>
                            <CardTitle className='text-xl mb-2'>
                              {release.title}
                            </CardTitle>
                            <div className='flex items-center gap-2 mb-2'>
                              <Badge variant='secondary'>
                                {release.category}
                              </Badge>
                              <span className='text-sm text-muted-foreground'>
                                {release.date}
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                •
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                {release.readTime}
                              </span>
                            </div>
                            <CardDescription>{release.excerpt}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant='outline'
                          onClick={() => navigate("/contact")}
                        >
                          Read Full Release{" "}
                          <ArrowRight className='w-4 h-4 ml-1' />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Section */}
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

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <Dialog
          open={!!selectedAsset}
          onOpenChange={() => setSelectedAsset(null)}
        >
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <FileImage className='w-5 h-5' />
                {selectedAsset.name}
              </DialogTitle>
              <DialogDescription>Preview and download asset</DialogDescription>
            </DialogHeader>

            <div className='space-y-6'>
              {/* Asset Preview */}
              <div className='aspect-video bg-secondary/20 rounded-lg flex items-center justify-center'>
                <div className='text-center'>
                  <FileImage className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
                  <p className='text-sm text-muted-foreground'>Asset Preview</p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {selectedAsset.format} •{" "}
                    {assetSizes[selectedAsset.downloadUrl] ||
                      selectedAsset.size}{" "}
                    • {selectedAsset.resolution}
                  </p>
                </div>
              </div>

              {/* Asset Details */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <h4 className='font-semibold mb-2'>File Information</h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Format:</span>
                      <span>{selectedAsset.format}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Size:</span>
                      <span>
                        {assetSizes[selectedAsset.downloadUrl] ||
                          selectedAsset.size}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Resolution:</span>
                      <span>{selectedAsset.resolution}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>Usage Guidelines</h4>
                  <p className='text-sm text-muted-foreground'>
                    {selectedAsset.usage}
                  </p>
                </div>
              </div>

              {/* Download Actions */}
              <div className='flex gap-3'>
                <Button
                  className='flex-1'
                  onClick={() =>
                    downloadFile(selectedAsset.downloadUrl, selectedAsset.name)
                  }
                >
                  <Download className='w-4 h-4 mr-2' />
                  Download Asset
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setSelectedAsset(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default PressKit;
