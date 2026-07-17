import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Assignments | Volunteer Portal',
  description: 'View your program and event assignments.',
};

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
        <p className="text-muted-foreground mt-2">View the programs and events you are assigned to.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Assignments</CardTitle>
            <CardDescription>You have 2 active assignments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">Healthcare Camp 2026</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Event</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" /> Aug 15, 2026
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" /> Rural District Center
                </p>
                <p className="text-sm font-medium mt-2">Role: Registration Desk Coordinator</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1.5 rounded-md">Assigned</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">Education Drive (Phase 2)</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Program</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" /> Sep 2026 - Nov 2026
                </p>
                <p className="text-sm font-medium mt-2">Role: Content Contributor</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-sm font-medium bg-amber-100 text-amber-800 px-3 py-1.5 rounded-md">Pending Confirmation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
