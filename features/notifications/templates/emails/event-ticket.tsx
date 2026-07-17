import React from 'react';
import { EmailLayout } from './layout';

export interface EventTicketEmailProps {
  name: string;
  eventName: string;
  date: string;
  location: string;
  qrCodeUrl: string; // Pre-generated secure QR URL
}

export const EventTicketEmail: React.FC<EventTicketEmailProps> = ({ name, eventName, date, location, qrCodeUrl }) => {
  return (
    <EmailLayout previewText={`Your ticket for ${eventName} is enclosed.`}>
      <h2 style={{ color: '#0f172a', marginTop: 0 }}>Registration Confirmed</h2>
      <p style={{ color: '#334155', lineHeight: '1.6' }}>
        Hi {name}, your spot for <strong>{eventName}</strong> is secured!
      </p>
      
      <table width="100%" style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginTop: '24px' }}>
        <tbody>
          <tr>
            <td style={{ paddingBottom: '8px' }}>
              <strong style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Date & Time</strong><br/>
              <span style={{ color: '#0f172a' }}>{date}</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Location</strong><br/>
              <span style={{ color: '#0f172a' }}>{location}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '32px', padding: '24px', border: '2px dashed #cbd5e1', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '14px' }}>Please present this QR code at the entrance</p>
        <img src={qrCodeUrl} alt="Your Ticket QR Code" width="200" height="200" style={{ display: 'block', margin: '0 auto' }} />
      </div>
      
    </EmailLayout>
  );
};
