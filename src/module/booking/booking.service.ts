import mongoose from 'mongoose';
import { IBooking } from './booking.interface';
import Booking from './booking.model';

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const result = await Booking.create(payload);
  return result;
};

const cancelBooking = async (bookingId: string): Promise<IBooking> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(bookingId).session(session);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if the booking is already cancelled
    if (booking.bookingStatus === 'cancelled') {
      throw new Error('Booking is already cancelled');
    }

    // Update booking status to 'cancelled'
    booking.bookingStatus = 'cancelled';
    await booking.save({ session });

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getBooking = async () => {

  const result = await Booking.find()
    .populate('tenant', 'name email phone')
    .populate('landlord', 'name email phone')
    .populate('listing', 'title address');
  return result;
};

const getLandlordBooking = async (landlordId:string) => {

  const result = await Booking.find({landlord:landlordId})
    .populate('tenant', 'name email phone')
    .populate('landlord', 'name email phone')
    .populate('listing', 'title address');
  return result;
};

const getTenantBooking = async (tenantId:string) => {
  const result = await Booking.find({tenant:tenantId})
    .populate('tenant', 'name email phone')
    .populate('landlord', 'name email phone')
    .populate('listing', 'title address');
  return result;
};

const getSingleBooking = async (paramId: string) => {
  const result = await Booking.findById(paramId);
  return result;
};

const acceptBooking = async (BookingId: string) => {
  const result = await Booking.findByIdAndUpdate(
    BookingId,
    { bookingStatus: 'accepted' },
    {
      new: true,
    },
  );
  return result;
};

const rejectBooking = async (BookingId: string) => {
  const result = await Booking.findByIdAndUpdate(
    BookingId,
    { bookingStatus: 'rejected' },
    {
      new: true,
    },
  );
  return result;
};

const deleteBooking = async (BookingId: string) => {
  const result = await Booking.findByIdAndDelete(BookingId);
  return result;
};

export const bookingServices = {
  createBooking,
  getBooking,
  getLandlordBooking,
  getSingleBooking,
  cancelBooking,
  acceptBooking,
  rejectBooking,
  deleteBooking,
  getTenantBooking
};
