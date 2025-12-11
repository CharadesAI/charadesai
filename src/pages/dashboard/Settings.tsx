import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Bell,
  Shield,
  Key,
  Globe,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [showApiKey, setShowApiKey] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
    usageAlerts: true,
  });

  // Demo API key (would come from API in real implementation)
  const apiKey = "sk_live_charades_" + "x".repeat(32);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard!");
  };

  const handleRegenerateKey = async () => {
    setIsRegenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRegenerating(false);
    toast.success("API key regenerated successfully!");
  };

  return (
    <DashboardLayout>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold'>Settings</h1>
          <p className='text-muted-foreground mt-1'>
            Manage your account settings and preferences
          </p>
        </div>

        {/* API Keys */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Key className='w-5 h-5 text-neon-cyan' />
              API Keys
            </CardTitle>
            <CardDescription>
              Manage your API keys for authentication
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label>Production API Key</Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className='pr-10 font-mono text-sm bg-muted/30'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7'
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </Button>
                </div>
                <Button
                  variant='heroOutline'
                  size='icon'
                  onClick={handleCopyApiKey}
                >
                  <Copy className='w-4 h-4' />
                </Button>
              </div>
              <p className='text-xs text-muted-foreground'>
                Keep this key secret. Do not share it or expose it in
                client-side code.
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='destructive'
                  size='sm'
                  disabled={isRegenerating}
                >
                  {isRegenerating ? (
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  ) : (
                    <RefreshCw className='w-4 h-4 mr-2' />
                  )}
                  Regenerate Key
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Regenerate API Key?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will invalidate your current API key. All applications
                    using the old key will stop working immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRegenerateKey}>
                    Regenerate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Moon className='w-5 h-5 text-neon-violet' />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how CharadesAI looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Label>Theme</Label>
              <div className='grid grid-cols-3 gap-3'>
                {[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setTheme(option.value as "light" | "dark" | "system")
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                      theme === option.value
                        ? "border-neon-cyan bg-neon-cyan/10"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <option.icon
                      className={cn(
                        "w-6 h-6",
                        theme === option.value
                          ? "text-neon-cyan"
                          : "text-muted-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        theme === option.value && "text-neon-cyan"
                      )}
                    >
                      {option.label}
                    </span>
                    {theme === option.value && (
                      <CheckCircle className='w-4 h-4 text-neon-cyan' />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Bell className='w-5 h-5 text-neon-emerald' />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {[
              {
                key: "email",
                title: "Email Notifications",
                description: "Receive important updates via email",
              },
              {
                key: "push",
                title: "Push Notifications",
                description: "Receive notifications in your browser",
              },
              {
                key: "usageAlerts",
                title: "Usage Alerts",
                description: "Get notified when approaching API limits",
              },
              {
                key: "marketing",
                title: "Marketing Emails",
                description: "Receive news, tips, and product updates",
              },
            ].map((item) => (
              <div
                key={item.key}
                className='flex items-center justify-between py-2'
              >
                <div>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: checked,
                    }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='w-5 h-5 text-yellow-500' />
              Language & Region
            </CardTitle>
            <CardDescription>
              Set your language and regional preferences
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label>Language</Label>
                <Select defaultValue='en'>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='es'>Español</SelectItem>
                    <SelectItem value='fr'>Français</SelectItem>
                    <SelectItem value='de'>Deutsch</SelectItem>
                    <SelectItem value='ja'>日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Timezone</Label>
                <Select defaultValue='utc'>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='utc'>UTC</SelectItem>
                    <SelectItem value='est'>Eastern Time (EST)</SelectItem>
                    <SelectItem value='pst'>Pacific Time (PST)</SelectItem>
                    <SelectItem value='gmt'>GMT</SelectItem>
                    <SelectItem value='cet'>Central European (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='w-5 h-5 text-red-500' />
              Security
            </CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center justify-between py-2'>
              <div>
                <p className='font-medium'>Two-Factor Authentication</p>
                <p className='text-sm text-muted-foreground'>
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant='heroOutline' size='sm'>
                Enable 2FA
              </Button>
            </div>

            <Separator />

            <div className='flex items-center justify-between py-2'>
              <div>
                <p className='font-medium'>Change Password</p>
                <p className='text-sm text-muted-foreground'>
                  Update your password regularly for better security
                </p>
              </div>
              <Button variant='heroOutline' size='sm'>
                Change
              </Button>
            </div>

            <Separator />

            <div className='flex items-center justify-between py-2'>
              <div>
                <p className='font-medium'>Active Sessions</p>
                <p className='text-sm text-muted-foreground'>
                  Manage devices where you're logged in
                </p>
              </div>
              <Button variant='ghost' size='sm'>
                View Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className='flex justify-end'>
          <Button
            variant='hero'
            onClick={() => toast.success("Settings saved successfully!")}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
