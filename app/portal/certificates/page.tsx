import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Certificates | Volunteer Portal',
  description: 'Download your earned certificates.',
};

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <p className="text-muted-foreground mt-2">View and download your earned certificates for participation and service.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Achievement Certificate 2025</CardTitle>
            </div>
            <CardDescription>Awarded for outstanding contribution exceeding 100 hours in 2025.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t pt-4">
              <div className="flex items-center text-sm text-green-600 mb-4 sm:mb-0">
                <CheckCircle className="h-4 w-4 mr-1" /> Verified (ID: ACH-2025-893)
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Participation: Health Camp 2025</CardTitle>
            </div>
            <CardDescription>Awarded for participating in the Annual Healthcare Camp in July 2025.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t pt-4">
              <div className="flex items-center text-sm text-green-600 mb-4 sm:mb-0">
                <CheckCircle className="h-4 w-4 mr-1" /> Verified (ID: PAR-HC-2025-112)
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
