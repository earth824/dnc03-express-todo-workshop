// type RegisterInput = {
//   email:string
//   password:string
//   dob:Date
//   firstName: string
// }

import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.ts';
import { prisma } from '../lib/prisma.ts';
import { AppError } from '../utils/app-error.ts';
import { compare, hash } from '../utils/hash.ts';
import { sign } from '../utils/jwt.ts';

const register = async (email: string, password: string) => {
  // hash password
  const hashPassword = await hash(password);
  // save new data to database ==> insert db
  try {
    await prisma.user.create({
      data: { email, password: hashPassword }
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new AppError(
        409,
        'EMAIL_ALREADY_EXIST',
        'This email already in use'
      );
    }

    throw error;
  }
};

const login = async (email: string, password: string): Promise<string> => {
  // query table users: find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(
      401,
      'INVALID_CREDENTIALS',
      'Email or password is incorrect'
    );
  }

  // if user found, compare password and stored hash password
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new AppError(
      401,
      'INVALID_CREDENTIALS',
      'Email or password is incorrect'
    );
  }

  // if password and hash is match: generate access jwt
  return sign({ sub: user.id.toString(), email: user.email, role: user.role });
};

export const authService = {
  register,
  login
};
