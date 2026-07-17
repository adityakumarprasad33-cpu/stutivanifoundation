import React from 'react';

/**
 * Note: In a real implementation using @react-email/components, we would import
 * Html, Head, Body, Container, Text, Link, etc. from there.
 * For this phase, we stub the HTML structure.
 */

export interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ children, previewText }) => {
  // We use inline styles as standard for HTML emails
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stuti-Vani Foundation</title>
      </head>
      <body style={{ backgroundColor: '#f8fafc', margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {previewText && (
          <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden' }}>
            {previewText}
          </div>
        )}
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#f8fafc' }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellPadding="0" cellSpacing="0" style={{ margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', marginTop: '40px', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  {/* Header */}
                  <thead>
                    <tr>
                      <td style={{ backgroundColor: '#0284c7', padding: '24px', textAlign: 'center' }}>
                        <h1 style={{ color: '#ffffff', margin: 0, fontSize: '24px' }}>Stuti-Vani Foundation</h1>
                      </td>
                    </tr>
                  </thead>
                  
                  {/* Body Content */}
                  <tbody>
                    <tr>
                      <td style={{ padding: '40px 32px' }}>
                        {children}
                      </td>
                    </tr>
                  </tbody>
                  
                  {/* Footer */}
                  <tfoot>
                    <tr>
                      <td style={{ backgroundColor: '#f1f5f9', padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                        <p style={{ margin: '0 0 8px 0' }}>© {new Date().getFullYear()} Stuti-Vani Foundation. All rights reserved.</p>
                        <p style={{ margin: 0 }}>This is an automated message, please do not reply.</p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};
