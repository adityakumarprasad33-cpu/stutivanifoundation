'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export default function DonorProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your contact details and tax information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" defaultValue={user?.displayName?.split(' ')[0] || ''} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="lastName" defaultValue={user?.displayName?.split(' ').slice(1).join(' ') || ''} className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" defaultValue={user?.email || ''} className="pl-9" disabled />
                </div>
                <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" defaultValue={user?.phoneNumber || ''} className="pl-9" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number (For 80G Exemption)</Label>
                <Input id="panNumber" placeholder="ABCDE1234F" className="uppercase" />
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-900/50 flex justify-end py-4 rounded-b-xl border-t border-rose-100 dark:border-rose-900/30">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm bg-rose-50/50 dark:bg-rose-900/10">
            <CardHeader>
              <CardTitle className="text-lg">Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email-updates" className="rounded text-rose-600 focus:ring-rose-500" defaultChecked />
                <label htmlFor="email-updates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Updates
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sms-updates" className="rounded text-rose-600 focus:ring-rose-500" />
                <label htmlFor="sms-updates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  SMS Notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="anon-donations" className="rounded text-rose-600 focus:ring-rose-500" />
                <label htmlFor="anon-donations" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Make donations anonymous
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
