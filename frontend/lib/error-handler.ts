// Utilitários para tratamento de erros
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
  timestamp: string;
}

export interface ErrorResponse {
  error: ApiError;
  success: false;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', true, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', details?: any) {
    super(message, 404, 'NOT_FOUND', true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access', details?: any) {
    super(message, 401, 'UNAUTHORIZED', true, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden access', details?: any) {
    super(message, 403, 'FORBIDDEN', true, details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict', details?: any) {
    super(message, 409, 'CONFLICT', true, details);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded', details?: any) {
    super(message, 429, 'RATE_LIMIT', true, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', details?: any) {
    super(message, 500, 'DATABASE_ERROR', true, details);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service error', details?: any) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', true, details);
  }
}

export const createErrorResponse = (error: AppError): ErrorResponse => {
  return {
    error: {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
      timestamp: new Date().toISOString()
    },
    success: false
  };
};

export const handleApiError = (error: unknown): ErrorResponse => {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return createErrorResponse(error);
  }

  if (error instanceof Error) {
    const appError = new AppError(
      error.message,
      500,
      'INTERNAL_ERROR',
      false
    );
    return createErrorResponse(appError);
  }

  const unknownError = new AppError(
    'An unknown error occurred',
    500,
    'UNKNOWN_ERROR',
    false
  );
  return createErrorResponse(unknownError);
};

export const handleAsyncError = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const validateRequired = (data: any, fields: string[]): void => {
  const missingFields = fields.filter(field => 
    data[field] === undefined || data[field] === null || data[field] === ''
  );

  if (missingFields.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missingFields.join(', ')}`,
      { missingFields }
    );
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .substring(0, 1000); // Limit length
};

export const logError = (error: AppError, context?: any): void => {
  console.error('Error logged:', {
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  });
};

export const isOperationalError = (error: any): boolean => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

// Função para criar handler de API
export const createApiHandler = (handler: Function) => {
  return async (req: any, res: any) => {
    try {
      await handler(req, res);
    } catch (error) {
      const errorResponse = handleApiError(error);
      res.status(errorResponse.error.statusCode).json(errorResponse);
    }
  };
};

// Função para Next.js API routes
export const createNextApiHandler = (handler: Function) => {
  return async (request: any) => {
    try {
      return await handler(request);
    } catch (error) {
      const errorResponse = handleApiError(error);
      return new Response(JSON.stringify(errorResponse), {
        status: errorResponse.error.statusCode,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
};
