import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hash = (plainText: string): Promise<string> => {
  return bcrypt.hash(plainText, SALT_ROUNDS);
};

export const compare = (
  plainText: string,
  hashValue: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashValue);
};
