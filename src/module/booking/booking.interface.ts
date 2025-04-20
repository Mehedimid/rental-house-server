import mongoose from "mongoose";

export interface IBooking{
    tenant:mongoose.Schema.Types.ObjectId
    landlord:mongoose.Schema.Types.ObjectId
    listing:mongoose.Schema.Types.ObjectId
    bookingStatus:"accepted" | "rejected" | "cancelled" | "pending"
    paymentStatus:boolean
    createdAt?:Date
    updatedAt?:Date
}