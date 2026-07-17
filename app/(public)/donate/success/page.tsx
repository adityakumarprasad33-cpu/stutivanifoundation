import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function DonationSuccessPage() {
  return (
    <div className="container mx-auto py-24 px-4 text-center max-w-lg">
      <CheckCircle2 className="mx-auto h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your donation has been successfully processed. An email with your receipt and 80G certificate (if requested) is on its way.
      </p>
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/dashboard">Go to Donor Dashboard</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
