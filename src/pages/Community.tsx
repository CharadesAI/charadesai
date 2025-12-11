import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MessageCircle,
  Github,
  Calendar,
  Trophy,
  Heart,
  ArrowRight,
  Star,
  BookOpen,
  Code,
  Zap,
  Shield,
  Globe,
  Award,
  TrendingUp,
  UserPlus,
  Lightbulb,
  Target,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Crown,
  Medal,
  Flame,
  MessageSquare,
  Hash,
  Pin,
  Clock,
  Eye,
  ThumbsUp,
  Reply,
  User,
  Building,
  GraduationCap,
  Briefcase,
  Coffee,
  Mic,
  Video,
  FileText,
  Link as LinkIcon,
  Search,
  Filter,
  Plus,
  Settings,
  Bell,
  Bookmark,
  Share,
  Flag,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const communityChannels = [
  {
    icon: Users,
    title: "Developer Forum",
    description:
      "In-depth technical discussions, tutorials, and best practices",
    members: "12,800+",
    activity: "Active",
    features: ["Tutorials", "Best Practices", "Q&A", "Showcase"],
    color: "text-primary",
    gradient: "from-primary/10 to-secondary/10",
    link: "#",
    online: "890",
  },
];

const recentDiscussions = [
  {
    id: 1,
    title:
      "Best practices for handling video preprocessing in lip-reading applications",
    author: "Sarah Chen",
    authorAvatar: "/api/placeholder/32/32",
    category: "Technical Discussion",
    replies: 24,
    views: 1240,
    likes: 18,
    lastActivity: "2 hours ago",
    tags: ["lip-reading", "video-processing", "best-practices"],
    pinned: true,
    solved: false,
  },
  {
    id: 2,
    title:
      "Gesture recognition accuracy improvements with custom training data",
    author: "Marcus Rodriguez",
    authorAvatar: "/api/placeholder/32/32",
    category: "AI/ML",
    replies: 31,
    views: 2150,
    likes: 42,
    lastActivity: "4 hours ago",
    tags: ["gesture-recognition", "training-data", "accuracy"],
    pinned: false,
    solved: true,
  },
  {
    id: 3,
    title: "Integrating CharadesAI with React Native applications",
    author: "Emma Thompson",
    authorAvatar: "/api/placeholder/32/32",
    category: "Integration",
    replies: 15,
    views: 890,
    likes: 12,
    lastActivity: "6 hours ago",
    tags: ["react-native", "integration", "mobile"],
    pinned: false,
    solved: false,
  },
  {
    id: 4,
    title: "API rate limiting and optimization strategies",
    author: "David Kim",
    authorAvatar: "/api/placeholder/32/32",
    category: "API",
    replies: 8,
    views: 567,
    likes: 9,
    lastActivity: "8 hours ago",
    tags: ["api", "rate-limiting", "optimization"],
    pinned: false,
    solved: false,
  },
];

const upcomingEvents = [
  {
    title: "CharadesAI Hackathon 2026",
    date: "Jan 15-17, 2026",
    type: "Hackathon",
    description:
      "Build innovative applications using CharadesAI. $75K in prizes!",
    attendees: 1200,
    status: "Registration Open",
    location: "Virtual + San Francisco",
    prizes: ["$25K Grand Prize", "API Credits", "Mentorship"],
    tags: ["hackathon", "competition", "virtual"],
  },
  {
    title: "Developer Meetup - San Francisco",
    date: "Feb 8, 2026",
    type: "Meetup",
    description:
      "Network with fellow developers and learn about latest features",
    attendees: 85,
    status: "Limited Spots",
    location: "San Francisco, CA",
    prizes: [],
    tags: ["meetup", "networking", "in-person"],
  },
  {
    title: "AI Ethics & Accessibility Workshop",
    date: "Feb 22, 2026",
    type: "Workshop",
    description:
      "Discuss responsible AI development and accessibility in CharadesAI",
    attendees: 60,
    status: "Early Bird",
    location: "Virtual",
    prizes: [],
    tags: ["ethics", "accessibility", "workshop"],
  },
  {
    title: "CharadesAI API Launch Party",
    date: "Mar 1, 2026",
    type: "Celebration",
    description: "Celebrate the launch of our gesture recognition API",
    attendees: 500,
    status: "RSVP Required",
    location: "Virtual",
    prizes: ["Exclusive Swag", "Early Access"],
    tags: ["launch", "celebration", "api"],
  },
];

