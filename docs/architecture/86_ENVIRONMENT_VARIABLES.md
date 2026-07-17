# 86_ENVIRONMENT_VARIABLES

This document outlines all environment variables used in the Stuti-Vani Foundation platform. All variables are validated at runtime via `lib/env.ts` using Zod.

> [!WARNING]
> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. **Never** put secrets, private keys, or passwords in these variables.

## Application Settings

| Variable | Scope | Required | Default | Description |
|---|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Public | Yes | `http://localhost:3000` | The canonical URL of the application. Used for SEO, sitemaps, and absolute URL generation. |
| `NODE_ENV` | Server | Yes | `development` | Automatically set by Next.js. Used to enforce strict secret validation in `production`. |

## Firebase (Client)

These variables configure the Firebase Client SDK and are exposed to the browser. They are not considered secrets.

| Variable | Scope | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Public | Yes | Firebase Web API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Public | Yes | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Public | Yes | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Public | Yes | Firebase Storage Bucket URL |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| Public | Yes | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Public | Yes | Firebase App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Public | No | Firebase Analytics ID |
| `NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY` | Public | No | ReCAPTCHA Enterprise site key for AppCheck |

## Firebase (Admin)

These variables configure the Firebase Admin SDK. **They are highly sensitive and provide full access to the database.**

| Variable | Scope | Required (Prod) | Description |
|---|---|---|---|
| `FIREBASE_CLIENT_EMAIL` | Server | Yes | Service Account email address |
| `FIREBASE_PRIVATE_KEY` | Server | Yes | Service Account private key (must include `\n` characters) |

## Cloudinary (Media Management)

| Variable | Scope | Required (Prod) | Description |
|---|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public | Yes | Cloudinary Cloud Name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`| Public | No | Preset for unsigned uploads |
| `CLOUDINARY_API_KEY` | Server | Yes | Admin API Key |
| `CLOUDINARY_API_SECRET` | Server | Yes | Admin API Secret (Highly Sensitive) |

## Payment Gateway

| Variable | Scope | Required | Default | Description |
|---|---|---|---|---|
| `PAYMENT_PROVIDER` | Server | Yes | `razorpay`| The active payment provider. Supports: `razorpay`, `stripe`, `paypal` |
| `RAZORPAY_KEY_ID` | Server | Yes* | | Razorpay API Key (*required if provider is razorpay) |
| `RAZORPAY_KEY_SECRET` | Server | Yes* | | Razorpay API Secret |
| `RAZORPAY_WEBHOOK_SECRET` | Server | Yes* | | Secret used to verify Razorpay webhook signatures |

## Email Provider

| Variable | Scope | Required | Default | Description |
|---|---|---|---|---|
| `EMAIL_PROVIDER` | Server | Yes | `resend` | The active email provider. Supports: `resend`, `sendgrid`, `ses`, `smtp` |
| `EMAIL_FROM_ADDRESS` | Server | Yes | `noreply@...` | The default email address used for outgoing platform notifications |
| `RESEND_API_KEY` | Server | Yes* | | Resend API Key (*required if provider is resend) |
