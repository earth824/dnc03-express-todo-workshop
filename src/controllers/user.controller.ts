import type { Request, Response } from 'express';
import { intIdSchema } from '../schemas/common.schema.ts';
import { prisma } from '../lib/prisma.ts';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.ts';
import { AppError } from '../utils/app-error.ts';

const deleteById = async (req: Request, res: Response) => {
  // get user id from path parameter and validate this value
  const { id } = intIdSchema.parse(req.params);
  // delete from database
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new AppError(
        404,
        'USER_NOT_FOUND',
        'The user with the provided id not found'
      );
    }
    throw error;
  }
  res.status(204).json();
};

export const userController = { deleteById };
