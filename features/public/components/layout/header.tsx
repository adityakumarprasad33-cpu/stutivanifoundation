'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PUBLIC_NAV } from '@/config/public-nav';
import { Button } from '@/components/ui/button';
import { SearchButton } from './search-button';
import { ThemeToggle } from './theme-toggle';
import { MobileNavigation } from './mobile-navigation';
import { Heart } from 'lucide-react';
// import { BrandLogo } from '@/features/branding/components/brand-logo'; // Assuming this exists

import Image from 'next/image';
import { Container } from '@/components/layout/container';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Stuti-Vani Foundation" 
              width={160} 
              height={40} 
              className="h-10 w-auto object-contain transition-all dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {PUBLIC_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith(item.href) && item.href !== '/' ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <SearchButton />
            <ThemeToggle />
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/volunteer">Volunteer</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/donate">
                <Heart className="mr-2 h-4 w-4" />
                Donate
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  );
}
