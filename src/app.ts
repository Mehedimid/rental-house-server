import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import bodyParser from 'body-parser';
import UserRouter from './module/user/user.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import listingRouter from './module/listing/listing.router';
import bookingRouter from './module/booking/booking.router';
import { paymentRoutes } from './module/payment/payment.routes';
import AuthRouter from './module/auth/auth.route';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://basa-finder-server-ten.vercel.app',
      'https://basa-finder-client-rosy.vercel.app',
      'https://vercel.com/sso/access/request?next=%2Fsso-api%3Furl%3Dhttps%253A%252F%252Frental-house-client-9tugwlh2u-komolarkhoshas-projects.vercel.app%252F%26nonce%3Dc50cbd65ded005fd4a2200033858666aa98ce1734be756d821c1b4de47628671&url=rental-house-client-9tugwlh2u-komolarkhoshas-projects.vercel.app',
      'https://rental-house-client.vercel.app/ ',
    ],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);

app.use('/api/listings', listingRouter);
app.use('/api/booking-request', bookingRouter);
app.use('/api/payment', paymentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file of basa finder');
});

app.use(globalErrorHandler);
app.use('*', routeNotFoundHandler);

export default app;
