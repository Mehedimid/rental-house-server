import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

export const bookingSchema = new Schema<IBooking>({
  tenant:{
    type: Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  landlord:{
    type: Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  listing:{
    type: Schema.Types.ObjectId,
    required: true,
    ref:'Listing'
  },
  bookingStatus: {
    type: String,
    enum:["accepted" , "rejected" , "cancelled", "pending"],
    default:"pending"
  },
  paymentStatus:{
    type: Boolean,
    required: true,
  }
},{
  timestamps:true
});


const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;