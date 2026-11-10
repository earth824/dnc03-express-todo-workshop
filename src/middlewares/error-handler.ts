import type { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/app-error.ts';
import z, { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req,
  res,
  next
) => {
  console.error(`${req.method} ${req.originalUrl}`, error);
  // ex. POST /auth/register error cause

  if (error instanceof AppError) {
    res.status(error.status).json({
      message: error.message,
      code: error.code,
      details: error.details
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Invalid request data',
      code: 'VALIDATION_ERROR',
      details: formatZodError(error)
    });
    return;
  }

  res
    .status(500)
    .json({ message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' });
};

function formatZodError(error: ZodError) {
  const { formErrors, fieldErrors } = z.flattenError(error);
  return {
    root: formErrors.length > 0 ? formErrors : undefined,
    ...fieldErrors
  };
}

// ERROR RESPONSE DESIGN
// { message, code, path, timestamp, detail } =>
// ex. { message: 'This email is already registered', code: 'EMAIL_ALREADY_EXIST', path: 'POST /auth/register', timestamp: '2026-11-09T10:10:10', details: { email: 'a@mail.com' } }
// case: validation => { root: '', email: [], password: [] }
