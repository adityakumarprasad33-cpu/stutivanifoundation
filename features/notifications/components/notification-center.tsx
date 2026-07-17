'use client';

import React from 'react';
import { Check, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NotificationCenter() {
  const notifications = [
    {
      id: '1',
      title: 'Volunteer Application Approved',
      message: 'Your application has been reviewed and approved. Welcome to the team!',
      time: '10 mins ago',
      unread: true,
      icon: <Check className="h-4 w-4 text-green-500" />
    },
    {
      id: '2',
      title: 'Event Reminder',
      message: 'Your shift at the Healthcare Camp starts tomorrow at 8:00 AM.',
      time: '2 hours ago',
      unread: true,
      icon: <Calendar className="h-4 w-4 text-blue-500" />
    },
    {
      id: '3',
      title: 'Action Required',
      message: 'Please update your emergency contact information.',
      time: '1 day ago',
      unread: false,
      icon: <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-50 border-b">
        <span className="text-sm font-medium text-slate-500">Recent Updates</span>
        <Button variant="ghost" size="sm" className="h-8 text-xs">Mark all as read</Button>
      </div>
      
      <div className="divide-y divide-slate-100 flex-1">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-4 hover:bg-slate-50 transition-colors ${notif.unread ? 'bg-primary-50/50' : ''}`}>
            <div className="flex gap-3">
              <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-primary-100' : 'bg-slate-100'}`}>
                {notif.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <p className={`text-sm ${notif.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {notif.title}
                  </p>
                  <span className="text-xs text-slate-500">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{notif.message}</p>
                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-primary-600">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-slate-500">
                    Archive
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t text-center">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/notifications">View All History</Link>
        </Button>
      </div>
    </div>
  );
}
