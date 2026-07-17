import React from 'react';
import { EmailLayout } from './layout';

export interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name, loginUrl }) => {
  return (
    <EmailLayout previewText={`Welcome to Stuti-Vani, ${name}!`}>
      <h2 style={{ color: '#0f172a', marginTop: 0 }}>Welcome, {name}!</h2>
      <p style={{ color: '#334155', lineHeight: '1.6' }}>
        Thank you for joining the Stuti-Vani Foundation platform. We're thrilled to have you as part of our community.
      </p>
      <p style={{ color: '#334155', lineHeight: '1.6' }}>
        You can now register for events, manage your volunteer assignments, and track your impact directly from your dashboard.
      </p>
      
      <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
        <a 
          href={loginUrl} 
          style={{ 
            backgroundColor: '#0284c7', 
            color: '#ffffff', 
            padding: '12px 24px', 
            borderRadius: '6px', 
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          Sign In to Your Dashboard
        </a>
      </div>
      
      <p style={{ color: '#334155', lineHeight: '1.6' }}>
        If you have any questions, our support team is always here to help.
      </p>
    </EmailLayout>
  );
};