const contributors = [
  {
    name: "Alex Johnson",
    role: "Core Contributor",
    avatar: "/api/placeholder/64/64",
    contributions: 247,
    badges: ["Top Contributor", "Bug Hunter", "Mentor"],
    joined: "Jan 2024",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about AI accessibility",
    stats: { posts: 156, likes: 892, solutions: 34 },
  },
  {
    name: "Priya Patel",
    role: "Community Moderator",
    avatar: "/api/placeholder/64/64",
    contributions: 189,
    badges: ["Moderator", "Helpful", "Rising Star"],
    joined: "Mar 2024",
    location: "London, UK",
    bio: "AI researcher focusing on computer vision applications",
    stats: { posts: 98, likes: 654, solutions: 28 },
  },
  {
    name: "Carlos Mendoza",
    role: "Event Organizer",
    avatar: "/api/placeholder/64/64",
    contributions: 134,
    badges: ["Event Organizer", "Community Builder", "Speaker"],
    joined: "Feb 2024",
    location: "Mexico City, MX",
    bio: "Tech entrepreneur and community advocate",
    stats: { posts: 67, likes: 423, solutions: 19 },
  },
];

const learningResources = [
  {
    title: "Getting Started with Lip-Reading API",
    type: "Tutorial",
    difficulty: "Beginner",
    duration: "15 min",
    author: "CharadesAI Team",
    rating: 4.8,
    students: 1250,
    tags: ["tutorial", "beginner", "api"],
  },
  {
    title: "Advanced Gesture Recognition Techniques",
    type: "Workshop",
    difficulty: "Advanced",
    duration: "2 hours",
    author: "Dr. Sarah Mitchell",
    rating: 4.9,
    students: 890,
    tags: ["workshop", "advanced", "techniques"],
  },
  {
    title: "Building Accessible AI Applications",
    type: "Course",
    difficulty: "Intermediate",
    duration: "4 weeks",
    author: "Accessibility Experts",
    rating: 4.7,
    students: 2100,
    tags: ["course", "accessibility", "ethics"],
  },
  {
    title: "Real-time Video Processing Best Practices",
    type: "Guide",
    difficulty: "Intermediate",
    duration: "30 min",
    author: "DevOps Team",
    rating: 4.6,
    students: 750,
    tags: ["guide", "video-processing", "performance"],
  },
];

const successStories = [
  {
    company: "SignSync",
    logo: "/api/placeholder/48/48",
    title: "Revolutionizing Sign Language Translation",
    description:
      "How SignSync used CharadesAI to create a real-time sign language translation app serving 50K+ users.",
    metrics: ["50K+ Active Users", "99.2% Accuracy", "£2M Funding"],
    link: "#",
    featured: true,
  },
  {
    company: "EduVision",
    logo: "/api/placeholder/48/48",
    title: "Inclusive Learning for Deaf Students",
    description:
      "EduVision's platform uses our lip-reading API to provide real-time captions in classrooms.",
    metrics: ["100+ Schools", "10K+ Students", "95% Satisfaction"],
    link: "#",
    featured: false,
  },
  {
    company: "MediVoice",
    logo: "/api/placeholder/48/48",
    title: "Healthcare Communication Solutions",
    description:
      "MediVoice leverages gesture recognition for non-verbal patient communication in hospitals.",
    metrics: ["25 Hospitals", "8K+ Patients", "4.9★ Rating"],
    link: "#",
    featured: false,
  },
];

