# Media Architecture (DAM)

## Overview
The Digital Asset Management (DAM) module serves as the centralized media repository for the Stuti-Vani Foundation platform. All future modules (Projects, Programs, Blogs, Events) must reference assets from this centralized system to avoid duplicate uploads and fragmented state.

## Core Principles
1. **Single Source of Truth**: All images, documents, and YouTube videos are managed here.
2. **Secure Uploads**: Cloudinary uploads are strictly authenticated via server-signed payloads.
3. **Reference Integrity**: Assets track their own usage across the platform. Deletion is blocked if an asset is actively referenced by another module.
4. **Resilient Video Metadata**: YouTube videos rely on oEmbed for metadata extraction, with manual overrides for missing data.

## Media Entity
The `MediaAsset` model utilizes a discriminated union to strongly type metadata across three variations: `IMAGE`, `DOCUMENT`, and `YOUTUBE`.

### Structure
- **Base Meta**: `id`, `title`, `slug`, `status`, `visibility`
- **Cloudinary Data**: `publicId`, `secureUrl`, `fileSize`, `folder`
- **YouTube Data**: `originalUrl`, `videoId`, `embedUrl`
- **Analytics/Search**: `usages`, `referenceCount`, `normalizedTitle`

## Cloudinary Integration
- **Folder Structure**: Handled through `constants/cloudinary.ts`.
- **Upload Flow**: 
  1. Client calls `generateCloudinarySignature` (Server Action).
  2. Server generates `sha1` hash using `API_SECRET` and returns to client.
  3. Client uploads binary to Cloudinary API `auto/upload` directly.
  4. Client maps response to `MediaAssetFormData` and posts to the database.

## Media Lifecycle
Transitions are strictly governed by `MediaPolicy.canTransitionStatus`:
- `TEMP_UPLOAD` -> `UPLOADED` -> `PROCESSING` -> `READY`
- `READY` <-> `ARCHIVED`
- `READY` -> `SOFT_DELETED`

## Usage Tracking
`MediaUsageService` tracks relationships between media and entities.
- When an entity (e.g., Program) attaches an image, it registers usage: `registerUsage(mediaId, 'PROGRAMS', 'Program', programId, 'coverImage')`.
- When an asset is deleted, `MediaPolicy.isSafeToDelete` verifies `referenceCount === 0`.
