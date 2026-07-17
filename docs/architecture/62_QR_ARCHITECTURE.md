# 62. QR Architecture

## The Problem with Basic QRs
If a QR code only contains `{"registrationId": "123"}`, an attacker can generate a QR code with `{"registrationId": "124"}` and gain unauthorized access or check-in on behalf of someone else.

## Cryptographic Validation
The `QRService` uses `createHmac` (SHA-256) combined with a server-side secret key to sign the payload.
- **Generated Payload**: `{ eventId, registrationId, signature }`
- **Verification**: The server reconstructs the signature using the IDs. If it doesn't match the provided signature, the QR is rejected as forged.

## Hardware Support
The `/dashboard/events/[slug]/scanner` UI is built to support:
1. **Mobile Cameras**: Processing image frames.
2. **External Scanners**: USB/Bluetooth scanners typically emulate a keyboard. The UI includes an invisible, auto-focused input field that captures the rapid keystroke string emitted by these scanners.
