import React from 'react';
import { WelcomeEmail } from './emails/welcome';
import { EventTicketEmail } from './emails/event-ticket';

/**
 * Registry mapping template keys to their subject lines and React components.
 * This completely removes hardcoded strings from business services.
 */

export interface TemplateDefinition {
  subject: (data: any) => string;
  component: React.FC<any>;
}

export const TemplateRegistry: Record<string, TemplateDefinition> = {
  'WELCOME_USER': {
    subject: (data) => `Welcome to the Stuti-Vani Foundation, ${data.name}!`,
    component: WelcomeEmail,
  },
  'EVENT_TICKET': {
    subject: (data) => `Your Ticket: ${data.eventName}`,
    component: EventTicketEmail,
  },
  // Future mappings...
  // 'DONATION_RECEIPT': { subject: () => 'Your Donation Receipt', component: DonationReceiptEmail },
  // 'VOLUNTEER_APPROVED': { subject: () => 'Volunteer Application Approved', component: VolunteerApprovedEmail },
};
