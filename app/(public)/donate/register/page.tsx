import { DonorRegisterForm } from '@/features/auth/components/donor-register-form';
import { BrandLogo } from '@/components/brand/brand-logo';
import { BRANDING } from '@/constants/branding';
import { HeartHandshake } from 'lucide-react';

export const metadata = {
  title: "Become a Donor | " + BRANDING.ORGANIZATION.NAME,
  description: 'Register as a donor to support our mission',
};

export default function DonorRegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-8 items-center bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50">
        
        {/* Left Side: Premium Info */}
        <div className="hidden md:flex flex-col justify-between h-full bg-gradient-to-br from-primary/10 via-primary/5 to-background p-12 border-r border-border/50 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <BrandLogo size={60} className="mb-8" />
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Join Our Circle of Giving
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Your generosity fuels our mission. By becoming a registered donor, you gain exclusive access to track your impact, download tax receipts instantly, and manage your contributions effortlessly.
            </p>

            <ul className="space-y-4">
              {[
                'Instant 80G Tax Exemption Certificates',
                'Detailed impact reports on your donations',
                'Manage recurring contributions',
                'Priority invites to foundation events'
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground font-medium">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 md:p-12 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Create Donor Account</h2>
            <p className="text-muted-foreground">Join thousand of others making a difference</p>
          </div>
          <DonorRegisterForm />
        </div>

      </div>
    </div>
  );
}
