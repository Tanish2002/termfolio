'use client'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isFirstVisit, markAsVisited } from '@/utils/firstVisit';

export function FirstVisitToast() {
  const router = useRouter();

  useEffect(() => {
    if (isFirstVisit()) {
      markAsVisited();
      toast.custom((t: any) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } bg-tokyo-night-background border border-tokyo-night-blue p-4 rounded shadow-lg`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h3 className="text-tokyo-night-cyan font-medium">Welcome!</h3>
              <p className="mt-1 text-sm text-tokyo-night-foreground">
                Using default font and theme.
              </p>
              <p className="text-sm text-tokyo-night-foreground">
                Having trouble reading? Customize display settings
              </p>
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                router.push('/settings');
              }}
              className="px-3 py-2 bg-tokyo-night-cyan text-tokyo-night-background rounded hover:opacity-90 transition-opacity text-sm"
            >
              Settings
            </button>
          </div>
        </div>
      ));
    }
  }, [router]);
  return null;
}
