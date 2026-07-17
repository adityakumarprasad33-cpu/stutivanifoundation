# 53. Receipt Architecture

## The Engine
`ReceiptService` implements `IReceiptGenerator`, acting as the single source of truth for generating compliance documents.

## Supported Documents
1. **Tax Receipt**: General donation acknowledgement.
2. **80G Certificate**: Specialized tax exemption document (requires donor PAN).
3. **Acknowledgement Letter**: Simple thank you note.

## Future Extensibility
Currently, the PDF engine is stubbed. When a PDF library is integrated, the service will:
1. Generate the PDF buffer.
2. Upload to Cloud Storage.
3. Attach the public/signed URL to the `DonationRecord`.
4. Delegate delivery to the `EmailService`.
