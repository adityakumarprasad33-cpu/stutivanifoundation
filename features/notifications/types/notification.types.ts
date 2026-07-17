export enum NotificationChannel {
  EMAIL = 'EMAIL',
  IN_APP = 'IN_APP',
  SMS = 'SMS',
  PUSH = 'PUSH',
  WHATSAPP = 'WHATSAPP'
}

export enum NotificationStatus {
  QUEUED = 'QUEUED',
  SENDING = 'SENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  READ = 'READ',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface NotificationPayload {
  id: string;
  recipientId: string;
  recipientEmail?: string;
  recipientPhone?: string;
  templateKey: string;
  data: Record<string, any>;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  status: NotificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserNotificationPreferences {
  userId: string;
  
  // Channels
  emailEnabled: boolean;
  inAppEnabled: boolean;
  smsEnabled: boolean; // Future
  pushEnabled: boolean; // Future
  
  // Topics
  marketing: boolean;
  events: boolean;
  volunteers: boolean;
  donations: boolean;
  security: boolean; // Usually cannot be disabled
  system: boolean;   // Usually cannot be disabled
}
