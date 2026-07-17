# 65. Event Security

## Boundaries
1. **Client-Side Validation is a Fallback**: The client UI only parses the QR string to send it to the server. It NEVER makes authorization decisions.
2. **Server-Side Authority**: `QRService.verifyPayload` handles cryptographic validation.
3. **IAM Enforcement**: Only authorized Admin/Staff can access the Scanner API endpoints. If a public user intercepts the API and tries to send a valid payload, the IAM middleware will block the check-in.

## Duplicate Scans
Duplicate scans are handled implicitly by the state machine (`RegistrationPolicy`). If a QR code is scanned twice, the first scan sets status to `CHECKED_IN`. The second scan attempts to transition from `CHECKED_IN` to `CHECKED_IN`, which throws a `ValidationError` (Duplicate Scan), preventing multiple check-ins for the same registration.
