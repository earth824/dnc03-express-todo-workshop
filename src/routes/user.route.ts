import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.ts';
import { checkRole } from '../middlewares/check-role.ts';
import { userController } from '../controllers/user.controller.ts';

export const userRouter = Router();

userRouter.delete(
  '/:id',
  authenticate,
  checkRole('ADMIN'),
  userController.deleteById
);
