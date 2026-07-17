import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { BrandLogo } from '@/components/brand/brand-logo';

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px] text-center">
      <div className="flex flex-col space-y-2 text-center items-center">
        <BrandLogo size={64} className="mb-4 drop-shadow-sm" />
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Unauthorized
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          You must be logged in to access this resource, or your session has expired.
        </p>
      </div>
      
      <Button asChild className="w-full" size="lg">
        <Link href={ROUTES.AUTH.LOGIN}>Go to Login</Link>
      </Button>
    </div>
  );
}
