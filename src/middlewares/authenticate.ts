import type { RequestHandler } from 'express';
import { AppError } from '../utils/app-error.ts';
import { verify } from '../utils/jwt.ts';

export const authenticate: RequestHandler = (req, res, next) => {
  const [bearer, token] = req.headers.authorization?.split(' ') ?? [];
  if (bearer !== 'Bearer' || !token) {
    throw new AppError(
      400,
      'INVALID_AUTH_SCHEME',
      'Invalid authorization header'
    );
  }

  // verify token if token exist
  const payload = verify(token);
};
