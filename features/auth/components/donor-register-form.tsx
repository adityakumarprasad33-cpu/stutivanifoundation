'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail, Lock, User, Eye, EyeOff, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { registerDonor } from '@/features/auth/actions/auth.actions';

const donorRegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type DonorRegisterFormValues = z.infer<typeof donorRegisterSchema>;

export function DonorRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorRegisterFormValues>({
    resolver: zodResolver(donorRegisterSchema),
  });

  const onSubmit = async (data: DonorRegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const names = data.name.trim().split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ') || '';

      await authService.register({
        email: data.email,
        password: data.password,
        firstName,
        lastName,
      });

      const result = await registerDonor({
        firstName,
        lastName,
        email: data.email,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to create donor account');
      }

      router.push('/donor');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center gap-3"
          >
            <ShieldCheck className="h-5 w-5 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2 relative">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                <User className="h-[18px] w-[18px]" />
              </div>
              <Input
                {...register('name')}
                type="text"
                className="pl-11 h-12 rounded-xl bg-muted/40 border-muted-foreground/10 hover:border-primary/30 focus:border-primary focus:bg-background transition-all duration-300"
                placeholder="Aditya Prasad"
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive ml-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                <Mail className="h-[18px] w-[18px]" />
              </div>
              <Input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="pl-11 h-12 rounded-xl bg-muted/40 border-muted-foreground/10 hover:border-primary/30 focus:border-primary focus:bg-background transition-all duration-300"
                placeholder="aditya@example.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                <Lock className="h-[18px] w-[18px]" />
              </div>
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className="pl-11 pr-11 h-12 rounded-xl bg-muted/40 border-muted-foreground/10 hover:border-primary/30 focus:border-primary focus:bg-background transition-all duration-300"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground/50 hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive ml-1">{errors.password.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 shadow-lg shadow-primary/25 transition-all duration-300 overflow-hidden relative group" 
          disabled={isLoading}
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Become a Donor <Heart className="h-4 w-4" />
              </>
            )}
          </span>
        </Button>
      </form>

      <div className="mt-8 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already a donor?{' '}
        <Link 
          href="/login?role=donor" 
          className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
