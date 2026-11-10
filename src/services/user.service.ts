import { prisma } from '../lib/prisma.ts';

const findById = (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true }
  });
};

export const userService = {
  findById
};
