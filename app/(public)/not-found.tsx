import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <FileQuestion className="h-24 w-24 text-muted-foreground mb-8 opacity-50" />
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
