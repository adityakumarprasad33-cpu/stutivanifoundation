import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Registration Pending | Stuti-Vani Foundation',
};

export const dynamic = 'force-dynamic';

export default function RegistrationPendingPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <Card className="text-center shadow-lg border-t-8 border-t-yellow-500 overflow-hidden">
        <div className="bg-yellow-50 py-8 flex justify-center">
          <div className="rounded-full bg-yellow-100 p-4">
            <Clock className="h-16 w-16 text-yellow-600" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-3xl text-yellow-700">You're on the Waitlist</CardTitle>
          <CardDescription className="text-lg mt-2">
            The event has currently reached its maximum capacity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 text-left">
          <p className="text-slate-600">
            We have securely recorded your registration and placed you on the waitlist. If a confirmed attendee cancels their reservation, seats will be allocated automatically based on queue position.
          </p>
          <div className="bg-slate-50 p-4 rounded text-center border font-medium text-slate-700">
            We will notify you via email immediately if a spot becomes available.
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link href="/events">Explore Other Events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
