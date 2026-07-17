# 76. Deployment Guide

## Overview
This document outlines the standard procedure for deploying the Stuti-Vani Foundation platform to Vercel, our recommended hosting provider for Next.js applications.

## Prerequisites
- A Vercel Account linked to your GitHub/GitLab repository.
- All production credentials for Firebase, Cloudinary, Razorpay, and Resend.

## Vercel Setup

1. **Import Project**
   - In Vercel, click "Add New" -> "Project".
   - Import the repository containing the Stuti-Vani codebase.

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install`

3. **Environment Variables**
   - Copy all variables from `.env.example`.
   - Paste them into the Environment Variables section in Vercel.
   - **Important**: For `FIREBASE_PRIVATE_KEY`, ensure the value is enclosed in quotes if it contains literal `\n` characters, or format the key properly as required by Vercel.

4. **Deploy**
   - Click "Deploy".
   - Wait for the build process to complete.

## Post-Deployment Checks
- **Verify Public Website**: Check homepage, programs, and donation flow.
- **Verify Authentication**: Try logging into the Admin Dashboard.
- **Verify Webhooks**: Ensure the production URL is updated in the Razorpay Webhook settings (`https://<your-domain>/api/webhooks/razorpay`).

## Continuous Integration
Vercel will automatically build and deploy new commits pushed to the main/production branch. All PRs will generate a preview URL.
