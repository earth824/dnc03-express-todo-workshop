import jwt from 'jsonwebtoken';
import { env } from '../config/env.ts';

export type JwtPayload = {
  sub: string;
  email: string;
  role: 'USER' | 'ADMIN';
};

export const sign = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const verify = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
