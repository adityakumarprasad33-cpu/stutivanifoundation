import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'My Profile | Volunteer Portal',
  description: 'Manage your volunteer profile.',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information and volunteer settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>This information is used to communicate with you regarding assignments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+91 9876543210" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verified Identity (Read-Only)</CardTitle>
          <CardDescription>To update verified fields, please submit an approval request to the administration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="volunteerNumber">Volunteer ID</Label>
              <Input id="volunteerNumber" defaultValue="VOL-2026-0012" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="govId">Government ID</Label>
              <Input id="govId" defaultValue="XXXX-XXXX-1234" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Verification Status</Label>
            <div className="flex items-center space-x-2 mt-1 text-sm font-medium text-green-700 bg-green-100 w-max px-3 py-1 rounded-md">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
              <span>Fully Verified</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
