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
import { blogContent } from "@/lib/blog-content";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogContent[slug as keyof typeof blogContent];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, "_blank", "noopener,noreferrer");
    } else if (platform === "linkedin") {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
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

      {/* Sticky Back Button */}
      <div className='sticky top-20 z-40 mb-4'>
        <div className='container mx-auto px-4'>
          <Link
            to='/blog'
            className='inline-flex items-center gap-2 text-card-foreground/80 hover:text-card-foreground transition-colors bg-card/80 backdrop-blur-md border border-border rounded-full px-4 py-2 hover:bg-card/60'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Blog
          </Link>
        </div>
      </div>

      <main>
        {/* Header with Full-Width Background */}
        <section className='relative py-32 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=1920&h=1080&fit=crop&crop=center'
              alt='Blog post header background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-3xl mx-auto'>
              <span className='inline-block px-4 py-2 rounded-full bg-card/80 border border-border backdrop-blur-sm text-card-foreground text-sm font-medium mb-6'>
                {post.category}
              </span>

              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-card-foreground'>
                {post.title}
              </h1>

              <p className='text-lg text-muted-foreground mb-8'>
                {post.excerpt}
              </p>

              <div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground font-bold'>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className='font-medium text-card-foreground'>
                      {post.author}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {post.authorRole}
                    </div>
                  </div>
                </div>
                <span className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  {post.date}
                </span>
                <span className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content - Redesigned */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto'>
              {/* Share Buttons - Redesigned */}
              <div className='flex items-center gap-4 mb-12 pb-8 border-b border-border'>
                <span className='text-sm text-muted-foreground flex items-center gap-2'>
                  <Share2 className='w-4 h-4' />
                  Share:
                </span>
                <button
                  onClick={() => handleShare("twitter")}
                  className='p-3 rounded-lg bg-card/80 backdrop-blur-md border border-border hover:bg-card/60 transition-all duration-300 hover:scale-110'
                >
                  <Twitter className='w-4 h-4 text-card-foreground' />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className='p-3 rounded-lg bg-card/80 backdrop-blur-md border border-border hover:bg-card/60 transition-all duration-300 hover:scale-110'
                >
                  <Linkedin className='w-4 h-4 text-card-foreground' />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className='p-3 rounded-lg bg-card/80 backdrop-blur-md border border-border hover:bg-card/60 transition-all duration-300 hover:scale-110'
                >
                  <Copy className='w-4 h-4 text-card-foreground' />
                </button>
              </div>

              {/* Article Content - Enhanced */}
              <article className='prose prose-lg dark:prose-invert max-w-none'>
                <div
                  className='space-y-6 text-card-foreground'
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(
                        /^## (.*$)/gim,
                        '<h2 class="text-2xl font-bold mt-12 mb-4 text-card-foreground">$1</h2>'
                      )
                      .replace(
                        /^### (.*$)/gim,
                        '<h3 class="text-xl font-semibold mt-8 mb-3 text-card-foreground">$1</h3>'
                      )
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-semibold text-card-foreground">$1</strong>'
                      )
                      .replace(
                        /```([\s\S]*?)```/g,
                        '<pre class="bg-card/80 backdrop-blur-md border border-border rounded-lg p-4 overflow-x-auto"><code class="text-sm font-mono text-card-foreground">$1</code></pre>'
                      )
                      .replace(
                        /`(.*?)`/g,
                        '<code class="bg-card/80 px-1.5 py-0.5 rounded text-sm font-mono text-card-foreground">$1</code>'
                      )
                      .replace(
                        /^\d\. \*\*(.*?)\*\*: (.*$)/gim,
                        '<div class="pl-4 border-l-2 border-neon-cyan my-4"><strong class="text-card-foreground">$1</strong>: <span class="text-muted-foreground">$2</span></div>'
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

              {/* Author Bio - Redesigned */}
              <div className='mt-16 p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border'>
                <div className='flex items-start gap-6'>
                  <div className='w-20 h-20 rounded-full bg-gradient-ai flex items-center justify-center text-primary-foreground text-2xl font-bold'>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className='font-bold text-xl text-card-foreground mb-1'>
                      {post.author}
                    </div>
                    <div className='text-sm text-primary mb-4'>
                      {post.authorRole}
                    </div>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
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

        {/* Related Posts CTA - Redesigned */}
        <section className='relative py-24 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center'
              alt='Continue reading background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6 text-card-foreground'>
              Continue Reading
            </h2>
            <p className='text-muted-foreground mb-8'>
              Explore more articles from our team.
            </p>
            <Button
              variant='hero'
              size='lg'
              className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/60'
            >
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
