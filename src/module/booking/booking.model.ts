import { model, Schema } from "mongoose";
import { IBooking, IDetails } from "./booking.interface";

const detailsSchema = new Schema<IDetails>({
  familyMembers: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: false
  }
}, {
  _id: false
});

export const bookingSchema = new Schema<IBooking>({
  tenant: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  landlord: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  listing: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Listing'
  },
  details: {
    type: detailsSchema,
    required: true 
  },
  bookingStatus: {
    type: String,
    enum: ["accepted", "rejected", "cancelled", "pending"],
    default: "pending"
  },
  paymentStatus: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
