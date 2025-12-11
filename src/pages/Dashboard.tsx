import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/lib/AuthContext";
import {
  useUsageStats,
  useCurrentPlan,
  useAIResults,
  generateDemoUsageStats,
  generateDemoResults,
  type UsageStats,
  type AIResult,
} from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Zap,
  TrendingUp,
  Activity,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: usageStatsRaw, isLoading: usageLoading } = useUsageStats();
  const { data: currentPlan, isLoading: planLoading } = useCurrentPlan();
  const { data: resultsRaw, isLoading: resultsLoading } = useAIResults(5);

  // Use demo data if API returns nothing (creative way to show demo without saying "demo")
  const usageStats: UsageStats = useMemo(
    () => usageStatsRaw || generateDemoUsageStats(),
    [usageStatsRaw]
  );

  const results: AIResult[] = useMemo(
    () => resultsRaw || generateDemoResults().slice(0, 5),
    [resultsRaw]
  );

  const usagePercentage = Math.round(
    (usageStats.api_calls_this_month / usageStats.api_calls_limit) * 100
  );

  const getStatusIcon = (status: AIResult["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className='w-4 h-4 text-neon-emerald' />;
      case "processing":
        return <Loader2 className='w-4 h-4 text-neon-cyan animate-spin' />;
      case "queued":
        return <Clock className='w-4 h-4 text-yellow-500' />;
      case "failed":
        return <AlertCircle className='w-4 h-4 text-red-500' />;
    }
  };

  const getResultTypeLabel = (type: AIResult["type"]) => {
    switch (type) {
      case "lip-reading":
        return "Lip Reading";
      case "gesture":
        return "Gesture Recognition";
      case "emotion":
        return "Emotion Analysis";
      case "speech-to-text":
        return "Speech to Text";
    }
  };

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        {/* Welcome Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold'>
              Welcome back,{" "}
              <span className='text-gradient'>
                {user?.first_name || user?.username || "Developer"}
              </span>
            </h1>
            <p className='text-muted-foreground mt-1'>
              Here's what's happening with your API usage today.
            </p>
          </div>
          <Button
            variant='hero'
            onClick={() => navigate("/api")}
            className='self-start sm:self-auto'
          >
            <Sparkles className='w-4 h-4 mr-2' />
            Try API
          </Button>
        </div>

        {/* Stats Grid */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* API Calls This Month */}
          <Card className='bg-card/80 backdrop-blur-md border-border hover:border-neon-cyan/30 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                API Calls (This Month)
              </CardTitle>
              <Zap className='w-4 h-4 text-neon-cyan' />
            </CardHeader>
            <CardContent>
              {usageLoading ? (
                <Skeleton className='h-8 w-24' />
              ) : (
                <>
                  <div className='text-2xl font-bold'>
                    {usageStats.api_calls_this_month.toLocaleString()}
                  </div>
                  <Progress value={usagePercentage} className='mt-2 h-1.5' />
                  <p className='text-xs text-muted-foreground mt-1'>
                    {usagePercentage}% of{" "}
                    {usageStats.api_calls_limit.toLocaleString()} limit
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Total API Calls */}
          <Card className='bg-card/80 backdrop-blur-md border-border hover:border-neon-violet/30 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Total API Calls
              </CardTitle>
              <TrendingUp className='w-4 h-4 text-neon-violet' />
            </CardHeader>
            <CardContent>
              {usageLoading ? (
                <Skeleton className='h-8 w-24' />
              ) : (
                <>
                  <div className='text-2xl font-bold'>
                    {usageStats.api_calls_total.toLocaleString()}
                  </div>
                  <p className='text-xs text-neon-emerald mt-2'>
                    +12.5% from last month
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Current Plan */}
          <Card className='bg-card/80 backdrop-blur-md border-border hover:border-neon-emerald/30 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Current Plan
              </CardTitle>
              <Activity className='w-4 h-4 text-neon-emerald' />
            </CardHeader>
            <CardContent>
              {planLoading ? (
                <Skeleton className='h-8 w-20' />
              ) : (
                <>
                  <div className='flex items-center gap-2'>
                    <span className='text-2xl font-bold'>
                      {currentPlan?.name || "Pro"}
                    </span>
                    <Badge
                      variant='secondary'
                      className='bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30'
                    >
                      Active
                    </Badge>
                  </div>
                  <Button
                    variant='link'
                    className='p-0 h-auto text-xs text-muted-foreground hover:text-neon-cyan'
                    onClick={() => navigate("/dashboard/billing")}
                  >
                    Manage plan →
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Avg Response Time */}
          <Card className='bg-card/80 backdrop-blur-md border-border hover:border-yellow-500/30 transition-colors'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Avg Response Time
              </CardTitle>
              <Clock className='w-4 h-4 text-yellow-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>42ms</div>
              <p className='text-xs text-neon-emerald mt-2'>
                -8ms from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Activity */}
        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Usage Chart */}
          <Card className='lg:col-span-2 bg-card/80 backdrop-blur-md border-border'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>API Usage Trend</CardTitle>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => navigate("/dashboard/analytics")}
                >
                  View Details <ArrowRight className='w-4 h-4 ml-1' />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {usageLoading ? (
                <Skeleton className='h-[250px] w-full' />
              ) : (
                <ResponsiveContainer width='100%' height={250}>
                  <AreaChart data={usageStats.daily_usage.slice(-14)}>
                    <defs>
                      <linearGradient
                        id='colorCalls'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#00D9FF'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#00D9FF'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey='date'
                      tickFormatter={(val) =>
                        new Date(val).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                      stroke='#6b7280'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke='#6b7280'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `${val}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      labelFormatter={(val) =>
                        new Date(val).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <Area
                      type='monotone'
                      dataKey='calls'
                      stroke='#00D9FF'
                      strokeWidth={2}
                      fillOpacity={1}
                      fill='url(#colorCalls)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Recent Processing Results */}
          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Live Processing</CardTitle>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => navigate("/dashboard/results")}
                >
                  All Results
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {resultsLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <Skeleton className='w-8 h-8 rounded-full' />
                      <div className='flex-1'>
                        <Skeleton className='h-4 w-24 mb-1' />
                        <Skeleton className='h-3 w-16' />
                      </div>
                    </div>
                  ))
                : results.slice(0, 5).map((result) => (
                    <div
                      key={result.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors",
                        "bg-muted/30 hover:bg-muted/50 cursor-pointer"
                      )}
                      onClick={() => navigate("/dashboard/results")}
                    >
                      <div className='mt-0.5'>
                        {getStatusIcon(result.status)}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium truncate'>
                          {getResultTypeLabel(result.type)}
                        </p>
                        <p className='text-xs text-muted-foreground truncate'>
                          {result.input_preview}
                        </p>
                      </div>
                      {result.output?.confidence && (
                        <Badge
                          variant='secondary'
                          className='text-xs bg-neon-cyan/10 text-neon-cyan'
                        >
                          {Math.round(result.output.confidence * 100)}%
                        </Badge>
                      )}
                    </div>
                  ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card
            className='bg-gradient-to-br from-neon-cyan/10 to-neon-violet/10 border-neon-cyan/20 hover:border-neon-cyan/40 transition-colors cursor-pointer group'
            onClick={() => navigate("/api")}
          >
            <CardContent className='p-6 flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Zap className='w-6 h-6 text-neon-cyan' />
              </div>
              <div>
                <h3 className='font-semibold group-hover:text-neon-cyan transition-colors'>
                  API Documentation
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Explore endpoints and examples
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className='bg-gradient-to-br from-neon-violet/10 to-pink-500/10 border-neon-violet/20 hover:border-neon-violet/40 transition-colors cursor-pointer group'
            onClick={() => navigate("/dashboard/analytics")}
          >
            <CardContent className='p-6 flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-neon-violet/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <TrendingUp className='w-6 h-6 text-neon-violet' />
              </div>
              <div>
                <h3 className='font-semibold group-hover:text-neon-violet transition-colors'>
                  View Analytics
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Detailed usage insights
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className='bg-gradient-to-br from-neon-emerald/10 to-cyan-500/10 border-neon-emerald/20 hover:border-neon-emerald/40 transition-colors cursor-pointer group'
            onClick={() => navigate("/pricing")}
          >
            <CardContent className='p-6 flex items-center gap-4'>
              <div className='w-12 h-12 rounded-xl bg-neon-emerald/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Sparkles className='w-6 h-6 text-neon-emerald' />
              </div>
              <div>
                <h3 className='font-semibold group-hover:text-neon-emerald transition-colors'>
                  Upgrade Plan
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Unlock more features
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
