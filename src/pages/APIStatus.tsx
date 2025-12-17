import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Server,
  Globe,
  Clock,
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Lip-Reading API",
    status: "launching-soon",
    description: "Advanced lip movement analysis and speech transcription",
    launchDate: "Q1 2026",
    progress: 85,
  },
  {
    name: "Gesture Recognition API",
    status: "launching-soon",
    description: "Real-time hand gesture and pose detection",
    launchDate: "Q1 2026",
    progress: 75,
  },
  {
    name: "Web Dashboard",
    status: "live",
    description: "Management console for API keys and analytics",
    uptime: "99.9%",
    responseTime: "120ms",
  },
  {
    name: "Documentation Portal",
    status: "live",
    description: "Comprehensive developer documentation and guides",
    uptime: "100%",
    responseTime: "85ms",
  },
  {
    name: "SDK Downloads",
    status: "live",
    description: "Official SDKs for JavaScript, Python, and more",
    uptime: "100%",
    responseTime: "95ms",
  },
  {
    name: "Community Forum",
    status: "live",
    description: "Developer community and support discussions",
    uptime: "99.8%",
    responseTime: "150ms",
  },
];

const metrics = [
  {
    title: "API Requests",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Active Users",
    value: "15.2K",
    change: "+8.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Avg Response Time",
    value: "45ms",
    change: "-5.2%",
    trend: "down",
    icon: Zap,
  },
  {
    title: "Uptime",
    value: "99.9%",
    change: "+0.1%",
    trend: "up",
    icon: TrendingUp,
  },
];

const incidents = [
  {
    date: "Dec 8, 2025",
    title: "Dashboard maintenance completed",
    status: "resolved",
    description:
      "Scheduled maintenance for improved performance. No user impact.",
    duration: "2 hours",
  },
  {
    date: "Dec 1, 2025",
    title: "Documentation site optimization",
    status: "resolved",
    description: "Performance improvements and new content added.",
    duration: "30 minutes",
  },
];

