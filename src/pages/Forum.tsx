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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Hash,
  Pin,
  Clock,
  Eye,
  ThumbsUp,
  Reply,
  User,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Flame,
  TrendingUp,
  Users,
  ArrowLeft,
  ChevronRight,
  Star,
  Award,
  Crown,
  Medal,
  Zap,
  Heart,
  Lightbulb,
  Target,
  BookOpen,
  Code,
  Globe,
  Mic,
  Video,
  FileText,
  Link as LinkIcon,
  Settings,
  Bell,
  Bookmark,
  Share,
  Flag,
  MoreHorizontal,
  Activity,
  Calendar,
  Shield,
  AlertTriangle,
  Check,
  X,
  UserCheck,
  MessageCircle,
  BarChart3,
  Trophy,
  Sparkles,
  Rocket,
  Brain,
  Camera,
  Volume2,
  Edit,
  Trash2,
  Send,
  Smile,
  Paperclip,
  Image,
  Bold,
  Italic,
  List,
  Quote,
  Code2,
  AtSign,
  Hash as HashIcon,
  Lock,
  Unlock,
  RefreshCw,
  SortAsc,
  SortDesc,
  Grid3X3,
  List as ListIcon,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

// Types
interface ForumUser {
  id: string;
  name: string;
  avatar: string;
  level: string;
  badges: string[];
  posts: number;
  likes: number;
  solutions: number;
  status: 'online' | 'away' | 'offline';
  joinedDate: string;
  bio?: string;
  location?: string;
  website?: string;
}

interface ForumReply {
  id: string;
  threadId: string;
  author: string;
  authorAvatar: string;
  authorLevel: string;
  content: string;
  timestamp: string;
  likes: number;
  likedBy: string[];
  edited?: boolean;
  editedAt?: string;
  attachments?: string[];
  mentions?: string[];
}

interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorLevel: string;
  authorBadge: string;
  category: string;
  replies: ForumReply[];
  views: number;
  likes: number;
  likedBy: string[];
  tags: string[];
  solved: boolean;
  pinned: boolean;
  featured: boolean;
  locked: boolean;
  createdAt: string;
  lastActivity: string;
  attachments?: string[];
  poll?: {
    question: string;
    options: { text: string; votes: number; voters: string[] }[];
    multipleChoice: boolean;
    endsAt?: string;
  };
}

interface ForumBookmark {
  threadId: string;
  userId: string;
  timestamp: string;
}

// Custom hooks for localStorage
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: unknown | ((val: unknown) => unknown)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

