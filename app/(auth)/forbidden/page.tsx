import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Ban } from 'lucide-react';
import { BrandLogo } from '@/components/brand/brand-logo';

export default function ForbiddenPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px] text-center">
      <div className="flex flex-col space-y-2 text-center items-center">
        <BrandLogo size={64} className="mb-4 drop-shadow-sm" />
        <div className="w-16 h-16 bg-destructive/15 text-destructive rounded-full flex items-center justify-center mx-auto mb-2">
          <Ban className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Access Forbidden
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          You do not have the required permissions to access this page. If you believe this is an error, please contact an administrator.
        </p>
      </div>
      
      <Button asChild className="w-full" size="lg">
        <Link href={ROUTES.PROTECTED.DASHBOARD}>Return to Dashboard</Link>
      </Button>
    </div>
  );
}
