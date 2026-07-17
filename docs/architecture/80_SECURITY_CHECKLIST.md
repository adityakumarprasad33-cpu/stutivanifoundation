# 80. Security Checklist

## Overview
Before officially launching the Stuti-Vani Foundation platform, complete this security checklist.

## 1. Environment Variables
- [ ] No `.env` files are committed to the repository.
- [ ] `FIREBASE_PRIVATE_KEY` is kept entirely secret and only loaded on the server.
- [ ] `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` are kept entirely secret.
- [ ] `CLOUDINARY_API_SECRET` is kept entirely secret.

## 2. API Routes Protection
- [ ] All API routes modifying data (e.g., POST, PUT, DELETE) verify the user's authentication token via Firebase Admin.
- [ ] Routes strictly validate incoming payload bodies using Zod schemas.

## 3. Webhook Security
- [ ] The Razorpay webhook endpoint strictly verifies the `x-razorpay-signature` header using the `RAZORPAY_WEBHOOK_SECRET`.

## 4. Firestore Rules
- [ ] Firestore Security Rules are deployed and restrict client-side writes.
- [ ] Role-Based Access Control (RBAC) is enforced in both Firestore Rules and the Next.js API layer.

## 5. Dependency Vulnerabilities
- [ ] Run `npm audit` and resolve any high or critical vulnerabilities before deployment.
