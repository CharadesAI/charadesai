import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Decorative accent circles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-1/4 w-72 h-72 rounded-full bg-neon-cyan/6 blur-3xl" />
        <div className="absolute right-10 bottom-1/3 w-64 h-64 rounded-full bg-neon-violet/6 blur-3xl" />
      </div>

      <div className="glass max-w-2xl w-full p-10 rounded-3xl shadow-lg mx-4">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-block text-7xl md:text-8xl lg:text-9xl font-extrabold text-gradient drop-shadow-lg">404</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild aria-label="Back to Home">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" onClick={() => window.history.back()} aria-label="Go Back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
