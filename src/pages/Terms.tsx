import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, Mail } from "lucide-react";

const Terms = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-20 bg-gradient-hero relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neon-violet/20 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-pink/10 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              <FileText className='w-4 h-4' />
              Terms of Service
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Terms of <span className='text-gradient'>Service</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Please read these terms carefully before using CharadesAI
              services.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className='py-24'>
          <div className='container mx-auto px-4 max-w-4xl'>
            <div className='prose prose-lg dark:prose-invert mx-auto'>
              <p className='text-muted-foreground mb-8'>
                <strong>Last updated:</strong> December 10, 2025
              </p>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Scale className='w-5 h-5' />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    By accessing and using CharadesAI services, you accept and
                    agree to be bound by the terms and provision of this
                    agreement. If you do not agree to abide by the above, please
                    do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>Description of Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    CharadesAI provides AI-powered lip-reading and gesture
                    recognition APIs for developers and businesses. Our services
                    include:
                  </p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Real-time lip-reading transcription</li>
                    <li>Gesture recognition and classification</li>
                    <li>Multi-modal AI processing</li>
                    <li>Developer SDKs and documentation</li>
                    <li>API access and management dashboard</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>User Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You agree to:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>
                      Provide accurate and complete information when creating an
                      account
                    </li>
                    <li>Maintain the security of your account credentials</li>
                    <li>
                      Use the service in compliance with applicable laws and
                      regulations
                    </li>
                    <li>
                      Not attempt to reverse engineer or compromise our systems
                    </li>
                    <li>
                      Respect the intellectual property rights of CharadesAI and
                      third parties
                    </li>
                    <li>
                      Not use the service for any illegal or harmful purposes
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <AlertTriangle className='w-5 h-5' />
                    Prohibited Uses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You may not use our service to:</p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>
                      Transmit harmful, offensive, or inappropriate content
                    </li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our service</li>
                    <li>Use for surveillance without proper consent</li>
                    <li>Create deepfakes or misleading content</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>Payment and Billing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Payment terms for our services are outlined in your account
                    dashboard and billing agreements. You agree to:
                  </p>
                  <ul className='list-disc pl-6 mt-4 space-y-2'>
                    <li>Pay all fees associated with your account</li>
                    <li>Provide valid payment information</li>
                    <li>Update payment information as needed</li>
                    <li>Contact us immediately regarding billing disputes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>Data Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Your privacy is important to us. Please review our Privacy
                    Policy, which also governs your use of CharadesAI services,
                    to understand our practices.
                  </p>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We may terminate or suspend your account and access to our
                    services immediately, without prior notice or liability, for
                    any reason, including breach of these Terms.
                  </p>
                </CardContent>
              </Card>

              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle>Disclaimer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our services are provided "as is" without warranties of any
                    kind. We do not guarantee that our service will be
                    uninterrupted or error-free. AI predictions may not always
                    be accurate.
                  </p>
                </CardContent>
              </Card>

              <h3 className='text-2xl font-bold mb-4'>Contact Information</h3>
              <p>
                If you have any questions about these Terms of Service, please
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

export default Terms;
