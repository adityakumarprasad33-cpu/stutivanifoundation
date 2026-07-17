'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <AlertTriangle className="h-24 w-24 text-destructive mb-8 opacity-80" />
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We apologize, but an unexpected error has occurred on our end. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try Again
        </Button>
        <Button asChild variant="outline">
          <a href="/">Return to Homepage</a>
        </Button>
      </div>
    </div>
  );
}
