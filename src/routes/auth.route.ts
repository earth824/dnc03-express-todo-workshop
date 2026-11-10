import { Router } from 'express';
import { authController } from '../controllers/auth.controller.ts';
import { authenticate } from '../middlewares/authenticate.ts';

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/me', authenticate, authController.getMe);
