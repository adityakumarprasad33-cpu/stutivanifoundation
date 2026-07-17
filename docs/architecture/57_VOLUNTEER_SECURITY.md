# 57. Volunteer Security

## Authentication
Volunteers authenticate via the centralized IAM system (`app/(auth)/login`). The system inspects their Firebase Custom Claim (`role: 'VOLUNTEER'`) and routes them automatically to `/portal`. No separate login page exists.

## Authorization & Policy
The `VolunteerAccessPolicy` governs all data access within the portal.
- **Rule**: `resource.userId === currentUser.uid`
- **Enforcement**: This rule is enforced at the Service/Repository layer. A volunteer cannot query another volunteer's ID, even if they manipulate the route parameters or API payload.

## Read/Write Restrictions
- **Editable Fields**: Skills, Availability, Contact Info.
- **Read-Only Fields**: Government IDs, Verifications, Badges, Volunteer Number. Changes to these require a manual "Approval Request" to administrators.

## Logging
Every profile mutation triggered by a volunteer generates an entry via `ActivityRepository` for compliance tracking.
