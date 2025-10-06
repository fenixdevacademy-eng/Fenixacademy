'use client';

﻿// Utilitários para tratamento de erros
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  error: ApiError;
}

export class ValidationError extends Error {
  public statusCode: number = 400;
  public isOperational: boolean = true;
  public details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: any;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true, details?: any) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
  }
}

export const createErrorResponse = (error: unknown): ErrorResponse => {
  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.name,
        statusCode: error.statusCode,
        details: error.details,
        timestamp: new Date().toISOString()
      }
    }
  }

  if (error instanceof ValidationError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.name,
        statusCode: error.statusCode,
        details: error.details,
        timestamp: new Date().toISOString()
      }
    }
  }

  return {
    success: false,
    error: {
      message: 'Internal Server Error',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      timestamp: new Date().toISOString()
    }
  }
}

export const handleApiError = (error: unknown): ErrorResponse => {
  console.error('API Error:', error);
  return createErrorResponse(error);
}

export const handleAsyncError = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }
}

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
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .substring(0, 1000); // Limit length
}

export const logError = (error: AppError, context?: any): void => {
  console.error('Error logged:', {
    message: error.message,
    code: error.name,
    statusCode: error.statusCode,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  });
}

export const isOperationalError = (error: any): boolean => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

// Função para criar handler de API
export const createApiHandler = (handler: Function) => {
  return async (req: any, res: any) => {
    try {
      await handler(req, res);
    } catch (error) {
      const errorResponse = handleApiError(error);
      res.status(errorResponse.error.statusCode).json(errorResponse);
    }
  }
}

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
  }
}

// Função simplificada para Next.js API routes
export const createNextHandler = (handler: Function) => {
  return handler;
}