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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Copy,
  Play,
  ArrowRight,
  Download,
  BookOpen,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const examples = {
  gettingStarted: {
    javascript: {
      title: "JavaScript/Node.js",
      description: "Real-time lip-reading with Node.js",
      code: `const { CharadesAI } = require('@charadesai/js-sdk');

const client = new CharadesAI({
  apiKey: 'your-api-key'
});

// Process video stream
async function processVideo(videoBuffer) {
  try {
    const result = await client.lipReading.analyze({
      video: videoBuffer,
      language: 'en'
    });

    console.log('Transcription:', result.transcription);
    console.log('Confidence:', result.confidence);
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    },
    python: {
      title: "Python",
      description: "Batch processing with Python SDK",
      code: `from charadesai import CharadesAI

client = CharadesAI(api_key='your-api-key')

# Analyze video file
result = client.lip_reading.analyze(
    video_path='video.mp4',
    language='en',
    real_time=False
)

print(f"Transcription: {result['transcription']}")
print(f"Confidence: {result['confidence']}")

# Gesture recognition
gestures = client.gesture_recognition.detect(
    video_path='video.mp4'
)

for gesture in gestures:
    print(f"Gesture: {gesture['name']}, Confidence: {gesture['confidence']}")`,
    },
    php: {
      title: "PHP",
      description: "Web application integration",
      code: `<?php

require 'vendor/autoload.php';

use CharadesAI\\CharadesAI;

$client = new CharadesAI('your-api-key');

// Upload and analyze video
$result = $client->lipReading()->analyze([
    'video' => fopen('video.mp4', 'r'),
    'language' => 'en'
]);

echo "Transcription: " . $result['transcription'] . "\\n";
echo "Confidence: " . $result['confidence'] . "\\n";

// Handle errors
if (isset($result['error'])) {
    echo "Error: " . $result['error'] . "\\n";
}`,
    },
  },
  advancedUsage: {
    javascript: {
      title: "JavaScript/Node.js",
      description: "Advanced real-time processing with WebRTC",
      code: `const { CharadesAI } = require('@charadesai/js-sdk');

const client = new CharadesAI({
  apiKey: 'your-api-key'
});

// Real-time WebRTC stream processing
async function processWebRTCStream(stream) {
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = async () => {
    const videoBlob = new Blob(chunks, { type: 'video/webm' });
    const result = await client.lipReading.analyze({
      video: videoBlob,
      language: 'en',
      realTime: true,
      callbacks: {
        onPartial: (partial) => console.log('Partial:', partial),
        onComplete: (final) => console.log('Final:', final)
      }
    });
  };

  mediaRecorder.start();
  setTimeout(() => mediaRecorder.stop(), 5000); // Record for 5 seconds
}`,
    },
    python: {
      title: "Python",
      description: "Multi-language support and custom models",
      code: `from charadesai import CharadesAI

client = CharadesAI(api_key='your-api-key')

# Multi-language lip reading
languages = ['en', 'es', 'fr', 'de']
results = {}

for lang in languages:
    result = client.lip_reading.analyze(
        video_path='video.mp4',
        language=lang,
        model='premium'  # Use premium model
    )
    results[lang] = result

# Custom gesture recognition model
gestures = client.gesture_recognition.detect(
    video_path='video.mp4',
    custom_model='sign-language-asl'
)

print("Multi-language results:", results)
print("Custom gestures:", gestures)`,
    },
    csharp: {
      title: "C#/.NET",
      description: "Enterprise integration with .NET Core",
      code: `using CharadesAI;

var client = new CharadesAIClient("your-api-key");

// Async video processing
async Task ProcessVideoAsync(string videoPath)
{
    try
    {
        var result = await client.LipReading.AnalyzeAsync(new AnalyzeRequest
        {
            VideoPath = videoPath,
            Language = "en",
            RealTime = false,
            Options = new AnalysisOptions
            {
                ConfidenceThreshold = 0.8,
                EnableTimestamps = true
            }
        });

        Console.WriteLine($"Transcription: {result.Transcription}");
        Console.WriteLine($"Confidence: {result.Confidence}");

        foreach (var timestamp in result.Timestamps)
        {
            Console.WriteLine($"{timestamp.Start}s - {timestamp.End}s: {timestamp.Text}");
        }
    }
    catch (CharadesAIException ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
}`,
    },
  },
  integration: {
    javascript: {
      title: "JavaScript/React",
      description: "React component integration",
      code: `import { useState, useRef } from 'react';
import { CharadesAI } from '@charadesai/js-sdk';

const VideoAnalyzer = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();

  const client = new CharadesAI({ apiKey: 'your-api-key' });

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const videoFile = videoRef.current.files[0];
      const analysis = await client.lipReading.analyze({
        video: videoFile,
        language: 'en',
        realTime: false
      });
      setResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" ref={videoRef} accept="video/*" />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Video'}
      </button>
      {result && (
        <div>
          <p>Transcription: {result.transcription}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default VideoAnalyzer;`,
    },
    python: {
      title: "Python/Flask",
      description: "REST API integration with Flask",
      code: `from flask import Flask, request, jsonify
from charadesai import CharadesAI
import os

app = Flask(__name__)
client = CharadesAI(api_key=os.getenv('CHARADESAI_API_KEY'))

@app.route('/analyze', methods=['POST'])
def analyze_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    video_file = request.files['video']
    language = request.form.get('language', 'en')

    try:
        result = client.lip_reading.analyze(
            video_file=video_file,
            language=language,
            real_time=False
        )

        return jsonify({
            'transcription': result['transcription'],
            'confidence': result['confidence'],
            'timestamps': result.get('timestamps', [])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)`,
    },
    java: {
      title: "Java/Spring Boot",
      description: "Spring Boot service integration",
      code: `@RestController
@RequestMapping("/api/charadesai")
public class CharadesAIController {

    private final CharadesAIService charadesAIService;

    public CharadesAIController(CharadesAIService charadesAIService) {
        this.charadesAIService = charadesAIService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeVideo(
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam(defaultValue = "en") String language) {

        try {
            AnalysisResult result = charadesAIService.analyzeVideo(videoFile, language);

            AnalysisResponse response = new AnalysisResponse(
                result.getTranscription(),
                result.getConfidence(),
                result.getTimestamps()
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AnalysisResponse("Error: " + e.getMessage(), 0.0, null));
        }
    }
}

// Service class
@Service
public class CharadesAIService {

    private final CharadesAIClient client;

    public CharadesAIService(@Value('{charadesai.api.key}') String apiKey) {
        this.client = new CharadesAIClient(apiKey);
    }

    public AnalysisResult analyzeVideo(MultipartFile videoFile, String language) {
        // Implementation using CharadesAI Java SDK
        return client.lipReading().analyze(videoFile, language);
    }
}`,
    },
  },
};

const CodeExamples = () => {
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              <Code className='w-4 h-4' />
              Code Examples
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Integration <span className='text-gradient'>Examples</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Get started quickly with our comprehensive code examples. From
              basic usage to advanced integrations, find everything you need to
              build with CharadesAI.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button variant='hero' size='lg' onClick={() => navigate("/api")}>
                View API Docs <ArrowRight className='w-4 h-4' />
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                onClick={() => navigate("/contact")}
              >
                Get API Key
              </Button>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Comprehensive <span className='text-gradient'>Examples</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Explore our code examples organized by complexity and use case.
                Each example includes detailed comments and best practices.
              </p>
            </div>
            <Tabs defaultValue='gettingStarted' className='w-full'>
              <TabsList className='grid w-full grid-cols-3 mb-8'>
                <TabsTrigger value='gettingStarted'>
                  Getting Started
                </TabsTrigger>
                <TabsTrigger value='advancedUsage'>Advanced Usage</TabsTrigger>
                <TabsTrigger value='integration'>
                  Integration Examples
                </TabsTrigger>
              </TabsList>

              {/* Getting Started Tab */}
              <TabsContent value='gettingStarted'>
                <div className='mb-8'>
                  <h3 className='text-2xl font-semibold mb-4'>
                    Basic Integration
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    Start with these fundamental examples to understand the core
                    API functionality.
                  </p>
                </div>
                <Tabs defaultValue='javascript' className='w-full'>
                  <TabsList className='grid w-full grid-cols-3 mb-6'>
                    <TabsTrigger value='javascript'>JavaScript</TabsTrigger>
                    <TabsTrigger value='python'>Python</TabsTrigger>
                    <TabsTrigger value='php'>PHP</TabsTrigger>
                  </TabsList>
                  {Object.entries(examples.gettingStarted).map(
                    ([lang, example]) => (
                      <TabsContent key={lang} value={lang}>
                        <Card>
                          <CardHeader>
                            <div className='flex items-center justify-between'>
                              <div>
                                <CardTitle className='text-xl'>
                                  {example.title}
                                </CardTitle>
                                <CardDescription>
                                  {example.description}
                                </CardDescription>
                              </div>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => copyToClipboard(example.code)}
                              >
                                <Copy className='w-4 h-4 mr-1' />
                                Copy
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <pre className='bg-secondary p-4 rounded-lg overflow-x-auto text-sm font-mono'>
                              <code>{example.code}</code>
                            </pre>
                            <div className='mt-4 flex flex-wrap gap-2'>
                              <Badge variant='secondary'>Lip Reading</Badge>
                              <Badge variant='secondary'>API Integration</Badge>
                              <Badge variant='secondary'>
                                Beginner Friendly
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </TabsContent>

              {/* Advanced Usage Tab */}
              <TabsContent value='advancedUsage'>
                <div className='mb-8'>
                  <h3 className='text-2xl font-semibold mb-4'>
                    Advanced Features
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    Leverage advanced features like real-time processing,
                    multi-language support, and custom models.
                  </p>
                </div>
                <Tabs defaultValue='javascript' className='w-full'>
                  <TabsList className='grid w-full grid-cols-3 mb-6'>
                    <TabsTrigger value='javascript'>JavaScript</TabsTrigger>
                    <TabsTrigger value='python'>Python</TabsTrigger>
                    <TabsTrigger value='csharp'>C#</TabsTrigger>
                  </TabsList>
                  {Object.entries(examples.advancedUsage).map(
                    ([lang, example]) => (
                      <TabsContent key={lang} value={lang}>
                        <Card>
                          <CardHeader>
                            <div className='flex items-center justify-between'>
                              <div>
                                <CardTitle className='text-xl'>
                                  {example.title}
                                </CardTitle>
                                <CardDescription>
                                  {example.description}
                                </CardDescription>
                              </div>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => copyToClipboard(example.code)}
                              >
                                <Copy className='w-4 h-4 mr-1' />
                                Copy
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <pre className='bg-secondary p-4 rounded-lg overflow-x-auto text-sm font-mono'>
                              <code>{example.code}</code>
                            </pre>
                            <div className='mt-4 flex flex-wrap gap-2'>
                              <Badge variant='secondary'>Advanced</Badge>
                              <Badge variant='secondary'>Real-time</Badge>
                              <Badge variant='secondary'>Multi-language</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </TabsContent>

              {/* Integration Examples Tab */}
              <TabsContent value='integration'>
                <div className='mb-8'>
                  <h3 className='text-2xl font-semibold mb-4'>
                    Framework Integration
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    See how to integrate CharadesAI into popular frameworks and
                    build complete applications.
                  </p>
                </div>
                <Tabs defaultValue='javascript' className='w-full'>
                  <TabsList className='grid w-full grid-cols-3 mb-6'>
                    <TabsTrigger value='javascript'>React</TabsTrigger>
                    <TabsTrigger value='python'>Flask</TabsTrigger>
                    <TabsTrigger value='java'>Spring Boot</TabsTrigger>
                  </TabsList>
                  {Object.entries(examples.integration).map(
                    ([lang, example]) => (
                      <TabsContent key={lang} value={lang}>
                        <Card>
                          <CardHeader>
                            <div className='flex items-center justify-between'>
                              <div>
                                <CardTitle className='text-xl'>
                                  {example.title}
                                </CardTitle>
                                <CardDescription>
                                  {example.description}
                                </CardDescription>
                              </div>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => copyToClipboard(example.code)}
                              >
                                <Copy className='w-4 h-4 mr-1' />
                                Copy
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <pre className='bg-secondary p-4 rounded-lg overflow-x-auto text-sm font-mono'>
                              <code>{example.code}</code>
                            </pre>
                            <div className='mt-4 flex flex-wrap gap-2'>
                              <Badge variant='secondary'>Framework</Badge>
                              <Badge variant='secondary'>Full Stack</Badge>
                              <Badge variant='secondary'>
                                Production Ready
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* SDK Downloads */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                SDK <span className='text-gradient'>Downloads</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Download our official SDKs for your preferred programming
                language and get started faster.
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='text-center'>
                  <Download className='w-8 h-8 mx-auto mb-2 text-primary' />
                  <CardTitle className='text-lg'>JavaScript SDK</CardTitle>
                  <CardDescription>NPM Package</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                  <Button variant='outline' className='w-full'>
                    npm install @charadesai/js-sdk
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='text-center'>
                  <Download className='w-8 h-8 mx-auto mb-2 text-primary' />
                  <CardTitle className='text-lg'>Python SDK</CardTitle>
                  <CardDescription>PyPI Package</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                  <Button variant='outline' className='w-full'>
                    pip install charadesai
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='text-center'>
                  <Download className='w-8 h-8 mx-auto mb-2 text-primary' />
                  <CardTitle className='text-lg'>PHP SDK</CardTitle>
                  <CardDescription>Composer Package</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                  <Button variant='outline' className='w-full'>
                    composer require charadesai/php-sdk
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader className='text-center'>
                  <Download className='w-8 h-8 mx-auto mb-2 text-primary' />
                  <CardTitle className='text-lg'>C# SDK</CardTitle>
                  <CardDescription>NuGet Package</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                  <Button variant='outline' className='w-full'>
                    Install-Package CharadesAI
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                API <span className='text-gradient'>Reference</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Complete documentation for all API endpoints, parameters, and
                response formats.
              </p>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <BookOpen className='w-6 h-6 text-primary' />
                    <CardTitle className='text-lg'>REST API</CardTitle>
                  </div>
                  <CardDescription>
                    HTTP endpoints for direct API integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant='link'
                    className='p-0 h-auto'
                    onClick={() => navigate("/api")}
                  >
                    View REST API Docs <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <Zap className='w-6 h-6 text-primary' />
                    <CardTitle className='text-lg'>WebSocket API</CardTitle>
                  </div>
                  <CardDescription>
                    Real-time streaming for live video processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant='link'
                    className='p-0 h-auto'
                    onClick={() => navigate("/api")}
                  >
                    View WebSocket Docs <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <Code className='w-6 h-6 text-primary' />
                    <CardTitle className='text-lg'>SDK Reference</CardTitle>
                  </div>
                  <CardDescription>
                    Detailed SDK method documentation and examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant='link'
                    className='p-0 h-auto'
                    onClick={() => navigate("/api")}
                  >
                    View SDK Reference <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* More Examples */}
        <section className='py-24 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                More <span className='text-gradient'>Examples</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Explore additional integration patterns and specialized use
                cases.
              </p>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='text-lg'>WebRTC Integration</CardTitle>
                  <CardDescription>
                    Real-time video processing in browser applications with
                    WebRTC streams.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant='link' className='p-0 h-auto'>
                    View WebRTC Example <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='text-lg'>Mobile App SDK</CardTitle>
                  <CardDescription>
                    Native iOS and Android integration examples with camera
                    access.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant='link' className='p-0 h-auto'>
                    View Mobile Examples <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardContent>
              </Card>
              <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='text-lg'>Batch Processing</CardTitle>
                  <CardDescription>
                    Process multiple videos efficiently with queue management.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant='link' className='p-0 h-auto'>
                    View Batch Processing{" "}
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='py-24'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to <span className='text-gradient'>Build</span>?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Join thousands of developers building amazing applications with
              CharadesAI. Get your API key and start integrating today.
            </p>
            <div className='flex justify-center gap-4'>
              <Button
                variant='hero'
                size='lg'
                onClick={() => navigate("/pricing")}
              >
                Get Started Free
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                onClick={() => navigate("/community")}
              >
                Join Developer Community
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

export default CodeExamples;
