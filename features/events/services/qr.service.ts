import { createHmac } from 'crypto';

export interface QRCodePayload {
  eventId: string;
  registrationId: string;
  signature: string;
}

export class QRService {
  // In production, this would be loaded from environment variables
  private static readonly SECRET_KEY = process.env.QR_SIGNING_SECRET || 'dev-secret-key-do-not-use-in-prod';

  /**
   * Generates a cryptographically signed payload for a QR Code.
   * This ensures that attackers cannot spoof a QR code by simply guessing a registration ID.
   */
  static generateSecurePayload(eventId: string, registrationId: string): string {
    const dataToSign = `${eventId}:${registrationId}`;
    const signature = createHmac('sha256', this.SECRET_KEY)
      .update(dataToSign)
      .digest('hex');
      
    // The final payload embedded in the QR Code.
    // Base64 encoding can be added if desired for space efficiency.
    const payload: QRCodePayload = {
      eventId,
      registrationId,
      signature
    };
    
    return JSON.stringify(payload);
  }

  /**
   * Verifies the cryptographic signature of a scanned QR payload.
   * Throws an error if the signature is invalid or tampered with.
   */
  static verifyPayload(payloadString: string): QRCodePayload {
    try {
      const payload: QRCodePayload = JSON.parse(payloadString);
      
      if (!payload.eventId || !payload.registrationId || !payload.signature) {
        throw new Error('Malformed QR payload.');
      }
      
      const expectedSignature = createHmac('sha256', this.SECRET_KEY)
        .update(`${payload.eventId}:${payload.registrationId}`)
        .digest('hex');
        
      if (payload.signature !== expectedSignature) {
        throw new Error('Invalid QR Signature. Possible forgery attempt.');
      }
      
      return payload;
    } catch (error) {
      throw new Error(`QR Validation Failed: ${(error as Error).message}`);
    }
  }
}
