import type { Request, RequestHandler } from 'express';
import { AppError } from '../utils/app-error.ts';
import { verify } from '../utils/jwt.ts';

export const authenticate: RequestHandler = (req: Request, res, next) => {
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
  req.user = payload;

  next();
};

export function getAuthUser(req: Request) {
  const authUser = req.user;
  if (!authUser) {
    throw new AppError(401, 'UNAUTHORIZED', 'Auth user is missing');
  }
  return authUser;
}

// DECLARATION MERGING, MODULE AUGMENTATION
// interface A {
//   name: string;
// }
// interface A {
//   age: number;
// }
// result: interface A {  name: string; age: number; }