const APIStatus = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case "launching-soon":
        return <Clock className='w-5 h-5 text-blue-500' />;
      case "maintenance":
        return <AlertTriangle className='w-5 h-5 text-yellow-500' />;
      case "outage":
        return <XCircle className='w-5 h-5 text-red-500' />;
      default:
        return <CheckCircle className='w-5 h-5 text-green-500' />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className='bg-green-500/10 text-green-600 border-green-500/20'>
            Live
          </Badge>
        );
      case "launching-soon":
        return (
          <Badge
            variant='secondary'
            className='bg-blue-500/10 text-blue-600 border-blue-500/20'
          >
            Launching Soon
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className='bg-yellow-500/10 text-yellow-600 border-yellow-500/20'>
            Maintenance
          </Badge>
        );
      case "outage":
        return <Badge variant='destructive'>Outage</Badge>;
      default:
        return (
          <Badge className='bg-green-500/10 text-green-600 border-green-500/20'>
            Live
          </Badge>
        );
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className='pt-32 pb-24 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 relative overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent' />
            <div className='absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/20 blur-3xl' />
          </div>
          <div className='container mx-auto px-4 text-center relative z-10'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
              <Activity className='w-4 h-4' />
              System Status
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              API <span className='text-gradient'>Status</span> Dashboard
            </h1>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed'>
              Real-time status of all CharadesAI services. Monitor performance
              metrics, track upcoming launches, and stay informed about system
              health.
            </p>
            <div className='flex items-center flex-wrap space-y-2 justify-center gap-4 mb-8'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-6 h-6 text-green-500' />
                <span className='text-sm md:text-lg font-semibold'>
                  Services Live
                </span>
              </div>
              <div className='w-px h-8 bg-border' />
              <div className='flex items-center gap-2'>
                <Clock className='w-6 h-6 text-blue-500' />
                <span className='text-sm md:text-lg font-semibold'>
                  API Launching Soon
                </span>
              </div>
            </div>
            <Button
              variant='hero'
              size='lg'
              onClick={() => navigate("/contact")}
              className='group text-sm md:text-xl'
            >
              Get API Access
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </Button>
          </div>
        </section>

        {/* Metrics Dashboard */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Live <span className='text-gradient'>Metrics</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Real-time performance indicators and usage statistics
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className='hover:shadow-lg transition-all duration-300 hover:border-primary/30'
                >
                  <CardContent className='p-2 md:p-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <metric.icon className='w-8 h-8 text-primary' />
                      <Badge
                        variant={
                          metric.trend === "up" ? "default" : "secondary"
                        }
                        className='text-xs'
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-md md:text-2xl font-bold'>
                        {metric.value}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {metric.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* System Health Overview */}
            <Card className='bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Activity className='w-5 h-5 text-green-500' />
                  System Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-green-600 mb-2'>
                      99.9%
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Overall Uptime
                    </p>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-blue-600 mb-2'>
                      45ms
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Avg Response Time
                    </p>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl font-bold text-purple-600 mb-2'>
                      6/6
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Services Operational
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Status */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Service <span className='text-gradient'>Status</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Current status and development progress for all our services
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30 ${
                    service.status === "launching-soon"
                      ? "bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20"
                      : "bg-card/50"
                  }`}
                >
                  <CardHeader>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 text-center sm:text-left'>
                      <CardTitle className='flex items-center gap-3 text-lg justify-center sm:justify-start'>
                        {getStatusIcon(service.status)}
                        {service.name}
                      </CardTitle>
                      {getStatusBadge(service.status)}
                    </div>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {service.status === "live" ? (
                      <div className='space-y-3'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            Uptime (30d)
                          </span>
                          <span className='text-sm font-semibold text-green-600'>
                            {service.uptime}
                          </span>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            Response Time
                          </span>
                          <span className='text-sm font-semibold'>
                            {service.responseTime}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='space-y-3'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            Launch Date
                          </span>
                          <span className='text-sm font-semibold text-blue-600'>
                            {service.launchDate}
                          </span>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                            <span className='text-sm text-muted-foreground'>
                              Progress
                            </span>
                            <span className='text-sm font-semibold'>
                              {service.progress}%
                            </span>
                          </div>
                          <Progress value={service.progress} className='h-2' />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Launch Timeline */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Product <span className='text-gradient'>Roadmap</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Upcoming launches and feature releases
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              <div className='space-y-8'>
                <div className='flex flex-col sm:flex-row items-center sm:items-center gap-6'>
                  <div className='flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto sm:mx-0'>
                    <PlayCircle className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1 text-center sm:text-left'>
                    <h3 className='text-xl font-semibold mb-2'>
                      Lip-Reading API Launch
                    </h3>
                    <p className='text-muted-foreground mb-2'>
                      Advanced speech transcription from video
                    </p>
                    <Badge
                      variant='secondary'
                      className='bg-blue-500/10 text-blue-600 mx-auto sm:mx-0'
                    >
                      Q1 2026
                    </Badge>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:text-right text-center'>
                    <div className='text-2xl font-bold text-blue-600'>85%</div>
                    <p className='text-sm text-muted-foreground'>Complete</p>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center sm:items-center gap-6'>
                  <div className='flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto sm:mx-0'>
                    <PlayCircle className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1 text-center sm:text-left'>
                    <h3 className='text-xl font-semibold mb-2'>
                      Gesture Recognition API
                    </h3>
                    <p className='text-muted-foreground mb-2'>
                      Real-time gesture and pose detection
                    </p>
                    <Badge
                      variant='secondary'
                      className='bg-purple-500/10 text-purple-600 mx-auto sm:mx-0'
                    >
                      Q1 2026
                    </Badge>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:text-right text-center'>
                    <div className='text-2xl font-bold text-purple-600'>
                      75%
                    </div>
                    <p className='text-sm text-muted-foreground'>Complete</p>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center sm:items-center gap-6'>
                  <div className='flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mx-auto sm:mx-0'>
                    <PauseCircle className='w-6 h-6 text-white' />
                  </div>
                  <div className='flex-1 text-center sm:text-left'>
                    <h3 className='text-xl font-semibold mb-2'>
                      Advanced Analytics Dashboard
                    </h3>
                    <p className='text-muted-foreground mb-2'>
                      Comprehensive API usage analytics and insights
                    </p>
                    <Badge variant='outline' className='mx-auto sm:mx-0'>
                      Q2 2026
                    </Badge>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:text-right text-center'>
                    <div className='text-2xl font-bold text-gray-400'>25%</div>
                    <p className='text-sm text-muted-foreground'>Planning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Incident History */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Recent <span className='text-gradient'>Activity</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Maintenance updates and system improvements
              </p>
            </div>

            <div className='space-y-6 max-w-4xl mx-auto'>
              {incidents.map((incident, index) => (
                <Card key={index} className='hover:shadow-md transition-shadow'>
                  <CardHeader>
                    <div className='flex items-center flex-wrap justify-between'>
                      <CardTitle className='text-lg'>
                        {incident.title}
                      </CardTitle>
                      <Badge
                        variant={
                          incident.status === "resolved"
                            ? "secondary"
                            : "default"
                        }
                        className='bg-green-500/10 text-green-600'
                      >
                        {incident.status}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {incident.date} • Duration: {incident.duration}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground'>
                      {incident.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-24 bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5'>
          <div className='container mx-auto px-4 text-center'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                Stay <span className='text-gradient'>Updated</span>
              </h2>
              <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
                Get notified about new launches, feature updates, and system
                maintenance. Join our community for the latest news and early
                access opportunities.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button
                  variant='hero'
                  size='lg'
                  onClick={() => navigate("/community")}
                  className='group w-full sm:w-auto'
                >
                  Join Community
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Button>
                <Button
                  variant='heroOutline'
                  size='lg'
                  onClick={() => navigate("/contact")}
                  className='group w-full sm:w-auto'
                >
                  Contact Us
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Button>
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

export default APIStatus;
