import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const codeExamples = {
  javascript: `import CharadesAI from '@CharadesAI/sdk';

const client = new CharadesAI({
  apiKey: process.env.CharadesAI_API_KEY
});

// Analyze video stream for lip-reading
const result = await client.lipReading.analyze({
  videoUrl: 'https://example.com/video.mp4',
  language: 'en',
  realTime: true
});

console.log(result.transcript);
// Output: "Hello, how are you today?"`,
  python: `import CharadesAI

client = CharadesAI.Client(
    api_key=os.environ["CharadesAI_API_KEY"]
)

# Analyze video stream for lip-reading
result = client.lip_reading.analyze(
    video_url="https://example.com/video.mp4",
    language="en",
    real_time=True
)

print(result.transcript)
# Output: "Hello, how are you today?"`,
  php: `<?php
use CharadesAI\\Client;

$client = new Client([
    'api_key' => getenv('CharadesAI_API_KEY')
]);

// Analyze video stream for lip-reading
$result = $client->lipReading->analyze([
    'video_url' => 'https://example.com/video.mp4',
    'language' => 'en',
    'real_time' => true
]);

echo $result->transcript;
// Output: "Hello, how are you today?"`,
};

type Language = keyof typeof codeExamples;

export function APISection() {
  const [activeTab, setActiveTab] = useState<Language>("javascript");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id='api'
      className='py-16 md:py-24 bg-background overflow-x-hidden'
    >
      <div className='container mx-auto px-4'>
        <div className='max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div>
            <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              Developer API
            </span>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Simple, Powerful <span className='text-gradient'>API</span>
            </h2>
            <p className='text-muted-foreground mb-6'>
              Get started in minutes with our intuitive SDKs. Full
              documentation, code examples, and dedicated developer support.
            </p>

            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 rounded-full bg-neon-emerald/20 flex items-center justify-center mt-0.5'>
                  <Check className='w-3.5 h-3.5 text-neon-emerald' />
                </div>
                <div>
                  <h4 className='font-medium'>
                    RESTful API & WebSocket Support
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Real-time streaming with WebSocket or batch processing via
                    REST.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 rounded-full bg-neon-emerald/20 flex items-center justify-center mt-0.5'>
                  <Check className='w-3.5 h-3.5 text-neon-emerald' />
                </div>
                <div>
                  <h4 className='font-medium'>Comprehensive Error Handling</h4>
                  <p className='text-sm text-muted-foreground'>
                    Detailed error codes and messages for easy debugging.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 rounded-full bg-neon-emerald/20 flex items-center justify-center mt-0.5'>
                  <Check className='w-3.5 h-3.5 text-neon-emerald' />
                </div>
                <div>
                  <h4 className='font-medium'>99.9% Uptime SLA</h4>
                  <p className='text-sm text-muted-foreground'>
                    Enterprise-grade reliability with automatic failover.
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <Button
                variant='hero'
                size='lg'
                onClick={() => (window.location.href = "/docs")}
              >
                View Full Documentation
              </Button>
            </div>
          </div>

          {/* Right - Code Preview */}
          <div className='relative'>
            <div className='rounded-2xl overflow-hidden bg-card border border-border shadow-2xl'>
              {/* Code Header */}
              <div className='flex items-center justify-between p-4 border-b border-border bg-secondary/50'>
                <div className='flex gap-2'>
                  {(Object.keys(codeExamples) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                        activeTab === lang
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleCopy}
                  className='text-muted-foreground'
                >
                  {copied ? (
                    <Check className='w-4 h-4 text-neon-emerald' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                </Button>
              </div>

              {/* Code Content */}
              <pre className='p-6 overflow-x-auto w-full max-w-full whitespace-pre-wrap md:whitespace-pre'>
                <code className='block text-sm font-mono text-foreground/90 leading-relaxed'>
                  {codeExamples[activeTab]}
                </code>
              </pre>
            </div>

            {/* Decorative Glow */}
            <div className='hidden md:block absolute -inset-4 bg-gradient-to-r from-neon-blue/20 via-neon-violet/20 to-neon-cyan/20 rounded-3xl blur-3xl -z-10 opacity-50' />
          </div>
        </div>
      </div>
    </section>
  );
}
