import { env } from '@/lib/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success';

const formatMessage = (level: LogLevel, message: string, ...args: unknown[]) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]:`;
  return [prefix, message, ...args];
};

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (env.NODE_ENV !== 'production') {
      console.info(...formatMessage('info', message, ...args));
    } else {
      // In production, you might forward this to DataDog, Sentry, or Google Cloud Logging
      // console.info(...formatMessage('info', message, ...args));
    }
  },

  success: (message: string, ...args: unknown[]) => {
    if (env.NODE_ENV !== 'production') {
      console.log('\x1b[32m%s\x1b[0m', ...formatMessage('success', message, ...args));
    }
  },

  debug: (message: string, ...args: unknown[]) => {
    if (env.NODE_ENV === 'development') {
      console.debug(...formatMessage('debug', message, ...args));
    }
  },

  warn: (message: string, ...args: unknown[]) => {
    console.warn(...formatMessage('warn', message, ...args));
  },

  error: (message: string, error?: unknown, ...args: unknown[]) => {
    console.error(...formatMessage('error', message, ...args));
    if (error) {
      console.error(error);
    }
    // TODO: Send to error tracking service (e.g. Sentry) in production
  },
};
