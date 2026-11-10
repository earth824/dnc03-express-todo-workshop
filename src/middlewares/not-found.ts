import type { RequestHandler } from 'express';
import { AppError } from '../utils/app-error.ts';

export const notFound: RequestHandler = (req) => {
  // res.status(404).json({ message: 'The requested url not found' });
  throw new AppError(
    404,
    'RESOURCE_NOT_FOUND',
    `The requested url: ${req.method} ${req.originalUrl} not found`
  );
};
