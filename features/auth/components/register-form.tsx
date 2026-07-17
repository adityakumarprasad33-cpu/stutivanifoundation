'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { registerPublic } from '@/features/auth/actions/auth.actions';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const calculateStrength = (password: string) => {
  let score = 0;
  if (!password) return score;
  if (password.length > 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z\d]/.test(password)) score += 1;
  return score;
};

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch('password', '');
  const strength = useMemo(() => calculateStrength(passwordValue), [passwordValue]);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const names = data.name.trim().split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ') || '';

      // 1. Create Firebase Auth user & mint session cookie
      await authService.register({
        email: data.email,
        password: data.password,
        firstName,
        lastName,
      });

      // 2. Create User record via Server Action
      const result = await registerPublic({
        firstName,
        lastName,
        email: data.email,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to create account');
      }

      // 3. Redirect to home for public users
      router.push('/');
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
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 flex items-start gap-3 shadow-sm"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground/90 ml-1">
            Full Name
          </label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="name"
              placeholder="Your Full Name"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              className={`h-12 pl-10 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.name ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
              {...register('name')}
            />
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive ml-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground/90 ml-1">
            Email address
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className={`h-12 pl-10 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
              {...register('email')}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive ml-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium leading-none text-foreground/90 ml-1">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              disabled={isLoading}
              className={`h-12 pl-10 pr-10 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${errors.password ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {passwordValue.length > 0 && (
            <div className="px-1 pt-1 space-y-1.5">
              <div className="flex gap-1 h-1.5 w-full">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                      strength > i 
                        ? strength <= 1 
                          ? 'bg-red-500' 
                          : strength === 2 
                            ? 'bg-amber-500' 
                            : 'bg-green-500'
                        : 'bg-muted-foreground/20'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {strength === 0 && 'Very weak'}
                {strength === 1 && 'Weak'}
                {strength === 2 && 'Good'}
                {strength >= 3 && 'Strong'}
              </p>
            </div>
          )}

          <AnimatePresence>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive ml-1"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div whileTap={{ scale: 0.98 }} className="pt-4">
          <Button 
            className="w-full h-12 rounded-xl text-base font-medium shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </motion.div>
      </form>
      
      <div className="text-center text-sm mt-8 text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-foreground hover:text-primary transition-colors">
          Log in
        </Link>
      </div>
    </div>
  );
}
