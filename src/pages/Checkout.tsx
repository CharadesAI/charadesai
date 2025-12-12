import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { cn } from "@/lib/utils";
import {
  LuCreditCard as CreditCard,
  LuLock as Lock,
  LuCircleAlert as AlertCircle,
  LuArrowLeft as ArrowLeft,
  LuShield as Shield,
  LuZap as Zap,
  LuStar as Star,
  LuCrown as Crown,
  LuUsers as Users,
  LuArrowRight as ArrowRight,
  LuExternalLink as ExternalLink,
  LuCheck as Check,
} from "react-icons/lu";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { postJson } from "@/lib/api";

const checkoutSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must be at most 19 digits"),
  expiryMonth: z
    .string()
    .min(2, "Expiry month is required")
    .max(2, "Invalid month"),
  expiryYear: z
    .string()
    .min(2, "Expiry year is required")
    .max(2, "Invalid year"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits"),
  cardHolder: z.string().min(2, "Card holder name is required"),
  billingAddress: z
    .object({
      line1: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      country: z.string().min(1, "Country is required"),
    })
    .optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface PlanData {
  slug: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  apiCalls?: number;
  resolution?: string;
  languages?: number;
  support?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const cardNumber = watch("cardNumber");

  useEffect(() => {
    // Get plan data from URL params
    const planSlug = searchParams.get("plan");
    const planName = searchParams.get("name");
    const planPrice = searchParams.get("price");
    const planInterval = searchParams.get("interval");

    if (planSlug && planName && planPrice) {
      const apiCalls = searchParams.get("apiCalls")
        ? parseInt(searchParams.get("apiCalls") as string)
        : undefined;
      const resolution = searchParams.get("resolution") || undefined;
      const languages = searchParams.get("languages")
        ? parseInt(searchParams.get("languages") as string)
        : undefined;
      const support = searchParams.get("support") || undefined;

      setPlan({
        slug: planSlug,
        name: planName,
        price: parseFloat(planPrice),
        interval: planInterval || "monthly",
        features: searchParams.get("features")?.split("|") || [],
        apiCalls,
        resolution,
        languages,
        support,
      });
    } else {
      // Redirect to pricing if no plan data
      navigate("/pricing");
    }
  }, [searchParams, navigate]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, "");
    if (num.startsWith("4")) return "visa";
    if (num.startsWith("5") || num.startsWith("2")) return "mastercard";
    if (num.startsWith("3")) return "amex";
    if (num.startsWith("6")) return "discover";
    return "unknown";
  };

  const getCardTypeDisplay = (type: string) => {
    switch (type) {
      case "visa":
        return {
          name: "Visa",
          color: "text-blue-600",
          bg: "bg-blue-50 dark:bg-blue-950/20",
        };
      case "mastercard":
        return {
          name: "Mastercard",
          color: "text-red-600",
          bg: "bg-red-50 dark:bg-red-950/20",
        };
      case "amex":
        return {
          name: "American Express",
          color: "text-blue-700",
          bg: "bg-blue-50 dark:bg-blue-950/20",
        };
      case "discover":
        return {
          name: "Discover",
          color: "text-orange-600",
          bg: "bg-orange-50 dark:bg-orange-950/20",
        };
      default:
        return { name: "", color: "text-muted-foreground", bg: "" };
    }
  };

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        plan_slug: plan!.slug,
        payment_method: {
          card_number: data.cardNumber.replace(/\s/g, ""),
          expiry_month: data.expiryMonth,
          expiry_year: data.expiryYear,
          cvv: data.cvv,
          card_holder: data.cardHolder,
        },
        billing_address: data.billingAddress,
        usage_details: {
          api_calls: plan?.apiCalls,
          resolution: plan?.resolution,
          languages: plan?.languages,
          support: plan?.support,
        },
      };

      const result = await postJson<{ transaction_id?: string }>(
        "/subscriptions",
        payload
      );

      if ((result as any)?.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/?success=true");
        }, 3000);
      } else {
        setError(
          ((result as any)?.message as string) ||
            "Payment failed. Please try again."
        );
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar />
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='animate-pulse'>Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar />
        <main className='pt-32 pb-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-2xl mx-auto text-center'>
              <div className='w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <CheckCircle2 className='w-10 h-10 text-green-500' />
              </div>
              <h1 className='text-3xl font-bold mb-4 text-card-foreground'>
                Payment Successful!
              </h1>
              <p className='text-muted-foreground mb-8'>
                Thank you for subscribing to {plan.name}. Your payment has been
                processed successfully.
              </p>
              <Button onClick={() => navigate("/")} variant='hero'>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='pt-32 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            {/* Header */}
            <div className='flex items-center gap-4 mb-8'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate("/pricing")}
                className='flex items-center gap-2'
              >
                <ArrowLeft className='w-4 h-4' />
                Back to Pricing
              </Button>
            </div>

            <div className='grid lg:grid-cols-2 gap-12'>
              {/* Checkout Form */}
              <div>
                <Card className='bg-card/80 backdrop-blur-md border-border'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <CreditCard className='w-6 h-6 text-neon-cyan' />
                      Payment Details
                    </CardTitle>
                    <CardDescription>
                      Enter your payment information securely
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='space-y-6'
                    >
                      {/* Card Number */}
                      <div className='space-y-2'>
                        <Label htmlFor='cardNumber'>Card Number</Label>
                        <div className='relative'>
                          <Input
                            id='cardNumber'
                            {...register("cardNumber")}
                            placeholder='Enter your 16-digit card number'
                            className='pr-24'
                            maxLength={19}
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value
                              );
                              e.target.value = formatted;
                              register("cardNumber").onChange(e);
                            }}
                          />
                          {cardNumber &&
                            getCardType(cardNumber) !== "unknown" && (
                              <div
                                className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs font-semibold ${
                                  getCardTypeDisplay(getCardType(cardNumber)).bg
                                } ${
                                  getCardTypeDisplay(getCardType(cardNumber))
                                    .color
                                } border`}
                              >
                                {
                                  getCardTypeDisplay(getCardType(cardNumber))
                                    .name
                                }
                              </div>
                            )}
                        </div>
                        {errors.cardNumber && (
                          <p className='text-sm text-red-500'>
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>

                      {/* Expiry and CVV */}
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='expiry'>Expiry Date</Label>
                          <div className='grid grid-cols-2 gap-2'>
                            <Input
                              {...register("expiryMonth")}
                              placeholder='MM'
                              maxLength={2}
                            />
                            <Input
                              {...register("expiryYear")}
                              placeholder='YY'
                              maxLength={2}
                            />
                          </div>
                          {(errors.expiryMonth || errors.expiryYear) && (
                            <p className='text-sm text-red-500'>
                              Invalid expiry date
                            </p>
                          )}
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='cvv'>Security Code (CVV)</Label>
                          <Input
                            id='cvv'
                            {...register("cvv")}
                            placeholder='3 or 4 digits on back of card'
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <p className='text-sm text-red-500'>
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Holder */}
                      <div className='space-y-2'>
                        <Label htmlFor='cardHolder'>Cardholder Name</Label>
                        <Input
                          id='cardHolder'
                          {...register("cardHolder")}
                          placeholder='Full name as shown on card'
                        />
                        {errors.cardHolder && (
                          <p className='text-sm text-red-500'>
                            {errors.cardHolder.message}
                          </p>
                        )}
                      </div>

                      <Separator />

                      {/* Billing Address */}
                      <div className='space-y-4'>
                        <h3 className='text-lg font-semibold'>
                          Billing Address (Optional)
                        </h3>

                        <div className='space-y-2'>
                          <Label htmlFor='address'>Street Address</Label>
                          <Input
                            id='address'
                            {...register("billingAddress.line1")}
                            placeholder='123 Main Street'
                          />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='city'>City</Label>
                            <Input
                              id='city'
                              {...register("billingAddress.city")}
                              placeholder='New York'
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='state'>State/Province</Label>
                            <Input
                              id='state'
                              {...register("billingAddress.state")}
                              placeholder='NY'
                            />
                          </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='postalCode'>ZIP/Postal Code</Label>
                            <Input
                              id='postalCode'
                              {...register("billingAddress.postalCode")}
                              placeholder='10001'
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='country'>Country</Label>
                            <Input
                              id='country'
                              {...register("billingAddress.country")}
                              placeholder='United States'
                            />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <Alert variant='destructive'>
                          <AlertCircle className='h-4 w-4' />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type='submit'
                        className='w-full'
                        size='lg'
                        disabled={loading}
                      >
                        {loading ? (
                          "Processing..."
                        ) : (
                          <>
                            <Lock className='w-4 h-4 mr-2' />
                            Pay ${plan.price}{" "}
                            {plan.interval === "yearly" ? "Yearly" : "Monthly"}
                          </>
                        )}
                      </Button>

                      <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
                        <Shield className='w-4 h-4' />
                        <span>Secure payment powered by SSL encryption</span>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Summary */}
              <div className='space-y-6'>
                <Card className='bg-card/80 backdrop-blur-md border-border'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      {plan.name === "Basic" && (
                        <Zap className='w-6 h-6 text-blue-500' />
                      )}
                      {plan.name === "Pro" && (
                        <Star className='w-6 h-6 text-neon-cyan' />
                      )}
                      {plan.name === "Enterprise" && (
                        <Crown className='w-6 h-6 text-yellow-500' />
                      )}
                      {plan.name}
                    </CardTitle>
                    <CardDescription>
                      {plan.interval === "yearly"
                        ? "Annual subscription"
                        : "Monthly subscription"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Price */}
                    <div className='text-center'>
                      <div className='text-4xl font-bold text-card-foreground'>
                        ${plan.price}
                        <span className='text-lg text-muted-foreground'>
                          /{plan.interval === "yearly" ? "year" : "month"}
                        </span>
                      </div>
                      {plan.interval === "yearly" && (
                        <Badge variant='secondary' className='mt-2'>
                          Save 20% annually
                        </Badge>
                      )}
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className='space-y-3'>
                      <h4 className='font-semibold text-card-foreground'>
                        What's included:
                      </h4>
                      <ul className='space-y-2'>
                        {plan.apiCalls && (
                          <li className='flex items-center gap-3 text-sm text-muted-foreground'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                            <span>
                              {plan.apiCalls.toLocaleString()} API calls/month
                            </span>
                          </li>
                        )}
                        {plan.resolution && (
                          <li className='flex items-center gap-3 text-sm text-muted-foreground'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                            <span>{plan.resolution} video resolution</span>
                          </li>
                        )}
                        {plan.languages && (
                          <li className='flex items-center gap-3 text-sm text-muted-foreground'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                            <span>{plan.languages} languages</span>
                          </li>
                        )}
                        {plan.support && (
                          <li className='flex items-center gap-3 text-sm text-muted-foreground'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                            <span>
                              {plan.support === "basic"
                                ? "Email support"
                                : plan.support === "priority"
                                ? "Priority Email support"
                                : "24/7 dedicated support"}
                            </span>
                          </li>
                        )}
                        <Separator />
                        {plan.features.map((feature: string, index: number) => (
                          <li key={index} className='flex items-center gap-3'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                            <span className='text-sm text-muted-foreground'>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className='space-y-3'>
                      <h4 className='font-semibold text-card-foreground'>
                        Order Summary
                      </h4>
                      <div className='flex justify-between text-sm'>
                        <span>{plan.name} Plan</span>
                        <span>${plan.price}</span>
                      </div>
                      <div className='flex justify-between text-sm text-muted-foreground'>
                        <span>Tax</span>
                        <span>$0.00</span>
                      </div>
                      <Separator />
                      <div className='flex justify-between font-semibold'>
                        <span>Total</span>
                        <span>${plan.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <Card className='bg-card/80 backdrop-blur-md border-border'>
                  <CardContent className='pt-6'>
                    <div className='grid grid-cols-3 gap-4 text-center'>
                      <div className='flex flex-col items-center gap-2'>
                        <Shield className='w-8 h-8 text-green-500' />
                        <span className='text-xs text-muted-foreground'>
                          SSL Secured
                        </span>
                      </div>
                      <div className='flex flex-col items-center gap-2'>
                        <Lock className='w-8 h-8 text-blue-500' />
                        <span className='text-xs text-muted-foreground'>
                          256-bit Encryption
                        </span>
                      </div>
                      <div className='flex flex-col items-center gap-2'>
                        <CheckCircle className='w-8 h-8 text-purple-500' />
                        <span className='text-xs text-muted-foreground'>
                          Money Back Guarantee
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Checkout;
