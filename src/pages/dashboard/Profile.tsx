import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/lib/AuthContext";
import { useProfile, useUpdateProfile, useUploadAvatar } from "@/hooks/use-api";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  Camera,
  Mail,
  User,
  Calendar,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { user, login, token } = useAuth();
  const { data: profile, isLoading, error } = useProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Initialize form when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(formData);
      // Update local auth context
      if (token) {
        login(token, { ...user, ...formData });
      }
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update profile"
      );
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      const result = await uploadAvatar.mutateAsync(file);
      if (token && result.data?.avatar) {
        login(token, { ...user, avatar: result.data.avatar });
      }
      toast.success("Avatar updated successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to upload avatar"
      );
    }
  };

  const displayProfile = profile || {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || null,
    email_verified_at: null,
    created_at: new Date().toISOString(),
    current_plan: "Pro",
  };

  const userInitials =
    displayProfile.first_name && displayProfile.last_name
      ? `${displayProfile.first_name[0]}${displayProfile.last_name[0]}`
      : displayProfile.username?.slice(0, 2).toUpperCase() || "U";

  if (error) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-[50vh]'>
          <div className='text-center'>
            <AlertCircle className='w-12 h-12 mx-auto text-red-500 mb-4' />
            <h2 className='text-xl font-semibold mb-2'>
              Error loading profile
            </h2>
            <p className='text-muted-foreground'>
              {error instanceof Error ? error.message : "Please try again"}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Profile Header */}
        <Card className='bg-card/80 backdrop-blur-md border-border overflow-hidden'>
          {/* Banner */}
          <div className='h-32 bg-gradient-to-r from-neon-cyan/20 via-neon-violet/20 to-pink-500/20' />

          <CardContent className='relative pt-0 pb-6'>
            {/* Avatar */}
            <div className='absolute -top-16 left-6'>
              <div className='relative group'>
                {isLoading ? (
                  <Skeleton className='w-32 h-32 rounded-full' />
                ) : (
                  <>
                    <Avatar className='w-32 h-32 border-4 border-background shadow-xl'>
                      <AvatarImage src={displayProfile.avatar || ""} />
                      <AvatarFallback className='bg-neon-cyan/20 text-neon-cyan text-3xl font-bold'>
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      onClick={handleAvatarClick}
                      disabled={uploadAvatar.isPending}
                      className={cn(
                        "absolute bottom-2 right-2 w-10 h-10 rounded-full bg-neon-cyan text-black flex items-center justify-center",
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        "hover:bg-neon-cyan/80 disabled:opacity-50"
                      )}
                    >
                      {uploadAvatar.isPending ? (
                        <Loader2 className='w-5 h-5 animate-spin' />
                      ) : (
                        <Camera className='w-5 h-5' />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleAvatarChange}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Info & Actions */}
            <div className='pt-4 md:ml-40 md:pt-0 mt-6 md:mt-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
              <div>
                {isLoading ? (
                  <>
                    <Skeleton className='h-8 w-48 mb-2' />
                    <Skeleton className='h-4 w-32' />
                  </>
                ) : (
                  <>
                    <h1 className='text-2xl font-bold'>
                      {displayProfile.first_name
                        ? `${displayProfile.first_name} ${displayProfile.last_name}`
                        : displayProfile.username}
                    </h1>
                    <p className='text-muted-foreground'>
                      @{displayProfile.username}
                    </p>
                  </>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className='bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'
                >
                  {displayProfile.current_plan} Plan
                </Badge>
                {displayProfile.email_verified_at && (
                  <Badge
                    variant='secondary'
                    className='bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30'
                  >
                    <CheckCircle className='w-3 h-3 mr-1' />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className='bg-card/80 backdrop-blur-md border-border'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button variant='heroOutline' onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className='flex gap-2'>
                <Button
                  variant='ghost'
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      first_name: displayProfile.first_name || "",
                      last_name: displayProfile.last_name || "",
                      username: displayProfile.username || "",
                      email: displayProfile.email || "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='hero'
                  onClick={handleSave}
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? (
                    <>
                      <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className='space-y-6'>
            {isLoading ? (
              <div className='space-y-4'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-10 w-full' />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className='grid gap-6 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='first_name'>First Name</Label>
                    {isEditing ? (
                      <Input
                        id='first_name'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className='bg-background/50'
                      />
                    ) : (
                      <div className='flex items-center gap-2 p-3 rounded-md bg-muted/30'>
                        <User className='w-4 h-4 text-muted-foreground' />
                        <span>
                          {displayProfile.first_name || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='last_name'>Last Name</Label>
                    {isEditing ? (
                      <Input
                        id='last_name'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className='bg-background/50'
                      />
                    ) : (
                      <div className='flex items-center gap-2 p-3 rounded-md bg-muted/30'>
                        <User className='w-4 h-4 text-muted-foreground' />
                        <span>
                          {displayProfile.last_name || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='username'>Username</Label>
                  {isEditing ? (
                    <Input
                      id='username'
                      name='username'
                      value={formData.username}
                      onChange={handleInputChange}
                      className='bg-background/50'
                    />
                  ) : (
                    <div className='flex items-center gap-2 p-3 rounded-md bg-muted/30'>
                      <span className='text-muted-foreground'>@</span>
                      <span>{displayProfile.username}</span>
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  {isEditing ? (
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='bg-background/50'
                    />
                  ) : (
                    <div className='flex items-center gap-2 p-3 rounded-md bg-muted/30'>
                      <Mail className='w-4 h-4 text-muted-foreground' />
                      <span>{displayProfile.email}</span>
                      {displayProfile.email_verified_at && (
                        <CheckCircle className='w-4 h-4 text-neon-emerald ml-auto' />
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            <Separator />

            {/* Account Info */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='flex items-center gap-3 p-4 rounded-lg bg-muted/30'>
                <Calendar className='w-5 h-5 text-muted-foreground' />
                <div>
                  <p className='text-sm text-muted-foreground'>Member Since</p>
                  <p className='font-medium'>
                    {new Date(displayProfile.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 rounded-lg bg-muted/30'>
                <Shield className='w-5 h-5 text-muted-foreground' />
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Account Status
                  </p>
                  <p className='font-medium text-neon-emerald'>Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className='bg-card/80 backdrop-blur-md border-red-500/30'>
          <CardHeader>
            <CardTitle className='text-red-500'>Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that affect your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className='bg-red-500 hover:bg-red-600'>
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Mobile avatar (in-flow, centered) */}
        <div className='md:hidden flex justify-center mt-4'>
          <div className='relative group'>
            {isLoading ? (
              <Skeleton className='w-24 h-24 rounded-full' />
            ) : (
              <>
                <Avatar className='w-24 h-24 border-4 border-background shadow-lg'>
                  <AvatarImage src={displayProfile.avatar || ""} />
                  <AvatarFallback className='bg-neon-cyan/20 text-neon-cyan text-2xl font-bold'>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarClick}
                  disabled={uploadAvatar.isPending}
                  className={cn(
                    "absolute bottom-0 right-0 w-9 h-9 rounded-full bg-neon-cyan text-black flex items-center justify-center",
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    "hover:bg-neon-cyan/80 disabled:opacity-50"
                  )}
                >
                  {uploadAvatar.isPending ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Camera className='w-4 h-4' />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
