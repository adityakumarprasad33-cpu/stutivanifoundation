import React from 'react';
import { AnnouncementBar } from '@/features/public/components/layout/announcement-bar';
import { Header } from '@/features/public/components/layout/header';
import { Footer } from '@/features/public/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative flex min-h-screen flex-col bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
