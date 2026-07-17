import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Attendance | Volunteer Portal',
  description: 'View your attendance history.',
};

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground mt-2">Track your participation across all assigned events.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>A complete log of your event check-ins and hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Event Name</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Hours Logged</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Annual Tree Plantation</td>
                  <td className="px-6 py-4">July 10, 2026</td>
                  <td className="px-6 py-4">6 Hours</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Present</span>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Blood Donation Camp</td>
                  <td className="px-6 py-4">June 05, 2026</td>
                  <td className="px-6 py-4">0 Hours</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Missed</span>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Community Clean-up</td>
                  <td className="px-6 py-4">May 12, 2026</td>
                  <td className="px-6 py-4">4 Hours</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Present</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
