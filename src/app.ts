import express, {Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import listingRouter from './module/listing/listing.router';
import bookingRouter from './module/booking/booking.router';
import { paymentRoutes } from './module/payment/payment.routes';

const app : Application = express();

app.use(express.json());

app.use("/api/listings", listingRouter)
app.use("/api/booking-request", bookingRouter)
app.use("/api/payment", paymentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file of basa finder ');
});

app.use(globalErrorHandler)
app.use("*", routeNotFoundHandler)

export default app;