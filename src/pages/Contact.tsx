import { useState } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

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
    email: "sales@CharadesAI.app",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Get help with API integration and troubleshooting.",
    email: "support@CharadesAI.app",
  },
  {
    icon: FileText,
    title: "Partnerships",
    description: "Explore partnership and integration opportunities.",
    email: "partners@CharadesAI.app",
  },
];

const offices = [
  {
    city: "San Francisco",
    address: "100 Market Street, Suite 300",
    country: "United States",
  },
  {
    city: "London",
    address: "1 Canada Square, Canary Wharf",
    country: "United Kingdom",
  },
  {
    city: "Singapore",
    address: "1 Raffles Place, Tower 2",
    country: "Singapore",
  },
];

const Contact = () => {
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero */}
        <section className='pt-32 pb-20 bg-gradient-hero'>
          <div className='container mx-auto px-4 text-center'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
              Contact
            </span>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Get in <span className='text-gradient'>Touch</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
              {contactOptions.map((option) => (
                <div
                  key={option.title}
                  className='p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors text-center'
                >
                  <option.icon className='w-10 h-10 text-primary mx-auto mb-4' />
                  <h3 className='font-semibold mb-2'>{option.title}</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {option.description}
                  </p>
                  <a
                    href={`mailto:${option.email}`}
                    className='text-sm text-primary hover:underline'
                  >
                    {option.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className='py-16 bg-secondary/30'>
          <div className='container mx-auto px-4'>
            <div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
              {/* Form */}
              <div className='p-8 rounded-2xl bg-card border border-border'>
                <h2 className='text-2xl font-bold mb-6'>Send us a Message</h2>

                {isSubmitted ? (
                  <div className='text-center py-12'>
                    <div className='w-16 h-16 rounded-full bg-neon-emerald/20 flex items-center justify-center mx-auto mb-4'>
                      <Check className='w-8 h-8 text-neon-emerald' />
                    </div>
                    <h3 className='text-xl font-semibold mb-2'>
                      Message Sent!
                    </h3>
                    <p className='text-muted-foreground mb-6'>
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                    <Button
                      variant='outline'
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          Name <span className='text-destructive'>*</span>
                        </label>
                        <Input
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          placeholder='Your name'
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className='text-xs text-destructive mt-1'>
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          Email <span className='text-destructive'>*</span>
                        </label>
                        <Input
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='you@company.com'
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className='text-xs text-destructive mt-1'>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Company
                      </label>
                      <Input
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                        placeholder='Your company name'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Subject <span className='text-destructive'>*</span>
                      </label>
                      <Input
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder='How can we help?'
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && (
                        <p className='text-xs text-destructive mt-1'>
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Message <span className='text-destructive'>*</span>
                      </label>
                      <Textarea
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Tell us more about your project...'
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className='text-xs text-destructive mt-1'>
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
                  <h2 className='text-2xl font-bold mb-6'>
                    Contact Information
                  </h2>
                  <div className='space-y-4'>
                    <div className='flex items-start gap-4'>
                      <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                        <Mail className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <div className='font-medium'>Email</div>
                        <a
                          href='mailto:hello@CharadesAI.app'
                          className='text-muted-foreground hover:text-primary'
                        >
                          hello@CharadesAI.app
                        </a>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                        <Phone className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <div className='font-medium'>Phone</div>
                        <a
                          href='tel:+1-800-VISION'
                          className='text-muted-foreground hover:text-primary'
                        >
                          +1 (800) VISION-AI
                        </a>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                        <Clock className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <div className='font-medium'>Business Hours</div>
                        <p className='text-muted-foreground'>
                          Mon - Fri: 9:00 AM - 6:00 PM (PST)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-bold mb-4'>Our Offices</h3>
                  <div className='space-y-4'>
                    {offices.map((office) => (
                      <div
                        key={office.city}
                        className='flex items-start gap-4 p-4 rounded-xl bg-card border border-border'
                      >
                        <MapPin className='w-5 h-5 text-primary mt-0.5' />
                        <div>
                          <div className='font-medium'>{office.city}</div>
                          <p className='text-sm text-muted-foreground'>
                            {office.address}
                            <br />
                            {office.country}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className='py-24 bg-gradient-hero'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Looking for Quick Answers?
            </h2>
            <p className='text-muted-foreground mb-8 max-w-xl mx-auto'>
              Check out our documentation or pricing FAQ for immediate
              assistance.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button variant='hero' size='lg'>
                View Documentation <ArrowRight className='w-4 h-4' />
              </Button>
              <Button variant='heroOutline' size='lg'>
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
