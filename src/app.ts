import express from 'express';
import { env } from './config/env.ts';

const app = express();

const port = env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`server running on port: ${port}`);
});
