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
import {
  ArrowRight,
  Code,
  Zap,
  Shield,
  Globe,
  Play,
  Copy,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API = () => {
  const navigate = useNavigate();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/lip-reading",
      description: "Analyze video for lip movements and transcribe speech",
      features: [
        "Real-time streaming",
        "Multiple video formats",
        "Custom vocabularies",
        "Language detection",
      ],
      example: `curl -X POST "https://api.charadesai.com/api/v1/lip-reading" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "video=@video.mp4" \\
  -F "language=en"`,
    },
    {
      method: "POST",
      path: "/api/v1/gesture-recognition",
      description: "Detect and classify hand gestures and body poses",
      features: [
        "Multi-hand tracking",
        "Custom gesture libraries",
        "Pose estimation",
        "Real-time processing",
      ],
      example: `curl -X POST "https://api.charadesai.com/api/v1/gesture-recognition" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "video=@gestures.mp4" \\
  -F "model=custom_gesture_model"`,
    },
    {
      method: "GET",
      path: "/api/v1/models",
      description: "List available AI models and their capabilities",
      features: [
        "Model versioning",
        "Feature comparison",
        "Performance metrics",
        "Pricing information",
      ],
      example: `curl -X GET "https://api.charadesai.com/api/v1/models" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    },
    {
      method: "POST",
      path: "/api/v1/webhooks",
      description: "Configure webhooks for real-time notifications",
      features: [
        "Event-driven notifications",
        "Custom endpoints",
        "Retry logic",
        "Security signatures",
      ],
      example: `curl -X POST "https://api.charadesai.com/api/v1/webhooks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://your-app.com/webhook", "events": ["transcription.complete"]}'`,
    },
  ];

  const codeExamples = {
    javascript: `import { CharadesAI } from '@charadesai/js-sdk';

const client = new CharadesAI({
  apiKey: 'your-api-key'
});

// Lip reading example
const result = await client.lipReading.analyze({
  video: videoFile,
  language: 'en',
  realTime: true
});

console.log(result.transcription);`,
    python: `from charadesai import CharadesAI

client = CharadesAI(api_key='your-api-key')

# Lip reading example
result = client.lip_reading.analyze(
    video='video.mp4',
    language='en',
    real_time=True
)

print(result.transcription)`,
    curl: `curl -X POST "https://api.charadesai.com/api/v1/lip-reading" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "video_url": "https://example.com/video.mp4",
    "language": "en",
    "real_time": true
  }'`,
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-24 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/20 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
              <Code className='w-4 h-4' />
              API Reference
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Powerful <span className='text-gradient'>CharadesAI</span> API
            </h1>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed'>
              Integrate advanced lip-reading and gesture recognition into your
              applications with our comprehensive REST API. Built for
              developers, trusted by enterprises.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Get Started in <span className='text-gradient'>3 Steps</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Integrate CharadesAI into your application with just a few lines
                of code
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8 mb-12'>
              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                    <span className='text-blue-500 font-bold text-lg'>1</span>
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Get Your API Key</h3>
                <p className='text-muted-foreground'>
                  Sign up for a free account and receive your API key instantly.
                </p>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                    <span className='text-green-500 font-bold text-lg'>2</span>
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Install SDK</h3>
                <p className='text-muted-foreground'>
                  Choose your preferred language and install our SDK.
                </p>
              </div>

              <div className='text-center group'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                  <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                    <span className='text-purple-500 font-bold text-lg'>3</span>
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Start Building</h3>
                <p className='text-muted-foreground'>
                  Integrate CharadesAI features into your application.
                </p>
              </div>
            </div>

            <div className='text-center'>
              <Button
                variant='hero'
                size='lg'
                onClick={() => navigate("/contact")}
                className='w-full sm:w-auto flex items-center justify-center'
                aria-label='Get Started Free'
                title='Get Started Free'
              >
                <span className='hidden sm:inline'>Get Started Free</span>
                <span className='inline sm:hidden'>Get Started</span>
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className='py-16 md:py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12 md:mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Core <span className='text-gradient'>API Endpoints</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Comprehensive endpoints for all your CharadesAI needs with
                detailed documentation
              </p>
            </div>

            <div className='space-y-6'>
              {endpoints.map((endpoint, index) => (
                <Card
                  key={index}
                  className='hover:shadow-lg transition-shadow border-border/50'
                >
                  <CardHeader>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                      <CardTitle className='flex items-center gap-3 flex-wrap'>
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "secondary" : "default"
                          }
                          className='font-mono'
                        >
                          {endpoint.method}
                        </Badge>
                        <code className='text-sm md:text-lg bg-secondary px-2 py-1 rounded break-words'>
                          {endpoint.path}
                        </code>
                      </CardTitle>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() =>
                            copyToClipboard(
                              `https://api.charadesai.com${endpoint.path}`
                            )
                          }
                          className='shrink-0'
                          aria-label={`Copy endpoint ${endpoint.path}`}
                          title={`Copy endpoint ${endpoint.path}`}
                        >
                          {copiedEndpoint ===
                          `https://api.charadesai.com${endpoint.path}` ? (
                            <CheckCircle className='w-4 h-4 text-green-500' />
                          ) : (
                            <Copy className='w-4 h-4' />
                          )}
                        </Button>
                      </div>
                    </div>
                    <CardDescription className='text-base mt-2'>
                      {endpoint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        <h4 className='font-semibold mb-3'>Key Features</h4>
                        <ul className='space-y-2'>
                          {endpoint.features.map((feature, i) => (
                            <li
                              key={i}
                              className='flex items-center gap-2 text-sm text-muted-foreground'
                            >
                              <div className='w-1.5 h-1.5 rounded-full bg-primary' />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='overflow-x-scroll'>
                        <h4 className='font-semibold mb-3'>Example Request</h4>
                        <pre className='text-xs bg-secondary p-3 overflow-x-auto rounded-lg text-muted-foreground'>
                          {endpoint.example}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Code <span className='text-gradient'>Examples</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Get up and running quickly with our comprehensive code examples
              </p>
            </div>

            <Tabs defaultValue='javascript' className='w-full'>
              <TabsList className='flex gap-2 overflow-x-auto overflow-y-hidden pb-1 mb-8 md:grid md:grid-cols-3'>
                <TabsTrigger
                  value='javascript'
                  className='min-w-max whitespace-nowrap'
                >
                  JavaScript
                </TabsTrigger>
                <TabsTrigger
                  value='python'
                  className='min-w-max whitespace-nowrap'
                >
                  Python
                </TabsTrigger>
                <TabsTrigger
                  value='curl'
                  className='min-w-max whitespace-nowrap'
                >
                  cURL
                </TabsTrigger>
              </TabsList>

              <TabsContent value='javascript'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Code className='w-5 h-5' />
                      JavaScript SDK
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className='text-sm bg-secondary p-4 rounded-lg overflow-x-auto'>
                      <code>{codeExamples.javascript}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='python'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Code className='w-5 h-5' />
                      Python SDK
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className='text-sm bg-secondary p-4 rounded-lg overflow-x-auto'>
                      <code>{codeExamples.python}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='curl'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Code className='w-5 h-5' />
                      REST API (cURL)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className='text-sm bg-secondary p-4 rounded-lg overflow-x-auto'>
                      <code>{codeExamples.curl}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* API Features */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Why Choose Our <span className='text-gradient'>API</span>?
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Built for developers, trusted by enterprises. Everything you
                need for seamless integration.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <Card className='hover:shadow-lg transition-all duration-300 hover:border-primary/30 group'>
                <CardHeader className='text-center'>
                  <div className='w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                    <Zap className='w-6 h-6 text-white' />
                  </div>
                  <CardTitle className='text-lg'>Ultra-Low Latency</CardTitle>
                  <CardDescription className='text-center'>
                    Sub-50ms processing time for real-time applications with
                    global edge network.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className='hover:shadow-lg transition-all duration-300 hover:border-primary/30 group'>
                <CardHeader className='text-center'>
                  <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                    <Shield className='w-6 h-6 text-white' />
                  </div>
                  <CardTitle className='text-lg'>Enterprise Security</CardTitle>
                  <CardDescription className='text-center'>
                    SOC 2 certified with end-to-end encryption and GDPR
                    compliance.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className='hover:shadow-lg transition-all duration-300 hover:border-primary/30 group'>
                <CardHeader className='text-center'>
                  <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                    <Globe className='w-6 h-6 text-white' />
                  </div>
                  <CardTitle className='text-lg'>Global Scale</CardTitle>
                  <CardDescription className='text-center'>
                    40+ edge locations worldwide ensuring minimal latency for
                    your users.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className='hover:shadow-lg transition-all duration-300 hover:border-primary/30 group'>
                <CardHeader className='text-center'>
                  <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                    <Code className='w-6 h-6 text-white' />
                  </div>
                  <CardTitle className='text-lg'>Developer Friendly</CardTitle>
                  <CardDescription className='text-center'>
                    SDKs for JavaScript, Python, PHP, Go and comprehensive
                    documentation.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-24 bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5'>
          <div className='container mx-auto px-4 text-center'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                Ready to Build with{" "}
                <span className='text-gradient'>CharadesAI</span>?
              </h2>
              <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
                Join thousands of developers and businesses creating innovative
                applications. Start with our free tier and scale as you grow.
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

export default API;
