import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.ts';
import { getAuthUser } from './authenticate.ts';

export const checkRole =
  (...allowedRole: ('ADMIN' | 'USER')[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // get USER ROLE form payload
    const authUser = getAuthUser(req);
    const userRole = authUser.role; // ex. 'USER'
    // ex. allowedRole ['ADMIN']
    if (!allowedRole.includes(userRole)) {
      throw new AppError(403, 'FORBIDDEN', 'Insufficient permission');
    }

    next();
  };

// 'PLATFORM', 'SHOP', 'CUSTOMER'
// checkRole('PLATFORM', 'SHOP')
// function checkRole() {
//   return function(req,res,next) {}
// }
