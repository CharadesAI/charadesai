import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: "1",
    slug: "introducing-vision-ai-2",
    title: "Introducing CharadesAI 2.0: 40% Faster Inference",
    excerpt:
      "We're excited to announce CharadesAI 2.0, featuring our new optimized models that deliver 40% faster inference times while maintaining industry-leading accuracy.",
    author: "Dr. Sarah Chen",
    date: "Dec 5, 2024",
    readTime: "5 min read",
    category: "Product",
    featured: true,
  },
  {
    id: "2",
    slug: "lip-reading-accuracy-benchmark",
    title: "How We Achieved 99.7% Lip-Reading Accuracy",
    excerpt:
      "A deep dive into the research and engineering behind our state-of-the-art lip-reading models. Learn about our training methodology and benchmark results.",
    author: "Dr. James Liu",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    category: "Research",
    featured: true,
  },
  {
    id: "3",
    slug: "building-accessible-apps",
    title: "Building Accessible Apps with CharadesAI",
    excerpt:
      "A comprehensive guide to using CharadesAI APIs to build applications that are accessible to deaf and hard-of-hearing users.",
    author: "Aisha Patel",
    date: "Nov 20, 2024",
    readTime: "8 min read",
    category: "Tutorial",
    featured: false,
  },
  {
    id: "4",
    slug: "gesture-recognition-iot",
    title: "Gesture Recognition for IoT Devices",
    excerpt:
      "How to integrate CharadesAI gesture recognition into smart home devices, kiosks, and interactive displays.",
    author: "Emily Rodriguez",
    date: "Nov 15, 2024",
    readTime: "7 min read",
    category: "Tutorial",
    featured: false,
  },
  {
    id: "5",
    slug: "edge-ai-deployment",
    title: "Deploying CharadesAI Models on Edge Devices",
    excerpt:
      "Learn how to optimize and deploy our lip-reading models on mobile devices, Raspberry Pi, and other edge hardware.",
    author: "Marcus Johnson",
    date: "Nov 8, 2024",
    readTime: "10 min read",
    category: "Engineering",
    featured: false,
  },
  {
    id: "6",
    slug: "multi-language-support",
    title: "Expanding Multi-Language Support to 40+ Languages",
    excerpt:
      "Announcing support for 15 new languages including Japanese, Korean, Arabic, and Hindi. Learn about our internationalization journey.",
    author: "Dr. Sarah Chen",
    date: "Nov 1, 2024",
    readTime: "6 min read",
    category: "Product",
    featured: false,
  },
];

const categories = ["All", "Product", "Research", "Tutorial", "Engineering"];

const Blog = () => {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='pt-32 pb-20 bg-gradient-hero'>
          <div className='container mx-auto px-4 text-center'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              Blog
            </span>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Insights & <span className='text-gradient'>Updates</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              The latest news, tutorials, and research from the CharadesAI team.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className='py-8 bg-card border-b border-border sticky top-16 z-30'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-wrap gap-2 justify-center'>
              {categories.map((category) => (
                <button
                  key={category}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    category === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-2xl font-bold mb-8'>Featured Articles</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className='group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg'
                >
                  <div className='flex items-center gap-2 mb-4'>
                    <span className='px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium'>
                      {post.category}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      Featured
                    </span>
                  </div>
                  <h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors'>
                    {post.title}
                  </h3>
                  <p className='text-muted-foreground mb-4 line-clamp-2'>
                    {post.excerpt}
                  </p>
                  <div className='flex items-center justify-between text-sm text-muted-foreground'>
                    <div className='flex items-center gap-4'>
                      <span className='flex items-center gap-1'>
                        <User className='w-4 h-4' />
                        {post.author}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {post.date}
                      </span>
                    </div>
                    <span className='flex items-center gap-1'>
                      <Clock className='w-4 h-4' />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className='py-16 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <h2 className='text-2xl font-bold mb-8'>All Articles</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className='group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg'
                >
                  <span className='inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4'>
                    {post.category}
                  </span>
                  <h3 className='text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                    {post.title}
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
                    {post.excerpt}
                  </p>
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className='text-center mt-12'>
              <Button variant='outline' size='lg'>
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className='py-24 bg-gradient-hero'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Stay Updated
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Subscribe to our newsletter for the latest updates, tutorials, and
              AI research.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none'
              />
              <Button variant='hero' size='lg'>
                Subscribe
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

export default Blog;
