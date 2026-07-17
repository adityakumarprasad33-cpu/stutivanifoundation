import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

import { BrandLogo } from '@/components/brand/brand-logo';

export const metadata = {
  title: 'Forgot Password | Stuti-Vani Foundation',
  description: 'Reset your password for the Stuti-Vani Foundation dashboard',
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px]">
      <div className="flex flex-col space-y-2 text-center items-center">
        <BrandLogo size={64} className="mb-4 drop-shadow-sm" />
        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we will send you a reset link
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
