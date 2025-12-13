import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Mail } from "lucide-react";

const Privacy = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-20 bg-gradient-hero relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neon-blue/20 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-violet/10 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              <Shield className='w-4 h-4' />
              Privacy Policy
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Your Privacy <span className='text-gradient'>Matters</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              We are committed to protecting your privacy and being transparent
              about how we handle your data.
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className='py-24'>
          <div className='container mx-auto px-4 max-w-4xl'>
            <div className='prose prose-lg dark:prose-invert mx-auto'>
              <p className='text-muted-foreground mb-8'>
                <strong>Last updated:</strong> December 10, 2025
              </p>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Eye className='w-5 h-5' />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We collect information you provide directly to us, such as
                    when you:
                  </p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Create an account or use our services</li>
                    <li>Contact our customer support</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  <p className='mt-4'>
                    We also automatically collect certain information when you
                    use our services, including:
                  </p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Usage data and analytics</li>
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Lock className='w-5 h-5' />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We use the information we collect to:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>
                      Communicate with you about products, services, and
                      promotions
                    </li>
                    <li>Monitor and analyze usage patterns and trends</li>
                    <li>Detect, prevent, and address technical issues</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Shield className='w-5 h-5' />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction. These measures include:
                  </p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and employee training</li>
                    <li>Incident response procedures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Mail className='w-5 h-5' />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You have the right to:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Access the personal information we hold about you</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Delete your personal information</li>
                    <li>
                      Object to or restrict processing of your information
                    </li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className='mt-4'>
                    To exercise these rights, please contact us at
                    hello@charadesai.com.
                  </p>
                </CardContent>
              </Card>

              <h3 className='text-2xl font-bold mb-4'>Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className='bg-secondary/30 p-4 rounded-lg mt-4'>
                <p>
                  <strong>Email:</strong> hello@charadesai.com
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

export default Privacy;
