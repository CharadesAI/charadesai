import { useState, useEffect } from "react";
import { Cookie, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 animate-slide-up">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto p-6 rounded-2xl glass-strong border border-border shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold mb-2">We value your privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>

              {showPreferences && (
                <div className="mb-4 p-4 rounded-lg bg-secondary/50 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked disabled className="w-4 h-4 rounded" />
                    <span className="text-sm font-medium">Necessary Cookies</span>
                    <span className="text-xs text-muted-foreground">(Always active)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-sm font-medium">Analytics Cookies</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-sm font-medium">Marketing Cookies</span>
                  </label>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleAcceptAll} variant="hero" size="sm">
                  Accept All
                </Button>
                <Button onClick={handleAcceptNecessary} variant="outline" size="sm">
                  Necessary Only
                </Button>
                <Button 
                  onClick={() => setShowPreferences(!showPreferences)} 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Preferences
                </Button>
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
