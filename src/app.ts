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
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000', 'https://basa-finder-server-ten.vercel.app/api', 'https://rental-house-client-9tugwlh2u-komolarkhoshas-projects.vercel.app'],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);

app.use("/api/listings", listingRouter)
app.use("/api/booking-request", bookingRouter)
app.use("/api/payment", paymentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file of basa finder');
});


app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;
