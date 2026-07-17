import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScanLine, QrCode, ShieldAlert, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'QR Scanner | Stuti-Vani Foundation',
};

export default function ScannerPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 py-8">
        <div className="max-w-md w-full px-4 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Entry Scanner</h1>
            <p className="text-muted-foreground mt-2">Ready to scan incoming attendees.</p>
          </div>

          <Card className="border-2 border-primary-500 shadow-xl relative overflow-hidden">
            {/* Pulsing indicator for "listening" state */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 animate-pulse"></div>
            
            <CardHeader className="text-center pb-2">
              <ScanLine className="h-12 w-12 text-primary-500 mx-auto mb-2" />
              <CardTitle>Awaiting Input...</CardTitle>
              <CardDescription>Use an external scanner or camera.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* This input captures rapid keystrokes from USB/Bluetooth scanners */}
              <div className="relative">
                <QrCode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  autoFocus 
                  placeholder="Focus here to scan..." 
                  className="flex h-10 w-full rounded-md border border-input bg-slate-50 pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                />
              </div>

              <div className="flex justify-center">
                <span className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                  Keyboard Scanner Active
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Example Result States (Hidden initially in real implementation) */}
          <div className="space-y-4 opacity-50">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900">Valid Entry</h4>
                  <p className="text-sm text-green-700">Participant Name (GUEST)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-start space-x-3">
                <ShieldAlert className="h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-900">Invalid Signature</h4>
                  <p className="text-sm text-red-700">Possible forgery attempt detected.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
