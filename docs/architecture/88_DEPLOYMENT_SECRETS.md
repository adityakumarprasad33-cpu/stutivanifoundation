# 88_DEPLOYMENT_SECRETS

This document provides specific instructions for configuring environment variables in production hosting environments (e.g., Vercel).

## Vercel Configuration Guide

When deploying the Stuti-Vani Foundation platform to Vercel, the environment variables must be configured via the Vercel Dashboard (Project Settings > Environment Variables).

### 1. Essential Variables (Must be set before first deployment)

- `NEXT_PUBLIC_APP_URL` — Set to the production domain (e.g., `https://stutivanifoundation.org`)
- `NODE_ENV` — Vercel sets this to `production` automatically.
- `FIREBASE_CLIENT_EMAIL` — The email address from your downloaded Firebase Service Account JSON.
- `FIREBASE_PRIVATE_KEY` — The private key from the JSON file. **Crucial:** You must copy the exact string, including the literal `\n` characters, enclosed in quotes.
- `NEXT_PUBLIC_FIREBASE_*` — All client configuration variables from your Firebase Web App settings.

### 2. Media Management

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — From the Cloudinary Dashboard.
- `CLOUDINARY_API_KEY` — From the Cloudinary Dashboard.
- `CLOUDINARY_API_SECRET` — From the Cloudinary Dashboard.

### 3. Payment Processing

- `PAYMENT_PROVIDER` — Set to `razorpay`
- `RAZORPAY_KEY_ID` — From Razorpay Dashboard (Live Mode).
- `RAZORPAY_KEY_SECRET` — From Razorpay Dashboard (Live Mode).
- `RAZORPAY_WEBHOOK_SECRET` — The secret you define when registering the webhook URL (`https://stutivanifoundation.org/api/webhooks/razorpay`) in the Razorpay Dashboard.

### 4. Email Infrastructure

- `EMAIL_PROVIDER` — Set to `resend` (or other chosen provider).
- `EMAIL_FROM_ADDRESS` — The verified sending address (e.g., `info@stutivanifoundation.org`).
- `RESEND_API_KEY` — From the Resend Dashboard.

## Validating the Deployment

If any required production secret (`FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) is missing, the build will succeed, but the application will crash on startup due to the Zod validation in `lib/env.ts`.

Check the Vercel Runtime Logs for `ConfigurationError` to quickly identify missing or misconfigured secrets.
