import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PendingVerificationPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50 animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl">Application Received</CardTitle>
          <CardDescription>Your volunteer application is under review</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground space-y-4">
          <p>
            Thank you for applying to join the Stuti-Vani Foundation. Our team is currently reviewing your application and verifying your details.
          </p>
          <div className="bg-muted/50 p-4 rounded-xl text-sm flex items-start text-left gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p>
              We will notify you via email once your account has been approved and activated. This usually takes 1-2 business days.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/login">Sign In with different account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
