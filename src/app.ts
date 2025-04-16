import express, {Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';

const app : Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file of basa finder ');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;