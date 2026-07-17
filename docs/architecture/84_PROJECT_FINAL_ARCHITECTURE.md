# 84. Project Final Architecture

## Overview
This document summarizes the final architectural patterns established across all 20 phases of the Stuti-Vani Foundation platform development.

## Core Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database / Auth**: Firebase (Client SDK + Admin SDK)
- **Media**: Cloudinary
- **Payments**: Razorpay
- **Emails**: React Email + Provider Abstraction

## Data Flow (The "Golden Path")
Every module strictly adheres to this layered architecture:
1. **Component (UI)**: Dispatches server actions or handles client state.
2. **Action / API Route**: Validates input using Zod and enforces permissions.
3. **Policy (Authorization)**: `lib/auth/server-guards.ts` verifies roles/ownership.
4. **Service (Business Logic)**: Executes the core logic (e.g., `DonationService`).
5. **Repository (Data Access)**: Interacts with Firestore (e.g., `DonationRepository`). Converts data models to entity instances.
6. **Activity Log**: The Service invokes the `ActivityRepository` to record the action.
7. **Notification**: The Service dispatches notifications via `NotificationService`.

## Modularity & Abstraction
The platform relies heavily on interfaces to remain provider-agnostic.
- `IPaymentProvider` ensures Razorpay can be swapped for Stripe.
- `IEmailProvider` ensures Resend can be swapped for SendGrid.
- `IStorageProvider` (via Cloudinary integration) abstract file paths.

## Conclusion
The architecture is designed for maintainability, security, and performance, enabling the Foundation to scale its operations seamlessly.
