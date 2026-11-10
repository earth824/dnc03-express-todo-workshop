import type { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schemas/auth.schema.ts';
import { authService } from '../services/auth.service.ts';

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

const getMe = async (req: Request, res: Response) => {};

export const authController = {
  register,
  login,
  getMe
};
