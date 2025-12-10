import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LiveDemoSection } from "@/components/LiveDemoSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { APISection } from "@/components/APISection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { PricingSection } from "@/components/PricingSection";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { CookieConsent } from "@/components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LiveDemoSection />
        <UseCasesSection />
        <FeaturesSection />
        <APISection />
        <WhyChooseUsSection />
        <TrustSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
      <AIChatWidget />
      <CookieConsent />
    </div>
  );
};

export default Index;
