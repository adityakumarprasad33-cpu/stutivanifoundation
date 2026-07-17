'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { PUBLIC_NAV } from '@/config/public-nav';
import Link from 'next/link';

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-1 text-lg font-semibold"
            >
              {item.title}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" asChild className="w-full justify-start" onClick={() => setOpen(false)}>
              <Link href="/volunteer">Volunteer</Link>
            </Button>
            <Button asChild className="w-full justify-start" onClick={() => setOpen(false)}>
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
