import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  generateDemoPayments,
  type Payment,
  type CurrentPlan,
  useProfile,
} from "@/hooks/use-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Check,
  Zap,
  Crown,
  ArrowUpRight,
  Download,
  Calendar,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { plans } from "@/lib/pricng";

function getPlanMetaBySlug(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized === "basic") return { name: "Basic", apiCallsLimit: 5000 };
  if (normalized === "pro") return { name: "Pro", apiCallsLimit: 50000 };
  if (normalized === "enterprise")
    return { name: "Enterprise", apiCallsLimit: 250000 };
  return { name: "Pro", apiCallsLimit: 50000 };
}

const Billing = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: profile, isLoading: profileLoading } = useProfile();

  // Use demo data when API returns nothing
  const demoPlan: CurrentPlan = useMemo(
    () => ({
      name: "Pro",
      slug: "pro",
      price_monthly: 99,
      price_yearly: 948,
      features: [
        "50,000 API calls/month",
        "1080p video resolution",
        "Priority support",
        "Advanced analytics",
        "10 languages",
        "Webhook integrations",
      ],
      api_calls_limit: 50000,
      // We don't have renewal info without /payments endpoints.
      expires_at: null,
      is_active: true,
    }),
    []
  );

  const plan: CurrentPlan = useMemo(() => {
    const slug = (profile?.current_plan || "pro").toLowerCase();
    const meta = getPlanMetaBySlug(slug);
    const tier =
      plans.find((p) => p.name.toLowerCase() === meta.name.toLowerCase()) ||
      plans.find((p) => p.name.toLowerCase() === "pro");

    if (!tier) return demoPlan;

    return {
      name: tier.name,
      slug,
      price_monthly: tier.monthlyPrice,
      price_yearly: tier.yearlyPrice ? tier.yearlyPrice * 12 : null,
      features: tier.features.filter((f) => f.included).map((f) => f.text),
      api_calls_limit: meta.apiCallsLimit,
      expires_at: null,
      is_active: true,
    };
  }, [profile?.current_plan, demoPlan]);

  // /payments endpoints are unreliable in the current backend; keep UI functional with demo data.
  const payments: Payment[] = useMemo(() => generateDemoPayments(), []);
  const totalPages = 1;
  const planLoading = profileLoading;
  const paymentsLoading = false;

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className='bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30'>
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className='bg-yellow-500/20 text-yellow-500 border-yellow-500/30'>
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className='bg-red-500/20 text-red-500 border-red-500/30'>
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge className='bg-blue-500/20 text-blue-500 border-blue-500/30'>
            Refunded
          </Badge>
        );
    }
  };

  const planIcons: Record<string, React.ReactNode> = {
    basic: <Zap className='w-6 h-6' />,
    pro: <Crown className='w-6 h-6' />,
    enterprise: <Crown className='w-6 h-6' />,
  };

  return (
    <DashboardLayout>
      <div className='max-w-5xl mx-auto space-y-8'>
        {/* Current Plan */}
        <Card className='bg-card/80 backdrop-blur-md border-border overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-neon-violet/5 to-pink-500/5' />
          <CardHeader className='relative'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-xl'>Current Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing
                </CardDescription>
              </div>
              <Button
                variant='heroOutline'
                onClick={() => navigate("/pricing")}
              >
                Change Plan
                <ArrowUpRight className='w-4 h-4 ml-1' />
              </Button>
            </div>
          </CardHeader>

          <CardContent className='relative'>
            {planLoading ? (
              <div className='space-y-4'>
                <Skeleton className='h-20 w-full' />
                <Skeleton className='h-4 w-48' />
              </div>
            ) : (
              <div className='flex flex-col lg:flex-row gap-8'>
                {/* Plan Details */}
                <div className='flex-1'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center",
                        plan.slug === "pro"
                          ? "bg-gradient-to-br from-neon-cyan to-neon-violet text-white"
                          : plan.slug === "enterprise"
                          ? "bg-gradient-to-br from-neon-violet to-pink-500 text-white"
                          : "bg-neon-cyan/20 text-neon-cyan"
                      )}
                    >
                      {planIcons[plan.slug] || <Zap className='w-6 h-6' />}
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold'>{plan.name}</h3>
                      <div className='flex items-center gap-2'>
                        <span className='text-muted-foreground'>
                          ${plan.price_monthly}/month
                        </span>
                        {plan.is_active && (
                          <Badge className='bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30'>
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className='grid sm:grid-cols-2 gap-3'>
                    {plan.features?.map((feature, i) => (
                      <div
                        key={i}
                        className='flex items-center gap-2 text-sm text-muted-foreground'
                      >
                        <Check className='w-4 h-4 text-neon-emerald flex-shrink-0' />
                        {typeof feature === "string"
                          ? feature
                          : (feature as { text: string }).text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage & Renewal */}
                <div className='lg:w-72 space-y-4'>
                  {/* API Usage Card */}
                  <div className='p-4 rounded-xl bg-muted/30 border border-border'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-sm text-muted-foreground'>
                        API Calls Used
                      </span>
                      <span className='text-sm font-medium'>
                        {plan.api_calls_limit
                          ? (plan.api_calls_limit * 0.65).toLocaleString()
                          : "35,426"}{" "}
                        /{plan.api_calls_limit?.toLocaleString() || "54,500"}
                      </span>
                    </div>
                    <Progress value={65} className='h-2' />
                    <p className='text-xs text-muted-foreground mt-2'>
                      {Math.round(
                        (plan.api_calls_limit
                          ? plan.api_calls_limit * 0.65
                          : 35426 / 54500) * 100
                      )}
                      % of your monthly API call limit used.
                    </p>
                  </div>

                  {/* Renewal Info */}
                  {plan.expires_at && (
                    <div className='p-4 rounded-xl bg-muted/30 border border-border'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
                        <Calendar className='w-4 h-4' />
                        Next Renewal
                      </div>
                      <p className='font-medium'>
                        {plan.expires_at &&
                          new Date(plan.expires_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                      </p>
                    </div>
                  )}

                  {/* Cancel Subscription */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-full text-muted-foreground hover:text-red-500'
                      >
                        Cancel Subscription
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Subscription?</DialogTitle>
                        <DialogDescription>
                          Your subscription will remain active until the end of
                          your current billing period. You won't be charged
                          again after that.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='flex gap-2 mt-4'>
                        <Button variant='ghost' className='flex-1'>
                          Keep Subscription
                        </Button>
                        <Button variant='destructive' className='flex-1'>
                          Confirm Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Comparison Quick View */}
        <div className='grid md:grid-cols-3 gap-4'>
          {plans.map((tier) => {
            const highlight =
              tier.name === "Basic"
                ? "5K API calls"
                : tier.name === "Pro"
                ? "50K API calls"
                : "Unlimited";
            const isCurrent = plan.slug === tier.name.toLowerCase();
            return (
              <Card
                key={tier.name}
                className={cn(
                  "bg-card/80 backdrop-blur-md border-border transition-all",
                  isCurrent && "ring-2 ring-neon-cyan border-neon-cyan/30",
                  tier.popular && !isCurrent && "border-neon-violet/30"
                )}
              >
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h4 className='font-semibold'>{tier.name}</h4>
                    {isCurrent && (
                      <Badge className='bg-neon-cyan/20 text-neon-cyan text-xs'>
                        Current
                      </Badge>
                    )}
                    {tier.popular && !isCurrent && (
                      <Badge className='bg-neon-violet/20 text-neon-violet text-xs'>
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className='mb-4'>
                    <span className='text-2xl font-bold'>
                      {tier.monthlyPrice ? `$${tier.monthlyPrice}` : "Custom"}
                    </span>
                    {tier.monthlyPrice && (
                      <span className='text-muted-foreground text-sm'>/mo</span>
                    )}
                  </div>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {highlight}
                  </p>
                  <Button
                    variant={isCurrent ? "secondary" : "heroOutline"}
                    size='sm'
                    className='w-full'
                    disabled={isCurrent}
                    onClick={() =>
                      tier.monthlyPrice
                        ? navigate(
                            `/checkout?plan=${tier.name.toLowerCase()}&name=${
                              tier.name
                            }&price=${tier.monthlyPrice}`
                          )
                        : navigate("/contact")
                    }
                  >
                    {isCurrent
                      ? "Current Plan"
                      : tier.monthlyPrice
                      ? "Upgrade"
                      : "Contact Sales"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment History */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='flex items-center gap-2'>
                  <Receipt className='w-5 h-5 text-neon-cyan' />
                  Payment History
                </CardTitle>
                <CardDescription>
                  View and download your past invoices
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {paymentsLoading ? (
              <div className='space-y-3'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className='h-12 w-full' />
                ))}
              </div>
            ) : payments.length === 0 ? (
              <div className='text-center py-12 text-muted-foreground'>
                <CreditCard className='w-12 h-12 mx-auto mb-4 opacity-50' />
                <p>No payment history yet</p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className='font-medium'>
                          {payment.paid_at &&
                            new Date(payment.paid_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className='font-medium'>
                              {payment.plan_name || "Pro"} Plan
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {payment.transaction_id.slice(0, 16)}...
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${payment.amount.toFixed(2)} {payment.currency}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className='text-right'>
                          <Button variant='ghost' size='sm'>
                            <Download className='w-4 h-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex items-center justify-center gap-2 mt-6'>
                    <Button
                      variant='ghost'
                      size='sm'
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className='w-4 h-4' />
                    </Button>
                    <span className='text-sm text-muted-foreground'>
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                    >
                      <ChevronRight className='w-4 h-4' />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CreditCard className='w-5 h-5 text-neon-cyan' />
              Payment Method
            </CardTitle>
            <CardDescription>
              Manage your payment methods and billing address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold'>
                  VISA
                </div>
                <div>
                  <p className='font-medium'>•••• •••• •••• 4242</p>
                  <p className='text-sm text-muted-foreground'>
                    Expires 12/2026
                  </p>
                </div>
              </div>
              <Button variant='ghost' size='sm'>
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
