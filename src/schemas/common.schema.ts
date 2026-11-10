import z from 'zod';

export const intIdSchema = z.object({
  id: z.coerce.number().int().positive()
});
