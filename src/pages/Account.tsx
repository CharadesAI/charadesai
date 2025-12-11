import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    navigate('/signin');
    return null;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-8'>
      <div className='w-full max-w-2xl rounded-2xl bg-card/90 p-8 border border-border/50 shadow-lg'>
        <h2 className='text-2xl font-bold mb-4'>Account</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='col-span-1 flex items-center justify-center'>
            <div className='w-28 h-28 rounded-full bg-muted overflow-hidden flex items-center justify-center'>
              {auth.user?.avatar ? (
                <img src={auth.user.avatar} alt={auth.user?.first_name || auth.user?.username} className='w-full h-full object-cover' />
              ) : (
                <span className='text-3xl font-bold'>{(auth.user?.first_name || auth.user?.username || "U").charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
          <div className='col-span-2'>
            <div className='mb-4'>
              <h3 className='text-xl font-semibold'>
                {auth.user?.first_name} {auth.user?.last_name}
              </h3>
              <div className='text-sm text-muted-foreground'>{auth.user?.email}</div>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => navigate('/pricing')}>Manage Plan</Button>
              <Button variant='ghost' onClick={async () => { await auth.logout(); navigate('/'); }}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
