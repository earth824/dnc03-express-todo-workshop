import { Router } from 'express';
import { todoController } from '../controllers/todo.controller.ts';
import { authenticate } from '../middlewares/authenticate.ts';

export const todoRouter = Router();

todoRouter.post('/', authenticate, todoController.create);
todoRouter.delete('/:id', authenticate, todoController.remove);
todoRouter.get('/', authenticate, todoController.getAllTodo);
todoRouter.get('/:id', authenticate, todoController.getById);
todoRouter.put('/:id', authenticate, todoController.update);
