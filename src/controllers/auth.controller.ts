import type { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schemas/auth.schema.ts';
import { authService } from '../services/auth.service.ts';
import { userService } from '../services/user.service.ts';
import { AppError } from '../utils/app-error.ts';

const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  await authService.register(data.email, data.password);
  res.status(201).json({ message: 'Registered successfully' });
};

const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const accessToken = await authService.login(data.email, data.password);
  res.status(200).json({ accessToken });
};

const getMe = async (req: Request, res: Response) => {
  const userId = +req.user!.sub;
  const user = await userService.findById(userId);
  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User cannot be found');
  }
  res.status(200).json({ user });
};

export const authController = {
  register,
  login,
  getMe
};
