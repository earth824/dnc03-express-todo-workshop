import express from 'express';
import { env } from './config/env.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { notFound } from './middlewares/not-found.ts';
import { authRouter } from './routes/auth.route.ts';
import { userRouter } from './routes/user.route.ts';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(notFound);
app.use(errorHandler);

const port = env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`server running on port: ${port}`);
});
