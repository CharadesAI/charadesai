import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  User,
  CreditCard,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Zap,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Results",
    href: "/dashboard/results",
    icon: Sparkles,
  },
];

const secondaryNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "API Docs",
    href: "/api",
    icon: ExternalLink,
    external: true,
  },
  {
    title: "Help Center",
    href: "/contact",
    icon: HelpCircle,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userInitials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user?.username?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className='min-h-screen bg-background flex'>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-card/80 backdrop-blur-xl border-r border-border transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className='h-16 flex items-center justify-between px-4 border-b border-border'>
          {!sidebarCollapsed && (
            <NavLink to='/' className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-lg bg-gradient-ai flex items-center justify-center'>
                <Zap className='w-5 h-5 text-white' />
              </div>
              <span className='font-bold text-lg text-gradient'>
                CharadesAI
              </span>
            </NavLink>
          )}
          <Button
            variant='ghost'
            size='icon'
            className='hidden lg:flex'
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                sidebarCollapsed && "rotate-180"
              )}
            />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='lg:hidden'
            onClick={() => setMobileMenuOpen(false)}
          >
            <ChevronLeft className='w-4 h-4' />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className='flex-1 py-4'>
          <nav className='space-y-1 px-2'>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className='w-5 h-5 flex-shrink-0' />
                {!sidebarCollapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>

          <Separator className='my-4 mx-4' />

          <nav className='space-y-1 px-2'>
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive && !item.external
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className='w-5 h-5 flex-shrink-0' />
                {!sidebarCollapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className='p-4 border-t border-border'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  "w-full justify-start gap-3 px-2",
                  sidebarCollapsed && "justify-center"
                )}
              >
                <Avatar className='w-8 h-8'>
                  <AvatarImage src={user?.avatar || ""} />
                  <AvatarFallback className='bg-neon-cyan/20 text-neon-cyan text-xs'>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className='flex-1 text-left'>
                    <p className='text-sm font-medium truncate'>
                      {user?.first_name
                        ? `${user.first_name} ${user.last_name || ""}`
                        : user?.username || "User"}
                    </p>
                    <p className='text-xs text-muted-foreground truncate'>
                      {user?.email}
                    </p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                <User className='w-4 h-4 mr-2' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <Settings className='w-4 h-4 mr-2' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className='text-red-500'>
                <LogOut className='w-4 h-4 mr-2' />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Top Header */}
        <header className='h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30'>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden'
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className='w-5 h-5' />
            </Button>
            <div className='hidden sm:block'>
              <h1 className='text-lg font-semibold'>
                {navItems.find(
                  (item) =>
                    location.pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      location.pathname.startsWith(item.href))
                )?.title ||
                  secondaryNavItems.find((item) =>
                    location.pathname.startsWith(item.href)
                  )?.title ||
                  "Dashboard"}
              </h1>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <Button
              variant='heroOutline'
              size='sm'
              className='hidden sm:flex'
              onClick={() => navigate("/pricing")}
            >
              Upgrade Plan
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 p-4 lg:p-8 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}
