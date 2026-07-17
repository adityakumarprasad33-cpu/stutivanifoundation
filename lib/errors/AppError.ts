export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;
  public readonly cause?: Error;
  public readonly timestamp: string;

  constructor({
    message,
    code = 'INTERNAL_ERROR',
    statusCode = 500,
    details,
    cause,
  }: {
    message: string;
    code?: string;
    statusCode?: number;
    details?: unknown;
    cause?: Error;
  }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.cause = cause;
    this.timestamp = new Date().toISOString();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super({ message, code: 'VALIDATION_ERROR', statusCode: 400, details });
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed', details?: unknown) {
    super({ message, code: 'AUTHENTICATION_ERROR', statusCode: 401, details });
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Permission denied', details?: unknown) {
    super({ message, code: 'AUTHORIZATION_ERROR', statusCode: 403, details });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super({ message, code: 'NOT_FOUND', statusCode: 404, details });
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict', details?: unknown) {
    super({ message, code: 'CONFLICT_ERROR', statusCode: 409, details });
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', cause?: Error, details?: unknown) {
    super({ message, code: 'DATABASE_ERROR', statusCode: 500, cause, details });
  }
}

export class UploadError extends AppError {
  constructor(message = 'File upload failed', cause?: Error, details?: unknown) {
    super({ message, code: 'UPLOAD_ERROR', statusCode: 502, cause, details });
  }
}

export class PaymentError extends AppError {
  constructor(message = 'Payment processing failed', cause?: Error, details?: unknown) {
    super({ message, code: 'PAYMENT_ERROR', statusCode: 402, cause, details });
  }
}

export class ConfigurationError extends AppError {
  constructor(message = 'System configuration error', details?: unknown) {
    super({ message, code: 'CONFIGURATION_ERROR', statusCode: 500, details });
  }
}
