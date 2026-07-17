import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/lib/validation';

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'), // We don't enforce full strict password checking on login to avoid leaking password policies, just required.
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
