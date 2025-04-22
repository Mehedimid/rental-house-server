import mongoose from 'mongoose';
import { Listing } from './listing.model';

const createListing = async (payload: any) => {
  const newListing = await Listing.create(payload);
  return newListing;
};

const getSingleListing = async (listingId: string) => {
  const listing = await Listing.findById(listingId).populate(
    'landlord',
    'name email phone',
  );
  return listing;
};

const getAllListing = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const excludeFields = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
    'fields',
    'minPrice',
    'maxPrice',
  ];
  excludeFields.forEach((key) => delete queryObj[key]);

  const searchTerm = query.searchTerm || ' ';
  const searchFields = ['title', 'type', 'address'];

  const searchConditions = {
    $or: searchFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  };

  const priceFilter: Record<string, any> = {};
  if (query.minPrice) {
    priceFilter.$gte = Number(query.minPrice);
  }
  if (query.maxPrice) {
    priceFilter.$lte = Number(query.maxPrice);
  }
  if (Object.keys(priceFilter).length > 0) {
    queryObj.price = priceFilter;
  }

  const searchQuery = Listing.find({
    ...searchConditions,
  }).populate('landlord');

  const filterQuery = searchQuery.find(queryObj);

  const page = Number(query?.page || 1);
  const limit = Number(query?.limit);
  const skip = (page - 1) * limit;
  const paginatedQuery = filterQuery.skip(skip).limit(limit);

  let sortStr;

  if (query?.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }

  const sortQuery = paginatedQuery.sort(sortStr);

  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }

  const result = await sortQuery.select(fields);

  return result;
};

const updateListing = async (listingId: string, payload: any) => {
  const updatedListing = await Listing.findByIdAndUpdate(listingId, payload, {
    new: true,
  });
  if (!updatedListing) {
    throw new Error('Listing not found');
  }
  return updatedListing;
};

const deleteListing = async (listingId: string) => {
  const deletedListing = await Listing.findByIdAndDelete(listingId);
  return deletedListing;
};

export const listingServices = {
  createListing,
  getAllListing,
  getSingleListing,
  updateListing,
  deleteListing,
};
