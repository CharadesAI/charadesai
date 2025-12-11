import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Bug, Zap } from "lucide-react";

const changelog = [
  {
    version: "v2.1.0",
    date: "December 10, 2025",
    type: "major",
    title: "Enhanced Gesture Recognition",
    changes: [
      "Added support for multi-hand gesture tracking",
      "Improved accuracy for complex pose estimation",
      "New custom gesture library API",
      "Reduced latency by 15% for real-time applications",
    ],
  },
  {
    version: "v2.0.5",
    date: "November 28, 2025",
    type: "patch",
    title: "Security and Performance Updates",
    changes: [
      "Updated encryption protocols for better security",
      "Fixed memory leak in long-running sessions",
      "Improved error handling for edge cases",
      "Added support for new video formats",
    ],
  },
  {
    version: "v2.0.0",
    date: "November 15, 2025",
    type: "major",
    title: "Multi-Modal Fusion Engine",
    changes: [
      "Introduced audio-visual fusion for superior accuracy",
      "New real-time processing pipeline",
      "Expanded language support to 45+ languages",
      "Enterprise SLA with 99.9% uptime guarantee",
    ],
  },
];

const Changelog = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-20 bg-gradient-hero relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neon-emerald/20 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-cyan/10 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              <Calendar className='w-4 h-4' />
              Changelog
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              What's <span className='text-gradient'>New</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Stay up to date with the latest features, improvements, and bug
              fixes in CharadesAI.
            </p>
          </div>
        </section>

        {/* Changelog Entries */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='space-y-8'>
              {changelog.map((entry, index) => (
                <Card key={index} className='hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Badge
                          variant={
                            entry.type === "major" ? "default" : "secondary"
                          }
                          className='flex items-center gap-1'
                        >
                          {entry.type === "major" ? (
                            <Plus className='w-3 h-3' />
                          ) : (
                            <Bug className='w-3 h-3' />
                          )}
                          {entry.version}
                        </Badge>
                        <span className='text-sm text-muted-foreground'>
                          {entry.date}
                        </span>
                      </div>
                      <Zap className='w-5 h-5 text-primary' />
                    </div>
                    <CardTitle className='text-xl'>{entry.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2'>
                      {entry.changes.map((change, i) => (
                        <li key={i} className='flex items-start gap-2 text-sm'>
                          <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Stay <span className='text-gradient'>Updated</span>
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Get notified about new releases and important updates directly in
              your inbox.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none'
              />
              <button className='px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Changelog;
