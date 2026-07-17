import { RegisterForm } from '@/features/auth/components/register-form';
import { BrandLogo } from '@/components/brand/brand-logo';
import { BRANDING } from '@/constants/branding';

export const metadata = {
  title: `Sign Up | ${BRANDING.ORGANIZATION.NAME}`,
  description: 'Create an account and join our mission',
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col space-y-3 text-center items-center">
        <div className="mb-2">
          <BrandLogo size={80} className="drop-shadow-sm" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground/80">
          Join us in empowering communities today
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
