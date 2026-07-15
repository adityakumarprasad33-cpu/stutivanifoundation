export const logger = {
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO]: ${message}`, ...args);
    }
    // TODO: integrate with structured logging / monitoring tool in production
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN]: ${message}`, ...args);
  },
  error: (message: string, error?: unknown, ...args: any[]) => {
    console.error(`[ERROR]: ${message}`, error, ...args);
    // TODO: Send to error tracking service
  },
};
