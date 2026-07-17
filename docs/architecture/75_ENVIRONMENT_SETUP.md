# 75. Environment Setup Guide

## Overview
The Stuti-Vani Foundation platform relies on several environment variables for its core functionality. This guide documents every required variable and its purpose.

## Security Warning
> [!CAUTION]
> Never commit `.env`, `.env.local`, or `.env.production` to version control. Always use `.env.example` to document new variables.

## Required Variables

### 1. Application URL
- `NEXT_PUBLIC_APP_URL`: The canonical URL of the application (e.g., `http://localhost:3000` for local, `https://stutivani.org` for production). Used for absolute links in emails, SEO, and webhooks.

### 2. Firebase Client
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Web API Key.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Auth domain.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Project ID.
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Storage bucket URL.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Cloud messaging sender ID.
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase App ID.
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: Google Analytics measurement ID.

### 3. Firebase Admin
- `FIREBASE_CLIENT_EMAIL`: Service account email.
- `FIREBASE_PRIVATE_KEY`: Service account private key (Must handle newlines `\n` correctly when placed in Vercel).

### 4. Cloudinary (Media)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloud name.
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`: API Key (public).
- `CLOUDINARY_API_SECRET`: API Secret (private, server-side only).

### 5. Payments (Razorpay)
- `RAZORPAY_KEY_ID`: Public key for the Razorpay checkout.
- `RAZORPAY_KEY_SECRET`: Secret key for server-side verification.
- `RAZORPAY_WEBHOOK_SECRET`: Secret for verifying Razorpay webhooks.

### 6. Email Provider
- `EMAIL_PROVIDER`: Defines the active provider (e.g., `RESEND`, `SENDGRID`).
- `RESEND_API_KEY`: The API key for Resend (if active).
