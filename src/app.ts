import express, {Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import bodyParser from 'body-parser';
import AuthRouter from './module/auth/auth.route';
import UserRouter from './module/user/user.route';

const app : Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5000', 'https://bike-museum.vercel.app'],
    credentials: true,
  }),
);
app.use(bodyParser.json());


app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file of basa finder ');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;

function cookieParser(): any {
  throw new Error('Function not implemented.');
}


function cors(arg0: { origin: string[]; credentials: boolean; }): any {
  throw new Error('Function not implemented.');
}
