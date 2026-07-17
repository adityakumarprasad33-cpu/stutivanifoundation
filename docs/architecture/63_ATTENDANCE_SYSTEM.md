# 63. Attendance System

## Separation of Concerns
Attendance is decoupled from the `EventRegistration` document. A user has a registration, but the act of attending creates an `AttendanceRecord`.

## Workflow
1. **Scan**: The scanner captures the QR payload.
2. **Verify**: `QRService` ensures the signature is valid.
3. **Check**: `RegistrationPolicy` verifies the registration status is valid for check-in.
4. **Update**: The registration status moves to `CHECKED_IN`.
5. **Record**: An `AttendanceRecord` is created, tracking the exact timestamp, the staff member who scanned it (`scannedBy`), and the method (`QR_CAMERA`, `QR_USB`, `MANUAL`).

## Analytics
Attendance metrics (Expected vs. Checked-in) are computed dynamically for the Dashboard and ultimately fed into the unified Analytics Module, rather than stored statically on the event document.
