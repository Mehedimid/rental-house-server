import mongoose from "mongoose";

export interface IDetails {
    familyMembers:string,
    children:string
    message?:string
}

export interface IBooking{
    tenant:mongoose.Schema.Types.ObjectId
    landlord:mongoose.Schema.Types.ObjectId
    listing:mongoose.Schema.Types.ObjectId
    details:IDetails
    bookingStatus:"accepted" | "rejected" | "cancelled" | "pending"
    paymentStatus:boolean
    createdAt?:Date
    updatedAt?:Date
}