import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/blog-data";
import { useState } from "react";

const categories = ["All", "Product", "Research", "Tutorial", "Engineering"];
const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const allFilteredPosts =
    selectedCategory === "All"
      ? blogPosts.filter((post) => !post.featured)
      : blogPosts.filter(
          (post) => !post.featured && post.category === selectedCategory
        );

  const filteredPosts = allFilteredPosts.slice(0, visiblePostsCount);
  const hasMorePosts = allFilteredPosts.length > visiblePostsCount;

  const loadMorePosts = () => {
    setVisiblePostsCount((prev) => prev + POSTS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisiblePostsCount(POSTS_PER_PAGE); // Reset pagination when category changes
  };

  const handleNewsletterSubscribe = async () => {
    if (!email.trim()) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.charadesai.com/mail/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(data.message);
        setEmail("");
      } else {
        alert(data.message || "Failed to subscribe to newsletter");
      }
    } catch (error) {
      alert("An error occurred while subscribing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero with Full-Width Background */}
        <section className='relative py-32 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=1920&h=1080&fit=crop&crop=center'
              alt='Blog and insights background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-card/80 border border-border backdrop-blur-sm text-card-foreground text-sm font-medium mb-6'>
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

        {/* Categories - Redesigned */}
        <section className='py-8 sticky top-16 z-30'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-wrap gap-2 justify-center'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md cursor-pointer",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card/80 text-card-foreground border border-border hover:bg-card/90 hover:border-primary/30 hover:scale-105"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts - Redesigned */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-12 text-center'>
              Featured Articles
            </h2>
            <div className='grid md:grid-cols-2 gap-8'>
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className='group p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl'
                >
                  <div className='flex items-center gap-3 mb-6'>
                    <span className='px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan text-sm font-medium'>
                      {post.category}
                    </span>
                    <span className='px-3 py-1 rounded-full bg-card/80 text-card-foreground text-xs font-medium'>
                      Featured
                    </span>
                  </div>
                  <h3 className='text-2xl font-bold mb-4 group-hover:text-neon-cyan transition-colors'>
                    {post.title}
                  </h3>
                  <p className='text-muted-foreground mb-6 line-clamp-2 leading-relaxed'>
                    {post.excerpt}
                  </p>
                  <div className='flex items-center justify-between text-sm text-muted-foreground'>
                    <div className='flex items-center gap-6'>
                      <span className='flex items-center gap-2'>
                        <User className='w-4 h-4' />
                        {post.author}
                      </span>
                      <span className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4' />
                        {post.date}
                      </span>
                    </div>
                    <span className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts - Redesigned */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-12 text-center'>
              {selectedCategory === "All"
                ? "All Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className='group p-6 rounded-3xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl'
                >
                  <span className='inline-block px-4 py-2 rounded-full bg-card/80 border border-border text-card-foreground text-sm font-medium mb-6'>
                    {post.category}
                  </span>
                  <h3 className='text-xl font-bold mb-4 group-hover:text-neon-cyan transition-colors line-clamp-2'>
                    {post.title}
                  </h3>
                  <p className='text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed'>
                    {post.excerpt}
                  </p>
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span className='flex items-center gap-2'>
                      <User className='w-4 h-4' />
                      {post.author}
                    </span>
                    <span className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className='text-center py-16'>
                <p className='text-muted-foreground text-lg'>
                  No articles found in this category.
                </p>
                <Button
                  variant='outline'
                  className='mt-4 bg-card/80 backdrop-blur-md border-border text-card-foreground hover:bg-card/90'
                  onClick={() => handleCategoryChange("All")}
                >
                  View All Articles
                </Button>
              </div>
            )}

            {hasMorePosts && (
              <div className='text-center mt-16'>
                <Button
                  variant='outline'
                  size='lg'
                  className='bg-card/80 backdrop-blur-md border-border text-card-foreground hover:bg-card/90 hover:border-primary/30'
                  onClick={loadMorePosts}
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA - Redesigned */}
        <section className='relative py-24 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&crop=center'
              alt='Stay updated with CharadesAI newsletter'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='flex-1 px-4 py-3 rounded-lg bg-card/80 backdrop-blur-md border border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan focus:outline-none'
                disabled={isLoading}
              />
              <Button
                variant='hero'
                size='lg'
                className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/90 text-card-foreground hover:text-card-foreground'
                onClick={handleNewsletterSubscribe}
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
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