const Community = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-600";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-600";
      case "Advanced":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Hackathon":
        return "bg-purple-500/10 text-purple-600";
      case "Meetup":
        return "bg-blue-500/10 text-blue-600";
      case "Workshop":
        return "bg-green-500/10 text-green-600";
      case "Celebration":
        return "bg-pink-500/10 text-pink-600";
      default:
        return "bg-gray-500/10 text-gray-600";
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
              <Users className='w-4 h-4' />
              Community Hub
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Welcome to Our <span className='text-gradient'>Community</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed'>
              Join 25,000+ developers, researchers, and innovators building the
              future of accessible AI. Connect, learn, and contribute to
              groundbreaking CharadesAI technology.
            </p>
            <div className='flex flex-wrap justify-center gap-4 mb-8'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-6 h-6 text-green-500' />
                <span className='text-lg font-semibold'>25K+ Members</span>
              </div>
              <div className='w-px h-8 bg-border' />
              <div className='flex items-center gap-2'>
                <Trophy className='w-6 h-6 text-yellow-500' />
                <span className='text-lg font-semibold'>500+ Projects</span>
              </div>
              <div className='w-px h-8 bg-border' />
              <div className='flex items-center gap-2'>
                <Globe className='w-6 h-6 text-blue-500' />
                <span className='text-lg font-semibold'>60+ Countries</span>
              </div>
            </div>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button
                variant='heroOutline'
                size='lg'
                onClick={() => navigate("/forum")}
                className='group'
              >
                Explore Forum
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          </div>
        </section>

        {/* Community Channels */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Community <span className='text-gradient'>Channels</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Connect with our vibrant community through multiple platforms
              </p>
            </div>

            <div className='grid lg:grid-cols-3 gap-8 mb-12'>
              {communityChannels.map((channel, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-xl transition-all duration-300 hover:border-primary/30 ${channel.gradient} border-2`}
                >
                  <CardHeader>
                    <div className='flex items-center justify-between mb-4'>
                      <channel.icon className={`w-10 h-10 ${channel.color}`} />
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                        <span className='text-sm text-muted-foreground'>
                          {channel.online} online
                        </span>
                      </div>
                    </div>
                    <CardTitle className='text-xl'>{channel.title}</CardTitle>
                    <CardDescription className='text-base leading-relaxed'>
                      {channel.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div className='text-sm text-muted-foreground'>
                          {channel.members} members
                        </div>
                        <Badge
                          variant='secondary'
                          className='bg-green-500/10 text-green-600'
                        >
                          {channel.activity}
                        </Badge>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {channel.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant='outline'
                            className='text-xs'
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className='w-full group'
                        onClick={() =>
                          navigate(
                            channel.title === "Developer Forum"
                              ? "/forum"
                              : "/contact"
                          )
                        }
                      >
                        Join Channel
                        <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Community Content */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <Tabs defaultValue='discussions' className='w-full'>
              <TabsList className='grid w-full grid-cols-4 mb-12'>
                <TabsTrigger
                  value='discussions'
                  className='flex items-center gap-2'
                >
                  <MessageSquare className='w-4 h-4' />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value='events' className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value='learning'
                  className='flex items-center gap-2'
                >
                  <BookOpen className='w-4 h-4' />
                  Learning
                </TabsTrigger>
                <TabsTrigger
                  value='contributors'
                  className='flex items-center gap-2'
                >
                  <Award className='w-4 h-4' />
                  Contributors
                </TabsTrigger>
              </TabsList>

              {/* Discussions Tab */}
              <TabsContent value='discussions' className='space-y-6'>
                <div className='flex items-center justify-between mb-8'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2'>
                      Recent Discussions
                    </h3>
                    <p className='text-muted-foreground'>
                      Latest conversations from our community
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      <Filter className='w-4 h-4 mr-2' />
                      Filter
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Search className='w-4 h-4 mr-2' />
                      Search
                    </Button>
                    <Button size='sm' onClick={() => navigate("/contact")}>
                      <Plus className='w-4 h-4 mr-2' />
                      New Post
                    </Button>
                  </div>
                </div>

                <div className='space-y-4'>
                  {recentDiscussions.map((discussion) => (
                    <Card
                      key={discussion.id}
                      className='hover:shadow-md transition-shadow'
                    >
                      <CardContent className='p-6'>
                        <div className='flex items-start gap-4'>
                          <Avatar className='w-10 h-10'>
                            <AvatarImage src={discussion.authorAvatar} />
                            <AvatarFallback>
                              {discussion.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-2'>
                              {discussion.pinned && (
                                <Pin className='w-4 h-4 text-primary' />
                              )}
                              <h4 className='font-semibold text-lg hover:text-primary cursor-pointer line-clamp-2'>
                                {discussion.title}
                              </h4>
                              {discussion.solved && (
                                <CheckCircle className='w-4 h-4 text-green-500' />
                              )}
                            </div>

                            <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
                              <span>by {discussion.author}</span>
                              <span>in {discussion.category}</span>
                              <span>{discussion.lastActivity}</span>
                            </div>

                            <div className='flex flex-wrap gap-2 mb-4'>
                              {discussion.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant='secondary'
                                  className='text-xs'
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                              <div className='flex items-center gap-1'>
                                <MessageSquare className='w-4 h-4' />
                                {discussion.replies} replies
                              </div>
                              <div className='flex items-center gap-1'>
                                <Eye className='w-4 h-4' />
                                {discussion.views} views
                              </div>
                              <div className='flex items-center gap-1'>
                                <ThumbsUp className='w-4 h-4' />
                                {discussion.likes} likes
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className='text-center pt-8'>
                  <Button variant='outline' onClick={() => navigate("/forum")}>
                    View All Discussions
                    <ChevronRight className='w-4 h-4 ml-2' />
                  </Button>
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value='events' className='space-y-6'>
                <div className='flex items-center justify-between mb-8'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2'>Upcoming Events</h3>
                    <p className='text-muted-foreground'>
                      Join hackathons, meetups, and workshops
                    </p>
                  </div>
                  <Button onClick={() => navigate("/contact")}>
                    <Calendar className='w-4 h-4 mr-2' />
                    View Calendar
                  </Button>
                </div>

                <div className='grid lg:grid-cols-2 gap-6'>
                  {upcomingEvents.map((event, index) => (
                    <Card
                      key={index}
                      className='hover:shadow-lg transition-all duration-300'
                    >
                      <CardHeader>
                        <div className='flex items-center justify-between mb-2'>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          <Badge variant='outline' className='text-xs'>
                            {event.attendees} attending
                          </Badge>
                        </div>
                        <CardTitle className='text-xl'>{event.title}</CardTitle>
                        <CardDescription className='flex items-center gap-2'>
                          <Calendar className='w-4 h-4' />
                          {event.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className='text-muted-foreground mb-4'>
                          {event.description}
                        </p>

                        <div className='flex items-center gap-2 mb-4'>
                          <Globe className='w-4 h-4 text-muted-foreground' />
                          <span className='text-sm text-muted-foreground'>
                            {event.location}
                          </span>
                        </div>

                        {event.prizes.length > 0 && (
                          <div className='mb-4'>
                            <p className='text-sm font-medium mb-2'>Prizes:</p>
                            <div className='flex flex-wrap gap-2'>
                              {event.prizes.map((prize, idx) => (
                                <Badge
                                  key={idx}
                                  variant='secondary'
                                  className='text-xs'
                                >
                                  <Trophy className='w-3 h-3 mr-1' />
                                  {prize}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className='flex flex-wrap gap-2 mb-4'>
                          {event.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant='outline'
                              className='text-xs'
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          className='w-full'
                          onClick={() => navigate("/contact")}
                        >
                          {event.status}
                          <ArrowRight className='w-4 h-4 ml-2' />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Learning Tab */}
              <TabsContent value='learning' className='space-y-6'>
                <div className='flex items-center justify-between mb-8'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2'>
                      Learning Resources
                    </h3>
                    <p className='text-muted-foreground'>
                      Tutorials, courses, and guides to master CharadesAI
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    onClick={() => navigate("/contact")}
                  >
                    <BookOpen className='w-4 h-4 mr-2' />
                    Browse All
                  </Button>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  {learningResources.map((resource, index) => (
                    <Card
                      key={index}
                      className='hover:shadow-lg transition-all duration-300'
                    >
                      <CardHeader>
                        <div className='flex items-center justify-between mb-2'>
                          <Badge variant='outline'>{resource.type}</Badge>
                          <Badge
                            className={getDifficultyColor(resource.difficulty)}
                          >
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className='text-lg'>
                          {resource.title}
                        </CardTitle>
                        <CardDescription>by {resource.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='flex items-center gap-4 mb-4 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            {resource.duration}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                            {resource.rating}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Users className='w-4 h-4' />
                            {resource.students}
                          </div>
                        </div>

                        <div className='flex flex-wrap gap-2 mb-4'>
                          {resource.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant='secondary'
                              className='text-xs'
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => navigate("/contact")}
                        >
                          Start Learning
                          <ArrowRight className='w-4 h-4 ml-2' />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contributors Tab */}
              <TabsContent value='contributors' className='space-y-6'>
                <div className='flex items-center justify-between mb-8'>
                  <div>
                    <h3 className='text-2xl font-bold mb-2'>
                      Community Contributors
                    </h3>
                    <p className='text-muted-foreground'>
                      Meet the amazing people building our community
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    onClick={() => navigate("/contact")}
                  >
                    <Award className='w-4 h-4 mr-2' />
                    Hall of Fame
                  </Button>
                </div>

                <div className='grid lg:grid-cols-3 gap-6'>
                  {contributors.map((contributor, index) => (
                    <Card
                      key={index}
                      className='hover:shadow-lg transition-all duration-300'
                    >
                      <CardHeader className='text-center'>
                        <Avatar className='w-20 h-20 mx-auto mb-4'>
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback className='text-lg'>
                            {contributor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className='text-lg'>
                          {contributor.name}
                        </CardTitle>
                        <CardDescription>{contributor.role}</CardDescription>
                        <div className='flex justify-center gap-2 mt-2'>
                          {contributor.badges.slice(0, 2).map((badge) => (
                            <Badge
                              key={badge}
                              variant='secondary'
                              className='text-xs'
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className='text-sm text-muted-foreground text-center mb-4'>
                          {contributor.bio}
                        </p>

                        <div className='grid grid-cols-3 gap-4 mb-4 text-center'>
                          <div>
                            <div className='text-lg font-bold text-primary'>
                              {contributor.stats.posts}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              Posts
                            </div>
                          </div>
                          <div>
                            <div className='text-lg font-bold text-primary'>
                              {contributor.stats.likes}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              Likes
                            </div>
                          </div>
                          <div>
                            <div className='text-lg font-bold text-primary'>
                              {contributor.stats.solutions}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              Solutions
                            </div>
                          </div>
                        </div>

                        <div className='text-center text-sm text-muted-foreground mb-4'>
                          Joined {contributor.joined} • {contributor.location}
                        </div>

                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => navigate("/contact")}
                        >
                          View Profile
                          <ArrowRight className='w-4 h-4 ml-2' />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Success Stories */}
        <section className='py-24'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Success <span className='text-gradient'>Stories</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                See how our community is transforming industries with CharadesAI
              </p>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
              {successStories.map((story, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-xl transition-all duration-300 ${
                    story.featured
                      ? "ring-2 ring-primary/20 border-primary/30"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <div className='flex items-center gap-3 mb-2'>
                      <Avatar className='w-12 h-12'>
                        <AvatarImage src={story.logo} />
                        <AvatarFallback>
                          {story.company.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className='text-lg'>
                          {story.company}
                        </CardTitle>
                        {story.featured && (
                          <Badge className='bg-primary/10 text-primary text-xs'>
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className='text-base leading-tight'>
                      {story.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
                      {story.description}
                    </p>

                    <div className='grid grid-cols-1 gap-2 mb-4'>
                      {story.metrics.map((metric, idx) => (
                        <div key={idx} className='flex items-center gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
                          <span className='text-sm'>{metric}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant='outline'
                      className='w-full'
                      onClick={() => navigate("/contact")}
                    >
                      Read Full Story
                      <ExternalLink className='w-4 h-4 ml-2' />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className='py-24 bg-secondary/20'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Community <span className='text-gradient'>Impact</span>
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
                Together, we're building the future of accessible technology
              </p>
            </div>

            <div className='grid md:grid-cols-4 gap-8 mb-12'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-gradient mb-2'>
                  25K+
                </div>
                <div className='text-muted-foreground'>Community Members</div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-gradient mb-2'>
                  500+
                </div>
                <div className='text-muted-foreground'>
                  Open Source Projects
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-gradient mb-2'>60+</div>
                <div className='text-muted-foreground'>
                  Countries Represented
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-gradient mb-2'>1M+</div>
                <div className='text-muted-foreground'>API Calls Daily</div>
              </div>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardContent className='p-6'>
                  <Code className='w-12 h-12 text-primary mx-auto mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>
                    Developer Resources
                  </h3>
                  <p className='text-muted-foreground text-sm mb-4'>
                    Comprehensive documentation, SDKs, and code examples
                  </p>
                  <Button
                    variant='outline'
                    onClick={() => navigate("/contact")}
                  >
                    Explore Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardContent className='p-6'>
                  <Heart className='w-12 h-12 text-red-500 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>
                    Inclusive Community
                  </h3>
                  <p className='text-muted-foreground text-sm mb-4'>
                    Welcoming environment for all skill levels and backgrounds
                  </p>
                  <Button
                    variant='outline'
                    onClick={() => navigate("/contact")}
                  >
                    Join Us
                  </Button>
                </CardContent>
              </Card>

              <Card className='text-center hover:shadow-lg transition-shadow'>
                <CardContent className='p-6'>
                  <Sparkles className='w-12 h-12 text-yellow-500 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>Innovation Hub</h3>
                  <p className='text-muted-foreground text-sm mb-4'>
                    Cutting-edge AI research and collaborative development
                  </p>
                  <Button
                    variant='outline'
                    onClick={() => navigate("/contact")}
                  >
                    Get Inspired
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-24 bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5'>
          <div className='container mx-auto px-4 text-center'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                Ready to Make an <span className='text-gradient'>Impact</span>?
              </h2>
              <p className='text-muted-foreground mb-8 text-lg leading-relaxed'>
                Join thousands of developers, researchers, and innovators who
                are building the future of accessible AI. Whether you're here to
                learn, contribute, or collaborate, there's a place for you in
                our community.
              </p>
              <div className='grid md:grid-cols-3 gap-4 mb-8'>
                <div className='p-4 bg-card/50 rounded-lg border'>
                  <UserPlus className='w-8 h-8 text-primary mx-auto mb-2' />
                  <h3 className='font-semibold mb-1'>Get Started</h3>
                  <p className='text-sm text-muted-foreground'>
                    Join our platforms and introduce yourself
                  </p>
                </div>
                <div className='p-4 bg-card/50 rounded-lg border'>
                  <Lightbulb className='w-8 h-8 text-yellow-500 mx-auto mb-2' />
                  <h3 className='font-semibold mb-1'>Learn & Grow</h3>
                  <p className='text-sm text-muted-foreground'>
                    Access tutorials, courses, and mentorship
                  </p>
                </div>
                <div className='p-4 bg-card/50 rounded-lg border'>
                  <Target className='w-8 h-8 text-green-500 mx-auto mb-2' />
                  <h3 className='font-semibold mb-1'>Contribute</h3>
                  <p className='text-sm text-muted-foreground'>
                    Share your knowledge and help others
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button
                  variant='hero'
                  size='lg'
                  onClick={() => navigate("/contact")}
                  className='group'
                >
                  Join Our Community
                  <Users className='w-4 h-4 ml-2 group-hover:scale-110 transition-transform' />
                </Button>
                <Button
                  variant='heroOutline'
                  size='lg'
                  onClick={() => navigate("/contact")}
                  className='group'
                >
                  Start Contributing
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

export default Community;
