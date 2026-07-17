# 87_SECRETS_MANAGEMENT

This document outlines the standard operating procedures for managing secrets across the development lifecycle of the Stuti-Vani Foundation platform.

## Zero Secrets in Code Policy

The Stuti-Vani Foundation codebase strictly enforces a **Zero Secrets in Code** policy. 
No credentials, API keys, private keys, or passwords may be committed to the repository under any circumstances.

This is enforced via:
1. **Zod Validation**: `lib/env.ts` intercepts the application boot sequence and crashes the application if required secrets are missing in the environment.
2. **Gitignore Rules**: All `.env*` files (except `.env.example`) are ignored.

## Development Environment (Local)

1. **Setup**: Duplicate `.env.example` and rename it to `.env.local`.
2. **Population**: Fill in the required variables for your local development instance.
3. **Sharing**: Do not share `.env.local` files over Slack, email, or unencrypted channels. Use a secure password manager (e.g., 1Password, Bitwarden) to share development credentials among the team.

## Staging Environment

Staging environments must **never** connect to Production databases or payment gateways.
1. Use a separate Firebase Project for Staging.
2. Use Razorpay/Stripe in **Test Mode** only.
3. Use Cloudinary in a separate environment or folder structure.

## Production Environment

Production secrets must be tightly controlled.
1. Only authorized DevOps/Lead Engineers should have access to the Vercel/Hosting dashboard to set production secrets.
2. Production Service Accounts (e.g., `FIREBASE_PRIVATE_KEY`) must follow the Principle of Least Privilege.
3. Key Rotation: If a secret is suspected of being compromised, it must be rotated immediately via the provider's dashboard and updated in the hosting environment.

## Handling the Firebase Private Key

The `FIREBASE_PRIVATE_KEY` is a multi-line RSA key. 
When configuring this locally in `.env.local` or in Vercel, the newline characters must be handled correctly.

**Correct Format:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIB...rest_of_key...\n-----END PRIVATE KEY-----\n"
```
The application's Firebase Admin initializer (`lib/firebase/admin/index.ts`) is programmed to safely parse the escaped `\n` characters back into actual newlines during instantiation.
