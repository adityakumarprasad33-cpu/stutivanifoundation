import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, QrCode, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Registration Successful | Stuti-Vani Foundation',
};

export const dynamic = 'force-dynamic';

export default function RegistrationSuccessPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <Card className="text-center shadow-xl border-t-8 border-t-green-500 overflow-hidden">
        <div className="bg-green-50 py-8 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl text-green-700">Registration Confirmed!</CardTitle>
          <CardDescription className="text-lg mt-2">
            You have successfully secured your spot. A confirmation email has been sent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          <div className="bg-slate-50 rounded-lg p-6 flex flex-col items-center border border-slate-100">
            <QrCode className="h-48 w-48 text-slate-800 mb-4" />
            <p className="text-sm text-slate-500 font-medium">Your Official QR Entry Pass</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">Please present this QR code at the check-in desk upon arrival.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/events">Browse More Events</Link>
            </Button>
            <Button asChild>
              <Link href="/portal">View in Volunteer Portal</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
