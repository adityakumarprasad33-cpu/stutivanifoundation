'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../validation/auth.schemas';
import { authService } from '../services/auth.service';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { RoleSelectionModal } from './role-selection-modal';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired');
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [lastSelectedRole, setLastSelectedRole] = useState<string>();
  const [userStatus, setUserStatus] = useState<string>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const result = await authService.login(data);
      
      const roles = result.roles || ['public'];
      if (roles.length > 1) {
        setUserRoles(roles);
        setLastSelectedRole(result.lastSelectedRole);
        setUserStatus(result.status);
        setShowRoleModal(true);
      } else {
        const activeRole = roles[0];
        if (activeRole === 'volunteer') {
          if (result.status === 'PENDING') {
            router.push('/signup/pending');
          } else {
            router.push('/portal');
          }
        } else if (activeRole === 'donor') {
          router.push('/donor');
        } else if (['admin', 'super_admin', 'staff'].includes(activeRole)) {
          router.push(ROUTES.PROTECTED.DASHBOARD);
        } else {
          router.push('/');
        }
        router.refresh();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <RoleSelectionModal 
        isOpen={showRoleModal} 
        onOpenChange={setShowRoleModal} 
        roles={userRoles} 
        lastSelectedRole={lastSelectedRole} 
        status={userStatus}
      />
      <AnimatePresence mode="wait">
        {expired && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-xl text-sm border border-amber-500/20 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>Your session has expired. Please log in again to continue.</p>
          </motion.div>
        )}

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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        
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
              disabled={isSubmitting}
              className={`h-12 pl-10 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${form.formState.errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
              {...form.register('email')}
            />
          </div>
          <AnimatePresence>
            {form.formState.errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive ml-1"
              >
                {form.formState.errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-1">
            <label htmlFor="password" className="text-sm font-medium leading-none text-foreground/90">
              Password
            </label>
            <Link 
              href={ROUTES.AUTH.FORGOT_PASSWORD} 
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              tabIndex={-1}
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              disabled={isSubmitting}
              className={`h-12 pl-10 pr-10 rounded-xl bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${form.formState.errors.password ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
              {...form.register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <AnimatePresence>
            {form.formState.errors.password && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive ml-1"
              >
                {form.formState.errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-2 ml-1 pt-1">
          <Checkbox 
            id="rememberMe" 
            disabled={isSubmitting}
            onCheckedChange={(checked) => form.setValue('rememberMe', checked as boolean)}
            checked={form.watch('rememberMe')}
            className="rounded-[4px] data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
          >
            Remember me for 30 days
          </label>
        </div>

        <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
          <Button 
            className="w-full h-12 rounded-xl text-base font-medium shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </motion.div>
      </form>
      
      <div className="text-center text-sm mt-8 text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/register" className="font-semibold text-foreground hover:text-primary transition-colors">
          Sign up
        </Link>
      </div>
    </div>
  );
};
