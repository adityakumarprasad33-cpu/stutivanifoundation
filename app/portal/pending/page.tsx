'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, LogOut } from 'lucide-react';
import { authService } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';

export default function PortalPendingPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md w-full bg-background rounded-3xl p-8 shadow-elevation border text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Clock className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Application Under Review</h1>
          <p className="text-muted-foreground text-sm">
            Your volunteer application is currently pending approval by our administrative team. 
            Once approved, you will gain full access to the Volunteer Portal.
          </p>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-xl border text-sm text-left">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold text-amber-500">Pending Verification</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Estimated Time</span>
            <span className="font-medium">1-3 Business Days</span>
          </div>
        </div>
        
        <div className="pt-4">
          <Button onClick={handleLogout} variant="outline" className="w-full h-12 rounded-xl text-base font-medium">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
