import type { Request, Response } from 'express';
import {
  createTodoSchema,
  getTodoQuerySchema,
  updateTodoSchema
} from '../schemas/todo.schema.ts';
import { getAuthUser } from '../middlewares/authenticate.ts';
import { prisma } from '../lib/prisma.ts';
import { intIdSchema } from '../schemas/common.schema.ts';
import { AppError } from '../utils/app-error.ts';

const create = async (req: Request, res: Response) => {
  // validate request body
  const data = createTodoSchema.parse(req.body);
  // insert new data
  const userId = +getAuthUser(req).sub;
  const todo = await prisma.todo.create({ data: { userId, ...data } });
  // sent response
  res.status(201).json({ todo });
};

const remove = async (req: Request, res: Response) => {
  // validate request params
  const { id } = intIdSchema.parse(req.params);
  // search todo by id: check is todo found
  const todo = await prisma.todo.findUnique({
    where: { id }
  });
  if (!todo) {
    throw new AppError(404, 'TODO_NOT_FOUND', 'Todo was not found');
  }

  // if todo found: check if auth user can delete or not
  const authUser = getAuthUser(req);
  if (todo.userId !== +authUser.sub) {
    throw new AppError(403, 'FORBIDDEN', 'Insufficient permission');
  }

  // delete todo
  await prisma.todo.delete({ where: { id } });

  // sent response
  res.status(204).json();
};

const getAllTodo = async (req: Request, res: Response) => {
  // check request query?: req.query ex. { completed: 'false' }
  const query = getTodoQuerySchema.parse(req.query);
  // read data from db
  const authUser = getAuthUser(req);
  const todos = await prisma.todo.findMany({
    where: {
      ...query,
      userId: +authUser.sub
    }
  });

  res.status(200).json({ todos });
};

const getById = async (req: Request, res: Response) => {
  // validate request params
  const { id } = intIdSchema.parse(req.params);
  // search todo by id: check is todo found
  const todo = await prisma.todo.findUnique({
    where: { id }
  });
  if (!todo) {
    throw new AppError(404, 'TODO_NOT_FOUND', 'Todo was not found');
  }

  // if todo found: check if auth user can delete or not
  const authUser = getAuthUser(req);
  if (todo.userId !== +authUser.sub) {
    throw new AppError(403, 'FORBIDDEN', 'Insufficient permission');
  }

  res.status(200).json({ todo });
};

const update = async (req: Request, res: Response) => {
  // validate request params
  const { id } = intIdSchema.parse(req.params);
  // validate request body
  const data = updateTodoSchema.parse(req.body);
  // search todo by id: check is todo found
  const todo = await prisma.todo.findUnique({
    where: { id }
  });
  if (!todo) {
    throw new AppError(404, 'TODO_NOT_FOUND', 'Todo was not found');
  }

  // if todo found: check if auth user can delete or not
  const authUser = getAuthUser(req);
  if (todo.userId !== +authUser.sub) {
    throw new AppError(403, 'FORBIDDEN', 'Insufficient permission');
  }

  // update database
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data
  });

  res.status(200).json({ todo: updatedTodo });
};

export const todoController = {
  create,
  remove,
  getAllTodo,
  getById,
  update
};
