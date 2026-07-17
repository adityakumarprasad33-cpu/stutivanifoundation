# Volunteers & Workforce Management Architecture

## Overview
The Volunteers module is the centralized system for managing volunteer lifecycle, onboarding, participation, and performance analytics within the Stuti-Vani Foundation platform. It follows a highly normalized structure designed for scalability and integrated AI analysis.

## Core Design Principles
1. **Separation of Concerns**: Base volunteer data is separated from highly mutable operational data (assignments, attendance).
2. **Scalability**: By placing `volunteer_assignments` and `volunteer_attendance` in dedicated collections with foreign keys, the base volunteer document size remains small and queryable.
3. **Dynamic Computation**: Performance metrics and statistics (Hours, Attendance Rate, Reliability Score) are never persisted. They are computed dynamically on the server based on the raw operational data to prevent consistency errors and "update loops".
4. **AI Readiness**: Vectors, normalized fields, and keywords are proactively generated and stored within the base document to support semantic search, clustering, and AI-driven recommendations in the future.

## Domain Hierarchy
```
Organization
 └── Volunteers (Base Identity & Lifecycle)
      ├── volunteer_assignments (Operational Routing & Tasks)
      └── volunteer_attendance (Check-ins & Check-outs)
```

## Media & Document Storage
In alignment with the global architectural vision, all media and documents (Identity Documents, Medical Records, Certificates, Profile Photos) are stored in the centralized **Gallery (Digital Asset Management - DAM) module**.

The Volunteers module only stores reference `IDs` pointing to the DAM. File uploads bypass the Volunteers UI entirely, utilizing the `MediaSelectorDialog` and Cloudinary Signed Uploads.

## Security & RBAC
The Volunteers module operates under strict Role-Based Access Control (RBAC):
- `volunteers.view`: View volunteers and analytics
- `volunteers.create`: Onboard new volunteers
- `volunteers.edit`: Edit volunteer profiles
- `volunteers.delete`: Archive or delete volunteers
- `volunteers.assign`: Manage assignments and attendance
