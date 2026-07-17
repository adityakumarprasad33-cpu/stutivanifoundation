# 61. Event Registration Architecture

## Core Model
The `EventRegistration` entity is the central record for any booking. It uses optional reference fields (`userId`, `volunteerId`) to support three modes simultaneously without duplicating tables:
1. **GUEST**: No linked IDs.
2. **VOLUNTEER**: Linked to an authenticated `userId` and `volunteerId`.
3. **ADMIN**: Created manually by an administrator, tracking `createdBy`.

## The State Machine
Registration lifecycles are rigidly enforced by `RegistrationPolicy`.
- Valid states: `CREATED`, `PENDING`, `APPROVED`, `WAITLISTED`, `CONFIRMED`, `CHECKED_IN`, `ATTENDED`, `CANCELLED`, `REJECTED`, `EXPIRED`, `NO_SHOW`.
- Example transition: You cannot move from `WAITLISTED` directly to `CHECKED_IN`. You must pass through `APPROVED` or `CONFIRMED`.

## Capacity Enforcement
Capacity is enforced transactionally at the database layer (`RegistrationRepository`). If the transaction detects the event is full, it immediately provisions a `WAITLISTED` status with the next queue position instead of failing the request outright.
