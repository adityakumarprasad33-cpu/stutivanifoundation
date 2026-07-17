# 59. Certificate Architecture

## The Engine
`CertificateService` implements `ICertificateGenerator`, defining the contract for issuing digital certificates.

## Supported Types
- `PARTICIPATION`
- `ACHIEVEMENT`
- `APPRECIATION`
- `SERVICE`
- `YEARS_OF_SERVICE`

## Flow
1. An event completes or a milestone is reached.
2. The system invokes `CertificateService.generate[Type]()`.
3. A unique `verificationCode` (e.g., `ACH-2025-XYZ`) is generated.
4. When the PDF engine is implemented, it compiles a document with a QR Code placeholder and Digital Signature.
5. The resulting URL is stored in the DAM (Gallery) module and linked to the Volunteer's profile.
6. The volunteer can download it via `/portal/certificates`.
