'use client';

import React from 'react';
import { AuthBrandingPanel } from '@/features/auth/components/auth-branding-panel';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-[100dvh] flex bg-background selection:bg-primary/20">
      {/* Left Form Area (45% on Desktop) */}
      <div className="w-full lg:w-[45%] flex flex-col relative z-10 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        {/* Back to website button */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-all duration-300 px-3 py-2 rounded-full hover:bg-muted/50 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Website
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:px-16 overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Right Branding Area (55% on Desktop, hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex w-[55%] relative flex-col">
        <AuthBrandingPanel />
      </div>
    </div>
  );
}
