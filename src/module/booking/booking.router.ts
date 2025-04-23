import { Router } from 'express';
import { bookingController } from './booking.controller';

const bookingRouter = Router();

bookingRouter.post('/create-booking', bookingController.createBooking);

bookingRouter.get('/:id', bookingController.getSingleBooking);

bookingRouter.patch('/cancel/:id', bookingController.cancelBooking);

bookingRouter.patch('/accepted/:id', bookingController.acceptBooking);

bookingRouter.patch('/rejected/:id', bookingController.rejectBooking);

bookingRouter.get(
  '/landlord-bookings/:landlordId',
  bookingController.getLandlordBooking,
);

bookingRouter.get(
  '/tenant-bookings/:tenantId',
  bookingController.getTenantBooking,
);

bookingRouter.get('/', bookingController.getBooking);

bookingRouter.delete('/delete', bookingController.deleteBooking);

export default bookingRouter;
