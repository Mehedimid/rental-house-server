import { Schema, model } from 'mongoose';
import { IListing } from './listing.interface';
import listingMiddleware from './listing.middlewares';
import { number } from 'zod';

export const ListingImagesSchema = new Schema(
  {
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String, required: true },
  },
  { _id: false },
);

export const ListingDetailsSchema = new Schema(
  {
    description: { type: String, required: true },
    rooms: { type: Number, required: true },
    garage: { type: String, required: true },
    yearBuilt: { type: Date, required: true },
  },
  { _id: false },
);

export const ListingSchema = new Schema<IListing>(
  {
    landlord: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    images: ListingImagesSchema,
    flatPlan: String,
    title: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    sqft: { type: Number, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    type: {
      type: String,
      enum: ['apartment', 'house', 'villa', 'townhouse'],
      required: true,
    },
    status: {
      type: String,
      enum: ['available' , 'not available'],
      required: true,
    },
    propertyFeatures: { type: [String], required: true },
    details: { type: ListingDetailsSchema, required: true },
  },
  {
    timestamps: true,
  },
);

listingMiddleware()

export const Listing = model<IListing>('Listing', ListingSchema);
