# Architecture Decision Record: 005 Firebase

## Decision
Use Firebase (Authentication, Firestore, Storage, Cloud Functions) as the primary backend-as-a-service (BaaS) for the Stuti-Vani Foundation platform. Use the Firebase Modular SDK.

## Context
The Foundation requires a secure, scalable, and real-time database to handle volunteers, donations, projects, and users. The development team needs to move fast without managing complex server infrastructure.

## Alternatives Considered
- **Supabase:** Strong contender, but Firebase offers tighter integration for mobile push notifications and mature Cloud Functions that the team is already familiar with.
- **Custom Node.js/PostgreSQL Backend:** Rejected due to high maintenance overhead and DevOps requirements.

## Advantages
- Rapid development speed.
- Built-in Authentication with Role-Based Access Control via custom claims.
- Real-time database updates for live events and dashboards.
- Zero-maintenance server infrastructure.

## Disadvantages
- Vendor lock-in.
- NoSQL structure requires careful data modeling to prevent costly reads.
- Complex querying limitations compared to SQL.

## Long-Term Impact
Allows the team to focus entirely on product features rather than DevOps. The Service Layer (ADR-004) mitigates the vendor lock-in risk by isolating Firebase code.
