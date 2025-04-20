import mongoose from 'mongoose';

export type ListingType = 'apartment' | 'house' | 'villa' | 'townhouse';
export type statusType = 'available' | 'not available';

export interface IListingImages {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}

export interface IListingDetails {
  description: string;
  rooms: number;
  garage: string;
  yearBuilt: Date;
}

export interface IListing {
  landlord: mongoose.Schema.Types.ObjectId;
  images?: IListingImages;
  flatPlan?: string;
  title: string;
  address: string;
  price: string;
  sqft: number;
  beds: number;
  baths: number;
  type: ListingType;
  status: statusType;
  propertyFeatures: string[];
  details: IListingDetails;
  createdAt?: Date;
  updatedAt?: Date;
}