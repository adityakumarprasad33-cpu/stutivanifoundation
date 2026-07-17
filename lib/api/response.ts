import { AppError } from '@/lib/errors';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    details?: unknown;
  } | null;
  message: string;
  metadata?: Record<string, unknown>;
}

export const successResponse = <T>(
  data: T,
  message = 'Success',
  metadata?: Record<string, unknown>
): ApiResponse<T> => {
  return {
    success: true,
    data,
    message,
    error: null,
    metadata,
  };
};

export const errorResponse = (
  error: Error | AppError | unknown,
  fallbackMessage = 'An unexpected error occurred'
): ApiResponse<null> => {
  if (error instanceof AppError) {
    return {
      success: false,
      data: null,
      message: error.message,
      error: {
        code: error.code,
        details: error.details,
      },
    };
  }

  const message = error instanceof Error ? error.message : fallbackMessage;
  
  return {
    success: false,
    data: null,
    message,
    error: {
      code: 'INTERNAL_ERROR',
    },
  };
};
