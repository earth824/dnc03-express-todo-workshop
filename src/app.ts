import 'dotenv/config';
import express from 'express';

const app = express();

const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    process.exit(0);
  }
  console.log(`server running on port: ${port}`);
});
