import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useUsageStats, type UsageStats } from "@/hooks/use-api";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Globe,
  Server,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Info,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

const COLORS = {
  cyan: "#00D9FF",
  violet: "#8B5CF6",
  emerald: "#10B981",
  pink: "#EC4899",
  yellow: "#F59E0B",
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const { data: usageStats, isLoading } = useUsageStats();

  // Generate additional analytics data
  const endpointStats = useMemo(
    () => [
      { name: "Lip Reading", calls: 18500, color: COLORS.cyan },
      { name: "Gesture", calls: 12300, color: COLORS.violet },
      { name: "Emotion", calls: 8200, color: COLORS.emerald },
      { name: "Speech", calls: 5800, color: COLORS.pink },
    ],
    []
  );

  const regionStats = useMemo(
    () => [
      { region: "North America", percentage: 45 },
      { region: "Europe", percentage: 28 },
      { region: "Asia Pacific", percentage: 18 },
      { region: "Other", percentage: 9 },
    ],
    []
  );

  const responseTimeData = useMemo(
    () =>
      usageStats.daily_usage.map((d, i) => ({
        date: d.date,
        avg: 35 + Math.random() * 20,
        p95: 80 + Math.random() * 40,
        p99: 120 + Math.random() * 60,
      })),
    [usageStats]
  );

  const errorRateData = useMemo(
    () =>
      usageStats.daily_usage.map((d) => ({
        date: d.date,
        rate: Math.random() * 2,
        calls: d.calls,
      })),
    [usageStats]
  );

  const filteredUsage = useMemo(() => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    return usageStats.daily_usage.slice(-days);
  }, [usageStats, timeRange]);

  const totalCalls = filteredUsage.reduce((sum, d) => sum + d.calls, 0);
  const avgDaily = Math.round(totalCalls / filteredUsage.length);
  const trend =
    filteredUsage.length >= 2
      ? ((filteredUsage[filteredUsage.length - 1].calls -
          filteredUsage[filteredUsage.length - 2].calls) /
          filteredUsage[filteredUsage.length - 2].calls) *
        100
      : 0;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-card/95 backdrop-blur-md border border-border rounded-lg p-3 shadow-xl'>
          <p className='text-sm font-medium mb-2'>
            {label
              ? new Date(label).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className='flex items-center gap-2 text-sm'>
              <div
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: entry.color }}
              />
              <span className='text-muted-foreground'>{entry.name}:</span>
              <span className='font-medium'>
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold'>Analytics</h1>
            <p className='text-muted-foreground mt-1'>
              Deep insights into your API usage and performance
            </p>
          </div>
          <Select
            value={timeRange}
            onValueChange={(v) => setTimeRange(v as typeof timeRange)}
          >
            <SelectTrigger className='w-[140px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
              <SelectItem value='90d'>Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              title: "Total API Calls",
              value: totalCalls.toLocaleString(),
              change: `${trend > 0 ? "+" : ""}${trend.toFixed(1)}%`,
              positive: trend >= 0,
              icon: Zap,
              color: "text-neon-cyan",
            },
            {
              title: "Avg Daily Calls",
              value: avgDaily.toLocaleString(),
              change: "+8.2%",
              positive: true,
              icon: Activity,
              color: "text-neon-violet",
            },
            {
              title: "Avg Response Time",
              value: "42ms",
              change: "-12ms",
              positive: true,
              icon: Clock,
              color: "text-neon-emerald",
            },
            {
              title: "Error Rate",
              value: "0.12%",
              change: "-0.03%",
              positive: true,
              icon: Server,
              color: "text-yellow-500",
            },
          ].map((stat) => (
            <Card
              key={stat.title}
              className='bg-card/80 backdrop-blur-md border-border'
            >
              <CardContent className='p-6'>
                {isLoading ? (
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-8 w-20' />
                  </div>
                ) : (
                  <>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-sm text-muted-foreground'>
                        {stat.title}
                      </span>
                      <stat.icon className={cn("w-4 h-4", stat.color)} />
                    </div>
                    <div className='flex items-end gap-2'>
                      <span className='text-2xl font-bold'>{stat.value}</span>
                      <span
                        className={cn(
                          "text-sm flex items-center gap-0.5",
                          stat.positive ? "text-neon-emerald" : "text-red-500"
                        )}
                      >
                        {stat.positive ? (
                          <TrendingUp className='w-3 h-3' />
                        ) : (
                          <TrendingDown className='w-3 h-3' />
                        )}
                        {stat.change}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts */}
        <div className='grid gap-6 lg:grid-cols-3'>
          {/* API Usage Chart */}
          <Card className='lg:col-span-2 bg-card/80 backdrop-blur-md border-border'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='flex items-center gap-2'>
                    <BarChart3 className='w-5 h-5 text-neon-cyan' />
                    API Usage Over Time
                  </CardTitle>
                  <CardDescription>
                    Daily API calls for the selected period
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[300px] w-full' />
              ) : (
                <ResponsiveContainer width='100%' height={300}>
                  <AreaChart data={filteredUsage}>
                    <defs>
                      <linearGradient
                        id='colorUsage'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor={COLORS.cyan}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor={COLORS.cyan}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='hsl(var(--border))'
                      vertical={false}
                    />
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
                      tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type='monotone'
                      dataKey='calls'
                      name='API Calls'
                      stroke={COLORS.cyan}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill='url(#colorUsage)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Endpoint Distribution */}
          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <PieChart className='w-5 h-5 text-neon-violet' />
                By Endpoint
              </CardTitle>
              <CardDescription>API calls by endpoint type</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[250px] w-full' />
              ) : (
                <>
                  <ResponsiveContainer width='100%' height={200}>
                    <RechartsPie>
                      <Pie
                        data={endpointStats}
                        dataKey='calls'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {endpointStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                  <div className='grid grid-cols-2 gap-2 mt-4'>
                    {endpointStats.map((stat) => (
                      <div key={stat.name} className='flex items-center gap-2'>
                        <div
                          className='w-3 h-3 rounded-full'
                          style={{ backgroundColor: stat.color }}
                        />
                        <span className='text-sm text-muted-foreground truncate'>
                          {stat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Response Time */}
          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='w-5 h-5 text-neon-emerald' />
                Response Time
              </CardTitle>
              <CardDescription>
                Average, P95, and P99 response times
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[250px] w-full' />
              ) : (
                <ResponsiveContainer width='100%' height={250}>
                  <LineChart data={responseTimeData.slice(-14)}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='hsl(var(--border))'
                      vertical={false}
                    />
                    <XAxis
                      dataKey='date'
                      tickFormatter={(val) =>
                        new Date(val).toLocaleDateString("en-US", {
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
                      tickFormatter={(val) => `${val}ms`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='avg'
                      name='Avg'
                      stroke={COLORS.emerald}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='p95'
                      name='P95'
                      stroke={COLORS.yellow}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='p99'
                      name='P99'
                      stroke={COLORS.pink}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Error Rate */}
          <Card className='bg-card/80 backdrop-blur-md border-border'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Server className='w-5 h-5 text-yellow-500' />
                Error Rate
              </CardTitle>
              <CardDescription>
                Percentage of failed API requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[250px] w-full' />
              ) : (
                <ResponsiveContainer width='100%' height={250}>
                  <BarChart data={errorRateData.slice(-14)}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='hsl(var(--border))'
                      vertical={false}
                    />
                    <XAxis
                      dataKey='date'
                      tickFormatter={(val) =>
                        new Date(val).toLocaleDateString("en-US", {
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
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey='rate'
                      name='Error %'
                      fill={COLORS.yellow}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='w-5 h-5 text-neon-cyan' />
              Geographic Distribution
            </CardTitle>
            <CardDescription>API requests by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                {regionStats.map((region) => (
                  <div key={region.region} className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span>{region.region}</span>
                      <span className='font-medium'>{region.percentage}%</span>
                    </div>
                    <Progress value={region.percentage} className='h-2' />
                  </div>
                ))}
              </div>
              <div className='flex items-center justify-center'>
                <div className='text-center'>
                  <div className='w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 flex items-center justify-center mx-auto mb-4'>
                    <Globe className='w-16 h-16 text-neon-cyan' />
                  </div>
                  <p className='text-2xl font-bold'>142</p>
                  <p className='text-muted-foreground'>Countries reached</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Insights */}
        <Card className='bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-violet/5 border-border'>
          <CardContent className='p-6'>
            <div className='flex items-start gap-4'>
              <div className='w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center flex-shrink-0'>
                <Info className='w-5 h-5 text-neon-cyan' />
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold mb-2'>Usage Insight</h3>
                <p className='text-muted-foreground text-sm mb-4'>
                  Based on your usage patterns, you're projected to use{" "}
                  <span className='text-neon-cyan font-medium'>87%</span> of
                  your monthly API quota. Consider upgrading to the Enterprise
                  plan for unlimited calls and better performance.
                </p>
                <Button variant='heroOutline' size='sm'>
                  View Upgrade Options
                  <ArrowUpRight className='w-4 h-4 ml-1' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