const useForumData = () => {
  const [threads, setThreads] = useLocalStorage<ForumThread[]>('forum_threads', [] as ForumThread[]);
  const [bookmarks, setBookmarks] = useLocalStorage<ForumBookmark[]>('forum_bookmarks', []);
  const [currentUser, setCurrentUser] = useLocalStorage<ForumUser | null>('forum_current_user', null);
  const [userPreferences, setUserPreferences] = useLocalStorage('forum_user_preferences', {
    theme: 'dark',
    notifications: true,
    emailUpdates: false,
    viewMode: 'card', // 'card' | 'list'
    sortBy: 'recent', // 'recent' | 'popular' | 'unanswered'
  });

  // Initialize with default user if none exists
  useEffect(() => {
    if (!currentUser) {
      const defaultUser: ForumUser = {
        id: 'user_' + Date.now(),
        name: 'You',
        avatar: '/api/placeholder/32/32',
        level: 'Beginner',
        badges: [],
        posts: 0,
        likes: 0,
        solutions: 0,
        status: 'online',
        joinedDate: new Date().toISOString(),
        bio: 'New to the community!',
      };
      setCurrentUser(defaultUser);
    }
  }, [currentUser, setCurrentUser]);

  const createThread = useCallback((threadData: Omit<ForumThread, 'id' | 'replies' | 'views' | 'likes' | 'likedBy' | 'createdAt' | 'lastActivity'>) => {
    const newThread: ForumThread = {
      ...threadData,
      id: 'thread_' + Date.now(),
      replies: [],
      views: 0,
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
    setThreads(prev => [newThread, ...prev]);
    return newThread;
  }, [setThreads]);

  const addReply = useCallback((threadId: string, replyData: Omit<ForumReply, 'id' | 'threadId' | 'timestamp' | 'likes' | 'likedBy'>) => {
    const newReply: ForumReply = {
      ...replyData,
      id: 'reply_' + Date.now(),
      threadId,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };

    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: [...thread.replies, newReply],
          lastActivity: new Date().toISOString(),
        };
      }
      return thread;
    }));

    return newReply;
  }, [setThreads]);

  const toggleLike = useCallback((threadId: string, userId: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        const isLiked = thread.likedBy.includes(userId);
        return {
          ...thread,
          likes: isLiked ? thread.likes - 1 : thread.likes + 1,
          likedBy: isLiked
            ? thread.likedBy.filter(id => id !== userId)
            : [...thread.likedBy, userId],
        };
      }
      return thread;
    }));
  }, [setThreads]);

  const toggleBookmark = useCallback((threadId: string, userId: string) => {
    setBookmarks(prev => {
      const existing = prev.find(b => b.threadId === threadId && b.userId === userId);
      if (existing) {
        return prev.filter(b => !(b.threadId === threadId && b.userId === userId));
      } else {
        return [...prev, {
          threadId,
          userId,
          timestamp: new Date().toISOString(),
        }];
      }
    });
  }, [setBookmarks]);

  const incrementViews = useCallback((threadId: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return { ...thread, views: thread.views + 1 };
      }
      return thread;
    }));
  }, [setThreads]);

  const markAsSolved = useCallback((threadId: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return { ...thread, solved: !thread.solved };
      }
      return thread;
    }));
  }, [setThreads]);

  const togglePin = useCallback((threadId: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return { ...thread, pinned: !thread.pinned };
      }
      return thread;
    }));
  }, [setThreads]);

  return {
    threads,
    bookmarks,
    currentUser,
    userPreferences,
    setUserPreferences,
    createThread,
    addReply,
    toggleLike,
    toggleBookmark,
    incrementViews,
    markAsSolved,
    togglePin,
  };
};

const forumCategories = [
  {
    id: "general",
    name: "General Discussion",
    description: "General topics and community conversations",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    posts: 1247,
    topics: 89,
    lastActivity: "2 hours ago",
    moderators: ["CharadesAI Team"],
    featured: true,
  },
  {
    id: "technical",
    name: "Technical Support",
    description: "Get help with API integration and technical issues",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    posts: 2156,
    topics: 156,
    lastActivity: "15 minutes ago",
    moderators: ["DevOps Team", "Support Lead"],
    featured: true,
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Discuss AI research, models, and vision technologies",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    posts: 892,
    topics: 67,
    lastActivity: "1 hour ago",
    moderators: ["AI Research Team"],
    featured: true,
  },
  {
    id: "showcase",
    name: "Project Showcase",
    description: "Share your CharadesAI projects and get feedback",
    icon: Rocket,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    posts: 445,
    topics: 34,
    lastActivity: "4 hours ago",
    moderators: ["Community Manager"],
    featured: false,
  },
  {
    id: "tutorials",
    name: "Tutorials & Guides",
    description: "Share and discover tutorials and best practices",
    icon: BookOpen,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    posts: 678,
    topics: 45,
    lastActivity: "3 hours ago",
    moderators: ["Education Team"],
    featured: false,
  },
  {
    id: "accessibility",
    name: "Accessibility & Ethics",
    description: "Discuss inclusive AI design and ethical considerations",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    posts: 234,
    topics: 18,
    lastActivity: "6 hours ago",
    moderators: ["Ethics Committee"],
    featured: false,
  },
  {
    id: "mobile",
    name: "Mobile Development",
    description: "Mobile apps, React Native, and cross-platform development",
    icon: Smartphone,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    posts: 567,
    topics: 42,
    lastActivity: "8 hours ago",
    moderators: ["Mobile Team"],
    featured: false,
  },
  {
    id: "research",
    name: "Research & Papers",
    description: "Academic research, papers, and scientific discussions",
    icon: BookOpen,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    posts: 189,
    topics: 15,
    lastActivity: "1 day ago",
    moderators: ["Research Team"],
    featured: false,
  },
];

