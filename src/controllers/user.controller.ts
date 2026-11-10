import type { Request, Response } from 'express';
import { intIdSchema } from '../schemas/common.schema.ts';
import { prisma } from '../lib/prisma.ts';

const deleteById = async (req: Request, res: Response) => {
  // get user id
  const { id } = intIdSchema.parse(req.params);
  await prisma.user.delete({ where: { id } });
  res.status(204).json();
};

export const userController = { deleteById };
