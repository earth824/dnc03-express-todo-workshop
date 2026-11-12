import 'dotenv/config'; // load data from .env into process.env { PORT: '8888' }
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.coerce.number().min(1).int(),
  CORS_ORIGIN: z.url()
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.log('Env validation failed');
  console.log(z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
