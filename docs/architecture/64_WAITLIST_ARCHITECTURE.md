# 64. Waitlist Architecture

## Waitlist Assignment
When an event reaches its defined capacity, the transactional `reserveSeatAtomic` method automatically assigns the `WAITLISTED` status and increments the waitlist queue position.

## Manual Promotion Workflow
Currently, the system is designed for **Manual Promotion**.
1. An attendee cancels. The capacity frees up.
2. The next waitlisted user is flagged as `eligibleForPromotion`.
3. An Administrator reviews the Waitlist in the Dashboard (`/dashboard/events/[slug]/registrations`) and clicks "Promote".
4. `RegistrationService` changes status to `CONFIRMED` and triggers the Notification Service.

## Future Automated Promotion
The architecture is prepared for automated promotion. By changing configuration in a future phase, step 3 can be executed automatically via a background task triggered upon cancellation.
