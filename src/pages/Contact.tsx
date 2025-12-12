import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  FileText,
  Headphones,
  ArrowRight,
  Check,
  Map,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect } from "react";
import { getApiBase } from "@/lib/api";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z
    .string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

const contactOptions = [
  {
    icon: MessageSquare,
    title: "Sales Inquiry",
    description: "Talk to our sales team about enterprise solutions.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Get help with API integration and troubleshooting.",
  },
  {
    icon: FileText,
    title: "Partnerships",
    description: "Explore partnership and integration opportunities.",
  },
];

const office = {
  city: "San Francisco",
  address: "100 Market Street, Suite 300",
  country: "United States",
};

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mapData, setMapData] = useState<{
    embed_url?: string;
    maps_link?: string;
    iframe?: string;
    address?: string;
    zoom?: number;
  } | null>(null);
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      const payload = {
        address: "100 Market Street, Suite 300, San Francisco, CA 94105",
      };

      const base = getApiBase();
      const response = await fetch(`${base}/maps/pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const res = await response.json().catch(() => null);
      if (!response.ok) {
        const msg =
          (res && (res as unknown as { message?: string }).message) ||
          "Failed to generate map";
        toast.error(msg);
        setMapData(null);
        return;
      }

      // API returns { status: 'success', data: { embed_url, maps_link, iframe, address, zoom } }
      type MapResp = {
        embed_url?: string;
        maps_link?: string;
        iframe?: string;
        address?: string;
        zoom?: number;
      };
      const mapObj = (res as unknown as { data?: MapResp }).data ?? null;
      if (mapObj && typeof mapObj === "object") {
        setMapData(mapObj);
      } else {
        console.error("Unexpected map response", mapObj);
        setMapData(null);
      }
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setMapLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      try {
        const payload = {
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          subject: formData.subject,
          message: formData.message,
        };

        const base = getApiBase();
        const response = await fetch(`${base}/mail/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const res = await response.json().catch(() => null);
        const status = (res as unknown as { status?: string }).status;
        const message = (res as unknown as { message?: string }).message;
        if (!response.ok) {
          toast.error(message || "Failed to send message. Please try again.");
          return;
        }
        if (status === "success") {
          setIsSubmitted(true);
          toast.success(
            "Message sent successfully! We'll get back to you soon."
          );
          setFormData({
            name: "",
            email: "",
            company: "",
            subject: "",
            message: "",
          });
        } else {
          toast.error(message || "Failed to send message. Please try again.");
        }
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : String(err ?? "Failed to send message. Please try again.");
        toast.error(msg);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero with Full-Width Background */}
        <section className='relative py-48 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-20 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&crop=center'
              alt='Contact us background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-card/80 border border-border backdrop-blur-sm text-card-foreground text-sm font-medium mb-6'>
              Contact Us
            </span>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-card-foreground'>
              Get in <span className='text-gradient'>Touch</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Have questions about CharadesAI? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-12 text-center'>
              How Can We Help?
            </h2>
            <div className='grid grid-cols-1 gap-8 max-w-5xl mx-auto'>
              {contactOptions.map((option) => (
                <div
                  key={option.title}
                  className='group p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center'
                >
                  <div className='w-16 h-16 rounded-2xl bg-gradient-ai flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <option.icon className='w-8 h-8 text-primary-foreground' />
                  </div>
                  <h3 className='text-xl font-bold mb-4 text-card-foreground group-hover:text-neon-cyan transition-colors'>
                    {option.title}
                  </h3>
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
              {/* Form */}
              <div className='p-8 rounded-3xl bg-card/80 backdrop-blur-md border border-border'>
                <h2 className='text-2xl font-bold mb-6 text-card-foreground'>
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <div className='text-center py-12'>
                    <div className='w-16 h-16 rounded-full bg-neon-emerald/20 flex items-center justify-center mx-auto mb-4'>
                      <Check className='w-8 h-8 text-neon-emerald' />
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-card-foreground'>
                      Message Sent!
                    </h3>
                    <p className='text-muted-foreground mb-6'>
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                    <Button
                      variant='outline'
                      onClick={() => setIsSubmitted(false)}
                      className='bg-card/80 backdrop-blur-md border-border text-card-foreground hover:bg-card/90'
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2 text-card-foreground'>
                          Name <span className='text-red-400'>*</span>
                        </label>
                        <Input
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          placeholder='Your name'
                          className={`bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan ${
                            errors.name ? "border-red-400" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className='text-xs text-red-400 mt-1'>
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2 text-card-foreground'>
                          Email <span className='text-red-400'>*</span>
                        </label>
                        <Input
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='you@company.com'
                          className={`bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan ${
                            errors.email ? "border-red-400" : ""
                          }`}
                        />
                        {errors.email && (
                          <p className='text-xs text-red-400 mt-1'>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2 text-card-foreground'>
                        Company
                      </label>
                      <Input
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        placeholder='Your company name'
                        className='bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2 text-card-foreground'>
                        Subject <span className='text-red-400'>*</span>
                      </label>
                      <Input
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder='How can we help?'
                        className={`bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan ${
                          errors.subject ? "border-red-400" : ""
                        }`}
                      />
                      {errors.subject && (
                        <p className='text-xs text-red-400 mt-1'>
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2 text-card-foreground'>
                        Message <span className='text-red-400'>*</span>
                      </label>
                      <Textarea
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Tell us more about your project...'
                        rows={5}
                        className={`bg-card/80 border-border text-card-foreground placeholder:text-muted-foreground focus:border-neon-cyan ${
                          errors.message ? "border-red-400" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className='text-xs text-red-400 mt-1'>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type='submit'
                      variant='hero'
                      size='lg'
                      className='w-full'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className='w-4 h-4' />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className='space-y-8'>
                <div>
                  <h2 className='text-2xl font-bold mb-6 text-card-foreground'>
                    Contact Information
                  </h2>
                  <div className='space-y-4'>
                    <div className='flex items-start gap-4'>
                      <div className='w-10 h-10 rounded-lg bg-gradient-ai flex items-center justify-center'>
                        <Mail className='w-5 h-5 text-primary-foreground' />
                      </div>
                      <div>
                        <div className='font-medium text-card-foreground'>
                          Email
                        </div>
                        <a
                          href='mailto:hello@CharadesAI.com'
                          className='text-muted-foreground hover:text-neon-cyan transition-colors'
                        >
                          hello@CharadesAI.com
                        </a>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-10 h-10 rounded-lg bg-gradient-ai flex items-center justify-center'>
                        <Phone className='w-5 h-5 text-primary-foreground' />
                      </div>
                      <div>
                        <div className='font-medium text-card-foreground'>
                          Phone
                        </div>
                        <a
                          href='tel:+1-800-VISION'
                          className='text-muted-foreground hover:text-neon-cyan transition-colors'
                        >
                          +1 (800) VISION-AI
                        </a>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-10 h-10 rounded-lg bg-gradient-ai flex items-center justify-center'>
                        <Clock className='w-5 h-5 text-primary-foreground' />
                      </div>
                      <div>
                        <div className='font-medium text-card-foreground'>
                          Business Hours
                        </div>
                        <p className='text-muted-foreground'>
                          Mon - Fri: 9:00 AM - 6:00 PM (PST)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-4 text-card-foreground'>
                    Our Office
                  </h3>
                  <div className='space-y-4'>
                    <div
                      key={office.city}
                      className='flex items-start gap-4 p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border'
                    >
                      <MapPin className='w-5 h-5 text-neon-cyan mt-0.5' />
                      <div>
                        <div className='font-medium text-card-foreground'>
                          {office.city}
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {office.address}
                          <br />
                          {office.country}
                        </p>
                        {mapData?.maps_link && (
                          <a
                            href={mapData.maps_link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-sm text-primary hover:underline block mt-2'
                          >
                            Open in Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maps Section */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4 text-card-foreground'>
                Find Us
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Visit our office or connect with us virtually.
              </p>
            </div>

            {mapLoading ? (
              <div className='grid grid-cols-1 gap-8 max-w-6xl mx-auto'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='aspect-video rounded-2xl bg-card/80 backdrop-blur-md border border-border animate-pulse'
                  />
                ))}
              </div>
            ) : (
              <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                <div key={office.city} className='space-y-4'>
                  <div className='p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Map className='w-5 h-5 text-neon-cyan' />
                      <h3 className='font-semibold text-card-foreground'>
                        {office.city}
                      </h3>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {office.address}
                      <br />
                      {office.country}
                    </p>
                  </div>
                  {mapData?.iframe ? (
                    <div
                      className='rounded-2xl overflow-hidden border border-border'
                      dangerouslySetInnerHTML={{ __html: mapData.iframe }}
                    />
                  ) : mapData?.embed_url ? (
                    <div className='aspect-video rounded-2xl overflow-hidden border border-border'>
                      <iframe
                        src={mapData.embed_url}
                        width='100%'
                        height='100%'
                        style={{ border: 0 }}
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        title={`${office.city} Office Location`}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ CTA */}
        <section className='relative py-24 overflow-hidden'>
          {/* Full-width rounded background image */}
          <div className='absolute inset-0 mx-4 mt-8 mb-8'>
            <img
              src='https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&crop=center'
              alt='Get help and support background'
              className='w-full h-full object-cover rounded-3xl'
            />
            {/* Overlay for better text readability */}
            <div className='absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70 rounded-3xl' />
          </div>

          <div className='container mx-auto px-4 relative z-10 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6 text-card-foreground'>
              Looking for Quick Answers?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Check out our documentation or pricing FAQ for immediate
              assistance.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button
                variant='hero'
                size='lg'
                className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/90 text-card-foreground'
                onClick={() => navigate("/features")}
              >
                View Documentation <ArrowRight className='w-4 h-4' />
              </Button>
              <Button
                variant='heroOutline'
                size='lg'
                className='bg-card/80 backdrop-blur-md border border-border hover:bg-card/90 text-card-foreground'
                onClick={() => navigate("/pricing")}
              >
                Pricing FAQ
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

export default Contact;
