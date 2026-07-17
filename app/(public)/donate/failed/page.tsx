import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function DonationFailedPage() {
  return (
    <div className="container mx-auto py-24 px-4 text-center max-w-lg">
      <XCircle className="mx-auto h-24 w-24 text-destructive mb-6" />
      <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We could not process your donation. No charges were made to your account. Please try again or use a different payment method.
      </p>
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/donate">Try Again</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
