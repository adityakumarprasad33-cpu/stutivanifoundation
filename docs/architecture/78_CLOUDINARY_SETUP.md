# 78. Cloudinary Media Setup

## Overview
Cloudinary is used for all media management across the platform (Gallery, Event Covers, Project Images, Profiles). This ensures images are optimized, responsive, and quickly delivered via CDN.

## Account Setup
1. Create a free/pro Cloudinary account.
2. Note your Cloud Name, API Key, and API Secret from the dashboard.
3. Configure the environment variables (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

## Upload Presets
For security, client-side uploads are routed through our Next.js API Routes, which sign the upload request using the `CLOUDINARY_API_SECRET`.

If you wish to allow direct unsigned uploads in the future (not recommended for production):
1. Go to Settings -> Upload.
2. Create an Upload Preset.
3. Set the Signing Mode to "Unsigned".

## Allowed Domains in Next.js
The `next.config.ts` has been configured to allow images from `res.cloudinary.com`. If you use a custom CNAME for Cloudinary, you must update the `images.remotePatterns` array in `next.config.ts`.

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};
```
