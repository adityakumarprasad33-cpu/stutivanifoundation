import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function DonationPendingPage() {
  return (
    <div className="container mx-auto py-24 px-4 text-center max-w-lg">
      <Clock className="mx-auto h-24 w-24 text-amber-500 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4">Payment Pending</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your payment is currently being processed by the gateway. This can sometimes take a few minutes. We will email you once it's confirmed.
      </p>
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
