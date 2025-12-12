import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Settings, Shield, Mail } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-20 bg-gradient-hero relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neon-cyan/20 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-emerald/10 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              <Cookie className='w-4 h-4' />
              Cookie Policy
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Cookie <span className='text-gradient'>Policy</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Learn how we use cookies and similar technologies to improve your
              experience.
            </p>
          </div>
        </section>

        {/* Cookie Content */}
        <section className='py-24'>
          <div className='container mx-auto px-4 max-w-4xl'>
            <div className='prose prose-lg dark:prose-invert mx-auto'>
              <p className='text-muted-foreground mb-8'>
                <strong>Last updated:</strong> December 10, 2025
              </p>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Cookie className='w-5 h-5' />
                    What Are Cookies?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Cookies are small text files that are stored on your
                    computer or mobile device when you visit our website. They
                    help us provide you with a better browsing experience by
                    remembering your preferences and understanding how you use
                    our site.
                  </p>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>How We Use Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We use cookies for the following purposes:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>
                      <strong>Essential Cookies:</strong> Required for the
                      website to function properly
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand how
                      visitors use our site
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> Remember your
                      preferences and settings
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Settings className='w-5 h-5' />
                    Managing Your Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You can control and manage cookies in various ways:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>
                      Most web browsers allow you to control cookies through
                      their settings
                    </li>
                    <li>
                      You can delete all cookies that are already on your
                      computer
                    </li>
                    <li>
                      You can set most browsers to prevent cookies from being
                      placed
                    </li>
                    <li>
                      Note that disabling cookies may affect the functionality
                      of our website
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Shield className='w-5 h-5' />
                    Third-Party Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Some cookies on our site are set by third-party services
                    that appear on our pages. We have no control over these
                    cookies, and they are subject to the respective third
                    party's privacy policy.
                  </p>
                  <p className='mt-4'>Third parties we work with include:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Analytics providers (Google Analytics)</li>
                    <li>Customer support platforms</li>
                    <li>Social media platforms</li>
                    <li>Payment processors</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We may update this Cookie Policy from time to time to
                    reflect changes in our practices or for other operational,
                    legal, or regulatory reasons. We will notify you of any
                    material changes by posting the updated policy on our
                    website.
                  </p>
                </CardContent>
              </Card>

              <h3 className='text-2xl font-bold mb-4'>Contact Us</h3>
              <p>
                If you have any questions about our use of cookies, please
                contact us at:
              </p>
              <div className='bg-secondary/30 p-4 rounded-lg mt-4'>
                <p>
                  <strong>Email:</strong> privacy@charadesai.com
                </p>
                <p>
                  <strong>Address:</strong> 123 AI Street, Tech City, TC 12345
                </p>
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

export default CookiePolicy;
