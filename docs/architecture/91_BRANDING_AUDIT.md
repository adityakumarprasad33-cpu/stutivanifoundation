# Production Branding, Content & Public Website Audit

## Overview
This document summarizes the audit and replacement of dummy/placeholder data across the Stuti-Vani Foundation platform, substituting it with real data extracted from the official Foundation Profile PDF.

## Information Extracted
*   **Organization:** Stuti-Vani Foundation
*   **Tagline:** "An initiative to educate girl child"
*   **Mission:** Empower underprivileged children by providing quality of education, awareness and health care benefits, irrespective of caste and creed.
*   **Registration No:** S000088
*   **Founder:** Abhishek Kumar
*   **Treasurer:** Anisha Mehta
*   **Banking:** A/C No 3643073704, IFSC: CBIN0283807, Paytm: 9028165232
*   **Impact Stats (Real):** 12 girls sponsored, regular medical camps and orphanage visits.

## Missing Assets
> [!WARNING]
> The following graphical assets are missing and currently referencing placeholder paths:
> *   **Logo (`/branding/logo/logo.png`)** - A text fallback `Stuti-Vani` is rendering in its place via `BrandLogo` component.
> *   **Favicon (`/branding/favicon/favicon.ico`)** - Needs official `.ico` file.
> *   **OpenGraph Default Image (`/branding/og/default-og.png`)** - Needs an official banner image for social sharing.

## Dummy Data Removed
*   Fake "1500+ volunteers", "₹25M raised" impact statistics on Homepage.
*   Template "Our Story" text replaced with real origins.
*   Fake Address "123 Foundation Street, New Delhi" removed from Footer and Contact Page.
*   Fake "Education for All" dummy donation campaigns replaced with actual manual Bank Transfer details.
*   Hardcoded dummy `projects`, `programs`, `events`, `blogs`, and `gallery` items in `HomePage` were removed and replaced with empty arrays, which trigger the "Empty State" UI cleanly.

## Components Updated
*   `constants/branding.ts` - Completely rewritten as the Single Source of Truth.
*   `app/(public)/page.tsx` - Replaced fake hero and removed dummy loops.
*   `features/public/components/sections/hero-section.tsx` - Synced to Mission & Tagline.
*   `features/public/components/sections/impact-section.tsx` - Uses real verified metrics.
*   `app/(public)/about/page.tsx` - Synced Leadership, Mission, Vision, and Workflow.
*   `app/(public)/donate/page.tsx` - Removed fake goals, added real Banking and Paytm details.
*   `app/(public)/contact/page.tsx` - Synced Email, Phone, and removed fake street address.
*   `features/public/components/layout/footer.tsx` - Synced Registration number and removed dummy text.
*   `features/public/utils/seo.ts` - Refactored to map strictly to new Branding object.
*   `features/public/components/structured-data/index.tsx` - Refactored to map to new Branding object.

## Remaining TODO Items
*   [ ] Upload missing Logo and Favicon files to `/public/branding/`.
*   [ ] Wire up actual Firestore listeners in `app/(public)/page.tsx` so Programs and Projects populate as they are added in the Admin Portal.
