import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TaxReceiptsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Tax Receipts & Certificates
        </h1>
        <p className="text-muted-foreground mt-1">
          Download your 80G tax exemption certificates and consolidated annual donation receipts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-rose-100 dark:border-rose-900/30 shadow-sm col-span-full">
          <CardHeader>
            <CardTitle>Available Documents</CardTitle>
            <CardDescription>Documents are generated automatically for verified donations.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-800">
              <FileText className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Documents Available
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your 80G tax receipts and annual consolidated statements will be available here after successful donations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
