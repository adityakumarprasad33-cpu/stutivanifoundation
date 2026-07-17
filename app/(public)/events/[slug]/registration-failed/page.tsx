import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Registration Failed | Stuti-Vani Foundation',
};

export const dynamic = 'force-dynamic';

export default function RegistrationFailedPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <Card className="text-center shadow-lg border-t-8 border-t-red-500 overflow-hidden">
        <div className="bg-red-50 py-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-3xl text-red-700">Registration Failed</CardTitle>
          <CardDescription className="text-lg mt-2">
            We encountered an issue processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <p className="text-slate-600">
            Please double-check your information or try again in a few minutes. If the problem persists, feel free to contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild variant="default">
              <Link href="/events">Try Again</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
