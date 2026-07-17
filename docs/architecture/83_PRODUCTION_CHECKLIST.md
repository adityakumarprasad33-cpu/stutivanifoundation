# 83. Production Go-Live Checklist

## Overview
A high-level checklist to review before directing real users to the Stuti-Vani Foundation platform.

## Pre-Launch Checks

### Infrastructure
- [ ] Vercel project is created and connected to the `main` branch.
- [ ] Custom domain is configured and SSL is active.
- [ ] `NEXT_PUBLIC_APP_URL` is set to the production domain.
- [ ] Firebase project is upgraded to the Blaze plan (if necessary for external network requests / higher quotas).

### Integrations
- [ ] Razorpay webhook is registered in the live dashboard with the production URL and secret.
- [ ] Cloudinary environment variables match the production account.
- [ ] Email provider (e.g., Resend) domain is verified and DNS records (DKIM/SPF) are configured.

### Application State
- [ ] Test data is cleared from Firestore (or isolated in a staging environment).
- [ ] The Super Admin account is manually created via Firebase Console and roles assigned.
- [ ] All environment variables are correctly populated in Vercel.

### Final Verification
- [ ] Run a live test donation using a real credit card (Rs. 1).
- [ ] Verify the donor receives an email receipt.
- [ ] Verify the donation appears in the Admin Dashboard.
- [ ] Verify a new user can sign up as a Volunteer and access the Portal.
