import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string().trim().min(1),
  completed: z.boolean().exactOptional()
});

export const getTodoQuerySchema = z.object({
  completed: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .exactOptional()
});

// { completed: 'true' } ==> transform: cb('true') ==> true
// { completed: true }

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1).exactOptional(),
  completed: z.boolean().exactOptional()
});
