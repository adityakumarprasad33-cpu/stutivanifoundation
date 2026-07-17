# Stuti-Vani Foundation
# Authentication Decisions

Version: 1.0

---

# Purpose

This document records the architectural decisions made regarding authentication, authorization, identity management, and session handling for the Stuti-Vani Foundation platform.

Unlike implementation documents, this file explains **why** each decision was made, what alternatives were considered, and how these decisions support the long-term goals of the platform.

This document should be updated whenever authentication architecture changes.

---

# Guiding Principles

Authentication must be

• Secure

• Scalable

• Maintainable

• Auditable

• Testable

• Extensible

The system must follow the Principle of Least Privilege.

Every request must prove both identity and permission before accessing protected resources.

---

# ADR-001
## Authentication Provider

### Decision

Use **Firebase Authentication** as the primary authentication provider.

---

### Reason

Firebase Authentication provides

- Secure authentication
- Proven infrastructure
- Session management
- Email verification
- Password reset
- Multi-provider support
- Strong SDK ecosystem

It integrates naturally with Firestore and Firebase Admin SDK.

---

### Alternatives Considered

- Auth.js / NextAuth
- Clerk
- Supabase Auth
- Custom JWT Authentication

---

### Why Firebase Was Chosen

- Native Firestore integration
- Excellent security model
- Easy Admin SDK verification
- Supports future OAuth providers
- Minimal backend maintenance

---

### Long-Term Impact

Future providers such as Google, Microsoft, GitHub, or Passkeys can be added without replacing the authentication architecture.

---

# ADR-002
## Dual SDK Architecture

### Decision

Use both Firebase Client SDK and Firebase Admin SDK.

---

### Client SDK Responsibilities

- Login
- Logout
- Password Reset
- Email Verification
- Current User
- Auth State
- Public Firestore Access

---

### Admin SDK Responsibilities

- Token Verification
- Role Management
- User Creation
- User Deletion
- Protected Writes
- Administrative Operations
- Batch Operations

---

### Reason

The browser should never have administrative capabilities.

The server should never trust the browser.

---

### Long-Term Impact

Supports

- Server Actions
- Cloud Functions
- Scheduled Jobs
- Administrative APIs

without changing authentication architecture.

---

# ADR-003
## Authorization Model

### Decision

Authentication and authorization are separate concerns.

Authentication answers

"Who are you?"

Authorization answers

"What are you allowed to do?"

---

### Roles

Super Admin

Admin

Volunteer

Visitor

---

### Permission Engine

All authorization must pass through

hasRole()

hasPermission()

canAccess()

Never perform inline role comparisons.

---

### Reason

Centralized authorization prevents inconsistent permission logic.

---

### Long-Term Impact

New roles can be added without changing existing features.

---

# ADR-004
## Session Management

### Decision

Use Firebase session persistence with centralized session management.

---

### Features

Persistent Login

Idle Timeout

Token Refresh

Session Validation

Cross-tab Synchronization

Future Device Sessions

---

### Reason

Users should remain authenticated securely while reducing unnecessary logins.

---

### Future Extensions

- Device Management
- Session Revocation
- Login History
- Active Sessions Dashboard

---

# ADR-005
## Route Protection

### Decision

Protect routes at multiple layers.

Browser

↓

Middleware

↓

Permission Guards

↓

Server Verification

↓

Firestore Rules

---

### Reason

Security should never rely on a single layer.

Each layer assumes the previous one can fail.

---

# ADR-006
## Firestore Security

### Decision

Firestore Rules remain the final authority.

Frontend checks improve UX.

Backend checks enforce security.

Firestore Rules protect data.

---

### Reason

Never trust client-side validation.

---

# ADR-007
## User Profile Synchronization

### Decision

Every authenticated account has a corresponding Firestore document.

Authentication identity

↓

Firestore profile

↓

Application permissions

---

### Reason

Authentication should remain separate from application-specific data.

---

# ADR-008
## Activity Logging

### Decision

Authentication events must be logged.

Log

Login

Logout

Failed Login

Password Reset

Permission Denied

Role Changes

Account Disabled

Session Expired

---

### Reason

Improves

Security

Auditing

Troubleshooting

Compliance

---

# ADR-009
## Error Handling

### Decision

Authentication uses centralized AppError hierarchy.

Supported Errors

AuthenticationError

AuthorizationError

ValidationError

TokenExpiredError

ConfigurationError

NetworkError

Never expose internal implementation details.

---

# ADR-010
## Validation

### Decision

Every authentication request is validated.

Client

↓

Server

↓

Database

Use

Zod

React Hook Form

Never rely on frontend validation alone.

---

# ADR-011
## Dependency Injection

### Decision

Authentication services depend on interfaces instead of Firebase directly where practical.

Example

AuthService

↓

IAuthProvider

↓

FirebaseAuthProvider

---

### Reason

Improves

Testing

Mocking

Maintainability

Future migrations

---

# ADR-012
## Future Authentication Features

The architecture must support future implementation of

- Google Sign-In
- Microsoft Sign-In
- GitHub Sign-In
- Magic Links
- Two-Factor Authentication
- WebAuthn / Passkeys
- Device Sessions
- Session Revocation
- Organization Accounts

These features should require minimal architectural changes.

---

# ADR-013
## Password Policy

Minimum Length

12 Characters

Require

Uppercase

Lowercase

Number

Special Character

Passwords are managed only by Firebase Authentication.

Never store passwords in Firestore.

---

# ADR-014
## Account Lifecycle

Account Created

↓

Email Verification

↓

Profile Creation

↓

Role Assignment

↓

Active User

↓

Inactive / Disabled (if required)

↓

Deletion / Archival

Every stage should be auditable.

---

# ADR-015
## Identity Flow

Visitor

↓

Login

↓

Firebase Authentication

↓

ID Token

↓

Middleware

↓

Firebase Admin Verification

↓

Permission Check

↓

Business Logic

↓

Firestore

Every request follows this lifecycle.

---

# Future Improvements

Potential future enhancements include

- OAuth Providers
- Passwordless Authentication
- Hardware Security Keys
- Session Dashboard
- Login Notifications
- Risk-Based Authentication
- IP Reputation Checks
- Geo-Location Alerts
- Security Dashboard
- Adaptive Authentication

These are intentionally excluded from Version 1.0 but the architecture supports them.

---

# Review Process

Authentication decisions should be reviewed

- Before introducing new identity providers
- Before changing permission models
- Before modifying session management
- Before altering security architecture

Major changes must be documented as additional ADRs.

---

# Final Principle

Authentication is the foundation of trust.

A user should never gain access because the system "assumed" they were authorized.

Every request must prove:

1. Identity
2. Session Validity
3. Role
4. Permission
5. Data Access Rights

Only after all five checks succeed should the requested operation be performed.

Security is never a single check.

Security is a layered architecture.