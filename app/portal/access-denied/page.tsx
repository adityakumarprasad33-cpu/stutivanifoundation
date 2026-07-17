'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert, LogOut, Mail } from 'lucide-react';
import { authService } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';
import { BRANDING } from '@/constants/branding';

export default function PortalAccessDeniedPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md w-full bg-background rounded-3xl p-8 shadow-elevation border text-center space-y-6">
        <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-muted-foreground text-sm">
            Your volunteer account has been suspended or your application was not approved. You do not have permission to access the portal.
          </p>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-xl border text-sm text-left">
          <p className="text-muted-foreground mb-4">
            If you believe this is a mistake or require further clarification, please contact our support team.
          </p>
          <Button variant="secondary" className="w-full h-10 rounded-lg text-sm" asChild>
            <a href={`mailto:${BRANDING.CONTACT.EMAIL}`}>
              <Mail className="w-4 h-4 mr-2" /> Contact Support
            </a>
          </Button>
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
