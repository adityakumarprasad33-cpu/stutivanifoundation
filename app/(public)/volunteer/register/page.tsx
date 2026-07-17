import { VolunteerRegisterStepper } from '@/features/auth/components/volunteer-stepper/volunteer-register-stepper';
import { BrandLogo } from '@/components/brand/brand-logo';
import { BRANDING } from '@/constants/branding';

export const metadata = {
  title: "Volunteer Application | " + BRANDING.ORGANIZATION.NAME,
  description: 'Apply to become a volunteer',
};

export default function VolunteerRegisterPage() {
  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <BrandLogo size={60} className="mx-auto" />
          <h1 className="text-3xl font-bold tracking-tight">Volunteer Application</h1>
          <p className="text-muted-foreground">Join our community and make a real impact</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-10">
          <VolunteerRegisterStepper />
        </div>
      </div>
    </div>
  );
}
