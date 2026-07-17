# 82. Testing & Verification Guide

## Overview
This guide provides instructions on how to test the platform before deploying major updates.

## 1. Type Checking
TypeScript provides our first layer of defense.
Run `npm run typecheck` to ensure no interfaces, types, or props are violated. This must pass with 0 errors.

## 2. Linting
Run `npm run lint`. This checks for code quality rules, accessibility (ARIA) issues, and React best practices (e.g., missing dependencies in `useEffect`).

## 3. Production Build Testing
Always test the production build locally before merging into `main`.
1. `npm run build`
2. `npm start`
This simulates exactly how Vercel will serve the application, catching hydration errors or environment variable issues that might not appear in `npm run dev`.

## 4. Manual UI Verification
- **Forms**: Ensure the Contact, Volunteer Registration, and Donation forms submit correctly.
- **Responsiveness**: Verify the mobile navigation menu works and tables in the Admin Dashboard scroll horizontally.
- **Emails**: If a change was made to notifications, verify the React Email templates render correctly across mail clients.
