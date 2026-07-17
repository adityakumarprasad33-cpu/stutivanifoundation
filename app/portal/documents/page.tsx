import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Documents | Volunteer Portal',
  description: 'View your submitted documents and agreements.',
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-2">Access your verified identity documents and signed agreements.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Aadhar Card', type: 'Identity', date: 'Jan 15, 2026' },
          { title: 'Medical Fitness Certificate', type: 'Verification', date: 'Feb 10, 2026' },
          { title: 'Volunteer Agreement 2026', type: 'Agreement', date: 'Mar 01, 2026' },
        ].map((doc, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-primary-500" />
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{doc.type}</span>
              </div>
              <CardTitle className="text-lg mt-4">{doc.title}</CardTitle>
              <CardDescription>Uploaded: {doc.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" /> View
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
