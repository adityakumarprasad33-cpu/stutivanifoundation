import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const metadata = {
  title: 'Register for Event | Stuti-Vani Foundation',
  description: 'Secure your spot for the upcoming event.',
};

export default function EventRegistrationPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Register for Event</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Complete the form below to secure your spot. Logged-in volunteers will have their details pre-filled.
        </p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-primary-600">
        <CardHeader>
          <CardTitle>Attendee Information</CardTitle>
          <CardDescription>All fields marked with an asterisk (*) are required.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <input 
              id="fullName" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              placeholder="e.g. Your Full Name"
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <input 
                id="email" 
                type="email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <input 
                id="phone" 
                type="tel" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t flex justify-end py-4 rounded-b-lg">
          <Button className="w-full sm:w-auto" size="lg">Confirm Registration</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
