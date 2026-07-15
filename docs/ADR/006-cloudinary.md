# Architecture Decision Record: 006 Cloudinary

## Decision
Use Cloudinary as the exclusive media management and delivery service for all images and videos, bypassing Firebase Storage for public assets.

## Context
The platform will host galleries, event photos, and project videos. Firebase Storage is robust but lacks dynamic, on-the-fly image transformations and global CDN optimization out of the box without complex cloud functions. Performance and Lighthouse scores are a critical priority.

## Alternatives Considered
- **Firebase Storage + Custom Functions:** Requires building and maintaining an image resizing pipeline.
- **Next.js Image Optimization alone:** Good, but puts heavy load on the Vercel/Next server and doesn't solve video hosting or advanced cropping.

## Advantages
- Dynamic URL-based transformations (resizing, formatting, quality adjustment).
- Automatic WebP/AVIF delivery.
- Superior global CDN performance.
- Offloads processing from our application servers.

## Disadvantages
- Adds another third-party dependency.
- Requires careful cost management (bandwidth limits).

## Long-Term Impact
Ensures the platform remains blazing fast regardless of how many high-resolution images are uploaded by the Foundation staff.
