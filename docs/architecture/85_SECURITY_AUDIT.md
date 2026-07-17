# 85_SECURITY_AUDIT

**Date:** July 2026
**Scope:** Stuti-Vani Foundation Platform Codebase
**Objective:** Verify that no secrets, credentials, API keys, or sensitive configuration values are hardcoded in the source code before making the repository public.

## Executive Summary

A comprehensive security audit of the Stuti-Vani Foundation platform was completed. The codebase was scanned for hardcoded secrets, misconfigured environment variables, exposed credentials, and insecure logging practices.

**Conclusion:** The codebase is clean. No critical secrets (API keys, private keys, passwords, tokens) were found hardcoded in the source code. All external service integrations (Firebase, Cloudinary, Razorpay, Email) correctly utilize environment variables validated by Zod at runtime.

Several medium and low-severity issues were identified and remediated, primarily related to insecure logging of metadata, hardcoded fallback URLs, and missing security headers.

## Findings & Remediations

### 1. Insecure Logging in Production Paths (Medium)
**Finding:** 28 instances of `console.log` and `console.error` were found across feature services (Donations, Payments, Notifications, Events). Some logged sensitive operation metadata such as payment amounts, order IDs, and email addresses.
**Remediation:** Replaced all `console` calls with the centralized `logger` from `lib/logger`. PII and sensitive payloads were removed from log messages. The logger automatically suppresses debug/info levels in production.

### 2. Hardcoded Fallback URLs and Emails (Medium)
**Finding:** Several files used `process.env.NEXT_PUBLIC_SITE_URL || 'https://stutivanifoundation.org'` and `process.env.NEXT_PUBLIC_FROM_EMAIL || 'noreply@stutivanifoundation.org'`.
**Remediation:** Consolidated environment variables. Replaced `NEXT_PUBLIC_SITE_URL` with the Zod-validated `NEXT_PUBLIC_APP_URL`. Added `EMAIL_FROM_ADDRESS` as a server-only environment variable.

### 3. Missing Security Headers (Medium)
**Finding:** `next.config.ts` did not enforce basic web security headers.
**Remediation:** Added `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`, and `Permissions-Policy`. A CSP stub was added for future production tuning.

### 4. Hardcoded Organization Metadata (Low)
**Finding:** Contact information (phone, address, email) and social media handles were hardcoded across various public pages and structured data components.
**Remediation:** Moved all organization-specific metadata to `constants/branding.ts` to create a single source of truth that can be updated during deployment without modifying application logic.

### 5. Gitignore Misconfiguration (Low)
**Finding:** `.gitignore` ignored all `.env*` files, which included `.env.example`.
**Remediation:** Added `!.env.example` to ensure the template file remains in version control while keeping actual `.env.local` and `.env.production` files secure.

## Residual Risk Assessment

The platform currently relies on environment variables for secret management. This is secure for a Next.js application hosted on Vercel or similar platforms, provided the platform's secret management is configured correctly.

**Key ongoing requirements:**
1. **Never commit `.env.local`** or any other environment file containing real values.
2. **Review Cloudinary Upload Presets:** Ensure unsigned upload presets are restricted and do not allow arbitrary file uploads without validation.
3. **Tune CSP:** The Content Security Policy in `next.config.ts` is currently a stub and must be strictly configured before final production launch to mitigate XSS risks.
