import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

const blogContent = {
  "introducing-vision-ai-2": {
    title: "Introducing CharadesAI 2.0: 40% Faster Inference",
    excerpt:
      "We're excited to announce CharadesAI 2.0, featuring our new optimized models that deliver 40% faster inference times while maintaining industry-leading accuracy.",
    author: "Dr. Sarah Chen",
    authorRole: "CEO & Co-Founder",
    date: "Dec 5, 2024",
    readTime: "5 min read",
    category: "Product",
    content: `
## A New Era of Performance

Today, we're thrilled to announce CharadesAI 2.0—the biggest update to our platform since launch. This release represents months of research and engineering to deliver what our customers have been asking for: faster inference without compromising accuracy.

### What's New in 2.0

**40% Faster Inference**: Our new optimized models process video frames in under 30ms on average, down from 50ms. This improvement comes from architectural innovations in our neural networks and better hardware utilization.

**Improved Multi-Language Support**: We've expanded from 25 to 40+ supported languages, with particularly strong improvements in Asian languages including Japanese, Korean, and Mandarin.

**Enhanced Gesture Recognition**: Our gesture detection now supports 50+ common gestures out of the box, with the ability to train custom gestures using your own data.

### Technical Deep Dive

The performance improvements come from three key innovations:

1. **Model Pruning**: We removed redundant parameters without affecting accuracy, reducing model size by 35%.

2. **Quantization**: Strategic use of INT8 operations for non-critical computations speeds up inference on modern hardware.

3. **Batching Optimization**: Improved batching strategies for real-time video processing.

### Migration Guide

Upgrading to CharadesAI 2.0 is seamless for existing customers. Simply update your SDK to the latest version:

\`\`\`bash
npm update @CharadesAI/sdk
\`\`\`

All API endpoints remain backward compatible. New features are opt-in and can be enabled via configuration.

### What's Next

This is just the beginning. In Q1 2025, we're planning to release:

- On-device models for mobile deployment
- Real-time translation overlay
- Multi-person tracking improvements

Stay tuned for more updates, and thank you for being part of the CharadesAI community!
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogContent[slug as keyof typeof blogContent];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!post) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar />
        <main className='pt-32 pb-24'>
          <div className='container mx-auto px-4 text-center'>
            <h1 className='text-4xl font-bold mb-4'>Post Not Found</h1>
            <p className='text-muted-foreground mb-8'>
              The blog post you're looking for doesn't exist.
            </p>
            <Button variant='hero' asChild>
              <Link to='/blog'>
                <ArrowLeft className='w-4 h-4' />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Header */}
        <section className='pt-32 pb-16 bg-gradient-hero'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto'>
              <Link
                to='/blog'
                className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                Back to Blog
              </Link>

              <span className='inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
                {post.category}
              </span>

              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
                {post.title}
              </h1>

              <p className='text-lg text-muted-foreground mb-8'>
                {post.excerpt}
              </p>

              <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-10 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground font-bold'>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className='font-medium text-foreground'>
                      {post.author}
                    </div>
                    <div className='text-xs'>{post.authorRole}</div>
                  </div>
                </div>
                <span className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  {post.date}
                </span>
                <span className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto'>
              {/* Share Buttons */}
              <div className='flex items-center gap-4 mb-12 pb-8 border-b border-border'>
                <span className='text-sm text-muted-foreground flex items-center gap-2'>
                  <Share2 className='w-4 h-4' />
                  Share:
                </span>
                <button
                  onClick={() => handleShare("twitter")}
                  className='p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors'
                >
                  <Twitter className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className='p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors'
                >
                  <Linkedin className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className='p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors'
                >
                  <Copy className='w-4 h-4' />
                </button>
              </div>

              {/* Article Content */}
              <article className='prose prose-lg dark:prose-invert max-w-none'>
                <div
                  className='space-y-6 text-foreground'
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(
                        /^## (.*$)/gim,
                        '<h2 class="text-2xl font-bold mt-12 mb-4">$1</h2>'
                      )
                      .replace(
                        /^### (.*$)/gim,
                        '<h3 class="text-xl font-semibold mt-8 mb-3">$1</h3>'
                      )
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-semibold">$1</strong>'
                      )
                      .replace(
                        /```([\s\S]*?)```/g,
                        '<pre class="bg-card border border-border rounded-lg p-4 overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>'
                      )
                      .replace(
                        /`(.*?)`/g,
                        '<code class="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
                      )
                      .replace(
                        /^\d\. \*\*(.*?)\*\*: (.*$)/gim,
                        '<div class="pl-4 border-l-2 border-primary my-4"><strong class="text-foreground">$1</strong>: <span class="text-muted-foreground">$2</span></div>'
                      )
                      .replace(
                        /^- (.*$)/gim,
                        '<li class="ml-4 text-muted-foreground">$1</li>'
                      )
                      .replace(
                        /\n\n/g,
                        '</p><p class="text-muted-foreground leading-relaxed">'
                      ),
                  }}
                />
              </article>

              {/* Author Bio */}
              <div className='mt-16 p-6 rounded-2xl bg-card border border-border'>
                <div className='flex items-start gap-4'>
                  <div className='w-16 h-16 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground text-xl font-bold'>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className='font-bold text-lg'>{post.author}</div>
                    <div className='text-sm text-primary mb-2'>
                      {post.authorRole}
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Former Google AI researcher with 15+ years in computer
                      vision. Passionate about making technology accessible to
                      everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts CTA */}
        <section className='py-16 bg-secondary/30'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-2xl font-bold mb-4'>Continue Reading</h2>
            <p className='text-muted-foreground mb-8'>
              Explore more articles from our team.
            </p>
            <Button variant='hero' asChild>
              <Link to='/blog'>View All Articles</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default BlogPost;