const topContributors = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/api/placeholder/40/40",
    level: "Expert",
    badges: ["Top Contributor", "Mentor"],
    posts: 1247,
    likes: 8920,
    solutions: 156,
    status: "online",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    avatar: "/api/placeholder/40/40",
    level: "Advanced",
    badges: ["Rising Star", "Problem Solver"],
    posts: 892,
    likes: 6540,
    solutions: 98,
    status: "away",
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "/api/placeholder/40/40",
    level: "Intermediate",
    badges: ["Community Builder", "Helpful"],
    posts: 567,
    likes: 4230,
    solutions: 67,
    status: "online",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "reply",
    user: "Sarah Chen",
    userAvatar: "/api/placeholder/32/32",
    action: "replied to",
    target: "API Rate Limits Discussion",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "thread",
    user: "Marcus Rodriguez",
    userAvatar: "/api/placeholder/32/32",
    action: "created",
    target: "New Tutorial: Advanced Lip Reading",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "like",
    user: "Emma Thompson",
    userAvatar: "/api/placeholder/32/32",
    action: "liked",
    target: "Gesture Recognition Best Practices",
    time: "1 hour ago",
  },
];

const Forum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Forum data and actions
  const {
    threads,
    bookmarks,
    currentUser,
    userPreferences,
    setUserPreferences,
    createThread,
    addReply,
    toggleLike,
    toggleBookmark,
    incrementViews,
    markAsSolved,
    togglePin,
  } = useForumData();

  // UI State
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState(userPreferences.sortBy);
  const [viewMode, setViewMode] = useState(userPreferences.viewMode);
  const [isCreateThreadOpen, setIsCreateThreadOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);

  // New thread form state
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    category: '',
    tags: [] as string[],
  });

  // Initialize with some sample threads if none exist
  useEffect(() => {
    if (threads.length === 0) {
      const sampleThreads: ForumThread[] = [
        {
          id: 'thread_1',
          title: 'Welcome to CharadesAI Developer Forum!',
          content: 'Welcome to our community forum! This is the place to discuss AI, share projects, get help, and connect with other developers working with CharadesAI.',
          author: 'CharadesAI Team',
          authorAvatar: '/api/placeholder/32/32',
          authorLevel: 'Moderator',
          authorBadge: 'Official',
          category: 'General Discussion',
          replies: [],
          views: 245,
          likes: 67,
          likedBy: [],
          tags: ['welcome', 'getting-started', 'community'],
          solved: false,
          pinned: true,
          featured: true,
          locked: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastActivity: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: 'thread_2',
          title: 'API Rate Limits and Best Practices',
          content: 'I\'m working on a high-traffic application and want to understand the API rate limits better. What are the best practices for handling rate limits gracefully?',
          author: 'DevOps Team',
          authorAvatar: '/api/placeholder/32/32',
          authorLevel: 'Moderator',
          authorBadge: 'Expert',
          category: 'Technical Support',
          replies: [],
          views: 4520,
          likes: 234,
          likedBy: [],
          tags: ['api', 'rate-limits', 'best-practices'],
          solved: false,
          pinned: true,
          featured: true,
          locked: false,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastActivity: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      // Note: This would normally use the createThread function, but for initialization we'll set directly
      localStorage.setItem('forum_threads', JSON.stringify(sampleThreads));
      window.location.reload(); // Refresh to load the new threads
    }
  }, [threads.length]);

  // Filter and sort threads
  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || thread.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'unanswered':
        return a.replies.length - b.replies.length;
      case 'recent':
      default:
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    }
  });

  // Separate pinned and regular threads
  const pinnedThreads = filteredThreads.filter(thread => thread.pinned);
  const regularThreads = filteredThreads.filter(thread => !thread.pinned);

  // Handle thread creation
  const handleCreateThread = () => {
    if (!newThread.title.trim() || !newThread.content.trim() || !newThread.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const thread = createThread({
      title: newThread.title,
      content: newThread.content,
      author: currentUser?.name || 'Anonymous',
      authorAvatar: currentUser?.avatar || '/api/placeholder/32/32',
      authorLevel: currentUser?.level || 'Beginner',
      authorBadge: currentUser?.badges[0] || '',
      category: newThread.category,
      tags: newThread.tags,
      solved: false,
      pinned: false,
      featured: false,
      locked: false,
    });

    setNewThread({ title: '', content: '', category: '', tags: [] });
    setIsCreateThreadOpen(false);
    toast({
      title: "Thread Created!",
      description: "Your thread has been posted successfully.",
    });
  };

  // Handle reply creation
  const handleCreateReply = (threadId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: "Empty Reply",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    addReply(threadId, {
      author: currentUser?.name || 'Anonymous',
      authorAvatar: currentUser?.avatar || '/api/placeholder/32/32',
      authorLevel: currentUser?.level || 'Beginner',
      content: replyContent,
    });

    setReplyContent('');
    setIsReplyOpen(null);
    toast({
      title: "Reply Posted!",
      description: "Your reply has been added to the thread.",
    });
  };

  // Handle thread view
  const handleViewThread = (thread: ForumThread) => {
    incrementViews(thread.id);
    setSelectedThread(thread);
  };

  // Utility functions
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "General Discussion": "bg-blue-500/10 text-blue-600",
      "Technical Support": "bg-green-500/10 text-green-600",
      "AI & Machine Learning": "bg-purple-500/10 text-purple-600",
      "Project Showcase": "bg-yellow-500/10 text-yellow-600",
      "Tutorials & Guides": "bg-indigo-500/10 text-indigo-600",
      "Accessibility & Ethics": "bg-red-500/10 text-red-600",
      "Mobile Development": "bg-cyan-500/10 text-cyan-600",
      "Research & Papers": "bg-pink-500/10 text-pink-600",
    };
    return colors[category] || "bg-gray-500/10 text-gray-600";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-500/10 text-purple-600";
      case "Advanced":
        return "bg-blue-500/10 text-blue-600";
      case "Intermediate":
        return "bg-green-500/10 text-green-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>
        {/* Header */}
        <section className='pt-32 pb-16'>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-4'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => navigate("/community")}
                  className='group'
                >
                  <ArrowLeft className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform' />
                  Back to Community
                </Button>
              </div>
              <div className='flex items-center gap-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
                >
                  {viewMode === 'card' ? <ListIcon className='w-4 h-4' /> : <Grid3X3 className='w-4 h-4' />}
                </Button>
                <Dialog open={isCreateThreadOpen} onOpenChange={setIsCreateThreadOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className='w-4 h-4 mr-2' />
                      New Thread
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                      <DialogTitle>Create New Thread</DialogTitle>
                      <DialogDescription>
                        Share your thoughts, ask questions, or start a discussion with the community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                          id='title'
                          placeholder='What would you like to discuss?'
                          value={newThread.title}
                          onChange={(e) => setNewThread(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor='category'>Category</Label>
                        <Select value={newThread.category} onValueChange={(value) => setNewThread(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                          <SelectContent>
                            {forumCategories.map(category => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor='content'>Content</Label>
                        <Textarea
                          id='content'
                          placeholder='Describe your question or share your thoughts...'
                          rows={6}
                          value={newThread.content}
                          onChange={(e) => setNewThread(prev => ({ ...prev, content: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor='tags'>Tags (optional)</Label>
                        <Input
                          id='tags'
                          placeholder='Add tags separated by commas'
                          value={newThread.tags.join(', ')}
                          onChange={(e) => setNewThread(prev => ({
                            ...prev,
                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                          }))}
                        />
                      </div>
                    </div>
                    <div className='flex justify-end gap-2 mt-6'>
                      <Button variant='outline' onClick={() => setIsCreateThreadOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateThread}>
                        Create Thread
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className='text-center'>
              <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-4'>
                Developer Forum
              </h1>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto mb-8'>
                Connect with fellow developers, share knowledge, and get help with CharadesAI integration.
              </p>

              {/* Search and Filters */}
              <div className='flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8'>
                <div className='flex-1 relative'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                  <Input
                    placeholder='Search threads, topics, or tags...'
                    className='pl-10'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className='w-full md:w-48'>
                    <SelectValue placeholder='All Categories' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    {forumCategories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className='w-full md:w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='recent'>Recent</SelectItem>
                    <SelectItem value='popular'>Popular</SelectItem>
                    <SelectItem value='unanswered'>Unanswered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary'>{threads.length}</div>
                  <div className='text-sm text-muted-foreground'>Threads</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary'>
                    {threads.reduce((acc, thread) => acc + thread.replies.length, 0)}
                  </div>
                  <div className='text-sm text-muted-foreground'>Replies</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary'>
                    {threads.reduce((acc, thread) => acc + thread.views, 0)}
                  </div>
                  <div className='text-sm text-muted-foreground'>Views</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary'>
                    {threads.filter(thread => thread.solved).length}
                  </div>
                  <div className='text-sm text-muted-foreground'>Solved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
              <TabsList className='grid w-full grid-cols-4 mb-8'>
                <TabsTrigger value='all'>All Threads</TabsTrigger>
                <TabsTrigger value='unanswered'>Unanswered</TabsTrigger>
                <TabsTrigger value='bookmarks'>Bookmarks</TabsTrigger>
                <TabsTrigger value='my-posts'>My Posts</TabsTrigger>
              </TabsList>

              <TabsContent value='all' className='space-y-6'>
                {/* Pinned Threads */}
                {pinnedThreads.length > 0 && (
                  <div className='space-y-4'>
                    <h3 className='text-lg font-semibold flex items-center gap-2'>
                      <Pin className='w-5 h-5 text-primary' />
                      Pinned Threads
                    </h3>
                    <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                      {pinnedThreads.map(thread => (
                        <Card key={thread.id} className='hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary' onClick={() => handleViewThread(thread)}>
                          <CardHeader>
                            <div className='flex items-start justify-between'>
                              <div className='flex-1'>
                                <CardTitle className='text-lg mb-2 line-clamp-2'>{thread.title}</CardTitle>
                                <div className='flex items-center gap-2 mb-2'>
                                  <Badge className={getCategoryColor(thread.category)}>
                                    {thread.category}
                                  </Badge>
                                  {thread.solved && <CheckCircle className='w-4 h-4 text-green-500' />}
                                  {thread.featured && <Star className='w-4 h-4 text-yellow-500' />}
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant='ghost' size='sm'>
                                    <MoreHorizontal className='w-4 h-4' />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleBookmark(thread.id, currentUser?.id || ''); }}>
                                    <Bookmark className='w-4 h-4 mr-2' />
                                    {bookmarks.some(b => b.threadId === thread.id) ? 'Remove Bookmark' : 'Bookmark'}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleLike(thread.id, currentUser?.id || ''); }}>
                                    <ThumbsUp className='w-4 h-4 mr-2' />
                                    Like ({thread.likes})
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); markAsSolved(thread.id); }}>
                                    <CheckCircle className='w-4 h-4 mr-2' />
                                    Mark as Solved
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className='text-muted-foreground mb-4 line-clamp-3'>{thread.content}</p>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-3'>
                                <Avatar className='w-8 h-8'>
                                  <AvatarImage src={thread.authorAvatar} />
                                  <AvatarFallback>{thread.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className='font-medium text-sm'>{thread.author}</div>
                                  <div className='text-xs text-muted-foreground'>{formatTimeAgo(thread.createdAt)}</div>
                                </div>
                              </div>
                              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                <span className='flex items-center gap-1'>
                                  <MessageSquare className='w-4 h-4' />
                                  {thread.replies.length}
                                </span>
                                <span className='flex items-center gap-1'>
                                  <Eye className='w-4 h-4' />
                                  {thread.views}
                                </span>
                                <span className='flex items-center gap-1'>
                                  <ThumbsUp className='w-4 h-4' />
                                  {thread.likes}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Threads */}
                <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {regularThreads.map(thread => (
                    <Card key={thread.id} className='hover:shadow-lg transition-shadow cursor-pointer' onClick={() => handleViewThread(thread)}>
                      <CardHeader>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <CardTitle className='text-lg mb-2 line-clamp-2'>{thread.title}</CardTitle>
                            <div className='flex items-center gap-2 mb-2'>
                              <Badge className={getCategoryColor(thread.category)}>
                                {thread.category}
                              </Badge>
                              {thread.solved && <CheckCircle className='w-4 h-4 text-green-500' />}
                              {thread.featured && <Star className='w-4 h-4 text-yellow-500' />}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='sm'>
                                <MoreHorizontal className='w-4 h-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleBookmark(thread.id, currentUser?.id || ''); }}>
                                <Bookmark className='w-4 h-4 mr-2' />
                                {bookmarks.some(b => b.threadId === thread.id) ? 'Remove Bookmark' : 'Bookmark'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleLike(thread.id, currentUser?.id || ''); }}>
                                <ThumbsUp className='w-4 h-4 mr-2' />
                                Like ({thread.likes})
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); markAsSolved(thread.id); }}>
                                <CheckCircle className='w-4 h-4 mr-2' />
                                Mark as Solved
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className='text-muted-foreground mb-4 line-clamp-3'>{thread.content}</p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='w-8 h-8'>
                              <AvatarImage src={thread.authorAvatar} />
                              <AvatarFallback>{thread.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium text-sm'>{thread.author}</div>
                              <div className='text-xs text-muted-foreground'>{formatTimeAgo(thread.createdAt)}</div>
                            </div>
                          </div>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='w-4 h-4' />
                              {thread.replies.length}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Eye className='w-4 h-4' />
                              {thread.views}
                            </span>
                            <span className='flex items-center gap-1'>
                              <ThumbsUp className='w-4 h-4' />
                              {thread.likes}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredThreads.length === 0 && (
                  <div className='text-center py-12'>
                    <MessageSquare className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-xl font-semibold mb-2'>No threads found</h3>
                    <p className='text-muted-foreground mb-4'>Try adjusting your search or filters, or create a new thread.</p>
                    <Button onClick={() => setIsCreateThreadOpen(true)}>
                      <Plus className='w-4 h-4 mr-2' />
                      Create Thread
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value='unanswered'>
                <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {threads.filter(thread => !thread.solved && thread.replies.length === 0).map(thread => (
                    <Card key={thread.id} className='hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500' onClick={() => handleViewThread(thread)}>
                      <CardHeader>
                        <CardTitle className='text-lg'>{thread.title}</CardTitle>
                        <div className='flex items-center gap-2'>
                          <Badge className={getCategoryColor(thread.category)}>
                            {thread.category}
                          </Badge>
                          <span className='text-sm text-muted-foreground'>No replies yet</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className='text-muted-foreground mb-4 line-clamp-3'>{thread.content}</p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='w-8 h-8'>
                              <AvatarImage src={thread.authorAvatar} />
                              <AvatarFallback>{thread.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium text-sm'>{thread.author}</div>
                              <div className='text-xs text-muted-foreground'>{formatTimeAgo(thread.createdAt)}</div>
                            </div>
                          </div>
                          <Button size='sm' onClick={(e) => { e.stopPropagation(); setIsReplyOpen(thread.id); }}>
                            <Reply className='w-4 h-4 mr-2' />
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='bookmarks'>
                <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {threads.filter(thread => bookmarks.some(b => b.threadId === thread.id)).map(thread => (
                    <Card key={thread.id} className='hover:shadow-lg transition-shadow cursor-pointer' onClick={() => handleViewThread(thread)}>
                      <CardHeader>
                        <CardTitle className='text-lg flex items-center gap-2'>
                          <Bookmark className='w-4 h-4 text-primary' />
                          {thread.title}
                        </CardTitle>
                        <Badge className={getCategoryColor(thread.category)}>
                          {thread.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className='text-muted-foreground mb-4 line-clamp-3'>{thread.content}</p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='w-8 h-8'>
                              <AvatarImage src={thread.authorAvatar} />
                              <AvatarFallback>{thread.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium text-sm'>{thread.author}</div>
                              <div className='text-xs text-muted-foreground'>{formatTimeAgo(thread.createdAt)}</div>
                            </div>
                          </div>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='w-4 h-4' />
                              {thread.replies.length}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Eye className='w-4 h-4' />
                              {thread.views}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {threads.filter(thread => bookmarks.some(b => b.threadId === thread.id)).length === 0 && (
                  <div className='text-center py-12'>
                    <Bookmark className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-xl font-semibold mb-2'>No bookmarked threads</h3>
                    <p className='text-muted-foreground'>Bookmark threads to find them easily later.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value='my-posts'>
                <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {threads.filter(thread => thread.author === currentUser?.name).map(thread => (
                    <Card key={thread.id} className='hover:shadow-lg transition-shadow cursor-pointer' onClick={() => handleViewThread(thread)}>
                      <CardHeader>
                        <CardTitle className='text-lg'>{thread.title}</CardTitle>
                        <Badge className={getCategoryColor(thread.category)}>
                          {thread.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className='text-muted-foreground mb-4 line-clamp-3'>{thread.content}</p>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='w-8 h-8'>
                              <AvatarImage src={thread.authorAvatar} />
                              <AvatarFallback>{thread.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium text-sm'>{thread.author}</div>
                              <div className='text-xs text-muted-foreground'>{formatTimeAgo(thread.createdAt)}</div>
                            </div>
                          </div>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='w-4 h-4' />
                              {thread.replies.length}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Eye className='w-4 h-4' />
                              {thread.views}
                            </span>
                            <span className='flex items-center gap-1'>
                              <ThumbsUp className='w-4 h-4' />
                              {thread.likes}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {threads.filter(thread => thread.author === currentUser?.name).length === 0 && (
                  <div className='text-center py-12'>
                    <User className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-xl font-semibold mb-2'>No posts yet</h3>
                    <p className='text-muted-foreground mb-4'>Start a conversation by creating your first thread.</p>
                    <Button onClick={() => setIsCreateThreadOpen(true)}>
                      <Plus className='w-4 h-4 mr-2' />
                      Create Thread
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Thread Detail Modal */}
        {selectedThread && (
          <Dialog open={!!selectedThread} onOpenChange={() => setSelectedThread(null)}>
            <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <DialogTitle className='text-2xl mb-2'>{selectedThread.title}</DialogTitle>
                    <div className='flex items-center gap-2 mb-4'>
                      <Badge className={getCategoryColor(selectedThread.category)}>
                        {selectedThread.category}
                      </Badge>
                      {selectedThread.solved && <CheckCircle className='w-4 h-4 text-green-500' />}
                      {selectedThread.featured && <Star className='w-4 h-4 text-yellow-500' />}
                      {selectedThread.pinned && <Pin className='w-4 h-4 text-primary' />}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <MoreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => toggleBookmark(selectedThread.id, currentUser?.id || '')}>
                        <Bookmark className='w-4 h-4 mr-2' />
                        {bookmarks.some(b => b.threadId === selectedThread.id) ? 'Remove Bookmark' : 'Bookmark'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleLike(selectedThread.id, currentUser?.id || '')}>
                        <ThumbsUp className='w-4 h-4 mr-2' />
                        Like ({selectedThread.likes})
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => markAsSolved(selectedThread.id)}>
                        <CheckCircle className='w-4 h-4 mr-2' />
                        Mark as Solved
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </DialogHeader>

              {/* Original Post */}
              <div className='border rounded-lg p-6 mb-6'>
                <div className='flex items-start gap-4'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src={selectedThread.authorAvatar} />
                    <AvatarFallback>{selectedThread.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='font-semibold'>{selectedThread.author}</span>
                      <Badge className={getLevelColor(selectedThread.authorLevel)}>
                        {selectedThread.authorLevel}
                      </Badge>
                      {selectedThread.authorBadge && (
                        <Badge variant='secondary'>{selectedThread.authorBadge}</Badge>
                      )}
                    </div>
                    <p className='text-muted-foreground mb-4'>{formatTimeAgo(selectedThread.createdAt)}</p>
                    <div className='prose prose-sm max-w-none mb-4'>
                      {selectedThread.content}
                    </div>
                    {selectedThread.tags.length > 0 && (
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {selectedThread.tags.map(tag => (
                          <Badge key={tag} variant='outline' className='text-xs'>
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className='flex items-center gap-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => toggleLike(selectedThread.id, currentUser?.id || '')}
                        className={selectedThread.likedBy.includes(currentUser?.id || '') ? 'text-primary' : ''}
                      >
                        <ThumbsUp className='w-4 h-4 mr-2' />
                        {selectedThread.likes}
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setIsReplyOpen(selectedThread.id)}
                      >
                        <Reply className='w-4 h-4 mr-2' />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies */}
              <div className='space-y-4 mb-6'>
                <h3 className='text-lg font-semibold'>{selectedThread.replies.length} Replies</h3>
                {selectedThread.replies.map(reply => (
                  <div key={reply.id} className='border rounded-lg p-4'>
                    <div className='flex items-start gap-4'>
                      <Avatar className='w-10 h-10'>
                        <AvatarImage src={reply.authorAvatar} />
                        <AvatarFallback>{reply.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <span className='font-semibold'>{reply.author}</span>
                          <Badge className={getLevelColor(reply.authorLevel)}>
                            {reply.authorLevel}
                          </Badge>
                        </div>
                        <p className='text-muted-foreground text-sm mb-2'>{formatTimeAgo(reply.timestamp)}</p>
                        <div className='prose prose-sm max-w-none mb-3'>
                          {reply.content}
                        </div>
                        <div className='flex items-center gap-4'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => {/* TODO: Implement reply like */}}
                          >
                            <ThumbsUp className='w-4 h-4 mr-2' />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              {isReplyOpen === selectedThread.id && (
                <div className='border rounded-lg p-4'>
                  <h4 className='font-semibold mb-4'>Write a Reply</h4>
                  <Textarea
                    placeholder='Share your thoughts...'
                    rows={4}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className='mb-4'
                  />
                  <div className='flex justify-end gap-2'>
                    <Button variant='outline' onClick={() => { setIsReplyOpen(null); setReplyContent(''); }}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleCreateReply(selectedThread.id)}>
                      <Send className='w-4 h-4 mr-2' />
                      Post Reply
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default Forum;